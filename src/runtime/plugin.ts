import { defineNuxtPlugin } from '#app'
import { consola } from 'consola'

export default defineNuxtPlugin((_nuxtApp) => {
  consola.info('Plugin injected by @sfxcode/formkit-nuxt-ui!')
})
