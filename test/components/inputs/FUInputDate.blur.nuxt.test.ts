import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIInputDateDefinition, nuxtUIInputTimeDefinition } from '../../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

// Real segment-to-segment vs. segment-to-outside focus movement needs
// genuine DOM focus tracking (`document.activeElement`), which only works
// once the tree is actually attached to `document` - see
// brain/notes/formkit-submitform-needs-real-dom.md for the same gotcha
// elsewhere in this project.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUInputDate blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole date field, not between its own segments', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIInputDate',
        modelValue: undefined,
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInputDate: nuxtUIInputDateDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const segments = wrapper.findAll('[data-segment]:not([data-segment="literal"])')
    expect(segments.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // Moving focus from one segment to a sibling segment must NOT reveal it.
    const first = segments[0]!.element as HTMLElement
    const second = segments[1]!.element as HTMLElement
    first.focus()
    await settle()
    second.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // Moving focus out of the whole date field must reveal it.
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})

describe('FUInputTime blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole time field, not between its own segments', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIInputTime',
        modelValue: undefined,
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInputTime: nuxtUIInputTimeDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const segments = wrapper.findAll('[data-segment]:not([data-segment="literal"])')
    expect(segments.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const first = segments[0]!.element as HTMLElement
    const second = segments[1]!.element as HTMLElement
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
