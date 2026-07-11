import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUInput ui prop', () => {
  it('forwards a custom ui value onto the rendered input, unlike before this fix (context.ui collision)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIInput',
        modelValue: '',
        ui: { base: 'my-distinctive-base-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInput: nuxtUIInputDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('my-distinctive-base-class')
  })
})
