import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputRatingDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputRating ui prop', () => {
  it('merges ui.root/ui.icon/ui.rating into the rendered container, icon, and UInputRating', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputRating',
        id: 'output-rating-ui-test',
        modelValue: 3,
        length: 5,
        color: 'success',
        leadingIcon: 'i-heroicons-check-circle',
        ui: {
          root: 'my-distinctive-root-class',
          icon: 'my-distinctive-icon-class',
          rating: { root: 'my-distinctive-rating-root-class' },
        },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputRating: nuxtUIOutputRatingDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-rating-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-success')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)

    const rating = wrapper.find('.my-distinctive-rating-root-class')
    expect(rating.exists()).toBe(true)
  })
})
