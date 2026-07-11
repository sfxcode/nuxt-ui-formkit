import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIListboxDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUListbox ui prop', () => {
  it('forwards a custom ui value onto the rendered root, single mode (unlike before this fix)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIListbox',
        modelValue: undefined,
        options: ['a', 'b'],
        ui: { root: 'my-distinctive-root-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const root = wrapper.find('[data-slot="root"]')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('my-distinctive-root-class')
  })

  it('forwards a custom ui value onto both sides, transfer mode', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIListbox',
        modelValue: [],
        options: ['a', 'b'],
        displayMode: 'transfer',
        ui: { root: 'my-distinctive-root-class' },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const roots = wrapper.findAll('[data-slot="root"]')
    expect(roots.length).toBeGreaterThanOrEqual(2)
    for (const root of roots)
      expect(root.classes()).toContain('my-distinctive-root-class')
  })
})
