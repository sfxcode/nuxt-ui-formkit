# Installation

Get started with Nuxt UI FormKit by installing the module in your Nuxt application.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** - a version supported by Nuxt 4
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
    '@formkit/nuxt',
    '@sfxcode/nuxt-ui-formkit'
  ]
})
```

::: info
**Note:** Make sure to add `@nuxt/ui` before `@sfxcode/nuxt-ui-formkit` in the modules array.
:::

::: warning `@formkit/nuxt` is required in `modules`
This module does not register `@formkit/nuxt` for you. It ships as a dependency, but it must be listed in `modules` so Nuxt picks up your `formkit.config.ts` (below). Without it the `nuxtUI*` input types are never registered.
:::

## FormKit Configuration

Create a `formkit.config.ts` file in your project root to configure FormKit. The recommended way is `createNuxtUiFormkitConfig()`, which registers every `nuxtUIXxx` input/output plus this module's own plugins for you - spread its result into your own config alongside whatever else you need (locales, `iconLoader`, other plugins):

```typescript [formkit.config.ts]
import type { DefaultConfigOptions } from '@formkit/vue'
import { en } from '@formkit/i18n'
import { createAutoAnimatePlugin, createNuxtUiFormkitConfig } from '@sfxcode/nuxt-ui-formkit/formkit'

// `multiStep: true` additionally registers `createMultiStepPlugin()` -
// omit it if you're not using `nuxtUIMultiStep`/`nuxtUIStep`.
// Pass your own plugins through the `plugins` option: they are appended after
// this module's, so the asterisk plugin is kept.
const nuxtUiFormkitConfig = createNuxtUiFormkitConfig({
  multiStep: true,
  plugins: [
    createAutoAnimatePlugin(
      {
        duration: 250,
        easing: 'ease-in-out',
      },
      {
        global: ['outer', 'inner'],
        form: ['form'],
        nuxtUIRepeater: ['input'],
      }
    ),
  ],
})

const config: DefaultConfigOptions = {
  locales: { en },
  locale: 'en',
  inputs: nuxtUiFormkitConfig.inputs,
  plugins: nuxtUiFormkitConfig.plugins,
}

export default config
```

### The `form` prefix

Every input and output is also available under the library-neutral `form` prefix: `formInput` next to `nuxtUIInput`, `formSelect` next to `nuxtUISelect`, `formRepeater` next to `nuxtUIRepeater`, `formOutputText` next to `nuxtUIOutputText`, and so on. The `form` names are the same definitions, so both names behave identically. Use them when a schema should keep its type names across UI libraries that offer the same prefix, such as [FormKit PrimeVue](https://github.com/sfxcode/formkit-primevue).

The `nuxtUI` names are unchanged, and the `form` names are off by default, so a custom input of your own that happens to be called `formSelect` is not replaced. Turn them on with `formPrefix`:

```typescript [formkit.config.ts]
const nuxtUiFormkitConfig = createNuxtUiFormkitConfig({ formPrefix: true })
```

```typescript
const schema = [
  { $formkit: 'formInput', name: 'name', label: 'Name', validation: 'required' },
  { $formkit: 'formSelect', name: 'role', label: 'Role', options: ['Tank', 'Healer'] },
]
```

The asterisk plugin, `createMultiStepPlugin`, the TypeScript types and the animation targets of `createAutoAnimatePlugin` treat the `form` names like the `nuxtUI` names: a target keyed `nuxtUIRepeater` also applies to `formRepeater`, and the other way round.

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

### 🖥️ Server-Side Rendering
What is rendered on the server, what appears after hydration, and the one thing to avoid in a page's dates  
[Read about SSR →](/getting-started/ssr)
