import type { FormKitNode } from '@formkit/core'
import { describe, expect, it } from 'vitest'
import { nuxtUIInputRatingDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'
import { settle } from '../../support/settle'

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

// `@blur` on `UInputRating` relies on it forwarding `$attrs` onto an internal
// element, not a documented emit - a failure here after a `@nuxt/ui` upgrade
// is the expected signal, not a silent rot.
describe('FUInputRating blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIInputRating',
      value: 0,
      inputs: { nuxtUIInputRating: nuxtUIInputRatingDefinition },
      props: { validation: 'min:1' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toMatch(/must be at least/i)

    await wrapper.find('[role="radiogroup"]').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toMatch(/must be at least/i)
  })
})
