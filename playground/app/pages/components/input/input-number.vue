<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputNumberSchema = [
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number1',
    label: 'Basic Number Input',
    placeholder: '0',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number2',
    label: 'With Min/Max (0-100)',
    placeholder: '50',
    min: 0,
    max: 100,
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number3',
    label: 'With Step (Increment by 5)',
    placeholder: '0',
    step: 5,
    value: 25,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number4',
    label: 'Step Snapping',
    placeholder: '0',
    step: 10,
    stepSnapping: true,
    value: 30,
    help: 'Value snaps to nearest step (10, 20, 30...)',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number5',
    label: 'Horizontal Orientation',
    placeholder: '0',
    orientation: 'horizontal',
    value: 42,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number6',
    label: 'Vertical Orientation (Default)',
    placeholder: '0',
    orientation: 'vertical',
    value: 42,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number7',
    label: 'Extra Small Size',
    placeholder: '0',
    size: 'xs',
    value: 10,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number8',
    label: 'Small Size',
    placeholder: '0',
    size: 'sm',
    value: 20,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number9',
    label: 'Medium Size (Default)',
    placeholder: '0',
    size: 'md',
    value: 30,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number10',
    label: 'Large Size',
    placeholder: '0',
    size: 'lg',
    value: 40,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number11',
    label: 'Extra Large Size',
    placeholder: '0',
    size: 'xl',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number12',
    label: 'Primary Color',
    placeholder: '0',
    color: 'primary',
    value: 100,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number13',
    label: 'Success Color',
    placeholder: '0',
    color: 'success',
    value: 100,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number14',
    label: 'Error Color',
    placeholder: '0',
    color: 'error',
    value: 100,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number15',
    label: 'Warning Color',
    placeholder: '0',
    color: 'warning',
    value: 100,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number16',
    label: 'Info Color',
    placeholder: '0',
    color: 'info',
    value: 100,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number17',
    label: 'Outline Variant (Default)',
    placeholder: '0',
    variant: 'outline',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number18',
    label: 'Soft Variant',
    placeholder: '0',
    variant: 'soft',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number19',
    label: 'Subtle Variant',
    placeholder: '0',
    variant: 'subtle',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number20',
    label: 'Ghost Variant',
    placeholder: '0',
    variant: 'ghost',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number21',
    label: 'Highlighted',
    placeholder: '0',
    highlight: true,
    value: 75,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number22',
    label: 'Fixed Width',
    placeholder: '0',
    fixed: true,
    value: 150,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number23',
    label: 'Disabled Increment',
    placeholder: '0',
    incrementDisabled: true,
    value: 50,
    help: 'Increment button is disabled',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number24',
    label: 'Disabled Decrement',
    placeholder: '0',
    decrementDisabled: true,
    value: 50,
    help: 'Decrement button is disabled',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number25',
    label: 'Custom Increment Icon',
    placeholder: '0',
    incrementIcon: 'i-heroicons-arrow-up-circle',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number26',
    label: 'Custom Decrement Icon',
    placeholder: '0',
    decrementIcon: 'i-heroicons-arrow-down-circle',
    value: 50,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number27',
    label: 'Currency Format (USD)',
    placeholder: '0',
    formatOptions: {
      style: 'currency',
      currency: 'USD',
    },
    value: 1234.56,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number28',
    label: 'Currency Format (EUR)',
    placeholder: '0',
    formatOptions: {
      style: 'currency',
      currency: 'EUR',
    },
    value: 999.99,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number29',
    label: 'Percentage Format',
    placeholder: '0',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    value: 0.75,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number30',
    label: 'Decimal Places',
    placeholder: '0',
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    step: 0.01,
    value: 3.14159,
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number31',
    label: 'Disable Wheel Change',
    placeholder: '0',
    disableWheelChange: true,
    value: 50,
    help: 'Mouse wheel scrolling does not change value',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number32',
    label: 'Invert Wheel Change',
    placeholder: '0',
    invertWheelChange: true,
    value: 50,
    help: 'Mouse wheel direction is inverted',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number33',
    label: 'Focus on Change',
    placeholder: '0',
    focusOnChange: true,
    value: 50,
    help: 'Input stays focused after button clicks',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number34',
    label: 'Price Input',
    placeholder: '0.00',
    color: 'primary',
    variant: 'outline',
    size: 'lg',
    min: 0,
    step: 0.01,
    formatOptions: {
      style: 'currency',
      currency: 'USD',
    },
    value: 49.99,
    validation: 'required|min:0',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number35',
    label: 'Quantity Input',
    placeholder: '1',
    color: 'success',
    variant: 'soft',
    min: 1,
    max: 999,
    step: 1,
    stepSnapping: true,
    value: 5,
    validation: 'required|between:1,999',
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number36',
    label: 'Rating (0-5 stars)',
    placeholder: '0',
    color: 'warning',
    variant: 'outline',
    min: 0,
    max: 5,
    step: 0.5,
    value: 4.5,
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  },
  {
    $formkit: 'nuxtUIInputNumber',
    name: 'number37',
    label: 'Temperature (°C)',
    placeholder: '20',
    color: 'info',
    variant: 'soft',
    size: 'md',
    min: -50,
    max: 50,
    step: 0.1,
    value: 22.5,
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputNumber Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputNumber component provides a number input with increment/decrement buttons and advanced formatting options.
        </p>
        <p class="text-muted-foreground">
          Built on Nuxt UI's UInputNumber component with full FormKit integration for validation and form handling.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple number input without any special configuration.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Min, Max, and Step
          </h2>
          <p class="text-muted-foreground mb-6">
            Control the range and increment values with min, max, and step properties.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(1, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Choose between horizontal (side by side) or vertical (stacked) button layout.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(4, 6)"
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
            :schema="inputNumberSchema.slice(6, 11)"
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
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(11, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual styles: outline (default), soft, subtle, and ghost.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(16, 20)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Highlight and Fixed
          </h2>
          <p class="text-muted-foreground mb-6">
            Control visual emphasis and width behavior.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(20, 22)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button Controls
          </h2>
          <p class="text-muted-foreground mb-6">
            Disable specific buttons or customize their icons.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(22, 26)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Number Formatting
          </h2>
          <p class="text-muted-foreground mb-6">
            Use Intl.NumberFormat options to format numbers as currency, percentages, or with specific decimal places.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(26, 30)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Interaction Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Control mouse wheel behavior and focus management.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(30, 33)"
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
          <FUDataEdit
            :data="{}"
            :schema="inputNumberSchema.slice(33, 37)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
