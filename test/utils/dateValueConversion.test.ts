import { describe, expect, it } from 'vitest'
import { CalendarDate, CalendarDateTime, ZonedDateTime, parseAbsolute } from '@internationalized/date'
import { fromDateValue, fromDateValueOrRange, fromDateValueOrRangeOrArray, toDateValue, toDateValueOrRange, toDateValueOrRangeOrArray } from '../../src/runtime/utils/dateValueConversion'

describe('toDateValue', () => {
  it('returns undefined for null, undefined, and empty string', () => {
    expect(toDateValue(undefined)).toBeUndefined()
    expect(toDateValue(null)).toBeUndefined()
    expect(toDateValue('')).toBeUndefined()
  })

  it('returns undefined for unsupported value types', () => {
    expect(toDateValue(42)).toBeUndefined()
    expect(toDateValue({})).toBeUndefined()
  })

  it('passes an existing DateValue through unchanged', () => {
    const value = new CalendarDate(2026, 7, 5)
    expect(toDateValue(value)).toBe(value)
  })

  it('converts a JS Date to a CalendarDate when granularity is day (default)', () => {
    const date = new Date(Date.UTC(2026, 6, 5, 12, 0, 0))
    expect(toDateValue(date, { timeZone: 'UTC' })).toEqual(new CalendarDate(2026, 7, 5))
  })

  it('converts a JS Date to a ZonedDateTime when granularity includes time', () => {
    const date = new Date(Date.UTC(2026, 6, 5, 14, 30, 0))
    const result = toDateValue(date, { granularity: 'minute', timeZone: 'UTC' })
    expect(result).toBeInstanceOf(ZonedDateTime)
    expect(result?.toString()).toBe('2026-07-05T14:30:00+00:00[UTC]')
  })

  it('converts a JS Date to a CalendarDateTime when granularity includes time and hideTimeZone is set', () => {
    const date = new Date(Date.UTC(2026, 6, 5, 14, 30, 0))
    const result = toDateValue(date, { granularity: 'minute', hideTimeZone: true, timeZone: 'UTC' })
    expect(result).toBeInstanceOf(CalendarDateTime)
    expect(result?.toString()).toBe('2026-07-05T14:30:00')
  })

  it('defaults to the local timezone when none is provided', () => {
    const date = new Date(2026, 6, 5, 12, 0, 0)
    expect(toDateValue(date)).toEqual(new CalendarDate(2026, 7, 5))
  })

  it('parses a date-only ISO string into a CalendarDate', () => {
    expect(toDateValue('2026-07-05')).toEqual(new CalendarDate(2026, 7, 5))
  })

  it('parses a zone-less ISO datetime string into a CalendarDateTime when granularity includes time', () => {
    const result = toDateValue('2026-07-05T10:30:00', { granularity: 'minute' })
    expect(result).toBeInstanceOf(CalendarDateTime)
    expect(result?.toString()).toBe('2026-07-05T10:30:00')
  })

  it('parses a zoned ISO string down to a calendar day when granularity is day', () => {
    expect(toDateValue('2026-07-05T23:00:00.000Z', { timeZone: 'UTC' })).toEqual(new CalendarDate(2026, 7, 5))
  })

  it('parses a zoned ISO string into a ZonedDateTime when granularity includes time', () => {
    const result = toDateValue('2026-07-05T23:00:00.000Z', { granularity: 'minute', timeZone: 'UTC' })
    expect(result).toBeInstanceOf(ZonedDateTime)
  })
})

describe('toDateValueOrRange', () => {
  it('converts both ends of a { start, end } range', () => {
    expect(toDateValueOrRange({ start: '2026-07-01', end: '2026-07-10' })).toEqual({
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 10),
    })
  })

  it('falls through to a single-value conversion when the value is not range-like', () => {
    expect(toDateValueOrRange('2026-07-05')).toEqual(new CalendarDate(2026, 7, 5))
  })
})

