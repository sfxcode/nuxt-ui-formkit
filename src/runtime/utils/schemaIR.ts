// Library-neutral view of one schema entry. The valibot and zod adapters
// each read their library's schema structurally (no imports) and produce
// this; the shared inference code consumes only this. Internal - not
// re-exported, and kept out of `composables/` (an auto-import dir).

// Adapters stop descending here and treat anything deeper as unsupported - a
// backstop for cyclic schemas whose identity doesn't repeat on the way down.
export const MAX_SCHEMA_DEPTH = 32

export type SchemaIRKind = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'unsupported'

export interface SchemaIRRules {
  format?: 'email' | 'url'
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export interface SchemaIR {
  kind: SchemaIRKind
  /** False for optional/nullable/nullish wrappers (and zod `default`). */
  required: boolean
  /** The already-resolved default; adapters own where it lives in the library's schema. */
  default?: unknown
  rules: SchemaIRRules
  /** `kind: 'object'` only. */
  shape?: Record<string, SchemaIR>
  /** `kind: 'array'` only. */
  element?: SchemaIR
}

/** An array whose element is an object with a known shape becomes a repeater. */
export function isRepeaterItem(ir: SchemaIR): ir is SchemaIR & { kind: 'array', element: SchemaIR & { kind: 'object', shape: Record<string, SchemaIR> } } {
  return ir.kind === 'array' && ir.element?.kind === 'object' && !!ir.element.shape
}
