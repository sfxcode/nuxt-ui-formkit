<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from '@internationalized/date'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'
import type { DateValueType } from '../../utils/dateValueConversion'
import { fromDateValueOrRange, toDateValue, toDateValueOrRange } from '../../utils/dateValueConversion'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface DateRange {
  start: CalendarDate | CalendarDateTime | ZonedDateTime
  end: CalendarDate | CalendarDateTime | ZonedDateTime
}

type DateLike = CalendarDate | CalendarDateTime | ZonedDateTime | Date | string

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
  /**
   * Shape of the value read from / written to the FormKit form data.
   * `'calendar'` (default) keeps the native `@internationalized/date` `DateValue`.
   * `'date'` converts to/from a JS `Date`. `'iso'` converts to/from an ISO 8601 string.
   */
  valueType?: DateValueType
  /** Timezone used when converting to/from `'date'`/`'iso'`. Defaults to the local timezone. */
  timeZone?: string
  defaultValue: DateLike | { start: DateLike, end: DateLike }
  placeholder?: DateLike
  defaultPlaceholder?: DateLike
  hourCycle?: 12 | 24
  step?: Record<string, number>
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hideTimeZone?: boolean
  maxValue?: DateLike
  minValue?: DateLike
  isDateUnavailable?: (date: DateValue) => boolean
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputDateProps>,
    required: true,
  },
})

const { handleInput, handleChange, handleBlur, isInvalid, styleClass, color, validSlotNames, ui } = useFormKitInput(props.context)

// `UInputDate`'s own `@blur` never fires from real segment interaction -
// its internal `DateField.Root` binding assumes Reka UI aggregates blur
// across day/month/year segments, but it doesn't (confirmed empirically:
// `DateField.Root` never declares `blur` as its own emit, so that binding
// is a native fallthrough on a div that's never itself focused).
// `@focusout` (which bubbles, unlike `blur`) on the outer component plus a
// relatedTarget-outside check is what actually detects "focus left the
// whole date field."
const handleContainerBlur = createContainerBlurHandler(props.context)

const conversionOptions = computed(() => ({
  granularity: props.context.granularity,
  hideTimeZone: props.context.hideTimeZone,
  timeZone: props.context.timeZone,
}))

const modelValue = computed({
  get: () => toDateValueOrRange(props.context._value, conversionOptions.value),
  set: (value) => {
    props.context.node.input(fromDateValueOrRange(value, props.context.valueType ?? 'calendar', props.context.timeZone))
  },
})

const defaultValue = computed(() => toDateValueOrRange(props.context.defaultValue, conversionOptions.value))
const placeholder = computed(() => toDateValue(props.context.placeholder, conversionOptions.value))
const defaultPlaceholder = computed(() => toDateValue(props.context.defaultPlaceholder, conversionOptions.value))
const maxValue = computed(() => toDateValue(props.context.maxValue, conversionOptions.value))
const minValue = computed(() => toDateValue(props.context.minValue, conversionOptions.value))
</script>

<template>
  <UInputDate
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :default-value="defaultValue"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :placeholder="placeholder"
    :default-placeholder="defaultPlaceholder"
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
    :max-value="maxValue"
    :min-value="minValue"
    :is-date-unavailable="context.isDateUnavailable"
    :ui="ui"
    @change="handleChange"
    @update:model-value="handleInput"
    @blur="handleBlur"
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
  </UInputDate>
</template>
