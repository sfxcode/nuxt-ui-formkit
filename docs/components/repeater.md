---
title: Repeater Component
description: Create dynamic repeatable form sections with add, remove, clone, and drag-and-drop reordering functionality.
---

## Overview

The `nuxtUIRepeater` component is a special input component that allows you to create dynamic form sections where users can add, remove, clone, and reorder items. Perfect for managing lists like contacts, addresses, skills, or any repeatable data. Supports both button-based reordering and intuitive drag-and-drop functionality.

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

### Min/Max Items Constraints

Control the minimum and maximum number of items allowed:

```vue
<FormKit
  type="nuxtUIRepeater"
  name="contacts"
  :new-item="{ name: '', phone: '' }"
  :min-items="1"
  :max-items="5"
>
  <!-- form fields -->
</FormKit>
```

**Props:**

- **minItems** - Minimum number of items required (default: 0). When reached, the delete button is automatically disabled.
- **maxItems** - Maximum number of items allowed (default: unlimited). When reached, add/insert/clone buttons are automatically disabled.

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

### Drag and Drop Reordering

Enable drag-and-drop reordering with a drag handle:

```vue
<FormKit
  type="nuxtUIRepeater"
  name="tasks"
  :new-item="{ title: '', priority: 'medium' }"
  :display-drag-handle="true"
  drag-handle-class="cursor-grab active:cursor-grabbing"
  drag-handle-icon-class="i-lucide-grip-vertical"
>
  <!-- form fields -->
</FormKit>
```

**Props:**

- **displayDragHandle** - Enable drag-and-drop reordering (default: false)
- **dragHandleClass** - CSS class for the drag handle container (default: 'formkit-repeater-drag-handle')
- **dragHandleIconClass** - Icon class for the drag handle (default: 'i-lucide-grip-vertical')

When drag-and-drop is enabled:
- Items can be reordered by dragging the handle icon
- A visual indicator shows the drop target during dragging
- Move up/down buttons can be hidden with `:hide-move-buttons="true"` if only drag-and-drop is desired

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

### Drag-and-Drop Task List

```vue
<FormKit
  type="nuxtUIRepeater"
  name="tasks"
  label="Task List"
  :new-item="{ title: '', priority: 'medium', status: 'todo' }"
  :display-drag-handle="true"
  :hide-move-buttons="true"
  list-item-class="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
>
  <FormKit
    type="nuxtUIInput"
    name="title"
    label="Task"
    validation="required"
  />
  
  <FormKit
    type="nuxtUISelect"
    name="priority"
    label="Priority"
    :options="['low', 'medium', 'high']"
  />
  
  <FormKit
    type="nuxtUISelect"
    name="status"
    label="Status"
    :options="['todo', 'in-progress', 'done']"
  />
</FormKit>
```

This example enables drag-and-drop reordering and hides the traditional up/down buttons, providing a modern UX for task management.

### Team Members with Constraints

```vue
<FormKit
  type="nuxtUIRepeater"
  name="teamMembers"
  label="Team Members"
  :new-item="{ name: '', role: '', email: '' }"
  :min-items="2"
  :max-items="10"
  insert-button-label="Add Team Member"
>
  <FormKit
    type="nuxtUIInput"
    name="name"
    label="Name"
    validation="required"
  />
  
  <FormKit
    type="nuxtUISelect"
    name="role"
    label="Role"
    :options="['Developer', 'Designer', 'Manager', 'QA']"
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
```

This example requires at least 2 team members and allows a maximum of 10. The delete button will be disabled when only 2 items remain, and add/clone buttons will be disabled when 10 items are reached.

### Nested Repeaters

A `nuxtUIRepeater` can be nested inside another repeater's item schema — each nesting level manages its own items, buttons, and `newItem` independently, so inserting/removing/cloning at one level never affects sibling items at another level:

```vue
<FormKit
  type="nuxtUIRepeater"
  name="employers"
  label="Work History"
  :new-item="{ company: '', references: [] }"
  insert-button-label="Add Employer"
>
  <FormKit
    type="nuxtUIInput"
    name="company"
    label="Company"
    validation="required"
  />

  <FormKit
    type="nuxtUIRepeater"
    name="references"
    label="References"
    :new-item="{ name: '' }"
    insert-button-label="Add Reference"
  >
    <FormKit
      type="nuxtUIInput"
      name="name"
      label="Reference Name"
      validation="required"
    />
  </FormKit>
</FormKit>
```

The same pattern works in schema-based repeaters — nest a second `nuxtUIRepeater` schema node inside the outer repeater's `children` array.

## Features

- **Add Items** - Insert new items at the beginning or after specific items
- **Remove Items** - Delete items with confirmation
- **Clone Items** - Duplicate existing items
- **Reorder** - Move items up and down with buttons
- **Drag and Drop** - Intuitive drag-and-drop reordering with visual feedback
- **Min/Max Constraints** - Limit the minimum and maximum number of items
- **Smooth Animations** - Automatic animations for all operations
- **Custom Styling** - Full control over button and list appearance
- **Validation** - Built-in validation for repeated fields

## Best Practices

- Always provide a `newItem` prop with all required fields
- Use validation on repeated fields for data integrity
- Use `min-items` to enforce minimum requirements (e.g., at least one contact)
- Use `max-items` to prevent excessive data entry and improve UX
- Consider UX - buttons are automatically disabled when constraints are reached
- Use drag-and-drop for better UX when managing sortable lists
- Hide move buttons (`:hide-move-buttons="true"`) when using drag-and-drop only
- Use `list-item-class` for consistent spacing and layout
- Provide clear labels for add/remove buttons

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

