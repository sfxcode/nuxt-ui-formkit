<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputProgressSchema = [
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress1',
    value: 25,
    label: 'Basic Progress (25%)',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress2',
    value: 75,
    label: 'Basic Progress (75%)',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress3',
    value: 42,
    label: 'With Status Text',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress4',
    value: 90,
    label: 'Near Complete',
    status: true,
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress5',
    value: 60,
    label: 'Extra Small',
    size: 'xs',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress6',
    value: 60,
    label: 'Small',
    size: 'sm',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress7',
    value: 60,
    label: 'Medium (Default)',
    size: 'md',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress8',
    value: 60,
    label: 'Large',
    size: 'lg',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress9',
    value: 60,
    label: 'Extra Large',
    size: 'xl',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress10',
    value: 65,
    label: 'Primary',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress11',
    value: 65,
    label: 'Secondary',
    color: 'secondary',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress12',
    value: 65,
    label: 'Success',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress13',
    value: 65,
    label: 'Info',
    color: 'info',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress14',
    value: 65,
    label: 'Warning',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress15',
    value: 65,
    label: 'Error',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress16',
    value: 65,
    label: 'Neutral',
    color: 'neutral',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress17',
    value: 50,
    label: 'Horizontal (Default)',
    orientation: 'horizontal',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'progress18',
    value: 50,
    label: 'Vertical',
    orientation: 'vertical',
    status: true,
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'storageUsed',
    value: 72,
    label: 'Storage Used',
    status: true,
    color: 'warning',
    leadingIcon: 'i-heroicons-server',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'downloadProgress',
    value: 88,
    label: 'Download Progress',
    status: true,
    color: 'primary',
    leadingIcon: 'i-heroicons-arrow-down-tray',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'goalCompletion',
    value: 150,
    max: 200,
    label: 'Goal Completion',
    status: true,
    color: 'success',
    leadingIcon: 'i-heroicons-trophy',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputProgress Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputProgress component displays a numeric value as a read-only progress bar.
        </p>
        <p class="text-muted-foreground">
          Perfect for showing completion rates, storage usage, download progress, and goal tracking.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple progress bars showing a value out of the default max of 100.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputProgressSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Status Text
          </h2>
          <p class="text-muted-foreground mb-6">
            Overlay the computed percentage as text with the <code>status</code> prop.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputProgressSchema.slice(2, 4)"
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
            :schema="outputProgressSchema.slice(4, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            All semantic colors are supported.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputProgressSchema.slice(9, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Render horizontally (default) or vertically.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputProgressSchema.slice(16, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining an icon, color, and status text for common use cases.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputProgressSchema.slice(18, 21)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
