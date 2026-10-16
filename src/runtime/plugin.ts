import { getLocalTimeZone } from '@internationalized/date'
import { defineNuxtPlugin, useState } from '#app'
import { hydrationTimeZoneKey } from './utils/useHydrationSafeTimeZone'
import { UButton, UIcon, UTabs, UTooltip, UUser } from '#components'

export default defineNuxtPlugin((_nuxtApp) => {
  // Register Nuxt UI components for FormKit schema usage
  // These components are used in FormKit type definitions (e.g., repeater, multiStep)
  _nuxtApp.vueApp.component('UButton', UButton)
  _nuxtApp.vueApp.component('UIcon', UIcon)
  _nuxtApp.vueApp.component('UTabs', UTabs)
  _nuxtApp.vueApp.component('UUser', UUser)
  _nuxtApp.vueApp.component('UTooltip', UTooltip)

  // The zone date fields use until they are mounted (see useHydrationSafeTimeZone): the server's
  // own, carried to the browser in the payload so hydration renders what the server rendered.
  _nuxtApp.vueApp.provide(hydrationTimeZoneKey, useState<string>('nuxt-ui-formkit-time-zone', () => getLocalTimeZone()))
})
