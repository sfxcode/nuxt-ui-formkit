import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import { nuxtUIOutputTextDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputText ui prop', () => {
  it('merges ui.root/ui.icon into the rendered container, alongside color-derived classes', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputText',
        id: 'output-text-ui-test',
        modelValue: 'Hello world',
        color: 'primary',
        leadingIcon: 'i-heroicons-check-circle',
        ui: { root: 'my-distinctive-root-class', icon: 'my-distinctive-icon-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputText: nuxtUIOutputTextDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-text-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-primary')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)
  })
})

describe('FUOutputText icon tooltip props', () => {
  // `UTooltip` needs a `TooltipProvider` context, only present inside a real
  // `<UApp>` root (same requirement as `UEditor`'s toolbar - see
  // test/components/inputs/FUEditor.ui.nuxt.test.ts).
  it('wires leadingIconTooltip through to the rendered leading icon', async () => {
    const Host = defineComponent({
      setup() {
        return () => h(UApp, null, {
          default: () => h(FormKit, {
            type: 'nuxtUIOutputText',
            id: 'output-text-tooltip-test',
            modelValue: 'Hello world',
            leadingIcon: 'i-heroicons-check-circle',
            leadingIconTooltip: { text: 'Verified' },
          }),
        })
      },
    })

    const wrapper = await mountSuspended(Host, {
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputText: nuxtUIOutputTextDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const icon = wrapper.find('.iconify')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('data-state')).toBe('closed')
  })
})
