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
        repeater: ['items'],
      },
    ),
    addNuxtAsteriskPlugin,
  ],
}

export default config
