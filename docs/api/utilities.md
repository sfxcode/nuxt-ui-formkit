---
title: Utilities
description: Composables and utility functions for building forms with Nuxt UI FormKit.
---

## Composables

### useFormKitInput

Helper composable for binding FormKit context to Nuxt UI input props.

```typescript
import { useFormKitInput } from '@sfxcode/nuxt-ui-formkit'

const props = useFormKitInput(context, {
  color: 'primary',
  size: 'md'
})
```

**Parameters:**
- `context` - FormKit node context
- `defaults` - Default props for the component

**Returns:** Reactive props object with FormKit bindings

### useFormKitOutput

Helper composable for output components.

```typescript
import { useFormKitOutput } from '@sfxcode/nuxt-ui-formkit'

const props = useFormKitOutput(context, {
  color: 'neutral'
})
```

### useFormKitForm

Helper composable for driving a `<FormKit type="form">` from outside code - submit, reset, errors, and (optionally) [Standard Schema](/components/standard-schema) validation.

```typescript
import { useFormKitForm } from '@sfxcode/nuxt-ui-formkit'

const { submit, reset, isValid, isSubmitted, isDirty, hasErrors, isLoading, error } = useFormKitForm('my-form', {
  standardSchema: registrationSchema, // optional - see /components/standard-schema
})
```

**Parameters:**
- `id` - the FormKit form node's registry id (its `id` prop)
- `options.standardSchema` *(optional)* - a Standard Schema instance to validate the form against

**Returns:** `submit`, `reset`, `setErrors`, `clearErrors`, `isValid`, `isSubmitted`, `isDirty`, `hasErrors`, `isLoading`, `error`

`submit(handler?)` triggers the form's own submission. A `handler` is your own async work (an API call, say): it runs once, and only if the form passed validation, with `isLoading` set while it runs. If it throws or rejects, `isLoading` is reset, the failure is stored in `error`, and the returned promise rejects - `await` it (or `.catch`) to handle it. `error` clears when the next handler starts. `submit()` with a handler rejects if no form with that `id` is mounted. Calling `submit` again before the first has been validated supersedes it, so only the latest call's handler runs.

`isDirty` is `true` once the form's value differs from its initial value, and `reset()` clears it. By default FormKit's dirty state is *sticky*: it stays `true` after a field is edited back to its original value. Set `dirty-behavior="compare"` on the form (`FUDataEdit` has a `dirtyBehavior` prop) to make it track the live difference instead.

### createAutosavePlugin

Persists a form's value to `localStorage` and restores it on the next mount - draft recovery for long forms. `FUDataEdit` and `FUAutoForm` expose it as the [`autosave` prop](/components/data-edit#autosave); use the plugin directly for a hand-written `<FormKit type="form">`:

```vue
<FormKit
  type="form"
  name="profile"
  :plugins="[createAutosavePlugin({ key: 'profile-draft' })]"
>
```

```typescript
import { createAutosavePlugin } from '@sfxcode/nuxt-ui-formkit/plugins'
```

**Options:** `key` (required), `debounce` (ms, default 200), `maxAge` (ms, default 1 hour), `clearOnSubmit` (default `true`).

- Give the form a stable `name` - the stored entry is keyed on it, and FormKit's auto-generated names (`form_1`) are not stable across mounts.
- It attaches to the form root only; nested groups and repeater rows are saved as part of the form's value.
- The plugin has to be on the form from the start - it loads the saved draft when the form node is created, so it cannot be bolted on later from `useFormKitForm`.
- A restored draft is reported as dirty (`isDirty` is `true` right after a restore), since it differs from the form's initial value.
- Internal keys FormKit adds to the bound data (such as `slots`) are not saved.

### useFormKitOverlay

Opens [`FUDataEdit`](/components/data-edit) or [`FUAutoForm`](/components/auto-form) in a `UModal`/`USlideover` via Nuxt UI's `useOverlay` - see [the full guide](/components/overlay) for details.

