---
title: FUAutoForm Component
description: Render a complete form without writing a schema - inputs are inferred from your data's value shapes or from a Valibot schema, with an override map for fine-tuning.
---

## Overview

`FUAutoForm` infers a `FUDataEdit` schema instead of requiring you to write one. Pass a plain data object and every field gets a matching input based on its value type; or pass a Valibot schema and inputs, labels, and validation rules are derived from the schema's own metadata. The inferred schema is handed to `FUDataEdit` unchanged, so everything you know about `FUDataEdit` (props, events, slots) applies as-is.

```vue
<template>
  <FUAutoForm
    :data="user"
    @data-saved="handleSave"
  />
</template>

<script setup lang="ts">
const user = ref({
  firstName: 'Ada',
  age: 36,
  newsletter: true,
  tags: ['vue', 'nuxt'],
  address: { city: 'London' },
  contacts: [{ email: 'ada@example.com' }],
})

function handleSave(data: any) {
  console.log('Saved:', data)
}
</script>
```

## Inference Rules

| Value shape | Inferred input |
| --- | --- |
| `string` | `nuxtUIInput` |
| string containing a line break | `nuxtUITextarea` |
| ISO date string (`2024-01-15` or full ISO-8601 datetime) | `nuxtUIInputDate` with `valueType: 'iso'` (round-trips as string) |
| `Date` instance | `nuxtUIInputDate` with `valueType: 'date'` |
| `number` | `nuxtUIInputNumber` |
| `boolean` | `nuxtUISwitch` |
| array of primitives (or empty array) | `nuxtUIInputTags` |
| array of objects | `nuxtUIRepeater` (item fields inferred from the first element; `newItem` derived by blanking it) |
| nested plain object | FormKit `group` with inferred children |
| `null` / `undefined` / functions / other object types | skipped (use an override to add the field explicitly) |

Labels are humanized from key names: `firstName` becomes `First Name`, `email_address` becomes `Email Address`.

## Overrides

The `overrides` prop adjusts, replaces, adds, or removes inferred fields. Keys are dot-paths into your data; values are either a partial schema node or `false`.

```vue
<FUAutoForm
  :data="user"
  :overrides="{
    'firstName': { validation: 'required' },
    'bio': { $formkit: 'nuxtUITextarea' },
    'internalId': false,
    'contacts.email': { validation: 'required|email' },
    'nickname': { placeholder: 'Optional nickname' },
  }"
/>
```

- **Merge semantics are a per-node shallow merge**: `{ ...inferredNode, ...overrideNode }`. Override keys win wholesale — keep the inferred `$formkit`/`label` and add `validation`, or supply `$formkit` to swap the input type entirely. Supplying `children` replaces the inferred children completely (no deep merge).
- **`false` removes** an inferred field.
- **Dot-paths reach nested fields**: `address.city` targets a group child; `contacts.email` targets a repeater's item template (no index segment — overrides apply to every row).
- **Unknown paths append new fields** at that level, defaulting to `$formkit: 'nuxtUIInput'` with a humanized label. This also un-skips fields whose value was `null`.

## Valibot Schemas

If you already describe your data with [Valibot](https://valibot.dev), pass the schema instead — the inputs, `required`/`email`/`url`/`length`/`min`/`max` validation rules, and nesting come from the schema's own structure. Valibot is introspected structurally; this module does not depend on it.

```vue
<template>
  <FUAutoForm
    :data="user"
    :valibot-schema="schema"
  />
</template>

<script setup lang="ts">
import * as v from 'valibot'

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  age: v.optional(v.pipe(v.number(), v.minValue(18))),
  newsletter: v.boolean(),
  contacts: v.array(v.object({ email: v.pipe(v.string(), v.email()) })),
})

const user = ref({ name: '', email: '', age: 18, newsletter: false, contacts: [] })
</script>
```

- Non-optional entries get `required` (except booleans — a plain `v.boolean()` must stay switchable to `false`).
- `v.optional`/`v.nullable`/`v.nullish` entries are not required; an optional's default value seeds new repeater rows.
- Unsupported constructs (`picklist`, `union`, `record`, ...) are skipped — add them via `overrides`.
- When `valibot-schema` is set it drives the schema; `data` remains the value source.

## Re-Inference Contract

The schema is re-inferred only when the `data`, `overrides`, or `valibot-schema` prop **references** change — never while typing. Mutating the bound object does not rebuild the form (rebuilding would re-render the schema and drop input focus); replace the object to re-infer.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `Object` | `null` | Data object to infer from; also seeds the form value (v-model supported) |
| `overrides` | `AutoFormOverrides` | `undefined` | Dot-path keyed map of partial schema nodes or `false` |
| `valibotSchema` | `Object` | `undefined` | Valibot object schema to derive inputs/validation from |

All other props, events (`@data-saved`, `@on-reset`), and slots are passed through to [`FUDataEdit`](/components/data-edit) unchanged — `submit-label`, `show-reset`, `debug-data`, `debug-schema`, and so on.

## Programmatic Use

The inference utilities are auto-imported and usable standalone — for example to tweak the inferred schema before handing it to `FUDataEdit` yourself:

```ts
const { inferFormSchema, inferFormSchemaFromValibot } = useFormKitAutoForm()

const schema = inferFormSchema(user, { email: { validation: 'required|email' } })
```
