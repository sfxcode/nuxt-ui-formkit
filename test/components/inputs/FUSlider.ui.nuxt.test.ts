import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUISliderDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

// jsdom has no ResizeObserver; reka-ui's SliderRoot reads its own size via
// one on mount (`useSize`), so mounting throws without this stub - unrelated
// to the `ui` prop fix this test targets.
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

describe('FUSlider ui prop', () => {
  it('forwards a custom ui value onto the rendered root, unlike before this fix (context.ui collision)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUISlider',
        modelValue: 0,
        ui: { root: 'my-distinctive-root-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUISlider: nuxtUISliderDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const root = wrapper.find('[data-slot="root"]')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('my-distinctive-root-class')
  })
})
