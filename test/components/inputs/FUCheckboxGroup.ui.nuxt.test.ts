import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUICheckboxGroupDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUCheckboxGroup ui prop', () => {
  it('forwards a custom ui value onto the rendered fieldset, unlike before this fix', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUICheckboxGroup',
        modelValue: [],
        options: ['a', 'b'],
        ui: { fieldset: 'my-distinctive-fieldset-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUICheckboxGroup: nuxtUICheckboxGroupDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const fieldset = wrapper.find('[data-slot="fieldset"]')
    expect(fieldset.exists()).toBe(true)
    expect(fieldset.classes()).toContain('my-distinctive-fieldset-class')
  })
})
