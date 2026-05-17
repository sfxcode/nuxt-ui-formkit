---
title: FUDataEdit Component
description: Editable form component with schema-based rendering, submit/reset handling, and full validation support.
---

## Overview

The `FUDataEdit` component is a powerful form wrapper that provides schema-based form editing with built-in submit and reset functionality. It's perfect for creating edit forms, settings panels, or any scenario where users need to modify data.

::: info
**Full-Featured Forms:** FUDataEdit handles form submission, validation, reset functionality, and provides customizable action buttons out of the box.
:::

## Basic Usage

```vue
<template>
  <FUDataEdit 
    v-model="userData" 
    :schema="schema"
    @data-saved="handleSave"
  />
</template>

<script setup lang="ts">
const userData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
})

const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'name',
    label: 'Full Name',
    validation: 'required'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email',
    inputType: 'email',
    validation: 'required|email'
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'role',
    label: 'Role',
    options: ['user', 'admin', 'moderator']
  }
]

const handleSave = (data) => {
  console.log('Saving data:', data)
  // Make API call to save data
}
</script>
```

## Props

### id
- **Type:** `String`
- **Default:** `'formkit_form'`
- **Description:** Unique identifier for the FormKit form. Required for the reset functionality to work properly.

```vue
<FUDataEdit id="user-profile-form" />
```

### data
- **Type:** `Object`
- **Default:** `null`
- **Description:** The initial data object for the form. This will be used as the starting value for the `v-model`.

```vue
<FUDataEdit :data="{ name: 'John', email: 'john@example.com' }" />
```

### schema
- **Type:** `FormKitSchemaDefinition`
- **Default:** `null`
- **Description:** The FormKit schema definition that describes the form structure. Use input components like `nuxtUIInput`, `nuxtUISelect`, etc.

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'username',
    label: 'Username',
    validation: 'required|length:3,20'
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'bio',
    label: 'Biography',
    rows: 4
  }
]
```

### formClass
- **Type:** `String`
- **Default:** `''`
- **Description:** CSS class(es) to apply to the form element.

```vue
<FUDataEdit form-class="space-y-6 p-8 bg-white rounded-xl shadow-lg" />
```

### actionsClass
- **Type:** `String`
- **Default:** `''`
- **Description:** CSS class(es) to apply to the form actions container (where submit/reset buttons are displayed).

```vue
<FUDataEdit actions-class="flex gap-4 justify-end pt-6 border-t" />
```

### submitSeverity
- **Type:** `String`
- **Default:** `''`
- **Description:** Severity/color variant for the submit button. Common values: `primary`, `success`, `info`, etc.

```vue
<FUDataEdit submit-severity="success" />
```

### submitClass
- **Type:** `String`
- **Default:** `''`
- **Description:** CSS class(es) to apply to the submit button.

```vue
<FUDataEdit submit-class="min-w-32" />
```

### submitLabel
- **Type:** `String`
- **Default:** `'Save'`
- **Description:** Label text for the submit button.

```vue
<FUDataEdit submit-label="Update Profile" />
```

### submitIcon
- **Type:** `String`
- **Default:** `''`
- **Description:** Icon to display in the submit button. Uses Nuxt UI icon format.

```vue
<FUDataEdit submit-icon="i-lucide-save" />
```

### showReset
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** Whether to display a reset button next to the submit button.

```vue
<FUDataEdit show-reset />
```

### resetSeverity
- **Type:** `String`
- **Default:** `'danger'`
- **Description:** Severity/color variant for the reset button.

```vue
<FUDataEdit show-reset reset-severity="secondary" />
```

### resetLabel
- **Type:** `String`
- **Default:** `'Reset'`
- **Description:** Label text for the reset button.

```vue
<FUDataEdit show-reset reset-label="Clear Form" />
```

### resetClass
- **Type:** `String`
- **Default:** `''`
- **Description:** CSS class(es) to apply to the reset button.

```vue
<FUDataEdit show-reset reset-class="min-w-24" />
```

### resetIcon
- **Type:** `String`
- **Default:** `''`
- **Description:** Icon to display in the reset button.

```vue
<FUDataEdit show-reset reset-icon="i-lucide-rotate-ccw" />
```

### debugData
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** When `true`, displays a debug panel showing the current form data in JSON format.

```vue
<FUDataEdit debug-data />
```

### debugSchema
- **Type:** `Boolean`
- **Default:** `false`
- **Description:** When `true`, displays a debug panel showing the schema definition in JSON format.

```vue
<FUDataEdit debug-schema />
```

## Events

### @dataSaved
- **Payload:** `object` - The form data
- **Description:** Emitted when the form is submitted and passes validation.

```vue
<FUDataEdit @data-saved="handleSave" />

<script setup lang="ts">
const handleSave = (formData: object) => {
  console.log('Form submitted:', formData)
  // API call to save data
}
</script>
```

### @onReset
- **Payload:** None
- **Description:** Emitted when the reset button is clicked.

```vue
<FUDataEdit show-reset @on-reset="handleReset" />

