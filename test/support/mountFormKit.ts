import type { DefaultConfigOptions } from '@formkit/vue'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

export interface MountFormKitOptions {
  type: string
  value?: unknown
  props?: Record<string, unknown>
  inputs: NonNullable<DefaultConfigOptions['inputs']>
}

/**
 * Mounts a single `<FormKit>` root wired with only the input(s) a test needs,
 * mirroring how `playground/formkit.config.ts` wires `nuxtUIInputs` into
 * FormKit's `inputs` config option, but scoped down for test isolation.
 *
 * Runs via `mountSuspended` inside the "nuxt" Vitest project (see
 * vitest.config.ts) so Nuxt UI components resolve exactly as they do in the
 * real playground app, `#imports` included.
 */
export function mountFormKit(options: MountFormKitOptions) {
  const { type, value, props = {}, inputs } = options

  return mountSuspended(FormKit, {
    props: {
      type,
      modelValue: value,
      ...props,
    },
    global: {
      plugins: [[plugin, defaultConfig({ inputs })]],
    },
  })
}
