import { CalendarDate, getLocalTimeZone } from '@internationalized/date'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { useState } from '#app'
import { nuxtUICalendarDefinition, nuxtUIInputDateDefinition } from '../../src/runtime/formkit/definitions/input'
import { useHydrationSafeTimeZone } from '../../src/runtime/utils/useHydrationSafeTimeZone'
import { mountFormKit } from '../support/mountFormKit'

// The time zone date values are converted in must be the same for the server render and the
// hydration render (the browser's zone can put it on a different calendar day), then become
// the browser's own zone once mounted. The server's zone reaches the browser through Nuxt state,
// which the module's runtime plugin provides.
//
// The real local zone is used, not a mock: the nuxt project runs with `isolate: false`, so a module
// another test file already loaded cannot be re-mocked.
const STATE_KEY = 'nuxt-ui-formkit-time-zone'
const LOCAL = getLocalTimeZone()

// 2020-12-12T23:30:00Z: Dec 13 at UTC+14, Dec 12 at UTC-12.
const instant = new Date(Date.UTC(2020, 11, 12, 23, 30))
const partsIn = (timeZone: string) => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(instant).map(part => [part.type, part.value]))
  return [parts.month, parts.day, parts.year]
}
// A zone that puts the instant on a different day than the local one does.
const SERVER_ZONE = partsIn(LOCAL)[1] === '13' ? 'Etc/GMT+12' : 'Pacific/Kiritimati'

const serverState = () => useState<string>(STATE_KEY)

afterEach(() => {
  serverState().value = LOCAL
})

describe('useHydrationSafeTimeZone', () => {
  it('starts in the zone Nuxt state carries (the server\'s) and becomes the browser\'s once mounted', async () => {
    serverState().value = SERVER_ZONE
    const seen: string[] = []
    const Probe = defineComponent({
      setup() {
        const zone = useHydrationSafeTimeZone(() => undefined)
        seen.push(zone.value) // the render the server and the hydration share
        return () => h('i', zone.value)
      },
    })

    const wrapper = await mountSuspended(Probe)

    expect(seen).toEqual([SERVER_ZONE])
    await vi.waitFor(() => expect(wrapper.text()).toBe(LOCAL))
  })

  it('always uses an explicit zone, before and after mount', async () => {
    serverState().value = SERVER_ZONE
    const seen: string[] = []
    const Probe = defineComponent({
      setup() {
        const zone = useHydrationSafeTimeZone(() => 'Europe/Berlin')
        seen.push(zone.value)
        return () => h('i', zone.value)
      },
    })

    const wrapper = await mountSuspended(Probe)
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(seen).toEqual(['Europe/Berlin'])
    expect(wrapper.text()).toBe('Europe/Berlin')
  })

  it('starts in the browser\'s own zone when nothing carries a server zone (client-only apps)', async () => {
    const seen: string[] = []
    const Probe = defineComponent({
      setup() {
        const zone = useHydrationSafeTimeZone(() => undefined)
        seen.push(zone.value)
        return () => h('i', zone.value)
      },
    })

    await mountSuspended(Probe)

    expect(seen).toEqual([LOCAL])
  })
})

describe('FUInputDate in the hydration zone', () => {
  it('shows the day in the browser\'s zone once mounted, having started in the server\'s', async () => {
    serverState().value = SERVER_ZONE

    const wrapper = await mountFormKit({
      type: 'nuxtUIInputDate',
      value: instant,
      inputs: { nuxtUIInputDate: nuxtUIInputDateDefinition },
      props: { valueType: 'date' },
    })

    const segments = () => wrapper.findAll('[role="spinbutton"]').map(segment => segment.text())
    await vi.waitFor(() => expect(segments()).toEqual(partsIn(LOCAL)))
  })
})

describe('FUCalendar\'s starting month', () => {
  const heading = (wrapper: Awaited<ReturnType<typeof mountFormKit>>) => wrapper.find('[data-slot="heading"]').text()
  const mountCalendar = (props: Record<string, unknown>, value?: unknown) => mountFormKit({
    type: 'nuxtUICalendar',
    value,
    inputs: { nuxtUICalendar: nuxtUICalendarDefinition },
    props,
  })

  it('keeps a consumer\'s own placeholder', async () => {
    const wrapper = await mountCalendar({ placeholder: new CalendarDate(2019, 3, 1) })

    await vi.waitFor(() => expect(heading(wrapper)).toContain('March 2019'))
  })

  it('is centred on its value, not on today', async () => {
    const wrapper = await mountCalendar({}, new CalendarDate(2019, 7, 4))

    await vi.waitFor(() => expect(heading(wrapper)).toContain('July 2019'))
  })

  it('is centred on today, in the browser\'s zone, when there is nothing else to centre on', async () => {
    const wrapper = await mountCalendar({})

    const expected = new Intl.DateTimeFormat('en-US', { timeZone: LOCAL, month: 'long', year: 'numeric' }).format(new Date())
    await vi.waitFor(() => expect(heading(wrapper)).toContain(expected))
  })
})
