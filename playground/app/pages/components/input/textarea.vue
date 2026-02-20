<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const textareaSchema = [
  {
    $formkit: 'nuxtUITextarea',
    id: 'textarea-basic',
    name: 'textarea1',
    placeholder: 'Enter your message...',
    label: 'Basic Textarea',
    help: 'This is a required field.',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea2',
    placeholder: 'Type here...',
    label: 'With Validation',
    help: 'Minimum 10 characters required',
    validation: 'required|length:10',
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea3',
    placeholder: 'Start typing...',
    label: 'Fixed Rows',
    help: '5 rows fixed height',
    rows: 5,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea4',
    placeholder: 'This textarea will resize as you type...',
    label: 'Auto-resize',
    help: 'Automatically resizes up to 10 rows',
    rows: 3,
    autoresize: true,
    maxrows: 10,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea5',
    placeholder: 'Fixed positioning...',
    label: 'With Fixed Positioning',
    help: 'Fixed positioning enabled',
    rows: 4,
    fixed: true,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea6',
    placeholder: 'Small size...',
    label: 'Small Size',
    size: 'sm',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea7',
    placeholder: 'Medium size (default)...',
    label: 'Medium Size',
    size: 'md',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea8',
    placeholder: 'Large size...',
    label: 'Large Size',
    size: 'lg',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea9',
    placeholder: 'Extra large size...',
    label: 'Extra Large Size',
    size: 'xl',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea10',
    placeholder: 'Primary color...',
    label: 'Primary Color',
    color: 'primary',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea11',
    placeholder: 'Variant none...',
    label: 'Variant None',
    variant: 'none',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea12',
    placeholder: 'With autoresize delay...',
    label: 'Autoresize with Delay',
    autoresize: true,
    autoresizeDelay: 300,
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea13',
    placeholder: 'With icon...',
    label: 'With Leading Icon',
    icon: 'i-heroicons-pencil-square',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea14',
    placeholder: 'Loading state...',
    label: 'Loading State',
    loading: true,
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea15',
    placeholder: 'With trailing icon...',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-check-circle',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea16',
    placeholder: 'Code editor style...',
    label: 'With Highlight',
    highlight: true,
    rows: 5,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea17',
    placeholder: 'Cannot edit...',
    label: 'Read Only',
    readonly: true,
    value: 'This content is read-only and cannot be edited.',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea18',
    placeholder: 'Disabled...',
    label: 'Disabled',
    disabled: true,
    value: 'This textarea is disabled.',
    rows: 3,
  },
  {
    $formkit: 'nuxtUITextarea',
    name: 'textarea19',
    placeholder: 'Custom styling...',
    label: 'Custom Styled',
    style: { background: '#f9fafb' },
    class: 'custom-textarea',
    rows: 4,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Textarea Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Textarea component integrates FormKit with Nuxt UI's UTextarea component, perfect for multi-line text input.
        </p>
        <p class="text-muted-foreground">
          Explore various configurations including auto-resize, validation, styling options, and different states.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic textarea with validation and help text.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Rows & Auto-resize
          </h2>
          <p class="text-muted-foreground mb-6">
            Control the height with fixed rows or enable auto-resize to grow with content.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(2, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Sizes
          </h2>
          <p class="text-muted-foreground mb-6">
            Available sizes: xs, sm, md (default), lg, and xl.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(5, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize colors, variants, and padding to match your design.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(9, 12)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Loading
          </h2>
          <p class="text-muted-foreground mb-6">
            Add icons or show loading state for better user experience.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(12, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including readonly, disabled, and custom styling.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="textareaSchema.slice(16, 19)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
