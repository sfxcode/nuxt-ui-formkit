import type { ErrorMessages } from '@formkit/core'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { clearErrors, reset, setErrors, submitForm } from '@formkit/core'
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
  const hasErrors = computed(() => context.value?.state.errors ?? false)

  // `submitForm` only triggers FormKit's own validation/submission
  // lifecycle (running validation, marking the form submitted, and calling
  // whatever `@submit` handler is bound on the `<FormKit type="form">`
  // itself) - it has no way to signal when that eventually resolves. A
  // `handler` here is the caller's *own* async work (e.g. an API call),
  // wrapped so `isLoading` toggles around it without the caller having to
  // manage the ref manually. Omit `handler` and set `isLoading` yourself if
  // you need it tied to something else entirely.
  function submit(handler?: () => unknown | Promise<unknown>): void {
    submitForm(id)
    if (!handler)
      return
    isLoading.value = true
    void Promise.resolve(handler()).finally(() => {
      isLoading.value = false
    })
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
    hasErrors,
    isLoading,
  }
}
