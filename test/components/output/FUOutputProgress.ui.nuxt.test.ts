import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputProgressDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputProgress ui prop', () => {
  it('merges ui.root/ui.icon/ui.progress into the rendered container, icon, and UProgress', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputProgress',
        id: 'output-progress-ui-test',
        modelValue: 42,
        color: 'success',
        leadingIcon: 'i-heroicons-check-circle',
        ui: {
          root: 'my-distinctive-root-class',
          icon: 'my-distinctive-icon-class',
          progress: { root: 'my-distinctive-progress-root-class' },
        },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputProgress: nuxtUIOutputProgressDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-progress-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-success')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)

    const progress = wrapper.find('.my-distinctive-progress-root-class')
    expect(progress.exists()).toBe(true)
  })
})
