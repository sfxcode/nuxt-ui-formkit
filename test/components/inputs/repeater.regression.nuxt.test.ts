import type { FormKitNode } from '@formkit/core'
import { FormKit } from '@formkit/vue'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'
import { mountFormKit } from '../../support/mountFormKit'

function mountRepeater(value: object[], props: Record<string, unknown> = {}) {
  return mountFormKit({
    type: 'nuxtUIRepeater',
    value,
    inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition },
    props: {
      insertButtonLabel: 'Add Item',
      alwaysDisplayInsertButton: true,
      displayDeleteButton: true,
      hideMoveButtons: true,
      ...props,
    },
  })
}

// The inner `list` node is architecturally disconnected from the outer
// `nuxtUIRepeater` node (see the `syncOuterValue` comment in
// useFormKitRepeater.ts), so its validation state must be read off its own
// node - found via the shared FormKitRuntimeComponent every `$formkit`
// schema entry renders through, not the outer node exposed by `wrapper.vm`.
function findListNode(wrapper: Awaited<ReturnType<typeof mountRepeater>>): FormKitNode {
  const listComponent = wrapper.findAllComponents(FormKit).find((component) => {
    const exposed = component.vm.$.exposed as unknown as { node?: FormKitNode } | undefined
    return exposed?.node?.type === 'list'
  })
  if (!listComponent)
    throw new Error('expected the repeater to render a nested list node')
  return (listComponent.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('nuxtUIRepeater regression: pre-populated array value binding', () => {
  it('renders every pre-populated item on initial mount', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }])

    expect(wrapper.findAll('[id^="formkit-item-"]')).toHaveLength(2)
  })

  it('inserts a new item when the insert button is clicked', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }])

    const insertButton = wrapper.findAll('button').find(button => button.text().includes('Add Item'))
    expect(insertButton).toBeDefined()

    await insertButton!.trigger('click')
    await flushPromises()
    await nextTick()

    expect(wrapper.findAll('[id^="formkit-item-"]')).toHaveLength(3)
  })

  it('removes an item when its remove button is clicked', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }])

    const [firstItem] = wrapper.findAll('[id^="formkit-item-"]')
    expect(firstItem).toBeDefined()
    const removeButton = firstItem!.find('button')
    expect(removeButton.exists()).toBe(true)

    await removeButton.trigger('click')
    await flushPromises()
    await nextTick()

    expect(wrapper.findAll('[id^="formkit-item-"]')).toHaveLength(1)
  })

  it('keeps the outer node value in sync after insert (value-sync fix)', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }])

    const insertButton = wrapper.findAll('button').find(button => button.text().includes('Add Item'))
    expect(insertButton).toBeDefined()

    await insertButton!.trigger('click')
    await flushPromises()
    await nextTick()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    const lastValue = emitted![emitted!.length - 1]![0] as object[]
    expect(lastValue).toHaveLength(3)
  })

  it('keeps the outer node value in sync after remove (value-sync fix)', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }])

    const [firstItem] = wrapper.findAll('[id^="formkit-item-"]')
    const removeButton = firstItem!.find('button')

    await removeButton.trigger('click')
    await flushPromises()
    await nextTick()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    const lastValue = emitted![emitted!.length - 1]![0] as object[]
    expect(lastValue).toHaveLength(1)
  })
})

describe('nuxtUIRepeater minItems/maxItems validation', () => {
  it('reports invalid when the seeded value violates minItems', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }], { minItems: 2 })
    await flushPromises()
    await nextTick()

    const listNode = findListNode(wrapper)
    expect(listNode.context?.state.valid).toBe(false)
  })

  it('reports valid when the seeded value satisfies minItems/maxItems', async () => {
    const wrapper = await mountRepeater([{ title: 'First' }, { title: 'Second' }], { minItems: 2, maxItems: 5 })
    await flushPromises()
    await nextTick()

    const listNode = findListNode(wrapper)
    expect(listNode.context?.state.valid).toBe(true)
  })
})
