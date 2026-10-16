import type { FormKitSchemaNode } from '@formkit/core'
import { isDateValue } from '../utils/dateValueConversion'
import type { SchemaIR } from '../utils/schemaIR'
import { buildGroupNode, buildRepeaterNode, nodeFromIR } from '../utils/schemaInference'
import { valibotToIR } from '../utils/valibotAdapter'
import { zodToIR } from '../utils/zodAdapter'

// `false` removes an inferred field; `true` keeps it as inferred (a no-op,
// so computed visibility maps can toggle without rebuilding the object).
export type AutoFormOverrides = Record<string, Record<string, unknown> | boolean>

type AutoFormSchemaNode = Record<string, unknown>

// Anchored to full YYYY-MM-DD (optionally a full ISO-8601 datetime) so plain
// numeric strings like '123' or partial dates never become date inputs.
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/

function isIsoDateString(value: string): boolean {
  return ISO_DATE_PATTERN.test(value) && !Number.isNaN(Date.parse(value))
}

function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

// Blanked values seed nuxtUIRepeater's `newItem` so freshly-inserted rows
// start empty but keep the inferred key shape.
function blankValue(value: unknown): unknown {
  if (typeof value === 'boolean') {
    return false
  }
  if (typeof value === 'number') {
    return 0
  }
  if (typeof value === 'string') {
    return isIsoDateString(value) ? null : ''
  }
  if (Array.isArray(value)) {
    return []
  }
  if (isPlainObject(value)) {
    return blankItem(value)
  }
  return null
}

function blankItem(item: Record<string, unknown>): Record<string, unknown> {
  const blank: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(item)) {
    blank[key] = blankValue(value)
  }
  return blank
}

function inferNode(name: string, value: unknown, overrides: AutoFormOverrides | undefined, path: string): AutoFormSchemaNode | undefined {
  const label = humanizeKey(name)
  if (typeof value === 'boolean') {
    return { $formkit: 'nuxtUISwitch', name, label }
  }
  if (typeof value === 'number') {
    return { $formkit: 'nuxtUIInputNumber', name, label }
  }
  if (value instanceof Date) {
    return { $formkit: 'nuxtUIInputDate', name, label, valueType: 'date' }
  }
  // `@internationalized/date`'s CalendarDate/CalendarDateTime/ZonedDateTime -
  // the native value type UInputDate/UCalendar work with directly, before
  // any JS Date/ISO conversion. `isPlainObject` below would reject these
  // (their prototype isn't Object.prototype) and they'd otherwise fall
  // through to `undefined`, silently dropping the field from the schema.
  if (isDateValue(value)) {
    return { $formkit: 'nuxtUIInputDate', name, label, valueType: 'calendar' }
  }
  if (typeof value === 'string') {
    if (isIsoDateString(value)) {
      return { $formkit: 'nuxtUIInputDate', name, label, valueType: 'iso' }
    }
    if (value.includes('\n')) {
      return { $formkit: 'nuxtUITextarea', name, label }
    }
    return { $formkit: 'nuxtUIInput', name, label }
  }
  if (Array.isArray(value)) {
    const [first] = value
    if (isPlainObject(first)) {
      return buildRepeaterNode({ name, label }, blankItem(first), inferNodes(first, overrides, path))
    }
    return { $formkit: 'nuxtUIInputTags', name, label }
  }
  if (isPlainObject(value)) {
    return buildGroupNode(name, inferNodes(value, overrides, path))
  }
  return undefined
}

function isDirectChildPath(path: string, prefix: string): boolean {
  if (!prefix) {
    return !path.includes('.')
  }
  return path.startsWith(`${prefix}.`) && !path.slice(prefix.length + 1).includes('.')
}

