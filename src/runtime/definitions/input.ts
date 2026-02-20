import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUCheckbox from '../components/inputs/FUCheckbox.vue'
import FUCheckboxGroup from '../components/inputs/FUCheckboxGroup.vue'
import FUColorPicker from '../components/inputs/FUColorPicker.vue'
import FUInput from '../components/inputs/FUInput.vue'
import FUInputDate from '../components/inputs/FUInputDate.vue'
import FUInputMenu from '../components/inputs/FUInputMenu.vue'
import FUInputTags from '../components/inputs/FUInputTags.vue'
import FUInputTime from '../components/inputs/FUInputTime.vue'
import FUPinInput from '../components/inputs/FUPinInput.vue'
import FURadioGroup from '../components/inputs/FURadioGroup.vue'
import FUSelect from '../components/inputs/FUSelect.vue'
import FUSelectMenu from '../components/inputs/FUSelectMenu.vue'
import FUSlider from '../components/inputs/FUSlider.vue'
import FUSwitch from '../components/inputs/FUSwitch.vue'
import FUTextarea from '../components/inputs/FUTextarea.vue'

export const nuxtUICheckboxDefinition: FormKitTypeDefinition = createInput(FUCheckbox, {
  props: ['label', 'description', 'required', 'help', 'color', 'size', 'inputClass', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUICheckboxGroupDefinition: FormKitTypeDefinition = createInput(FUCheckboxGroup, {
  props: ['options', 'size', 'color', 'inputClass', 'valueAttribute', 'optionAttribute', 'orientation'],
  family: 'NuxtUIInput',
})

export const nuxtUIColorPickerDefinition: FormKitTypeDefinition = createInput(FUColorPicker, {
  props: ['size', 'inputClass', 'variant', 'format', 'modes', 'showAlpha', 'showInput', 'swatches'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDefinition: FormKitTypeDefinition = createInput(FUInput, {
  props: ['inputType', 'placeholder', 'autofocus', 'autofocusDelay', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDateDefinition: FormKitTypeDefinition = createInput(FUInputDate, {
  props: ['placeholder', 'autofocus', 'autofocusDelay', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'range', 'granularity', 'hourCycle', 'hideTimeZone', 'minValue', 'maxValue', 'isDateUnavailable', 'defaultPlaceholder', 'separatorIcon', 'step', 'readonly'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputMenuDefinition: FormKitTypeDefinition = createInput(FUInputMenu, {
  props: ['options', 'placeholder', 'multiple', 'searchable', 'searchablePlaceholder', 'loading', 'size', 'color', 'variant', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'inputClass', 'valueAttribute', 'optionAttribute'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTagsDefinition: FormKitTypeDefinition = createInput(FUInputTags, {
  props: ['placeholder', 'autofocus', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'allowDuplicates', 'max', 'min', 'separator', 'tagVariant'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTimeDefinition: FormKitTypeDefinition = createInput(FUInputTime, {
  props: ['placeholder', 'autofocus', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'format', 'step'],
  family: 'NuxtUIInput',
})

export const nuxtUIPinInputDefinition: FormKitTypeDefinition = createInput(FUPinInput, {
  props: ['placeholder', 'autofocus', 'size', 'color', 'variant', 'inputClass', 'padded', 'length', 'mask', 'otp', 'type'],
  family: 'NuxtUIInput',
})

export const nuxtUIRadioGroupDefinition: FormKitTypeDefinition = createInput(FURadioGroup, {
  props: ['options', 'size', 'color', 'inputClass', 'valueAttribute', 'optionAttribute', 'orientation'],
  family: 'NuxtUIInput',
})

export const nuxtUISelectDefinition: FormKitTypeDefinition = createInput(FUSelect, {
  props: ['options', 'placeholder', 'multiple', 'searchable', 'clearable', 'creatable', 'loading', 'size', 'color', 'variant', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'inputClass', 'ui', 'valueAttribute', 'optionAttribute'],
  family: 'NuxtUIInput',
})

export const nuxtUISelectMenuDefinition: FormKitTypeDefinition = createInput(FUSelectMenu, {
  props: ['options', 'placeholder', 'multiple', 'searchable', 'searchablePlaceholder', 'loading', 'size', 'color', 'variant', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'inputClass', 'valueAttribute', 'optionAttribute'],
  family: 'NuxtUIInput',
})

export const nuxtUISliderDefinition: FormKitTypeDefinition = createInput(FUSlider, {
  props: ['size', 'color', 'inputClass', 'min', 'max', 'step', 'orientation', 'showTooltip', 'tooltipPosition'],
  family: 'NuxtUIInput',
})

export const nuxtUISwitchDefinition: FormKitTypeDefinition = createInput(FUSwitch, {
  props: ['label', 'description', 'size', 'color', 'inputClass', 'icon', 'onIcon', 'offIcon', 'loading', 'loadingIcon'],
  family: 'NuxtUIInput',
})

export const nuxtUITextareaDefinition: FormKitTypeDefinition = createInput(FUTextarea, {
  props: ['name', 'placeholder', 'required', 'autofocus', 'autoresize', 'rows', 'cols', 'maxrows', 'resize', 'padded', 'size', 'color', 'variant', 'inputClass', 'ui', 'highlight', 'loading', 'icon', 'trailingIcon'],
  family: 'NuxtUIInput',
})
