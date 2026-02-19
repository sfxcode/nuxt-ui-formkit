<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const yesterday = new Date(today.getTime() - 86400000)
const lastWeek = new Date(today.getTime() - 7 * 86400000)
const lastMonth = new Date(today.getTime() - 30 * 86400000)
const nextWeek = new Date(today.getTime() + 7 * 86400000)
const birthday = new Date(1990, 5, 15, 14, 30)
const meeting = new Date(2026, 1, 25, 10, 0)

const outputDateSchema = [
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date1',
    value: today,
    label: 'Basic Date Output',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date2',
    value: today,
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date3',
    value: meeting,
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date4',
    value: birthday,
    label: 'With Both Icons',
    leadingIcon: 'i-heroicons-cake',
    trailingIcon: 'i-heroicons-gift',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date5',
    value: today,
    label: 'Short Format',
    format: 'short',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date6',
    value: today,
    label: 'Medium Format (Default)',
    format: 'medium',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date7',
    value: today,
    label: 'Long Format',
    format: 'long',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date8',
    value: today,
    label: 'Full Format',
    format: 'full',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date9',
    value: today,
    label: 'ISO Format',
    format: 'iso',
    leadingIcon: 'i-heroicons-code-bracket',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date10',
    value: meeting,
    label: 'With Time (Short)',
    showTime: true,
    timeStyle: 'short',
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date11',
    value: meeting,
    label: 'With Time (Medium)',
    showTime: true,
    timeStyle: 'medium',
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date12',
    value: meeting,
    label: 'With Time (Long)',
    showTime: true,
    timeStyle: 'long',
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date13',
    value: now,
    label: 'Relative Time (Now)',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date14',
    value: yesterday,
    label: 'Relative Time (Yesterday)',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date15',
    value: lastWeek,
    label: 'Relative Time (Last Week)',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date16',
    value: lastMonth,
    label: 'Relative Time (Last Month)',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date17',
    value: nextWeek,
    label: 'Relative Time (Next Week)',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date18',
    value: today,
    label: 'Extra Small',
    size: 'xs',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date19',
    value: today,
    label: 'Small',
    size: 'sm',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date20',
    value: today,
    label: 'Medium (Default)',
    size: 'md',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date21',
    value: today,
    label: 'Large',
    size: 'lg',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date22',
    value: today,
    label: 'Extra Large',
    size: 'xl',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date23',
    value: today,
    label: 'Primary Color',
    color: 'primary',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date24',
    value: today,
    label: 'Success Color',
    color: 'success',
    leadingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date25',
    value: today,
    label: 'Error Color',
    color: 'error',
    leadingIcon: 'i-heroicons-exclamation-circle',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date26',
    value: today,
    label: 'Warning Color',
    color: 'warning',
    leadingIcon: 'i-heroicons-exclamation-triangle',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date27',
    value: today,
    label: 'Info Color',
    color: 'info',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date28',
    value: today,
    label: 'Outline Variant',
    variant: 'outline',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date29',
    value: today,
    label: 'Soft Variant',
    variant: 'soft',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date30',
    value: today,
    label: 'Subtle Variant',
    variant: 'subtle',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date31',
    value: today,
    label: 'Ghost Variant',
    variant: 'ghost',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date32',
    value: birthday,
    label: 'Birthday',
    leadingIcon: 'i-heroicons-cake',
    color: 'primary',
    variant: 'soft',
    size: 'lg',
    format: 'long',
    showTime: true,
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date33',
    value: meeting,
    label: 'Upcoming Meeting',
    leadingIcon: 'i-heroicons-calendar-days',
    trailingIcon: 'i-heroicons-arrow-right',
    color: 'info',
    variant: 'outline',
    showTime: true,
    timeStyle: 'short',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date34',
    value: yesterday,
    label: 'Last Activity',
    leadingIcon: 'i-heroicons-clock',
    color: 'warning',
    relative: true,
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'date35',
    value: today,
    label: 'Event Created',
    leadingIcon: 'i-heroicons-check-circle',
    color: 'success',
    variant: 'soft',
    format: 'medium',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputDate Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputDate component provides a read-only date display with automatic formatting, internationalization, and optional icons.
        </p>
        <p class="text-muted-foreground">
          Perfect for displaying dates, timestamps, and relative time in your forms with various formatting options.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple date output without any icons or special formatting.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading and/or trailing icons to enhance visual clarity.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(1, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Date Formats
          </h2>
          <p class="text-muted-foreground mb-6">
            Available formats: short, medium (default), long, full, and iso.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(4, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Time
          </h2>
          <p class="text-muted-foreground mb-6">
            Display time along with the date using different time styles.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(9, 12)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Relative Time
          </h2>
          <p class="text-muted-foreground mb-6">
            Display dates in relative format (e.g., "yesterday", "2 days ago", "in 1 week").
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(12, 17)"
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
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(17, 22)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Different colors for different contexts and semantic meanings.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(22, 27)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual styles: outline, soft, subtle, and ghost.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(27, 31)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining multiple properties for common use cases.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputDateSchema.slice(31, 35)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
