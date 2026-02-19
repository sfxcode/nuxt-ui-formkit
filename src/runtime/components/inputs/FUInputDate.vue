<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { DateValue } from '@internationalized/date'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitInputDateProps {
  autofocus?: boolean
  autofocusDelay?: number
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  defaultPlaceholder?: DateValue
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hideTimeZone?: boolean
  hourCycle?: 12 | 24
  icon?: string
  inputClass?: string
  isDateUnavailable?: (date: DateValue) => boolean
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  maxValue?: DateValue
  minValue?: DateValue
  padded?: boolean
  placeholder?: DateValue
  range?: boolean
  readonly?: boolean
  separatorIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  step?: Record<string, number>
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputDateProps>,
    required: true,
  },
})

const modelValue = computed({
  get: () => props.context._value,
  set: (value) => {
    props.context.node.input(value)
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color } = useFormKitInput(props.context)
</script>

<template>
  <UInputDate
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :class="styleClass"
    :color="color as any"
    :default-placeholder="context.defaultPlaceholder"
    :disabled="!!context?.disabled"
    :granularity="context.granularity"
    :hide-time-zone="context.hideTimeZone"
    :highlight="!!(isInvalid || context.highlight)"
    :hour-cycle="context.hourCycle"
    :icon="context.icon"
    :is-date-unavailable="context.isDateUnavailable"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :max-value="context.maxValue"
    :min-value="context.minValue"
    :placeholder="context.placeholder"
    :range="context.range"
    :readonly="context.readonly ?? context?.attrs.readonly ?? false"
    :separator-icon="context.separatorIcon"
    :size="context.size ?? 'md'"
    :step="context.step"
    :style="context?.attrs.style"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
