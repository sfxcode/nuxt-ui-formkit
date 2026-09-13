import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUISelectMenuDefinition } from '../../../src/runtime/formkit/definitions/input'

// jsdom has no `scrollIntoView` - reka-ui's Combobox content positioning
// calls it once the dropdown is placed, unrelated to the blur wiring this
// test targets.
beforeAll(() => {
  if (!Element.prototype.scrollIntoView)
    Element.prototype.scrollIntoView = () => {}
})

async function settle() {
  await flushPromises()
  await nextTick()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

// `USelectMenu` declares a `blur` emit that it fires synthetically from its
// own `onUpdateOpen` handler when the dropdown (a `<ComboboxPortal>`,
// teleported outside the trigger's own DOM subtree) transitions from open
// to closed - this plan's overview predicted that, like `USelect`, tabbing
// through the trigger without ever opening the dropdown would never fire
// blur at all (no native listener on the actual focusable trigger).
//
// That prediction does NOT hold for `FUSelectMenu`, confirmed empirically
// (not assumed from the plan's own research): `USelectMenu` declares
// `defineOptions({ inheritAttrs: false })` and manually re-spreads its own
// `$attrs` (via `v-bind="{ ...$attrs, ...ariaAttrs }"`) onto its inner
// `ComboboxTrigger`, which renders down to a real native `<button>`. Since
// `onBlur` is not one of `USelectMenu`'s declared *props* (only one of its
// declared *emits*, which does not exclude it from `$attrs`), the
// `@blur="handleBlur"` binding on `<USelectMenu>` in `FUSelectMenu.vue`
// ends up forwarded onto that real button as a genuine native `blur`
// listener - in addition to the synthetic close-only emit. So blur is
// wired correctly whether the user opens-then-closes the dropdown, or
// simply tabs through the trigger and never opens it at all. Confirmed
// below by driving both paths with real DOM focus changes and a real
// dropdown open/close via `.trigger('click')` (Reka UI's `ComboboxTrigger`
// toggles open state on a plain `click` handler, confirmed against
// `reka-ui`'s own source) - never via `context.handlers.blur()` directly,
// per verify-empirically-expect-silent-failure.
describe('FUSelectMenu blur wiring', () => {
  it('reveals the validation message once the dropdown has been opened and closed, not while it is still open', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUISelectMenu',
        modelValue: undefined,
        options: ['a', 'b', 'c'],
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUISelectMenu: nuxtUISelectMenuDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const trigger = wrapper.find('[data-slot="base"]')
    expect(trigger.exists()).toBe(true)

    // Opening the dropdown must not itself count as a blur.
    await trigger.trigger('click')
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    // Closing it (still no selection made) fires the synthetic `blur` emit.
    await trigger.trigger('click')
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
  })

  it('also reveals the validation message when the trigger is focused and then blurred WITHOUT the dropdown ever opening (no residual gap, unlike this plan\'s own prediction)', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUISelectMenu',
        modelValue: undefined,
        options: ['a', 'b', 'c'],
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUISelectMenu: nuxtUISelectMenuDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    expect(node.context?.state.blurred).toBe(false)

    const triggerWrapper = wrapper.find('[data-slot="base"]')
    const trigger = triggerWrapper.element as HTMLElement

    trigger.focus()
    await settle()

    // The dropdown genuinely never opened.
    expect(trigger.getAttribute('data-state')).toBe('closed')
    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(trigger.getAttribute('data-state')).toBe('closed')
    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})
