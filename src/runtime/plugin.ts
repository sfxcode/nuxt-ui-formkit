import { defineNuxtPlugin } from '#app'
import { UButton, UIcon, UTabs } from '#components'

export default defineNuxtPlugin((_nuxtApp) => {
  // Register Nuxt UI components for FormKit schema usage
  // These components are used in FormKit type definitions (e.g., repeater, multiStep)
  _nuxtApp.vueApp.component('UButton', UButton)
  _nuxtApp.vueApp.component('UIcon', UIcon)
  _nuxtApp.vueApp.component('UTabs', UTabs)
})
