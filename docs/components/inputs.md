# Input Components

Comprehensive list of all FormKit-wrapped Nuxt UI input components with schema-based examples.

## Overview

Nuxt UI FormKit provides fully-featured input components. All examples below show **schema-based usage** - the recommended approach for building forms.

::: info Schema-First
All components are designed to work seamlessly in schemas. Template usage is also supported but schemas are the recommended pattern.
:::

## Text Inputs

### nuxtUIInput

Text input component supporting various input types (text, email, password, url, tel, number, search).

📖 Nuxt UI reference: [Input](https://ui.nuxt.com/components/input)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email Address',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    leadingIcon: 'i-lucide-mail',
    validation: 'required|email'
  }
]
```

**Full Example:**

```vue
<template>
  <FUDataEdit :data="data" :schema="schema" />
</template>

<script setup lang="ts">
const data = ref({ email: '' })

const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email Address',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    leadingIcon: 'i-lucide-mail',
    trailingIcon: 'i-lucide-check',
    size: 'lg',
    validation: 'required|email'
  }
]
</script>
```

**Key Props:**
- `inputType` - HTML input type (text, email, password, url, tel, search)
- `placeholder` - Placeholder text
- `leadingIcon` - Icon before input
- `trailingIcon` - Icon after input
- `size` - Input size (xs, sm, md, lg, xl)

### nuxtUITextarea

Multi-line text input with auto-resize functionality.

📖 Nuxt UI reference: [Textarea](https://ui.nuxt.com/components/textarea)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUITextarea',
    name: 'message',
    label: 'Message',
    rows: 4,
    autoresize: true,
    placeholder: 'Enter your message...',
    validation: 'required|length:10'
  }
]
```

### nuxtUIInputNumber

Number input with increment/decrement buttons and formatting options.

📖 Nuxt UI reference: [InputNumber](https://ui.nuxt.com/components/input-number)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'price',
    label: 'Price',
    min: 0,
    step: 0.01,
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    },
    validation: 'required|min:0'
  }
]
```

**Key Props:**
- `locale` - BCP 47 locale used for number formatting (e.g. `'de-DE'`)
- `readonly` - Render as read-only

## Selection Components

### nuxtUISelect

Dropdown select with search functionality.

📖 Nuxt UI reference: [Select](https://ui.nuxt.com/components/select)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: ['USA', 'UK', 'Canada', 'Australia'],
    placeholder: 'Select a country',
    validation: 'required'
  }
]
```

**With Objects:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUISelect',
    name: 'role',
    label: 'User Role',
    options: [
      { label: 'Administrator', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' }
    ]
  }
]
```

**Key Props:**
- `content` - Positioning/behavior config for the dropdown content

### nuxtUISelectMenu

Advanced select with grouping and multiple selection support.

📖 Nuxt UI reference: [SelectMenu](https://ui.nuxt.com/components/select-menu)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'technologies',
    label: 'Technologies',
    multiple: true,
    options: [
      {
        label: 'Frontend',
        children: [
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Svelte', value: 'svelte' }
        ]
      },
      {
        label: 'Backend',
        children: [
          { label: 'Node.js', value: 'node' },
          { label: 'Python', value: 'python' },
          { label: 'Go', value: 'go' }
        ]
      }
    ]
  }
]
```

**Key Props:**
- `size` - Component size
- `content` - Positioning/behavior config for the dropdown content
- `by` - Key or comparator used to match the selected value

### nuxtUIListbox

Listbox for single/multiple selection with filtering.

📖 Nuxt UI reference: [Listbox](https://ui.nuxt.com/components/listbox)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIListbox',
    name: 'skills',
    label: 'Skills',
    multiple: true,
    options: ['TypeScript', 'Vue', 'Nuxt', 'FormKit', 'TailwindCSS']
  }
]
```

**Key Props:**
- `color` - Component color

### nuxtUIInputMenu

Dropdown menu with searchable options.

📖 Nuxt UI reference: [InputMenu](https://ui.nuxt.com/components/input-menu)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'framework',
    label: 'Framework',
    options: ['Nuxt', 'Next.js', 'SvelteKit', 'Remix', 'Astro'],
    placeholder: 'Search frameworks...'
  }
]
```

**Key Props:**
- `mode` - `'combobox'` (default) or `'autocomplete'`
- `content` - Positioning/behavior config for the dropdown content
- `by` - Key or comparator used to match the selected value
- `open` - Controlled open state of the menu

## Boolean Inputs

### nuxtUICheckbox

Single checkbox with label and description.

📖 Nuxt UI reference: [Checkbox](https://ui.nuxt.com/components/checkbox)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUICheckbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    description: 'You must accept to continue',
    validation: 'accepted'
  }
]
```

**Key Props:**
- `trueValue` / `falseValue` - Custom values emitted for the checked / unchecked states

### nuxtUICheckboxGroup

Multiple checkbox selection.

📖 Nuxt UI reference: [CheckboxGroup](https://ui.nuxt.com/components/checkbox-group)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests',
    label: 'Interests',
    options: [
      { label: 'Technology', value: 'tech', description: 'Software and hardware' },
      { label: 'Design', value: 'design', description: 'UI/UX and graphics' },
      { label: 'Business', value: 'business', description: 'Strategy and growth' }
    ]
  }
]
```

