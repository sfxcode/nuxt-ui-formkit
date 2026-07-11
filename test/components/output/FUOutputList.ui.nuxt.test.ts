import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputListDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputList ui prop', () => {
  it('merges ui.root/ui.icon into the rendered container in default (span) list mode', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputList',
        id: 'output-list-ui-test',
        modelValue: ['a', 'b'],
        color: 'secondary',
        leadingIcon: 'i-heroicons-check-circle',
        ui: { root: 'my-distinctive-root-class', icon: 'my-distinctive-icon-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputList: nuxtUIOutputListDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-list-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-secondary')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)
  })

  it('forwards ui.badge unmodified onto UBadge in badge display mode', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputList',
        id: 'output-list-badge-ui-test',
        modelValue: ['a', 'b'],
        listType: 'badge',
        ui: { badge: { base: 'my-distinctive-badge-class' } },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputList: nuxtUIOutputListDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const badges = wrapper.findAll('[data-slot="base"]')
    expect(badges.length).toBeGreaterThan(0)
    for (const badge of badges)
      expect(badge.classes()).toContain('my-distinctive-badge-class')
  })
})
