<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from '@internationalized/date'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface DateRange {
  start: CalendarDate | CalendarDateTime | ZonedDateTime
  end: CalendarDate | CalendarDateTime | ZonedDateTime
}

export interface FormKitInputDateProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  highlight?: boolean
  fixed?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  range?: boolean
  separatorIcon?: string
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: string
  defaultValue: CalendarDate | CalendarDateTime | ZonedDateTime | DateRange
  placeholder?: CalendarDate | CalendarDateTime | ZonedDateTime
  defaultPlaceholder?: CalendarDate | CalendarDateTime | ZonedDateTime
  hourCycle?: 12 | 24
  step?: Record<string, number>
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hideTimeZone?: boolean
  maxValue?: CalendarDate | CalendarDateTime | ZonedDateTime
  minValue?: CalendarDate | CalendarDateTime | ZonedDateTime
  isDateUnavailable?: (date: DateValue) => boolean
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputDateProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UInputDate
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
    :placeholder="context.placeholder"
    :default-placeholder="context.defaultPlaceholder"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :fixed="context.fixed"
    :separator-icon="context.separatorIcon"
    :range="context.range"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :hour-cycle="context.hourCycle"
    :step="context.step"
    :granularity="context.granularity"
    :hide-time-zone="context.hideTimeZone"
    :max-value="context.maxValue"
    :min-value="context.minValue"
    :is-date-unavailable="context.isDateUnavailable"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
