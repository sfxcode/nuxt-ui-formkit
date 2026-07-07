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
