import type { AutoFormOverrides } from '../../src/runtime/composables/useFormKitAutoForm'
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { inferFormSchema, useFormKitAutoForm } from '../../src/runtime/composables/useFormKitAutoForm'

interface InferredNode {
  $formkit?: string
  name?: string
  label?: string
  valueType?: string
  [key: string]: unknown
}

function infer(data: Record<string, unknown>, overrides?: AutoFormOverrides) {
  return inferFormSchema(data, overrides) as InferredNode[]
}

describe('inferFormSchema primitives', () => {
  it('maps a string to nuxtUIInput', () => {
    const [node] = infer({ name: 'Tom' })
    expect(node).toEqual({ $formkit: 'nuxtUIInput', name: 'name', label: 'Name' })
  })

  it('maps a multi-line string to nuxtUITextarea', () => {
    const [node] = infer({ bio: 'line one\nline two' })
    expect(node?.$formkit).toBe('nuxtUITextarea')
  })

  it('maps a number to nuxtUIInputNumber', () => {
    const [node] = infer({ age: 42 })
    expect(node).toEqual({ $formkit: 'nuxtUIInputNumber', name: 'age', label: 'Age' })
  })

  it('maps a boolean to nuxtUISwitch', () => {
    const [node] = infer({ active: false })
    expect(node).toEqual({ $formkit: 'nuxtUISwitch', name: 'active', label: 'Active' })
  })

  it('maps a Date instance to nuxtUIInputDate with valueType date', () => {
    const [node] = infer({ createdAt: new Date('2024-01-15') })
    expect(node).toEqual({ $formkit: 'nuxtUIInputDate', name: 'createdAt', label: 'Created At', valueType: 'date' })
  })

  it('maps a CalendarDate instance to nuxtUIInputDate with valueType calendar', () => {
    const [node] = infer({ dueOn: new CalendarDate(2024, 1, 15) })
    expect(node).toEqual({ $formkit: 'nuxtUIInputDate', name: 'dueOn', label: 'Due On', valueType: 'calendar' })
  })

  it('maps a CalendarDateTime instance to nuxtUIInputDate with valueType calendar', () => {
    const [node] = infer({ startsAt: new CalendarDateTime(2024, 1, 15, 9, 30) })
    expect(node).toEqual({ $formkit: 'nuxtUIInputDate', name: 'startsAt', label: 'Starts At', valueType: 'calendar' })
  })

  it('maps an ISO date-only string to nuxtUIInputDate with valueType iso', () => {
    const [node] = infer({ birthday: '1990-06-15' })
    expect(node).toEqual({ $formkit: 'nuxtUIInputDate', name: 'birthday', label: 'Birthday', valueType: 'iso' })
  })

  it('maps a full ISO datetime string to nuxtUIInputDate', () => {
    const [node] = infer({ startsAt: '2024-01-15T09:30:00Z' })
    expect(node?.$formkit).toBe('nuxtUIInputDate')
    expect(node?.valueType).toBe('iso')
  })

  it('keeps non-date strings as nuxtUIInput', () => {
    for (const value of ['123', 'not a date', '2024', '2024-01', '15.01.2024']) {
      const [node] = infer({ field: value })
      expect(node?.$formkit, value).toBe('nuxtUIInput')
    }
  })

  it('rejects ISO-shaped strings that are not real dates', () => {
    const [node] = infer({ field: '2024-13-45' })
    expect(node?.$formkit).toBe('nuxtUIInput')
  })

  it('skips null and undefined values', () => {
    expect(infer({ a: null, b: undefined })).toEqual([])
  })

  it('skips functions and symbols', () => {
    expect(infer({ fn: () => 1, sym: Symbol('x') })).toEqual([])
  })

  it('preserves data key order', () => {
    const nodes = infer({ b: 'x', a: 1, c: true })
    expect(nodes.map(node => node.name)).toEqual(['b', 'a', 'c'])
  })
})

describe('label humanization', () => {
  it.each([
    ['firstName', 'First Name'],
    ['email_address', 'Email Address'],
    ['some-key', 'Some Key'],
    ['name', 'Name'],
    ['userID', 'User ID'],
  ])('humanizes %s to %s', (key, expected) => {
    const [node] = infer({ [key]: 'value' })
    expect(node?.label).toBe(expected)
  })
})

