import { readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Every wrapped input binds `style`/`disabled`/`color`/`size`/`ui` through
// `useFormKitInput`'s `commonProps` instead of repeating the five bindings, so a
// fix to one of them lands everywhere. A new input that goes back to the
// hand-written bindings fails here unless it is added to the list below with a
// reason.

const inputsDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/runtime/components/inputs')

// [component, why it doesn't spread commonProps]
const EXCEPTIONS: [string, string][] = [
  ['FUColorPicker', '`UColorPicker` has no `color` prop, so spreading commonProps would add one it never had'],
  ['FUEditor', 'wraps `UEditor` and its sub-components with a different binding set (only `ui` is shared)'],
]

const excepted = new Map(EXCEPTIONS)

// The real binding, not just the text - a comment mentioning `...commonProps` must not pass.
const SPREAD = /v-bind="\{[^"}]*\.\.\.commonProps[^"}]*\}"/

const wrappedInputs = readdirSync(inputsDir)
  .filter(file => file.endsWith('.vue'))
  .map(file => ({ name: file.replace(/\.vue$/, ''), source: readFileSync(resolve(inputsDir, file), 'utf-8') }))
  .filter(({ source }) => source.includes('useFormKitInput('))

describe('wrapped inputs spread commonProps', () => {
  it('finds the wrapped inputs', () => {
    expect(wrappedInputs.length).toBeGreaterThan(20)
  })

  for (const { name, source } of wrappedInputs) {
    if (excepted.has(name)) {
      it(`${name} stays on the exception list (${excepted.get(name)})`, () => {
        expect(source).not.toMatch(SPREAD)
      })
    }
    else {
      it(`${name} spreads commonProps`, () => {
        expect(source).toMatch(SPREAD)
      })
    }
  }
})
