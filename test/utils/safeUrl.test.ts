import { describe, expect, it } from 'vitest'
import { toSafeHref } from '../../src/runtime/utils/safeUrl'

describe('toSafeHref', () => {
  it.each([
    'https://example.com/a?b=1#c',
    'http://example.com',
    'HTTPS://EXAMPLE.COM',
    'mailto:ada@example.com',
    'tel:+4912345',
    '//cdn.example.com/x.js',
    '/relative/path',
    './relative',
    '../up',
    '#anchor',
    '?query=1',
    'relative/no-slash',
  ])('allows %s', (url) => {
    expect(toSafeHref(url)).toBe(url)
  })

  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    '  javascript:alert(1)',
    'java\tscript:alert(1)',
    'java\nscript:alert(1)',
    '\u0001javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
  ])('rejects %j', (url) => {
    expect(toSafeHref(url)).toBeUndefined()
  })

  it('returns undefined for empty/nullish values and coerces non-strings', () => {
    expect(toSafeHref(undefined)).toBeUndefined()
    expect(toSafeHref(null)).toBeUndefined()
    expect(toSafeHref('')).toBeUndefined()
    expect(toSafeHref('   ')).toBeUndefined()
    expect(toSafeHref(12345)).toBe('12345')
  })
})
