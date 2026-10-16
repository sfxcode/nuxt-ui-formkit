import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { inferFormSchemaFromZod } from '../../src/runtime/composables/useFormKitAutoForm'

interface InferredNode {
  $formkit?: string
  name?: string
  label?: string
  validation?: string
  valueType?: string
  [key: string]: unknown
}

function infer(schema: object, overrides?: Parameters<typeof inferFormSchemaFromZod>[1]) {
  return inferFormSchemaFromZod(schema, overrides) as InferredNode[]
}

describe('inferFormSchemaFromZod type mapping', () => {
  it('maps entry types to inputs', () => {
    const nodes = infer(z.object({
      name: z.string(),
      age: z.number(),
      active: z.boolean(),
      birthday: z.date(),
      tags: z.array(z.string()),
    }))
    expect(nodes.map(node => node.$formkit)).toEqual([
      'nuxtUIInput',
      'nuxtUIInputNumber',
      'nuxtUISwitch',
      'nuxtUIInputDate',
      'nuxtUIInputTags',
    ])
    expect(nodes[3]?.valueType).toBe('date')
    expect(nodes[0]?.label).toBe('Name')
  })

  it('maps an array of objects to a repeater with children and blanked newItem', () => {
    const [repeater] = infer(z.object({
      contacts: z.array(z.object({ email: z.string(), primary: z.boolean() })),
    }))
    expect(repeater?.$formkit).toBe('nuxtUIRepeater')
    expect(repeater?.newItem).toEqual({ email: '', primary: false })
    expect((repeater?.children as InferredNode[]).map(child => child.name)).toEqual(['email', 'primary'])
  })

  it('maps a nested object to a group', () => {
    const [group] = infer(z.object({ address: z.object({ city: z.string() }) }))
    expect(group?.$formkit).toBe('group')
    expect((group?.children as InferredNode[])[0]?.name).toBe('city')
  })

  it('skips unsupported constructs', () => {
    const nodes = infer(z.object({
      role: z.enum(['admin', 'user']),
      mixed: z.union([z.string(), z.number()]),
      meta: z.record(z.string(), z.string()),
      name: z.string(),
    }))
    expect(nodes.map(node => node.name)).toEqual(['name'])
  })

  it('returns an empty schema for a non-object root', () => {
    expect(infer(z.string())).toEqual([])
    expect(infer({})).toEqual([])
  })
})

describe('inferFormSchemaFromZod validation derivation', () => {
  it('marks non-optional entries as required', () => {
    const nodes = infer(z.object({ name: z.string(), nickname: z.string().optional() }))
    expect(nodes[0]?.validation).toBe('required')
    expect(nodes[1]?.validation).toBeUndefined()
  })

  it('does not force required onto booleans', () => {
    const [node] = infer(z.object({ active: z.boolean() }))
    expect(node?.validation).toBeUndefined()
  })

  it('unwraps nullable and nullish as optional', () => {
    const nodes = infer(z.object({ a: z.string().nullable(), b: z.number().nullish() }))
    expect(nodes[0]).toMatchObject({ $formkit: 'nuxtUIInput', name: 'a' })
    expect(nodes[1]).toMatchObject({ $formkit: 'nuxtUIInputNumber', name: 'b' })
    expect(nodes.every(node => node.validation === undefined)).toBe(true)
  })

  it('derives email and url rules from chained checks', () => {
    const nodes = infer(z.object({
      email: z.string().email(),
      website: z.string().url().optional(),
    }))
    expect(nodes[0]?.validation).toBe('required|email')
    expect(nodes[1]?.validation).toBe('url')
  })

  it('derives email from the v4 top-level shorthand', () => {
    const [node] = infer(z.object({ email: z.email() }))
    expect(node?.validation).toBe('required|email')
  })

  it('derives length rules from min/max string length', () => {
    const nodes = infer(z.object({
      both: z.string().min(2).max(10),
      minOnly: z.string().min(3),
      maxOnly: z.string().max(5),
    }))
    expect(nodes[0]?.validation).toBe('required|length:2,10')
    expect(nodes[1]?.validation).toBe('required|length:3')
    expect(nodes[2]?.validation).toBe('required|length:0,5')
  })

  it('derives min/max rules from numeric bounds', () => {
    const [node] = infer(z.object({ age: z.number().min(18).max(99) }))
    expect(node?.validation).toBe('required|min:18|max:99')
  })

  it('uses defaults in repeater newItem blanks regardless of optional/default chain order', () => {
    const [repeater] = infer(z.object({
      rows: z.array(z.object({
        status: z.string().optional().default('new'),
        kind: z.string().default('normal').optional(),
        count: z.number(),
      })),
    }))
    expect(repeater?.newItem).toEqual({ status: 'new', kind: 'normal', count: 0 })
  })
})

