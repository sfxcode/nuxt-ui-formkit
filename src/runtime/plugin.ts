import { defineNuxtPlugin } from '#app'
import { UButton, UIcon } from '#components'

export default defineNuxtPlugin((_nuxtApp) => {
  // Register Nuxt UI components for FormKit schema usage
  // These components are used in FormKit type definitions (e.g., repeater)
  _nuxtApp.vueApp.component('UButton', UButton)
  _nuxtApp.vueApp.component('UIcon', UIcon)
})
