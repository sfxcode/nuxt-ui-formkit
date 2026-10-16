import { getNode } from '@formkit/core'
import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import FUDataEdit from '../../src/runtime/components/FUDataEdit.vue'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { settleAndWait } from '../support/settle'

// Same reuse-of-id concern noted in useFormKitForm.nuxt.test.ts - every test
// shares the `test-data-edit` id in FormKit's global registry.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

const emailFormSchema = [
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
]

function mountDataEdit(props: Record<string, unknown>) {
  return mountSuspended(FUDataEdit, {
    attachTo: document.body,
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

describe('FUDataEdit standardSchema prop', () => {
  it('surfaces a schema-derived error respecting validationVisibility, and blocks submit while invalid', async () => {
    const schema = z.object({ email: z.email() })

    const wrapper = await mountDataEdit({
      data: { email: 'bad' },
      standardSchema: schema,
    })
    activeWrapper = wrapper
    // The first schema run has finished once the form reports invalid.
    await vi.waitFor(() => expect(getNode('test-data-edit')?.context?.state.valid).toBe(false))

    expect(wrapper.text()).not.toContain('Invalid email address')

    await wrapper.find('input').trigger('blur')

    await vi.waitFor(() => expect(wrapper.text()).toContain('Invalid email address'))

    // FormKit's own `type="form"` submit handling already gates on the
    // blocking-message ledger - it never calls the bound `@submit` handler
    // while any blocking message (native rule or, per this bridge,
    // schema-derived) is present, so `dataSaved` should not fire yet.
    await wrapper.find('form').trigger('submit')
    // Absence over a window: nothing positive to wait on for "was not emitted",
    // so let the submit's validation gating run out before asserting.
    await settleAndWait()

    expect(wrapper.emitted('dataSaved')).toBeUndefined()

    await wrapper.find('input').setValue('ada@example.com')

    await vi.waitFor(() => expect(wrapper.text()).not.toContain('Invalid email address'))
    await vi.waitFor(() => expect(getNode('test-data-edit')?.context?.state.valid).toBe(true))

    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => expect(wrapper.emitted('dataSaved')).toBeTruthy())
  })

  it('omitting standardSchema leaves existing save behavior unchanged', async () => {
    const wrapper = await mountDataEdit({
      data: { email: 'anything' },
    })
    activeWrapper = wrapper
    await getNode('test-data-edit')!.settled

    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => expect(wrapper.emitted('dataSaved')).toBeTruthy())
  })
})
