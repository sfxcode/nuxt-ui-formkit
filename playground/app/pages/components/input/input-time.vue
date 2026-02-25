<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Time } from '@internationalized/date'

const inputTimeSchema = [
  {
    $formkit: 'nuxtUIInputTime',
    id: 'time-basic',
    name: 'time1',
    label: 'Basic Time Input',
    help: 'Select a time',
    validation: 'required',
    defaultValue: new Time(12, 0),
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time2',
    label: 'With Default Time',
    help: 'Pre-selected time',
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time3',
    label: '12-Hour Format',
    help: 'AM/PM format',
    hourCycle: 12,
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time4',
    label: '24-Hour Format (Default)',
    help: 'Military time format',
    hourCycle: 24,
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
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time8',
    label: 'With Trailing Icon',
    trailingIcon: 'i-lucide-calendar-clock',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time9',
    label: 'Loading State',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time10',
    label: 'Extra Small Size',
    size: 'xs',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time11',
    label: 'Small Size',
    size: 'sm',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time12',
    label: 'Medium Size (Default)',
    size: 'md',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time13',
    label: 'Large Size',
    size: 'lg',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time14',
    label: 'Extra Large Size',
    size: 'xl',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time15',
    label: 'Primary Color',
    color: 'primary',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time16',
    label: 'Success Color',
    color: 'success',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time17',
    label: 'Error Color',
    color: 'error',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time18',
    label: 'Outline Variant',
    variant: 'outline',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time19',
    label: 'Soft Variant',
    variant: 'soft',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time20',
    label: 'Subtle Variant',
    variant: 'subtle',

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time21',
    label: 'With Fixed Positioning',
    fixed: true,

  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time22',
    label: 'Read Only',
    defaultValue: new Time(18, 30),
    readonly: true,
  },
  {
    $formkit: 'nuxtUIInputTime',
    name: 'time23',
    defaultValue: new Time(10, 45),
    label: 'Disabled',
    disabled: true,
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
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Fixed positioning for the time picker popup.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTimeSchema.slice(20, 21)"
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
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
