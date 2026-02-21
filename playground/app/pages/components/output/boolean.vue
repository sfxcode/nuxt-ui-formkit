<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputBooleanSchema = [
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool1',
    value: true,
    label: 'Basic Boolean Output (True)',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool2',
    value: false,
    label: 'Basic Boolean Output (False)',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool3',
    value: true,
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-shield-check',
    onLeadingIconClicked: () => alert('Leading icon clicked!'),
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool4',
    value: true,
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-star',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool5',
    value: true,
    label: 'Active Status',
    trueValue: 'Active',
    falseValue: 'Inactive',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool6',
    value: false,
    label: 'Subscription Status',
    trueValue: 'Active',
    falseValue: 'Inactive',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool7',
    value: true,
    label: 'Email Verified',
    trueValue: 'Verified',
    falseValue: 'Not Verified',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool8',
    value: false,
    label: 'Payment Status',
    trueValue: 'Paid',
    falseValue: 'Unpaid',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool9',
    value: true,
    label: 'Task Completed',
    trueIcon: 'i-heroicons-check-circle',
    falseIcon: 'i-heroicons-x-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool10',
    value: false,
    label: 'Task Status',
    trueIcon: 'i-heroicons-check-circle',
    falseIcon: 'i-heroicons-x-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool11',
    value: true,
    label: 'Server Online',
    trueIcon: 'i-heroicons-signal',
    falseIcon: 'i-heroicons-signal-slash',
    trueValue: 'Online',
    falseValue: 'Offline',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool12',
    value: false,
    label: 'Connection Status',
    trueIcon: 'i-heroicons-wifi',
    falseIcon: 'i-heroicons-no-symbol',
    trueValue: 'Connected',
    falseValue: 'Disconnected',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool13',
    value: true,
    label: 'Extra Small',
    size: 'xs',
    trueIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool14',
    value: true,
    label: 'Small',
    size: 'sm',
    trueIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool15',
    value: true,
    label: 'Medium (Default)',
    size: 'md',
    trueIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool16',
    value: true,
    label: 'Large',
    size: 'lg',
    trueIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool17',
    value: true,
    label: 'Extra Large',
    size: 'xl',
    trueIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool18',
    value: true,
    label: 'Success Status',
    variant: 'soft',
    color: 'success',
    trueIcon: 'i-heroicons-check-circle',
    trueValue: 'Completed',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool19',
    value: false,
    label: 'Error Status',
    variant: 'soft',
    color: 'error',
    falseIcon: 'i-heroicons-x-circle',
    falseValue: 'Failed',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool20',
    value: true,
    label: 'Info Status',
    variant: 'outline',
    color: 'info',
    trueIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool21',
    value: false,
    label: 'Warning Status',
    variant: 'soft',
    color: 'warning',
    falseIcon: 'i-heroicons-exclamation-triangle',
    falseValue: 'Pending',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool22',
    value: true,
    label: 'Primary Color',
    variant: 'subtle',
    color: 'primary',
    trueValue: 'Enabled',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool23',
    value: true,
    label: 'Outline Variant',
    variant: 'outline',
    trueIcon: 'i-heroicons-check-badge',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool24',
    value: true,
    label: 'Soft Variant',
    variant: 'soft',
    trueIcon: 'i-heroicons-check-badge',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool25',
    value: true,
    label: 'Subtle Variant',
    variant: 'subtle',
    trueIcon: 'i-heroicons-check-badge',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool26',
    value: true,
    label: 'Ghost Variant',
    variant: 'ghost',
    trueIcon: 'i-heroicons-check-badge',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool27',
    value: true,
    label: '2FA Enabled',
    trueIcon: 'i-heroicons-lock-closed',
    falseIcon: 'i-heroicons-lock-open',
    trueValue: 'Protected',
    falseValue: 'Not Protected',
    variant: 'soft',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool28',
    value: false,
    label: 'Auto-Renewal',
    trueIcon: 'i-heroicons-arrow-path',
    falseIcon: 'i-heroicons-pause-circle',
    trueValue: 'On',
    falseValue: 'Off',
    variant: 'soft',
    color: 'info',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool29',
    value: true,
    label: 'Dark Mode',
    trueIcon: 'i-heroicons-moon',
    falseIcon: 'i-heroicons-sun',
    trueValue: 'Dark',
    falseValue: 'Light',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'bool30',
    value: false,
    label: 'Maintenance Mode',
    trueIcon: 'i-heroicons-wrench-screwdriver',
    falseIcon: 'i-heroicons-check-badge',
    trueValue: 'Under Maintenance',
    falseValue: 'Operational',
    variant: 'soft',
    color: 'warning',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputBoolean Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputBoolean component provides a read-only boolean display with customizable text and icons for true/false states.
        </p>
        <p class="text-muted-foreground">
          Perfect for displaying status indicators, toggles, and yes/no values in your forms with various styling options.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple boolean output showing default "Yes" and "No" values.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBooleanSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading and/or trailing icons for additional context.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBooleanSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom True/False Values
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize the text displayed for true and false states.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBooleanSchema.slice(4, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Boolean Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Use different icons based on the boolean state for better visual feedback.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBooleanSchema.slice(8, 12)"
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
            :schema="outputBooleanSchema.slice(12, 17)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors and Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different colors and variants for semantic meaning and visual styles.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBooleanSchema.slice(17, 22)"
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
            :schema="outputBooleanSchema.slice(22, 26)"
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
            :schema="outputBooleanSchema.slice(26, 30)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
