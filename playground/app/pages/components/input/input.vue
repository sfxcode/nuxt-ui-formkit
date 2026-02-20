<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputSchema = [
  {
    $formkit: 'nuxtUIInput',
    id: 'input-basic',
    name: 'input1',
    placeholder: 'Basic Input',
    label: 'Basic Input',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input2',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    label: 'Email Address',
    autocomplete: 'email',
    validation: 'required|email',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input3',
    inputType: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    autocomplete: 'current-password',
    minLength: 8,
    validation: 'required|length:8',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input4',
    inputType: 'number',
    placeholder: '0',
    label: 'Number Input (Min: 0, Max: 100)',
    min: 0,
    max: 100,
    step: 5,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input5',
    inputType: 'tel',
    placeholder: '+1 (555) 123-4567',
    label: 'Phone Number',
    autocomplete: 'tel',
    pattern: '[0-9+\\-\\s()]+',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input6',
    inputType: 'url',
    placeholder: 'https://example.com',
    label: 'Website URL',
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
    inputType: 'text',
    placeholder: 'Enter text',
    label: 'Text with Max Length',
    maxLength: 50,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input9',
    placeholder: 'With Autofocus',
    label: 'Autofocus Input',
    autofocus: true,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input10',
    placeholder: 'With Autofocus Delay',
    label: 'Autofocus with 1000ms Delay',
    autofocus: true,
    autofocusDelay: 1000,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input11',
    placeholder: 'With Leading Icon',
    label: 'Leading Icon',
    leadingIcon: 'i-heroicons-user',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input12',
    placeholder: 'With Trailing Icon',
    label: 'Trailing Icon',
    trailingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input13',
    placeholder: 'With Both Icons',
    label: 'Leading and Trailing Icons',
    leadingIcon: 'i-heroicons-envelope',
    trailingIcon: 'i-heroicons-at-symbol',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input14',
    placeholder: 'With Avatar',
    label: 'With Avatar',
    avatar: { src: 'https://i.pravatar.cc/150?img=1', alt: 'User Avatar' },
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input15',
    placeholder: 'Loading State',
    label: 'Loading',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input16',
    placeholder: 'Custom Loading Icon',
    label: 'Custom Loading Icon',
    loading: true,
    loadingIcon: 'i-heroicons-arrow-path',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input17',
    placeholder: 'Highlighted Input',
    label: 'Highlight',
    highlight: true,
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input18',
    placeholder: 'Extra Small Size',
    label: 'Size XS',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input19',
    placeholder: 'Small Size',
    label: 'Size SM',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input20',
    placeholder: 'Medium Size (Default)',
    label: 'Size MD',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input21',
    placeholder: 'Large Size',
    label: 'Size LG',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input22',
    placeholder: 'Extra Large Size',
    label: 'Size XL',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input23',
    placeholder: 'Primary Color',
    label: 'Primary Color',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input24',
    placeholder: 'Success Color',
    label: 'Success Color',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input25',
    placeholder: 'Error Color',
    label: 'Error Color',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input26',
    placeholder: 'Variant None',
    label: 'Variant None',
    variant: 'none',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input27',
    placeholder: 'Variant Ghost',
    label: 'Variant Ghost',
    variant: 'ghost',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input28',
    placeholder: 'Read Only',
    label: 'Read Only',
    readonly: true,
    value: 'This is read-only',
  },
  {
    $formkit: 'nuxtUIInput',
    name: 'input29',
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
          Explore various input types, autocomplete, validation attributes, icons, avatars, highlight, loading states, sizing options, and more.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Input Types & Validation
          </h2>
          <p class="text-muted-foreground mb-6">
            Support for various HTML5 input types with autocomplete, min/max values, pattern validation, and length constraints.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputSchema.slice(0, 8)"
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
            :schema="inputSchema.slice(8, 10)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Slots
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons, avatars, and loading indicators to enhance visual appearance.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputSchema.slice(10, 17)"
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
            :schema="inputSchema.slice(17, 22)"
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
            :schema="inputSchema.slice(22, 27)"
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
            :schema="inputSchema.slice(27, 29)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
