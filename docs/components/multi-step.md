---
title: Multi-Step Component
description: Wizard-style multi-step forms with tab navigation and per-step validation gating, built on @formkit/addons.
---

## Overview

`nuxtUIMultiStep` and `nuxtUIStep` wrap `@formkit/addons`' `createMultiStepPlugin` to build wizard-style forms. `nuxtUIMultiStep` renders a Nuxt UI `UTabs` tab strip and owns navigation; each `nuxtUIStep` child renders one step's fields plus Nuxt UI-styled previous/next buttons.

Unlike most other input components, both require the `createMultiStepPlugin()` plugin itself to be registered in your `plugins` array - the input definitions alone aren't enough, since the plugin is what adds each step's navigation methods (`next`, `previous`, `goTo`) and validation-gating logic.

## Setup

```typescript
// formkit.config.ts
import type { DefaultConfigOptions } from '@formkit/vue'
import { nuxtUIInputs } from '@sfxcode/nuxt-ui-formkit/definitions'
import { createMultiStepPlugin } from '@sfxcode/nuxt-ui-formkit/plugins'

const config: DefaultConfigOptions = {
  inputs: { ...nuxtUIInputs },
  plugins: [
    createMultiStepPlugin(),
  ],
}

export default config
```

## Basic Usage

```vue
<template>
  <FormKit type="form" @submit="handleSubmit">
    <FormKit type="nuxtUIMultiStep" name="wizard" :allow-incomplete="false">
      <FormKit type="nuxtUIStep" name="account" label="Account">
        <FormKit
          type="nuxtUIInput"
          name="email"
          input-type="email"
          label="Email"
          validation="required|email"
        />
      </FormKit>

      <FormKit type="nuxtUIStep" name="profile" label="Profile">
        <FormKit
          type="nuxtUIInput"
          name="displayName"
          label="Display Name"
          validation="required"
        />
      </FormKit>
    </FormKit>
  </FormKit>
</template>

<script setup lang="ts">
const handleSubmit = (data: any) => {
  console.log('Wizard data:', data.wizard)
}
</script>
```

## Schema-Based Multi-Step

```typescript
const schema = [
  {
    $formkit: 'nuxtUIMultiStep',
    name: 'wizard',
    allowIncomplete: false,
    children: [
      {
        $formkit: 'nuxtUIStep',
        name: 'account',
        label: 'Account',
        children: [
          { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', validation: 'required|email' },
        ],
      },
      {
        $formkit: 'nuxtUIStep',
        name: 'profile',
        label: 'Profile',
        children: [
          { $formkit: 'nuxtUIInput', name: 'displayName', label: 'Display Name', validation: 'required' },
        ],
      },
    ],
  },
]
```

## Props

### nuxtUIMultiStep

- **allowIncomplete** - When `false`, advancing past a step whose fields fail validation is blocked. Defaults to `true` (the addon's own default), so set this explicitly to get validation gating.
- **tabStyle** - `'tab'` (the only style this wrapper styles with `UTabs`; `'progress'` is a supported addon value but renders unstyled).
- **hideProgressLabels** - Forwarded to the addon; has no visible effect on the `UTabs` tab strip this wrapper renders.
- **validStepIcon** - Icon name shown as a tab badge once a visited step becomes valid (default: `i-lucide-check`).
- **beforeStepChange** - Async guard called before navigating; return `false` to cancel the transition. See `@formkit/addons`' docs for the callback signature.
- **ui** - Forwarded to the underlying `UTabs` component for style overrides.

### nuxtUIStep

- **previousLabel** / **nextLabel** - Override the previous/next button text (defaults: "Previous"/"Next").
- **previousAttrs** / **nextAttrs** - Extra props/attrs forwarded to the previous/next `UButton`.
- **beforeStepChange** - Per-step override of the multi-step's own guard.
- **validStepIcon** - Per-step override of the tab badge icon.
- **ui** - Forwarded to the previous/next `UButton`s for style overrides.
- **stepActionsClass** - Class for the div wrapping the previous/next buttons (default: `'flex gap-2 pt-2'`; always merged with the `formkit-step-actions` base class).

## Navigating Programmatically

The addon plugin extends the multi-step's `FormKitNode` with `next()`, `previous()`, and `goTo(step)` methods:

```typescript
import { getNode } from '@formkit/core'

const wizard = getNode('wizard')
wizard?.goTo('profile') // by step name
wizard?.goTo(1) // by index
wizard?.next()
wizard?.previous()
```

## Validation Gating

With `allow-incomplete="false"`, clicking "Next" (or a tab, or calling `goTo`/`next` programmatically) on a step with invalid fields triggers that step's validation messages and blocks the transition until the fields validate. Leave `allowIncomplete` unset (or `true`) to let users move freely between steps regardless of validation state.

With `allow-incomplete="false"`, the current step's own "Next" button and any not-yet-visited tab are also proactively `disabled` while the current step is invalid, rather than left clickable-but-inert — both re-enable automatically once the current step's fields validate. Already-visited tabs (including the active one) always stay enabled, since moving backward is never gated.

## Next Steps

<CardGrid>
  <Card title="Repeater" icon="i-lucide-list-plus" to="/components/repeater">
    Dynamic repeatable form sections
  </Card>

  <Card title="View Examples" icon="i-lucide-code" to="/examples">
    See multi-step forms in real-world forms
  </Card>

  <Card title="API Reference" icon="i-lucide-book" to="/api/components">
    Complete API documentation
  </Card>
</CardGrid>
