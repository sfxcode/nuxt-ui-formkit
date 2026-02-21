import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir } from '@nuxt/kit'
import type { FormKitInputs } from '@formkit/inputs'

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

    addImportsDir(resolver.resolve('./runtime/composables'))

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

declare module '@formkit/inputs' {
  interface FormKitInputProps<Props extends FormKitInputs<Props>> {
    // Input Components
    nuxtUICheckbox: {
      type: 'nuxtUICheckbox'
    }
    nuxtUICheckboxGroup: {
      type: 'nuxtUICheckboxGroup'
    }
    nuxtUIColorPicker: {
      type: 'nuxtUIColorPicker'
    }
    nuxtUIInput: {
      type: 'nuxtUIInput'
    }
    nuxtUIInputDate: {
      type: 'nuxtUIInputDate'
    }
    nuxtUIInputMenu: {
      type: 'nuxtUIInputMenu'
    }
    nuxtUIInputNumber: {
      type: 'nuxtUIInputNumber'
    }
    nuxtUIInputTags: {
      type: 'nuxtUIInputTags'
    }
    nuxtUIInputTime: {
      type: 'nuxtUIInputTime'
    }
    nuxtUIPinInput: {
      type: 'nuxtUIPinInput'
    }
    nuxtUIRadioGroup: {
      type: 'nuxtUIRadioGroup'
    }
    nuxtUISelect: {
      type: 'nuxtUISelect'
    }
    nuxtUISelectMenu: {
      type: 'nuxtUISelectMenu'
    }
    nuxtUISlider: {
      type: 'nuxtUISlider'
    }
    nuxtUISwitch: {
      type: 'nuxtUISwitch'
    }
    nuxtUITextarea: {
      type: 'nuxtUITextarea'
    }
    // Output Components
    nuxtUIOutputText: {
      type: 'nuxtUIOutputText'
    }
    nuxtUIOutputBoolean: {
      type: 'nuxtUIOutputBoolean'
    }
    nuxtUIOutputDate: {
      type: 'nuxtUIOutputDate'
    }
    nuxtUIOutputLink: {
      type: 'nuxtUIOutputLink'
    }
    nuxtUIOutputNumber: {
      type: 'nuxtUIOutputNumber'
    }
    nuxtUIOutputList: {
      type: 'nuxtUIOutputList'
    }
  }
}
