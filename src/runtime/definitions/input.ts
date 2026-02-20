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
  props: ['label', 'description', 'color', 'variant', 'size', 'indicator', 'icon', 'indeterminateIcon', 'autofocus', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUICheckboxGroupDefinition: FormKitTypeDefinition = createInput(FUCheckboxGroup, {
  props: ['options', 'legend', 'valueKey', 'labelKey', 'descriptionKey', 'size', 'variant', 'orientation', 'loop', 'color', 'indicator', 'icon', 'ui', 'items'],
  family: 'NuxtUIInput',
})

export const nuxtUIColorPickerDefinition: FormKitTypeDefinition = createInput(FUColorPicker, {
  props: ['size', 'inputClass', 'format', 'throttle', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDefinition: FormKitTypeDefinition = createInput(FUInput, {
  props: ['inputType', 'size', 'autocomplete', 'autofocus', 'autofocusDelay', 'highlight', 'fixed', 'color', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'placeholder', 'list', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'step', 'variant', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDateDefinition: FormKitTypeDefinition = createInput(FUInputDate, {
  props: ['defaultValue', 'color', 'variant', 'size', 'highlight', 'fixed', 'autofocus', 'autofocusDelay', 'range', 'separatorIcon', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'placeholder', 'defaultPlaceholder', 'hourCycle', 'step', 'granularity', 'hideTimeZone', 'maxValue', 'minValue', 'isDateUnavailable', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputMenuDefinition: FormKitTypeDefinition = createInput(FUInputMenu, {
  props: ['options', 'inputType', 'placeholder', 'color', 'variant', 'size', 'autofocus', 'autofocusDelay', 'trailingIcon', 'selectedIcon', 'deleteIcon', 'clear', 'clearIcon', 'arrow', 'portal', 'virtualize', 'valueKey', 'labelKey', 'descriptionKey', 'multiple', 'highlight', 'fixed', 'createItem', 'filterFields', 'ignoreFilter', 'defaultOpen', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover', 'openOnClick', 'openOnFocus', 'icon', 'leading', 'leadingIcon', 'trailing', 'loading', 'loadingIcon', 'list', 'autocomplete', 'searchTerm', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTagsDefinition: FormKitTypeDefinition = createInput(FUInputTags, {
  props: ['placeholder', 'maxLength', 'color', 'variant', 'size', 'autofocus', 'autofocusDelay', 'deleteIcon', 'highlight', 'fixed', 'addOnPaste', 'addOnTab', 'addOnBlur', 'duplicate', 'delimiters', 'max', 'convertValue', 'displayValue', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'list', 'autocomplete', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTimeDefinition: FormKitTypeDefinition = createInput(FUInputTime, {
  props: ['color', 'variant', 'size', 'highlight', 'fixed', 'autofocus', 'autofocusDelay', 'defaultValue', 'placeholder', 'defaultPlaceholder', 'hourCycle', 'step', 'stepSnapping', 'granularity', 'hideTimeZone', 'maxValue', 'minValue', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIPinInputDefinition: FormKitTypeDefinition = createInput(FUPinInput, {
  props: ['color', 'variant', 'size', 'length', 'autofocus', 'autofocusDelay', 'highlight', 'fixed', 'defaultValue', 'mask', 'otp', 'placeholder', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIRadioGroupDefinition: FormKitTypeDefinition = createInput(FURadioGroup, {
  props: ['options', 'legend', 'valueKey', 'labelKey', 'descriptionKey', 'size', 'variant', 'orientation', 'loop', 'name', 'color', 'indicator', 'ui'],
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
