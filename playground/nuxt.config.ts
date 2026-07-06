export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@formkit/nuxt',
    '../src/module',
  ],

  ssr: false,

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

  experimental: {
    viteEnvironmentApi: true,
  },
  compatibilityDate: '2026-01-08',

  vite: {
    optimizeDeps: {
      include: [
        '@formkit/addons',
        '@formkit/inputs',
      ],
    },
  },

  // FormKit Nuxt UI Module Configuration
  formkitNuxtUi: { },

})
