import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUCheckbox from '../components/inputs/FUCheckbox.vue'
import FUInput from '../components/inputs/FUInput.vue'
import FUSelect from '../components/inputs/FUSelect.vue'
import FUTextarea from '../components/inputs/FUTextarea.vue'

export const nuxtUICheckboxDefinition: FormKitTypeDefinition = createInput(FUCheckbox, {
  props: ['label', 'description', 'required', 'help', 'color', 'size', 'inputClass', 'ui'],
  family: 'NuxtUIInput',
})

export const nuxtUIInputDefinition: FormKitTypeDefinition = createInput(FUInput, {
  props: ['inputType', 'placeholder', 'autofocus', 'padded', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading'],
  family: 'NuxtUIInput',
})

export const nuxtUISelectDefinition: FormKitTypeDefinition = createInput(FUSelect, {
  props: ['options', 'placeholder', 'multiple', 'searchable', 'clearable', 'creatable', 'loading', 'size', 'color', 'variant', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading', 'padded', 'inputClass', 'ui', 'valueAttribute', 'optionAttribute'],
  family: 'NuxtUIInput',
})

export const nuxtUITextareaDefinition: FormKitTypeDefinition = createInput(FUTextarea, {
  props: ['name', 'placeholder', 'required', 'autofocus', 'autoresize', 'rows', 'cols', 'maxrows', 'resize', 'padded', 'size', 'color', 'variant', 'inputClass', 'ui', 'highlight', 'loading', 'icon', 'trailingIcon'],
  family: 'NuxtUIInput',
})
