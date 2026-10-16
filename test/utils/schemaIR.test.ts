import { describe, expect, it } from 'vitest'
import type { SchemaIR } from '../../src/runtime/utils/schemaIR'
import { isRepeaterItem } from '../../src/runtime/utils/schemaIR'

const leaf = (kind: SchemaIR['kind'], extra: Partial<SchemaIR> = {}): SchemaIR => ({ kind, required: true, rules: {}, ...extra })

describe('schemaIR', () => {
  it('admits every shape the inference engines handle today', () => {
    const all: SchemaIR[] = [
      leaf('string', { rules: { format: 'email', minLength: 2, maxLength: 10 } }),
      leaf('number', { required: false, default: 3, rules: { min: 1, max: 9 } }),
      leaf('boolean'),
      leaf('date', { default: null }),
      leaf('unsupported'),
      leaf('array', { element: leaf('string') }),
      leaf('object', { shape: { name: leaf('string') } }),
      leaf('array', { element: leaf('object', { shape: { a: leaf('number') } }) }),
    ]
    expect(all).toHaveLength(8)
  })

  it('treats only an array of shaped objects as a repeater', () => {
    expect(isRepeaterItem(leaf('array', { element: leaf('object', { shape: { a: leaf('string') } }) }))).toBe(true)
    expect(isRepeaterItem(leaf('array', { element: leaf('object') }))).toBe(false)
    expect(isRepeaterItem(leaf('array', { element: leaf('string') }))).toBe(false)
    expect(isRepeaterItem(leaf('array'))).toBe(false)
    expect(isRepeaterItem(leaf('object', { shape: {} }))).toBe(false)
  })
})
