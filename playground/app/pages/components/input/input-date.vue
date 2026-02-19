<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputDateSchema = [
  {
    $formkit: 'nuxtUIInputDate',
    id: 'inputdate-basic',
    name: 'date1',
    label: 'Basic Date',
    help: 'Select a date',
    validation: 'required',
  },

]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputDate Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputDate component integrates FormKit with Nuxt UI's UInputDate component, providing a rich date and time picker experience.
        </p>
        <p class="text-muted-foreground">
          Explore various date configurations, ranges, time granularity, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple date picker with validation and default values.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputDateSchema"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
