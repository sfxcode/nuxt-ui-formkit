---
title: useFormKitEditor / useFormKitEditorSchema
description: "Build a form that edits the properties of another FormKit schema node - pick a type, fill in its label/validation/options, and get a real { $formkit: ... } node back."
---

## Overview

`useFormKitEditorSchema()` builds the FormKit schema for a *property editor* - a form whose fields are "Field Type", "Field Label", "Validation Rules", "Options", and so on, for editing a single **other** FormKit schema node. `useFormKitEditor()` converts between that editor's own form data and the real `{ $formkit: 'nuxtUIInput', ... }` node it represents.

Together they power two things in the [playground](https://nuxt-ui-formkit.netlify.app/): the **Input Editor** sample (`/form/input-editor`) and the field-properties panel of the **Form Builder** (`/form-builder`), which reuses the same composables alongside a raw JSON editor for the same field.

```typescript
const { schemaToEditorData, editorDataToSchema } = useFormKitEditor()
const { editorSchema } = useFormKitEditorSchema()
```

## Basic Usage

```vue
<script setup lang="ts">
const { schemaToEditorData, editorDataToSchema } = useFormKitEditor()
const { editorSchema } = useFormKitEditorSchema()

const propertySchema = editorSchema()

const initialField = {
  $formkit: 'nuxtUIInput',
  name: 'field',
  label: 'Example Field',
  placeholder: 'Type something…',
  validation: 'required',
}

const formData = ref(schemaToEditorData(initialField))
const generatedField = computed(() => editorDataToSchema(formData.value))
</script>

<template>
  <!-- The property editor itself -->
  <FUDataEdit v-model="formData" :schema="propertySchema" />

  <!-- A live preview of the field it's building -->
  <FUDataEdit :schema="[generatedField]" />
</template>
```

`schemaToEditorData()`/`editorDataToSchema()` round-trip through a `_dollar_formkit` key rather than `$formkit` directly - FormKit's own schema syntax reserves `$`-prefixed keys, so the editor form can't use `$formkit` as one of its own field names. Everything else (`label`, `validation`, `options`, ...) passes through as-is.

::: warning Give the preview a fresh key on type changes
If you render a live preview like the second `FUDataEdit` above, key its wrapper on the selected type (`:key="formData._dollar_formkit"`). Some Nuxt UI inputs (`nuxtUISelectMenu` in particular) keep internal state tied to the previous `$formkit` type, and swapping types without remounting can leave stale state behind.
:::

## Editor Sections

`editorSchema()` groups the property editor's fields behind a "Properties" tab switcher (Base / Display / Style / Validation / Options / Attributes), so the form stays manageable regardless of how many properties a field type supports:

| Section | Fields |
| --- | --- |
| Base | Label (or Legend, for `nuxtUIRadioGroup`/`nuxtUICheckboxGroup`), Help Text, Default Value, Field ID, Schema Key, Preserve |
| Display | CSS Class, Render Condition (`if:`), Disabled, Read Only |
| Style | Outer Class, Wrapper Class, Inner Class |
| Validation | Validation Rules, Validation Visibility, Validation Label |
| Options | A drag-and-drop reorderable list of Label/Value pairs - only shown for types that actually take an `options`/`items` list (`nuxtUISelect`, `nuxtUIRadioGroup`, `nuxtUICheckboxGroup`, `nuxtUIListbox`, `nuxtUISelectMenu`, `nuxtUIInputMenu`, `nuxtUITree`) |
| Attributes | A drag-and-drop reorderable list of arbitrary key/value pairs - the escape hatch for any property not covered above (e.g. `rows`, `min`, `max`, `icon`) |

Attributes entries are parsed as JSON when possible, so typing `5` or `true` produces a number/boolean instead of the literal string - useful for numeric or boolean properties that don't have their own dedicated field.

## Locking the Field Type

Pass `false` to `useFormKitEditorSchema()` to disable the "Field Type" selector - useful when you're editing a field whose type is already fixed by something else (a palette template, in the Form Builder's case) and only want to edit its properties:

```typescript
const { editorSchema } = useFormKitEditorSchema(false)
```

The selector is disabled rather than removed - removing it entirely would also break every internal `$get()` comparison the schema uses to decide, for example, whether to show "Options" fields for the current type.

## Choosing Between Inputs and Outputs

The Field Type selector lists every registered `nuxtUI*` input (`inputNames`) and output (`outputNames`) component, so the same editor can build either a form field or a read-only display node:

```typescript
const { inputNames, outputNames } = useFormKitEditor()
const { editorSchema, typeOptions } = useFormKitEditorSchema()

// Inputs only
const inputOnlySchema = editorSchema(typeOptions(inputNames))
```

## Copying the Result

`editorDataToJson()` and `editorDataToCode()` both take the editor's current form data and return the generated field as a string - JSON for pasting into a schema file, or a JS-object-literal-like string for pasting into code:

```typescript
const { editorDataToJson, editorDataToCode } = useFormKitEditor()

await navigator.clipboard.writeText(editorDataToJson(formData.value))
await navigator.clipboard.writeText(editorDataToCode(formData.value))
```

## API Reference

### useFormKitEditor()

| Return value | Type | Description |
| --- | --- | --- |
| `inputNames` | `string[]` | Every registered `nuxtUI*` input type name, sorted |
| `outputNames` | `string[]` | Every registered `nuxtUI*` output type name, sorted |
| `inputNamesWithOptions` | `string[]` | Input types whose component takes an `options`/`items` list |
| `inputNamesWithLegend` | `string[]` | Input types that use `legend` instead of `label` |
| `schemaToEditorData(schema)` | `(node) => EditorData` | Converts a `{ $formkit, ... }` node into the editor form's data shape |
| `editorDataToSchema(data)` | `(data) => Record<string, unknown>` | Converts the editor form's data back into a real schema node |
| `editorDataToJson(data)` | `(data) => string` | `editorDataToSchema(data)`, `JSON.stringify`-ed |
| `editorDataToCode(data)` | `(data) => string` | The same, formatted as a JS object literal |

### useFormKitEditorSchema(isChangeTypePossible?)

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `isChangeTypePossible` | `boolean` | `true` | `false` disables (but keeps mounted) the Field Type selector |

| Return value | Type | Description |
| --- | --- | --- |
| `editorSchema(typeOptions?)` | `(options?) => FormKitSchemaNode[]` | Builds the property editor's schema; defaults to every input + output type |
| `fieldTypeOptions` | `{ label: string, value: string }[]` | The default `{ label, value }` list `editorSchema()` uses |
| `typeOptions(names, kind?)` | `(names, kind?) => { label, value }[]` | Maps type names into `{ label, value }` options, optionally suffixing the label with `kind` (e.g. `'output'`) |

Every call to `useFormKitEditorSchema()` generates its own unique internal ids for the fields it addresses via `$get()`, so it's safe to call more than once on the same page (or navigate to a page that calls it repeatedly) without one instance's fields interfering with another's.

## Next Steps

<CardGrid>
  <Card title="FUDataEdit" icon="i-lucide-file-edit" to="/components/data-edit">
    Renders both the property editor and the field it produces
  </Card>

  <Card title="Repeater" icon="i-lucide-list-plus" to="/components/repeater">
    Powers the Options/Attributes lists' add, remove, and drag-to-reorder behavior
  </Card>

  <Card title="API Reference" icon="i-lucide-book" to="/api/utilities">
    Complete API documentation
  </Card>
</CardGrid>
