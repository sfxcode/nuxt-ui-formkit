const SAFE_SCHEMES = new Set(['http', 'https', 'mailto', 'tel'])

/**
 * Returns `value` as a URL string that is safe to put in an `href`, or
 * `undefined` if it isn't.
 *
 * Vue escapes attribute *values* but does not police URL *schemes*, so a
 * data-driven `javascript:` (or `data:`, `vbscript:`...) value would render as a
 * live link. Only http(s), mailto and tel - plus scheme-less relative URLs and
 * protocol-relative `//host` - are allowed. Browsers ignore ASCII control
 * characters and whitespace inside the scheme (`java\tscript:`), so those are
 * stripped before the scheme is read.
 */
export function toSafeHref(value: unknown): string | undefined {
  if (value === null || value === undefined)
    return undefined
  const url = String(value).trim()
  if (!url)
    return undefined
  // Drop ASCII control characters and spaces (char codes <= 32).
  const schemeProbe = [...url].filter(char => char.charCodeAt(0) > 32).join('')
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(schemeProbe)?.[1]?.toLowerCase()
  if (!scheme)
    return url
  return SAFE_SCHEMES.has(scheme) ? url : undefined
}
