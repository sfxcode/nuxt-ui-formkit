import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// A schema's `$cmp: 'UButton'` resolves by *string* against Vue's global
// component registry, and an unregistered name renders as an unstyled custom
// element with no warning and no error. The only place those names get
// registered is `runtime/plugin.ts`, so a new `addComponent('UFoo', ...)` in a
// definition silently breaks unless someone also edits the plugin. This turns
// that "remember to register it" convention into a failing test.
const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../src/runtime')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory())
      return sourceFiles(path)
    return /\.(?:ts|vue)$/.test(entry) ? [path] : []
  })
}

// Names the runtime references as a schema component: `addComponent('UName', ...)`
// (the `useFormKitSchema` helper) or a literal `$cmp: 'UName'`.
function referencedComponents(): Map<string, string[]> {
  const found = new Map<string, string[]>()
  for (const file of sourceFiles(srcDir)) {
    const source = readFileSync(file, 'utf-8')
    for (const match of source.matchAll(/(?:addComponent\(\s*|\$cmp:\s*)'(U[A-Za-z]+)'/g)) {
      const name = match[1] as string
      found.set(name, [...(found.get(name) ?? []), file.replace(`${srcDir}/`, '')])
    }
  }
  return found
}

function registeredComponents(): Set<string> {
  const source = readFileSync(join(srcDir, 'plugin.ts'), 'utf-8')
  return new Set([...source.matchAll(/\.component\(\s*'([^']+)'/g)].map(match => match[1] as string))
}

describe('runtime/plugin.ts component registration', () => {
  it('finds both the references and the registrations (sanity check, not vacuous)', () => {
    expect([...referencedComponents().keys()]).toEqual(expect.arrayContaining(['UButton', 'UIcon', 'UTabs']))
    expect(registeredComponents().size).toBeGreaterThan(0)
  })

  it('registers every Nuxt UI component a schema references by string', () => {
    const registered = registeredComponents()
    const missing = [...referencedComponents()]
      .filter(([name]) => !registered.has(name))
      .map(([name, files]) => `${name} (used in ${[...new Set(files)].join(', ')})`)

    expect(missing).toEqual([])
  })
})
