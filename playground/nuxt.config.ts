export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@formkit/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css', '../src/runtime/assets/scss/formkit-nuxt-ui.scss'],

  // Nuxt UI Configuration
  ui: {
    // Enable color mode support (light/dark theme)
    colorMode: true,
  },

  routeRules: {
    '/': { prerender: true },
  },
  compatibilityDate: '2026-01-08',

  formkit: {
    configFile: '../src/runtime/formkit.config.ts',
  },

  // FormKit Nuxt UI Module Configuration
  formkitNuxtUi: { },
})
