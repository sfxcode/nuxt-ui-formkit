import { createMultiStepPlugin } from '@formkit/addons'
import { getNode } from '@formkit/core'
import { FormKit, FormKitSchema, defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIMultiStepDefinition, nuxtUIStepDefinition } from '../../../src/runtime/formkit/definitions/multiStep'

// Mirrors repeater.nested.nuxt.test.ts's <FormKit type="form"><FormKitSchema />
// mounting pattern, since a multi-step's steps are authored as raw `children`
// schema nodes, not a component default slot.
// `createMultiStepPlugin`'s own `allowIncomplete` default is `true` (it lets
// a wizard advance past an invalid step unless told otherwise) - set it
// `false` here so the validation-gating test actually has something to prove.
const wizardSchema = [
  {
    $formkit: 'nuxtUIMultiStep',
    name: 'wizard',
    id: 'wizard-node',
    allowIncomplete: false,
    children: [
      {
        $formkit: 'nuxtUIStep',
        name: 'stepOne',
        label: 'Step One',
        children: [
          { $formkit: 'nuxtUIInput', name: 'firstName', label: 'First Name', validation: 'required' },
        ],
      },
      {
        $formkit: 'nuxtUIStep',
        name: 'stepTwo',
        label: 'Step Two',
        children: [
          { $formkit: 'nuxtUIInput', name: 'lastName', label: 'Last Name' },
        ],
      },
    ],
  },
]

function mountWizard() {
  return mountSuspended(FormKit, {
    props: { type: 'form' },
    slots: {
      default: () => h(FormKitSchema, { schema: wizardSchema }),
    },
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: {
          nuxtUIMultiStep: nuxtUIMultiStepDefinition,
          nuxtUIStep: nuxtUIStepDefinition,
          nuxtUIInput: nuxtUIInputDefinition,
        },
        plugins: [createMultiStepPlugin()],
      })]],
    },
  })
}

// FormKit debounces validation runs with a real timer, and the addon's own
// step-change gating (`isTargetStepAllowed`) awaits that settling - `flushPromises`
// only drains microtasks, so a real macrotask tick is needed too.
function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function tabButtons(wrapper: Awaited<ReturnType<typeof mountWizard>>) {
  return wrapper.findAll('[data-slot="trigger"]')
}

function tabBadge(tab: ReturnType<typeof tabButtons>[number]) {
  return tab.find('[data-slot="trailingBadge"]')
}

function tabPanels(wrapper: Awaited<ReturnType<typeof mountWizard>>) {
  return wrapper.findAll('[role="tabpanel"]')
}

