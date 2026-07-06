import { describe, expect, it } from 'vitest'
import { createNuxtUiFormkitConfig } from '../../src/runtime/formkit/createNuxtUiFormkitConfig'
import { nuxtUIInputs, nuxtUIOutputs } from '../../src/runtime/formkit/definitions'
import { addNuxtAsteriskPlugin } from '../../src/runtime/formkit/plugins'

describe('createNuxtUiFormkitConfig', () => {
  it('always includes every nuxtUI input and output, plus the asterisk plugin', () => {
    const config = createNuxtUiFormkitConfig()

    expect(config.inputs).toEqual({ ...nuxtUIInputs, ...nuxtUIOutputs })
    expect(config.plugins).toContain(addNuxtAsteriskPlugin)
  })

  it('registers nuxtUIStep/nuxtUIMultiStep unconditionally (they are inert without the plugin)', () => {
    const config = createNuxtUiFormkitConfig()

    expect(config.inputs).toHaveProperty('nuxtUIStep')
    expect(config.inputs).toHaveProperty('nuxtUIMultiStep')
  })

  it('does not register the multi-step plugin by default', () => {
    const config = createNuxtUiFormkitConfig()

    expect(config.plugins).toHaveLength(1)
  })

  it('registers the multi-step plugin when { multiStep: true } is passed, alongside the asterisk plugin', () => {
    const config = createNuxtUiFormkitConfig({ multiStep: true })

    expect(config.plugins).toHaveLength(2)
    expect(config.plugins).toContain(addNuxtAsteriskPlugin)
  })
})