describe('toDateValueOrRangeOrArray', () => {
  it('converts each entry of an array (multiple-selection mode)', () => {
    expect(toDateValueOrRangeOrArray(['2026-07-01', '2026-07-10'])).toEqual([
      new CalendarDate(2026, 7, 1),
      new CalendarDate(2026, 7, 10),
    ])
  })

  it('drops array entries that fail to convert', () => {
    expect(toDateValueOrRangeOrArray(['2026-07-01', null, ''])).toEqual([new CalendarDate(2026, 7, 1)])
  })

  it('still handles the { start, end } range shape', () => {
    expect(toDateValueOrRangeOrArray({ start: '2026-07-01', end: '2026-07-10' })).toEqual({
      start: new CalendarDate(2026, 7, 1),
      end: new CalendarDate(2026, 7, 10),
    })
  })

  it('still falls through to a single-value conversion', () => {
    expect(toDateValueOrRangeOrArray('2026-07-05')).toEqual(new CalendarDate(2026, 7, 5))
  })
})

describe('fromDateValue', () => {
  it('returns undefined for null and undefined', () => {
    expect(fromDateValue(undefined, 'date')).toBeUndefined()
  })

  it('returns the DateValue unchanged for valueType "calendar"', () => {
    const value = new CalendarDate(2026, 7, 5)
    expect(fromDateValue(value, 'calendar')).toBe(value)
  })

  it('converts a CalendarDate to a JS Date using the given timezone', () => {
    const result = fromDateValue(new CalendarDate(2026, 7, 5), 'date', 'UTC')
    expect(result).toBeInstanceOf(Date)
    expect((result as Date).toISOString()).toBe('2026-07-05T00:00:00.000Z')
  })

  it('converts a ZonedDateTime to a JS Date using its own embedded zone, ignoring the timeZone argument', () => {
    const value = parseAbsolute('2026-07-05T10:00:00.000Z', 'UTC')
    const result = fromDateValue(value, 'date', 'America/New_York')
    expect((result as Date).toISOString()).toBe('2026-07-05T10:00:00.000Z')
  })

  it('converts a CalendarDate to an ISO date-only string', () => {
    expect(fromDateValue(new CalendarDate(2026, 7, 5), 'iso')).toBe('2026-07-05')
  })

  it('converts a ZonedDateTime to its full ISO offset string', () => {
    const value = parseAbsolute('2026-07-05T10:00:00.000Z', 'UTC')
    expect(fromDateValue(value, 'iso')).toBe(value.toString())
  })
})

describe('fromDateValueOrRange', () => {
  it('converts both ends of a { start, end } range', () => {
    const result = fromDateValueOrRange(
      { start: new CalendarDate(2026, 7, 1), end: new CalendarDate(2026, 7, 10) },
      'iso',
    )
    expect(result).toEqual({ start: '2026-07-01', end: '2026-07-10' })
  })

  it('falls through to a single-value conversion when the value is not range-like', () => {
    expect(fromDateValueOrRange(new CalendarDate(2026, 7, 5), 'iso')).toBe('2026-07-05')
  })
})

describe('fromDateValueOrRangeOrArray', () => {
  it('converts each entry of an array (multiple-selection mode)', () => {
    const result = fromDateValueOrRangeOrArray([new CalendarDate(2026, 7, 1), new CalendarDate(2026, 7, 10)], 'iso')
    expect(result).toEqual(['2026-07-01', '2026-07-10'])
  })

  it('still handles the { start, end } range shape', () => {
    const result = fromDateValueOrRangeOrArray(
      { start: new CalendarDate(2026, 7, 1), end: new CalendarDate(2026, 7, 10) },
      'iso',
    )
    expect(result).toEqual({ start: '2026-07-01', end: '2026-07-10' })
  })

  it('still falls through to a single-value conversion', () => {
    expect(fromDateValueOrRangeOrArray(new CalendarDate(2026, 7, 5), 'iso')).toBe('2026-07-05')
  })
})

describe('round-trip conversions', () => {
  it('preserves the calendar day going Date -> DateValue -> Date', () => {
    const original = new Date(Date.UTC(2026, 6, 5, 0, 0, 0))
    const asDateValue = toDateValue(original, { timeZone: 'UTC' })
    const back = fromDateValue(asDateValue, 'date', 'UTC')
    expect((back as Date).toISOString()).toBe(original.toISOString())
  })

  it('preserves a date-only ISO string going string -> DateValue -> string', () => {
    const original = '2026-07-05'
    const back = fromDateValue(toDateValue(original), 'iso')
    expect(back).toBe(original)
  })
})
