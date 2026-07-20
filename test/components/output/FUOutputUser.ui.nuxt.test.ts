import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIOutputUserDefinition } from '../../../src/runtime/formkit/definitions/output'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

describe('FUOutputUser ui prop', () => {
  it('merges ui.root/ui.icon/ui.user into the rendered container, icon, and UUser', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIOutputUser',
        id: 'output-user-ui-test',
        modelValue: { name: 'Jane Doe', description: 'Engineer', avatar: { src: 'https://example.com/jane.png' } },
        color: 'success',
        leadingIcon: 'i-heroicons-check-circle',
        ui: {
          root: 'my-distinctive-root-class',
          icon: 'my-distinctive-icon-class',
          user: { root: 'my-distinctive-user-root-class' },
        },
      },
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputUser: nuxtUIOutputUserDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const container = wrapper.find('#output-user-ui-test')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('my-distinctive-root-class')
    expect(container.classes()).toContain('text-success')

    const icon = wrapper.find('.my-distinctive-icon-class')
    expect(icon.exists()).toBe(true)

    const user = wrapper.find('.my-distinctive-user-root-class')
    expect(user.exists()).toBe(true)
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('Engineer')
  })
})
