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
  autofocus?: false | true | 'true' | 'false'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, modelValue, color } = useFormKitInput(props.context)
</script>

<template>
  <UCheckbox
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :variant="context.variant"
    :label="context.label"
    :description="context.description"
    :indicator="context.indicator"
    :icon="context.icon"
    :indeterminate-icon="context.indeterminateIcon"
    :autofocus="context.autofocus"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
