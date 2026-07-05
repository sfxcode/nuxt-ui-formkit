import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { nuxtUIInputs } from '../src/runtime/formkit/definitions'

const currentDir = dirname(fileURLToPath(import.meta.url))
const inputsDir = resolve(currentDir, '../src/runtime/components/inputs')
const formkitIndexSource = readFileSync(resolve(currentDir, '../src/runtime/formkit/index.ts'), 'utf-8')

// nuxtUIRepeater is built directly from schema primitives in definitions/repeater.ts,
// not a wrapper around a Nuxt UI .vue component - it has no FU*.vue file and is
// intentionally absent from FormKitInputProps (and, by extension, FormKitInputSlots).
const NO_VUE_FILE = ['nuxtUIRepeater']

// These NuxtUI components don't export a dedicated `*Slots` type, so there's nothing
// to augment FormKitInputSlots with for them.
const NO_SLOTS_TYPE = ['nuxtUIRepeater', 'nuxtUIColorPicker', 'nuxtUIPinInput', 'nuxtUISlider']

function vueFileToInputKey(fileName: string): string {
  return fileName.replace(/^FU/, 'nuxtUI').replace(/\.vue$/, '')
}

function extractInterfaceKeys(source: string, startMarker: string, endMarker?: string): string[] {
  const startIndex = source.indexOf(startMarker)
  if (startIndex === -1) {
    throw new Error(`Could not find "${startMarker}" in src/runtime/formkit/index.ts`)
  }
  const afterStart = source.slice(startIndex + startMarker.length)
  const endIndex = endMarker ? afterStart.indexOf(endMarker) : -1
  const body = endIndex === -1 ? afterStart : afterStart.slice(0, endIndex)
  return [...body.matchAll(/^ {4}(\w+):/gm)].map(match => match[1] as string)
}

describe('formkit input registration completeness', () => {
  const expectedInputKeys = readdirSync(inputsDir)
    .filter(fileName => fileName.endsWith('.vue'))
    .map(vueFileToInputKey)

  const propsKeys = new Set(
    extractInterfaceKeys(formkitIndexSource, 'interface FormKitInputProps', 'interface FormKitInputSlots'),
  )
  const slotsKeys = new Set(extractInterfaceKeys(formkitIndexSource, 'interface FormKitInputSlots'))

  it('finds FU*.vue files to check against (sanity check)', () => {
    expect(expectedInputKeys.length).toBeGreaterThan(0)
  })

  it.each(expectedInputKeys)('registers %s in nuxtUIInputs', (key) => {
    expect(nuxtUIInputs).toHaveProperty(key)
  })

  it.each(Object.keys(nuxtUIInputs).filter(key => !NO_VUE_FILE.includes(key)))(
    'declares FormKitInputProps for %s',
    (key) => {
      expect(propsKeys.has(key)).toBe(true)
    },
  )

  it.each(Object.keys(nuxtUIInputs).filter(key => !NO_SLOTS_TYPE.includes(key)))(
    'declares FormKitInputSlots for %s',
    (key) => {
      expect(slotsKeys.has(key)).toBe(true)
    },
  )

  it('does not silently grow the FormKitInputProps exception list', () => {
    for (const key of NO_VUE_FILE) {
      expect(Object.keys(nuxtUIInputs)).toContain(key)
      expect(propsKeys.has(key)).toBe(false)
    }
  })

  it('does not silently grow the FormKitInputSlots exception list', () => {
    for (const key of NO_SLOTS_TYPE) {
      expect(Object.keys(nuxtUIInputs)).toContain(key)
      expect(slotsKeys.has(key)).toBe(false)
    }
  })
})
