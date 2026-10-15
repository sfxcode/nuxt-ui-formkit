import type { FormKitNode } from '@formkit/core'
import { describe, expect, it } from 'vitest'
import { nuxtUIInputTagsDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'
import { settle } from '../../support/settle'

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUInputTags blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
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

    await wrapper.find('input').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })
})
