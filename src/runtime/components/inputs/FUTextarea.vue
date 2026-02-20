<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitTextareaProps {
  autofocus?: boolean
  autoresize?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  cols?: number | string
  highlight?: boolean
  icon?: string
  inputClass?: string
  loading?: boolean
  maxrows?: number | string
  padded?: boolean
  placeholder?: string
  resize?: boolean
  rows?: number | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitTextareaProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, color, isInvalid, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UTextarea
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :autofocus="context.autofocus"
    :autoresize="context.autoresize"
    :class="styleClass"
    :color="color as any"
    :cols="context.cols"
    :disabled="!!context?.disabled"
    :highlight="isInvalid || context.highlight"
    :icon="context.icon"
    :input-class="context.inputClass"
    :loading="context.loading"
    :maxrows="context.maxrows as any"
    :padded="context.padded"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :resize="context.resize"
    :rows="context.rows as any"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :trailing-icon="context.trailingIcon"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
