import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import { nuxtUIToggleGroupDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settle, settleAndWait } from '../../support/settle'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

const inputs = { nuxtUIToggleGroup: nuxtUIToggleGroupDefinition }

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

async function mountGroup(props: Record<string, unknown>) {
  const wrapper = await mountSuspended(FormKit, {
    props: { type: 'nuxtUIToggleGroup', ...props },
    attachTo: document.body,
    global: { plugins: [[plugin, defaultConfig({ inputs })]] },
  })
  activeWrapper = wrapper
  await settleAndWait()
  return wrapper
}

const objectOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

describe('FUToggleGroup', () => {
  it('forwards the FormKit field name onto the underlying Nuxt UI component', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'form' },
      slots: {
        default: () => [h(FormKit as never, { type: 'nuxtUIToggleGroup', name: 'my-distinctive-name', options: objectOptions })],
      },
      attachTo: document.body,
      global: { plugins: [[plugin, defaultConfig({ inputs })]] },
    })
    activeWrapper = wrapper
    await settle()

    expect(wrapper.find('[name="my-distinctive-name"]').exists()).toBe(true)
  })

  it('holds a single value by default, replacing it when another item is pressed', async () => {
    const wrapper = await mountGroup({ options: objectOptions })
    const node = exposedNode(wrapper)

    await wrapper.findAll('button')[0]!.trigger('click')
    await settleAndWait()
    expect(node.value).toBe('left')

    await wrapper.findAll('button')[2]!.trigger('click')
    await settleAndWait()
    expect(node.value).toBe('right')
  })

  it('holds an array with multiple, adding and removing items', async () => {
    const wrapper = await mountGroup({ options: objectOptions, multiple: true })
    const node = exposedNode(wrapper)

    await wrapper.findAll('button')[0]!.trigger('click')
    await settleAndWait()
    await wrapper.findAll('button')[1]!.trigger('click')
    await settleAndWait()
    expect(node.value).toEqual(['left', 'center'])

    await wrapper.findAll('button')[0]!.trigger('click')
    await settleAndWait()
    expect(node.value).toEqual(['center'])
  })

  it('accepts primitive options, rendering them as labels with their own value', async () => {
    const wrapper = await mountGroup({ options: ['small', 'large'] })
    const node = exposedNode(wrapper)
    const buttons = wrapper.findAll('button')
    expect(buttons.map(b => b.text())).toEqual(['small', 'large'])

    await buttons[1]!.trigger('click')
    await settleAndWait()
    expect(node.value).toBe('large')
  })

  it('reveals the validation message only once focus leaves the whole group, not between its own items', async () => {
    const wrapper = await mountGroup({ options: objectOptions, validation: 'required' })
    const node = exposedNode(wrapper)
    const buttons = wrapper.findAll('button')

    ;(buttons[0]!.element as HTMLElement).focus()
    await settleAndWait()
    ;(buttons[1]!.element as HTMLElement).focus()
    await settleAndWait()
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settleAndWait()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })

  it('forwards a custom ui value onto the rendered root element', async () => {
    const wrapper = await mountGroup({ options: objectOptions, ui: { root: 'my-distinctive-root-class' } })
    expect(wrapper.find('[data-slot="root"]').classes()).toContain('my-distinctive-root-class')
  })
})
