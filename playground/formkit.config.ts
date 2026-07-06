// formkit.config.ts
import type { DefaultConfigOptions } from '@formkit/vue'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { de, en } from '@formkit/i18n'
import { createNuxtUiFormkitConfig } from '../src/runtime/formkit/createNuxtUiFormkitConfig'

// Assembles nuxtUIInputs/nuxtUIOutputs and the asterisk plugin; multiStep
// additionally registers createMultiStepPlugin() for nuxtUIMultiStep/nuxtUIStep.
const nuxtUiFormkitConfig = createNuxtUiFormkitConfig({ multiStep: true })

const config: DefaultConfigOptions = {
  locales: { en, de },
  // Define the active locale
  locale: 'en',
  inputs: nuxtUiFormkitConfig.inputs,
  // ignore FormKit iconLoader since we use our own icons and don't want to load the default ones
  iconLoader: (_) => {
    return undefined
  },
  plugins: [
    createAutoAnimatePlugin(
      {
        /* optional AutoAnimate config */
        // default:
        duration: 250,
        easing: 'ease-in-out',
      },
      {
        /* optional animation targets object */
        // default:
        global: ['outer', 'inner'],
        form: ['form'],
        nuxtUIRepeater: ['input'],
      },
    ),
    ...nuxtUiFormkitConfig.plugins!,
  ],
}

export default config
