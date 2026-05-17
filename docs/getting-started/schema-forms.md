# Schema-Based Forms

Learn how to build forms using JSON schemas for more maintainable and dynamic form generation.

## Why Use Schemas?

Schema-based forms offer several advantages:

- **Maintainability** - Separate form structure from component templates
- **Reusability** - Share schemas across components or projects
- **Dynamic** - Generate forms from API responses or configuration files
- **Type Safety** - Full TypeScript support for schema definitions
- **Consistency** - Enforce consistent form patterns across your application

## Basic Schema

A schema is an array of field definitions:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'username',
    label: 'Username',
    validation: 'required|length:3'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email Address',
    validation: 'required|email'
  }
]
```

## Using FUDataEdit

The `FUDataEdit` component renders a schema-based form:

```vue
<template>
  <FUDataEdit
    :data="formData"
    :schema="userSchema"
    @data-saved="handleSubmit"
  />
</template>

<script setup lang="ts">
const formData = ref({
  username: '',
  email: '',
  bio: ''
})

const userSchema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'username',
    label: 'Username',
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
    $formkit: 'nuxtUITextarea',
    name: 'bio',
    label: 'Bio',
    rows: 4
  }
]

const handleSubmit = (data: any) => {
  console.log('Submitted:', data)
}
</script>
```

## FUDataView for Display

Use `FUDataView` to display data in read-only mode:

```vue
<template>
  <FUDataView
    :data="userData"
    :schema="displaySchema"
  />
</template>

<script setup lang="ts">
const userData = ref({
  name: 'John Doe',
  email: 'john@example.com',
  price: 1234.56,
  isActive: true
})

const displaySchema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'name',
    label: 'Full Name'
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'email',
    label: 'Email Address'
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'price',
    label: 'Price',
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    }
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isActive',
    label: 'Status'
  }
]
</script>
```

## Advanced Schema Features

### Conditional Fields

Show fields based on other field values:

```typescript
const schema = [
  {
    $formkit: 'nuxtUISelect',
    name: 'userType',
    label: 'User Type',
    options: ['individual', 'business']
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'companyName',
    label: 'Company Name',
    if: '$get(userType).value === "business"' // Only show for business users
  }
]
```

### Grouped Fields

Group related fields together:

```typescript
const schema = [
  {
    $el: 'h3',
    children: 'Personal Information'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'firstName',
    label: 'First Name'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'lastName',
    label: 'Last Name'
  },
  {
    $el: 'h3',
    children: 'Contact Details',
    attrs: {
      class: 'mt-6'
    }
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email'
  }
]
```

### Dynamic Options

Load options dynamically:

```vue
<script setup lang="ts">
const countries = ref<string[]>([])

onMounted(async () => {
  countries.value = await $fetch('/api/countries')
})

const schema = computed(() => [
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: countries.value
  }
])
</script>
```

## Schema with Repeaters

Create dynamic lists with the repeater:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'contacts',
    label: 'Contacts',
    newItem: { name: '', email: '' },
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'name',
        label: 'Name'
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'email',
        inputType: 'email',
        label: 'Email'
      }
    ]
  }
]
```

## TypeScript Support

Define typed schemas for better IntelliSense:

```typescript
import type { FormKitSchemaNode } from '@formkit/core'

interface UserForm {
  name: string
  email: string
  age: number
}

const formData = ref<UserForm>({
  name: '',
  email: '',
  age: 0
})

const schema: FormKitSchemaNode[] = [
  {
    $formkit: 'nuxtUIInput',
    name: 'name',
    label: 'Name',
    validation: 'required'
  },
  // ... more fields
]
```

## Best Practices

- ✅ Keep schemas in separate files for reusability
- ✅ Use TypeScript interfaces for form data
- ✅ Leverage computed properties for dynamic schemas
- ✅ Group related fields with sections
- ✅ Use conditional rendering for complex forms
- ✅ Add clear labels and help text

## Next Steps

### 🔄 Repeaters
Learn about dynamic repeatable sections  
[View Repeaters →](/components/repeater)

### 💡 Examples
See real-world schema-based forms  
[Browse Examples →](/examples/)

### 📚 API Reference
Complete API documentation  
[API Docs →](/api/utilities)

