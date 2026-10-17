/* eslint-disable @typescript-eslint/no-explicit-any -- `any` stands for the unconstrained Props of the FormKit input types */
import type { FormKitExtendableSchemaRoot } from '@formkit/core'
import type { FormKitInputProps, FormKitInputSlots } from '@formkit/inputs'
import { createNode } from '@formkit/core'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { useFormKitEditor } from '../../src/runtime/composables/useFormKitEditor'
import { createNuxtUiFormkitConfig } from '../../src/runtime/formkit/createNuxtUiFormkitConfig'
import { formInputs, formOutputs, nuxtUIInputs, nuxtUIOutputs } from '../../src/runtime/formkit/definitions'
import { renamePrefix } from '../../src/runtime/formkit/definitions/prefix'
import { addNuxtAsteriskPlugin, createAutoAnimatePlugin } from '../../src/runtime/formkit/plugins'

type Definitions = Record<string, unknown>

describe('form prefix aliases', () => {
  it('offers every nuxtUI input under the form prefix, with the same definition', () => {
    const nuxtKeys = Object.keys(nuxtUIInputs)

    expect(Object.keys(formInputs)).toEqual(nuxtKeys.map(key => key.replace(/^nuxtUI/, 'form')))
    for (const key of nuxtKeys)
      expect((formInputs as Definitions)[key.replace(/^nuxtUI/, 'form')]).toBe((nuxtUIInputs as Definitions)[key])
  })

  it('offers every nuxtUI output under the form prefix, with the same definition', () => {
    const nuxtKeys = Object.keys(nuxtUIOutputs)

    expect(Object.keys(formOutputs)).toEqual(nuxtKeys.map(key => key.replace(/^nuxtUI/, 'form')))
    for (const key of nuxtKeys)
      expect((formOutputs as Definitions)[key.replace(/^nuxtUI/, 'form')]).toBe((nuxtUIOutputs as Definitions)[key])
  })

  it('uses the shared names for the inputs that other libraries offer too', () => {
    expect(formInputs.formSelect).toBe(nuxtUIInputs.nuxtUISelect)
    expect(formInputs.formRepeater).toBe(nuxtUIInputs.nuxtUIRepeater)
    expect(formInputs.formMultiStep).toBe(nuxtUIInputs.nuxtUIMultiStep)
    expect(formOutputs.formOutputText).toBe(nuxtUIOutputs.nuxtUIOutputText)
  })

  it('does not overlap with the nuxtUI names and never claims FormKit\'s own `form` type', () => {
    const all = [...Object.keys(nuxtUIInputs), ...Object.keys(nuxtUIOutputs), ...Object.keys(formInputs), ...Object.keys(formOutputs)]

    expect(new Set(all).size).toBe(all.length)
    expect(Object.keys(formInputs)).not.toContain('form')
    expect(Object.keys(formInputs).every(key => /^form[A-Z]/.test(key))).toBe(true)
    expect(Object.keys(formOutputs).every(key => /^formOutput[A-Z]/.test(key))).toBe(true)
  })

  it('keeps the nuxtUI exports as they were', () => {
    expect(Object.keys(nuxtUIInputs).every(key => key.startsWith('nuxtUI'))).toBe(true)
    expect(Object.keys(nuxtUIOutputs).every(key => key.startsWith('nuxtUIOutput'))).toBe(true)
    expect(Object.keys(nuxtUIInputs)).toEqual(expect.arrayContaining(['nuxtUIInput', 'nuxtUISelect', 'nuxtUIRepeater', 'nuxtUIMultiStep', 'nuxtUIStep']))
  })
})

describe('renamePrefix', () => {
  it('re-keys the prefixed entries and leaves the others', () => {
    const definition = {}
    const renamed = renamePrefix({ nuxtUIA: definition, nuxtUIBeta: 1, other: 2 }, 'nuxtUI', 'form')

    expect(renamed).toEqual({ formA: definition, formBeta: 1, other: 2 })
    expect(renamed.formA).toBe(definition)
  })
})

describe('createNuxtUiFormkitConfig with formPrefix', () => {
  const all = { ...nuxtUIInputs, ...nuxtUIOutputs, ...formInputs, ...formOutputs }

  it('registers the form names in addition to the nuxtUI names by default', () => {
    expect(createNuxtUiFormkitConfig().inputs).toEqual(all)
    expect(createNuxtUiFormkitConfig({}).inputs).toEqual(all)
  })

  it('registers them for formPrefix: true as well, and for the other options', () => {
    expect(createNuxtUiFormkitConfig({ formPrefix: true }).inputs).toEqual(all)
    expect(createNuxtUiFormkitConfig({ multiStep: true, plugins: [] }).inputs).toEqual(all)
  })

  it('registers only the nuxtUI names for formPrefix: false', () => {
    const inputs = createNuxtUiFormkitConfig({ formPrefix: false }).inputs

    expect(inputs).toEqual({ ...nuxtUIInputs, ...nuxtUIOutputs })
    expect(Object.keys(inputs ?? {}).some(key => key.startsWith('form'))).toBe(false)
  })

  it('does not change the plugins', () => {
    expect(createNuxtUiFormkitConfig({ formPrefix: false }).plugins).toEqual(createNuxtUiFormkitConfig().plugins)
  })
})

