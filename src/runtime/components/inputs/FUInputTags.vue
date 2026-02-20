<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface FormKitInputTagsProps {
  placeholder?: string
  maxLength?: number
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  autofocus?: boolean
  autofocusDelay?: number
  deleteIcon?: string
  highlight?: boolean
  fixed?: boolean
  addOnPaste?: boolean
  addOnTab?: boolean
  addOnBlur?: boolean
  duplicate?: boolean
  delimiters?: string | RegExp
  max: number
  convertValue?: (value: string) => string
  displayValue?: (value: string) => string
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: boolean
  list?: string
  autocomplete?: string & {} | 'on' | 'off'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputTagsProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UInputTags
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
    :max-length="context.maxLength"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay ?? 0"
    :delete-icon="context.deleteIcon"
    :fixed="context.fixed"
    :add-on-paste="context.addOnPaste"
    :add-on-tab="context.addOnTab"
    :add-on-blur="context.addOnBlur"
    :duplicate="context.duplicate"
    :delimiters="context.delimiters"
    :max="context.max"
    :convert-value="context.convertValue"
    :display-value="context.displayValue"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :list="context.list"
    :autocomplete="context.autocomplete || 'off'"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
