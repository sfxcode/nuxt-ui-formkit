<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const switchSchema = [
  {
    $formkit: 'nuxtUISwitch',
    id: 'switch-basic',
    name: 'switch1',
    label: 'Basic Switch',
    help: 'Simple on/off toggle',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch2',
    label: 'Enable Notifications',
    description: 'Receive email notifications for updates',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch3',
    label: 'Dark Mode',
    description: 'Switch between light and dark theme',
    value: true,
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch4',
    label: 'With Checked Icon',
    description: 'Custom icon when checked',
    checkedIcon: 'i-heroicons-bell',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch5',
    label: 'Checked/Unchecked Icons',
    description: 'Different icons for checked and unchecked states',
    checkedIcon: 'i-heroicons-check',
    uncheckedIcon: 'i-heroicons-x-mark',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch6',
    label: 'Loading State',
    description: 'Switch in loading state',
    loading: true,
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch7',
    label: 'Custom Loading Icon',
    description: 'Custom loading icon',
    loading: true,
    loadingIcon: 'i-heroicons-arrow-path',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch8',
    label: 'Extra Small Size',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch9',
    label: 'Small Size',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch10',
    label: 'Medium Size (Default)',
    size: 'md',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch11',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch12',
    label: 'Extra Large Size',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch13',
    label: 'Primary Color',
    description: 'Primary color switch',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch14',
    label: 'Success Color',
    description: 'Success color switch',
    color: 'success',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch15',
    label: 'Error Color',
    description: 'Error color switch',
    color: 'error',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch16',
    label: 'Warning Color',
    description: 'Warning color switch',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch17',
    label: 'Enabled by Default',
    description: 'Pre-selected switch',
    value: true,
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch18',
    label: 'Disabled',
    description: 'Disabled switch',
    disabled: true,
    value: false,
  },
  {
    $formkit: 'nuxtUISwitch',
    name: 'switch19',
    label: 'Disabled (On)',
    description: 'Disabled switch in on state',
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
          Switch Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Switch component integrates FormKit with Nuxt UI's USwitch component, providing a seamless toggle switch experience.
        </p>
        <p class="text-muted-foreground">
          Explore various switch configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic switches with labels, descriptions, and default values.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="switchSchema.slice(0, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add custom icons or different icons for on and off states.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="switchSchema.slice(3, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Loading State
          </h2>
          <p class="text-muted-foreground mb-6">
            Show loading state with default or custom loading icons.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="switchSchema.slice(5, 7)"
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
            :schema="switchSchema.slice(7, 12)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize switch colors including primary, success, error, and warning.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="switchSchema.slice(12, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value and disabled (both on and off).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="switchSchema.slice(16, 19)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