function buildNodes<T>(
  source: Record<string, T>,
  inferEntry: (name: string, value: T, path: string) => AutoFormSchemaNode | undefined,
  overrides?: AutoFormOverrides,
  pathPrefix = '',
): AutoFormSchemaNode[] {
  const nodes: AutoFormSchemaNode[] = []
  const consumedPaths = new Set<string>()
  for (const [key, value] of Object.entries(source)) {
    const path = pathPrefix ? `${pathPrefix}.${key}` : key
    const override = overrides?.[path]
    if (override !== undefined) {
      consumedPaths.add(path)
    }
    if (override === false) {
      continue
    }
    const node = inferEntry(key, value, path)
    if (override && override !== true) {
      nodes.push({ $formkit: 'nuxtUIInput', name: key, label: humanizeKey(key), ...node, ...override })
    }
    else if (node) {
      nodes.push(node)
    }
  }
  if (overrides) {
    for (const [path, override] of Object.entries(overrides)) {
      if (typeof override === 'boolean' || consumedPaths.has(path) || !isDirectChildPath(path, pathPrefix)) {
        continue
      }
      const key = pathPrefix ? path.slice(pathPrefix.length + 1) : path
      nodes.push({ $formkit: 'nuxtUIInput', name: key, label: humanizeKey(key), ...override })
    }
  }
  return nodes
}

function inferNodes(data: Record<string, unknown>, overrides?: AutoFormOverrides, pathPrefix = ''): AutoFormSchemaNode[] {
  return buildNodes(data, (key, value, path) => inferNode(key, value, overrides, path), overrides, pathPrefix)
}

export function inferFormSchema(data: Record<string, unknown>, overrides?: AutoFormOverrides): FormKitSchemaNode[] {
  return inferNodes(data, overrides) as FormKitSchemaNode[]
}

function isFilled(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false
  }
  if (typeof value === 'string') {
    return value !== ''
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return true
}

// Column-wise view of the samples: one array per key (union across all
// samples), positionally aligned so a sample missing the key contributes
// `undefined` - that gap is what makes the field non-required.
function transposeSamples(samples: Record<string, unknown>[]): Record<string, unknown[]> {
  const columns: Record<string, unknown[]> = {}
  for (const sample of samples) {
    for (const key of Object.keys(sample)) {
      columns[key] ??= samples.map(entry => entry[key])
    }
  }
  return columns
}

function inferSampleNode(name: string, values: unknown[], overrides: AutoFormOverrides | undefined, path: string): AutoFormSchemaNode | undefined {
  const presentValues = values.filter(value => value !== undefined && value !== null)
  if (presentValues.length === 0) {
    return undefined
  }
  const filledValues = presentValues.filter(isFilled)
  const required = filledValues.length === values.length
  // Falling back to the first present value keeps e.g. an all-empty-string
  // column inferrable as a text input - it just won't be required.
  const representative = filledValues[0] ?? presentValues[0]
  const label = humanizeKey(name)
  // `required` on a switch would force the boolean to true, which is not
  // what an always-present boolean sample value means.
  const validation = required && typeof representative !== 'boolean' ? 'required' : undefined
  const base: AutoFormSchemaNode = validation ? { name, label, validation } : { name, label }
  if (typeof representative === 'boolean') {
    return { $formkit: 'nuxtUISwitch', ...base }
  }
  if (typeof representative === 'number') {
    return { $formkit: 'nuxtUIInputNumber', ...base }
  }
  if (representative instanceof Date) {
    return { $formkit: 'nuxtUIInputDate', ...base, valueType: 'date' }
  }
  if (isDateValue(representative)) {
    return { $formkit: 'nuxtUIInputDate', ...base, valueType: 'calendar' }
  }
  if (typeof representative === 'string') {
    if (isIsoDateString(representative)) {
      return { $formkit: 'nuxtUIInputDate', ...base, valueType: 'iso' }
    }
    if (representative.includes('\n')) {
      return { $formkit: 'nuxtUITextarea', ...base }
    }
    return { $formkit: 'nuxtUIInput', ...base }
  }
  if (Array.isArray(representative)) {
    const [first] = representative
    if (isPlainObject(first)) {
      // Rows from every sample's array, not just the representative's -
      // a key that only appears in another sample's rows would otherwise
      // be missed.
      const rows = presentValues.filter(Array.isArray).flat().filter(isPlainObject)
      return buildRepeaterNode(base, blankItem(rows[0] ?? first), inferSampleNodes(rows, overrides, path))
    }
    return { $formkit: 'nuxtUIInputTags', ...base }
  }
  if (isPlainObject(representative)) {
    return buildGroupNode(name, inferSampleNodes(presentValues.filter(isPlainObject), overrides, path))
  }
  return undefined
}

