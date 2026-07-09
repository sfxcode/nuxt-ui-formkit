import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUIPinInputDefinition } from '../../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

// Real inter-cell vs. leave-the-group focus tracking needs genuine DOM
// focus (`document.activeElement`), which only works once attached to
// `document` - see brain/notes/formkit-submitform-needs-real-dom.md.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

describe('FUPinInput blur wiring', () => {
  it('does not reveal validation moving between cells, but does once focus leaves the group entirely (even incomplete)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUIPinInput',
        modelValue: undefined,
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIPinInput: nuxtUIPinInputDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const cells = wrapper.findAll('input')
    expect(cells.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // Moving focus between the PIN's own cells must not reveal it.
    const cell0 = cells[0]!.element as HTMLInputElement
    const cell1 = cells[1]!.element as HTMLInputElement
    cell0.focus()
    await settle()
    cell1.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // Leaving the whole group - while still incomplete - must reveal it.
    // This is the case Nuxt UI's own `onBlur` (gated on `completed`) misses.
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})
