import { expect, it } from 'vitest'
import { durationToMinutes, formattedDuration } from '../src/runtime/utils/durationConverter'

it('durationToMinutes', () => {
  expect(durationToMinutes('2h')).toBe(120)
  expect(durationToMinutes('40m')).toBe(40)
  expect(durationToMinutes('2h20m')).toBe(140)
  expect(durationToMinutes('2:40')).toBe(160)
})

it('formattedDuration', () => {
  expect(formattedDuration('120m')).toBe('2h')
  expect(formattedDuration('40m')).toBe('40m')
  expect(formattedDuration('140m')).toBe('2h 20m')
})

it('handles empty duration string', () => {
  expect(durationToMinutes('')).toBe(0)
})

it('handles hours-only duration', () => {
  expect(durationToMinutes('3h')).toBe(180)
})

it('handles minutes-only duration', () => {
  expect(durationToMinutes('45m')).toBe(45)
})

it('handles colon-separated hours and minutes', () => {
  expect(durationToMinutes('1:30')).toBe(90)
})

it('handles text format hours and minutes', () => {
  expect(durationToMinutes('2h15m')).toBe(135)
})

it('returns original string for invalid input', () => {
  expect(formattedDuration('invalid')).toBe('0')
})

it('formats minutes-only duration', () => {
  expect(formattedDuration('45m')).toBe('45m')
})

it('formats hours-only duration', () => {
  expect(formattedDuration('120m')).toBe('2h')
})

it('formats hours and minutes duration', () => {
  expect(formattedDuration('135M')).toBe('2h 15m')
})

it('handles non-numeric duration values', () => {
  expect(durationToMinutes('h')).toBe(0)
  expect(durationToMinutes('m')).toBe(0)
})
