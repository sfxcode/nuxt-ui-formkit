<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitPinInputProps {
  autofocus?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  inputClass?: string
  length?: number
  mask?: boolean
  otp?: boolean
  padded?: boolean
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'text' | 'number'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitPinInputProps>,
    required: true,
  },
})

const modelValue = computed({
  get: () => props.context._value || '',
  set: (value) => {
    props.context.node.input(value)
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color } = useFormKitInput(props.context)
</script>

<template>
  <UPinInput
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :autofocus="context.autofocus"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :input-class="context.inputClass"
    :length="context.length ?? 6"
    :mask="context.mask"
    :otp="context.otp"
    :padded="context.padded"
    :placeholder="context.placeholder"
    :readonly="context?.attrs.readonly ?? false"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :type="context.type ?? 'text'"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
