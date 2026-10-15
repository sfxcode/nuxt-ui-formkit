import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nuxtUICalendarDefinition, nuxtUIPinInputDefinition, nuxtUITreeDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settleAndWait } from '../../support/settle'

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
  await settleAndWait()
  return wrapper
}

// Each of these regressed silently before: the prop was declared in the
// definition (so FormKit stripped it from `attrs`) but the component either
// never saw it or read a FormKit-owned context field instead.
describe('definition props reach the wrapped component', () => {
  it('nuxtUITree renders consumer-supplied `items` (not only `options`)', async () => {
    const wrapper = await mount({ type: 'nuxtUITree', name: 't', items: [{ label: 'Alpha' }, { label: 'Beta' }] })

    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.text()).toContain('Beta')
  })

  it('nuxtUITree still renders `options`', async () => {
    const wrapper = await mount({ type: 'nuxtUITree', name: 't', options: [{ label: 'Alpha' }] })

    expect(wrapper.text()).toContain('Alpha')
  })

  it('nuxtUICalendar passes calendarType (not FormKit\'s own type string) to UCalendar', async () => {
    const month = await mount({ type: 'nuxtUICalendar', name: 'c', calendarType: 'month' })
    const monthCells = month.findAll('[data-slot="cellTrigger"]').length
    month.unmount()
    activeWrapper = undefined

    const date = await mount({ type: 'nuxtUICalendar', name: 'c' })
    const dateCells = date.findAll('[data-slot="cellTrigger"]').length

    // A month picker shows 12 months; a date picker shows a month's worth of days.
    expect(monthCells).toBe(12)
    expect(dateCells).toBeGreaterThan(12)
  })

  it('nuxtUIPinInput honors pinType: number (digits only)', async () => {
    const wrapper = await mount({ type: 'nuxtUIPinInput', name: 'p', length: 4, pinType: 'number' })

    const first = wrapper.find('input')
    expect(first.attributes('inputmode')).toBe('numeric')
  })
})
