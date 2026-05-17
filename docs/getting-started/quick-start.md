# Quick Start

Learn the basics of Nuxt UI FormKit using schema-based forms and create your first form in minutes.

## Your First Schema-Based Form

Nuxt UI FormKit is designed around **schema-based forms** - a powerful pattern where you define your form structure as a JSON object. This approach provides better maintainability, reusability, and type safety.

Create a new page in your Nuxt application:

```vue [pages/contact.vue]
<template>
  <UContainer>
    <div class="max-w-xl mx-auto my-8">
      <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
      
      <FUDataEdit
        :data="formData"
        :schema="contactSchema"
        @data-saved="handleSubmit"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Define your data structure
const formData = ref({
  name: '',
  email: '',
  message: '',
  subscribe: false
})

// Define your form schema
const contactSchema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'name',
    label: 'Your Name',
    placeholder: 'John Doe',
    validation: 'required'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email Address',
    placeholder: 'john@example.com',
    validation: 'required|email'
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'message',
    label: 'Message',
    placeholder: 'Tell us how we can help...',
    validation: 'required|length:10',
    rows: 4
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'subscribe',
    label: 'Subscribe to our newsletter'
  }
]

const handleSubmit = async (data: any) => {
  console.log('Form data:', data)
  // Send to API
  // await $fetch('/api/contact', { method: 'POST', body: data })
}
</script>
```

## Understanding Schema-Based Forms

### Why Schemas?

Schemas are **first-class citizens** in Nuxt UI FormKit:

- ✅ **Maintainable** - Form structure separated from template code
- ✅ **Reusable** - Share schemas across components and projects
- ✅ **Type-safe** - Full TypeScript support and IntelliSense
- ✅ **Dynamic** - Generate forms from API responses or config files
- ✅ **Composable** - Build complex forms from smaller schemas
- ✅ **Testable** - Easy to test form logic without rendering

### The Schema Pattern

Every schema is an array of field definitions:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',  // Component type
    name: 'fieldName',        // Field name in data object
    label: 'Field Label',     // Display label
    validation: 'required',   // Validation rules
    // ... other component props
  }
]
```

### FUDataEdit Component

The `FUDataEdit` component is your main tool for schema-based forms:

```vue
<FUDataEdit
  :data="formData"           <!-- Reactive data object -->
  :schema="schema"           <!-- Form schema definition -->
  :debug-data="false"        <!-- Optional: show debug panel -->
  @data-saved="handleSubmit" <!-- Form submission handler -->
/>
```

**Key Features:**
- Automatic two-way binding with `data`
- Built-in form wrapper and submit handling
- Validation support out of the box
- Optional debug panel for development

## Building Your Schema

### Basic Field Types

```typescript
const userSchema = [
  // Text input
  {
    $formkit: 'nuxtUIInput',
    name: 'username',
    label: 'Username',
    validation: 'required|length:3'
  },
  
  // Email input
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email',
    validation: 'required|email'
  },
  
  // Number input
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'age',
    label: 'Age',
    min: 0,
    max: 120
  },
  
  // Select dropdown
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: ['USA', 'UK', 'Canada', 'Australia']
  },
  
  // Switch toggle
  {
    $formkit: 'nuxtUISwitch',
    name: 'newsletter',
    label: 'Subscribe to newsletter'
  }
]
```

### Organizing with Sections

Use HTML elements to structure your form:

```typescript
const schema = [
  // Section heading
  {
    $el: 'h3',
    children: 'Personal Information',
    attrs: { class: 'text-xl font-bold mb-4' }
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
  
  // Another section
  {
    $el: 'h3',
    children: 'Contact Details',
    attrs: { class: 'text-xl font-bold mt-6 mb-4' }
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email'
  }
]
```

## Complete Example

Here's a comprehensive user registration form:

```vue
<template>
  <UContainer>
    <div class="max-w-2xl mx-auto my-8">
      <h1 class="text-3xl font-bold mb-6">Create Account</h1>
      
      <FUDataEdit
        :data="userData"
        :schema="registrationSchema"
        @data-saved="register"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: 18,
  country: '',
  terms: false,
  newsletter: true
})

const registrationSchema = [
  // Personal Information
  {
    $el: 'div',
    attrs: { class: 'mb-6' },
    children: [
      {
        $el: 'h2',
        children: 'Personal Information',
        attrs: { class: 'text-2xl font-semibold mb-4' }
      }
    ]
  },
  {
    $el: 'div',
    attrs: { class: 'grid grid-cols-2 gap-4' },
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'firstName',
        label: 'First Name',
        validation: 'required|length:2'
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'lastName',
        label: 'Last Name',
        validation: 'required|length:2'
      }
    ]
  },
  
  // Account Details
  {
    $el: 'h2',
    children: 'Account Details',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    inputType: 'email',
    label: 'Email Address',
    validation: 'required|email'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'password',
    inputType: 'password',
    label: 'Password',
    validation: 'required|length:8'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'confirmPassword',
    inputType: 'password',
    label: 'Confirm Password',
    validation: 'required|confirm:password'
  },
  
  // Additional Info
  {
    $el: 'h2',
    children: 'Additional Information',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'age',
    label: 'Age',
    min: 13,
    max: 120,
    validation: 'required|min:13'
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France'],
    validation: 'required'
  },
  
  // Preferences
  {
    $el: 'h2',
    children: 'Preferences',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    validation: 'accepted'
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'newsletter',
    label: 'Send me product updates and newsletters'
  }
]

const register = async (data: any) => {
  console.log('Registration data:', data)
  // API call
  await $fetch('/api/register', {
    method: 'POST',
    body: data
  })
}
</script>
```

## Validation

FormKit's validation integrates seamlessly with schemas:

```typescript
const schema = [
  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email',
    validation: 'required|email',
    validationMessages: {
      required: 'Email is required',
      email: 'Please enter a valid email'
    }
  }
]
```

**Common Rules:**
- `required` - Must have value
- `email` - Valid email format
- `length:min,max` - String length
- `min:n` / `max:n` - Numeric range
- `matches:/pattern/` - Regex match
- `confirm:field` - Match another field

See [FormKit validation docs](https://formkit.com/essentials/validation) for complete list.

## Template-Based Forms (Alternative)

While schemas are recommended, you can also use template-based forms:

```vue
<FormKit type="form" @submit="handleSubmit">
  <FormKit
    type="nuxtUIInput"
    name="email"
    label="Email"
    validation="required|email"
  />
</FormKit>
```

::: tip Best Practice
Use schemas for most forms. Reserve template-based approach for simple cases or when you need fine-grained control over layout.
:::

## Next Steps

### 📄 Schema Forms Deep Dive
Advanced schema patterns and techniques  
[Learn More →](/getting-started/schema-forms)

### 🧩 Component Reference
All available components with schema examples  
[Browse Components →](/components/inputs)

### 🔄 Repeaters
Dynamic repeatable sections in schemas  
[View Repeaters →](/components/repeater)

