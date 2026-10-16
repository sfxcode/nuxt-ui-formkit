import type { FormKitSchemaNode } from '@formkit/core'
import { getNode } from '@formkit/core'
import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FUDataEdit from '../../src/runtime/components/FUDataEdit.vue'
import { nuxtUICheckboxDefinition, nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function mountDataEdit(schema: FormKitSchemaNode[], data: Record<string, unknown> = {}) {
  return mountSuspended(FUDataEdit, {
    attachTo: document.body,
    props: { id: 'test-schema-change', schema, data },
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition, nuxtUICheckbox: nuxtUICheckboxDefinition },
      })]],
    },
  })
}

// A FormKit node is built once from its `type` and its props, so patching an existing
// `<FormKit>` in place leaves the old input behind when the schema replaces it.
describe('FUDataEdit when the schema prop changes', () => {
  it('renders the new input type, not the old one at the same position', async () => {
    const wrapper = await mountDataEdit([
      { $formkit: 'nuxtUIInput', id: 'first', name: 'first', label: 'First', validation: 'required' },
    ])
    activeWrapper = wrapper
    await vi.waitFor(() => expect(getNode('first')?.props.type).toBe('nuxtUIInput'))

    await wrapper.setProps({
      schema: [{ $formkit: 'nuxtUICheckbox', id: 'second', name: 'second', label: 'Second' }],
    })

    await vi.waitFor(() => expect(getNode('second')?.props.type).toBe('nuxtUICheckbox'))
    expect(wrapper.find('[role="checkbox"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Second')
  })

  it('does not carry the old field\'s validation over to its replacement', async () => {
    const wrapper = await mountDataEdit([
      { $formkit: 'nuxtUIInput', id: 'first', name: 'first', label: 'First', validation: 'required' },
    ])
    activeWrapper = wrapper
    await vi.waitFor(() => expect(getNode('first')?.context?.state.required).toBe(true))

    await wrapper.setProps({
      schema: [{ $formkit: 'nuxtUIInput', id: 'second', name: 'second', label: 'Second' }],
    })

    await vi.waitFor(() => expect(wrapper.text()).toContain('Second'))
    expect(getNode('second')?.context?.state.required).toBeFalsy()
  })

  it('keeps the values the user has already entered when the structure changes', async () => {
    const wrapper = await mountDataEdit(
      [{ $formkit: 'nuxtUIInput', id: 'first', name: 'first', label: 'First' }],
      { first: 'Ada' },
    )
    activeWrapper = wrapper
    await vi.waitFor(() => expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Ada'))

    await wrapper.setProps({
      schema: [
        { $formkit: 'nuxtUICheckbox', id: 'second', name: 'second', label: 'Second' },
        { $formkit: 'nuxtUIInput', id: 'first', name: 'first', label: 'First' },
      ],
    })

    await vi.waitFor(() => expect(getNode('second')?.props.type).toBe('nuxtUICheckbox'))
    await vi.waitFor(() => expect(getNode('first')?.value).toBe('Ada'))
  })
})
