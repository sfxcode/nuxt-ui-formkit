import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUCalendar from '../../../runtime/components/inputs/FUCalendar.vue'
import FUCheckbox from '../../../runtime/components/inputs/FUCheckbox.vue'
import FUCheckboxGroup from '../../../runtime/components/inputs/FUCheckboxGroup.vue'
import FUColorPicker from '../../../runtime/components/inputs/FUColorPicker.vue'
import FUEditor from '../../../runtime/components/inputs/FUEditor.vue'
import FUFileUpload from '../../../runtime/components/inputs/FUFileUpload.vue'
import FUInput from '../../../runtime/components/inputs/FUInput.vue'
import FUInputDate from '../../../runtime/components/inputs/FUInputDate.vue'
import FUInputMenu from '../../../runtime/components/inputs/FUInputMenu.vue'
import FUInputNumber from '../../../runtime/components/inputs/FUInputNumber.vue'
import FUInputTags from '../../../runtime/components/inputs/FUInputTags.vue'
import FUInputTime from '../../../runtime/components/inputs/FUInputTime.vue'
import FUListbox from '../../../runtime/components/inputs/FUListbox.vue'
import FUPinInput from '../../../runtime/components/inputs/FUPinInput.vue'
import FURadioGroup from '../../../runtime/components/inputs/FURadioGroup.vue'
import FUSelect from '../../../runtime/components/inputs/FUSelect.vue'
import FUSelectMenu from '../../../runtime/components/inputs/FUSelectMenu.vue'
import FUSlider from '../../../runtime/components/inputs/FUSlider.vue'
import FUSwitch from '../../../runtime/components/inputs/FUSwitch.vue'
import FUTextarea from '../../../runtime/components/inputs/FUTextarea.vue'

export const nuxtUICalendarDefinition: FormKitTypeDefinition = createInput(FUCalendar, {
  props: ['type', 'range', 'multiple', 'color', 'variant', 'size', 'weekNumbers', 'monthControls', 'yearControls', 'viewControl', 'defaultValue', 'minValue', 'maxValue', 'isDateDisabled', 'isDateUnavailable', 'ui', 'valueType', 'timeZone'],
  family: 'NuxtUIInput',
})

