import { describe, expect, it } from 'vitest'
import { nuxtUICalendarDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIInputs } from '../../../src/runtime/formkit/definitions'

describe('nuxtUICalendarDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUICalendarDefinition.family).toBe('NuxtUIInput')
  })

  it('whitelists the expected UCalendar props', () => {
    expect(nuxtUICalendarDefinition.props).toEqual([
      'type',
      'range',
      'multiple',
      'color',
      'variant',
      'size',
      'weekNumbers',
      'monthControls',
      'yearControls',
      'viewControl',
      'defaultValue',
      'minValue',
      'maxValue',
      'isDateDisabled',
      'isDateUnavailable',
      'ui',
      'valueType',
      'timeZone',
    ])
  })

  it('is exposed as nuxtUICalendar in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUICalendar).toBe(nuxtUICalendarDefinition)
  })
})
