---
title: Standard Schema Validation
description: Validate a FormKit form against any Standard Schema-compliant library (Zod, Valibot, ArkType) instead of hand-writing FormKit validation strings.
---

## Overview

[Standard Schema](https://standardschema.dev) is the shared `~standard.validate()` interface that Zod, Valibot, and ArkType all implement. If you already have a schema for your data - or want to reuse the same validation library across a Nitro API route, a plain `UForm`, and this module's FormKit-powered inputs - you can pass that schema straight in instead of re-expressing every rule as a FormKit `validation` string.

Errors land on the exact FormKit node they describe - including fields nested inside a [Repeater](/components/repeater) row - and respect each field's own `validationVisibility` timing (`blur` by default), the same way FormKit's own rule-derived errors do. A failing schema also blocks form submission automatically, exactly like a native rule failure would.

::: info
**Any Standard Schema works.** This module depends only on `@standard-schema/spec`'s types, not on Zod/Valibot/ArkType themselves - bring whichever library you already use.
:::

## Basic Usage

### With `FUDataEdit`

Pass a schema via the `standard-schema` prop, alongside the existing `schema`/`data` props:

```vue
<template>
  <FUDataEdit
    :data="registration"
    :schema="formSchema"
    :standard-schema="registrationSchema"
    @data-saved="handleSave"
  />
</template>

<script setup lang="ts">
import * as v from 'valibot'

const registration = ref({ email: '', age: 0 })

const registrationSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  age: v.pipe(v.number(), v.minValue(18)),
})

const formSchema = [
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
  { $formkit: 'nuxtUIInputNumber', name: 'age', label: 'Age' },
]

function handleSave(data: object) {
  console.log('Saved', data)
}
</script>
```

### With `useFormKitForm`

If you're wiring a `<FormKit type="form">` by hand instead of using `FUDataEdit`, pass the schema as the composable's second argument. `useFormKitForm` is auto-imported, like the module's other composables:

```vue
<template>
  <FormKit id="registration-form" type="form">
    <FormKit type="nuxtUIInput" name="email" label="Email" />
    <FormKit type="nuxtUIInputNumber" name="age" label="Age" />
  </FormKit>
</template>

<script setup lang="ts">
import * as v from 'valibot'

const registrationSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  age: v.pipe(v.number(), v.minValue(18)),
})

const { isValid } = useFormKitForm('registration-form', { standardSchema: registrationSchema })
</script>
```

## Validation Visibility

Schema-derived errors are applied as FormKit `type: 'validation'` messages, not `type: 'error'` - the same message type native rule failures use. That means:

- An error only becomes **visible** once the field's own `validationVisibility` condition is met (`blur` by default - or `dirty`, `live`, or `submit` if you've set that prop on the field). It does not appear the instant a keystroke makes the value invalid.
- `isValid` (from `useFormKitForm`, or a field's own FormKit state) reflects a schema failure immediately, regardless of visibility - it blocks submission the same way a rule failure does, it just doesn't necessarily show the message yet.
- Submitting the form reveals every outstanding error at once (FormKit's own `submitted` state), same as it always has.

## Repeater Support

A schema issue at an array-index path (e.g. Zod/Valibot reporting a problem at `items[2].email`) is normalized to FormKit's `"items.2.email"` node address and resolved correctly against a [`nuxtUIRepeater`](/components/repeater)'s actual row nodes - including after rows are inserted, removed, or reordered, which shifts every subsequent row's index.

```typescript
import * as v from 'valibot'

const schema = v.object({
  items: v.array(v.object({
    email: v.pipe(v.string(), v.email()),
  })),
})
```

## Related

- [FUDataEdit](/components/data-edit) - the `standard-schema` prop
- [Repeater](/components/repeater) - dynamic, repeatable form sections
- [Standard Schema specification](https://standardschema.dev)
