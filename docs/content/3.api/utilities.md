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

**From `@sfxcode/nuxt-ui-formkit/definitions`:**
- Individual component definitions (e.g., `nuxtUIInputDefinition`, `nuxtUISelectDefinition`)

**From `@sfxcode/nuxt-ui-formkit/plugins`:**
- FormKit plugins (e.g., `addNuxtAsteriskPlugin`)

## Best Practices

::list{type="success"}
- Use `useFormKitInput` for consistent prop binding
- Leverage schema builders for complex forms
- Utilize TypeScript types for better IDE support
- Import only needed definitions in external modules
- Use `FUDataDebug` during development
::

## Next Steps

::card-group
  :::card
  ---
  icon: i-lucide-layers
  title: Components
  to: /components/inputs
  ---
  Explore all available components
  :::

  :::card
  ---
  icon: i-lucide-code
  title: Examples
  to: /examples
  ---
  See utilities in action
  :::

  :::card
  ---
  icon: i-lucide-book-open
  title: FormKit Docs
  to: https://formkit.com
  target: _blank
  ---
  Official FormKit documentation
  :::
::

