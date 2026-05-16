---
title: Examples
description: Real-world form examples showcasing Nuxt UI FormKit components in action.
---

## Overview

Explore complete, production-ready form examples that demonstrate best practices and common use cases with Nuxt UI FormKit.

::callout{icon="i-lucide-github" color="primary"}
More examples are available in the [playground](https://github.com/sfxcode/nuxt-ui-formkit/tree/main/playground/app/pages) of the repository.
::

## Contact Form

A simple contact form with validation:

```vue
<template>
  <FormKit
    type="form"
    :actions="false"
    @submit="handleSubmit"
  >
    <FormKit
      type="nuxtUIInput"
      name="name"
      label="Full Name"
      placeholder="John Doe"
      validation="required"
    />

    <FormKit
      type="nuxtUIInput"
      name="email"
      label="Email Address"
      input-type="email"
      placeholder="john@example.com"
      validation="required|email"
    />

    <FormKit
      type="nuxtUITextarea"
      name="message"
      label="Message"
      placeholder="How can we help?"
      validation="required|length:10"
      :rows="4"
    />

    <FormKit
      type="nuxtUICheckbox"
      name="subscribe"
      label="Subscribe to our newsletter"
    />

    <div class="flex gap-2">
      <UButton type="submit" size="lg">
        Send Message
      </UButton>
      <UButton type="reset" color="neutral" variant="outline" size="lg">
        Clear
      </UButton>
    </div>
  </FormKit>
</template>

<script setup lang="ts">
const handleSubmit = async (data: any) => {
  await $fetch('/api/contact', {
    method: 'POST',
    body: data
  })
}
</script>
```

## User Profile Form

Multi-section profile form with schema:

```vue
<template>
  <FUDataEdit
    :data="profile"
    :schema="profileSchema"
    @data-saved="saveProfile"
  />
</template>

<script setup lang="ts">
const profile = ref({
  // Personal Info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: null,
  
  // Address
  street: '',
  city: '',
  country: '',
  postalCode: '',
  
  // Preferences
  theme: 'light',
  newsletter: false,
  notifications: []
})

const profileSchema = [
  { $el: 'h3', children: 'Personal Information', attrs: { class: 'text-xl font-bold mb-4' } },
  {
    $formkit: 'nuxtUIInput',
    name: 'firstName',
    label: 'First Name',
    validation: 'required'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'lastName',
    label: 'Last Name',
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
    $formkit: 'nuxtUIInputDate',
    name: 'birthDate',
    label: 'Date of Birth'
  },
  
  { $el: 'h3', children: 'Address', attrs: { class: 'text-xl font-bold mt-8 mb-4' } },
  {
    $formkit: 'nuxtUIInput',
    name: 'street',
    label: 'Street Address'
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'city',
    label: 'City'
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'country',
    label: 'Country',
    options: ['USA', 'UK', 'Canada', 'Australia', 'Germany']
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'postalCode',
    label: 'Postal Code'
  },
  
  { $el: 'h3', children: 'Preferences', attrs: { class: 'text-xl font-bold mt-8 mb-4' } },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'theme',
    label: 'Color Theme',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'System', value: 'system' }
    ]
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'newsletter',
    label: 'Subscribe to newsletter'
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'notifications',
    label: 'Notification Preferences',
    options: [
      { label: 'Email notifications', value: 'email' },
      { label: 'Push notifications', value: 'push' },
      { label: 'SMS notifications', value: 'sms' }
    ]
  }
]

const saveProfile = async (data: any) => {
  await $fetch('/api/profile', {
    method: 'PUT',
    body: data
  })
}
</script>
```

## More Examples

::card-group
  :::card
  ---
  icon: i-lucide-github
  title: Playground
  to: https://github.com/sfxcode/nuxt-ui-formkit/tree/main/playground/app/pages
  target: _blank
  ---
  Browse all examples in the repository
  :::

  :::card
  ---
  icon: i-lucide-book
  title: Components
  to: /components/inputs
  ---
  Learn about individual components
  :::

  :::card
  ---
  icon: i-lucide-file-json
  title: Schema Forms
  to: /getting-started/schema-forms
  ---
  Build forms with schemas
  :::
::

