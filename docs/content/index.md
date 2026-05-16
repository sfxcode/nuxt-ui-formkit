---
seo:
  title: Nuxt UI FormKit
  description: FormKit integration for Nuxt UI - Seamlessly connect FormKit form handling with Nuxt UI components
---

::u-page-hero{class="dark:bg-gradient-to-b from-emerald-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Build Beautiful [Forms]{.text-primary} with FormKit & Nuxt UI.

#description
Powerful form management meets beautiful UI components. Seamlessly integrate FormKit's robust form handling with Nuxt UI's stunning design system for Nuxt 4.

#links
  :::u-button
  ---
  to: /getting-started/installation
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: xl
  to: https://github.com/sfxcode/nuxt-ui-formkit
  target: _blank
  ---
  View on GitHub
  :::

#default
  :::prose-pre
  ---
  code: |
    <script setup lang="ts">
    const formData = ref({ 
      email: '', 
      subscribe: false 
    })
    
    const schema = [
      {
        $formkit: 'nuxtUIInput',
        name: 'email',
        label: 'Email Address',
        inputType: 'email',
        validation: 'required|email'
      },
      {
        $formkit: 'nuxtUISwitch',
        name: 'subscribe',
        label: 'Subscribe to newsletter'
      }
    ]
    </script>

    <template>
      <FUDataEdit
        :data="formData"
        :schema="schema"
        @data-saved="handleSubmit"
      />
    </template>
  filename: app.vue
  ---

  ```vue [app.vue]
  <script setup lang="ts">
  const formData = ref({ 
    email: '', 
    subscribe: false 
  })
  
  const schema = [
    {
      $formkit: 'nuxtUIInput',
      name: 'email',
      label: 'Email Address',
      inputType: 'email',
      validation: 'required|email'
    },
    {
      $formkit: 'nuxtUISwitch',
      name: 'subscribe',
      label: 'Subscribe to newsletter'
    }
  ]
  </script>

  <template>
    <FUDataEdit
      :data="formData"
      :schema="schema"
      @data-saved="handleSubmit"
    />
  </template>
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Input Components + Output Components

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /components/inputs
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  Browse all components
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-square-check
  ---
  #title
  FormKit Inputs

  #description
  Complete set of 17 FormKit-wrapped Nuxt UI input components including text inputs, selects, checkboxes, date pickers, color pickers, and more.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-eye
  ---
  #title
  Output Components

  #description
  6 display-only components for read-only data visualization with custom formatting for booleans, dates, numbers, links, lists, and text.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Form Management

  #description
  Powerful utilities like FUDataEdit, FUDataView, and FUDataDebug for complete form lifecycle management with schema-based configuration.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-check-circle
  ---
  #title
  Built-in Validation

  #description
  Leverage FormKit's powerful validation system with real-time feedback and custom rules integrated seamlessly with Nuxt UI.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-repeat
  ---
  #title
  Repeatable Sections

  #description
  Dynamic form sections with add, remove, clone, and reorder capabilities, complete with smooth animations.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-palette
  ---
  #title
  Full Theme Support

  #description
  All components respect Nuxt UI's theming system with automatic dark mode, color modes, and design tokens.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Schema-Based Form Generation

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /getting-started/schema-forms
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  Learn about schemas
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-file-json
  ---
  #title
  JSON Schema Support

  #description
  Define forms using simple JSON schemas. No need to write template code - generate complete forms from configuration objects.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  ---
  #title
  TypeScript Ready

  #description
  Full TypeScript support with IntelliSense for all components, props, and schema definitions ensuring type safety.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Auto-imports

  #description
  All components and composables are automatically imported. No need for manual imports in your Nuxt application.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  SSR Compatible

  #description
  Works seamlessly with Nuxt's server-side rendering. All components properly handle hydration and client-side interactivity.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  External Module Support

  #description
  Import definitions programmatically in external modules. Use nuxt-ui-formkit components in your own Nuxt modules.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-accessibility
  ---
  #title
  Accessibility First

  #description
  Built on Nuxt UI's accessible foundation with proper ARIA labels, keyboard navigation, and screen reader support.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Get Started
      to: '/getting-started/installation'
      trailingIcon: i-lucide-arrow-right
    - label: View Examples
      to: '/examples'
      variant: subtle
      icon: i-lucide-code
  title: Ready to build amazing forms?
  description: Join developers building beautiful forms with FormKit and Nuxt UI. Install the module and start creating today.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
