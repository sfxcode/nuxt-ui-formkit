import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputBadgeDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputBadge ui prop', () => {
  it('merges ui.root/ui.icon/ui.badge into the rendered container, icon, and UBadge', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputBadge',
        id: 'output-badge-ui-test',
        modelValue: 'Active',
        color: 'success',
        leadingIcon: 'i-heroicons-check-circle',
        ui: {
          root: 'my-distinctive-root-class',
          icon: 'my-distinctive-icon-class',
          badge: { base: 'my-distinctive-badge-base-class' },
        },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputBadge: nuxtUIOutputBadgeDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-badge-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-success')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)

    const badge = wrapper.find('.my-distinctive-badge-base-class')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('Active')
  })
})

describe('FUOutputBadge variant mapping', () => {
  it('maps ghost and none to UBadge\'s soft variant styling, matching FUOutputList\'s established mapping', async () => {
    async function badgeSlotClasses(variant: string | undefined) {
      const wrapper = await mountSuspended(FormKit, {
        props: {
          type: 'nuxtUIOutputBadge',
          id: `badge-variant-${variant ?? 'undefined'}`,
          modelValue: 'Active',
          color: 'success',
          variant,
        },
        global: {
          plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputBadge: nuxtUIOutputBadgeDefinition } })]],
        },
      })
      await settle()
      const classes = wrapper.find('[data-slot="base"]').classes().sort().join(' ')
      wrapper.unmount()
      return classes
    }

    const softClasses = await badgeSlotClasses('soft')
    const ghostClasses = await badgeSlotClasses('ghost')
    const noneClasses = await badgeSlotClasses('none')
    const subtleClasses = await badgeSlotClasses('subtle')

    expect(ghostClasses).toBe(softClasses)
    expect(noneClasses).toBe(softClasses)
    expect(subtleClasses).not.toBe(softClasses)
  })
})
