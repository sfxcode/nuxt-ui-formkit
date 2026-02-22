import { defineNuxtPlugin } from '#app'
import { UButton } from '#components'

export default defineNuxtPlugin((_nuxtApp) => {
  // add Button for repeater
  _nuxtApp.vueApp.component('UButton', UButton)
})
