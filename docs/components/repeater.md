---
title: Repeater Component
description: Create dynamic repeatable form sections with add, remove, clone, and reorder functionality.
---

## Overview

The `nuxtUIRepeater` component is a special input component that allows you to create dynamic form sections where users can add, remove, clone, and reorder items. Perfect for managing lists like contacts, addresses, skills, or any repeatable data.

It is also imported and registered globally, so you can use it anywhere in your Nuxt app without additional imports.

## Basic Usage

```vue
<template>
  <FormKit type="form" @submit="handleSubmit">
    <FormKit
      type="nuxtUIRepeater"
      name="contacts"
      label="Contacts"
      :new-item="{ name: '', email: '' }"
    >
      <FormKit
        type="nuxtUIInput"
        name="name"
        label="Name"
        validation="required"
      />
      
      <FormKit
        type="nuxtUIInput"
        name="email"
        input-type="email"
        label="Email"
        validation="required|email"
      />
    </FormKit>
  </FormKit>
</template>

<script setup lang="ts">
const handleSubmit = (data: any) => {
  console.log('Contacts:', data.contacts)
}
</script>
```

## Schema-Based Repeater

Use repeaters in schema definitions:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'experiences',
    label: 'Work Experience',
    newItem: {
      company: '',
      position: '',
      years: 0
    },
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'company',
        label: 'Company',
        validation: 'required'
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'position',
        label: 'Position',
        validation: 'required'
      },
      {
        $formkit: 'nuxtUIInputNumber',
        name: 'years',
        label: 'Years',
        min: 0
      }
    ]
  }
]
```

## Props

### newItem

Default object for new items. Required.

```vue
<FormKit
  type="nuxtUIRepeater"
  :new-item="{ name: '', email: '', phone: '' }"
/>
```

### Button Configuration

Control which buttons are displayed:

```vue
<FormKit
  type="nuxtUIRepeater"
  name="items"
  :hide-button-group="false"
  :hide-move-buttons="false"
  :display-clone-button="true"
  :display-add-button="true"
  :display-delete-button="true"
/>
```

### Insert Button

Customize the "Add Item" button:

```vue
<FormKit
  type="nuxtUIRepeater"
  name="skills"
  insert-button-label="Add Skill"
  insert-button-size="lg"
  insert-button-class="mb-4"
  :always-display-insert-button="true"
/>
```

### Button Styling

```vue
<FormKit
  type="nuxtUIRepeater"
  name="items"
  button-size="sm"
  button-group-class="flex gap-2"
  button-group-item-class="flex-shrink-0"
/>
```

### List Styling

```vue
<FormKit
  type="nuxtUIRepeater"
  name="items"
  list-class="space-y-4"
  list-item-class="p-4 border rounded-lg"
/>
```

## Auto-Animate

Repeaters automatically use `@formkit/auto-animate` for smooth animations when items are added, removed, or reordered.

### Configure Animation

In your `formkit.config.ts`:

```typescript
import { createAutoAnimatePlugin } from '@formkit/addons'

export default {
  plugins: [
    createAutoAnimatePlugin(
      {
        /* optional AutoAnimate config */
        // default:
        duration: 250,
        easing: 'ease-in-out',
      },
      {
        /* optional animation targets object */
        // default:
        global: ['outer', 'inner'],
        form: ['form'],
        // for nuxtUIRepeater:
        nuxtUIRepeater: ['input'],
      },
    ),
  ]
}
```

## Examples

### Contact List

```vue
<FormKit
  type="nuxtUIRepeater"
  name="contacts"
  label="Emergency Contacts"
  :new-item="{ name: '', phone: '', relationship: '' }"
  insert-button-label="Add Contact"
>
  <FormKit
    type="nuxtUIInput"
    name="name"
    label="Name"
    validation="required"
  />
  
  <FormKit
    type="nuxtUIInput"
    name="phone"
    input-type="tel"
    label="Phone"
    validation="required"
  />
  
  <FormKit
    type="nuxtUISelect"
    name="relationship"
    label="Relationship"
    :options="['Family', 'Friend', 'Colleague', 'Other']"
  />
</FormKit>
```

### Product Variants

```vue
<FormKit
  type="nuxtUIRepeater"
  name="variants"
  label="Product Variants"
  :new-item="{ size: '', color: '', price: 0, stock: 0 }"
  list-item-class="grid grid-cols-4 gap-4"
>
  <FormKit
    type="nuxtUISelect"
    name="size"
    label="Size"
    :options="['XS', 'S', 'M', 'L', 'XL']"
  />
  
  <FormKit
    type="nuxtUIColorPicker"
    name="color"
    label="Color"
  />
  
  <FormKit
    type="nuxtUIInputNumber"
    name="price"
    label="Price"
    :min="0"
    :step="0.01"
  />
  
  <FormKit
    type="nuxtUIInputNumber"
    name="stock"
    label="Stock"
    :min="0"
  />
</FormKit>
```

### Skills with Tags

```vue
<FormKit
  type="nuxtUIRepeater"
  name="skillCategories"
  label="Skill Categories"
  :new-item="{ category: '', skills: [] }"
>
  <FormKit
    type="nuxtUIInput"
    name="category"
    label="Category"
    validation="required"
  />
  
  <FormKit
    type="nuxtUIInputTags"
    name="skills"
    label="Skills"
    placeholder="Add skills..."
  />
</FormKit>
```

## Features

<List type="info">
- **Add Items** - Insert new items at the beginning or after specific items
- **Remove Items** - Delete items with confirmation
- **Clone Items** - Duplicate existing items
- **Reorder** - Move items up and down
- **Smooth Animations** - Automatic animations for all operations
- **Custom Styling** - Full control over button and list appearance
- **Validation** - Built-in validation for repeated fields
</List>

## Best Practices

<List type="info">
- Always provide a `newItem` prop with all required fields
- Use validation on repeated fields for data integrity
- Consider UX - don't allow removing the last item if at least one is required
- Use `list-item-class` for consistent spacing and layout
- Provide clear labels for add/remove buttons
</List>

## Next Steps

<CardGrid>
  <Card title="View Examples" icon="i-lucide-code" to="/examples">
    See repeaters in real-world forms
  </Card>

  <Card title="Utilities" icon="i-lucide-wrench" to="/api/utilities">
    Learn about form utilities
  </Card>

  <Card title="API Reference" icon="i-lucide-book" to="/api/components">
    Complete API documentation
  </Card>
</CardGrid>

