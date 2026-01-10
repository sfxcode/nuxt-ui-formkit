import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUTextarea from '../components/inputs/FUTextarea.vue'

export const nuxtUITextareaDefinition: FormKitTypeDefinition = createInput(FUTextarea, {
  props: ['pt', 'ptOptions', 'unstyled', 'autoResize', 'rows', 'placeholder', 'size'],
  family: 'NuxtUIInput',
})
