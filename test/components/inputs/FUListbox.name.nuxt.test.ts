import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUIListboxDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUListbox name prop', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component, single mode', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit, { type: 'nuxtUIListbox', name: 'my-distinctive-name', options: ['a', 'b'] })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]] },
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.find('[name="my-distinctive-name"]').exists()).toBe(true)
  })

  it('suffixes distinct names for each pane in transfer mode, to avoid a native-form collision', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit, { type: 'nuxtUIListbox', name: 'my-distinctive-name', options: ['a', 'b'], displayMode: 'transfer', modelValue: [] })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]] },
    })
    activeWrapper = wrapper
    await settle()

    // Reka UI's hidden name-carrying input only renders per *selected* value
    // (empty selection -> nothing to serialize), and transfer mode's two
    // panes bind to local, unselectable-via-props refs - so the component's
    // own `name` prop is asserted directly rather than simulating a real
    // selection interaction, which is out of scope for this narrow test.
    const listboxes = wrapper.findAllComponents({ name: 'UListbox' })
    expect(listboxes.length).toBe(2)
    expect(listboxes[0]!.props('name')).toBe('my-distinctive-name-transfer-left')
    expect(listboxes[1]!.props('name')).toBe('my-distinctive-name-transfer-right')
  })
})
