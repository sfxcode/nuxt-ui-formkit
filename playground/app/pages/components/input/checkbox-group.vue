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
    label: 'Basic Checkbox Group',
    help: 'Select your interests',
    options: interestsOptions,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'features1',
    label: 'With Descriptions',
    help: 'Options with additional descriptions',
    options: featuresOptions,
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'permissions1',
    label: 'With Disabled Option',
    help: 'Some options may be disabled',
    options: permissionsOptions,
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests2',
    label: 'Horizontal Orientation',
    help: 'Checkboxes displayed horizontally',
    options: interestsOptions,
    orientation: 'horizontal',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests3',
    label: 'Vertical Orientation (Default)',
    help: 'Checkboxes displayed vertically',
    options: interestsOptions,
    orientation: 'vertical',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests4',
    label: 'Extra Small Size',
    options: interestsOptions.slice(0, 3),
    size: 'xs',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests5',
    label: 'Small Size',
    options: interestsOptions.slice(0, 3),
    size: 'sm',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests6',
    label: 'Medium Size (Default)',
    options: interestsOptions.slice(0, 3),
    size: 'md',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests7',
    label: 'Large Size',
    options: interestsOptions.slice(0, 3),
    size: 'lg',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests8',
    label: 'Extra Large Size',
    options: interestsOptions.slice(0, 3),
    size: 'xl',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests9',
    label: 'Primary Color',
    options: interestsOptions,
    color: 'primary',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests10',
    label: 'Success Color',
    options: interestsOptions,
    color: 'success',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests11',
    label: 'Error Color',
    options: interestsOptions,
    color: 'error',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'custom1',
    label: 'Custom Value Attribute',
    help: 'Using custom value attribute',
    options: [
      { id: 1, name: 'Option One' },
      { id: 2, name: 'Option Two' },
      { id: 3, name: 'Option Three' },
    ],
    valueAttribute: 'id',
    optionAttribute: 'name',
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests12',
    label: 'With Default Values',
    help: 'Pre-selected options',
    options: interestsOptions,
    value: ['coding', 'design'],
  },
  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'interests13',
    label: 'Disabled',
    help: 'Disabled checkbox group',
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
            Custom Attributes
          </h2>
          <p class="text-muted-foreground mb-6">
            Use custom value and option attributes for flexible data structures.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="checkboxGroupSchema.slice(13, 14)"
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
            :schema="checkboxGroupSchema.slice(14, 16)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
