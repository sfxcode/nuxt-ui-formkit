---
title: FUDataView Component
description: Display form data in read-only view mode with schema-based rendering.
---

## Overview

The `FUDataView` component is a wrapper that displays form data in read-only mode. It uses FormKit schemas to render output components, perfect for displaying user profiles, order details, or any data that shouldn't be edited.

::: info
**Read-Only Display:** FUDataView is designed for displaying data, not editing it. Use [FUDataEdit](/components/data-edit) for editable forms.
:::

## Basic Usage

```vue
<template>
  <FUDataView v-model="userData" :schema="schema" />
</template>

<script setup lang="ts">
const userData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  status: 'Active'
})

const schema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'name',
    label: 'Full Name'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'email',
    label: 'Email Address',
    leadingIcon: 'i-lucide-mail'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'status',
    label: 'Status',
    color: 'success'
  }
]
</script>
```

## Props

### data
- **Type:** `Object`
- **Default:** `null`
- **Description:** The data object to display. This will be used as the initial value for the `v-model`.

```vue
<FUDataView :data="{ name: 'John', email: 'john@example.com' }" />
```

### schema
- **Type:** `FormKitSchemaDefinition`
- **Default:** `null`
- **Description:** The FormKit schema definition that describes how to render the data. Use output components like `nuxtUIOutputText`, `nuxtUIOutputDate`, etc.

```typescript
const schema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'name',
    label: 'Name'
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'createdAt',
    label: 'Created',
    dateStyle: 'medium'
  }
]
```

### formClass
- **Type:** `String`
- **Default:** `''`
- **Description:** CSS class(es) to apply to the form element.

```vue
<FUDataView form-class="space-y-4 p-6 bg-gray-50 rounded-lg" />
```

### debugData
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** When `true`, displays a debug panel showing the current form data in JSON format. Useful for development and troubleshooting.

```vue
<FUDataView :data="userData" :schema="schema" debug-data />
```

### debugSchema
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** When `true`, displays a debug panel showing the schema definition in JSON format. Helpful for understanding the schema structure during development.

```vue
<FUDataView :data="userData" :schema="schema" debug-schema />
```

## Model Value

The component uses `v-model` to bind to the data being displayed:

```vue
<FUDataView v-model="userData" :schema="schema" />
```

The model value is of type `Record<string, unknown>` and represents the data object being displayed.

## Complete Example

```vue
<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">User Profile</h1>
    
    <FUDataView 
      v-model="userData" 
      :schema="profileSchema"
      form-class="space-y-4 bg-white p-6 rounded-lg shadow"
    />
    
    <div class="mt-6 flex gap-4">
      <UButton @click="editMode = true">Edit Profile</UButton>
      <UButton color="secondary" @click="toggleDebug">Toggle Debug</UButton>
    </div>
    
    <FUDataView 
      v-if="showDebug"
      v-model="userData" 
      :schema="profileSchema"
      debug-data
      debug-schema
    />
  </div>
</template>

<script setup lang="ts">
const userData = ref({
  name: 'Alice Johnson',
  email: 'alice@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Administrator',
  status: 'Active',
  joinDate: '2024-01-15',
  bio: 'Passionate software developer with 10 years of experience in web development.',
  isVerified: true
})

const showDebug = ref(false)
const editMode = ref(false)

const profileSchema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'name',
    label: 'Full Name',
    size: 'lg',
    leadingIcon: 'i-lucide-user'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'email',
    label: 'Email Address',
    leadingIcon: 'i-lucide-mail',
    color: 'blue'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'phone',
    label: 'Phone Number',
    leadingIcon: 'i-lucide-phone'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'role',
    label: 'Role',
    leadingIcon: 'i-lucide-shield',
    color: 'purple'
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isVerified',
    label: 'Verified',
    trueValue: 'Verified',
    falseValue: 'Not Verified',
    trueIcon: 'i-lucide-check-circle',
    falseIcon: 'i-lucide-x-circle',
    color: 'success'
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'joinDate',
    label: 'Join Date',
    dateStyle: 'long',
    leadingIcon: 'i-lucide-calendar'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'bio',
    label: 'Biography'
  }
]

const toggleDebug = () => {
  showDebug.value = !showDebug.value
}
</script>
```

## Using with Output Components

FUDataView is designed to work seamlessly with output components:

```typescript
const schema = [
  // Text output
  {
    $formkit: 'nuxtUIOutputText',
    name: 'title',
    label: 'Title'
  },
  
  // Boolean output
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'published',
    label: 'Published',
    trueValue: 'Yes',
    falseValue: 'No'
  },
  
  // Date output
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'createdAt',
    label: 'Created',
    dateStyle: 'full'
  },
  
  // Number output
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'price',
    label: 'Price',
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    }
  },
  
  // Link output
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'website',
    label: 'Website',
    target: '_blank'
  },
  
  // List output
  {
    $formkit: 'nuxtUIOutputList',
    name: 'tags',
    label: 'Tags',
    listType: 'comma'
  }
]
```

## Slots

### Default Slot

You can add additional content after the schema:

```vue
<FUDataView v-model="data" :schema="schema">
  <div class="mt-4 p-4 bg-blue-50 rounded">
    <p class="text-sm text-blue-800">Additional information or notes</p>
  </div>
</FUDataView>
```

## Use Cases

### User Profile Display

```vue
<FUDataView 
  v-model="userProfile" 
  :schema="profileSchema"
  form-class="max-w-2xl mx-auto"
/>
```

### Order Details

```vue
<FUDataView 
  v-model="orderData" 
  :schema="orderSchema"
  form-class="space-y-6"
/>
```

### Settings Preview

```vue
<FUDataView 
  v-model="settings" 
  :schema="settingsSchema"
  form-class="bg-gray-50 p-4 rounded"
/>
```

## Tips

::: info
**Development Tips:**
- Use `debug-data` during development to inspect the data structure
- Use `debug-schema` to verify your schema configuration
- Combine with FUDataEdit for a complete view/edit workflow
:::

## Related Components

- [FUDataEdit](/components/data-edit) - Editable form version
- [Output Components](/components/outputs) - All available output components
- [Schema Forms](/getting-started/schema-forms) - Learn about schema-based forms

