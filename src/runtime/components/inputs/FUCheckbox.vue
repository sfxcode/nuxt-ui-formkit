<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitCheckboxProps {
  label?: string
  description?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'card' | 'list'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  indicator?: 'start' | 'end' | 'hidden'
  icon?: string
  indeterminateIcon?: string
  required?: boolean
  autofocus?: false | true | 'true' | 'false'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UCheckbox
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :style="context?.attrs.style"
    :disabled="!!context?.disabled"
    :size="context.size ?? 'md'"
    :color="context.color ?? 'primary'"
    :variant="context.variant"
    :description="context.description"
    :label="context.label"
    :indicator="context.indicator"
    :icon="context.icon"
    :indeterminate-icon="context.indeterminateIcon"
    :required="context.required"
    :autofocus="context.autofocus"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