function inferSampleNodes(samples: Record<string, unknown>[], overrides?: AutoFormOverrides, pathPrefix = ''): AutoFormSchemaNode[] {
  return buildNodes(transposeSamples(samples), (key, values, path) => inferSampleNode(key, values, overrides, path), overrides, pathPrefix)
}

export function inferFormSchemaFromSamples(samples: Record<string, unknown>[], overrides?: AutoFormOverrides): FormKitSchemaNode[] {
  if (!Array.isArray(samples)) {
    return []
  }
  const records = samples.filter(isPlainObject)
  if (records.length === 0) {
    return []
  }
  return inferSampleNodes(records, overrides) as FormKitSchemaNode[]
}

// Structural duck-type for introspecting Valibot 1.x schemas without
// importing valibot: every construct is plain data (kind/type plus one
// shape field), confirmed against valibot@1.4.2.
export interface ValibotLikePipeEntry {
  kind: string
  type: string
  requirement?: unknown
}

export interface ValibotLikeSchema {
  kind: 'schema'
  type: string
  entries?: Record<string, ValibotLikeSchema>
  item?: ValibotLikeSchema
  wrapped?: ValibotLikeSchema
  default?: unknown
  pipe?: readonly ValibotLikePipeEntry[]
}

// Both libraries are read by their adapter into the same `SchemaIR`, so
// the inference below is written once and can't drift between them.
function inferIRNodes(shape: Record<string, SchemaIR>, overrides?: AutoFormOverrides, pathPrefix = ''): AutoFormSchemaNode[] {
  return buildNodes(
    shape,
    (key, entry, path) => nodeFromIR(key, humanizeKey(key), entry, childShape => inferIRNodes(childShape, overrides, path)),
    overrides,
    pathPrefix,
  )
}

export function inferFormSchemaFromValibot(schema: object, overrides?: AutoFormOverrides): FormKitSchemaNode[] {
  const root = schema as ValibotLikeSchema
  if (root.kind !== 'schema' || root.type !== 'object' || !root.entries) {
    return []
  }
  return inferIRNodes(valibotToIR(root).shape!, overrides) as FormKitSchemaNode[]
}

// Structural duck-type for introspecting Zod 4.x schemas without importing
// zod. Zod's internal `_zod.def` shape differs even between a chained
// `.string().email()` (format nested in a `checks` entry) and the v4
// top-level shorthand `z.email()` (format inlined on the schema's own def) -
// rather than replicate both, this targets Zod's own public instance
// getters (`.type`, `.shape`, `.element`, `.unwrap()`, `.minLength`,
// `.format`, ...), which normalize that difference already and read as the
// more stable surface. Confirmed against zod@4.4.3.
export interface ZodLikeSchema {
  type: string
  shape?: Record<string, ZodLikeSchema>
  element?: ZodLikeSchema
  minLength?: number | null
  maxLength?: number | null
  minValue?: number | null
  maxValue?: number | null
  format?: string | null
  unwrap?: () => ZodLikeSchema
  def?: { defaultValue?: unknown }
}

export function inferFormSchemaFromZod(schema: object, overrides?: AutoFormOverrides): FormKitSchemaNode[] {
  const root = schema as ZodLikeSchema
  if (root.type !== 'object' || !root.shape) {
    return []
  }
  return inferIRNodes(zodToIR(root).shape!, overrides) as FormKitSchemaNode[]
}

export function useFormKitAutoForm() {
  return { inferFormSchema, inferFormSchemaFromSamples, inferFormSchemaFromValibot, inferFormSchemaFromZod }
}
