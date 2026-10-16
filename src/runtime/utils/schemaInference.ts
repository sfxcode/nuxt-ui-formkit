import type { SchemaIR } from './schemaIR'
import { isRepeaterItem } from './schemaIR'

// Inference written once against the library-neutral `SchemaIR`, so the
// valibot and zod engines can't drift apart. Pure: no schema-library access
// (that's the adapters') and no override handling (the caller's `buildNodes`).

export type AutoFormSchemaNode = Record<string, unknown>

// `nuxtUIRepeater`'s clone/delete buttons are opt-in (hidden unless a
// consumer explicitly passes these props), and its per-row button group has
// no default layout - a schema-free repeater still needs to be directly
// usable without hand-authoring these three props onto every inferred
// array-of-objects field, so they're the inferred default. `overrides` can
// still turn any of this off per field.
export const REPEATER_BUTTON_DEFAULTS = {
  displayCloneButton: true,
  displayDeleteButton: true,
  buttonGroupClass: 'flex gap-2 justify-end',
}

export function buildRepeaterNode(base: AutoFormSchemaNode, newItem: Record<string, unknown>, children: AutoFormSchemaNode[]): AutoFormSchemaNode {
  return { $formkit: 'nuxtUIRepeater', ...base, newItem, children, ...REPEATER_BUTTON_DEFAULTS }
}

export function buildGroupNode(name: string, children: AutoFormSchemaNode[]): AutoFormSchemaNode {
  return { $formkit: 'group', name, children }
}

export function validationFromIR(ir: SchemaIR): string | undefined {
  const { rules } = ir
  const parts: string[] = []
  // `required` on a switch would force the boolean to true, which is not
  // what a plain boolean entry means.
  if (ir.required && ir.kind !== 'boolean') {
    parts.push('required')
  }
  if (rules.format) {
    parts.push(rules.format)
  }
  if (rules.min !== undefined) {
    parts.push(`min:${rules.min}`)
  }
  if (rules.max !== undefined) {
    parts.push(`max:${rules.max}`)
  }
  if (rules.maxLength !== undefined) {
    parts.push(`length:${rules.minLength ?? 0},${rules.maxLength}`)
  }
  else if (rules.minLength !== undefined) {
    parts.push(`length:${rules.minLength}`)
  }
  return parts.length ? parts.join('|') : undefined
}

// Blanked values seed nuxtUIRepeater's `newItem` so freshly-inserted rows
// start empty but keep the inferred key shape.
export function blankValueFromIR(ir: SchemaIR): unknown {
  if (ir.default !== undefined) {
    return ir.default
  }
  switch (ir.kind) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'array':
      return []
    case 'object':
      return ir.shape ? blankItemFromIR(ir.shape) : {}
    default:
      return null
  }
}

export function blankItemFromIR(shape: Record<string, SchemaIR>): Record<string, unknown> {
  const blank: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(shape)) {
    blank[key] = blankValueFromIR(entry)
  }
  return blank
}

/**
 * `inferChildren` builds the nodes for an object's or repeater row's shape,
 * so the caller keeps ownership of override and path handling.
 */
export function nodeFromIR(
  name: string,
  label: string,
  ir: SchemaIR,
  inferChildren: (shape: Record<string, SchemaIR>) => AutoFormSchemaNode[],
): AutoFormSchemaNode | undefined {
  const validation = validationFromIR(ir)
  const base: AutoFormSchemaNode = validation ? { name, label, validation } : { name, label }
  switch (ir.kind) {
    case 'string':
      return { $formkit: 'nuxtUIInput', ...base }
    case 'number':
      return { $formkit: 'nuxtUIInputNumber', ...base }
    case 'boolean':
      return { $formkit: 'nuxtUISwitch', ...base }
    case 'date':
      return { $formkit: 'nuxtUIInputDate', ...base, valueType: 'date' }
    case 'array':
      return isRepeaterItem(ir)
        ? buildRepeaterNode(base, blankItemFromIR(ir.element.shape), inferChildren(ir.element.shape))
        : { $formkit: 'nuxtUIInputTags', ...base }
    case 'object':
      return ir.shape ? buildGroupNode(name, inferChildren(ir.shape)) : undefined
    default:
      return undefined
  }
}
