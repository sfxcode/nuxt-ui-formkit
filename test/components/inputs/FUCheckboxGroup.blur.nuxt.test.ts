import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUICheckboxGroupDefinition, nuxtUIRadioGroupDefinition } from '../../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

// Real inter-item vs. leave-the-group focus tracking needs genuine DOM
// focus (`document.activeElement`), which only works once the tree is
// actually attached to `document` - see
// brain/notes/formkit-submitform-needs-real-dom.md.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUCheckboxGroup blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole group, not between its own items', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUICheckboxGroup',
        modelValue: [],
        validation: 'required',
        options: ['a', 'b', 'c'],
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUICheckboxGroup: nuxtUICheckboxGroupDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const items = wrapper.findAll('[role="checkbox"]')
    expect(items.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const first = items[0]!.element as HTMLElement
    const second = items[1]!.element as HTMLElement
    first.focus()
    await settle()
    second.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})

describe('FURadioGroup blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole group, not between its own items', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIRadioGroup',
        modelValue: undefined,
        validation: 'required',
        options: ['a', 'b', 'c'],
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIRadioGroup: nuxtUIRadioGroupDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const items = wrapper.findAll('[role="radio"]')
    expect(items.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const first = items[0]!.element as HTMLElement
    const second = items[1]!.element as HTMLElement
    first.focus()
    await settle()
    second.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})
