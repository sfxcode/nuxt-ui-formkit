<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputRatingSchema = [
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating1',
    value: 3,
    label: 'Basic Rating (3/5)',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating2',
    value: 5,
    label: 'Perfect Rating (5/5)',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating3',
    value: 7,
    length: 10,
    label: '10-Point Scale (7/10)',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating4',
    value: 9.5,
    length: 10,
    label: 'Decimal Rating (9.5/10)',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating5',
    value: 4,
    label: 'Thumbs Up Rating',
    icon: 'i-heroicons-hand-thumb-up',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating6',
    value: 3,
    label: 'Heart Rating',
    icon: 'i-heroicons-heart',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating7',
    value: 3,
    label: 'Extra Small',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating8',
    value: 3,
    label: 'Small',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating9',
    value: 3,
    label: 'Medium (Default)',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating10',
    value: 3,
    label: 'Large',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating11',
    value: 3,
    label: 'Extra Large',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating12',
    value: 4,
    label: 'Primary',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating13',
    value: 4,
    label: 'Secondary',
    color: 'secondary',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating14',
    value: 4,
    label: 'Success',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating15',
    value: 4,
    label: 'Info',
    color: 'info',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating16',
    value: 4,
    label: 'Warning',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating17',
    value: 4,
    label: 'Error',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating18',
    value: 4,
    label: 'Neutral',
    color: 'neutral',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'productReview',
    value: 4,
    label: 'Product Review',
    color: 'warning',
    leadingIcon: 'i-heroicons-shopping-bag',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'satisfactionScore',
    value: 8,
    length: 10,
    label: 'Customer Satisfaction',
    color: 'success',
    leadingIcon: 'i-heroicons-face-smile',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'qualityRating',
    value: 3.5,
    label: 'Quality Rating',
    color: 'info',
    leadingIcon: 'i-heroicons-star',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputRating Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputRating component displays a numeric rating as a read-only row of stars.
        </p>
        <p class="text-muted-foreground">
          Perfect for showing review scores, satisfaction ratings, and quality metrics. Stars are always non-interactive - clicking does nothing.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple ratings out of the default length of 5 stars.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputRatingSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Length
          </h2>
          <p class="text-muted-foreground mb-6">
            Use <code>length</code> for scales other than 5, including fractional values.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputRatingSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Use any icon instead of the default star.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputRatingSchema.slice(4, 6)"
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
            :schema="outputRatingSchema.slice(6, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            All semantic colors are supported.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputRatingSchema.slice(11, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining a leading icon, color, and custom scale for common use cases.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputRatingSchema.slice(18, 21)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
