<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface FormKitTextareaProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  placeholder?: string
  autofocus?: boolean
  autofocusDelay?: number
  autoresize?: boolean
  autoresizeDelay?: number
  rows?: number
  maxrows?: number
  highlight?: boolean
  fixed?: boolean
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: boolean
  cols?: number | string
  dirname?: string
  maxlength?: number | string
  minlength?: number | string
  wrap?: string
  ui?: Record<string, unknown>
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
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :placeholder="context.placeholder"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :autoresize="context.autoresize"
    :autoresize-delay="context.autoresizeDelay"
    :rows="context.rows"
    :maxrows="context.maxrows"
    :fixed="context.fixed"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :cols="context.cols"
    :dirname="context.dirname"
    :maxlength="context.maxlength"
    :minlength="context.minlength"
    :wrap="context.wrap"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
