import { describe, expect, it } from 'vitest'
import * as v from 'valibot'
import { z } from 'zod'
import type { ValibotLikeSchema, ZodLikeSchema } from '../../src/runtime/composables/useFormKitAutoForm'
import { valibotToIR } from '../../src/runtime/utils/valibotAdapter'
import { zodToIR } from '../../src/runtime/utils/zodAdapter'

const toIR = (schema: unknown) => zodToIR(schema as ZodLikeSchema)

describe('zodToIR kinds', () => {
  it('maps the supported types', () => {
    expect(toIR(z.string())).toEqual({ kind: 'string', required: true, rules: {} })
    expect(toIR(z.number()).kind).toBe('number')
    expect(toIR(z.boolean()).kind).toBe('boolean')
    expect(toIR(z.date()).kind).toBe('date')
  })

  it('maps everything else to unsupported', () => {
    for (const schema of [z.enum(['a']), z.union([z.string(), z.number()]), z.record(z.string(), z.string()), z.lazy(() => z.string())]) {
      expect(toIR(schema).kind).toBe('unsupported')
    }
  })

  it('reads object shape keeping order and unsupported entries', () => {
    const ir = toIR(z.object({ b: z.string(), a: z.enum(['x']) }))
    expect(ir.kind).toBe('object')
    expect(Object.keys(ir.shape!)).toEqual(['b', 'a'])
    expect(ir.shape!.a!.kind).toBe('unsupported')
  })

  it('reads the array element', () => {
    const ir = toIR(z.array(z.object({ x: z.string() }).optional()))
    expect(ir.kind).toBe('array')
    expect(ir.element).toMatchObject({ kind: 'object', required: false })
    expect(ir.element!.shape!.x!.kind).toBe('string')
  })

  it('leaves shape and element off when the schema has none', () => {
    expect(toIR({ type: 'object' }).shape).toBeUndefined()
    expect(toIR({ type: 'array' }).element).toBeUndefined()
  })
})

describe('zodToIR wrappers and defaults', () => {
  it('marks every wrapper kind, nested or not, as not required', () => {
    for (const schema of [z.string().optional(), z.string().nullable(), z.string().nullish(), z.string().default('x'), z.string().nullable().optional()]) {
      expect(toIR(schema)).toMatchObject({ kind: 'string', required: false })
    }
  })

  it('finds a default anywhere in the chain', () => {
    expect(toIR(z.string().default('x')).default).toBe('x')
    expect(toIR(z.string().optional().default('x')).default).toBe('x')
    expect(toIR(z.string().default('y').optional()).default).toBe('y')
    expect(toIR(z.string().nullable().default('z')).default).toBe('z')
    expect(toIR(z.string().optional()).default).toBeUndefined()
  })

  it('keeps a falsy default', () => {
    expect(toIR(z.number().default(0)).default).toBe(0)
    expect('default' in toIR(z.string())).toBe(false)
  })
})

describe('zodToIR rules', () => {
  it('reads format, length and value rules', () => {
    expect(toIR(z.string().email()).rules).toEqual({ format: 'email' })
    expect(toIR(z.email()).rules).toEqual({ format: 'email' })
    expect(toIR(z.string().url()).rules).toEqual({ format: 'url' })
    expect(toIR(z.string().min(2).max(10)).rules).toEqual({ minLength: 2, maxLength: 10 })
    expect(toIR(z.number().min(18).max(99)).rules).toEqual({ min: 18, max: 99 })
  })

  it('ignores formats that are not email or url', () => {
    expect(toIR(z.string().uuid()).rules).toEqual({})
  })

  it('treats unconstrained numbers and ints as having no bounds', () => {
    expect(toIR(z.number()).rules).toEqual({})
    expect(toIR(z.number().int()).rules).toEqual({})
    expect(toIR(z.number().int().min(5)).rules).toEqual({ min: 5 })
  })

  it('reads rules through a wrapper', () => {
    expect(toIR(z.string().url().optional()).rules).toEqual({ format: 'url' })
  })

  it('reports the tightest of repeated bounds', () => {
    expect(toIR(z.string().min(2).min(5).max(9).max(8)).rules).toEqual({ minLength: 5, maxLength: 8 })
    expect(toIR(z.number().min(1).min(3).max(9).max(5)).rules).toEqual({ min: 3, max: 5 })
  })
})

// The drift guard: equivalent schemas must normalize to the same IR, so the
// shared inference code can't behave differently per library.
describe('valibot and zod adapters agree', () => {
  const cases: [string, unknown, unknown][] = [
    ['plain types', v.object({ s: v.string(), n: v.number(), b: v.boolean(), d: v.date() }), z.object({ s: z.string(), n: z.number(), b: z.boolean(), d: z.date() })],
    ['optional and nullable', v.object({ a: v.optional(v.string()), b: v.nullable(v.number()), c: v.nullish(v.boolean()) }), z.object({ a: z.string().optional(), b: z.number().nullable(), c: z.boolean().nullish() })],
    ['nested wrappers', v.object({ a: v.optional(v.nullable(v.string())) }), z.object({ a: z.string().nullable().optional() })],
    ['defaults', v.object({ a: v.optional(v.string(), 'x'), b: v.nullish(v.number(), 0) }), z.object({ a: z.string().default('x'), b: z.number().nullish().default(0) })],
    ['string rules', v.object({ e: v.pipe(v.string(), v.email()), u: v.pipe(v.string(), v.url()), l: v.pipe(v.string(), v.minLength(2), v.maxLength(10)) }), z.object({ e: z.string().email(), u: z.string().url(), l: z.string().min(2).max(10) })],
    ['number rules', v.object({ n: v.pipe(v.number(), v.minValue(18), v.maxValue(99)) }), z.object({ n: z.number().min(18).max(99) })],
    ['groups and repeaters', v.object({ g: v.object({ city: v.string() }), r: v.array(v.object({ x: v.string(), y: v.optional(v.number(), 1) })), t: v.array(v.string()) }), z.object({ g: z.object({ city: z.string() }), r: z.array(z.object({ x: z.string(), y: z.number().default(1) })), t: z.array(z.string()) })],
    ['unsupported', v.object({ p: v.picklist(['a']), r: v.record(v.string(), v.string()) }), z.object({ p: z.enum(['a']), r: z.record(z.string(), z.string()) })],
  ]

  it.each(cases)('%s', (_name, valibotSchema, zodSchema) => {
    expect(zodToIR(zodSchema as ZodLikeSchema)).toEqual(valibotToIR(valibotSchema as ValibotLikeSchema))
  })
})
