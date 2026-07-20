import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { nuxtUIInputs, nuxtUIOutputs } from '../src/runtime/formkit/definitions'

const currentDir = dirname(fileURLToPath(import.meta.url))
const inputsDir = resolve(currentDir, '../src/runtime/components/inputs')
const outputsDir = resolve(currentDir, '../src/runtime/components/output')
const formkitIndexSource = readFileSync(resolve(currentDir, '../src/runtime/formkit/index.ts'), 'utf-8')

// These NuxtUI components don't export a dedicated `*Slots` type (confirmed against
// @nuxt/ui's own .d.ts files, not assumed), so there's nothing to augment
// FormKitInputSlots with for them. nuxtUIRepeater is schema-based (definitions/repeater.ts)
// with no wrapped Nuxt UI component, but still gets a minimal FormKitBaseSlots-only entry -
// it is not an exception here.
const NO_SLOTS_TYPE = ['nuxtUIColorPicker', 'nuxtUISlider']

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

const propsKeys = new Set(
  extractInterfaceKeys(formkitIndexSource, 'interface FormKitInputProps', 'interface FormKitInputSlots'),
)
const slotsKeys = new Set(extractInterfaceKeys(formkitIndexSource, 'interface FormKitInputSlots'))

interface RegistrationCompletenessConfig {
  /** Human-readable label used in describe/it titles, e.g. 'input' or 'output'. */
  label: string
  /** `FU*.vue` file names (not full paths) to derive expected registration keys from. */
  componentFileNames: string[]
  /** The `nuxtUIInputs`/`nuxtUIOutputs`-shaped definitions map to check registration against. */
  definitions: Record<string, unknown>
  /** Whether these types are expected to declare a `FormKitInputSlots` entry at all. */
  requireSlots: boolean
  /** Keys allowed to skip the FormKitInputSlots check when `requireSlots` is true (no dedicated `*Slots` export exists for them). */
  noSlotsExceptions?: string[]
}

// Shared by both the input and output completeness suites below - parameterized rather
// than duplicated so the two families of `FU*.vue` components can't drift apart in how
// thoroughly they're checked.
function describeRegistrationCompleteness(config: RegistrationCompletenessConfig) {
  const { label, componentFileNames, definitions, requireSlots, noSlotsExceptions = [] } = config
  const expectedKeys = componentFileNames.map(vueFileToInputKey)

  describe(`formkit ${label} registration completeness`, () => {
    it(`finds FU*.vue files to check against (sanity check, ${label})`, () => {
      expect(expectedKeys.length).toBeGreaterThan(0)
    })

    it.each(expectedKeys)(`registers %s (${label})`, (key) => {
      expect(definitions).toHaveProperty(key)
    })

    it.each(Object.keys(definitions))(
      `declares FormKitInputProps for %s (${label})`,
      (key) => {
        expect(propsKeys.has(key)).toBe(true)
      },
    )

    if (requireSlots) {
      it.each(Object.keys(definitions).filter(key => !noSlotsExceptions.includes(key)))(
        `declares FormKitInputSlots for %s (${label})`,
        (key) => {
          expect(slotsKeys.has(key)).toBe(true)
        },
      )

      it(`does not silently grow the FormKitInputSlots exception list (${label})`, () => {
        for (const key of noSlotsExceptions) {
          expect(Object.keys(definitions)).toContain(key)
          expect(slotsKeys.has(key)).toBe(false)
        }
      })
    }
    else {
      // Confirmed against every current Output component: none declares custom slots.
      // If a future Output component genuinely needs one, this assertion should be
      // replaced with the same requireSlots/noSlotsExceptions shape the input suite uses.
      it(`declares no FormKitInputSlots entries for any ${label} (none define custom slots)`, () => {
        for (const key of Object.keys(definitions)) {
          expect(slotsKeys.has(key)).toBe(false)
        }
      })
    }
  })
}

describeRegistrationCompleteness({
  label: 'input',
  componentFileNames: readdirSync(inputsDir).filter(fileName => fileName.endsWith('.vue')),
  definitions: nuxtUIInputs,
  requireSlots: true,
  noSlotsExceptions: NO_SLOTS_TYPE,
})

describeRegistrationCompleteness({
  label: 'output',
  // FUIcon.vue is a shared helper used by every Output component, not a registered
  // FormKit output type itself - excluded from the scan.
  componentFileNames: readdirSync(outputsDir).filter(fileName => fileName.startsWith('FUOutput') && fileName.endsWith('.vue')),
  definitions: nuxtUIOutputs,
  requireSlots: false,
})
