import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUISelectDefinition } from '../../../src/runtime/formkit/definitions/input'

// jsdom implements no Pointer Capture API at all; reka-ui's `SelectTrigger`
// calls `target.hasPointerCapture()`/`releasePointerCapture()` when a real
// pointerdown opens the dropdown (see reka-ui's `Select/SelectTrigger.js`).
// Stub them as no-ops so a genuine click-to-open works here, same pattern as
// the `ResizeObserver` stub in `FUSlider.blur.nuxt.test.ts`.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}

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

function mountSelect() {
  return mountSuspended(FormKit, {
    props: {
      type: 'nuxtUISelect',
      modelValue: undefined,
      validation: 'required',
      options: ['a', 'b', 'c'],
    },
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUISelect: nuxtUISelectDefinition } })]],
    },
  })
}

describe('FUSelect blur wiring', () => {
  it('reveals the validation message once the dropdown has been opened and closed', async () => {
    const wrapper = await mountSelect()
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const trigger = wrapper.find('[role="combobox"]')
    expect(trigger.exists()).toBe(true)

    // A real click open the dropdown - `USelect` re-dispatches this as a
    // pointerdown internally (see `Select.vue`'s `onTriggerClick`), which is
    // what actually flips reka-ui's open state.
    await trigger.trigger('click')
    await settle()
    expect((trigger.element as HTMLElement).getAttribute('data-state')).toBe('open')

    // Closing it - here via Escape, which reka-ui's `DismissableLayer`
    // handles regardless of which element has focus - is what fires
    // `USelect`'s synthetic `blur` emit (from `onUpdateOpen(false)`), the
    // only DOM-driven blur signal it has.
    await trigger.trigger('keydown', { key: 'Escape' })
    await settle()

    expect((trigger.element as HTMLElement).getAttribute('data-state')).toBe('closed')
    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })

  it('does NOT reveal the validation message when the trigger is tabbed through without ever opening the dropdown (documented residual gap)', async () => {
    const wrapper = await mountSelect()
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const trigger = wrapper.find('[role="combobox"]').element as HTMLElement
    trigger.focus()
    await settle()
    expect(document.activeElement).toBe(trigger)

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    // Confirmed, not assumed: `USelect` only ever emits `blur` synthetically
    // from its dropdown's open->close transition (`onUpdateOpen`) - its
    // trigger has no native blur listener of its own - so a plain
    // focus-in/focus-out that never opens the dropdown leaves
    // `state.blurred` false. This is the residual gap documented in
    // `docs/components/inputs.md`'s `nuxtUISelect` section, not a bug.
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    outsideButton.remove()
  })
})
