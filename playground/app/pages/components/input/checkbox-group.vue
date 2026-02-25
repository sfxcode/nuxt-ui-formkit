<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const interestsOptions = [
  { value: 'coding', label: 'Coding' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'photography', label: 'Photography' },
]

const featuresOptions = [
  { value: 'notifications', label: 'Notifications', description: 'Receive email notifications' },
  { value: 'newsletter', label: 'Newsletter', description: 'Subscribe to our newsletter' },
  { value: 'marketing', label: 'Marketing', description: 'Receive marketing emails' },
]

const permissionsOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete', disabled: true },
  { value: 'admin', label: 'Admin' },
]

const checkboxGroupSchema = [
  {
    $formkit: 'nuxtUICheckboxGroup',
    id: 'checkbox-group-basic',
    name: 'interests1',
    legend: 'Basic Checkbox Group',
    options: interestsOptions,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'features1',
    legend: 'With Descriptions',
    options: featuresOptions,
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'permissions1',
    legend: 'With Disabled Option',
    options: permissionsOptions,
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests2',
    legend: 'Horizontal Orientation',
    options: interestsOptions,
    orientation: 'horizontal',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests3',
    legend: 'Vertical Orientation (Default)',
    options: interestsOptions,
    orientation: 'vertical',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests4',
    legend: 'Extra Small Size',
    options: interestsOptions.slice(0, 3),
    size: 'xs',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests5',
    legend: 'Small Size',
    options: interestsOptions.slice(0, 3),
    size: 'sm',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests6',
    legend: 'Medium Size (Default)',
    options: interestsOptions.slice(0, 3),
    size: 'md',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests7',
    legend: 'Large Size',
    options: interestsOptions.slice(0, 3),
    size: 'lg',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests8',
    legend: 'Extra Large Size',
    options: interestsOptions.slice(0, 3),
    size: 'xl',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests9',
    legend: 'Primary Color',
    options: interestsOptions,
    color: 'primary',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests10',
    legend: 'Success Color',
    options: interestsOptions,
    color: 'success',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests11',
    legend: 'Error Color',
    options: interestsOptions,
    color: 'error',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests14',
    legend: 'Table Variant',
    options: interestsOptions,
    variant: 'table',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests15',
    legend: 'List Variant',
    options: interestsOptions,
    variant: 'list',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests16',
    legend: 'Card Variant',
    options: interestsOptions,
    variant: 'card',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests17',
    legend: 'Indicator at Start',
    options: interestsOptions,
    indicator: 'start',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests18',
    legend: 'Indicator at End',
    options: interestsOptions,
    indicator: 'end',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests19',
    legend: 'Custom Check Icon',
    options: interestsOptions.slice(0, 3),
    icon: 'i-heroicons-star',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests20',
    legend: 'Keyboard Loop Navigation',
    options: interestsOptions,
    loop: true,
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'custom1',
    legend: 'Custom Value & Label Keys',
    options: [
      { id: 1, name: 'Option One', desc: 'First option' },
      { id: 2, name: 'Option Two', desc: 'Second option' },
      { id: 3, name: 'Option Three', desc: 'Third option' },
    ],
    valueKey: 'id',
    labelKey: 'name',
    descriptionKey: 'desc',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests12',
    legend: 'With Default Values',
    options: interestsOptions,
    value: ['coding', 'design'],
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests13',
    legend: 'Disabled',
    options: interestsOptions,
    disabled: true,
    value: ['coding'],
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          CheckboxGroup Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The CheckboxGroup component integrates FormKit with Nuxt UI's UCheckboxGroup component, providing a seamless multi-choice selection experience.
        </p>
        <p class="text-muted-foreground">
          Explore various checkbox group configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic checkbox groups with options, descriptions, and disabled items.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(0, 3)"
            debug-data
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
            :schema="checkboxGroupSchema.slice(3, 5)"
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
            :schema="checkboxGroupSchema.slice(5, 10)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize checkbox group colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(10, 13)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual variants including table, list, and card styles.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(13, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Indicator Position
          </h2>
          <p class="text-muted-foreground mb-6">
            Control the position of checkbox indicators (start or end).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(16, 18)"
            form-class="w-40"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Icons & Navigation
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize checkbox icons and enable keyboard loop navigation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(18, 20)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Keys
          </h2>
          <p class="text-muted-foreground mb-6">
            Use custom value, label, and description keys for flexible data structures.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(20, 21)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default values and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(21, 23)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
