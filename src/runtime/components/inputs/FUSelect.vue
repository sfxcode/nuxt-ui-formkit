<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { SelectMenuItem } from '#ui/components/SelectMenu.vue'

export interface FormKitSelectProps {
  clearable?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  creatable?: boolean
  disabled?: boolean
  icon?: string
  inputClass?: string
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  multiple?: boolean
  optionAttribute?: string
  options?: string[] | SelectMenuItem[] | SelectMenuItem[][]
  padded?: boolean
  placeholder?: string
  searchable?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  valueAttribute?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSelectProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, color, styleClass, modelValue, items } = useFormKitInput(props.context)
</script>

<template>
  <USelect
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :clearable="context.clearable"
    :color="color as any"
    :creatable="context.creatable"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :icon="context.icon"
    :input-class="context.inputClass"
    :items="items"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :multiple="context.multiple"
    :option-attribute="context.optionAttribute"
    :padded="context.padded"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :searchable="context.searchable"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :ui="context.ui"
    :value-attribute="context.valueAttribute"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
