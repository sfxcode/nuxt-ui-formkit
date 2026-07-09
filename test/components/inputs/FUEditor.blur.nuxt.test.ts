import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import { nuxtUIEditorDefinition } from '../../../src/runtime/formkit/definitions/input'

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
  return (wrapper.findComponent(FormKit).vm.$.exposed as unknown as { node: FormKitNode }).node
}

// `UEditor`'s toolbar buttons render via `UButton`/`UTooltip`, which need a
// `TooltipProvider` context - only present when wrapped in the real app's
// `<UApp>` root (confirmed empirically: mounting `nuxtUIEditor` on its own
// throws "Injection `Symbol(TooltipProviderContext)` not found").
function mountEditorInApp(props: Record<string, unknown>) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(FormKit, {
          type: 'nuxtUIEditor',
          ...props,
        }),
      })
    },
  })

  return mountSuspended(Host, {
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIEditor: nuxtUIEditorDefinition } })]],
    },
  })
}

describe('FUEditor blur wiring', () => {
  it('reveals the validation message only after a real DOM blur, not before', async () => {
    const wrapper = await mountEditorInApp({ modelValue: '', validation: 'required' })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const contentEditable = wrapper.find('[contenteditable="true"]').element as HTMLElement
    expect(contentEditable).toBeDefined()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // A real focus move, not `.trigger('blur')` - `blur` doesn't bubble, so
    // a synthetic dispatch never reaches the container-level `focusout`
    // listener this mechanism actually depends on (see this file's other
    // test, and the component's own comment, for why a plain `blur` isn't
    // enough here).
    contentEditable.focus()
    await settle()
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })

  it('does not misfire when focus moves from the editor content to one of its own toolbar buttons', async () => {
    const wrapper = await mountEditorInApp({ modelValue: '', validation: 'required' })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const contentEditable = wrapper.find('[contenteditable="true"]').element as HTMLElement
    const toolbarButton = wrapper.find('[role="toolbar"] button:not([disabled])').element as HTMLElement
    expect(toolbarButton).toBeDefined()

    contentEditable.focus()
    await settle()
    toolbarButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')
  })
})
