import { defaultConfig, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { z } from 'zod'
import FUDataEdit from '../../src/runtime/components/FUDataEdit.vue'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'

// Same reuse-of-id concern noted in useFormKitForm.nuxt.test.ts - every test
// shares the `test-data-edit` id in FormKit's global registry.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

const emailFormSchema = [
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
]

function mountDataEdit(props: Record<string, unknown>) {
  return mountSuspended(FUDataEdit, {
    props: {
      id: 'test-data-edit',
      schema: emailFormSchema,
      ...props,
    },
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition },
      })]],
    },
  })
}

// `FU*.vue` inputs don't yet wire a real DOM `blur` event to
// `context.handlers.blur` (see brain/backlog.md) - calling it directly here
// exercises the same `validationVisible` gate a real blur would, independent
// of that separate, pre-existing gap. `useFormKitContextById` doesn't need a
// component setup context (confirmed by reading its source - it only reads
// FormKit's global node registry), so it can be called directly in a test.
function blurEmail() {
  useFormKitContextById('test-data-edit').value?.node.at('email')?.context?.handlers.blur()
}

describe('FUDataEdit standardSchema prop', () => {
  it('surfaces a schema-derived error respecting validationVisibility, and blocks submit while invalid', async () => {
    const schema = z.object({ email: z.email() })

    const wrapper = await mountDataEdit({
      data: { email: 'bad' },
      standardSchema: schema,
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.text()).not.toContain('Invalid email address')

    blurEmail()
    await settle()

    expect(wrapper.text()).toContain('Invalid email address')

    // FormKit's own `type="form"` submit handling already gates on the
    // blocking-message ledger - it never calls the bound `@submit` handler
    // while any blocking message (native rule or, per this bridge,
    // schema-derived) is present, so `dataSaved` should not fire yet.
    await wrapper.find('form').trigger('submit')
    await settle()

    expect(wrapper.emitted('dataSaved')).toBeUndefined()

    await wrapper.find('input').setValue('ada@example.com')
    await settle()

    expect(wrapper.text()).not.toContain('Invalid email address')

    await wrapper.find('form').trigger('submit')
    await settle()

    expect(wrapper.emitted('dataSaved')).toBeTruthy()
  })

  it('omitting standardSchema leaves existing save behavior unchanged', async () => {
    const wrapper = await mountDataEdit({
      data: { email: 'anything' },
    })
    activeWrapper = wrapper
    await settle()

    await wrapper.find('form').trigger('submit')
    await settle()

    expect(wrapper.emitted('dataSaved')).toBeTruthy()
  })
})
