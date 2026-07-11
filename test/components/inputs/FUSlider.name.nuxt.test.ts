import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUISliderDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
  await nextTick()
}

// jsdom has no ResizeObserver; reka-ui's SliderRoot reads its own size via
// one on mount - unrelated to the `name` prop fix this test targets.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUSlider name prop', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component (pre-existing binding was silently broken - context.name never worked)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit, { type: 'nuxtUISlider', name: 'my-distinctive-name', modelValue: 0 })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUISlider: nuxtUISliderDefinition } })]] },
    })
    activeWrapper = wrapper
    await settle()

    // Reka UI's Slider always treats its value as an array of thumb positions
    // internally, so the hidden input's name is indexed (`name[0]`), not bare.
    expect(wrapper.find('[name^="my-distinctive-name"]').exists()).toBe(true)
  })
})
