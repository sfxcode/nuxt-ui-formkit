import { describe, expect, it } from 'vitest'
import { createNuxtUiFormkitConfig } from '../../src/runtime/formkit/createNuxtUiFormkitConfig'
import { formInputs, formOutputs, nuxtUIInputs, nuxtUIOutputs } from '../../src/runtime/formkit/definitions'
import { addNuxtAsteriskPlugin } from '../../src/runtime/formkit/plugins'

describe('createNuxtUiFormkitConfig', () => {
  it('always includes every nuxtUI input and output (and their form names), plus the asterisk plugin', () => {
    const config = createNuxtUiFormkitConfig()

    expect(config.inputs).toEqual({ ...nuxtUIInputs, ...nuxtUIOutputs, ...formInputs, ...formOutputs })
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

  it('appends consumer plugins after the module\'s own, so the asterisk plugin is not lost', () => {
    const custom = () => {}
    const config = createNuxtUiFormkitConfig({ plugins: [custom] })

    expect(config.plugins).toEqual([addNuxtAsteriskPlugin, custom])
  })

  it('keeps module plugins first when combining multiStep with consumer plugins', () => {
    const a = () => {}
    const b = () => {}
    const config = createNuxtUiFormkitConfig({ multiStep: true, plugins: [a, b] })

    expect(config.plugins).toHaveLength(4)
    expect(config.plugins![0]).toBe(addNuxtAsteriskPlugin)
    expect(config.plugins!.slice(-2)).toEqual([a, b])
  })

  it('does not mutate the consumer\'s plugins array', () => {
    const plugins = [() => {}]
    createNuxtUiFormkitConfig({ multiStep: true, plugins })

    expect(plugins).toHaveLength(1)
  })
})
