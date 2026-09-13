import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUISliderDefinition } from '../../../src/runtime/formkit/definitions/input'

// jsdom has no ResizeObserver; reka-ui's SliderRoot reads its own size via
// one on mount - unrelated to the blur wiring this test targets.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

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

describe('FUSlider blur wiring', () => {
  it('reveals the validation message only once focus leaves the slider', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        // `required`'s `empty()` check never treats a `number` as empty, so
        // the FormKit value must stay `undefined` (not `0`) for the
        // validation message to actually be pending initially.
        type: 'nuxtUISlider',
        modelValue: undefined,
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUISlider: nuxtUISliderDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const thumbs = wrapper.findAll('[data-slot="thumb"]')
    expect(thumbs.length).toBe(1)

    const thumb = thumbs[0]!.element as HTMLElement
    thumb.focus()
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

  it('does not prematurely reveal the message when focus moves between thumbs of a multi-thumb (range) slider', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        // `defaultValue` (an uncontrolled fallback the underlying `USlider`
        // renders with) gives two thumbs without setting the actual FormKit
        // node value, which must stay `undefined` for `required` to be
        // pending - an array with real elements is never "empty" either
        // (per `empty()`'s object-with-own-keys check), so a populated
        // `modelValue` array here couldn't be used to test the pending
        // state at all.
        type: 'nuxtUISlider',
        modelValue: undefined,
        defaultValue: [25, 75],
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUISlider: nuxtUISliderDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const thumbs = wrapper.findAll('[data-slot="thumb"]')
    expect(thumbs.length).toBe(2)

    const first = thumbs[0]!.element as HTMLElement
    const second = thumbs[1]!.element as HTMLElement

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
