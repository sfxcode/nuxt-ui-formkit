import { describe, expect, it } from 'vitest'
import type { SchemaIR } from '../../src/runtime/utils/schemaIR'
import { blankItemFromIR, blankValueFromIR, buildGroupNode, buildRepeaterNode, nodeFromIR, REPEATER_BUTTON_DEFAULTS, validationFromIR } from '../../src/runtime/utils/schemaInference'

const ir = (kind: SchemaIR['kind'], extra: Partial<SchemaIR> = {}): SchemaIR => ({ kind, required: true, rules: {}, ...extra })
const noChildren = () => []

describe('validationFromIR', () => {
  it('is required for a required non-boolean, and nothing for optional or boolean', () => {
    expect(validationFromIR(ir('string'))).toBe('required')
    expect(validationFromIR(ir('string', { required: false }))).toBeUndefined()
    expect(validationFromIR(ir('boolean'))).toBeUndefined()
  })

  it('emits rules in a fixed order with length last', () => {
    expect(validationFromIR(ir('string', { rules: { format: 'email' } }))).toBe('required|email')
    expect(validationFromIR(ir('number', { rules: { max: 99, min: 18 } }))).toBe('required|min:18|max:99')
    expect(validationFromIR(ir('string', { rules: { minLength: 2, format: 'url' } }))).toBe('required|url|length:2')
  })

  it('assembles length from either or both bounds', () => {
    expect(validationFromIR(ir('string', { rules: { minLength: 2, maxLength: 10 } }))).toBe('required|length:2,10')
    expect(validationFromIR(ir('string', { rules: { minLength: 3 } }))).toBe('required|length:3')
    expect(validationFromIR(ir('string', { rules: { maxLength: 5 } }))).toBe('required|length:0,5')
  })

  it('keeps a zero bound', () => {
    expect(validationFromIR(ir('number', { required: false, rules: { min: 0 } }))).toBe('min:0')
  })
})

describe('blankValueFromIR', () => {
  it('blanks each kind', () => {
    expect(blankValueFromIR(ir('string'))).toBe('')
    expect(blankValueFromIR(ir('number'))).toBe(0)
    expect(blankValueFromIR(ir('boolean'))).toBe(false)
    expect(blankValueFromIR(ir('array'))).toEqual([])
    expect(blankValueFromIR(ir('date'))).toBeNull()
    expect(blankValueFromIR(ir('unsupported'))).toBeNull()
  })

  it('prefers a default, including a falsy one', () => {
    expect(blankValueFromIR(ir('string', { default: 'new' }))).toBe('new')
    expect(blankValueFromIR(ir('number', { default: 0 }))).toBe(0)
    expect(blankValueFromIR(ir('date', { default: null }))).toBeNull()
  })

  it('blanks an object from its shape, or to {} without one', () => {
    expect(blankValueFromIR(ir('object', { shape: { city: ir('string'), zip: ir('number', { default: 9 }) } }))).toEqual({ city: '', zip: 9 })
    expect(blankValueFromIR(ir('object'))).toEqual({})
    expect(blankItemFromIR({ a: ir('boolean') })).toEqual({ a: false })
  })
})

describe('nodeFromIR', () => {
  const node = (kind: SchemaIR['kind'], extra: Partial<SchemaIR> = {}) => nodeFromIR('first_name', 'First Name', ir(kind, extra), noChildren)

  it('maps scalar kinds to inputs', () => {
    expect(node('string')).toEqual({ $formkit: 'nuxtUIInput', name: 'first_name', label: 'First Name', validation: 'required' })
    expect(node('number', { required: false })).toEqual({ $formkit: 'nuxtUIInputNumber', name: 'first_name', label: 'First Name' })
    expect(node('boolean')).toEqual({ $formkit: 'nuxtUISwitch', name: 'first_name', label: 'First Name' })
    expect(node('date', { required: false })).toEqual({ $formkit: 'nuxtUIInputDate', name: 'first_name', label: 'First Name', valueType: 'date' })
  })

  it('keeps the key order $formkit, name, label, validation', () => {
    expect(Object.keys(node('string')!)).toEqual(['$formkit', 'name', 'label', 'validation'])
  })

  it('returns undefined for unsupported', () => {
    expect(node('unsupported')).toBeUndefined()
  })

  it('decides repeater vs tags by the element kind', () => {
    const row = ir('object', { shape: { x: ir('string'), y: ir('number', { default: 4 }) } })
    const seen: string[][] = []
    const repeater = nodeFromIR('rows', 'Rows', ir('array', { element: row }), (shape) => {
      seen.push(Object.keys(shape))
      return [{ name: 'child' }]
    })
    expect(repeater).toEqual({
      $formkit: 'nuxtUIRepeater',
      name: 'rows',
      label: 'Rows',
      validation: 'required',
      newItem: { x: '', y: 4 },
      children: [{ name: 'child' }],
      ...REPEATER_BUTTON_DEFAULTS,
    })
    expect(seen).toEqual([['x', 'y']])
    for (const element of [ir('string'), ir('object'), undefined]) {
      expect(node('array', { element })).toMatchObject({ $formkit: 'nuxtUIInputTags' })
    }
  })

  it('builds a group without label or validation, and undefined without a shape', () => {
    const group = nodeFromIR('address', 'Address', ir('object', { shape: { city: ir('string') } }), () => [{ name: 'city' }])
    expect(group).toEqual({ $formkit: 'group', name: 'address', children: [{ name: 'city' }] })
    expect(node('object')).toBeUndefined()
  })
})

describe('node builders', () => {
  it('builds a repeater with base first and the button defaults last', () => {
    const repeater = buildRepeaterNode({ name: 'a', label: 'A' }, { x: '' }, [])
    expect(Object.keys(repeater)).toEqual(['$formkit', 'name', 'label', 'newItem', 'children', 'displayCloneButton', 'displayDeleteButton', 'buttonGroupClass'])
  })

  it('builds a group', () => {
    expect(buildGroupNode('g', [])).toEqual({ $formkit: 'group', name: 'g', children: [] })
  })
})
