import { getLocalTimeZone } from '@internationalized/date'
import type { InjectionKey, Ref } from 'vue'
import { computed, inject, onMounted, ref } from 'vue'

/**
 * Provided by the module's runtime plugin (`plugin.ts`): a ref held in Nuxt state, so the
 * server's zone travels to the browser in the SSR payload. Kept out of this file so it imports
 * nothing from Nuxt and the components that use it still load in plain Node (the unit tests).
 */
export const hydrationTimeZoneKey: InjectionKey<Ref<string>> = Symbol('nuxt-ui-formkit-hydration-time-zone')

/**
 * The time zone a date field converts its values in when it has no explicit `timeZone`.
 *
 * A JS `Date` or zoned ISO string has no calendar day of its own - the day depends on the
 * zone it is shown in - and the server has no way to know the browser's zone. Rendering in
 * each side's own zone gives the server and the hydration different days: a hydration
 * mismatch (and in production Vue does not repair mismatched attributes, so the wrong day
 * stays in the DOM). So the server renders in its zone, the browser hydrates with that
 * same zone (it arrives in the payload), and the zone becomes the browser's own right after
 * mount, which updates the field normally. With nothing provided (a client-only app, or no
 * plugin) it is simply the browser's zone.
 *
 * An explicit zone always wins and never changes.
 */
export function useHydrationSafeTimeZone(explicitTimeZone: () => string | undefined) {
  const zone = inject(hydrationTimeZoneKey, null) ?? ref(getLocalTimeZone())
  onMounted(() => {
    zone.value = getLocalTimeZone()
  })
  return computed(() => explicitTimeZone() ?? zone.value)
}
