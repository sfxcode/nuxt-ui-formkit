import type { DefaultConfigOptions } from '@formkit/vue'
import { createMultiStepPlugin } from '@formkit/addons'
import { formInputs, formOutputs, nuxtUIInputs, nuxtUIOutputs } from './definitions'
import { addNuxtAsteriskPlugin } from './plugins'

export interface CreateNuxtUiFormkitConfigOptions {
  /**
   * Registers `createMultiStepPlugin()` so `nuxtUIMultiStep`/`nuxtUIStep`
   * actually work. The input type registrations themselves are always
   * included below regardless of this flag - they're inert for forms that
   * don't use them, but the plugin has real runtime behavior (it hooks
   * every node to check its type), so it's opt-in.
   */
  multiStep?: boolean
  /**
   * Registers every input and output under the library-neutral `form` prefix
   * (`formInput`, `formSelect`, `formRepeater`, `formOutputText`, ...) next to the
   * `nuxtUI` names. They are the same definitions, so both names behave the same.
   * On by default. Pass `false` to register only the `nuxtUI` names, e.g. when an
   * input of your own is called `formSelect` and must not be replaced.
   */
  formPrefix?: boolean
  /**
   * Your own FormKit plugins (e.g. `createAutoAnimatePlugin`), appended after
   * this module's. Pass them here rather than overriding `plugins` after the
   * spread: `defaultConfig({ ...createNuxtUiFormkitConfig(), plugins: [x] })`
   * replaces the whole array and silently drops the asterisk plugin.
   */
  plugins?: DefaultConfigOptions['plugins']
}

/**
 * Assembles the `inputs`/`plugins` this module needs into a plain object a
 * consumer spreads into their own `defaultConfig({ ...createNuxtUiFormkitConfig(), ... })`
 * call inside `formkit.config.ts` - it doesn't call `defaultConfig` itself,
 * so it stays composable with whatever else that config already does
 * (locales, `iconLoader`, other plugins like `createAutoAnimatePlugin`).
 */
export function createNuxtUiFormkitConfig(options: CreateNuxtUiFormkitConfigOptions = {}): Pick<DefaultConfigOptions, 'inputs' | 'plugins'> {
  return {
    inputs: { ...nuxtUIInputs, ...nuxtUIOutputs, ...(options.formPrefix === false ? {} : { ...formInputs, ...formOutputs }) },
    plugins: [
      addNuxtAsteriskPlugin,
      ...(options.multiStep ? [createMultiStepPlugin()] : []),
      ...(options.plugins ?? []),
    ],
  }
}
