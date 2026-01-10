<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputSchema = [
  {
    $formkit: 'nuxtUIInput',
    id: 'input-basic',
    name: 'input1',
    placeholder: 'Basic Input',
    label: 'Basic Input',
    help: 'This is a required field.',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input2',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    label: 'Email Address',
    help: 'Enter a valid email address',
    validation: 'required|email',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input3',
    inputType: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    help: 'Password must be at least 8 characters',
    validation: 'required|length:8',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input4',
    inputType: 'number',
    placeholder: '0',
    label: 'Number Input',
    help: 'Enter a number',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input5',
    inputType: 'tel',
    placeholder: '+1 (555) 123-4567',
    label: 'Phone Number',
    help: 'Enter your phone number',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input6',
    inputType: 'url',
    placeholder: 'https://example.com',
    label: 'Website URL',
    help: 'Enter a valid URL',
    validation: 'url',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input7',
    inputType: 'search',
    placeholder: 'Search...',
    label: 'Search',
    icon: 'i-heroicons-magnifying-glass',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input8',
    inputType: 'date',
    label: 'Date',
    help: 'Select a date',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input9',
    inputType: 'time',
    label: 'Time',
    help: 'Select a time',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input10',
    placeholder: 'With Leading Icon',
    label: 'With Leading Icon',
    icon: 'i-heroicons-user',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input11',
    placeholder: 'With Trailing Icon',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input12',
    placeholder: 'Loading State',
    label: 'Loading State',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input13',
    placeholder: 'Small Size',
    label: 'Small Size',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input14',
    placeholder: 'Medium Size (Default)',
    label: 'Medium Size',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input15',
    placeholder: 'Large Size',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input16',
    placeholder: 'Extra Large Size',
    label: 'Extra Large Size',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input17',
    placeholder: 'Primary Color',
    label: 'Primary Color',
    color: 'primary',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input18',
    placeholder: 'Variant None',
    label: 'Variant None',
    variant: 'none',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input19',
    placeholder: 'With Padding',
    label: 'With Padding',
    padded: true,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input20',
    placeholder: 'Read Only',
    label: 'Read Only',
    readonly: true,
    value: 'This is read-only',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input21',
    placeholder: 'Disabled',
    label: 'Disabled',
    disabled: true,
    value: 'This is disabled',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Input Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Input component integrates FormKit with Nuxt UI's UInput component, providing a seamless form input experience.
        </p>
        <p class="text-muted-foreground">
          Explore various input inputTypes, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Input inputTypes
          </h2>
          <p class="text-muted-foreground mb-6">
            Support for various HTML5 input inputTypes including text, email, password, number, tel, url, search, date, and time.
          </p>
          <FUDataView
            :data="{}"
            :schema="inputSchema.slice(0, 9)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons to enhance the visual appearance and provide context.
          </p>
          <FUDataView
            :data="{}"
            :schema="inputSchema.slice(9, 12)"
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
          <FUDataView
            :data="{}"
            :schema="inputSchema.slice(12, 16)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize colors, variants, and padding to match your design.
          </p>
          <FUDataView
            :data="{}"
            :schema="inputSchema.slice(16, 19)"
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
          <FUDataView
            :data="{}"
            :schema="inputSchema.slice(19, 21)"
            debug-data
          >
            rewerw
          </FUDataView>
        </section>
      </div>
    </UContainer>
  </div>
</template>
