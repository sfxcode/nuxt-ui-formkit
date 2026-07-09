import type { FormKitNode } from '@formkit/core'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIInputNumberDefinition, nuxtUIInputTagsDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'

async function settle() {
  await flushPromises()
  await nextTick()
}

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUInputNumber blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIInputNumber',
      value: undefined,
      inputs: { nuxtUIInputNumber: nuxtUIInputNumberDefinition },
      props: { validation: 'required' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    await wrapper.find('input').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })
})

describe('FUInputTags blur wiring', () => {
  it('reveals the validation message only after a real DOM blur on the tag-entry field, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIInputTags',
      value: [],
      inputs: { nuxtUIInputTags: nuxtUIInputTagsDefinition },
      props: { validation: 'required' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // With no tags entered yet, the only rendered `<input>` is the tag-entry
    // text field itself - the natural, single blur target for this component.
    await wrapper.find('input').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })
})
