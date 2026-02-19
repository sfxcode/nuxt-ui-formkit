<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputTimeSchema = [
  {
    $formkit: 'nuxtUIInputTime',
    id: 'time-basic',
    name: 'time1',
    label: 'Basic Time Input',
    help: 'Select a time',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time2',
    label: 'With Default Time',
    help: 'Pre-selected time',
    value: '14:30',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time3',
    label: '12-Hour Format',
    help: 'AM/PM format',
    format: '12',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time4',
    label: '24-Hour Format (Default)',
    help: 'Military time format',
    format: '24',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time5',
    label: 'With 15-Minute Steps',
    help: 'Increments by 15 minutes',
    step: 15,
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time6',
    label: 'With 30-Minute Steps',
    help: 'Increments by 30 minutes',
    step: 30,
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time7',
    label: 'With Leading Icon',
    leadingIcon: 'i-lucide-clock',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time8',
    label: 'With Trailing Icon',
    trailingIcon: 'i-lucide-calendar-clock',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time9',
    label: 'Loading State',
    loading: true,
    placeholder: 'Loading...',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time10',
    label: 'Extra Small Size',
    size: 'xs',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time11',
    label: 'Small Size',
    size: 'sm',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time12',
    label: 'Medium Size (Default)',
    size: 'md',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time13',
    label: 'Large Size',
    size: 'lg',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time14',
    label: 'Extra Large Size',
    size: 'xl',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time15',
    label: 'Primary Color',
    color: 'primary',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time16',
    label: 'Success Color',
    color: 'success',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time17',
    label: 'Error Color',
    color: 'error',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time18',
    label: 'Outline Variant',
    variant: 'outline',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time19',
    label: 'Soft Variant',
    variant: 'soft',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time20',
    label: 'Subtle Variant',
    variant: 'subtle',
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time21',
    label: 'With Padding',
    padded: true,
    placeholder: 'Select time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time22',
    label: 'Read Only',
    readonly: true,
    value: '09:00',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time23',
    label: 'Disabled',
    disabled: true,
    value: '17:30',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputTime Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputTime component integrates FormKit with Nuxt UI's UInputTime component, providing a seamless time input experience.
        </p>
        <p class="text-muted-foreground">
          Explore various time input configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic time input with default value and required validation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(0, 2)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Time Formats
          </h2>
          <p class="text-muted-foreground mb-6">
            Support for 12-hour (AM/PM) and 24-hour formats.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(2, 4)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Step Increments
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure minute step increments for easier selection.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(4, 6)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Loading
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons, and show loading state.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(6, 9)"
            debug-data
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
            :schema="inputTimeSchema.slice(9, 14)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize time input colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(14, 17)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different variants including outline, soft, and subtle.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(17, 20)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize padding to match your design.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(20, 21)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including readonly and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(21, 23)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
