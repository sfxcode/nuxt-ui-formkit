<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitSliderProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  tooltip?: boolean
  defaultValue?: number | number[]
  name?: string
  inverted?: boolean
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSliderProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <USlider
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :orientation="context.orientation ?? 'horizontal'"
    :tooltip="context.tooltip"
    :default-value="context.defaultValue"
    :name="context.name"
    :inverted="context.inverted"
    :min="context.min"
    :max="context.max"
    :step="context.step"
    :min-steps-between-thumbs="context.minStepsBetweenThumbs"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
