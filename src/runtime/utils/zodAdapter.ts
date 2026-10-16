import type { ZodLikeSchema } from '../composables/useFormKitAutoForm'
import type { SchemaIR, SchemaIRKind, SchemaIRRules } from './schemaIR'

// Reads a Zod 4.x schema through its public instance getters (no zod import)
// into the library-neutral `SchemaIR`. Every zod-specific access path lives here.

const UNWRAPPABLE_TYPES = new Set(['optional', 'nullable', 'nullish', 'default'])
const KINDS = new Set<SchemaIRKind>(['string', 'number', 'boolean', 'date', 'array', 'object'])

// Unconstrained numbers report +-Infinity; `.int()` reports the finite
// safe-integer limits. Both mean "no bound".
function isNumericBound(value: unknown): value is number {
  return Number.isFinite(value)
    && value !== Number.MIN_SAFE_INTEGER
    && value !== Number.MAX_SAFE_INTEGER
}

function rulesFromGetters(schema: ZodLikeSchema): SchemaIRRules {
  const rules: SchemaIRRules = {}
  if (schema.format === 'email' || schema.format === 'url') {
    rules.format = schema.format
  }
  if (isNumericBound(schema.minValue)) {
    rules.min = schema.minValue
  }
  if (isNumericBound(schema.maxValue)) {
    rules.max = schema.maxValue
  }
  if (typeof schema.minLength === 'number') {
    rules.minLength = schema.minLength
  }
  if (typeof schema.maxLength === 'number') {
    rules.maxLength = schema.maxLength
  }
  return rules
}

// Zod arrays expose no `minLength`/`maxLength` getters (only strings do); their
// bounds live in `def.checks`. Repeated bounds all have to hold, so the
// tightest wins - the same as the getters report for strings.
function rulesFromArrayChecks(schema: ZodLikeSchema, rules: SchemaIRRules): void {
  for (const check of schema.def?.checks ?? []) {
    const def = check._zod?.def
    if (def?.check === 'min_length' && typeof def.minimum === 'number') {
      rules.minLength = rules.minLength === undefined ? def.minimum : Math.max(rules.minLength, def.minimum)
    }
    else if (def?.check === 'max_length' && typeof def.maximum === 'number') {
      rules.maxLength = rules.maxLength === undefined ? def.maximum : Math.min(rules.maxLength, def.maximum)
    }
  }
}

export function zodToIR(entry: ZodLikeSchema): SchemaIR {
  // `.default()` can sit anywhere in an `.optional()`/`.nullable()` chain
  // depending on call order, so walk the whole chain for it.
  let schema = entry
  let required = true
  let defaultValue: unknown
  while (true) {
    if (defaultValue === undefined && schema.def?.defaultValue !== undefined) {
      defaultValue = schema.def.defaultValue
    }
    if (!UNWRAPPABLE_TYPES.has(schema.type) || typeof schema.unwrap !== 'function') {
      break
    }
    required = false
    schema = schema.unwrap()
  }
  const kind: SchemaIRKind = KINDS.has(schema.type as SchemaIRKind) ? schema.type as SchemaIRKind : 'unsupported'
  const ir: SchemaIR = { kind, required, rules: rulesFromGetters(schema) }
  if (defaultValue !== undefined) {
    ir.default = defaultValue
  }
  if (kind === 'object' && schema.shape) {
    ir.shape = Object.fromEntries(Object.entries(schema.shape).map(([key, value]) => [key, zodToIR(value)]))
  }
  if (kind === 'array') {
    rulesFromArrayChecks(schema, ir.rules)
    if (schema.element) {
      ir.element = zodToIR(schema.element)
    }
  }
  return ir
}
