<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitInputTagsProps {
  autofocus?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  inputClass?: string
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  padded?: boolean
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  allowDuplicates?: boolean
  max?: number
  min?: number
  separator?: string | string[]
  tagVariant?: 'solid' | 'soft' | 'outline' | 'subtle'
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
    :allow-duplicates="context.allowDuplicates"
    :autofocus="context.autofocus"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :icon="context.icon"
    :input-class="context.inputClass"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :max="context.max"
    :min="context.min"
    :padded="context.padded"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :separator="context.separator"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :tag-variant="context.tagVariant"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
