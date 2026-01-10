<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../composables/useFormKitInput'

export interface FormKitTextareaProps {
  placeholder?: string
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitTextareaProps>,
    required: true,
  },
})

const { isInvalid, handleInput, handleChange, styleClass } = useFormKitInput(props.context)
</script>

<template>
  <div class="nuxt-ui-formkit">
    <UTextarea
      :id="context.id"
      v-model="context._value"
      v-bind="context?.attrs"
      :disabled="!!context?.disabled"
      :readonly="context?.attrs.readonly ?? false"
      :style="context?.attrs.style"
      :class="styleClass"
      :placeholder="context.placeholder"
      @update:model-value="handleInput"
      @change="handleChange"
    />
  </div>
</template>
