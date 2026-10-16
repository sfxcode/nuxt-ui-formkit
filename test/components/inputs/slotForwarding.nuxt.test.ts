import type { FormKitTypeDefinition } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import * as definitions from '../../../src/runtime/formkit/definitions/input'
import { settle } from '../../support/settle'

// No other test renders a slot an input forwards to its wrapped Nuxt UI
// component, yet every wrapped input forwards `context.slots` through the same
// `{ ...context, ...slotProps }` block. This pins that behavior against the
// rendered DOM (not against `validSlotNames`), so the block can be restructured
// without silently dropping a slot.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

interface Case {
  type: string
  definition: keyof typeof definitions
  slot: string
  props?: Record<string, unknown>
}

// One real slot per input, chosen from that Nuxt UI component's own slot list.
// `label` is deliberately avoided: FormKit owns it and never forwards it.
const CASES: Case[] = [
  { type: 'nuxtUIInput', definition: 'nuxtUIInputDefinition', slot: 'leading' },
  { type: 'nuxtUITextarea', definition: 'nuxtUITextareaDefinition', slot: 'leading' },
  { type: 'nuxtUIInputNumber', definition: 'nuxtUIInputNumberDefinition', slot: 'increment' },
  { type: 'nuxtUIInputTags', definition: 'nuxtUIInputTagsDefinition', slot: 'leading' },
  { type: 'nuxtUIInputDate', definition: 'nuxtUIInputDateDefinition', slot: 'leading' },
  { type: 'nuxtUIInputTime', definition: 'nuxtUIInputTimeDefinition', slot: 'leading' },
  { type: 'nuxtUIInputMenu', definition: 'nuxtUIInputMenuDefinition', slot: 'leading', props: { options: ['a', 'b'] } },
  { type: 'nuxtUISelect', definition: 'nuxtUISelectDefinition', slot: 'leading', props: { options: ['a', 'b'] } },
  { type: 'nuxtUISelectMenu', definition: 'nuxtUISelectMenuDefinition', slot: 'leading', props: { options: ['a', 'b'] } },
  { type: 'nuxtUICheckbox', definition: 'nuxtUICheckboxDefinition', slot: 'description' },
  { type: 'nuxtUISwitch', definition: 'nuxtUISwitchDefinition', slot: 'description' },
  { type: 'nuxtUICheckboxGroup', definition: 'nuxtUICheckboxGroupDefinition', slot: 'legend', props: { options: ['a', 'b'] } },
  { type: 'nuxtUIRadioGroup', definition: 'nuxtUIRadioGroupDefinition', slot: 'legend', props: { options: ['a', 'b'] } },
]

async function mountWithSlot(testCase: Case) {
  const definition = definitions[testCase.definition] as FormKitTypeDefinition
  const wrapper = await mountSuspended(FormKit, {
    props: { type: testCase.type, id: 'slot-forwarding-test', ...testCase.props },
    slots: {
      [testCase.slot]: (scope: Record<string, unknown>) =>
        h('i', { 'data-test-slot': testCase.slot, 'data-scope-id': String(scope.id) }),
    },
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { [testCase.type]: definition } })]],
    },
  })
  activeWrapper = wrapper
  await settle()
  return wrapper
}

describe('input slot forwarding', () => {
  it.each(CASES)('$type forwards its #$slot slot to the wrapped component, with the merged context', async (testCase) => {
    const wrapper = await mountWithSlot(testCase)

    await vi.waitFor(() => expect(wrapper.find(`[data-test-slot="${testCase.slot}"]`).exists()).toBe(true))
    // `{ ...context, ...slotProps }` - the context's own `id` reaches the slot.
    expect(wrapper.find(`[data-test-slot="${testCase.slot}"]`).attributes('data-scope-id')).toBe('slot-forwarding-test')
  })

  it('does not forward FormKit\'s own slots to the wrapped component', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: { type: 'nuxtUIInput', id: 'slot-forwarding-test' },
      slots: { help: () => h('i', { 'data-test-slot': 'help' }) },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInput: definitions.nuxtUIInputDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    // Rendered exactly once, by FormKit's own help section - not a second time inside UInput.
    await vi.waitFor(() => expect(wrapper.findAll('[data-test-slot="help"]')).toHaveLength(1))
  })
})
