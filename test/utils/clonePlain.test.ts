import { CalendarDate, Time, ZonedDateTime } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { clonePlain } from '../../src/runtime/utils/clonePlain'

describe('clonePlain', () => {
  it('copies plain objects and arrays deeply, so edits to the copy never reach the original', () => {
    const original = { name: 'Ada', tags: ['a', 'b'], address: { city: 'London', geo: { lat: 1 } }, rows: [{ x: 1 }] }
    const copy = clonePlain(original)

    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
    expect(copy.tags).not.toBe(original.tags)
    expect(copy.address).not.toBe(original.address)
    expect(copy.address.geo).not.toBe(original.address.geo)
    expect(copy.rows[0]).not.toBe(original.rows[0])

    copy.address.city = 'Paris'
    copy.rows[0]!.x = 2
    expect(original.address.city).toBe('London')
    expect(original.rows[0]!.x).toBe(1)
  })

  it('keeps class instances intact - the date values the date inputs need are not flattened', () => {
    const date = new CalendarDate(2020, 12, 12)
    const time = new Time(9, 30)
    const zoned = new ZonedDateTime(2020, 12, 12, 'UTC', 0)
    const copy = clonePlain({ date, time, zoned, nested: { date } })

    expect(copy.date).toBe(date)
    expect(copy.time).toBe(time)
    expect(copy.zoned).toBe(zoned)
    expect(copy.nested.date).toBe(date)
    expect(copy.date).toBeInstanceOf(CalendarDate)
    expect(typeof copy.date.compare).toBe('function')
  })

  it('leaves other non-plain values (Date, File, Map, functions) and primitives as they are', () => {
    const when = new Date(2020, 11, 12)
    const file = new File(['x'], 'a.txt')
    const map = new Map([['k', 1]])
    const fn = () => 1
    const copy = clonePlain({ when, file, map, fn, n: 0, s: '', nope: null, nothing: undefined })

    expect(copy.when).toBe(when)
    expect(copy.file).toBe(file)
    expect(copy.map).toBe(map)
    expect(copy.fn).toBe(fn)
    expect(copy).toMatchObject({ n: 0, s: '', nope: null, nothing: undefined })
  })

  it('copies null-prototype objects and handles scalars and nullish roots', () => {
    const bare = Object.assign(Object.create(null), { a: { b: 1 } })
    const copy = clonePlain(bare)

    expect(copy).toEqual({ a: { b: 1 } })
    expect(copy.a).not.toBe(bare.a)
    expect(clonePlain(5)).toBe(5)
    expect(clonePlain(null)).toBeNull()
    expect(clonePlain(undefined)).toBeUndefined()
  })

  it('terminates on a cyclic structure, copying the cycle as a cycle', () => {
    const original: Record<string, unknown> = { name: 'Ada' }
    original.self = original
    const copy = clonePlain(original)

    expect(copy.name).toBe('Ada')
    expect(copy.self).toBe(copy)
    expect(copy).not.toBe(original)
  })
})