describe('nuxtUIMultiStep / nuxtUIStep', () => {
  it('renders one tab per step', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    const tabs = tabButtons(wrapper)
    expect(tabs).toHaveLength(2)
    expect(tabs.map(tab => tab.text())).toEqual(['Step One', 'Step Two'])
  })

  it('shows the first step and hides the rest on initial mount', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    // `hidden` lives on the outer wrapper (an ancestor of the `[role="tabpanel"]`
    // element, not the element itself - see the "does not leak inactive
    // step labels" test), so `isVisible()` (which walks ancestors) is the
    // correct check here, not `attributes('hidden')` on the panel itself.
    const [firstPanel, secondPanel] = tabPanels(wrapper)
    expect(firstPanel!.isVisible()).toBe(true)
    expect(secondPanel!.isVisible()).toBe(false)
  })

  it('does not leak an inactive step\'s label text into the page', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    // Regression: `createInput()` always wraps a step's schema in FormKit's
    // standard outer/wrapper/label/inner chrome. The step's own `hidden`
    // attr used to sit on a div nested *inside* that wrapper, so the
    // auto-rendered `<label>$label</label>` (a sibling one level up) stayed
    // visible for every inactive step - "Step Two"'s label text leaked into
    // the page between the active step's "Next" button and the form's own
    // submit button. Field-level labels ("First Name") are expected and
    // fine - only the *step's own* label text ("Step One"/"Step Two") must
    // never render as page content, only as tab-strip text.
    const labelTexts = wrapper.findAll('label.formkit-label').map(label => label.text())
    expect(labelTexts).not.toContain('Step One')
    expect(labelTexts).not.toContain('Step Two')
  })

  it('blocks advancing to the next step while a required field is empty', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    const nextButton = wrapper.findAll('button').find(button => button.text() === 'Next')
    expect(nextButton).toBeDefined()

    await nextButton!.trigger('click')
    await flushPromises()
    await nextTick()
    await wait()

    const [firstPanel, secondPanel] = tabPanels(wrapper)
    expect(firstPanel!.isVisible()).toBe(true)
    expect(secondPanel!.isVisible()).toBe(false)
  })

  it('advances to the next step once the required field is filled, and the tab strip reflects it', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    // FormKit doesn't mirror the field `name` onto the rendered DOM input's
    // `name` attribute, so locate it positionally (only one input exists in
    // step one).
    await wrapper.findAll('input')[0]!.setValue('Ada')
    await flushPromises()
    await nextTick()
    await wait()

    const nextButton = wrapper.findAll('button').find(button => button.text() === 'Next')
    await nextButton!.trigger('click')
    await flushPromises()
    await nextTick()
    await wait()

    const [firstPanel, secondPanel] = tabPanels(wrapper)
    expect(firstPanel!.isVisible()).toBe(false)
    expect(secondPanel!.isVisible()).toBe(true)
  })

  it('updates the tab header error badge live, without navigating away', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    const firstTabInitially = tabButtons(wrapper)[0]!
    expect(tabBadge(firstTabInitially).exists()).toBe(false)

    // Triggers step validation without ever leaving step one - the badge
    // must react to the step's own validity state changing, not just to
    // `steps`/`activeStep` changing. Calls the multi-step node's own
    // `next()` method directly rather than clicking the "Next" button,
    // since that button is now legitimately `disabled` while step one is
    // invalid (see the "disables" tests below) and a disabled button
    // doesn't dispatch `click` at all.
    getNode('wizard-node')!.next()
    await flushPromises()
    await nextTick()
    await wait()

    const firstTabAfterBlockedNext = tabButtons(wrapper)[0]!
    const errorBadge = tabBadge(firstTabAfterBlockedNext)
    expect(errorBadge.exists()).toBe(true)
    expect(errorBadge.text()).toBe('1')

    await wrapper.findAll('input')[0]!.setValue('Ada')
    await flushPromises()
    await nextTick()
    await wait()

    const firstTabAfterFix = tabButtons(wrapper)[0]!
    const successBadge = tabBadge(firstTabAfterFix)
    expect(successBadge.exists()).toBe(true)
    expect(successBadge.text()).not.toBe('1')
  })

  it('disables the "Next" button while the current step is invalid, and re-enables it once fixed', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()
    await wait()

    const nextButton = wrapper.findAll('button').find(button => button.text() === 'Next')
    expect(nextButton).toBeDefined()
    expect(nextButton!.attributes('disabled')).toBeDefined()

    await wrapper.findAll('input')[0]!.setValue('Ada')
    await flushPromises()
    await nextTick()
    await wait()

    const nextButtonAfterFix = wrapper.findAll('button').find(button => button.text() === 'Next')
    expect(nextButtonAfterFix!.attributes('disabled')).toBeUndefined()
  })

  it('disables an unvisited tab while the current step is invalid, and re-enables it once fixed', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()
    await wait()

    const secondTab = tabButtons(wrapper).find(tab => tab.text() === 'Step Two')
    expect(secondTab!.attributes('disabled')).toBeDefined()

    await wrapper.findAll('input')[0]!.setValue('Ada')
    await flushPromises()
    await nextTick()
    await wait()

    const secondTabAfterFix = tabButtons(wrapper).find(tab => tab.text() === 'Step Two')
    expect(secondTabAfterFix!.attributes('disabled')).toBeUndefined()
  })

  it('clicking a tab navigates directly to that step', async () => {
    const wrapper = await mountWizard()
    await flushPromises()
    await nextTick()

    // FormKit doesn't mirror the field `name` onto the rendered DOM input's
    // `name` attribute, so locate it positionally (only one input exists in
    // step one).
    await wrapper.findAll('input')[0]!.setValue('Ada')
    await flushPromises()
    await nextTick()
    await wait()

    const secondTab = tabButtons(wrapper).find(tab => tab.text() === 'Step Two')
    expect(secondTab).toBeDefined()

    // Reka UI's `TabsTrigger` activates on `pointerdown`, not `click` - a
    // plain `click` trigger leaves it inactive in jsdom.
    await secondTab!.trigger('pointerdown')
    await secondTab!.trigger('mousedown')
    await flushPromises()
    await nextTick()
    await wait()

    const [firstPanel, secondPanel] = tabPanels(wrapper)
    expect(firstPanel!.isVisible()).toBe(false)
    expect(secondPanel!.isVisible()).toBe(true)
  })
})
