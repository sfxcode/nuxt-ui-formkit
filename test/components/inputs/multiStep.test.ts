import { describe, expect, it } from 'vitest'
import { nuxtUIInputs } from '../../../src/runtime/formkit/definitions'
import { nuxtUIMultiStepDefinition, nuxtUIStepDefinition } from '../../../src/runtime/formkit/definitions/multiStep'

describe('nuxtUIStepDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUIStepDefinition.family).toBe('NuxtUIInput')
  })

  it('is a group-type node aliased to the addon\'s "step" type', () => {
    expect(nuxtUIStepDefinition.type).toBe('group')
    expect(nuxtUIStepDefinition.forceTypeProp).toBe('step')
  })

  it('whitelists the expected step props', () => {
    expect(nuxtUIStepDefinition.props).toEqual([
      'beforeStepChange',
      'nextAttrs',
      'nextLabel',
      'previousAttrs',
      'previousLabel',
      'validStepIcon',
      'ui',
      'stepActionsClass',
    ])
  })

  it('is exposed as nuxtUIStep in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUIStep).toBe(nuxtUIStepDefinition)
  })
})

describe('nuxtUIMultiStepDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUIMultiStepDefinition.family).toBe('NuxtUIInput')
  })

  it('is a group-type node aliased to the addon\'s "multi-step" type', () => {
    expect(nuxtUIMultiStepDefinition.type).toBe('group')
    expect(nuxtUIMultiStepDefinition.forceTypeProp).toBe('multi-step')
  })

  it('whitelists the expected multi-step props', () => {
    expect(nuxtUIMultiStepDefinition.props).toEqual([
      'allowIncomplete',
      'tabStyle',
      'hideProgressLabels',
      'validStepIcon',
      'beforeStepChange',
      'ui',
    ])
  })

  it('is exposed as nuxtUIMultiStep in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUIMultiStep).toBe(nuxtUIMultiStepDefinition)
  })
})
