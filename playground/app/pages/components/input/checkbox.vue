<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const checkboxSchema = [
  {
    $formkit: 'nuxtUICheckbox',
    id: 'checkbox-basic',
    name: 'checkbox1',
    label: 'Basic Checkbox',
    description: 'Simple checkbox',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox2',
    label: 'I agree to the terms and conditions',
    description: 'You must accept the terms to continue',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox3',
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates via email',
    value: true,
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox4',
    label: 'Autofocus Checkbox',
    description: 'This checkbox receives focus on page load',
    autofocus: true,
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox5',
    label: 'Extra Small Size',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox6',
    label: 'Small Size',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox7',
    label: 'Medium Size (Default)',
    size: 'md',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox8',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox9',
    label: 'Extra Large Size',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox10',
    label: 'Primary Color',
    description: 'Primary color checkbox',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox11',
    label: 'Secondary Color',
    description: 'Secondary color checkbox',
    color: 'secondary',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox12',
    label: 'Success Color',
    description: 'Success color checkbox',
    color: 'success',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox13',
    label: 'Info Color',
    description: 'Info color checkbox',
    color: 'info',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox14',
    label: 'Warning Color',
    description: 'Warning color checkbox',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox15',
    label: 'Error Color',
    description: 'Error color checkbox',
    color: 'error',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox16',
    label: 'Neutral Color',
    description: 'Neutral color checkbox',
    color: 'neutral',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox17',
    label: 'Card Variant',
    description: 'Checkbox with card styling',
    variant: 'card',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox18',
    label: 'List Variant',
    description: 'Checkbox with list styling',
    variant: 'list',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox19',
    label: 'Indicator at Start',
    description: 'Checkbox indicator positioned at the start',
    indicator: 'start',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox20',
    label: 'Indicator at End',
    description: 'Checkbox indicator positioned at the end',
    indicator: 'end',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox21',
    label: 'Custom Check Icon',
    description: 'Checkbox with a star icon instead of check',
    icon: 'i-heroicons-star',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox22',
    label: 'Custom Indeterminate Icon',
    description: 'Checkbox with custom indeterminate icon',
    indeterminateIcon: 'i-heroicons-minus-circle',
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox23',
    label: 'Checked by Default',
    description: 'Pre-selected checkbox',
    value: true,
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox24',
    label: 'Disabled (Unchecked)',
    description: 'Disabled checkbox',
    disabled: true,
    value: false,
  },
  {
    $formkit: 'nuxtUICheckbox',
    name: 'checkbox25',
    label: 'Disabled (Checked)',
    description: 'Disabled checkbox in checked state',
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
          Checkbox Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Checkbox component integrates FormKit with Nuxt UI's UCheckbox component, providing a seamless checkbox experience.
        </p>
        <p class="text-muted-foreground">
          Explore various checkbox configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic checkboxes with labels, descriptions, default values, and autofocus.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(0, 4)"
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
            :schema="checkboxSchema.slice(4, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize checkbox colors including primary, secondary, success, info, warning, error, and neutral.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(9, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual variants including card and list styles.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(16, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Indicator Position
          </h2>
          <p class="text-muted-foreground mb-6">
            Control the position of the checkbox indicator (start or end).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(18, 20)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize the checkbox icon and indeterminate icon with any icon from the icon library.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(20, 22)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value and disabled (both checked and unchecked).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxSchema.slice(22, 25)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
