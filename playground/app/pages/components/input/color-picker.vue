<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const commonSwatches = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e',
]

const colorPickerSchema = [
  {
    $formkit: 'nuxtUIColorPicker',
    id: 'color-basic',
    name: 'color1',
    label: 'Basic Color Picker',
    help: 'Select a color',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color2',
    label: 'With Default Color',
    help: 'Pre-selected color',
    value: '#3b82f6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color3',
    label: 'HEX Format',
    help: 'Color in HEX format',
    format: 'hex',
    value: '#22c55e',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color4',
    label: 'RGB Format',
    help: 'Color in RGB format',
    format: 'rgb',
    value: 'rgb(239, 68, 68)',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color5',
    label: 'HSL Format',
    help: 'Color in HSL format',
    format: 'hsl',
    value: 'hsl(217, 91%, 60%)',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color6',
    label: 'Multiple Modes',
    help: 'Switch between HEX, RGB, and HSL',
    modes: ['hex', 'rgb', 'hsl'],
    value: '#8b5cf6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color7',
    label: 'With Alpha Channel',
    help: 'Supports transparency',
    showAlpha: true,
    value: '#3b82f680',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color8',
    label: 'With Input Field',
    help: 'Shows color input field',
    showInput: true,
    value: '#f59e0b',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color9',
    label: 'With Swatches',
    help: 'Pre-defined color swatches',
    swatches: commonSwatches,
    value: '#ec4899',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color10',
    label: 'Complete Picker',
    help: 'All features enabled',
    showAlpha: true,
    showInput: true,
    modes: ['hex', 'rgb', 'hsl'],
    swatches: commonSwatches,
    value: '#6366f1',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color11',
    label: 'Extra Small Size',
    size: 'xs',
    value: '#ef4444',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color12',
    label: 'Small Size',
    size: 'sm',
    value: '#f97316',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color13',
    label: 'Medium Size (Default)',
    size: 'md',
    value: '#84cc16',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color14',
    label: 'Large Size',
    size: 'lg',
    value: '#22c55e',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color15',
    label: 'Extra Large Size',
    size: 'xl',
    value: '#3b82f6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color16',
    label: 'Outline Variant',
    variant: 'outline',
    value: '#8b5cf6',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color17',
    label: 'Soft Variant',
    variant: 'soft',
    value: '#ec4899',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color18',
    label: 'Subtle Variant',
    variant: 'subtle',
    value: '#f43f5e',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color19',
    label: 'Ghost Variant',
    variant: 'ghost',
    value: '#06b6d4',
  },
  {
    $formkit: 'nuxtUIColorPicker',
    name: 'color20',
    label: 'Disabled',
    help: 'Disabled color picker',
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
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Color Formats
          </h2>
          <p class="text-muted-foreground mb-6">
            Support for HEX, RGB, and HSL color formats.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(2, 6)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Additional features including alpha channel, input field, and swatches.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(6, 10)"
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
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(10, 15)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different variants including outline, soft, subtle, and ghost.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="colorPickerSchema.slice(15, 19)"
            debug-data
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
            :schema="colorPickerSchema.slice(19, 20)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
