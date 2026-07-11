import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputNumberDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputNumber ui prop', () => {
  it('merges ui.root/ui.icon into the rendered container, alongside color-derived classes', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputNumber',
        id: 'output-number-ui-test',
        modelValue: 42,
        color: 'success',
        leadingIcon: 'i-heroicons-check-circle',
        ui: { root: 'my-distinctive-root-class', icon: 'my-distinctive-icon-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputNumber: nuxtUIOutputNumberDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-number-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-success')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)
  })
})
