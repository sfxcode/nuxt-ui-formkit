import type { FormKitNode } from '@formkit/core'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIInputMenuDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'

async function settle() {
  await flushPromises()
  await nextTick()
}

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUInputMenu blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIInputMenu',
      value: '',
      inputs: { nuxtUIInputMenu: nuxtUIInputMenuDefinition },
      props: { validation: 'required', options: ['a', 'b', 'c'] },
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