// Node-level, like the asterisk tests in plugins.test.ts.
describe('addNuxtAsteriskPlugin with the form prefix', () => {
  function labelSectionFor(type: string, definition: { family?: string }) {
    let received: Record<string, unknown> | undefined
    const original: FormKitExtendableSchemaRoot = (sections = {}) => {
      received = sections
      return []
    }
    const node = createNode({
      type: 'input',
      props: { type, family: definition.family, definition: { type: 'input', schema: original } },
      plugins: [addNuxtAsteriskPlugin],
    })
    ;(node.props.definition!.schema as FormKitExtendableSchemaRoot)({})
    return received?.label
  }

  it('adds the asterisk to the form input names, as the definition is the same', () => {
    expect(labelSectionFor('formInput', formInputs.formInput)).toBeDefined()
    expect(labelSectionFor('formSelect', formInputs.formSelect)).toBeDefined()
  })

  it('leaves the form output names untouched', () => {
    expect(labelSectionFor('formOutputText', formOutputs.formOutputText)).toBeUndefined()
  })
})

describe('createAutoAnimatePlugin targets', () => {
  function markedFor(type: string, targets: Record<string, string[]>): boolean {
    const node = createNode({
      type: 'input',
      props: {
        type,
        definition: { type: 'input', schema: () => ({ if: '$slots.input', then: '$slots.input', else: { $el: 'div', meta: { section: 'input' }, attrs: {} } }) },
      },
      plugins: [createAutoAnimatePlugin({}, targets)],
    })
    const schema = (node.props.definition!.schema as FormKitExtendableSchemaRoot)({}) as { else: { attrs?: Record<string, unknown> } }
    return schema.else.attrs?.['data-auto-animate'] !== undefined
  }

  it('applies a nuxtUI keyed entry to the nuxtUI and the form name', () => {
    expect(markedFor('nuxtUIRepeater', { nuxtUIRepeater: ['input'] })).toBe(true)
    expect(markedFor('formRepeater', { nuxtUIRepeater: ['input'] })).toBe(true)
  })

  it('applies a form keyed entry to the nuxtUI and the form name', () => {
    expect(markedFor('nuxtUIRepeater', { formRepeater: ['input'] })).toBe(true)
    expect(markedFor('formRepeater', { formRepeater: ['input'] })).toBe(true)
  })

  it('does not apply the entry of another input', () => {
    expect(markedFor('formRepeater', { nuxtUISelect: ['input'] })).toBe(false)
    expect(markedFor('nuxtUIInput', { nuxtUIRepeater: ['input'] })).toBe(false)
  })

  it('does not treat FormKit\'s own form type as an alias', () => {
    expect(markedFor('form', { form: ['input'] })).toBe(true)
    expect(markedFor('form', { nuxtUI: ['input'] })).toBe(false)
  })
})

describe('useFormKitEditor with the form prefix', () => {
  const { editorDataToSchema } = useFormKitEditor()
  const options = [{ label: 'A', value: 'a' }]

  it('treats a form name like its nuxtUI name, and keeps the name it was given', () => {
    const nuxt = editorDataToSchema({ _dollar_formkit: 'nuxtUISelect', name: 'role', options })
    const form = editorDataToSchema({ _dollar_formkit: 'formSelect', name: 'role', options })

    expect(form.$formkit).toBe('formSelect')
    expect(form.options).toEqual(options)
    expect({ ...form, $formkit: nuxt.$formkit }).toEqual(nuxt)
  })

  it('keeps the legend of a group type under the form name', () => {
    const nuxt = editorDataToSchema({ _dollar_formkit: 'nuxtUIRadioGroup', name: 'x', legend: 'L', options })
    const form = editorDataToSchema({ _dollar_formkit: 'formRadioGroup', name: 'x', legend: 'L', options })

    expect({ ...form, $formkit: nuxt.$formkit }).toEqual(nuxt)
  })
})

describe('form prefix types', () => {
  it('declares props and slots for the form names like for the nuxtUI names', () => {
    expectTypeOf<FormKitInputProps<any>['formSelect']['type']>().toEqualTypeOf<'formSelect'>()
    expectTypeOf<FormKitInputProps<any>['nuxtUISelect']['type']>().toEqualTypeOf<'nuxtUISelect'>()
    expectTypeOf<FormKitInputProps<any>['formOutputText']['type']>().toEqualTypeOf<'formOutputText'>()
    expectTypeOf<FormKitInputSlots<any>['formInput']>().toEqualTypeOf<FormKitInputSlots<any>['nuxtUIInput']>()
    expectTypeOf<FormKitInputSlots<any>['formRepeater']>().toEqualTypeOf<FormKitInputSlots<any>['nuxtUIRepeater']>()
  })
})
