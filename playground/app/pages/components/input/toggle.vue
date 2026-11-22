<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const toggleSchema = [
  {
    $formkit: 'nuxtUIToggle',
    name: 'bold',
    label: 'Bold',
    icon: 'i-lucide-bold',
    help: 'Icon-only toggle',
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'newsletter',
    label: 'Newsletter',
    toggleLabel: 'Subscribe',
    leadingIcon: 'i-lucide-mail',
    value: true,
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'terms',
    label: 'Terms',
    toggleLabel: 'I accept the terms',
    validation: 'accepted',
    validationVisibility: 'dirty',
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'outline',
    label: 'Outline / Solid',
    toggleLabel: 'Pin',
    icon: 'i-lucide-pin',
    variant: 'outline',
    activeVariant: 'solid',
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'success',
    label: 'Success when pressed',
    toggleLabel: 'Approve',
    icon: 'i-lucide-check',
    activeColor: 'success',
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'large',
    label: 'Large',
    toggleLabel: 'Large toggle',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIToggle',
    name: 'disabled',
    label: 'Disabled',
    toggleLabel: 'Locked',
    icon: 'i-lucide-lock',
    disabled: true,
    value: true,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Toggle Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Toggle component wraps Nuxt UI's UToggle: a button that is pressed on or off and holds a boolean value.
        </p>
        <p class="text-muted-foreground">
          FormKit's <code>label</code> is the field label; <code>toggleLabel</code> is the text inside the button.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <FUDataEdit
            :data="{}"
            :schema="toggleSchema.slice(0, 3)"
            :debug-data="true"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling and States
          </h2>
          <p class="text-muted-foreground mb-6">
            <code>variant</code>/<code>color</code> style the unpressed toggle, <code>activeVariant</code>/<code>activeColor</code> the pressed one.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="toggleSchema.slice(3)"
            :debug-data="true"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
