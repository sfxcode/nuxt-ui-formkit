import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { nuxtUIInputRatingDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settle } from '../../support/settle'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUInputRating ui prop', () => {
  it('forwards a custom ui value onto the rendered root', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIInputRating',
        modelValue: 0,
        ui: { root: 'my-distinctive-root-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInputRating: nuxtUIInputRatingDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const root = wrapper.find('[data-slot="root"]')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('my-distinctive-root-class')
  })
})
