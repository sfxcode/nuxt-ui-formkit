import type { ErrorMessages, FormKitNode } from '@formkit/core'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { clearErrors, getNode, reset, setErrors, submitForm } from '@formkit/core'
import { useFormKitContextById } from '@formkit/vue'
import { computed, onScopeDispose, ref } from 'vue'
import { attachStandardSchema } from './useFormKitStandardSchema'

export interface UseFormKitFormOptions {
  standardSchema?: StandardSchemaV1
}

// `submitForm`/`reset`/`setErrors`/`clearErrors`/`getNode` all key off a
// FormKit node's registry `id`, not its `name` prop - this composable is
// meant to be called from arbitrary consumer code (e.g. a submit button
// outside the form), unlike `useFormKitInput`/`useFormKitOutput`, which take
// a `FormKitFrameworkContext` directly because they're always called from
// inside a `createInput`-rendered component.
export function useFormKitForm(id: string, options?: UseFormKitFormOptions) {
  let detachStandardSchema: (() => void) | undefined

  const context = useFormKitContextById(id, (formContext) => {
    if (options?.standardSchema)
      detachStandardSchema = attachStandardSchema(formContext.node, options.standardSchema)
  })
  onScopeDispose(() => detachStandardSchema?.())

  const isLoading = ref(false)

  const isValid = computed(() => context.value?.state.valid ?? false)
  const isSubmitted = computed(() => context.value?.state.submitted ?? false)
  // `state.dirty` compares the committed value against the form's initial
  // value. FormKit's default is *sticky* (stays true after a field is edited
  // back to its original value); render the form with `dirtyBehavior="compare"`
  // for a value that tracks the live difference.
  const isDirty = computed(() => context.value?.state.dirty ?? false)
  const hasErrors = computed(() => context.value?.state.errors ?? false)

  // The last `handler` failure, cleared when the next handler starts.
  const error = ref<unknown>(undefined)

  // Resolves with whether the form passed validation, once FormKit has run its
  // own submit pipeline. FormKit emits `submit-raw` after it has waited out any
  // in-flight validation and marked the form submitted, and only then decides
  // between `onSubmit` and `onSubmitInvalid` on the `blocking` ledger - so this
  // reads that same ledger at the same moment.
  function waitForSubmitted(node: FormKitNode): Promise<boolean> {
    return new Promise((resolve) => {
      const receipt = node.on('submit-raw', () => {
        node.off(receipt)
        resolve(!node.ledger.value('blocking'))
      })
    })
  }

  let latestSubmit = 0

  // `submitForm` only triggers FormKit's own validation/submission lifecycle -
  // it has no way to signal when that eventually resolves. A `handler` here is
  // the caller's *own* async work (e.g. an API call): it runs once, and only if
  // the form passed validation, with `isLoading` toggled around it and a failure
  // recorded in `error` and re-thrown through the returned promise (so a caller
  // that doesn't `await` still sees an unhandled rejection, never silence).
  // Omit `handler` and set `isLoading` yourself if you need it tied to
  // something else entirely.
  async function submit(handler?: () => unknown | Promise<unknown>): Promise<void> {
    if (!handler) {
      submitForm(id)
      return
    }
    const node = getNode(id)
    if (!node)
      throw new Error(`[nuxt-ui-formkit] useFormKitForm: no form with id "${id}" is mounted`)

    const thisSubmit = ++latestSubmit
    const passed = waitForSubmitted(node)
    submitForm(id)
    // A newer submit() supersedes this one: FormKit runs one pipeline for both,
    // so only the latest call runs its handler.
    if (!await passed || thisSubmit !== latestSubmit)
      return

    error.value = undefined
    isLoading.value = true
    try {
      await handler()
    }
    catch (handlerError) {
      error.value = handlerError
      throw handlerError
    }
    finally {
      isLoading.value = false
    }
  }

  function resetForm(resetTo?: unknown): void {
    reset(id, resetTo)
  }

  function setFormErrors(localErrors: ErrorMessages, childErrors?: ErrorMessages): void {
    setErrors(id, localErrors, childErrors)
  }

  function clearFormErrors(clearChildren?: boolean): void {
    clearErrors(id, clearChildren)
  }

  return {
    submit,
    reset: resetForm,
    setErrors: setFormErrors,
    clearErrors: clearFormErrors,
    isValid,
    isSubmitted,
    isDirty,
    hasErrors,
    isLoading,
    error,
  }
}
