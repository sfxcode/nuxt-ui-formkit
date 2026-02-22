import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/module',
    {
      builder: 'mkdist',
      input: './src/runtime/',
      outDir: './dist/runtime',
      pattern: ['**/*.{ts,vue}'],
      loaders: ['vue', 'js'],
    },
  ],
  declaration: true,
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt',
    'vue',
    '@formkit/core',
    '@formkit/vue',
    '@formkit/addons',
    '@nuxt/ui',
  ],
})
