<script setup lang='ts'>
import { FormKit, FormKitMessages } from '@formkit/vue'

const data = ref({ })

async function submitHandler() {
  console.log('Form Submitted ...', 'Form submitted successfully')
}

const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        FormKit Without Schema
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates using FormKit components directly without schema definition, providing a more traditional component-based approach.
      </p>
      <p class="text-muted-foreground">
        Build forms using individual FormKit components with Nuxt UI integration for inputs and selects.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Direct Component Usage
        </h2>
        <p class="text-muted-foreground mb-6">
          Use FormKit components directly in your template with validation and data binding.
        </p>
        <FUDataEdit
          v-if="data"
          :data="data"
          :debug-data="true"
          @data-saved="submitHandler"
        >
          <FormKit
            type="nuxtUIInput"
            name="name"
            validation="required"
            label="Name"
          />
          <FormKit
            type="nuxtUISelect"
            name="option"
            label="Option"
            :options="options"
            class="w-46"
            placeholder="Select an option"
            validation="required"
          />
          <template #messages>
            <USeparator class="my-2" />
            <FormKitMessages class="p-formkit-data-edit-messages" />
          </template>
          <template #submit>
            <UButton
              type="submit"
              label="Save"
              icon="i-lucide-save"
              @submit="submitHandler"
            />
          </template>
        </FUDataEdit>
      </section>
    </div>
  </UContainer>
</template>

<style lang='scss' scoped>

</style>
