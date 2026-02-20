<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitColorPickerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  inputClass?: string
  format?: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab'
  throttle: number
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitColorPickerProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UColorPicker
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :size="context.size ?? 'md'"
    :format="context.format || 'hex'"
    :throttle="context.throttle"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
