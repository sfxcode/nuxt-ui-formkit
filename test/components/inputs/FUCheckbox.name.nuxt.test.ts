import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUICheckboxDefinition } from '../../../src/runtime/formkit/definitions/input'

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

describe('FUCheckbox name prop', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit, { type: 'nuxtUICheckbox', name: 'my-distinctive-name' })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUICheckbox: nuxtUICheckboxDefinition } })]] },
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.find('[name="my-distinctive-name"]').exists()).toBe(true)
  })
})
