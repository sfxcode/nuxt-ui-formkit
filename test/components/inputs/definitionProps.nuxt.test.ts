import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nuxtUICalendarDefinition, nuxtUIPinInputDefinition, nuxtUITreeDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settle } from '../../support/settle'

// jsdom has no ResizeObserver; reka-ui reads sizes via one on mount.
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

async function mount(props: Record<string, unknown>) {
  const wrapper = await mountSuspended(FormKit, {
    props,
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUICalendar: nuxtUICalendarDefinition, nuxtUIPinInput: nuxtUIPinInputDefinition, nuxtUITree: nuxtUITreeDefinition },
      })]],
    },
  })
  activeWrapper = wrapper
  await settle()
  return wrapper
}

// Each of these regressed silently before: the prop was declared in the
// definition (so FormKit stripped it from `attrs`) but the component either
// never saw it or read a FormKit-owned context field instead.
describe('definition props reach the wrapped component', () => {
  it('nuxtUITree renders consumer-supplied `items` (not only `options`)', async () => {
    const wrapper = await mount({ type: 'nuxtUITree', name: 't', items: [{ label: 'Alpha' }, { label: 'Beta' }] })

    await vi.waitFor(() => expect(wrapper.text()).toContain('Beta'))
    expect(wrapper.text()).toContain('Alpha')
  })

  it('nuxtUITree still renders `options`', async () => {
    const wrapper = await mount({ type: 'nuxtUITree', name: 't', options: [{ label: 'Alpha' }] })

    await vi.waitFor(() => expect(wrapper.text()).toContain('Alpha'))
  })

  it('nuxtUICalendar passes calendarType (not FormKit\'s own type string) to UCalendar', async () => {
    const month = await mount({ type: 'nuxtUICalendar', name: 'c', calendarType: 'month' })
    // A month picker shows 12 months.
    await vi.waitFor(() => expect(month.findAll('[data-slot="cellTrigger"]')).toHaveLength(12))
    month.unmount()
    activeWrapper = undefined

    const date = await mount({ type: 'nuxtUICalendar', name: 'c' })
    // A date picker shows a month's worth of days.
    await vi.waitFor(() => expect(date.findAll('[data-slot="cellTrigger"]').length).toBeGreaterThan(12))
  })

  it('nuxtUIPinInput honors pinType: number (digits only)', async () => {
    const wrapper = await mount({ type: 'nuxtUIPinInput', name: 'p', length: 4, pinType: 'number' })

    await vi.waitFor(() => expect(wrapper.find('input').attributes('inputmode')).toBe('numeric'))
  })
})
