import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUICheckboxGroupDefinition } from '../../../src/runtime/formkit/definitions/input'

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

describe('FUCheckboxGroup name prop', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component (pre-existing binding was silently broken - context.name never worked)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        // Reka UI's `CheckboxGroupRoot` only renders a hidden native input
        // per *selected* value (empty selection -> nothing to serialize),
        // so at least one item must be selected for the name to reach the DOM.
        default: () => [h(FormKit, { type: 'nuxtUICheckboxGroup', name: 'my-distinctive-name', options: ['a', 'b'], modelValue: ['a'] })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUICheckboxGroup: nuxtUICheckboxGroupDefinition } })]] },
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.find('[name^="my-distinctive-name"]').exists()).toBe(true)
  })
})
