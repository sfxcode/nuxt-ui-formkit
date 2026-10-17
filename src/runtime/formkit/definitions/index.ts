import { nuxtUICalendarDefinition, nuxtUICheckboxDefinition, nuxtUICheckboxGroupDefinition, nuxtUIColorPickerDefinition, nuxtUIEditorDefinition, nuxtUIFileUploadDefinition, nuxtUIInputDateDefinition, nuxtUIInputDefinition, nuxtUIInputMenuDefinition, nuxtUIInputNumberDefinition, nuxtUIInputRatingDefinition, nuxtUIInputTagsDefinition, nuxtUIInputTimeDefinition, nuxtUIListboxDefinition, nuxtUIPinInputDefinition, nuxtUIRadioGroupDefinition, nuxtUISelectDefinition, nuxtUISelectMenuDefinition, nuxtUISliderDefinition, nuxtUISwitchDefinition, nuxtUITextareaDefinition, nuxtUITreeDefinition } from './input'
import { nuxtUIMultiStepDefinition, nuxtUIStepDefinition } from './multiStep'
import { nuxtUIOutputBadgeDefinition, nuxtUIOutputBooleanDefinition, nuxtUIOutputDateDefinition, nuxtUIOutputLinkDefinition, nuxtUIOutputListDefinition, nuxtUIOutputNumberDefinition, nuxtUIOutputProgressDefinition, nuxtUIOutputRatingDefinition, nuxtUIOutputTextDefinition, nuxtUIOutputUserDefinition } from './output'
import { renamePrefix } from './prefix'
import { nuxtUIRepeaterDefinition } from './repeater'

// Re-export all individual definitions
export * from './input'
export * from './multiStep'
export * from './output'

export const nuxtUIInputs = {
  nuxtUICalendar: nuxtUICalendarDefinition,
  nuxtUICheckbox: nuxtUICheckboxDefinition,
  nuxtUICheckboxGroup: nuxtUICheckboxGroupDefinition,
  nuxtUIColorPicker: nuxtUIColorPickerDefinition,
  nuxtUIEditor: nuxtUIEditorDefinition,
  nuxtUIFileUpload: nuxtUIFileUploadDefinition,
  nuxtUIInput: nuxtUIInputDefinition,
  nuxtUIInputDate: nuxtUIInputDateDefinition,
  nuxtUIInputMenu: nuxtUIInputMenuDefinition,
  nuxtUIInputNumber: nuxtUIInputNumberDefinition,
  nuxtUIInputRating: nuxtUIInputRatingDefinition,
  nuxtUIInputTags: nuxtUIInputTagsDefinition,
  nuxtUIInputTime: nuxtUIInputTimeDefinition,
  nuxtUIListbox: nuxtUIListboxDefinition,
  nuxtUIMultiStep: nuxtUIMultiStepDefinition,
  nuxtUIPinInput: nuxtUIPinInputDefinition,
  nuxtUIRadioGroup: nuxtUIRadioGroupDefinition,
  nuxtUISelect: nuxtUISelectDefinition,
  nuxtUISelectMenu: nuxtUISelectMenuDefinition,
  nuxtUISlider: nuxtUISliderDefinition,
  nuxtUIStep: nuxtUIStepDefinition,
  nuxtUISwitch: nuxtUISwitchDefinition,
  nuxtUITextarea: nuxtUITextareaDefinition,
  nuxtUITree: nuxtUITreeDefinition,
  nuxtUIRepeater: nuxtUIRepeaterDefinition,
}

export const nuxtUIOutputs = {
  nuxtUIOutputBadge: nuxtUIOutputBadgeDefinition,
  nuxtUIOutputBoolean: nuxtUIOutputBooleanDefinition,
  nuxtUIOutputDate: nuxtUIOutputDateDefinition,
  nuxtUIOutputLink: nuxtUIOutputLinkDefinition,
  nuxtUIOutputList: nuxtUIOutputListDefinition,
  nuxtUIOutputNumber: nuxtUIOutputNumberDefinition,
  nuxtUIOutputProgress: nuxtUIOutputProgressDefinition,
  nuxtUIOutputRating: nuxtUIOutputRatingDefinition,
  nuxtUIOutputText: nuxtUIOutputTextDefinition,
  nuxtUIOutputUser: nuxtUIOutputUserDefinition,
}

/**
 * The same definitions under the library-neutral `form` prefix (`formInput`, `formRepeater`, ...), so
 * a schema can keep its type names when it moves between UI libraries that share the prefix.
 * `nuxtUIInputs` and `nuxtUIOutputs` are unchanged: register these in addition to keep both names,
 * or leave `createNuxtUiFormkitConfig` to do it: it registers them unless `{ formPrefix: false }` is passed.
 */
export const formInputs = renamePrefix(nuxtUIInputs, 'nuxtUI', 'form')

export const formOutputs = renamePrefix(nuxtUIOutputs, 'nuxtUI', 'form')
