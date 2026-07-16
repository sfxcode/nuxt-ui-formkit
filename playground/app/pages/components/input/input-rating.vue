<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const ratingSchema = [
  {
    $formkit: 'nuxtUIInputRating',
    id: 'rating-basic',
    name: 'rating1',
    label: 'Basic Rating',
    help: 'Simple 5-star rating',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating2',
    label: 'Pre-set Value',
    help: 'Rating with a default value',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating3',
    label: 'Custom Length (10)',
    help: 'Rating with 10 items instead of the default 5',
    length: 10,
    value: 7,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating4',
    label: 'Half-Star Steps',
    help: 'Fine-grained rating with 0.5 step increments',
    step: 0.5,
    value: 3.5,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating5',
    label: 'Clearable',
    help: 'Clicking the current value resets it to 0',
    clearable: true,
    value: 4,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating6',
    label: 'Hoverable Preview',
    help: 'Previews the value under the pointer on hover',
    hoverable: true,
    value: 2,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating7',
    label: 'Custom Icon',
    help: 'Uses a custom icon instead of the default star',
    icon: 'i-lucide-heart',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating8',
    label: 'Vertical Orientation',
    help: 'Rating laid out vertically',
    orientation: 'vertical',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating9',
    label: 'Extra Small Size',
    size: 'xs',
    value: 2,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating10',
    label: 'Small Size',
    size: 'sm',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating11',
    label: 'Medium Size (Default)',
    size: 'md',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating12',
    label: 'Large Size',
    size: 'lg',
    value: 4,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating13',
    label: 'Extra Large Size',
    size: 'xl',
    value: 4,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating14',
    label: 'Primary Color',
    help: 'Primary color rating',
    color: 'primary',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating15',
    label: 'Success Color',
    help: 'Success color rating',
    color: 'success',
    value: 4,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating16',
    label: 'Error Color',
    help: 'Error color rating',
    color: 'error',
    value: 2,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating17',
    label: 'Warning Color',
    help: 'Warning color rating',
    color: 'warning',
    value: 3,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating18',
    label: 'Readonly',
    help: 'Non-interactive display of a rating',
    readonly: true,
    value: 4,
  },
  {
    $formkit: 'nuxtUIInputRating',
    name: 'rating19',
    label: 'Disabled',
    help: 'Disabled rating',
    disabled: true,
    value: 3,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputRating Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputRating component integrates FormKit with Nuxt UI's UInputRating component, providing a star-based rating experience.
        </p>
        <p class="text-muted-foreground">
          Explore various rating configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic ratings with the default 5-item length and a pre-set value.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="ratingSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Length and Steps
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure the number of rating items and fine-grained step increments.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="ratingSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Interaction Behavior
          </h2>
          <p class="text-muted-foreground mb-6">
            Clearable and hoverable rating behavior.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="ratingSchema.slice(4, 6)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icon and Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Custom icons and vertical orientation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="ratingSchema.slice(6, 8)"
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
            :schema="ratingSchema.slice(8, 13)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize rating colors including primary, success, error, and warning.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="ratingSchema.slice(13, 17)"
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
            :schema="ratingSchema.slice(17, 19)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