export const nuxtUICheckboxDefinition: FormKitTypeDefinition = createInput(FUCheckbox, {
  props: ['label', 'description', 'color', 'variant', 'size', 'indicator', 'icon', 'indeterminateIcon', 'trueValue', 'falseValue', 'autofocus', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUICheckboxGroupDefinition: FormKitTypeDefinition = createInput(FUCheckboxGroup, {
  props: ['options', 'legend', 'valueKey', 'labelKey', 'descriptionKey', 'size', 'variant', 'orientation', 'loop', 'name', 'color', 'indicator', 'icon', 'ui', 'items'],
  family: 'NuxtUIInput',
})

export const nuxtUIColorPickerDefinition: FormKitTypeDefinition = createInput(FUColorPicker, {
  props: ['size', 'inputClass', 'format', 'throttle', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIEditorDefinition: FormKitTypeDefinition = createInput(FUEditor, {
  props: ['contentType', 'starterKit', 'placeholder', 'markdown', 'image', 'mention', 'editorHandlers', 'extensions', 'autofocus', 'toolbar', 'toolbarItems', 'bubbleToolbar', 'bubbleToolbarItems', 'dragHandle', 'suggestionMenu', 'suggestionMenuItems', 'mentionItems', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIFileUploadDefinition: FormKitTypeDefinition = createInput(FUFileUpload, {
  props: ['multiple', 'accept', 'icon', 'label', 'description', 'color', 'variant', 'size', 'layout', 'position', 'dropzone', 'interactive', 'required', 'reset', 'fileIcon', 'fileImage', 'fileDelete', 'fileDeleteIcon', 'preview', 'name', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDefinition: FormKitTypeDefinition = createInput(FUInput, {
  props: ['inputType', 'size', 'autocomplete', 'autofocus', 'autofocusDelay', 'highlight', 'fixed', 'color', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'placeholder', 'list', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'step', 'variant', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDateDefinition: FormKitTypeDefinition = createInput(FUInputDate, {
  props: ['defaultValue', 'color', 'variant', 'size', 'highlight', 'fixed', 'autofocus', 'autofocusDelay', 'range', 'separatorIcon', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'placeholder', 'defaultPlaceholder', 'hourCycle', 'step', 'granularity', 'hideTimeZone', 'maxValue', 'minValue', 'isDateUnavailable', 'ui', 'valueType', 'timeZone'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputMenuDefinition: FormKitTypeDefinition = createInput(FUInputMenu, {
  props: ['options', 'inputType', 'placeholder', 'color', 'variant', 'size', 'autofocus', 'autofocusDelay', 'trailingIcon', 'selectedIcon', 'deleteIcon', 'clear', 'clearIcon', 'arrow', 'portal', 'virtualize', 'content', 'mode', 'by', 'open', 'valueKey', 'labelKey', 'descriptionKey', 'multiple', 'highlight', 'fixed', 'createItem', 'filterFields', 'ignoreFilter', 'defaultOpen', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover', 'openOnClick', 'openOnFocus', 'icon', 'leading', 'leadingIcon', 'trailing', 'loading', 'loadingIcon', 'list', 'autocomplete', 'searchTerm', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputNumberDefinition: FormKitTypeDefinition = createInput(FUInputNumber, {
  props: ['placeholder', 'color', 'variant', 'size', 'highlight', 'fixed', 'orientation', 'increment', 'incrementIcon', 'incrementDisabled', 'decrement', 'decrementIcon', 'decrementDisabled', 'autofocus', 'autofocusDelay', 'min', 'max', 'step', 'stepSnapping', 'formatOptions', 'disableWheelChange', 'invertWheelChange', 'focusOnChange', 'locale', 'list', 'autocomplete', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTagsDefinition: FormKitTypeDefinition = createInput(FUInputTags, {
  props: ['placeholder', 'maxLength', 'color', 'variant', 'size', 'autofocus', 'autofocusDelay', 'deleteIcon', 'highlight', 'fixed', 'addOnPaste', 'addOnTab', 'addOnBlur', 'duplicate', 'delimiter', 'max', 'convertValue', 'displayValue', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'list', 'autocomplete', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputTimeDefinition: FormKitTypeDefinition = createInput(FUInputTime, {
  props: ['color', 'variant', 'size', 'highlight', 'fixed', 'autofocus', 'autofocusDelay', 'defaultValue', 'placeholder', 'defaultPlaceholder', 'hourCycle', 'step', 'stepSnapping', 'granularity', 'hideTimeZone', 'maxValue', 'minValue', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIListboxDefinition: FormKitTypeDefinition = createInput(FUListbox, {
  props: ['options', 'as', 'color', 'size', 'by', 'orientation', 'selectionBehavior', 'disabled', 'defaultValue', 'multiple', 'valueKey', 'labelKey', 'descriptionKey', 'loading', 'loadingIcon', 'filter', 'filterFields', 'ignoreFilter', 'selectedIcon', 'virtualize', 'highlight', 'highlightOnHover', 'autofocus', 'autofocusDelay', 'searchTerm', 'ui', 'displayMode', 'transferLeftHeaderText', 'transferRightHeaderText', 'transferAll', 'transferHeaderClass', 'transferSortIcons', 'transferItemDraggable'],
  family: 'NuxtUIInput',
})

export const nuxtUIPinInputDefinition: FormKitTypeDefinition = createInput(FUPinInput, {
  props: ['color', 'variant', 'size', 'length', 'autofocus', 'autofocusDelay', 'highlight', 'fixed', 'defaultValue', 'mask', 'otp', 'separator', 'type', 'placeholder', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIRadioGroupDefinition: FormKitTypeDefinition = createInput(FURadioGroup, {
  props: ['options', 'legend', 'valueKey', 'labelKey', 'descriptionKey', 'size', 'variant', 'orientation', 'loop', 'name', 'color', 'indicator', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUISelectDefinition: FormKitTypeDefinition = createInput(FUSelect, {
  props: ['options', 'placeholder', 'color', 'variant', 'size', 'selectedIcon', 'arrow', 'portal', 'content', 'valueKey', 'labelKey', 'descriptionKey', 'defaultValue', 'multiple', 'highlight', 'fixed', 'autofocus', 'autofocusDelay', 'open', 'defaultOpen', 'autocomplete', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUISelectMenuDefinition: FormKitTypeDefinition = createInput(FUSelectMenu, {
  props: ['options', 'placeholder', 'searchInput', 'color', 'variant', 'size', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'selectedIcon', 'clear', 'clearIcon', 'arrow', 'portal', 'virtualize', 'content', 'by', 'valueKey', 'labelKey', 'descriptionKey', 'defaultValue', 'multiple', 'highlight', 'fixed', 'createItem', 'filterFields', 'ignoreFilter', 'autofocus', 'autofocusDelay', 'open', 'defaultOpen', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover', 'searchTerm', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUISliderDefinition: FormKitTypeDefinition = createInput(FUSlider, {
  props: ['color', 'size', 'orientation', 'tooltip', 'defaultValue', 'name', 'inverted', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUISwitchDefinition: FormKitTypeDefinition = createInput(FUSwitch, {
  props: ['color', 'size', 'loading', 'loadingIcon', 'checkedIcon', 'uncheckedIcon', 'label', 'description', 'defaultValue', 'trueValue', 'falseValue', 'autofocus', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUITextareaDefinition: FormKitTypeDefinition = createInput(FUTextarea, {
  props: ['color', 'size', 'variant', 'placeholder', 'autofocus', 'autofocusDelay', 'autoresize', 'autoresizeDelay', 'rows', 'maxrows', 'highlight', 'fixed', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'cols', 'dirname', 'maxlength', 'minlength', 'wrap', 'ui'],
  family: 'NuxtUIInput',
})
