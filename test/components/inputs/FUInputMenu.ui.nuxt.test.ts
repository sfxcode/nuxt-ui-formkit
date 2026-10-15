import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { nuxtUIInputMenuDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settle } from '../../support/settle'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUInputMenu ui prop', () => {
  it('forwards a custom ui value onto the rendered base element, unlike before this fix (context.ui collision)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIInputMenu',
        modelValue: undefined,
        options: ['a', 'b'],
        ui: { base: 'my-distinctive-base-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInputMenu: nuxtUIInputMenuDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const base = wrapper.find('[data-slot="base"]')
    expect(base.exists()).toBe(true)
    expect(base.classes()).toContain('my-distinctive-base-class')
  })
})
