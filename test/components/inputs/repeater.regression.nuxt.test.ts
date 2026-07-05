import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'
import { mountFormKit } from '../../support/mountFormKit'

function mountRepeater(value: object[]) {
  return mountFormKit({
    type: 'nuxtUIRepeater',
    value,
    inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition },
    props: {
      insertButtonLabel: 'Add Item',
      alwaysDisplayInsertButton: true,
      displayDeleteButton: true,
      hideMoveButtons: true,
    },
  })
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
})
