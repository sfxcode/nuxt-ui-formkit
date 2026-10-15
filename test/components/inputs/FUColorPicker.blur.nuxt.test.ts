import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nuxtUIColorPickerDefinition } from '../../../src/runtime/formkit/definitions/input'
import { settleAndWait } from '../../support/settle'

// jsdom has no ResizeObserver; reka-ui's slider parts read their size via one.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

async function mountPicker() {
  const wrapper = await mountSuspended(FormKit, {
    props: {
      type: 'nuxtUIColorPicker',
      modelValue: undefined,
      validation: 'required',
    },
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIColorPicker: nuxtUIColorPickerDefinition } })]],
    },
  })
  activeWrapper = wrapper
  await settleAndWait()
  return wrapper
}

// Fired on the picker's root rather than its selector/track: jsdom has no
// layout (zero-sized containers), so the picker's own drag math on those
// children would compute NaN positions and throw inside `colortranslator`.
// Events bubble up, not down, so the root still exercises our handler.
function pressPicker(wrapper: Awaited<ReturnType<typeof mountPicker>>) {
  return wrapper.find('[data-slot="root"]').trigger('pointerdown')
}

// The picker is pointer-only (nothing inside is focusable), so "blur" means
// the end of a pointer interaction that began on it.
describe('FUColorPicker blur wiring', () => {
  it('reveals the validation message once a pointer interaction on the picker ends', async () => {
    const wrapper = await mountPicker()
    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    await pressPicker(wrapper)
    expect(node.context?.state.blurred).toBe(false)

    window.dispatchEvent(new Event('pointerup'))
    await settleAndWait()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })

  it('ignores a pointer release that did not start on the picker', async () => {
    const wrapper = await mountPicker()
    const node = exposedNode(wrapper)

    window.dispatchEvent(new Event('pointerup'))
    await settleAndWait()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')
  })

  it('removes its window pointerup listener on unmount', async () => {
    const wrapper = await mountPicker()
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    wrapper.unmount()
    activeWrapper = undefined

    expect(removeSpy).toHaveBeenCalledWith('pointerup', expect.any(Function))
    removeSpy.mockRestore()
  })
})
