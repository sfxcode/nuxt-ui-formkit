<script setup lang="ts">
import { FormKit, FormKitMessages } from '@formkit/vue'

// `useFormKitForm` is auto-imported (`src/module.ts` registers
// `./runtime/composables` via `addImportsDir`) - no explicit import needed
// in a real consuming app, same as any other Nuxt composable.
const FORM_ID = 'composable-demo-form'
const form = useFormKitForm(FORM_ID)

async function handleSubmit() {
  // The submit button lives *outside* the `<FormKit type="form">` below -
  // useFormKitForm() is what makes that possible, since it looks the form up
  // by its registry `id` rather than needing to be inside the form's own
  // component tree.
  form.submit(async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('Form Submitted...')
  })
}

function simulateServerError() {
  form.setErrors('The server rejected this submission - please try again.')
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        useFormKitForm Composable
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        Submit, reset, and error-display buttons wired up via <code>useFormKitForm</code>, living outside the <code>FormKit</code> form itself.
      </p>
      <p class="text-muted-foreground">
        Reactive <code>isValid</code>/<code>isSubmitted</code>/<code>hasErrors</code>/<code>isLoading</code> state, plus <code>submit</code>/<code>reset</code>/<code>setErrors</code>/<code>clearErrors</code> wrapping FormKit's imperative APIs.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-6">
      <FormKit
        :id="FORM_ID"
        type="form"
        :actions="false"
      >
        <FormKit
          type="nuxtUIInput"
          name="email"
          label="Email"
          input-type="email"
          validation="required|email"
          outer-class="mb-4"
        />
        <FormKit
          type="nuxtUIInput"
          name="displayName"
          label="Display Name"
          validation="required"
          outer-class="mb-4"
        />
        <FormKitMessages />
      </FormKit>

      <div class="flex gap-2">
        <UButton
          label="Submit"
          icon="i-lucide-save"
          :loading="form.isLoading.value"
          @click="handleSubmit"
        />
        <UButton
          label="Reset"
          icon="i-lucide-rotate-ccw"
          variant="outline"
          @click="form.reset()"
        />
        <UButton
          label="Simulate Server Error"
          icon="i-lucide-alert-triangle"
          color="error"
          variant="outline"
          @click="simulateServerError"
        />
        <UButton
          label="Clear Errors"
          icon="i-lucide-x"
          color="error"
          variant="ghost"
          @click="form.clearErrors()"
        />
      </div>

      <div class="text-sm text-muted-foreground space-x-4">
        <span>isValid: <strong>{{ form.isValid.value }}</strong></span>
        <span>isSubmitted: <strong>{{ form.isSubmitted.value }}</strong></span>
        <span>hasErrors: <strong>{{ form.hasErrors.value }}</strong></span>
        <span>isLoading: <strong>{{ form.isLoading.value }}</strong></span>
      </div>
    </div>
  </UContainer>
</template>
