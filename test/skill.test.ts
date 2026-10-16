import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { nuxtUIInputs, nuxtUIOutputs } from '../src/runtime/formkit/definitions'
import * as formkit from '../src/runtime/formkit'

// `skills/nuxt-ui-formkit/SKILL.md` ships in the package for AI coding assistants. A skill copies
// facts, and facts go stale: this fails when it names a type or helper that no longer exists.
const skill = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../skills/nuxt-ui-formkit/SKILL.md'), 'utf8')

describe('skills/nuxt-ui-formkit/SKILL.md', () => {
  it('has the frontmatter a skill needs', () => {
    expect(skill).toMatch(/^---\nname: nuxt-ui-formkit\ndescription: .{40,}\n---\n/)
  })

  it('only names input and output types that are registered', () => {
    const registered = new Set([...Object.keys(nuxtUIInputs), ...Object.keys(nuxtUIOutputs)])
    const named = [...new Set(skill.match(/\bnuxtUI[A-Za-z]+\b/g))]
    expect(named.length).toBeGreaterThan(0)
    expect(named.filter(name => !registered.has(name))).toEqual([])
  })

  it('only names helpers that the formkit entry exports', () => {
    for (const name of ['createNuxtUiFormkitConfig', 'createAutoAnimatePlugin'])
      expect(skill, `${name} is mentioned`).toContain(name)
    for (const name of ['createNuxtUiFormkitConfig', 'createAutoAnimatePlugin'])
      expect(formkit, `${name} is exported`).toHaveProperty(name)
  })
})
