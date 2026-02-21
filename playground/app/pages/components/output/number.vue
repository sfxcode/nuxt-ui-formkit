<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputNumberSchema = [
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number1',
    value: 1234.56,
    label: 'Basic Number',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number2',
    value: 1234567.89,
    label: 'Large Number',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number3',
    value: 1234.56,
    label: 'Currency (USD)',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number4',
    value: 1234.56,
    label: 'Currency (EUR)',
    formatOptions: { style: 'currency', currency: 'EUR' },
    locale: 'de-DE',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number5',
    value: 1234.56,
    label: 'Currency (JPY)',
    formatOptions: { style: 'currency', currency: 'JPY' },
    locale: 'ja-JP',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number6',
    value: 0.85,
    label: 'Percentage',
    formatOptions: { style: 'percent', minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number7',
    value: 0.1234,
    label: 'Percentage (4 decimals)',
    formatOptions: { style: 'percent', minimumFractionDigits: 4, maximumFractionDigits: 4 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number8',
    value: 1234567,
    label: 'Compact Notation',
    formatOptions: { notation: 'compact', compactDisplay: 'short' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number9',
    value: 1234567,
    label: 'Compact Long',
    formatOptions: { notation: 'compact', compactDisplay: 'long' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number10',
    value: 1234.5678,
    label: '2 Decimal Places',
    formatOptions: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number11',
    value: 1234.5678,
    label: '4 Decimal Places',
    formatOptions: { minimumFractionDigits: 4, maximumFractionDigits: 4 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number12',
    value: 1234567.89,
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-currency-dollar',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number13',
    value: 98.5,
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-arrow-trending-up',
    formatOptions: { minimumFractionDigits: 1 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number14',
    value: 1234.56,
    label: 'Size XS',
    size: 'xs',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number15',
    value: 1234.56,
    label: 'Size SM',
    size: 'sm',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number16',
    value: 1234.56,
    label: 'Size MD (Default)',
    size: 'md',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number17',
    value: 1234.56,
    label: 'Size LG',
    size: 'lg',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number18',
    value: 1234.56,
    label: 'Size XL',
    size: 'xl',
    formatOptions: { minimumFractionDigits: 2 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number19',
    value: 1234.56,
    label: 'Primary Color',
    color: 'primary',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number20',
    value: 98.5,
    label: 'Success Color',
    color: 'success',
    leadingIcon: 'i-heroicons-arrow-trending-up',
    formatOptions: { minimumFractionDigits: 1 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number21',
    value: -45.3,
    label: 'Error Color',
    color: 'error',
    leadingIcon: 'i-heroicons-arrow-trending-down',
    formatOptions: { minimumFractionDigits: 1 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number22',
    value: 50.0,
    label: 'Warning Color',
    color: 'warning',
    formatOptions: { minimumFractionDigits: 1 },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number23',
    value: 1234.56,
    label: 'Outline Variant',
    variant: 'outline',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number24',
    value: 1234.56,
    label: 'Soft Variant',
    variant: 'soft',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number25',
    value: 1234.56,
    label: 'Subtle Variant',
    variant: 'subtle',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number26',
    value: 1234.56,
    label: 'Ghost Variant',
    variant: 'ghost',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number27',
    value: 1234567.89,
    label: 'Scientific Notation',
    formatOptions: { notation: 'scientific' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number28',
    value: 1234567.89,
    label: 'Engineering Notation',
    formatOptions: { notation: 'engineering' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number29',
    value: 50,
    label: 'Unit (Kilometers)',
    formatOptions: { style: 'unit', unit: 'kilometer' },
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'number30',
    value: 72,
    label: 'Unit (Fahrenheit)',
    formatOptions: { style: 'unit', unit: 'fahrenheit' },
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputNumber Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputNumber component displays formatted numbers using Intl.NumberFormat with full support for currency, percentages, units, and custom formatting options.
        </p>
        <p class="text-muted-foreground">
          Explore various number formatting configurations including currencies, percentages, compact notation, scientific notation, and locales.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic number formatting with default locale (en-US).
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Currency Formatting
          </h2>
          <p class="text-muted-foreground mb-6">
            Format numbers as currency with different currencies and locales.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(2, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Percentage Formatting
          </h2>
          <p class="text-muted-foreground mb-6">
            Display numbers as percentages with customizable decimal places.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(5, 7)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Compact Notation
          </h2>
          <p class="text-muted-foreground mb-6">
            Compact notation for large numbers (e.g., 1.2M, 1.2 million).
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(7, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Decimal Places
          </h2>
          <p class="text-muted-foreground mb-6">
            Control the number of decimal places displayed.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(9, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons to enhance visual context.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(11, 13)"
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
            :schema="outputNumberSchema.slice(13, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Use different colors to indicate positive, negative, or warning values.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(18, 22)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual variants including outline, soft, subtle, and ghost.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(22, 26)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Scientific & Engineering Notation
          </h2>
          <p class="text-muted-foreground mb-6">
            Display numbers in scientific or engineering notation for very large or small values.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(26, 28)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Unit Formatting
          </h2>
          <p class="text-muted-foreground mb-6">
            Format numbers with units like kilometers, fahrenheit, etc.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputNumberSchema.slice(28, 30)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
