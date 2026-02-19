<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputTextSchema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output1',
    value: 'Basic Text Output',
    label: 'Basic Output',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output2',
    value: 'Text with Leading Icon',
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output3',
    value: 'Text with Trailing Icon',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-arrow-right',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output4',
    value: 'Text with Both Icons',
    label: 'With Both Icons',
    leadingIcon: 'i-heroicons-user',
    trailingIcon: 'i-heroicons-check',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output5',
    value: 'Extra Small',
    label: 'Size XS',
    size: 'xs',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output6',
    value: 'Small',
    label: 'Size SM',
    size: 'sm',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output7',
    value: 'Medium (Default)',
    label: 'Size MD',
    size: 'md',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output8',
    value: 'Large',
    label: 'Size LG',
    size: 'lg',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output9',
    value: 'Extra Large',
    label: 'Size XL',
    size: 'xl',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output10',
    value: 'Primary Color',
    label: 'Primary',
    color: 'primary',
    leadingIcon: 'i-heroicons-star',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output11',
    value: 'Success Color',
    label: 'Success',
    color: 'success',
    leadingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output12',
    value: 'Error Color',
    label: 'Error',
    color: 'error',
    leadingIcon: 'i-heroicons-exclamation-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output13',
    value: 'Warning Color',
    label: 'Warning',
    color: 'warning',
    leadingIcon: 'i-heroicons-exclamation-triangle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output14',
    value: 'Info Color',
    label: 'Info',
    color: 'info',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output15',
    value: 'Outline Variant',
    label: 'Outline',
    variant: 'outline',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output16',
    value: 'Soft Variant',
    label: 'Soft',
    variant: 'soft',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output17',
    value: 'Subtle Variant',
    label: 'Subtle',
    variant: 'subtle',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output18',
    value: 'Ghost Variant',
    label: 'Ghost',
    variant: 'ghost',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output19',
    value: 'None Variant (Default)',
    label: 'None',
    variant: 'none',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output20',
    value: 'User Profile: John Doe',
    label: 'User Info',
    leadingIcon: 'i-heroicons-user-circle',
    color: 'primary',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output21',
    value: 'Email sent successfully!',
    label: 'Status Message',
    leadingIcon: 'i-heroicons-check-circle',
    color: 'success',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'output22',
    value: 'Critical error occurred',
    label: 'Error Message',
    leadingIcon: 'i-heroicons-x-circle',
    trailingIcon: 'i-heroicons-exclamation-triangle',
    color: 'error',
    variant: 'outline',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputText Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputText component provides a read-only text display with optional leading and trailing icons.
        </p>
        <p class="text-muted-foreground">
          Perfect for displaying static values, status messages, and read-only information in your forms.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple text output without any icons or styling.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputTextSchema.slice(0, 1)"
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
            :schema="outputTextSchema.slice(1, 4)"
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
            :schema="outputTextSchema.slice(4, 9)"
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
            :schema="outputTextSchema.slice(9, 14)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual styles: outline, soft, subtle, ghost, and none.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputTextSchema.slice(14, 19)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining multiple properties.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputTextSchema.slice(19, 22)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
