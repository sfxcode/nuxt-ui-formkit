import { nuxtUICalendarDefinition, nuxtUICheckboxDefinition, nuxtUICheckboxGroupDefinition, nuxtUIColorPickerDefinition, nuxtUIEditorDefinition, nuxtUIFileUploadDefinition, nuxtUIInputDateDefinition, nuxtUIInputDefinition, nuxtUIInputMenuDefinition, nuxtUIInputNumberDefinition, nuxtUIInputRatingDefinition, nuxtUIInputTagsDefinition, nuxtUIInputTimeDefinition, nuxtUIListboxDefinition, nuxtUIPinInputDefinition, nuxtUIRadioGroupDefinition, nuxtUISelectDefinition, nuxtUISelectMenuDefinition, nuxtUISliderDefinition, nuxtUISwitchDefinition, nuxtUITextareaDefinition, nuxtUITreeDefinition } from './input'
import { nuxtUIMultiStepDefinition, nuxtUIStepDefinition } from './multiStep'
import { nuxtUIOutputBadgeDefinition, nuxtUIOutputBooleanDefinition, nuxtUIOutputDateDefinition, nuxtUIOutputLinkDefinition, nuxtUIOutputListDefinition, nuxtUIOutputNumberDefinition, nuxtUIOutputProgressDefinition, nuxtUIOutputRatingDefinition, nuxtUIOutputTextDefinition, nuxtUIOutputUserDefinition } from './output'
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
