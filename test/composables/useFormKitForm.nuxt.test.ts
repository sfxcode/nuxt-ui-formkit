import { defaultConfig, FormKit, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { z } from 'zod'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { useFormKitForm } from '../../src/runtime/composables/useFormKitForm'

// `useFormKitForm` is meant to be called from arbitrary consumer code (e.g. a
// submit button outside the form), not from inside a `createInput`-rendered
// component - this mounts a host component that calls the composable
// alongside the actual `<FormKit type="form">` tree, mirroring how a real
// consumer page would wire a submit button to it.
const HostComponent = defineComponent({
  setup(_, { expose }) {
    const form = useFormKitForm('test-form')
    expose({ form })

    return () => h(FormKit, { type: 'form', id: 'test-form' }, {
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

async function mountHost() {
  const wrapper = await mountSuspended(HostComponent, {
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

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Matches the `(component.vm.$.exposed as unknown as {...})` pattern already
// used in repeater.regression.nuxt.test.ts for reading an `expose()`-exposed
// value with real typing.
function useExposedForm(wrapper: Awaited<ReturnType<typeof mountHost>>) {
  return (wrapper.vm.$.exposed as unknown as { form: ReturnType<typeof useFormKitForm> }).form
}

describe('useFormKitForm', () => {
  it('reflects isValid/hasErrors as the form is filled in', async () => {
    const wrapper = await mountHost()
    await flushPromises()
    await nextTick()
    await wait()

    const form = useExposedForm(wrapper)
    expect(form.isValid.value).toBe(false)

    await wrapper.find('input').setValue('ada@example.com')
    await flushPromises()
    await nextTick()
    await wait()

    expect(form.isValid.value).toBe(true)
  })

  it('marks the form submitted via submit()', async () => {
    const wrapper = await mountHost()
    await flushPromises()
    await nextTick()
    await wait()

    const form = useExposedForm(wrapper)
    expect(form.isSubmitted.value).toBe(false)

    form.submit()
    await flushPromises()
    await nextTick()
    await wait()

    expect(form.isSubmitted.value).toBe(true)
  })

  it('toggles isLoading around an async handler passed to submit()', async () => {
    const wrapper = await mountHost()
    await flushPromises()
    await nextTick()
    await wait()

    const form = useExposedForm(wrapper)
    expect(form.isLoading.value).toBe(false)

    let resolveWork: () => void = () => {}
    const work = new Promise<void>((resolve) => {
      resolveWork = resolve
    })

    form.submit(() => work)
    await nextTick()
    expect(form.isLoading.value).toBe(true)

    resolveWork()
    await flushPromises()
    await nextTick()

    expect(form.isLoading.value).toBe(false)
  })

  it('setErrors/clearErrors add and remove visible error messages', async () => {
    const wrapper = await mountHost()
    await flushPromises()
    await nextTick()
    await wait()

    const form = useExposedForm(wrapper)
    form.setErrors('Something went wrong')
    await flushPromises()
    await nextTick()
    await wait()

    expect(wrapper.text()).toContain('Something went wrong')
    expect(form.hasErrors.value).toBe(true)

    form.clearErrors()
    await flushPromises()
    await nextTick()
    await wait()

    expect(wrapper.text()).not.toContain('Something went wrong')
    expect(form.hasErrors.value).toBe(false)
  })

  it('reset() clears the form back to its default value', async () => {
    const wrapper = await mountHost()
    await flushPromises()
    await nextTick()
    await wait()

    await wrapper.find('input').setValue('ada@example.com')
    await flushPromises()
    await nextTick()
    await wait()
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('ada@example.com')

    const form = useExposedForm(wrapper)
    form.reset()
    await flushPromises()
    await nextTick()
    await wait()

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
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
    await flushPromises()
    await nextTick()
    await wait()

    const { form, blur } = useExposedFormWithSchema(wrapper)

    // `isValid` is driven by FormKit's blocking-message ledger, which counts
    // our `blocking: true` schema messages regardless of visibility - so it
    // reflects the failure immediately, same as a native rule failure would.
    expect(form.isValid.value).toBe(false)
    expect(wrapper.text()).not.toContain('Invalid email address')

    blur('email')
    await flushPromises()
    await nextTick()
    await wait()

    expect(wrapper.text()).toContain('Invalid email address')

    await wrapper.find('input').setValue('ada@example.com')
    await flushPromises()
    await nextTick()
    await wait()

    expect(form.isValid.value).toBe(true)
    expect(wrapper.text()).not.toContain('Invalid email address')
  })
})
