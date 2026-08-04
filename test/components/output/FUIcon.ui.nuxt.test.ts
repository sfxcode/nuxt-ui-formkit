import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import FUIcon from '../../../src/runtime/components/output/FUIcon.vue'

// `UTooltip` needs a `TooltipProvider` context, only present inside a real
// `<UApp>` root (same requirement as `UEditor`'s toolbar - see
// test/components/inputs/FUEditor.ui.nuxt.test.ts).
function mountIconInApp(props: Record<string, unknown>) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(FUIcon, { name: 'i-heroicons-check-circle', ...props }),
      })
    },
  })

  return mountSuspended(Host)
}

describe('FUIcon tooltip prop', () => {
  it('renders the icon without any tooltip trigger markers when no tooltip is configured', async () => {
    const wrapper = await mountIconInApp({})

    const icon = wrapper.find('.iconify')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('data-state')).toBeUndefined()
    expect(icon.attributes('data-grace-area-trigger')).toBeUndefined()

    wrapper.unmount()
  })

  it('wraps the icon in a tooltip trigger when a tooltip option object is provided', async () => {
    const wrapper = await mountIconInApp({ tooltip: { text: 'Helpful hint' } })

    const icon = wrapper.find('.iconify')
    expect(icon.exists()).toBe(true)
    // Reka UI's TooltipTrigger merges these markers onto its `as-child` element
    // (here, the icon itself) as soon as a tooltip is configured, regardless of
    // open state - a stable signal that the icon is wrapped in a real tooltip.
    expect(icon.attributes('data-state')).toBe('closed')
    expect(icon.attributes('data-grace-area-trigger')).toBe('')

    wrapper.unmount()
  })
})