<script setup lang="ts">
const handleReset = () => {
  console.log('Form reset')
  // Additional cleanup or notifications
}
</script>
```

## Model Value

The component uses `v-model` to bind to the form data:

```vue
<FUDataEdit v-model="formData" :schema="schema" />
```

The model value is of type `object` and represents the current state of the form data.

## Complete Example

```vue
<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Edit Profile</h1>
    
    <FUDataEdit
      id="profile-edit-form"
      v-model="userProfile"
      :schema="profileSchema"
      form-class="space-y-6 bg-white p-8 rounded-xl shadow-lg"
      actions-class="flex gap-4 justify-end pt-6 mt-6 border-t"
      submit-label="Save Changes"
      submit-icon="i-lucide-save"
      submit-severity="primary"
      submit-class="min-w-32"
      show-reset
      reset-label="Reset Form"
      reset-icon="i-lucide-rotate-ccw"
      reset-severity="secondary"
      @data-saved="handleSave"
      @on-reset="handleReset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userProfile = ref({
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice@example.com',
  phone: '+1 (555) 123-4567',
  role: 'admin',
  department: 'engineering',
  bio: 'Senior software engineer with expertise in Vue.js and TypeScript.',
  notifications: true,
  newsletter: false
})

const profileSchema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    leadingIcon: 'i-lucide-user',
    validation: 'required|length:2,50'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    validation: 'required|length:2,50'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email Address',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    leadingIcon: 'i-lucide-mail',
    validation: 'required|email'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'phone',
    label: 'Phone Number',
    inputType: 'tel',
    placeholder: '+1 (555) 123-4567',
    leadingIcon: 'i-lucide-phone'
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'role',
    label: 'Role',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Administrator', value: 'admin' },
      { label: 'Moderator', value: 'moderator' }
    ],
    validation: 'required'
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'department',
    label: 'Department',
    options: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Design', value: 'design' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' }
    ]
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'bio',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    rows: 4,
    validation: 'length:0,500'
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'notifications',
    label: 'Email Notifications',
    description: 'Receive email notifications about updates'
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'newsletter',
    label: 'Newsletter Subscription',
    description: 'Subscribe to our monthly newsletter'
  }
]

const handleSave = async (data: object) => {
  console.log('Saving profile:', data)
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success notification
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Failed to save profile')
  }
}

const handleReset = () => {
  console.log('Form has been reset')
  // Optional: Show notification that form was reset
}
</script>
```

## Slots

### Default Slot

Add additional form fields or content within the form:

```vue
<FUDataEdit v-model="data" :schema="schema">
  <div class="p-4 bg-blue-50 rounded border border-blue-200">
    <p class="text-sm text-blue-800">
      <strong>Note:</strong> Changes are saved automatically.
    </p>
  </div>
</FUDataEdit>
```

### Messages Slot

Customize the form messages display:

```vue
<FUDataEdit v-model="data" :schema="schema">
  <template #messages>
    <div class="custom-messages">
      <FormKitMessages />
    </div>
  </template>
</FUDataEdit>
```

### Submit Slot

Completely customize the action buttons:

```vue
<FUDataEdit v-model="data" :schema="schema">
  <template #submit>
    <div class="flex gap-4 justify-between">
      <UButton color="secondary" @click="goBack">
        Cancel
      </UButton>
      
      <div class="flex gap-2">
        <UButton type="submit" color="primary">
          Save Changes
        </UButton>
        <UButton type="button" color="success" @click="saveAndContinue">
          Save & Continue
        </UButton>
      </div>
    </div>
  </template>
</FUDataEdit>
```

## Use Cases

### User Profile Editor

```vue
<FUDataEdit
  id="profile-form"
  v-model="profile"
  :schema="profileSchema"
  submit-label="Update Profile"
  submit-icon="i-lucide-user-check"
  show-reset
  @data-saved="updateProfile"
/>
```

### Settings Panel

```vue
<FUDataEdit
  id="settings-form"
  v-model="settings"
  :schema="settingsSchema"
  submit-label="Save Settings"
  submit-icon="i-lucide-settings"
  form-class="max-w-2xl"
  @data-saved="saveSettings"
/>
```

### Multi-Step Form

```vue
<FUDataEdit
  :id="`step-${currentStep}`"
  v-model="formData"
  :schema="currentStepSchema"
  :submit-label="isLastStep ? 'Submit' : 'Next'"
  :submit-icon="isLastStep ? 'i-lucide-check' : 'i-lucide-arrow-right'"
  @data-saved="handleStepComplete"
/>
```

### Admin Form with Debug

```vue
<FUDataEdit
  id="admin-form"
  v-model="adminData"
  :schema="adminSchema"
  submit-label="Save"
  show-reset
  debug-data
  debug-schema
  @data-saved="saveAdminData"
/>
```

## Validation

FUDataEdit fully supports FormKit validation:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'username',
    label: 'Username',
    validation: 'required|length:3,20|alphanumeric'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'password',
    inputType: 'password',
    label: 'Password',
    validation: 'required|length:8,50'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'confirmPassword',
    inputType: 'password',
    label: 'Confirm Password',
    validation: 'required|confirm:password',
    validationLabel: 'Password confirmation'
  }
]
```

## Tips

::: info
**Best Practices:**
- Always provide a unique `id` prop for proper form identification
- Use validation on required fields to ensure data integrity
- Combine with `debug-data` during development to inspect form state
- Use the `@data-saved` event for API calls and success notifications
- Leverage the `show-reset` prop for forms where users might want to start over
:::

::: info
**Important:**
The form will only emit the `@data-saved` event when all validation passes. Make sure to define proper validation rules for your fields.
:::

## Related Components

- [FUDataView](/components/data-view) - Read-only display version
- [Input Components](/components/inputs) - All available input components
- [Schema Forms](/getting-started/schema-forms) - Learn about schema-based forms
- [Repeater Component](/components/repeater) - Dynamic repeatable sections

