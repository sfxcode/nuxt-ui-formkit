import { getNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { z } from 'zod'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { useFormKitForm } from '../../src/runtime/composables/useFormKitForm'
import { settle } from '../support/settle'

// `useFormKitForm` is meant to be called from arbitrary consumer code (e.g. a
// submit button outside the form), not from inside a `createInput`-rendered
// component - this mounts a host component that calls the composable
// alongside the actual `<FormKit type="form">` tree, mirroring how a real
// consumer page would wire a submit button to it.
const HostComponent = defineComponent({
  props: {
    dirtyBehavior: { type: String as PropType<'touched' | 'compare'>, default: 'touched' },
    initial: { type: Object, default: undefined },
  },
  setup(props, { expose }) {
    const form = useFormKitForm('test-form')
    expose({ form })

    return () => h(FormKit, { type: 'form', id: 'test-form', dirtyBehavior: props.dirtyBehavior, value: props.initial }, {
      default: () => h(FormKit, {
        type: 'nuxtUIInput',
        name: 'email',
        label: 'Email',
        validation: 'required',
      }),
    })
  },
})

// Every test reuses the id `test-form` (FormKit's registry, and - since
// `submit()` needs `attachTo` below - the live DOM, are both global/module
// singletons keyed on it), so the previous test's `<form id="test-form">`
// and its FormKit node must be fully torn down before the next one mounts,
// or `getNode('test-form')`/`document.getElementById('test-form')` can
// resolve to a stale leftover instance instead of the current test's own.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

async function mountHost(hostProps: { dirtyBehavior?: 'touched' | 'compare', initial?: Record<string, unknown> } = {}) {
  const wrapper = await mountSuspended(HostComponent, {
    props: hostProps,
    // `submit()` wraps `@formkit/core`'s `submitForm(id)`, which looks the
    // form up via `document.getElementById(id)` and dispatches a real DOM
    // `submit` event - Vue Test Utils mounts into a detached tree by
    // default, so without `attachTo` the form is never actually in
    // `document` and `submitForm` just warns (W151) and no-ops.
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition },
      })]],
    },
  })
  activeWrapper = wrapper
  return wrapper
}

// Matches the `(component.vm.$.exposed as unknown as {...})` pattern already
// used in repeater.regression.nuxt.test.ts for reading an `expose()`-exposed
// value with real typing.
function useExposedForm(wrapper: Awaited<ReturnType<typeof mountHost>>) {
  return (wrapper.vm.$.exposed as unknown as { form: ReturnType<typeof useFormKitForm> }).form
}

// FormKit's own "every child has registered and settled" promise: the
// deterministic replacement for sleeping after a mount. The dirty-tracking
// snapshot of the initial value is taken at this point, so edits must not start
// before it.
async function formReady(id = 'test-form') {
  await getNode(id)!.settled
  await settle()
}