```typescript
import { useFormKitOverlay } from '@sfxcode/nuxt-ui-formkit'

const overlay = useFormKitOverlay()

const result = await overlay.edit({ data, schema, title }) // hand-written schema
const inferred = await overlay.auto({ data, title }) // schema inferred via FUAutoForm
```

**Parameters (`edit`):** `data`, `schema`, `title` *(optional)*, `as` *(optional, `'modal' | 'slideover'`, default `'modal'`)*

**Parameters (`auto`):** `data`/`valibotSchema`/`zodSchema`/`overrides` *(optional)*, `title` *(optional)*, `as` *(optional)*

**Returns:** `{ edit, auto }`, each resolving to the saved data or `null` on cancel/dismiss

### useFormKitSchema

Schema builder utilities for creating FormKit schemas programmatically.

```typescript
import { useFormKitSchema } from '@sfxcode/nuxt-ui-formkit'

const { addList, addElement, addListGroup, addComponent } = useFormKitSchema()

const schema = [
  addElement('div', [
    addList('items', [
      addListGroup([
        addComponent('UButton', { label: 'Click Me' })
      ])
    ])
  ])
]
```

**Methods:**
- `addComponent(component, props, render, formKitAttrs)` - Add a Vue component
- `addElement(element, children, attrs, render, formKitAttrs)` - Add an HTML element
- `addGroup(name, children, render, formKitAttrs)` - Add a FormKit group
- `addList(name, children, dynamic, render, formKitAttrs)` - Add a FormKit list
- `addListGroup(children, render, formKitAttrs)` - Add a repeating list group

### useFormKitEditor / useFormKitEditorSchema

Builds a form that edits the properties of another FormKit schema node (type, label, validation, options, ...) and converts its data back into a real `{ $formkit: ... }` node - see [the full guide](/components/input-editor) for details.

```typescript
import { useFormKitEditor, useFormKitEditorSchema } from '@sfxcode/nuxt-ui-formkit'

const { schemaToEditorData, editorDataToSchema } = useFormKitEditor()
const { editorSchema } = useFormKitEditorSchema() // pass `false` to lock the field type

const formData = ref(schemaToEditorData({ $formkit: 'nuxtUIInput', name: 'field' }))
const generatedField = computed(() => editorDataToSchema(formData.value))
```

**Parameters (`useFormKitEditorSchema`):** `isChangeTypePossible` *(optional, `boolean`, default `true`)*

**Returns (`useFormKitEditor`):** `inputNames`, `outputNames`, `inputNamesWithOptions`, `inputNamesWithLegend`, `schemaToEditorData`, `editorDataToSchema`, `editorDataToJson`, `editorDataToCode`

**Returns (`useFormKitEditorSchema`):** `editorSchema`, `fieldTypeOptions`, `typeOptions`

## Components

### FUDataEdit

Form component for editing data with schema-based configuration.

```vue
<FUDataEdit
  :data="formData"
  :schema="schema"
  :debug-data="false"
  @data-saved="handleSubmit"
/>
```

**Props:**
- `data` - Reactive data object to edit
- `schema` - FormKit schema definition
- `debugData` - Show debug panel (default: false)

**Events:**
- `data-saved` - Emitted when form is submitted with valid data

### FUDataView

Display component for read-only data presentation.

```vue
<FUDataView
  :data="displayData"
  :schema="schema"
/>
```

**Props:**
- `data` - Data object to display
- `schema` - Schema definition using output components

### FUDataDebug

Development tool for debugging form data and state.

```vue
<FUDataDebug
  :data="formData"
  :show-json="true"
/>
```

**Props:**
- `data` - Data object to debug
- `showJson` - Display formatted JSON (default: true)

## Type Definitions

### FormKit Schema Types

