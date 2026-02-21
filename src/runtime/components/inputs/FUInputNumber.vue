<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitInputNumberProps {
  placeholder?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  highlight?: boolean
  fixed?: boolean
  orientation?: 'horizontal' | 'vertical'
  increment?: boolean
  incrementIcon?: string
  incrementDisabled?: boolean
  decrement?: boolean
  decrementIcon?: string
  decrementDisabled?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  min?: number
  max?: number
  step?: number
  stepSnapping?: boolean
  formatOptions?: Intl.NumberFormatOptions
  disableWheelChange?: boolean
  invertWheelChange?: boolean
  focusOnChange?: boolean
  list: string
  autocomplete?: string & {} | 'on' | 'off'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputNumberProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UInputNumber
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :orientation="context.orientation ?? 'vertical'"
    :highlight="isInvalid || context.highlight"
    :fixed="context.fixed"
    :increment="context.increment"
    :increment-icon="context.incrementIcon"
    :increment-disabled="context.incrementDisabled"
    :decrement="context.decrement"
    :decrement-icon="context.decrementIcon"
    :decrement-disabled="context.decrementDisabled"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :min="context.min"
    :max="context.max"
    :step="context.step"
    :step-snapping="context.stepSnapping"
    :format-options="context.formatOptions"
    :disable-wheel-change="context.disableWheelChange"
    :invert-wheel-change="context.invertWheelChange"
    :focus-on-change="context.focusOnChange"
    :placeholder="context.placeholder"
    :list="context.list"
    :autocomplete="context.autocomplete"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
