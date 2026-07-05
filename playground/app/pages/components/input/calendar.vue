<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const data = {
  date17: new Date(2026, 6, 5),
  date18: { start: '2026-07-01', end: '2026-07-10' },
}
const calendarSchema = [
  {
    $formkit: 'nuxtUICalendar',
    id: 'calendar-basic',
    name: 'date1',
    label: 'Basic Calendar',
    help: 'Select a single date',
    validation: 'required',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date2',
    label: 'Month Picker',
    type: 'month',
    class: 'w-1/3',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date3',
    label: 'Year Picker',
    type: 'year',
    class: 'w-1/3',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date4',
    label: 'Date Range',
    range: true,
    class: 'w-2/3',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date5',
    label: 'Multiple Dates',
    multiple: true,
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date6',
    label: 'Extra Small Size',
    size: 'xs',
    class: 'w-1/4',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date7',
    label: 'Small Size',
    size: 'sm',
    class: 'w-1/3',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date8',
    label: 'Medium Size (Default)',
    size: 'md',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date9',
    label: 'Large Size',
    size: 'lg',
    class: 'w-2/3',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date10',
    label: 'Extra Large Size',
    size: 'xl',
    class: 'w-full',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date11',
    label: 'Primary Color',
    color: 'primary',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date12',
    label: 'Success Color',
    color: 'success',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date13',
    label: 'Error Color',
    color: 'error',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date14',
    label: 'With Week Numbers',
    weekNumbers: true,
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date15',
    label: 'Disabled',
    disabled: true,
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date16',
    label: 'defaultValue as JS Date (valueType: date)',
    valueType: 'date',
    defaultValue: new Date(2026, 6, 5),
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date17',
    label: 'Bound to a JS Date (valueType: date)',
    valueType: 'date',
    help: 'Underlying form value stays a JS Date on every change.',
    class: 'w-1/2',
  },
  {
    $formkit: 'nuxtUICalendar',
    name: 'date18',
    label: 'Range Bound to ISO Strings (valueType: iso)',
    valueType: 'iso',
    range: true,
    help: 'Underlying form value stays a { start, end } pair of ISO strings.',
    class: 'w-2/3',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Calendar Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Calendar component integrates FormKit with Nuxt UI's UCalendar component, providing a bare date-grid picker.
        </p>
        <p class="text-muted-foreground">
          Explore basic usage, month/year views, range and multiple selection, sizes, colors, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic single-date calendar with validation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Picker Views
          </h2>
          <p class="text-muted-foreground mb-6">
            Switch the picker view with the `type` prop: `date`, `month`, or `year`.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(1, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Range & Multiple Selection
          </h2>
          <p class="text-muted-foreground mb-6">
            Select a date range or multiple individual dates.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(3, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Sizes
          </h2>
          <p class="text-muted-foreground mb-6">
            Available sizes: xs, sm, md (default), lg, and xl. Since the calendar grid fills its container by default, pair `size` with a width class (e.g. `class: 'w-1/2'`) to control the overall footprint.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(5, 10)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize the calendar's selected-date color.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(10, 13)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Show ISO week numbers alongside each week.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="calendarSchema.slice(13, 14)"
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
            :schema="calendarSchema.slice(14, 15)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Value Types
          </h2>
          <p class="text-muted-foreground mb-6">
            By default the form value is a native <code>@internationalized/date</code> <code>DateValue</code> (or
            <code>{{ '{ start, end }' }}</code>/array of those for range/multiple mode). Set <code>valueType</code> to
            <code>'date'</code> or <code>'iso'</code> to read/write JS <code>Date</code>s or ISO 8601 strings instead —
            conversion happens at the boundary in both directions.
          </p>
          <FUDataEdit
            :data="data"
            :schema="calendarSchema.slice(15, 18)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
