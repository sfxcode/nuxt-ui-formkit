<script setup>
const alignOptions = [
  { label: 'Left', value: 'left', icon: 'i-lucide-align-left' },
  { label: 'Center', value: 'center', icon: 'i-lucide-align-center' },
  { label: 'Right', value: 'right', icon: 'i-lucide-align-right' },
]

const toggleGroupSchema = [
  {
    $formkit: 'nuxtUIToggleGroup',
    name: 'align',
    label: 'Alignment',
    options: alignOptions,
    value: 'left',
    help: 'Single choice (default)',
  },
  {
    $formkit: 'nuxtUIToggleGroup',
    name: 'formatting',
    label: 'Formatting',
    multiple: true,
    options: [
      { 'value': 'bold', 'icon': 'i-lucide-bold', 'aria-label': 'Bold' },
      { 'value': 'italic', 'icon': 'i-lucide-italic', 'aria-label': 'Italic' },
      { 'value': 'underline', 'icon': 'i-lucide-underline', 'aria-label': 'Underline' },
    ],
    value: ['bold'],
    help: 'multiple: true - the value is an array',
  },
  {
    $formkit: 'nuxtUIToggleGroup',
    name: 'plan',
    label: 'Plan',
    options: ['Free', 'Pro', 'Team'],
    validation: 'required',
    help: 'Primitive options become { label, value }',
  },
  {
    $formkit: 'nuxtUIToggleGroup',
    name: 'attached',
    label: 'Attached',
    options: alignOptions,
    attached: true,
    variant: 'outline',
    activeVariant: 'solid',
  },
  {
    $formkit: 'nuxtUIToggleGroup',
    name: 'vertical',
    label: 'Vertical',
    options: alignOptions,
    orientation: 'vertical',
    activeColor: 'success',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Toggle Group Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Toggle Group component wraps Nuxt UI's UToggleGroup: a bar of toggle buttons holding one value, or an array with <code>multiple</code>.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Single and Multiple
          </h2>
          <FUDataEdit
            :data="{}"
            :schema="toggleGroupSchema.slice(0, 3)"
            :debug-data="true"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Layout and Styling
          </h2>
          <FUDataEdit
            :data="{}"
            :schema="toggleGroupSchema.slice(3)"
            :debug-data="true"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
