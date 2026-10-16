import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { findUnguardedBrowserGlobals } from './support/findBrowserGlobals'

// A page can be server-rendered, and there `window`, `document`, `localStorage` and friends do not
// exist. Anything in `src/runtime` that can run during a server render must not touch one unguarded.
// The end-to-end SSR run (`npm run test:e2e:ssr`) is the real check; this one is fast, runs in
// `npm test`, and points at the line.
const runtimeDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../src/runtime')

// Files that use a browser global in a way the checker cannot see is safe, with the reason. Anything
// not listed here must keep browser globals inside a client-only lifecycle hook, an
// `import.meta.client` branch or a `typeof` check.
const EXCEPTIONS: [file: string, reason: string][] = [
  ['formkit/plugins/autosave.ts', 'every `localStorage` read and write is inside a helper wrapped in try/catch, and the addons plugin it wraps returns without `window`; pinned by the /ssr-autosave end-to-end entry'],
]

function filesIn(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const full = join(directory, name)
    if (statSync(full).isDirectory())
      return filesIn(full)
    return /\.(?:ts|vue)$/.test(name) && !name.endsWith('.d.ts') ? [full] : []
  })
}

describe('findUnguardedBrowserGlobals', () => {
  const find = (source: string, fileName = 'sample.ts') => findUnguardedBrowserGlobals(source, fileName).map(use => `${use.name}@${use.line}`)

  it('finds a browser global used at the top level or in setup', () => {
    expect(find('const width = window.innerWidth')).toEqual(['window@1'])
    expect(find('export function useThing() {\n  return localStorage.getItem("k")\n}')).toEqual(['localStorage@2'])
    expect(find('<script setup>\nconst width = window.innerWidth\n</script>', 'Sample.vue')).toEqual(['window@2'])
  })

  it('finds every kind of reference, not only member access', () => {
    expect(find('const target = document\nconst ok = el instanceof HTMLElement')).toEqual(['document@1', 'HTMLElement@2'])
    expect(find('const observer = new ResizeObserver(() => {})')).toEqual(['ResizeObserver@1'])
  })

  it('allows a client-only lifecycle hook', () => {
    expect(find('onMounted(() => window.addEventListener("x", f))\nonBeforeUnmount(() => { window.removeEventListener("x", f) })')).toEqual([])
    expect(find('onMounted(() => {\n  const run = () => document.title\n  run()\n})')).toEqual([])
  })

  it('allows an import.meta.client branch and a typeof check', () => {
    expect(find('if (import.meta.client) {\n  window.scrollTo(0, 0)\n}')).toEqual([])
    expect(find('const width = import.meta.client ? window.innerWidth : 0')).toEqual([])
    expect(find('const width = import.meta.client && window.innerWidth')).toEqual([])
    expect(find('if (typeof window === "undefined") return\nconst ok = typeof localStorage !== "undefined"')).toEqual([])
  })

  it('does not allow the else branch of an import.meta.client check, or a server check', () => {
    expect(find('if (import.meta.client) {\n  a()\n}\nelse {\n  window.x\n}')).toEqual(['window@5'])
    expect(find('if (import.meta.server) {\n  window.x\n}')).toEqual(['window@2'])
  })

  it('ignores types, property names, declarations and comments', () => {
    expect(find('const el = ref<HTMLElement>()\nconst typed = target as HTMLElement | null\nfunction f(e: HTMLElement) {}')).toEqual([])
    expect(find('const place = foo.window\nconst { document: doc } = options\nconst obj = { window: 1 }')).toEqual([])
    expect(find('// uses window here\n/* and document */\nconst s = "window"')).toEqual([])
  })

  it('looks only at the script of a .vue file', () => {
    expect(find('<template><p>{{ window.x }}</p></template>\n<script setup>\nconst a = 1\n</script>', 'Sample.vue')).toEqual([])
  })
})

describe('src/runtime browser globals', () => {
  const files = filesIn(runtimeDirectory)

  it('finds the runtime files to check (sanity)', () => {
    expect(files.length).toBeGreaterThan(60)
  })

  it('lists no exception for a file that does not exist or no longer needs one', () => {
    for (const [file] of EXCEPTIONS) {
      const path = join(runtimeDirectory, file)
      expect(() => statSync(path), `${file} is on the exception list but does not exist`).not.toThrow()
      expect(findUnguardedBrowserGlobals(readFileSync(path, 'utf-8'), path), `${file} no longer needs its exception - remove it`).not.toEqual([])
    }
  })

  const exceptionFiles = new Set(EXCEPTIONS.map(([file]) => file))
  for (const file of files) {
    const name = relative(runtimeDirectory, file)
    if (exceptionFiles.has(name))
      continue
    it(`${name} touches no browser global outside a client-only hook`, () => {
      expect(findUnguardedBrowserGlobals(readFileSync(file, 'utf-8'), file)).toEqual([])
    })
  }
})
