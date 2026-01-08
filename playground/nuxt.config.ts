export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@formkit/nuxt',
    '../src/module',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Nuxt UI Configuration
  ui: {
    // Enable color mode support (light/dark theme)
    colorMode: true,
  },

  routeRules: {
    '/': { prerender: true },
  },
  compatibilityDate: '2026-01-08',

  // FormKit Configuration
  formkit: {
    autoImport: false,
  },

  // FormKit Nuxt UI Module Configuration
  formkitNuxtUi: {
    checkNuxtUi: true,
  },
})
