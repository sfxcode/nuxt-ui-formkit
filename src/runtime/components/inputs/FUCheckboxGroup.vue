<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface CheckboxOption {
  value: string | number | boolean
  label?: string
  description?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitCheckboxGroupProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  options?: CheckboxOption[]
  valueAttribute?: string
  optionAttribute?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  inputClass?: string
  indeterminate?: boolean
  legend?: string
  help?: string
  variant?: 'table' | 'list' | 'card'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxGroupProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue, items } = useFormKitInput(props.context)
</script>

<template>
  <UCheckboxGroup
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :help="context.help"
    :highlight="!!(isInvalid || context.highlight)"
    :indeterminate="context.indeterminate"
    :input-class="context.inputClass"
    :items="items"
    :legend="context.legend"
    :option-attribute="context.optionAttribute ?? 'label'"
    :orientation="context.orientation ?? 'vertical'"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :ui="context.ui"
    :value-attribute="context.valueAttribute ?? 'value'"
    :variant="context.variant"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
