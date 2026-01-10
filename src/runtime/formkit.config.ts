// formkit.config.ts
import type { DefaultConfigOptions } from '@formkit/vue'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { de, en } from '@formkit/i18n'
import { nuxtUIInputs } from '../runtime/definitions'
import { addNuxtAsteriskPlugin } from '../runtime/plugins'

const config: DefaultConfigOptions = {
  locales: { en, de },
  // Define the active locale
  locale: 'en',
  inputs: { ...nuxtUIInputs },

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
        repeater: ['items'],
      },
    ),
    addNuxtAsteriskPlugin,
  ],
}

export default config
