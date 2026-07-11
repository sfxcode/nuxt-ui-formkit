<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { DateValue } from '@internationalized/date'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'
import type { DateValueType } from '../../utils/dateValueConversion'
import { toDateValue, toDateValueOrRangeOrArray, fromDateValueOrRangeOrArray } from '../../utils/dateValueConversion'

type DateLike = DateValue | Date | string

export interface CalendarDateRange {
  start: DateLike
  end: DateLike
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
  /**
   * Shape of the value read from / written to the FormKit form data.
   * `'calendar'` (default) keeps the native `@internationalized/date` `DateValue`.
   * `'date'` converts to/from a JS `Date`. `'iso'` converts to/from an ISO 8601 string.
   */
  valueType?: DateValueType
  /** Timezone used when converting to/from `'date'`/`'iso'`. Defaults to the local timezone. */
  timeZone?: string
  defaultValue?: DateLike | DateLike[] | CalendarDateRange
  minValue?: DateLike
  maxValue?: DateLike
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

const { handleInput, styleClass, color, validSlotNames, ui } = useFormKitInput(props.context)

// `UCalendar` declares no `blur`/`focus` emit at all - `@focusout` (which
// bubbles) plus a relatedTarget-outside-container check is what detects
// "focus left the whole calendar grid," same mechanism as the group
// components in phases 7-8.
const handleContainerBlur = createContainerBlurHandler(props.context)

const conversionOptions = computed(() => ({ timeZone: props.context.timeZone }))

const modelValue = computed({
  get: () => toDateValueOrRangeOrArray(props.context._value, conversionOptions.value),
  set: (value) => {
    props.context.node.input(fromDateValueOrRangeOrArray(value, props.context.valueType ?? 'calendar', props.context.timeZone))
  },
})

const defaultValue = computed(() => toDateValueOrRangeOrArray(props.context.defaultValue, conversionOptions.value))
const minValue = computed(() => toDateValue(props.context.minValue, conversionOptions.value))
const maxValue = computed(() => toDateValue(props.context.maxValue, conversionOptions.value))
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
    :default-value="defaultValue"
    :min-value="minValue"
    :max-value="maxValue"
    :is-date-disabled="context.isDateDisabled"
    :is-date-unavailable="context.isDateUnavailable"
    :ui="ui"
    @update:model-value="handleInput"
    @focusout="handleContainerBlur"
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
