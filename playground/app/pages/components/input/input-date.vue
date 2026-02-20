<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { parseDate, CalendarDate } from '@internationalized/date'

const data = { date2: new CalendarDate(2022, 2, 3) }
const inputDateSchema = [
  {
    $formkit: 'nuxtUIInputDate',
    id: 'inputdate-basic',
    name: 'date1',
    label: 'Basic Date',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date2',
    label: 'With Default Value',
    defaultValue: new CalendarDate(2022, 3, 3),
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date3',
    label: 'With Placeholder',
    placeholder: new CalendarDate(2022, 7, 7),
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date4',
    label: 'Date Range',
    range: true,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date5',
    label: 'Date Range with Custom Separator',
    range: true,
    separatorIcon: 'i-heroicons-arrow-right',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date6',
    label: 'Date with Time (hour granularity)',
    granularity: 'hour',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date7',
    label: 'Date with Time (minute granularity)',
    granularity: 'minute',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date8',
    label: 'Date with Time (second granularity)',
    granularity: 'second',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date9',
    label: '24 Hour Cycle',
    granularity: 'minute',
    hourCycle: 24,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date10',
    label: '12 Hour Cycle',
    granularity: 'minute',
    hourCycle: 12,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date11',
    label: 'Hide Timezone',
    granularity: 'minute',
    hideTimeZone: true,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date12',
    label: 'With Min/Max Values',
    minValue: parseDate('2026-01-01'),
    maxValue: parseDate('2026-12-31'),
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date13',
    label: 'With Autofocus',
    autofocus: true,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date14',
    label: 'With Autofocus Delay (1000ms)',
    autofocus: true,
    autofocusDelay: 1000,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date15',
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date16',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date17',
    label: 'With Icon',
    icon: 'i-heroicons-calendar-days',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date18',
    label: 'With Avatar',
    avatar: { src: 'https://i.pravatar.cc/150?img=2', alt: 'User Avatar' },
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date19',
    label: 'Loading State',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date20',
    label: 'Custom Loading Icon',
    loading: true,
    loadingIcon: 'i-heroicons-arrow-path',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date21',
    label: 'Highlighted',
    highlight: true,
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date22',
    label: 'Extra Small Size',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date23',
    label: 'Small Size',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date24',
    label: 'Medium Size (Default)',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date25',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date26',
    label: 'Extra Large Size',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date27',
    label: 'Primary Color',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date28',
    label: 'Success Color',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date29',
    label: 'Error Color',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date30',
    label: 'Variant None',
    variant: 'none',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date31',
    label: 'Variant Ghost',
    variant: 'ghost',
  },
  {
    $formkit: 'nuxtUIInputDate',
    name: 'date32',
    label: 'Disabled',
    disabled: true,
    defaultValue: new CalendarDate(2022, 3, 3),
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputDate Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputDate component integrates FormKit with Nuxt UI's UInputDate component, providing a rich date and time picker experience.
        </p>
        <p class="text-muted-foreground">
          Explore various date configurations, ranges, time granularity, autofocus, icons, avatars, highlight, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple date picker with validation, default values, and placeholder.
          </p>
          <FUDataEdit
            :data="data"
            :schema="inputDateSchema.slice(0, 3)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Date Ranges
          </h2>
          <p class="text-muted-foreground mb-6">
            Select date ranges with customizable separator icons.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(3, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Time Granularity
          </h2>
          <p class="text-muted-foreground mb-6">
            Control date/time precision with granularity levels: hour, minute, or second.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(5, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Time Configuration
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure hour cycle (12/24 hour) and timezone visibility.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(8, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Validation Constraints
          </h2>
          <p class="text-muted-foreground mb-6">
            Set minimum and maximum date values to constrain selection.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(11, 12)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Autofocus
          </h2>
          <p class="text-muted-foreground mb-6">
            Control focus behavior with autofocus and autofocus delay options.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(12, 14)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Slots
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading/trailing icons, avatars, and loading indicators.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(14, 21)"
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
            :schema="inputDateSchema.slice(21, 26)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors & Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize colors and variants to match your design.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(26, 31)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Disabled state.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema.slice(31, 32)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
