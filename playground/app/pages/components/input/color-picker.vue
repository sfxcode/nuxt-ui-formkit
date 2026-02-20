<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const colorPickerSchema = [
  {
    $formkit: 'nuxtUIColorPicker',
    id: 'color-basic',
    name: 'color1',
    label: 'Basic Color Picker',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color2',
    label: 'With Default Color',
    value: '#3b82f6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color3',
    label: 'Extra Small Size',
    size: 'xs',
    value: '#ef4444',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color4',
    label: 'Small Size',
    size: 'sm',
    value: '#f97316',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color5',
    label: 'Medium Size (Default)',
    size: 'md',
    value: '#84cc16',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color6',
    label: 'Large Size',
    size: 'lg',
    value: '#22c55e',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color7',
    label: 'Extra Large Size',
    size: 'xl',
    value: '#3b82f6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color8',
    label: 'With Throttle (100ms)',
    throttle: 100,
    value: '#8b5cf6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color9',
    label: 'With Throttle (500ms)',
    throttle: 500,
    value: '#ec4899',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color10',
    label: 'Custom Input Class',
    inputClass: 'border-2 border-dashed',
    value: '#f43f5e',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color11',
    label: 'Disabled',
    disabled: true,
    value: '#9ca3af',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          ColorPicker Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The ColorPicker component integrates FormKit with Nuxt UI's UColorPicker component, providing a seamless color selection experience.
        </p>
        <p class="text-muted-foreground">
          Explore various color picker configurations, formats, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic color picker with default and pre-selected colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(0, 2)"
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
            :schema="colorPickerSchema.slice(2, 7)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Throttle
          </h2>
          <p class="text-muted-foreground mb-6">
            Control update frequency with throttle delay in milliseconds.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(7, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Styling
          </h2>
          <p class="text-muted-foreground mb-6">
            Apply custom CSS classes to the input element.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(9, 10)"
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
            :schema="colorPickerSchema.slice(10, 11)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
