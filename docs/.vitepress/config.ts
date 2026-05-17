import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nuxt UI FormKit',
  description: 'FormKit integration for Nuxt UI - Seamlessly connect FormKit form handling with Nuxt UI components',
  lang: 'en-US',

  // Base URL for deployment
  base: '/',

  // Sitemap configuration
  sitemap: {
    hostname: 'https://nuxt-ui-formkit.sfxcode.com',
  },

  // Enhanced metadata for better SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#00dc82' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Nuxt UI FormKit' }],
    ['meta', { name: 'og:title', content: 'Nuxt UI FormKit - Form Builder for Nuxt' }],
    ['meta', { name: 'og:description', content: 'FormKit integration for Nuxt UI - Build beautiful forms with FormKit and Nuxt UI components' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Nuxt UI FormKit' }],
    ['meta', { name: 'twitter:description', content: 'FormKit integration for Nuxt UI - Build beautiful forms' }],
  ],

  // Clean URLs
  cleanUrls: true,

  // Last updated timestamp
  lastUpdated: true,

  // Ignore dead links during build (for external links)
  ignoreDeadLinks: false,

  // Build performance optimizations
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            theme: ['vitepress/theme'],
          },
        },
      },
    },
  },

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
    // Code copy button
    config: () => {
      // Additional markdown-it plugins can be added here
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Nuxt UI FormKit',

    // Enhanced navigation with active highlighting
    nav: [
      { text: 'Home', link: '/', activeMatch: '^/$' },
      { text: 'Guide', link: '/getting-started/installation', activeMatch: '/getting-started/' },
      { text: 'Components', link: '/components/inputs', activeMatch: '/components/' },
      { text: 'Examples', link: '/examples/', activeMatch: '/examples/' },
      {
        text: 'v1.0.3',
        items: [
          { text: 'Changelog', link: 'https://github.com/sfxcode/nuxt-ui-formkit/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/sfxcode/nuxt-ui-formkit/blob/main/.github/CONTRIBUTING.md' },
        ],
      },
    ],

    // Enhanced sidebar with collapsible groups
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Schema-Based Forms', link: '/getting-started/schema-forms' },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Input Components', link: '/components/inputs' },
          { text: 'Output Components', link: '/components/outputs' },
          { text: 'Repeater', link: '/components/repeater' },
          { text: 'FUDataView', link: '/components/data-view' },
          { text: 'FUDataEdit', link: '/components/data-edit' },
        ],
      },
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          { text: 'Utilities', link: '/api/utilities' },
        ],
      },
      {
        text: 'Examples',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/examples/' },
        ],
      },
    ],

    // Table of contents configuration
    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sfxcode/nuxt-ui-formkit' },
    ],

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present sfxcode',
    },

    // Enhanced search with local provider
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1,
            },
          },
        },
      },
    },

    // Edit link configuration
    editLink: {
      pattern: 'https://github.com/sfxcode/nuxt-ui-formkit/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    // Last updated text
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    // Return to top
    returnToTopLabel: 'Return to top',

    // Sidebar menu label for mobile
    sidebarMenuLabel: 'Menu',

    // Dark mode switch label
    darkModeSwitchLabel: 'Appearance',

    // Light/dark mode switch title
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',

    // External link icon
    externalLinkIcon: true,

    // Doc footer navigation
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
  },
})