describe('inferFormSchema nested structures', () => {
  it('maps a string array to nuxtUIInputTags', () => {
    const [node] = infer({ tags: ['vue', 'nuxt'] })
    expect(node).toEqual({ $formkit: 'nuxtUIInputTags', name: 'tags', label: 'Tags' })
  })

  it('maps an empty array to nuxtUIInputTags', () => {
    const [node] = infer({ tags: [] })
    expect(node?.$formkit).toBe('nuxtUIInputTags')
  })

  it('maps a number array to nuxtUIInputTags', () => {
    const [node] = infer({ scores: [1, 2, 3] })
    expect(node?.$formkit).toBe('nuxtUIInputTags')
  })

  it('maps an array of objects to nuxtUIRepeater with inferred children', () => {
    const [node] = infer({ contacts: [{ name: 'Tom', email: 'tom@example.com', primary: true }] })
    expect(node?.$formkit).toBe('nuxtUIRepeater')
    expect(node?.name).toBe('contacts')
    expect(node?.newItem).toEqual({ name: '', email: '', primary: false })
    expect(node?.children).toEqual([
      { $formkit: 'nuxtUIInput', name: 'name', label: 'Name' },
      { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
      { $formkit: 'nuxtUISwitch', name: 'primary', label: 'Primary' },
    ])
  })

  it('enables clone/delete and right-aligns the button group on an inferred repeater', () => {
    const [node] = infer({ contacts: [{ email: 'tom@example.com' }] })
    expect(node).toMatchObject({
      displayCloneButton: true,
      displayDeleteButton: true,
      buttonGroupClass: 'flex gap-2 justify-end',
    })
  })

  it('lets overrides turn off repeater button defaults', () => {
    const [node] = infer(
      { contacts: [{ email: 'tom@example.com' }] },
      { contacts: { displayCloneButton: false } },
    )
    expect(node?.displayCloneButton).toBe(false)
    expect(node?.displayDeleteButton).toBe(true)
  })

  it('infers repeater children from the first element only', () => {
    const [node] = infer({ rows: [{ a: 'x' }, { a: 'y', b: 1 }] })
    expect((node?.children as InferredNode[]).map(child => child.name)).toEqual(['a'])
  })

  it('blanks nested structures in newItem', () => {
    const [node] = infer({ rows: [{ meta: { count: 2 }, tags: ['a'], when: '2024-01-15' }] })
    expect(node?.newItem).toEqual({ meta: { count: 0 }, tags: [], when: null })
  })

  it('maps a nested object to a group with inferred children', () => {
    const [node] = infer({ address: { city: 'Berlin', zip: '10115' } })
    expect(node?.$formkit).toBe('group')
    expect(node?.name).toBe('address')
    expect((node?.children as InferredNode[]).map(child => child.name)).toEqual(['city', 'zip'])
  })

  it('recurses through groups into repeaters', () => {
    const [node] = infer({ company: { offices: [{ city: 'Berlin' }] } })
    const [repeater] = node?.children as InferredNode[]
    expect(repeater?.$formkit).toBe('nuxtUIRepeater')
    expect((repeater?.children as InferredNode[])[0]?.name).toBe('city')
  })

  it('skips non-plain objects other than Date', () => {
    expect(infer({ map: new Map(), regex: /x/, url: new URL('https://example.com') })).toEqual([])
  })
})

describe('inferFormSchema overrides', () => {
  it('shallow-merges an override into the inferred node', () => {
    const [node] = infer({ email: 'tom@example.com' }, { email: { validation: 'required|email' } })
    expect(node).toEqual({ $formkit: 'nuxtUIInput', name: 'email', label: 'Email', validation: 'required|email' })
  })

  it('swaps the input type when the override supplies $formkit', () => {
    const [node] = infer({ bio: 'short' }, { bio: { $formkit: 'nuxtUITextarea' } })
    expect(node?.$formkit).toBe('nuxtUITextarea')
    expect(node?.label).toBe('Bio')
  })

  it('removes a field when the override is false', () => {
    const nodes = infer({ id: 7, name: 'Tom' }, { id: false })
    expect(nodes.map(node => node.name)).toEqual(['name'])
  })

  it('targets nested group fields via dot-paths', () => {
    const [group] = infer({ address: { city: 'Berlin' } }, { 'address.city': { validation: 'required' } })
    const [city] = group?.children as InferredNode[]
    expect(city?.validation).toBe('required')
  })

  it('targets repeater item fields via dot-paths without an index segment', () => {
    const [repeater] = infer(
      { contacts: [{ email: 'a@b.c' }] },
      { 'contacts.email': { validation: 'required|email' } },
    )
    const [email] = repeater?.children as InferredNode[]
    expect(email?.validation).toBe('required|email')
  })

  it('appends an override-only path as a new field with defaults', () => {
    const nodes = infer({ name: 'Tom' }, { nickname: { validation: 'required' } })
    expect(nodes[1]).toEqual({ $formkit: 'nuxtUIInput', name: 'nickname', label: 'Nickname', validation: 'required' })
  })

  it('appends an override-only path inside an existing group', () => {
    const [group] = infer({ address: { city: 'Berlin' } }, { 'address.zip': { $formkit: 'nuxtUIInput' } })
    const children = group?.children as InferredNode[]
    expect(children.map(child => child.name)).toEqual(['city', 'zip'])
  })

  it('un-skips a null-valued key when an override is supplied', () => {
    const [node] = infer({ notes: null }, { notes: { $formkit: 'nuxtUITextarea' } })
    expect(node).toEqual({ $formkit: 'nuxtUITextarea', name: 'notes', label: 'Notes' })
  })

  it('does not append repeater item overrides at the top level', () => {
    const nodes = infer({ contacts: [{ email: 'a@b.c' }] }, { 'contacts.email': { validation: 'email' } })
    expect(nodes).toHaveLength(1)
    expect(nodes[0]?.$formkit).toBe('nuxtUIRepeater')
  })
})

describe('useFormKitAutoForm', () => {
  it('returns the inference function', () => {
    const { inferFormSchema: composableInfer } = useFormKitAutoForm()
    expect(composableInfer({ name: 'Tom' })).toEqual(inferFormSchema({ name: 'Tom' }))
  })
})
