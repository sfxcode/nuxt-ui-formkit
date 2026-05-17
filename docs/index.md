---
layout: home

hero:
  name: Nuxt UI FormKit
  text: Build Beautiful Forms with FormKit & Nuxt UI
  tagline: Powerful form management meets beautiful UI components. Seamlessly integrate FormKit's robust form handling with Nuxt UI's stunning design system for Nuxt 4.
  image:
    src: /logo.svg
    alt: Nuxt UI FormKit
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/sfxcode/nuxt-ui-formkit

features:
  - icon: ✅
    title: FormKit Inputs
    details: Complete set of 17 FormKit-wrapped Nuxt UI input components including text inputs, selects, checkboxes, date pickers, color pickers, and more.
  
  - icon: 👁️
    title: Output Components
    details: 6 display-only components for read-only data visualization with custom formatting for booleans, dates, numbers, links, lists, and text.
  
  - icon: 🔄
    title: Repeatable Sections
    details: Dynamic form sections with add, remove, clone, and reorder capabilities, complete with smooth animations.
  
  - icon: 🎨
    title: Full Theme Support
    details: All components respect Nuxt UI's theming system with automatic dark mode, color modes, and design tokens.
  
  - icon: ✔️
    title: Built-in Validation
    details: Leverage FormKit's powerful validation system with real-time feedback and custom rules integrated seamlessly with Nuxt UI.
  
  - icon: 📦
    title: Form Management
    details: Powerful utilities like FUDataEdit, FUDataView, and FUDataDebug for complete form lifecycle management with schema-based configuration.
  
  - icon: 📄
    title: JSON Schema Support
    details: Define forms using simple JSON schemas. No need to write template code - generate complete forms from configuration objects.
  
  - icon: 🔤
    title: TypeScript Ready
    details: Full TypeScript support with IntelliSense for all components, props, and schema definitions ensuring type safety.
  
  - icon: ⚡
    title: Auto-imports
    details: All components and composables are automatically imported. No need for manual imports in your Nuxt application.
  
  - icon: 📦
    title: External Module Support
    details: Import definitions programmatically in external modules. Use nuxt-ui-formkit components in your own Nuxt modules.
  
  - icon: ♿
    title: Accessibility First
    details: Built on Nuxt UI's accessible foundation with proper ARIA labels, keyboard navigation, and screen reader support.
---

## Quick Example

```vue
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

## Why Nuxt UI FormKit?

Nuxt UI FormKit bridges the gap between FormKit's powerful form handling capabilities and Nuxt UI's beautiful component system. Whether you're building simple contact forms or complex multi-step wizards, this module provides everything you need to create production-ready forms quickly.

### Key Benefits

- **Schema-First Approach**: Define forms as JSON objects for better maintainability and reusability
- **Complete Component Library**: 17 input components + 6 output components + management utilities
- **Production Ready**: Battle-tested with TypeScript, SSR support, and accessibility built-in
- **Developer Experience**: Auto-imports, IntelliSense, and comprehensive documentation

## Ready to Start?

Get started by [installing the module](/getting-started/installation) or explore the [component library](/components/inputs).

