import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { issuesToFormKitErrors } from '../../src/runtime/utils/standardSchemaErrors'

describe('issuesToFormKitErrors', () => {
  it('maps an issue with no path to localErrors', () => {
    const result = issuesToFormKitErrors([{ message: 'Form is invalid' }])
    expect(result.localErrors).toEqual(['Form is invalid'])
    expect(result.childErrors).toEqual({})
  })

  it('maps an issue with an empty path to localErrors', () => {
    const result = issuesToFormKitErrors([{ message: 'Form is invalid', path: [] }])
    expect(result.localErrors).toEqual(['Form is invalid'])
    expect(result.childErrors).toEqual({})
  })

  it('maps a single-segment path to childErrors', () => {
    const result = issuesToFormKitErrors([{ message: 'Required', path: ['email'] }])
    expect(result.childErrors).toEqual({ email: ['Required'] })
    expect(result.localErrors).toEqual([])
  })

  it('maps an array-index path to a dot-delimited address', () => {
    const result = issuesToFormKitErrors([{ message: 'Invalid email', path: ['items', 2, 'email'] }])
    expect(result.childErrors).toEqual({ 'items.2.email': ['Invalid email'] })
  })

  it('accumulates multiple issues at the same address instead of overwriting', () => {
    const result = issuesToFormKitErrors([
      { message: 'Too short', path: ['password'] },
      { message: 'Must contain a number', path: ['password'] },
    ])
    expect(result.childErrors).toEqual({ password: ['Too short', 'Must contain a number'] })
  })

  it('mirrors the exact issue shape Zod produces for a nested array path', async () => {
    const schema = z.object({
      email: z.email(),
      items: z.array(z.object({ email: z.email() })),
    })
    const validation = await schema['~standard'].validate({
      email: 'bad',
      items: [{ email: 'ok@example.com' }, { email: 'bad2' }],
    })
    expect(validation.issues).toBeDefined()
    const result = issuesToFormKitErrors(validation.issues!)
    expect(result.childErrors.email).toEqual(['Invalid email address'])
    expect(result.childErrors['items.1.email']).toEqual(['Invalid email address'])
  })

  it('mirrors the exact issue shape Valibot produces for a nested array path', async () => {
    const schema = v.object({
      email: v.pipe(v.string(), v.email()),
      items: v.array(v.object({ email: v.pipe(v.string(), v.email()) })),
    })
    const validation = await schema['~standard'].validate({
      email: 'bad',
      items: [{ email: 'ok@example.com' }, { email: 'bad2' }],
    })
    expect(validation.issues).toBeDefined()
    const result = issuesToFormKitErrors(validation.issues!)
    expect(result.childErrors.email).toHaveLength(1)
    expect(result.childErrors['items.1.email']).toHaveLength(1)
  })
})