describe('inferFormSchemaFromZod overrides', () => {
  it('applies the same override semantics as data inference', () => {
    const nodes = infer(
      z.object({ email: z.string().email(), internal: z.string(), address: z.object({ city: z.string() }) }),
      {
        'email': { placeholder: 'you@example.com' },
        'internal': false,
        'address.city': { validation: 'required' },
        'notes': { $formkit: 'nuxtUITextarea' },
      },
    )
    expect(nodes[0]).toMatchObject({ validation: 'required|email', placeholder: 'you@example.com' })
    expect(nodes.map(node => node.name)).toEqual(['email', 'address', 'notes'])
    const [city] = nodes[1]?.children as InferredNode[]
    expect(city?.validation).toBe('required')
    expect(nodes[2]?.$formkit).toBe('nuxtUITextarea')
  })
})

describe('inferFormSchemaFromZod number bounds', () => {
  const validationOf = (schema: z.ZodType) => infer(z.object({ n: schema }))[0]?.validation

  it('emits no bounds for an unconstrained number', () => {
    expect(validationOf(z.number())).toBe('required')
  })

  it('emits no bounds for an unconstrained int (zod reports safe-integer limits)', () => {
    expect(validationOf(z.number().int())).toBe('required')
  })

  it('keeps an explicit min on an int and drops the implicit max', () => {
    expect(validationOf(z.number().int().min(5))).toBe('required|min:5')
  })

  it('keeps an explicit min on a plain number', () => {
    expect(validationOf(z.number().min(5))).toBe('required|min:5')
  })
})

describe('inferFormSchemaFromZod wrappers and defaults (pinned behavior)', () => {
  const newItemOf = (fields: Record<string, z.ZodType>) =>
    (infer(z.object({ rows: z.array(z.object(fields)) }))[0]?.newItem) as Record<string, unknown>

  it('marks a field with a default as not required', () => {
    const [node] = infer(z.object({ a: z.string().default('x') }))
    expect(node?.validation).toBeUndefined()
  })

  it('unwraps nested wrappers as optional', () => {
    const [node] = infer(z.object({ a: z.number().nullable().optional() }))
    expect(node).toMatchObject({ $formkit: 'nuxtUIInputNumber', name: 'a' })
    expect(node?.validation).toBeUndefined()
  })

  it('reads a default through nullable, as the innermost or outermost layer', () => {
    expect(newItemOf({
      a: z.string().nullable().default('x'),
      b: z.string().default('y').nullable(),
    })).toEqual({ a: 'x', b: 'y' })
  })

  it('blanks a date to null and unsupported types to null', () => {
    expect(newItemOf({ d: z.date(), e: z.enum(['a', 'b']) })).toEqual({ d: null, e: null })
  })

  it('blanks nested objects and arrays inside newItem', () => {
    expect(newItemOf({
      address: z.object({ city: z.string(), zip: z.number() }),
      tags: z.array(z.string()),
      sub: z.array(z.object({ x: z.string() })),
    })).toEqual({ address: { city: '', zip: 0 }, tags: [], sub: [] })
  })

  it('builds a repeater for an array of optional or nullable objects', () => {
    const nodes = infer(z.object({
      a: z.array(z.object({ x: z.string() }).optional()),
      b: z.array(z.object({ y: z.number() }).nullable()),
    }))
    expect(nodes.map(node => node.$formkit)).toEqual(['nuxtUIRepeater', 'nuxtUIRepeater'])
    expect(nodes[1]?.newItem).toEqual({ y: 0 })
  })

  it('keeps the last of repeated min/max constraints (zod reports the tightest)', () => {
    const nodes = infer(z.object({
      s: z.string().min(2).min(5).max(9).max(8),
      n: z.number().min(1).min(3).max(9),
    }))
    expect(nodes[0]?.validation).toBe('required|length:5,8')
    expect(nodes[1]?.validation).toBe('required|min:3|max:9')
  })

  // Differs from valibot, whose array pipe does emit `length:` (see the valibot test).
  it('emits no length rule for min/max on an array', () => {
    const [node] = infer(z.object({ tags: z.array(z.string()).min(1).max(3) }))
    expect(node).toMatchObject({ $formkit: 'nuxtUIInputTags', validation: 'required' })
  })

  it('returns an empty schema for roots that are not an object with a shape', () => {
    expect(infer(z.object({ a: z.string() }).optional())).toEqual([])
    expect(infer({ type: 'object' })).toEqual([])
  })
})
