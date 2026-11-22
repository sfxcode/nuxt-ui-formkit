import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { nuxtUIToggleDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settle, settleAndWait } from '../../support/settle'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

const inputs = { nuxtUIToggle: nuxtUIToggleDefinition }

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

async function mountToggle(props: Record<string, unknown>) {
  const wrapper = await mountSuspended(FormKit, {
    props: { type: 'nuxtUIToggle', ...props },
    attachTo: document.body,
    global: { plugins: [[plugin, defaultConfig({ inputs })]] },
  })
  activeWrapper = wrapper
  await settleAndWait()
  return wrapper
}

describe('FUToggle', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit as never, { type: 'nuxtUIToggle', name: 'my-distinctive-name' })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs })]] },
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.find('[name="my-distinctive-name"]').exists()).toBe(true)
  })

  it('toggles the node value between true and false on click', async () => {
    const wrapper = await mountToggle({ modelValue: false, toggleLabel: 'Bold' })
    const node = exposedNode(wrapper)
    const button = wrapper.find('button')
    expect(button.text()).toContain('Bold')
    expect(button.attributes('aria-pressed')).toBe('false')

    await button.trigger('click')
    await settleAndWait()
    expect(node.value).toBe(true)
    expect(wrapper.find('button').attributes('aria-pressed')).toBe('true')

    await wrapper.find('button').trigger('click')
    await settleAndWait()
    expect(node.value).toBe(false)
  })

  it('marks the node blurred when focus leaves the button', async () => {
    const wrapper = await mountToggle({ modelValue: false })
    const node = exposedNode(wrapper)
    const button = wrapper.find('button').element as HTMLButtonElement

    button.focus()
    await settleAndWait()
    expect(node.context?.state.blurred).toBe(false)

    button.blur()
    await settleAndWait()
    expect(node.context?.state.blurred).toBe(true)
  })

  it('forwards a custom ui value onto the rendered base element', async () => {
    const wrapper = await mountToggle({ modelValue: false, toggleLabel: 'Bold', ui: { label: 'my-distinctive-label-class' } })
    expect(wrapper.find('.my-distinctive-label-class').exists()).toBe(true)
  })
})