```typescript
import type { FormKitSchemaNode } from '@formkit/core'

// Schema node definition
interface SchemaNode {
  $formkit?: string
  $el?: string
  $cmp?: string
  name?: string
  label?: string
  validation?: string
  children?: SchemaNode[]
  if?: string
  attrs?: Record<string, any>
  props?: Record<string, any>
}
```

### Component Props Types

```typescript
// Input component props
interface NuxtUIInputProps {
  name: string
  label?: string
  help?: string
  placeholder?: string
  validation?: string
  disabled?: boolean
  required?: boolean
  inputType?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'search'
  leadingIcon?: string
  trailingIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

// Output component props
interface NuxtUIOutputProps {
  name: string
  label?: string
  help?: string
  color?: string
  size?: string
  leadingIcon?: string
  trailingIcon?: string
}
```

## Utilities

### Color Conversion

Convert between color formats (hex, rgb, hsl).

```typescript
import { hexToRgb, rgbToHex, hslToRgb } from '@sfxcode/nuxt-ui-formkit'

// Convert hex to RGB
const rgb = hexToRgb('#ff0000') // { r: 255, g: 0, b: 0 }

// Convert RGB to hex
const hex = rgbToHex(255, 0, 0) // '#ff0000'

// Convert HSL to RGB
const rgb2 = hslToRgb(0, 100, 50) // { r: 255, g: 0, b: 0 }
```

### Duration Conversion

Convert time durations between formats.

```typescript
import { parseDuration, formatDuration } from '@sfxcode/nuxt-ui-formkit'

// Parse duration string
const seconds = parseDuration('1h 30m') // 5400

// Format seconds to readable string
const formatted = formatDuration(5400) // '1h 30m'
```

## External Module Usage

### Import Definitions

Import FormKit definitions in your own modules:

```typescript
// Import all definitions
import { nuxtUIInputs, nuxtUIOutputs } from '@sfxcode/nuxt-ui-formkit/formkit'

export default defineFormKitConfig({
  inputs: {
    ...nuxtUIInputs,
    ...nuxtUIOutputs
  }
})
```

```typescript
// Import specific definitions
import {
  nuxtUIInputDefinition,
  nuxtUISelectDefinition
} from '@sfxcode/nuxt-ui-formkit/definitions'

export default defineFormKitConfig({
  inputs: {
    nuxtUIInput: nuxtUIInputDefinition,
    nuxtUISelect: nuxtUISelectDefinition
  }
})
```

### Available Exports

**From `@sfxcode/nuxt-ui-formkit/formkit`:**
- `nuxtUIInputs` - All input component definitions
- `nuxtUIOutputs` - All output component definitions
- `formInputs` - The same input definitions under the `form` prefix (`formInput`, `formSelect`, ...)
- `formOutputs` - The same output definitions under the `form` prefix (`formOutputText`, ...)

The `form` names are registered by `createNuxtUiFormkitConfig({ formPrefix: true })`, or by spreading `formInputs` and `formOutputs` next to `nuxtUIInputs` and `nuxtUIOutputs`.

**From `@sfxcode/nuxt-ui-formkit/definitions`:**
- Individual component definitions (e.g., `nuxtUIInputDefinition`, `nuxtUISelectDefinition`)

**From `@sfxcode/nuxt-ui-formkit/plugins`:**
- FormKit plugins (e.g., `addNuxtAsteriskPlugin`, `createAutosavePlugin`)

## Best Practices

- ✅
- Use `useFormKitInput` for consistent prop binding
- Leverage schema builders for complex forms
- Utilize TypeScript types for better IDE support
- Import only needed definitions in external modules
- Use `FUDataDebug` during development
:::

## Next Steps

<CardGrid>
  <Card title="Components" icon="i-lucide-layers" to="/components/inputs">
    Explore all available components
  </Card>

  <Card title="Examples" icon="i-lucide-code" to="/examples">
    See utilities in action
  </Card>

  <Card title="FormKit Docs" icon="i-lucide-book-open" to="https://formkit.com" target="_blank">
    Official FormKit documentation
  </Card>
</CardGrid>

