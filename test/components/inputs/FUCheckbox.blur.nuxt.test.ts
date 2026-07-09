import type { FormKitNode } from '@formkit/core'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUICheckboxDefinition, nuxtUISwitchDefinition } from '../../../src/runtime/formkit/definitions/input'
import { mountFormKit } from '../../support/mountFormKit'

async function settle() {
  await flushPromises()
  await nextTick()
}

function exposedNode(wrapper: Awaited<ReturnType<typeof mountFormKit>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

// `@blur` on `UCheckbox`/`USwitch` relies on their `inheritAttrs: false` +
// manual `$attrs` spread onto their internal focusable element, not a
// documented emit - if a future `@nuxt/ui` upgrade changes that internal
// detail, these tests failing is the expected signal, not a silent rot.
describe('FUCheckbox blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUICheckbox',
      value: false,
      inputs: { nuxtUICheckbox: nuxtUICheckboxDefinition },
      // FormKit's `required` rule treats a boolean `false` as a present,
      // non-empty value (confirmed reading `@formkit/utils`'s `empty()` -
      // it only special-cases number/string/object, falling through to
      // `false` i.e. "not empty" for booleans) - so `required` never fails
      // for an unchecked checkbox/switch. `accepted` is the rule that
      // actually means "must be truthy," and is what fails here.
      props: { validation: 'accepted' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('Please accept')

    await wrapper.find('[role="checkbox"], input, button').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('Please accept')
  })
})

describe('FUSwitch blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUISwitch',
      value: false,
      inputs: { nuxtUISwitch: nuxtUISwitchDefinition },
      // FormKit's `required` rule treats a boolean `false` as a present,
      // non-empty value (confirmed reading `@formkit/utils`'s `empty()` -
      // it only special-cases number/string/object, falling through to
      // `false` i.e. "not empty" for booleans) - so `required` never fails
      // for an unchecked checkbox/switch. `accepted` is the rule that
      // actually means "must be truthy," and is what fails here.
      props: { validation: 'accepted' },
    })
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('Please accept')

    await wrapper.find('[role="switch"], input, button').trigger('blur')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('Please accept')
  })
})
