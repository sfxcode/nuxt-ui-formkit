<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitInputProps {
  autofocus?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  inputClass?: string
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  autofocusDelay?: number
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UInput
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :autofocus="context.autofocus"
    :class="styleClass"
    :color="color"
    :disabled="!!context?.disabled"
    :highlight="isInvalid || context.highlight"
    :icon="context.icon"
    :input-class="context.inputClass"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :autofocus-delay="context.autofocusDelay"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :type="context?.inputType || 'text'"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
