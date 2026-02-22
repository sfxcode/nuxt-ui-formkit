import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // Module entry
    {
      input: 'src/module',
    },
    // Runtime exports - formkit type definitions and plugins
    {
      input: 'src/runtime/formkit/',
      outDir: 'dist/runtime/formkit',
      builder: 'mkdist',
      declaration: true,
      ext: 'mjs',
    },
  ],
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    '@formkit/core',
    '@formkit/vue',
    '@formkit/inputs',
    '@formkit/addons',
    '@nuxt/ui',
    'vue',
    '#app',
    '#imports',
  ],
  declaration: true,
  rollup: {
    emitCJS: false,
  },
})
