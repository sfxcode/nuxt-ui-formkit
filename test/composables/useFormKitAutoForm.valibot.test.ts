import { describe, expect, it } from 'vitest'
import * as v from 'valibot'
import { inferFormSchemaFromValibot } from '../../src/runtime/composables/useFormKitAutoForm'

interface InferredNode {
  $formkit?: string
  name?: string
  label?: string
  validation?: string
  valueType?: string
  [key: string]: unknown
}

function infer(schema: object, overrides?: Parameters<typeof inferFormSchemaFromValibot>[1]) {
  return inferFormSchemaFromValibot(schema, overrides) as InferredNode[]
}

describe('inferFormSchemaFromValibot type mapping', () => {
  it('maps entry types to inputs', () => {
    const nodes = infer(v.object({
      name: v.string(),
      age: v.number(),
      active: v.boolean(),
      birthday: v.date(),
      tags: v.array(v.string()),
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
    const [repeater] = infer(v.object({
      contacts: v.array(v.object({ email: v.string(), primary: v.boolean() })),
    }))
    expect(repeater?.$formkit).toBe('nuxtUIRepeater')
    expect(repeater?.newItem).toEqual({ email: '', primary: false })
    expect((repeater?.children as InferredNode[]).map(child => child.name)).toEqual(['email', 'primary'])
  })

  it('maps a nested object to a group', () => {
    const [group] = infer(v.object({ address: v.object({ city: v.string() }) }))
    expect(group?.$formkit).toBe('group')
    expect((group?.children as InferredNode[])[0]?.name).toBe('city')
  })

  it('skips unsupported constructs', () => {
    const nodes = infer(v.object({
      role: v.picklist(['admin', 'user']),
      mixed: v.union([v.string(), v.number()]),
      meta: v.record(v.string(), v.string()),
      name: v.string(),
    }))
    expect(nodes.map(node => node.name)).toEqual(['name'])
  })

  it('returns an empty schema for a non-object root', () => {
    expect(infer(v.string())).toEqual([])
    expect(infer({})).toEqual([])
  })
})

describe('inferFormSchemaFromValibot validation derivation', () => {
  it('marks non-optional entries as required', () => {
    const nodes = infer(v.object({ name: v.string(), nickname: v.optional(v.string()) }))
    expect(nodes[0]?.validation).toBe('required')
    expect(nodes[1]?.validation).toBeUndefined()
  })

  it('does not force required onto booleans', () => {
    const [node] = infer(v.object({ active: v.boolean() }))
    expect(node?.validation).toBeUndefined()
  })

  it('unwraps nullable and nullish as optional', () => {
    const nodes = infer(v.object({ a: v.nullable(v.string()), b: v.nullish(v.number()) }))
    expect(nodes[0]).toMatchObject({ $formkit: 'nuxtUIInput', name: 'a' })
    expect(nodes[1]).toMatchObject({ $formkit: 'nuxtUIInputNumber', name: 'b' })
    expect(nodes.every(node => node.validation === undefined)).toBe(true)
  })

  it('derives email and url rules from pipes', () => {
    const nodes = infer(v.object({
      email: v.pipe(v.string(), v.email()),
      website: v.optional(v.pipe(v.string(), v.url())),
    }))
    expect(nodes[0]?.validation).toBe('required|email')
    expect(nodes[1]?.validation).toBe('url')
  })

  it('derives length rules from minLength/maxLength', () => {
    const nodes = infer(v.object({
      both: v.pipe(v.string(), v.minLength(2), v.maxLength(10)),
      minOnly: v.pipe(v.string(), v.minLength(3)),
      maxOnly: v.pipe(v.string(), v.maxLength(5)),
    }))
    expect(nodes[0]?.validation).toBe('required|length:2,10')
    expect(nodes[1]?.validation).toBe('required|length:3')
    expect(nodes[2]?.validation).toBe('required|length:0,5')
  })

  it('derives min/max rules from minValue/maxValue', () => {
    const [node] = infer(v.object({ age: v.pipe(v.number(), v.minValue(18), v.maxValue(99)) }))
    expect(node?.validation).toBe('required|min:18|max:99')
  })

  it('uses optional defaults in repeater newItem blanks', () => {
    const [repeater] = infer(v.object({
      rows: v.array(v.object({ status: v.optional(v.string(), 'new'), count: v.number() })),
    }))
    expect(repeater?.newItem).toEqual({ status: 'new', count: 0 })
  })
})

describe('inferFormSchemaFromValibot overrides', () => {
  it('applies the same override semantics as data inference', () => {
    const nodes = infer(
      v.object({ email: v.pipe(v.string(), v.email()), internal: v.string(), address: v.object({ city: v.string() }) }),
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
