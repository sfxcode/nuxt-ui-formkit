import { describe, expect, it } from 'vitest'
import * as v from 'valibot'
import type { ValibotLikeSchema } from '../../src/runtime/composables/useFormKitAutoForm'
import { valibotToIR } from '../../src/runtime/utils/valibotAdapter'

const toIR = (schema: unknown) => valibotToIR(schema as ValibotLikeSchema)

describe('valibotToIR kinds', () => {
  it('maps the supported types', () => {
    expect(toIR(v.string())).toEqual({ kind: 'string', required: true, rules: {} })
    expect(toIR(v.number()).kind).toBe('number')
    expect(toIR(v.boolean()).kind).toBe('boolean')
    expect(toIR(v.date()).kind).toBe('date')
  })

  it('maps everything else to unsupported', () => {
    for (const schema of [v.picklist(['a']), v.union([v.string(), v.number()]), v.record(v.string(), v.string()), v.lazy(() => v.string())]) {
      expect(toIR(schema).kind).toBe('unsupported')
    }
  })

  it('reads object entries into a shape, keeping order and unsupported entries', () => {
    const ir = toIR(v.object({ b: v.string(), a: v.picklist(['x']) }))
    expect(ir.kind).toBe('object')
    expect(Object.keys(ir.shape!)).toEqual(['b', 'a'])
    expect(ir.shape!.a!.kind).toBe('unsupported')
  })

  it('reads the array item as the element, unwrapping nothing beyond its own wrapper', () => {
    const ir = toIR(v.array(v.optional(v.object({ x: v.string() }))))
    expect(ir.kind).toBe('array')
    expect(ir.element).toMatchObject({ kind: 'object', required: false })
    expect(ir.element!.shape!.x!.kind).toBe('string')
  })

  it('leaves shape and element off when the schema has none', () => {
    expect(toIR({ kind: 'schema', type: 'object' }).shape).toBeUndefined()
    expect(toIR({ kind: 'schema', type: 'array' }).element).toBeUndefined()
  })
})

describe('valibotToIR wrappers and defaults', () => {
  it('marks every wrapper kind, nested or not, as not required', () => {
    for (const schema of [v.optional(v.string()), v.nullable(v.string()), v.nullish(v.string()), v.exactOptional(v.string()), v.optional(v.nullable(v.string()))]) {
      expect(toIR(schema)).toMatchObject({ kind: 'string', required: false })
    }
  })

  it('reads the default from the outermost wrapper only', () => {
    expect(toIR(v.optional(v.string(), 'x')).default).toBe('x')
    expect(toIR(v.nullish(v.number(), 7)).default).toBe(7)
    expect(toIR(v.nullable(v.optional(v.string(), 'inner'))).default).toBeUndefined()
    expect(toIR(v.optional(v.nullable(v.string()), 'outer')).default).toBe('outer')
  })

  it('keeps a falsy default', () => {
    expect(toIR(v.optional(v.number(), 0)).default).toBe(0)
    expect('default' in toIR(v.string())).toBe(false)
  })
})

describe('valibotToIR rules', () => {
  it('reads format, length and value rules from the pipe', () => {
    expect(toIR(v.pipe(v.string(), v.email())).rules).toEqual({ format: 'email' })
    expect(toIR(v.pipe(v.string(), v.url())).rules).toEqual({ format: 'url' })
    expect(toIR(v.pipe(v.string(), v.minLength(2), v.maxLength(10))).rules).toEqual({ minLength: 2, maxLength: 10 })
    expect(toIR(v.pipe(v.number(), v.minValue(18), v.maxValue(99))).rules).toEqual({ min: 18, max: 99 })
  })

  it('reads rules through a wrapper and from an array pipe', () => {
    expect(toIR(v.optional(v.pipe(v.string(), v.url()))).rules).toEqual({ format: 'url' })
    expect(toIR(v.pipe(v.array(v.string()), v.minLength(1), v.maxLength(3))).rules).toEqual({ minLength: 1, maxLength: 3 })
  })

  it('ignores non-validation pipe entries', () => {
    expect(toIR(v.pipe(v.string(), v.trim(), v.minLength(2))).rules).toEqual({ minLength: 2 })
  })

  it('keeps the last length bound and the tightest value bound', () => {
    expect(toIR(v.pipe(v.string(), v.minLength(2), v.minLength(5), v.maxLength(9), v.maxLength(8))).rules).toEqual({ minLength: 5, maxLength: 8 })
    expect(toIR(v.pipe(v.number(), v.minValue(1), v.minValue(3), v.maxValue(9), v.maxValue(5))).rules).toEqual({ min: 3, max: 5 })
  })
})

describe('cyclic and shared schemas', () => {
  it('turns a cyclic schema object into an unsupported leaf', () => {
    const cyclic: Record<string, unknown> = { kind: 'schema', type: 'object', entries: {} }
    ;(cyclic.entries as Record<string, unknown>).self = cyclic
    ;(cyclic.entries as Record<string, unknown>).name = v.string()
    const ir = toIR(cyclic)

    expect(Object.keys(ir.shape!)).toEqual(['self', 'name'])
    expect(ir.shape!.self!.kind).toBe('unsupported')
    expect(ir.shape!.name!.kind).toBe('string')
  })

  it('maps a recursive lazy schema to unsupported', () => {
    const Node: v.GenericSchema = v.object({ name: v.string(), child: v.optional(v.lazy(() => Node)) })
    expect(toIR(Node).shape!.child!.kind).toBe('unsupported')
  })

  it('still converts a schema reused by sibling fields in full', () => {
    const Address = v.object({ city: v.string() })
    const ir = toIR(v.object({ home: Address, work: Address, previous: v.array(Address) }))

    expect(ir.shape!.work!.shape!.city!.kind).toBe('string')
    expect(ir.shape!.previous!.element!.shape!.city!.kind).toBe('string')
  })

  it('caps depth instead of recursing without bound', () => {
    let schema: v.GenericSchema = v.string()
    for (let i = 0; i < 60; i++) schema = v.object({ child: schema })
    let ir = toIR(schema)
    let depth = 0
    while (ir.shape?.child) {
      ir = ir.shape.child
      depth++
    }

    expect(depth).toBeLessThan(60)
    expect(ir.kind).toBe('unsupported')
  })
})
