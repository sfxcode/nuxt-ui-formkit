# Installation

Get started with Nuxt UI FormKit by installing the module in your Nuxt application.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** 18.x or higher
- **Nuxt** 4.x
- **pnpm**, **npm**, or **yarn** package manager

## Install Package

Install the `@sfxcode/nuxt-ui-formkit` module using your preferred package manager:

::: code-group

```bash [pnpm]
pnpm add @sfxcode/nuxt-ui-formkit
```

```bash [npm]
npm install @sfxcode/nuxt-ui-formkit
```

```bash [yarn]
yarn add @sfxcode/nuxt-ui-formkit
```

:::

## Module Configuration

Add the module to your `nuxt.config.ts`:

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@sfxcode/nuxt-ui-formkit'
  ]
})
```

::: info
**Note:** Make sure to add `@nuxt/ui` before `@sfxcode/nuxt-ui-formkit` in the modules array.
:::

## FormKit Configuration

Create a `formkit.config.ts` file in your project root to configure FormKit:

```typescript [formkit.config.ts]
import type { DefaultConfigOptions } from '@formkit/vue'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { en } from '@formkit/i18n'

const config: DefaultConfigOptions = {
  locales: { en },
  locale: 'en',
  plugins: [
    createAutoAnimatePlugin(
      {
        duration: 250,
        easing: 'ease-in-out',
      },
      {
        global: ['outer', 'inner'],
        form: ['form'],
        nuxtUIRepeater: ['items'],
      }
    )
  ],
}

export default config
```

## Verify Installation

Create a test page to verify the installation:

```vue [app.vue]
<script setup lang="ts">
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
  }
</script>

<template>
  <div class="p-8">
    <FormKit
      type="form"
      @submit="handleSubmit"
    >
      <FormKit
        type="nuxtUIInput"
        name="email"
        label="Email Address"
        placeholder="your.email@example.com"
        validation="required|email"
      />
      <template #submit>
        <UButton
          type="submit"
          class="mt-4"
        >
          Submit
        </UButton>
      </template>
    </FormKit>
  </div>
</template>
```

Start your development server:

```bash
pnpm dev
```

Navigate to your application and you should see a fully functional form with Nuxt UI styling! ✨

## Next Steps

### 🚀 Quick Start
Learn the basics and create your first form  
[Go to Quick Start →](/getting-started/quick-start)

### 🧩 Components
Explore all available input and output components  
[Browse Components →](/components/inputs)

### 💡 Examples
View real-world form examples and use cases  
[See Examples →](/examples/)

