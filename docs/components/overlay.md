---
title: useFormKitOverlay Composable
description: Promise-based modal/slideover forms - open FUDataEdit or FUAutoForm in a UModal/USlideover and await the saved data or null on cancel.
---

## Overview

`useFormKitOverlay()` composes `FUDataEdit`/`FUAutoForm`, `useFormKitForm`, and Nuxt UI's `useOverlay` into one call for the most common CRUD pattern: click Edit, fill in a dialog, save or cancel.

```typescript
const result = await overlay.edit({ data, schema, title })
```

`result` is the saved data on Save, or `null` on Cancel, <kbd>Esc</kbd>, or a backdrop click - there's no separate open/close state, mount timing, or FormKit submit plumbing to hand-assemble yourself.

## Basic Usage

```vue
<script setup lang="ts">
const overlay = useFormKitOverlay()

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name', validation: 'required' },
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', inputType: 'email', validation: 'required|email' },
]

const rows = ref([
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
])

async function editRow(index: number) {
  const result = await overlay.edit({
    data: rows.value[index],
    schema,
    title: `Edit ${rows.value[index]?.name}`,
  })

  if (result)
    rows.value[index] = result
}
</script>
```

## Modal vs Slideover

`as: 'modal' | 'slideover'` (default `'modal'`) chooses which Nuxt UI component wraps the form - one composable, not two:

```typescript
await overlay.edit({ data, schema, title, as: 'slideover' })
```

## Cancel and Dismissal Semantics

Every way a user can close the overlay besides Save resolves the promise to `null`, never leaving it pending: the built-in Cancel button, <kbd>Esc</kbd>, and clicking outside the modal/slideover (backdrop click) all resolve the same way.

## Auto-Inferred Schemas

`auto()` opens the same modal/slideover, but infers the form from your data (or a [Valibot/Zod schema](/components/auto-form)) via `FUAutoForm` instead of requiring a hand-written FormKit schema:

```typescript
const result = await overlay.auto({ data: rows.value[index], title: `Edit ${rows.value[index]?.name}` })
```

```vue
<script setup lang="ts">
import * as v from 'valibot'

const overlay = useFormKitOverlay()

const registrationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
})

async function editRegistration(data: object) {
  return overlay.auto({ data, valibotSchema: registrationSchema, title: 'Registration' })
}
</script>
```

`auto()` accepts the same `overrides`/`valibotSchema`/`zodSchema` options [`FUAutoForm`](/components/auto-form) does, plus this composable's own `title`/`as`.

## Options

### edit(options)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `unknown` | *(required)* | Data to pre-fill the form with |
| `schema` | `FormKitSchemaDefinition` | *(required)* | Hand-written FormKit schema |
| `title` | `string` | `undefined` | Modal/slideover header title |
| `as` | `'modal' \| 'slideover'` | `'modal'` | Which Nuxt UI overlay component to render |

### auto(options)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `unknown` | `undefined` | Data to infer the schema from and pre-fill the form with |
| `valibotSchema` | `ValibotLikeSchema` | `undefined` | Infer inputs/validation from a Valibot object schema instead |
| `zodSchema` | `ZodLikeSchema` | `undefined` | Infer inputs/validation from a Zod object schema instead |
| `overrides` | `AutoFormOverrides` | `undefined` | Dot-path keyed map of partial schema nodes or `false` - see [`FUAutoForm`](/components/auto-form) |
| `title` | `string` | `undefined` | Modal/slideover header title |
| `as` | `'modal' \| 'slideover'` | `'modal'` | Which Nuxt UI overlay component to render |

Both methods return `Promise<unknown>`, resolving to the saved data or `null`.

## One Overlay Instance at a Time

`edit()` and `auto()` each reuse a single registered overlay instance across calls, rather than stacking a new one per invocation. Calling either again before the previous call's promise has resolved doesn't open a second, independent overlay - it replaces the first one's data/title in place, and **the first call's promise never resolves** (its resolver is discarded, not rejected). Always `await` an `edit()`/`auto()` call (or otherwise ensure it has resolved) before starting another from the same composable instance.

## Next Steps

<CardGrid>
  <Card title="FUDataEdit" icon="i-lucide-file-edit" to="/components/data-edit">
    The schema-driven form edit() opens
  </Card>

  <Card title="FUAutoForm" icon="i-lucide-wand-sparkles" to="/components/auto-form">
    Schema-free forms auto() opens
  </Card>

  <Card title="API Reference" icon="i-lucide-book" to="/api/utilities">
    Complete API documentation
  </Card>
</CardGrid>
