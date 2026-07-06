import type { FormKitTypeDefinition } from '@formkit/core'
import { disablesChildren } from '@formkit/inputs'
import { createInput } from '@formkit/vue'
import { useFormKitMultiStep } from '../../composables/useFormKitMultiStep'
import { useFormKitSchema } from '../../composables/useFormKitSchema'

const { addElement, addComponent } = useFormKitSchema()
const { addMultiStepHandler, addStepHandler } = useFormKitMultiStep()

function addStepActionButton(label: object, onClick: string, bindAttrs: string, render: string, variant?: string, disabled?: string) {
  return addElement('div', [
    addComponent('UButton', { label, onClick, variant, disabled, ui: '$ui' }, true, { bind: bindAttrs }),
  ], {}, render)
}

// `@formkit/addons`' own `step`/`multi-step` schema section builders
// (`stepOuter`, `stepActions`, `tabs`, ...) are internal implementation
// details, not exported from the package - this rebuilds the same shape with
// this repo's own `useFormKitSchema()` helpers rather than importing them.
export const nuxtUIStepDefinition: FormKitTypeDefinition = createInput(
  addElement('div', [
    addElement('div', '$slots.default', { class: 'formkit-step-inner' }),
    addElement('div', [
      addStepActionButton(
        { if: '$previousLabel', then: '$previousLabel', else: 'Previous' },
        '$handlers.previous',
        '$previousAttrs',
        '$isFirstStep === false',
        'outline',
      ),
      addStepActionButton(
        { if: '$nextLabel', then: '$nextLabel', else: 'Next' },
        '$handlers.next',
        '$nextAttrs',
        '$isLastStep === false || $stepIndex === 0',
        undefined,
        '$nextDisabled',
      ),
    ], { class: '$internalStepActionsClass' }),
  ], {
    'id': '$id',
    'role': 'tabpanel',
    'aria-labelledby': '$node.parent.props.id + "_tab_" + $stepIndex',
  }, true),
  {
    // The core node `type` (input|list|group) - not to be confused with
    // `forceTypeProp` below, which is what makes `@formkit/addons`' own
    // `createMultiStepPlugin` recognize this node as a `step`.
    type: 'group',
    forceTypeProp: 'step',
    family: 'NuxtUIInput',
    props: ['beforeStepChange', 'nextAttrs', 'nextLabel', 'previousAttrs', 'previousLabel', 'validStepIcon', 'ui', 'stepActionsClass'],
    features: [disablesChildren, addStepHandler],
  },
  {
    // `createInput()` always wraps the given schema in FormKit's standard
    // outer/wrapper/label/inner/help/messages chrome (`useSchema()`) - the
    // `hidden` attr on our own inner div (above) only hid *that* div, while
    // the auto-generated `label` section (which renders whenever `$label`
    // is set - and every step needs a `label` prop so `stepName` has
    // something better than the raw step name to show in the tab strip)
    // is a *sibling* of it, one level up, and stayed visible regardless -
    // every inactive step's label text leaked into the page between the
    // active step's "Next" button and the form's own submit button. Move
    // `hidden` to the actual outermost element instead, and suppress the
    // redundant label section entirely (a wizard step isn't a labeled
    // field - its `label` prop only feeds the tab strip's text).
    outer: {
      attrs: {
        hidden: '$isActiveStep === false || undefined',
      },
    },
    label: {
      if: 'false',
    },
  },
)

export const nuxtUIMultiStepDefinition: FormKitTypeDefinition = createInput(
  addElement('div', [
    addElement('div', [
      addComponent('UTabs', {
        'items': '$tabItems',
        'modelValue': '$activeStep',
        'content': false,
        'onUpdate:modelValue': '$handleTabChange',
        'ui': '$ui',
      }),
    ], { class: 'formkit-multi-step-tabs' }),
    addElement('div', '$slots.default', { class: 'formkit-multi-step-steps' }),
  ], { id: '$id' }, true),
  {
    type: 'group',
    forceTypeProp: 'multi-step',
    family: 'NuxtUIInput',
    props: ['allowIncomplete', 'tabStyle', 'hideProgressLabels', 'validStepIcon', 'beforeStepChange', 'ui'],
    features: [disablesChildren, addMultiStepHandler],
  },
)
