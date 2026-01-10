import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export type ModuleOptions = Record<string, never>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'formkit-nuxt-ui',
    configKey: 'formkitNuxtUi',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    const NPM_PCK_FORMKIT_NUXT_UI = '@sfxcode/formkit-nuxt-ui'

    const componentNames = ['FUDataView', 'FUDataEdit', 'FUDataDebug']
    componentNames.forEach(name =>
      addComponent({
        name,
        filePath: resolver.resolve('./runtime/components/' + name + '.vue'),
        chunkName: NPM_PCK_FORMKIT_NUXT_UI,
      }),
    )
  },
})
