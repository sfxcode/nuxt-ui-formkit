import type { DateValue } from '@internationalized/date'
import { CalendarDate, CalendarDateTime, ZonedDateTime, fromDate, getLocalTimeZone, parseAbsolute, parseDate, parseDateTime, toCalendarDate, toCalendarDateTime } from '@internationalized/date'

export type DateValueType = 'calendar' | 'date' | 'iso'

export interface DateConversionOptions {
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hideTimeZone?: boolean
  timeZone?: string
}

const ISO_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/
const ISO_HAS_ZONE = /(?:Z|[+-]\d{2}:\d{2})(?:\[[^\]]+\])?$/

function isDateValue(value: unknown): value is DateValue {
  return value instanceof CalendarDate || value instanceof CalendarDateTime || value instanceof ZonedDateTime
}

function isRangeLike(value: unknown): value is { start: unknown, end: unknown } {
  return typeof value === 'object' && value !== null && 'start' in value && 'end' in value
}

/**
 * Converts an external value (JS `Date`, ISO 8601 string, or an already-native
 * `DateValue`) into the `DateValue` that `UInputDate`/`UCalendar` require.
 */
export function toDateValue(value: unknown, options: DateConversionOptions = {}): DateValue | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }
  if (isDateValue(value)) {
    return value
  }

  const timeZone = options.timeZone ?? getLocalTimeZone()
  const withTime = options.granularity != null && options.granularity !== 'day'

  if (value instanceof Date) {
    const zoned = fromDate(value, timeZone)
    if (!withTime) {
      return toCalendarDate(zoned)
    }
    return options.hideTimeZone ? toCalendarDateTime(zoned) : zoned
  }

  if (typeof value === 'string') {
    if (!withTime && ISO_DATE_ONLY.test(value)) {
      return parseDate(value)
    }
    if (withTime && !ISO_HAS_ZONE.test(value)) {
      return parseDateTime(value)
    }
    const zoned = parseAbsolute(value, timeZone)
    return withTime ? (options.hideTimeZone ? toCalendarDateTime(zoned) : zoned) : toCalendarDate(zoned)
  }

  return undefined
}

/** Same as {@link toDateValue}, but also handles the `{ start, end }` range shape. */
export function toDateValueOrRange(value: unknown, options: DateConversionOptions = {}) {
  if (isRangeLike(value)) {
    return {
      start: toDateValue(value.start, options),
      end: toDateValue(value.end, options),
    }
  }
  return toDateValue(value, options)
}

/** Same as {@link toDateValueOrRange}, but also handles arrays (multiple-selection mode). */
export function toDateValueOrRangeOrArray(value: unknown, options: DateConversionOptions = {}) {
  if (Array.isArray(value)) {
    return value
      .map(item => toDateValue(item, options))
      .filter((item): item is DateValue => item !== undefined)
  }
  return toDateValueOrRange(value, options)
}

/** Converts a `DateValue` emitted by `UInputDate`/`UCalendar` back into the shape the form value should take. */
export function fromDateValue(value: DateValue | undefined, valueType: DateValueType, timeZone?: string): DateValue | Date | string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }
  if (valueType === 'calendar') {
    return value
  }

  const jsDate = value instanceof ZonedDateTime ? value.toDate() : value.toDate(timeZone ?? getLocalTimeZone())
  if (valueType === 'date') {
    return jsDate
  }
  return value.toString()
}

/** Same as {@link fromDateValue}, but also handles the `{ start, end }` range shape. */
export function fromDateValueOrRange(value: unknown, valueType: DateValueType, timeZone?: string) {
  if (isRangeLike(value)) {
    return {
      start: fromDateValue(value.start as DateValue | undefined, valueType, timeZone),
      end: fromDateValue(value.end as DateValue | undefined, valueType, timeZone),
    }
  }
  return fromDateValue(value as DateValue | undefined, valueType, timeZone)
}

/** Same as {@link fromDateValueOrRange}, but also handles arrays (multiple-selection mode). */
export function fromDateValueOrRangeOrArray(value: unknown, valueType: DateValueType, timeZone?: string) {
  if (Array.isArray(value)) {
    return value.map(item => fromDateValue(item as DateValue | undefined, valueType, timeZone))
  }
  return fromDateValueOrRange(value, valueType, timeZone)
}
