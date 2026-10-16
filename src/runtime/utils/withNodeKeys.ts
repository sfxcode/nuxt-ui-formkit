import type { FormKitSchemaDefinition } from '@formkit/core'

// Gives every field node of a schema a Vue `key` made of its type, name and id.
//
// A FormKit node is created once from its `type`. When the `schema` prop changes, Vue patches the
// existing `<FormKit>` at the same position instead of rendering a new one, so a field whose type
// changed stays the old input and keeps its old validation state. With keys, Vue matches fields by
// identity instead: a field that did not change keeps its state and its value, a field whose type
// changed is rendered afresh, and adding or removing one field does not disturb the others.
//
// Returns a copy; the schema you pass in is not modified. A key you set yourself is kept.
export function withNodeKeys<T extends FormKitSchemaDefinition | undefined>(schema: T): T {
  return keyed(schema) as T
}

function keyed(value: unknown): unknown {
  if (Array.isArray(value))
    return value.map(keyed)
  if (value === null || typeof value !== 'object')
    return value

  const node = { ...(value as Record<string, unknown>) }
  for (const nested of ['children', 'then', 'else'] as const) {
    if (node[nested] !== undefined)
      node[nested] = keyed(node[nested])
  }
  if (typeof node.$formkit === 'string' && node.key === undefined && (node.name !== undefined || node.id !== undefined))
    node.key = `${node.$formkit}:${String(node.name ?? '')}:${String(node.id ?? '')}`
  return node
}
