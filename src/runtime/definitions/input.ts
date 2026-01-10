import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUInput from '../components/inputs/FUInput.vue'
import FUTextarea from '../components/inputs/FUTextarea.vue'

export const nuxtUIInputDefinition: FormKitTypeDefinition = createInput(FUInput, {
  props: ['inputType', 'placeholder', 'autofocus', 'padded', 'size', 'color', 'variant', 'inputClass', 'loading', 'icon', 'trailingIcon', 'leadingIcon', 'trailing', 'leading'],
  family: 'NuxtUIInput',
})

export const nuxtUITextareaDefinition: FormKitTypeDefinition = createInput(FUTextarea, {
  props: ['name', 'placeholder', 'required', 'autofocus', 'autoresize', 'rows', 'cols', 'maxrows', 'resize', 'padded', 'size', 'color', 'variant', 'inputClass', 'ui', 'highlight', 'loading', 'icon', 'trailingIcon'],
  family: 'NuxtUIInput',
})
