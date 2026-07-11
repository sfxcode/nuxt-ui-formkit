import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const currentDir = dirname(fileURLToPath(import.meta.url))
const inputsDir = resolve(currentDir, '../src/runtime/components/inputs')

describe('ui prop wiring across FU*.vue input components', () => {
  it('no FU*.vue input component reads the poisoned context.ui field', () => {
    const vueFiles = readdirSync(inputsDir).filter(fileName => fileName.endsWith('.vue'))
    expect(vueFiles.length).toBeGreaterThan(0)

    const offenders = vueFiles.filter((fileName) => {
      const source = readFileSync(resolve(inputsDir, fileName), 'utf-8')
      return source.includes('context.ui')
    })

    expect(offenders).toEqual([])
  })
})
