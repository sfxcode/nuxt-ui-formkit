import type { FormKitSchemaNode } from '@formkit/core'

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
      return {
        $formkit: 'nuxtUIRepeater',
        name,
        label,
        newItem: blankItem(first),
        children: inferNodes(first, overrides, path),
      }
    }
    return { $formkit: 'nuxtUIInputTags', name, label }
  }
  if (isPlainObject(value)) {
    return { $formkit: 'group', name, children: inferNodes(value, overrides, path) }
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

const OPTIONAL_WRAPPER_TYPES = new Set(['optional', 'nullable', 'nullish', 'exact_optional'])

function unwrapValibot(entry: ValibotLikeSchema): { schema: ValibotLikeSchema, required: boolean } {
  let schema = entry
  let required = true
  while (OPTIONAL_WRAPPER_TYPES.has(schema.type) && schema.wrapped) {
    required = false
    schema = schema.wrapped
  }
  return { schema, required }
}

function deriveValibotValidation(schema: ValibotLikeSchema, required: boolean): string | undefined {
  const rules: string[] = []
  // `required` on a switch would force the boolean to true, which is not
  // what a plain `v.boolean()` entry means.
  if (required && schema.type !== 'boolean') {
    rules.push('required')
  }
  let minLength: number | undefined
  let maxLength: number | undefined
  for (const entry of schema.pipe ?? []) {
    if (entry.kind !== 'validation') {
      continue
    }
    if (entry.type === 'email' || entry.type === 'url') {
      rules.push(entry.type)
    }
    else if (entry.type === 'min_length' && typeof entry.requirement === 'number') {
      minLength = entry.requirement
    }
    else if (entry.type === 'max_length' && typeof entry.requirement === 'number') {
      maxLength = entry.requirement
    }
    else if (entry.type === 'min_value' && typeof entry.requirement === 'number') {
      rules.push(`min:${entry.requirement}`)
    }
    else if (entry.type === 'max_value' && typeof entry.requirement === 'number') {
      rules.push(`max:${entry.requirement}`)
    }
  }
  if (maxLength !== undefined) {
    rules.push(`length:${minLength ?? 0},${maxLength}`)
  }
  else if (minLength !== undefined) {
    rules.push(`length:${minLength}`)
  }
  return rules.length ? rules.join('|') : undefined
}

function blankValueFromValibot(entry: ValibotLikeSchema): unknown {
  if (entry.default !== undefined) {
    return entry.default
  }
  const { schema } = unwrapValibot(entry)
  switch (schema.type) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'array':
      return []
    case 'object':
      return schema.entries ? blankItemFromValibot(schema.entries) : {}
    default:
      return null
  }
}

function blankItemFromValibot(entries: Record<string, ValibotLikeSchema>): Record<string, unknown> {
  const blank: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(entries)) {
    blank[key] = blankValueFromValibot(entry)
  }
  return blank
}

function inferValibotNode(name: string, entry: ValibotLikeSchema, overrides: AutoFormOverrides | undefined, path: string): AutoFormSchemaNode | undefined {
  const { schema, required } = unwrapValibot(entry)
  const label = humanizeKey(name)
  const validation = deriveValibotValidation(schema, required)
  const base: AutoFormSchemaNode = validation ? { name, label, validation } : { name, label }
  switch (schema.type) {
    case 'string':
      return { $formkit: 'nuxtUIInput', ...base }
    case 'number':
      return { $formkit: 'nuxtUIInputNumber', ...base }
    case 'boolean':
      return { $formkit: 'nuxtUISwitch', ...base }
    case 'date':
      return { $formkit: 'nuxtUIInputDate', ...base, valueType: 'date' }
    case 'array': {
      const item = schema.item ? unwrapValibot(schema.item).schema : undefined
      if (item?.type === 'object' && item.entries) {
        return {
          $formkit: 'nuxtUIRepeater',
          ...base,
          newItem: blankItemFromValibot(item.entries),
          children: inferValibotNodes(item.entries, overrides, path),
        }
      }
      return { $formkit: 'nuxtUIInputTags', ...base }
    }
    case 'object':
      return schema.entries
        ? { $formkit: 'group', name, children: inferValibotNodes(schema.entries, overrides, path) }
        : undefined
    default:
      return undefined
  }
}

function inferValibotNodes(entries: Record<string, ValibotLikeSchema>, overrides?: AutoFormOverrides, pathPrefix = ''): AutoFormSchemaNode[] {
  return buildNodes(entries, (key, entry, path) => inferValibotNode(key, entry, overrides, path), overrides, pathPrefix)
}

export function inferFormSchemaFromValibot(schema: object, overrides?: AutoFormOverrides): FormKitSchemaNode[] {
  const root = schema as ValibotLikeSchema
  if (root.kind !== 'schema' || root.type !== 'object' || !root.entries) {
    return []
  }
  return inferValibotNodes(root.entries, overrides) as FormKitSchemaNode[]
}

export function useFormKitAutoForm() {
  return { inferFormSchema, inferFormSchemaFromValibot }
}
