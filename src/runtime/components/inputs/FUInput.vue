<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface FormKitInputProps {
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  autocomplete?: string & {} | 'on' | 'off'
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  fixed?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: boolean
  placeholder?: string
  list?: string
  max?: number | string
  maxLength?: number | string
  min?: number | string
  minLength?: number | string
  pattern?: string
  step?: number | string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: Record<string, unknown>
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
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :type="context?.inputType || 'text'"
    :placeholder="context.placeholder"
    :autocomplete="context.autocomplete || 'off'"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :fixed="context.fixed"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :list="context.list"
    :max="context.max"
    :max-length="context.maxLength"
    :min="context.min"
    :min-length="context.minLength"
    :pattern="context.pattern"
    :step="context.step"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
