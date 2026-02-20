<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const sliderSchema = [
  {
    $formkit: 'nuxtUISlider',
    id: 'slider-basic',
    name: 'slider1',
    label: 'Basic Slider',
    help: 'Simple slider from 0 to 100',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider2',
    label: 'Volume Control',
    help: 'Adjust volume level',
    value: 50,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider3',
    label: 'Custom Range (0-10)',
    help: 'Slider with custom min and max',
    min: 0,
    max: 10,
    value: 5,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider4',
    label: 'Price Range ($100-$1000)',
    help: 'Select price range',
    min: 100,
    max: 1000,
    step: 50,
    value: 500,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider5',
    label: 'Step by 5',
    help: 'Slider with step increment of 5',
    min: 0,
    max: 100,
    step: 5,
    value: 25,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider6',
    label: 'Step by 0.1',
    help: 'Fine-grained decimal steps',
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider7',
    label: 'With Tooltip',
    help: 'Shows current value in tooltip',
    tooltip: true,
    value: 50,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider8',
    label: 'Inverted Slider',
    help: 'Slider with inverted direction',
    inverted: true,
    value: 60,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider9',
    label: 'Range with Min Steps',
    help: 'Range slider with minimum steps between thumbs',
    value: [20, 60],
    minStepsBetweenThumbs: 10,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider10',
    label: 'Horizontal (Default)',
    help: 'Horizontal orientation',
    orientation: 'horizontal',
    value: 50,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider11',
    label: 'Extra Small Size',
    size: 'xs',
    value: 25,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider12',
    label: 'Small Size',
    size: 'sm',
    value: 35,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider13',
    label: 'Medium Size (Default)',
    size: 'md',
    value: 50,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider14',
    label: 'Large Size',
    size: 'lg',
    value: 65,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider15',
    label: 'Extra Large Size',
    size: 'xl',
    value: 75,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider16',
    label: 'Primary Color',
    help: 'Primary color slider',
    color: 'primary',
    value: 50,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider17',
    label: 'Success Color',
    help: 'Success color slider',
    color: 'success',
    value: 70,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider18',
    label: 'Error Color',
    help: 'Error color slider',
    color: 'error',
    value: 30,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider19',
    label: 'Warning Color',
    help: 'Warning color slider',
    color: 'warning',
    value: 80,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider20',
    label: 'With Default Value',
    help: 'Pre-set slider value',
    value: 75,
  },
  {
    $formkit: 'nuxtUISlider',
    name: 'slider21',
    label: 'Disabled',
    help: 'Disabled slider',
    disabled: true,
    value: 60,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Slider Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Slider component integrates FormKit with Nuxt UI's USlider component, providing a seamless range slider experience.
        </p>
        <p class="text-muted-foreground">
          Explore various slider configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic sliders with default range (0-100) and custom default values.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Ranges
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure custom min and max values for different use cases.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Step Increments
          </h2>
          <p class="text-muted-foreground mb-6">
            Control step increments for integer and decimal values.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(4, 6)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Advanced Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Tooltip display, inverted direction, and range sliders with minimum steps between thumbs.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(6, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure horizontal or vertical orientation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(9, 10)"
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
            :schema="sliderSchema.slice(10, 15)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize slider colors including primary, success, error, and warning.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(15, 19)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="sliderSchema.slice(19, 21)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
