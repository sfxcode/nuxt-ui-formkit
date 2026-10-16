import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// FormKit strips every name in a definition's `props` array out of `attrs`, so
// the two halves of that contract must agree or a prop silently stops working:
//   - a `context.X` read for an X that isn't listed never receives the
//     consumer's value (it stays in `attrs` and is overridden by the explicit
//     binding), and
//   - a listed X that nothing reads is swallowed with no effect at all.
// See brain/notes/formkit-input-registration.md.

const currentDir = dirname(fileURLToPath(import.meta.url))
const definitionsSource = readFileSync(resolve(currentDir, '../src/runtime/formkit/definitions/input.ts'), 'utf-8')
const inputComposableSource = readFileSync(resolve(currentDir, '../src/runtime/utils/useFormKitInput.ts'), 'utf-8')

// FormKit's own context fields (or fields every component gets from
// `useFormKitInput`), which never need a `props` entry.
const CONTEXT_BUILTINS = new Set(['attrs', 'node', 'id', 'disabled', 'label', 'help', 'value', '_value', 'handlers', 'state', 'slots', 'options', 'classes', 'messages', 'fns', 'ui', 'name', 'color'])

// Listed props that are legitimately read by the shared composable rather
// than the component itself.
const READ_BY_COMPOSABLE = new Set(['color', 'disabled', 'name', 'options', 'size', 'ui'])

interface DefinitionInfo {
  component: string
  props: string[]
}

function parseDefinitions(): DefinitionInfo[] {
  return [...definitionsSource.matchAll(/export const \w+Definition[^=]*=\s*createInput\((\w+),\s*\{(.*?)\n\}\)/gs)].map((match) => {
    const body = match[2] as string
    const propsMatch = body.match(/props:\s*\[(.*?)\]/s)
    return {
      component: match[1] as string,
      props: propsMatch ? [...(propsMatch[1] as string).matchAll(/'([^']+)'/g)].map(m => m[1] as string) : [],
    }
  })
}

const definitions = parseDefinitions()

function contextReads(component: string): Set<string> {
  const source = readFileSync(resolve(currentDir, `../src/runtime/components/inputs/${component}.vue`), 'utf-8')
  return new Set([
    ...[...source.matchAll(/context\??\.(\w+)/g)].map(m => m[1] as string),
    ...[...source.matchAll(/context\??\[['"](\w+)/g)].map(m => m[1] as string),
  ])
}

describe('input definition props vs component context reads', () => {
  it('finds every input definition', () => {
    expect(definitions.length).toBeGreaterThanOrEqual(22)
  })

  it('the shared composable really reads the props it is trusted with', () => {
    for (const prop of ['color', 'options']) {
      expect(inputComposableSource, `useFormKitInput should read context.${prop}`).toMatch(new RegExp(`context\\??\\.${prop}\\b`))
    }
  })

  for (const { component, props } of definitions) {
    describe(component, () => {
      const reads = contextReads(component)

      it('lists every non-built-in context field it reads', () => {
        const unlisted = [...reads].filter(read => !props.includes(read) && !CONTEXT_BUILTINS.has(read))
        expect(unlisted, `${component} reads context.${unlisted.join(', context.')} but the definition's props doesn't list it, so a consumer's value never arrives`).toEqual([])
      })

      // `context.type` is FormKit's own node type (e.g. 'nuxtUICalendar'), set
      // by @formkit/vue regardless of any consumer `type` prop - a component
      // reading it as its own option (e.g. a calendar/pin-input mode) gets the
      // FormKit type string instead. Use a distinct prop name.
      it('does not treat FormKit\'s own context.type as a component option', () => {
        expect([...reads]).not.toContain('type')
      })

      // `context.items` is FormKit's own list-item id array, so a declared
      // `items` prop is shadowed by it and strips the consumer's `items` out of
      // `attrs`, leaving nothing for `useFormKitInput`'s `attrs.items` fallback.
      it('does not declare FormKit-reserved context names as props', () => {
        expect(props.filter(prop => prop === 'items')).toEqual([])
      })

      it('reads every prop it lists', () => {
        const dead = props.filter(prop => !reads.has(prop) && !READ_BY_COMPOSABLE.has(prop))
        expect(dead, `${component}'s definition lists ${dead.join(', ')} but the component never reads it, so a consumer's value is swallowed`).toEqual([])
      })
    })
  }
})
