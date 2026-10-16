import type { ValibotLikeSchema } from '../composables/useFormKitAutoForm'
import type { SchemaIR, SchemaIRKind, SchemaIRRules } from './schemaIR'

// Reads a Valibot 1.x schema structurally (no valibot import) into the
// library-neutral `SchemaIR`. Every valibot-specific access path lives here.

const OPTIONAL_WRAPPER_TYPES = new Set(['optional', 'nullable', 'nullish', 'exact_optional'])
const KINDS = new Set<SchemaIRKind>(['string', 'number', 'boolean', 'date', 'array', 'object'])

function rulesFromPipe(schema: ValibotLikeSchema): SchemaIRRules {
  const rules: SchemaIRRules = {}
  for (const entry of schema.pipe ?? []) {
    if (entry.kind !== 'validation') {
      continue
    }
    const requirement = entry.requirement
    if (entry.type === 'email' || entry.type === 'url') {
      rules.format = entry.type
    }
    else if (typeof requirement === 'number') {
      // Repeated bounds all have to hold, so the tightest one is equivalent.
      if (entry.type === 'min_length') {
        rules.minLength = requirement
      }
      else if (entry.type === 'max_length') {
        rules.maxLength = requirement
      }
      else if (entry.type === 'min_value') {
        rules.min = rules.min === undefined ? requirement : Math.max(rules.min, requirement)
      }
      else if (entry.type === 'max_value') {
        rules.max = rules.max === undefined ? requirement : Math.min(rules.max, requirement)
      }
    }
  }
  return rules
}

export function valibotToIR(entry: ValibotLikeSchema): SchemaIR {
  let schema = entry
  let required = true
  while (OPTIONAL_WRAPPER_TYPES.has(schema.type) && schema.wrapped) {
    required = false
    schema = schema.wrapped
  }
  const kind: SchemaIRKind = KINDS.has(schema.type as SchemaIRKind) ? schema.type as SchemaIRKind : 'unsupported'
  const ir: SchemaIR = { kind, required, rules: rulesFromPipe(schema) }
  // Only the outermost wrapper's default counts; an inner one is never read.
  if (entry.default !== undefined) {
    ir.default = entry.default
  }
  if (kind === 'object' && schema.entries) {
    ir.shape = Object.fromEntries(Object.entries(schema.entries).map(([key, value]) => [key, valibotToIR(value)]))
  }
  if (kind === 'array' && schema.item) {
    ir.element = valibotToIR(schema.item)
  }
  return ir
}
