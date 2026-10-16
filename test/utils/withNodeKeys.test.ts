import { describe, expect, it } from 'vitest'
import { withNodeKeys } from '../../src/runtime/utils/withNodeKeys'

describe('withNodeKeys', () => {
  it('keys a field by its type, name and id', () => {
    const [field] = withNodeKeys([{ $formkit: 'nuxtUIInput', name: 'email', id: 'mail', label: 'Email' }]) as Array<Record<string, unknown>>
    expect(field!.key).toBe('nuxtUIInput:email:mail')
    expect(field!.label).toBe('Email')
  })

  it('gives a field whose type changed a different key, and an unchanged field the same key', () => {
    const key = (type: string) => (withNodeKeys([{ $formkit: type, name: 'a' }]) as Array<Record<string, unknown>>)[0]!.key
    expect(key('nuxtUICheckbox')).not.toBe(key('nuxtUIInput'))
    expect(key('nuxtUIInput')).toBe(key('nuxtUIInput'))
  })

  it('keys nested fields, including a repeater\'s children and a conditional\'s branches', () => {
    const [repeater] = withNodeKeys([
      { $formkit: 'nuxtUIRepeater', name: 'rows', children: [{ $formkit: 'nuxtUIInput', name: 'x' }] },
    ]) as unknown as Array<{ key: string, children: Array<{ key: string }> }>
    expect(repeater!.key).toBe('nuxtUIRepeater:rows:')
    expect(repeater!.children[0]!.key).toBe('nuxtUIInput:x:')

    const [conditional] = withNodeKeys([
      { if: '$x', then: { $formkit: 'nuxtUIInput', name: 'y' }, else: [{ $formkit: 'nuxtUIInput', name: 'z' }] },
    ]) as unknown as Array<{ then: { key: string }, else: Array<{ key: string }> }>
    expect(conditional!.then.key).toBe('nuxtUIInput:y:')
    expect(conditional!.else[0]!.key).toBe('nuxtUIInput:z:')
  })

  it('leaves HTML elements, unnamed nodes and a key you set yourself alone', () => {
    const result = withNodeKeys([
      { $el: 'h2', children: ['Title'] },
      { $formkit: 'nuxtUIInput' },
      { $formkit: 'nuxtUIInput', name: 'a', key: 'mine' },
    ]) as Array<Record<string, unknown>>
    expect(result[0]).toEqual({ $el: 'h2', children: ['Title'] })
    expect(result[1]).not.toHaveProperty('key')
    expect(result[2]!.key).toBe('mine')
  })

  it('does not modify the schema it is given', () => {
    const schema = [{ $formkit: 'nuxtUIInput', name: 'a' }]
    withNodeKeys(schema)
    expect(schema[0]).not.toHaveProperty('key')
  })

  it('passes undefined and strings through', () => {
    expect(withNodeKeys(undefined)).toBeUndefined()
    expect(withNodeKeys('$slots.default' as never)).toBe('$slots.default')
  })
})
