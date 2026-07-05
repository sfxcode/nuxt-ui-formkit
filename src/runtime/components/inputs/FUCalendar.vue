<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { DateValue } from '@internationalized/date'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface CalendarDateRange {
  start: DateValue
  end: DateValue
}

export interface FormKitCalendarProps {
  type?: 'date' | 'month' | 'year'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  range?: boolean
  multiple?: boolean
  weekNumbers?: boolean
  monthControls?: boolean
  yearControls?: boolean
  viewControl?: boolean
  defaultValue?: DateValue | DateValue[] | CalendarDateRange
  minValue?: DateValue
  maxValue?: DateValue
  isDateDisabled?: (date: DateValue) => boolean
  isDateUnavailable?: (date: DateValue) => boolean
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCalendarProps>,
    required: true,
  },
})

const { handleInput, styleClass, color, modelValue, validSlotNames } = useFormKitInput(props.context)
</script>

<template>
  <UCalendar
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :type="context.type ?? 'date'"
    :color="color"
    :variant="context.variant"
    :size="context.size ?? 'md'"
    :range="context.range"
    :multiple="context.multiple"
    :week-numbers="context.weekNumbers"
    :month-controls="context.monthControls"
    :year-controls="context.yearControls"
    :view-control="context.viewControl"
    :default-value="context.defaultValue"
    :min-value="context.minValue"
    :max-value="context.maxValue"
    :is-date-disabled="context.isDateDisabled"
    :is-date-unavailable="context.isDateUnavailable"
    :ui="context.ui"
    @update:model-value="handleInput"
  >
    <template
      v-for="slotName in validSlotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <component
        :is="context?.slots[slotName]"
        v-bind="{ ...context, ...slotProps }"
      />
    </template>
  </UCalendar>
</template>
