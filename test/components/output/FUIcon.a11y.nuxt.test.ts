import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import FUIcon from '../../../src/runtime/components/output/FUIcon.vue'

// `UTooltip` needs a `TooltipProvider`, only present inside a real `<UApp>`.
function mountIcon(props: Record<string, unknown>) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(FUIcon, { name: 'i-lucide-eye-off', ...props }),
      })
    },
  })
  return mountSuspended(Host)
}

describe('FUIcon accessibility', () => {
  describe('with a click handler', () => {
    it('renders a real, focusable button that calls the handler', async () => {
      const onClick = vi.fn()
      const wrapper = await mountIcon({ onClick })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
      expect(button.attributes('type')).toBe('button')
      expect((button.element as HTMLButtonElement).tabIndex).toBe(0)
      expect(button.find('.iconify').exists()).toBe(true)

      await button.trigger('click')
      expect(onClick).toHaveBeenCalledOnce()
      wrapper.unmount()
    })

    it('names the button from an explicit ariaLabel first', async () => {
      const wrapper = await mountIcon({ onClick: vi.fn(), ariaLabel: 'Show password', tooltip: { text: 'ignored' } })

      expect(wrapper.find('button').attributes('aria-label')).toBe('Show password')
      wrapper.unmount()
    })

    it('falls back to the tooltip text', async () => {
      const wrapper = await mountIcon({ onClick: vi.fn(), tooltip: { text: 'Copy to clipboard' } })

      expect(wrapper.find('button').attributes('aria-label')).toBe('Copy to clipboard')
      wrapper.unmount()
    })

    it('falls back to the icon name so the button is never unnamed', async () => {
      const wrapper = await mountIcon({ onClick: vi.fn() })

      expect(wrapper.find('button').attributes('aria-label')).toBe('eye off')
      wrapper.unmount()
    })

    it('hides the inner icon from assistive tech and keeps the tooltip trigger on the button', async () => {
      const wrapper = await mountIcon({ onClick: vi.fn(), tooltip: { text: 'Hint' } })

      expect(wrapper.find('button .iconify').attributes('aria-hidden')).toBe('true')
      expect(wrapper.find('button').attributes('data-state')).toBe('closed')
      wrapper.unmount()
    })
  })

  describe('without a click handler', () => {
    it('is decorative: no button, hidden from assistive tech', async () => {
      const wrapper = await mountIcon({})

      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.find('.iconify').attributes('aria-hidden')).toBe('true')
      wrapper.unmount()
    })

    it('is exposed as a labelled image when it carries a tooltip', async () => {
      const wrapper = await mountIcon({ tooltip: { text: 'Verified account' } })

      const icon = wrapper.find('.iconify')
      expect(icon.attributes('aria-hidden')).toBe('false')
      expect(icon.attributes('role')).toBe('img')
      expect(icon.attributes('aria-label')).toBe('Verified account')
      wrapper.unmount()
    })
  })
})
