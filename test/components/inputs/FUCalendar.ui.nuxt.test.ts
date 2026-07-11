import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUICalendarDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUCalendar ui prop', () => {
  it('forwards a custom ui value onto the rendered root, unlike before this fix (context.ui collision)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUICalendar',
        modelValue: undefined,
        ui: { root: 'my-distinctive-root-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUICalendar: nuxtUICalendarDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const root = wrapper.find('[data-slot="root"]')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('my-distinctive-root-class')
  })
})
