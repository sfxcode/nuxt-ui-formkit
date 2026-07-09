import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIListboxDefinition } from '../../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
]

describe('FUListbox blur wiring (single mode)', () => {
  it('reveals the validation message only once focus leaves the listbox, not between its own items', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIListbox',
        modelValue: undefined,
        validation: 'required',
        options,
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const items = wrapper.findAll('[role="option"]')
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

describe('FUListbox blur wiring (transfer mode)', () => {
  it('does not misfire when focus moves from the source list to the target list, but does once focus leaves both entirely', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIListbox',
        // One item ('a') pre-transferred into the target list, so both the
        // source and target lists have at least one real item to focus.
        // This necessarily makes the field's own value non-empty, so
        // `required` never fails here - this test asserts on
        // `state.blurred` directly (the actual mechanism under test),
        // rather than message-text rendering, which single mode above
        // already covers.
        modelValue: [{ label: 'A', value: 'a' }],
        options,
        displayMode: 'transfer',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIListbox: nuxtUIListboxDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const transferRoot = wrapper.find('.flex.items-stretch.gap-4.w-full')
    expect(transferRoot.exists()).toBe(true)
    const [sourceContainer, , targetContainer] = transferRoot.element.children
    expect(sourceContainer).toBeDefined()
    expect(targetContainer).toBeDefined()

    const sourceItem = sourceContainer!.querySelector('[role="option"]') as HTMLElement | null
    const targetItem = targetContainer!.querySelector('[role="option"]') as HTMLElement | null
    expect(sourceItem).not.toBeNull()
    expect(targetItem).not.toBeNull()

    expect(node.context?.state.blurred).toBe(false)

    // A legitimate transfer: source -> target must not misfire either side.
    sourceItem!.focus()
    await settle()
    targetItem!.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)

    // Leaving both lists entirely must still reveal it.
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    outsideButton.remove()
  })
})
