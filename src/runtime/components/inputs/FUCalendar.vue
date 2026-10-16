<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { DateValue } from '@internationalized/date'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { today } from '@internationalized/date'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'
import { useHydrationSafeTimeZone } from '../../utils/useHydrationSafeTimeZone'
import type { DateValueType } from '../../utils/dateValueConversion'
import { toDateValue, toDateValueOrRangeOrArray, fromDateValueOrRangeOrArray } from '../../utils/dateValueConversion'

type DateLike = DateValue | Date | string

export interface CalendarDateRange {
  start: DateLike
  end: DateLike
}

export interface FormKitCalendarProps {
  calendarType?: 'date' | 'month' | 'year'
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

const { styleClass, validSlotNames, commonProps } = useFormKitInput(props.context)

// `UCalendar` declares no `blur`/`focus` emit at all - `@focusout` (which
// bubbles) plus a relatedTarget-outside-container check is what detects
// "focus left the whole calendar grid," same mechanism as the group
// components in phases 7-8.
const handleContainerBlur = createContainerBlurHandler(props.context)

// The zone values are converted in: the field's own `timeZone`, else one that is the same for
// the server render and hydration and the browser's own once mounted (see the composable).
const timeZone = useHydrationSafeTimeZone(() => props.context.timeZone)

const conversionOptions = computed(() => ({ timeZone: timeZone.value }))

const modelValue = computed({
  get: () => toDateValueOrRangeOrArray(props.context._value, conversionOptions.value),
  set: (value) => {
    props.context.node.input(fromDateValueOrRangeOrArray(value, props.context.valueType ?? 'calendar', timeZone.value))
  },
})

const defaultValue = computed(() => toDateValueOrRangeOrArray(props.context.defaultValue, conversionOptions.value))
// Without a value, Nuxt UI centres the calendar (and makes one day focusable) on the browser's
// `today()`, which on the server is the server's: a different focusable cell is a hydration
// mismatch. So with nothing to centre on, hand it `today` in the hydration zone instead.
const hasValue = computed(() => {
  const value = modelValue.value as unknown
  if (value === undefined || value === null)
    return false
  if (Array.isArray(value))
    return value.length > 0
  if (typeof value === 'object' && 'start' in value && 'end' in value)
    return Boolean(value.start || value.end)
  return true
})
// Decided once, here, and not re-decided when the value changes: a placeholder that appeared
// whenever the value was cleared would be a new prop for Nuxt UI, which recentres on it - the view
// would jump away from the month the user was looking at.
const centreOnToday = !hasValue.value && !defaultValue.value
const placeholder = computed(() => {
  // `placeholder` is not a declared prop of this field, so a consumer's own arrives in the attrs
  // (spread onto UCalendar before this binding) and must not be overridden.
  const explicit = props.context.attrs?.placeholder as DateValue | undefined
  if (explicit !== undefined)
    return explicit
  return centreOnToday ? today(timeZone.value) : undefined
})
const minValue = computed(() => toDateValue(props.context.minValue, conversionOptions.value))
const maxValue = computed(() => toDateValue(props.context.maxValue, conversionOptions.value))
</script>

<template>
  <UCalendar
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs, ...commonProps }"
    :class="styleClass"
    :type="context.calendarType ?? 'date'"
    :variant="context.variant"
    :range="context.range"
    :multiple="context.multiple"
    :week-numbers="context.weekNumbers"
    :month-controls="context.monthControls"
    :year-controls="context.yearControls"
    :view-control="context.viewControl"
    :default-value="defaultValue"
    :placeholder="placeholder"
    :min-value="minValue"
    :max-value="maxValue"
    :is-date-disabled="context.isDateDisabled"
    :is-date-unavailable="context.isDateUnavailable"
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