**Key Props:**
- `name` - Shared form control name for the group

### nuxtUIRadioGroup

Radio button group for single selection.

📖 Nuxt UI reference: [RadioGroup](https://ui.nuxt.com/components/radio-group)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'plan',
    label: 'Select Plan',
    options: [
      { 
        label: 'Free', 
        value: 'free', 
        description: 'Basic features for getting started' 
      },
      { 
        label: 'Pro', 
        value: 'pro', 
        description: 'Advanced features for professionals' 
      },
      { 
        label: 'Enterprise', 
        value: 'enterprise', 
        description: 'Full features with dedicated support' 
      }
    ],
    validation: 'required'
  }
]
```

### nuxtUISwitch

Toggle switch for boolean values.

📖 Nuxt UI reference: [Switch](https://ui.nuxt.com/components/switch)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUISwitch',
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    help: 'Get product updates and announcements'
  }
]
```

**Key Props:**
- `trueValue` / `falseValue` - Custom values emitted for the on / off states

## Specialized Inputs

### nuxtUIInputDate

Date and time picker with range support.

📖 Nuxt UI reference: [InputDate](https://ui.nuxt.com/components/input-date)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputDate',
    name: 'eventDate',
    label: 'Event Date',
    enableTimePicker: false,
    placeholder: 'Select date',
    validation: 'required'
  }
]
```

**With Time:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputDate',
    name: 'appointment',
    label: 'Appointment',
    enableTimePicker: true,
    placeholder: 'Select date and time'
  }
]
```

### nuxtUIInputTime

Time picker with 12/24-hour format.

📖 Nuxt UI reference: [InputTime](https://ui.nuxt.com/components/input-time)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputTime',
    name: 'meetingTime',
    label: 'Meeting Time',
    placeholder: 'Select time'
  }
]
```

### nuxtUIColorPicker

Color selection with multiple format support (hex, rgb, hsl).

📖 Nuxt UI reference: [ColorPicker](https://ui.nuxt.com/components/color-picker)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'themeColor',
    label: 'Theme Color',
    mode: 'hex'
  }
]
```

### nuxtUIInputTags

Tag input component with a custom delimiter.

📖 Nuxt UI reference: [InputTags](https://ui.nuxt.com/components/input-tags)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags',
    label: 'Tags',
    placeholder: 'Add tags...',
    delimiter: ',',
    help: 'Press comma to add a tag'
  }
]
```

**Key Props:**
- `delimiter` - Character or `RegExp` used to split tags (e.g. `','`)

### nuxtUIPinInput

PIN/OTP entry component.

📖 Nuxt UI reference: [PinInput](https://ui.nuxt.com/components/pin-input)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIPinInput',
    name: 'pin',
    label: 'Enter PIN',
    length: 6,
    type: 'number',
    validation: 'required|length:6'
  }
]
```

**Key Props:**
- `type` - `'text'` (default) or `'number'`
- `separator` - Insert a separator between inputs (index or list of indexes)

### nuxtUISlider

Range slider for numeric values.

📖 Nuxt UI reference: [Slider](https://ui.nuxt.com/components/slider)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUISlider',
    name: 'volume',
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1
  }
]
```

### nuxtUICalendar

Bare date-grid picker with day, month, and year views, supporting range and multiple selection.

📖 Nuxt UI reference: [Calendar](https://ui.nuxt.com/components/calendar)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUICalendar',
    name: 'appointmentDate',
    label: 'Appointment Date',
    validation: 'required'
  }
]
```

**With Range:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUICalendar',
    name: 'vacationRange',
    label: 'Vacation Dates',
    range: true
  }
]
```

**Key Props:**
- `type` - `'date'` (default), `'month'`, or `'year'` picker view
- `range` - Enable selecting a start/end date range
- `multiple` - Enable selecting multiple individual dates
- `color` - Theme color for the selected date(s)
- `size` - `'xs' | 'sm' | 'md' | 'lg' | 'xl'` - controls cell/font size, not the overall footprint

::: tip
The calendar grid fills its container by default (matching Nuxt UI's own `UCalendar`). Add a width class via `class` on the schema entry (e.g. `class: 'w-1/2'`) to control how much space it takes up.
:::

### nuxtUIFileUpload

Drag/drop and click-to-browse file input with previews.

📖 Nuxt UI reference: [FileUpload](https://ui.nuxt.com/components/file-upload)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'attachment',
    label: 'Attachment',
    accept: 'image/*',
    validation: 'required'
  }
]
```

