import { describe, expect, it } from 'vitest'
import { nuxtUIInputDateDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIInputs } from '../../../src/runtime/formkit/definitions'

describe('nuxtUIInputDateDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUIInputDateDefinition.family).toBe('NuxtUIInput')
  })

  it('whitelists the expected UInputDate props, including valueType and timeZone', () => {
    expect(nuxtUIInputDateDefinition.props).toEqual([
      'defaultValue',
      'color',
      'variant',
      'size',
      'highlight',
      'fixed',
      'autofocus',
      'autofocusDelay',
      'range',
      'separatorIcon',
      'icon',
      'avatar',
      'leading',
      'leadingIcon',
      'trailing',
      'trailingIcon',
      'loading',
      'loadingIcon',
      'placeholder',
      'defaultPlaceholder',
      'hourCycle',
      'step',
      'granularity',
      'hideTimeZone',
      'maxValue',
      'minValue',
      'isDateUnavailable',
      'ui',
      'valueType',
      'timeZone',
    ])
  })

  it('is exposed as nuxtUIInputDate in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUIInputDate).toBe(nuxtUIInputDateDefinition)
  })
})
