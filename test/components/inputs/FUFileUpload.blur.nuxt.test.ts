import type { FormKitNode } from '@formkit/core'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIFileUploadDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'

async function settle() {
  await flushPromises()
  await nextTick()
}

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

// `@blur` on `UFileUpload` relies on its `inheritAttrs: false` + manual
// `$attrs` spread directly onto the hidden native `<input type="file">`,
// not a documented emit - if a future `@nuxt/ui` upgrade changes that
// internal detail, this test failing is the expected signal, not a silent
// rot.
describe('FUFileUpload blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIFileUpload',
      value: undefined,
      inputs: { nuxtUIFileUpload: nuxtUIFileUploadDefinition },
      props: { validation: 'required' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    await wrapper.find('input[type="file"]').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })
})