describe('useFormKitForm', () => {
  it('reports isDirty once a field differs from its initial value', async () => {
    const wrapper = await mountHost()
    await formReady()

    const form = useExposedForm(wrapper)
    expect(form.isDirty.value).toBe(false)

    await wrapper.find('input').setValue('ada@example.com')

    await vi.waitFor(() => expect(form.isDirty.value).toBe(true))
  })

  it('with dirtyBehavior="compare", isDirty clears when the value is edited back', async () => {
    const wrapper = await mountHost({ dirtyBehavior: 'compare', initial: { email: 'start@example.com' } })
    await formReady()

    const form = useExposedForm(wrapper)
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(form.isDirty.value).toBe(true))

    await wrapper.find('input').setValue('start@example.com')
    await vi.waitFor(() => expect(form.isDirty.value).toBe(false))
  })

  it('clears isDirty after reset()', async () => {
    const wrapper = await mountHost()
    await formReady()

    const form = useExposedForm(wrapper)
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(form.isDirty.value).toBe(true))

    form.reset()
    await vi.waitFor(() => expect(form.isDirty.value).toBe(false))
  })

  it('reflects isValid/hasErrors as the form is filled in', async () => {
    const wrapper = await mountHost()
    await formReady()

    const form = useExposedForm(wrapper)
    await vi.waitFor(() => expect(form.isValid.value).toBe(false))

    await wrapper.find('input').setValue('ada@example.com')

    await vi.waitFor(() => expect(form.isValid.value).toBe(true))
  })

  it('marks the form submitted via submit()', async () => {
    const wrapper = await mountHost()
    await formReady()

    const form = useExposedForm(wrapper)
    expect(form.isSubmitted.value).toBe(false)

    form.submit()

    await vi.waitFor(() => expect(form.isSubmitted.value).toBe(true))
  })

  describe('submit(handler)', () => {
    async function mountValidForm() {
      const wrapper = await mountHost()
      await formReady()
      await wrapper.find('input').setValue('ada@example.com')
      const form = useExposedForm(wrapper)
      await vi.waitFor(() => expect(form.isValid.value).toBe(true))
      return form
    }

    it('toggles isLoading around an async handler once the form is valid', async () => {
      const form = await mountValidForm()
      expect(form.isLoading.value).toBe(false)

      let resolveWork: () => void = () => {}
      const work = new Promise<void>((resolve) => {
        resolveWork = resolve
      })

      const done = form.submit(() => work)
      await vi.waitFor(() => expect(form.isLoading.value).toBe(true))

      resolveWork()
      await done

      expect(form.isLoading.value).toBe(false)
    })

    it('does not run the handler when validation fails', async () => {
      const wrapper = await mountHost()
      await formReady()
      const form = useExposedForm(wrapper)
      await vi.waitFor(() => expect(form.isValid.value).toBe(false))
      const handler = vi.fn()

      await form.submit(handler)

      expect(handler).not.toHaveBeenCalled()
      expect(form.isLoading.value).toBe(false)
      expect(form.isSubmitted.value).toBe(true)
    })

    it('resets isLoading and reports the error when the handler throws synchronously', async () => {
      const form = await mountValidForm()
      const failure = new Error('sync boom')

      await expect(form.submit(() => {
        throw failure
      })).rejects.toBe(failure)

      expect(form.isLoading.value).toBe(false)
      expect(form.error.value).toBe(failure)
    })

    it('resets isLoading and reports the error when the handler rejects', async () => {
      const form = await mountValidForm()
      const failure = new Error('async boom')

      await expect(form.submit(() => Promise.reject(failure))).rejects.toBe(failure)

      expect(form.isLoading.value).toBe(false)
      expect(form.error.value).toBe(failure)
    })

    it('clears the previous error on the next successful submit', async () => {
      const form = await mountValidForm()
      await form.submit(() => Promise.reject(new Error('first'))).catch(() => {})
      expect(form.error.value).toBeDefined()

      await form.submit(() => {})

      expect(form.error.value).toBeUndefined()
    })

    it('runs the handler only once when submit() is called twice before validation settles', async () => {
      const form = await mountValidForm()
      const handler = vi.fn()

      await Promise.all([form.submit(handler), form.submit(handler)])

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('rejects with a clear error when no form with that id is mounted', async () => {
      const wrapper = await mountHost()
      await formReady()
      const form = useExposedForm(wrapper)
      wrapper.unmount()
      activeWrapper = undefined

      await expect(form.submit(() => {})).rejects.toThrow(/no form with id "test-form"/)
    })
  })

  it('setErrors/clearErrors add and remove visible error messages', async () => {
    const wrapper = await mountHost()
    await formReady()

    const form = useExposedForm(wrapper)
    form.setErrors('Something went wrong')

    await vi.waitFor(() => expect(wrapper.text()).toContain('Something went wrong'))
    expect(form.hasErrors.value).toBe(true)

    form.clearErrors()

    await vi.waitFor(() => expect(wrapper.text()).not.toContain('Something went wrong'))
    expect(form.hasErrors.value).toBe(false)
  })

  it('reset() clears the form back to its default value', async () => {
    const wrapper = await mountHost()
    await formReady()

    const inputValue = () => (wrapper.find('input').element as HTMLInputElement).value
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(inputValue()).toBe('ada@example.com'))

    const form = useExposedForm(wrapper)
    form.reset()

    await vi.waitFor(() => expect(inputValue()).toBe(''))
  })
})

// `FU*.vue` inputs don't yet wire a real DOM `blur` event to
// `context.handlers.blur` (see brain/backlog.md) - calling it directly here
// exercises the same `validationVisible` gate a real blur would, independent
// of that separate, pre-existing gap.
function mountHostWithSchema(schema: z.ZodType) {
  const HostComponent = defineComponent({
    setup(_, { expose }) {
      const form = useFormKitForm('schema-test-form', { standardSchema: schema })
      const nodeContext = useFormKitContextById('schema-test-form')

      function blur(name: string) {
        nodeContext.value?.node.at(name)?.context?.handlers.blur()
      }

      expose({ form, blur })

      return () => h(FormKit, { type: 'form', id: 'schema-test-form' }, {
        default: () => h(FormKit, {
          type: 'nuxtUIInput',
          name: 'email',
          label: 'Email',
          value: 'bad',
        }),
      })
    },
  })

  return mountSuspended(HostComponent, {
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition },
      })]],
    },
  })
}

function useExposedFormWithSchema(wrapper: Awaited<ReturnType<typeof mountHostWithSchema>>) {
  return (wrapper.vm.$.exposed as unknown as { form: ReturnType<typeof useFormKitForm>, blur: (name: string) => void })
}

describe('useFormKitForm with a standardSchema', () => {
  it('surfaces a schema-derived error respecting validationVisibility, and isValid reflects it the same way it reflects a rule failure', async () => {
    const schema = z.object({ email: z.email() })

    const wrapper = await mountHostWithSchema(schema)
    activeWrapper = wrapper

    const { form, blur } = useExposedFormWithSchema(wrapper)

    // `isValid` is driven by FormKit's blocking-message ledger, which counts
    // our `blocking: true` schema messages regardless of visibility - so it
    // reflects the failure as soon as the first schema run finishes, same as a
    // native rule failure would.
    await vi.waitFor(() => expect(form.isValid.value).toBe(false))
    expect(wrapper.text()).not.toContain('Invalid email address')

    blur('email')

    await vi.waitFor(() => expect(wrapper.text()).toContain('Invalid email address'))

    await wrapper.find('input').setValue('ada@example.com')

    await vi.waitFor(() => expect(form.isValid.value).toBe(true))
    expect(wrapper.text()).not.toContain('Invalid email address')
  })
})
