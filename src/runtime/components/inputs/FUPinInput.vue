<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitPinInputProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  length?: string | number
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  fixed?: boolean
  defaultValue?: string[] | undefined
  mask?: boolean
  otp?: boolean
  placeholder?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitPinInputProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UPinInput
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :default-value="context.defaultValue"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :length="context.length ?? 5"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :fixed="context.fixed"
    :mask="context.mask"
    :otp="context.otp"
    :placeholder="context.placeholder"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
