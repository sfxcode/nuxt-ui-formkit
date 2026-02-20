<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitSliderProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  inputClass?: string
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  showTooltip?: boolean
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSliderProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <USlider
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :input-class="context.inputClass"
    :max="context.max ?? 100"
    :min="context.min ?? 0"
    :orientation="context.orientation ?? 'horizontal'"
    :show-tooltip="context.showTooltip"
    :size="context.size ?? 'md'"
    :step="context.step ?? 1"
    :style="context?.attrs.style"
    :tooltip-position="context.tooltipPosition"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
