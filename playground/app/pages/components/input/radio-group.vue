<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const sizeOptions = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
]

const planOptions = [
  { value: 'free', label: 'Free', description: 'Perfect for personal use' },
  { value: 'pro', label: 'Pro', description: 'Best for professionals' },
  { value: 'enterprise', label: 'Enterprise', description: 'For large organizations' },
]

const radioGroupSchema = [
  {
    $formkit: 'nuxtUIRadioGroup',
    id: 'radio-basic',
    name: 'radio1',
    label: 'Basic Radio Group',
    help: 'Select one option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio2',
    label: 'With Descriptions',
    help: 'Options with additional descriptions',
    options: planOptions,
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio3',
    label: 'Horizontal Orientation',
    help: 'Radio buttons displayed horizontally',
    options: colorOptions,
    orientation: 'horizontal',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio4',
    label: 'Vertical Orientation (Default)',
    help: 'Radio buttons displayed vertically',
    options: colorOptions,
    orientation: 'vertical',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio5',
    label: 'Small Size',
    options: sizeOptions.slice(0, 3),
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio6',
    label: 'Medium Size (Default)',
    options: sizeOptions.slice(0, 3),
    size: 'md',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio7',
    label: 'Large Size',
    options: sizeOptions.slice(0, 3),
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio8',
    label: 'Extra Large Size',
    options: sizeOptions.slice(0, 3),
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio9',
    label: 'Primary Color',
    options: colorOptions,
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio10',
    label: 'Success Color',
    options: colorOptions,
    color: 'success',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio11',
    label: 'Error Color',
    options: colorOptions,
    color: 'error',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio12',
    label: 'Custom Value Keys',
    help: 'Using custom value and label keys',
    options: [
      { id: 1, name: 'First Option' },
      { id: 2, name: 'Second Option' },
      { id: 3, name: 'Third Option' },
    ],
    valueKey: 'id',
    labelKey: 'name',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio13',
    label: 'With Default Value',
    help: 'Pre-selected option',
    options: colorOptions,
    value: 'blue',
  },
  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'radio14',
    label: 'Disabled',
    help: 'Disabled radio group',
    options: colorOptions,
    disabled: true,
    value: 'red',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          RadioGroup Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The RadioGroup component integrates FormKit with Nuxt UI's URadioGroup component, providing a seamless radio button group experience.
        </p>
        <p class="text-muted-foreground">
          Explore various radio group configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic radio group with options, descriptions, and required validation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="radioGroupSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure horizontal or vertical layout.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="radioGroupSchema.slice(2, 4)"
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
            :schema="radioGroupSchema.slice(4, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize radio group colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="radioGroupSchema.slice(8, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Keys
          </h2>
          <p class="text-muted-foreground mb-6">
            Use custom value and label keys for flexible data structures.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="radioGroupSchema.slice(11, 12)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="radioGroupSchema.slice(12, 14)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
