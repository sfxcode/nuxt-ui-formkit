<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../composables/useFormKitInput'

export interface InputMenuItem {
  label?: string
  icon?: string
  avatar?: {
    src?: string
    alt?: string
  }
  chip?: string | number
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitInputMenuProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  inputClass?: string
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  multiple?: boolean
  options?: InputMenuItem[]
  optionAttribute?: string
  padded?: boolean
  placeholder?: string
  searchable?: boolean
  searchablePlaceholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  valueAttribute?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputMenuProps>,
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
  <UInputMenu
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :icon="context.icon"
    :input-class="context.inputClass"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :multiple="context.multiple"
    :option-attribute="context.optionAttribute ?? 'label'"
    :options="context.options ?? []"
    :padded="context.padded"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :searchable="context.searchable"
    :searchable-placeholder="context.searchablePlaceholder"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :value-attribute="context.valueAttribute ?? 'label'"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
