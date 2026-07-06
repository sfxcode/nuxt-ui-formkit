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

Create a `formkit.config.ts` file in your project root to configure FormKit. The recommended way is `createNuxtUiFormkitConfig()`, which registers every `nuxtUIXxx` input/output plus this module's own plugins for you - spread its result into your own config alongside whatever else you need (locales, `iconLoader`, other plugins):

```typescript [formkit.config.ts]
import type { DefaultConfigOptions } from '@formkit/vue'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { en } from '@formkit/i18n'
import { createNuxtUiFormkitConfig } from '@sfxcode/nuxt-ui-formkit/formkit'

// `multiStep: true` additionally registers `createMultiStepPlugin()` -
// omit it if you're not using `nuxtUIMultiStep`/`nuxtUIStep`.
const nuxtUiFormkitConfig = createNuxtUiFormkitConfig({ multiStep: true })

const config: DefaultConfigOptions = {
  locales: { en },
  locale: 'en',
  inputs: nuxtUiFormkitConfig.inputs,
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
    ),
    ...nuxtUiFormkitConfig.plugins!,
  ],
}

export default config
```

::: details Escape hatch: fully manual wiring
If you need finer-grained control (e.g. registering only a subset of inputs), you can still wire everything up yourself instead of using the helper:

```typescript [formkit.config.ts]
import type { DefaultConfigOptions } from '@formkit/vue'
import { en } from '@formkit/i18n'
import { nuxtUIInputs, nuxtUIOutputs } from '@sfxcode/nuxt-ui-formkit/definitions'
import { addNuxtAsteriskPlugin } from '@sfxcode/nuxt-ui-formkit/plugins'

const config: DefaultConfigOptions = {
  locales: { en },
  locale: 'en',
  inputs: { ...nuxtUIInputs, ...nuxtUIOutputs },
  plugins: [addNuxtAsteriskPlugin],
}

export default config
```
:::

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