**With Multiple Files:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'documents',
    label: 'Documents',
    multiple: true,
    layout: 'grid'
  }
]
```

**Key Props:**
- `multiple` - Allow selecting more than one file
- `accept` - Comma-separated MIME types or extensions (e.g. `'image/png,.pdf'`)
- `layout` - `'list'` (default) or `'grid'` — only applies when `variant` is `'area'`
- `position` - `'outside'` (default) or `'inside'` — file list position relative to the dropzone
- `variant` - `'area'` (default) or `'button'` — `'button'` only works when `multiple` is `false`

### nuxtUIEditor

Tiptap-based rich text editor with a built-in formatting toolbar.

📖 Nuxt UI reference: [Editor](https://ui.nuxt.com/components/editor)

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIEditor',
    name: 'body',
    label: 'Post Body',
    contentType: 'html',
    validation: 'required'
  }
]
```

**With Markdown:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIEditor',
    name: 'notes',
    label: 'Notes',
    contentType: 'markdown'
  }
]
```

**With Custom Toolbar Items:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIEditor',
    name: 'summary',
    label: 'Summary',
    toolbarItems: [
      [{ kind: 'undo', icon: 'i-lucide-undo' }, { kind: 'redo', icon: 'i-lucide-redo' }],
      [{ kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' }, { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' }]
    ]
  }
]
```

**Key Props:**
- `contentType` - `'html'`, `'markdown'`, or `'json'` — auto-inferred from the value when unset
- `placeholder` - Placeholder text shown in empty paragraphs, or an object with a `mode: 'firstLine' | 'everyLine'`
- `markdown` - Options for markdown parsing/serialization
- `image` - Enable/configure the image extension (`false` to disable)
- `mention` - Enable/configure the mention extension (`false` to disable)
- `extensions` - Array of additional Tiptap extensions (e.g. `Underline`, `Emoji`) to register alongside the defaults
- `toolbar` - Set to `false` to hide the built-in formatting toolbar entirely
- `toolbarItems` - Override the default toolbar item groups (undo/redo, headings, marks, lists/blocks) — see [Nuxt UI's `EditorToolbarItem`](https://ui.nuxt.com/components/editor#toolbar) for the full `kind` list
- `editorHandlers` - Custom handler overrides for toolbar item behavior (renamed from Nuxt UI's `handlers` prop to avoid colliding with FormKit's own `context.handlers`)

::: warning
Unlike every other input, `nuxtUIEditor` has no `color`, `variant`, `size`, or `disabled` prop — it's a Tiptap options wrapper, not a themed Nuxt UI form control. FormKit's disabled state is mapped to Tiptap's `editable` option instead (the editor becomes read-only rather than visually "disabled").
:::

## Complete Form Example

Here's a comprehensive example using multiple input types:

```vue
<template>
  <FUDataEdit
    :data="profileData"
    :schema="profileSchema"
    @data-saved="saveProfile"
  />
</template>

<script setup lang="ts">
const profileData = ref({
  name: '',
  email: '',
  phone: '',
  bio: '',
  age: 25,
  country: '',
  role: '',
  skills: [],
  plan: 'free',
  notifications: true,
  newsletter: false
})

const profileSchema = [
  {
    $el: 'h3',
    children: 'Personal Information',
    attrs: { class: 'text-xl font-bold mb-4' }
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'name',
    label: 'Full Name',
    validation: 'required'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email',
    validation: 'required|email'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'phone',
    inputType: 'tel',
    label: 'Phone'
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'bio',
    label: 'Bio',
    rows: 3
  },
  {
    $el: 'h3',
    children: 'Additional Details',
    attrs: { class: 'text-xl font-bold mt-6 mb-4' }
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'age',
    label: 'Age',
    min: 13,
    max: 120
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: ['USA', 'UK', 'Canada', 'Australia']
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'skills',
    label: 'Skills',
    multiple: true,
    options: ['Vue', 'Nuxt', 'TypeScript', 'FormKit']
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'plan',
    label: 'Plan',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' }
    ]
  },
  {
    $el: 'h3',
    children: 'Preferences',
    attrs: { class: 'text-xl font-bold mt-6 mb-4' }
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'notifications',
    label: 'Enable notifications'
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'newsletter',
    label: 'Subscribe to newsletter'
  }
]

const saveProfile = async (data: any) => {
  await $fetch('/api/profile', { method: 'PUT', body: data })
}
</script>
```

## Template Usage (Alternative)

While schemas are recommended, template-based usage is also supported:

```vue
<FormKit
  type="nuxtUIInput"
  name="email"
  label="Email"
  input-type="email"
  validation="required|email"
/>
```

::: info Recommendation
Use schemas for better maintainability and type safety. Use templates only for simple forms or when you need fine-grained layout control.
:::

## Common Props

All input components support:

- `name` (required) - Field name for form data
- `label` - Field label text
- `help` - Help text below field
- `placeholder` - Placeholder text
- `validation` - Validation rules
- `disabled` - Disable the input
- `size` - Component size

## Next Steps

### 👁️ Output Components
Display-only components with schemas  
[View Output Components →](/components/outputs)

### 🔄 Repeater
Dynamic repeatable sections in schemas  
[Learn About Repeaters →](/components/repeater)

### 💡 Examples
Real-world schema-based forms  
[Browse Examples →](/examples/)

