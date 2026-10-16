export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@formkit/nuxt',
    '../src/module',
  ],

  // Off by default; `PLAYGROUND_SSR=true` turns server rendering on (used to measure
  // SSR/hydration behaviour, see brain/plans/19-ssr-support).
  ssr: process.env.PLAYGROUND_SSR === 'true',

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

})
