<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface RadioOption {
  value: string | number | boolean
  label?: string
  description?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitRadioGroupProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  options?: RadioOption[]
  valueAttribute?: string
  optionAttribute?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  inputClass?: string
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitRadioGroupProps>,
    required: true,
  },
})

const modelValue = computed({
  get: () => props.context._value,
  set: (value) => {
    props.context.node.input(value)
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color } = useFormKitInput(props.context)
</script>

<template>
  <URadioGroup
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :input-class="context.inputClass"
    :option-attribute="context.optionAttribute ?? 'label'"
    :options="context.options ?? []"
    :orientation="context.orientation ?? 'vertical'"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :value-attribute="context.valueAttribute ?? 'value'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
