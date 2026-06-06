<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

const items: SelectItem[] = [
  { label: 'Every page load', value: 'refresh' },
  { label: 'Every hour', value: 'hourly' },
  { label: 'Every day', value: 'daily' },
]

const schema = ref(
  [
    addElement('h2', ['Register ', '$email'], { class: 'text-2xl' }),
    addElement('h3', 'Header Text H3', { class: 'text-xl' }),
    {
      $formkit: 'nuxtUIInput',
      name: 'email',
      label: 'Email',
      help: 'This will be used for your account.',
      validation: 'required|email',
      outerClass: 'col-6',
    },
    {
      $formkit: 'nuxtUITextarea',
      name: 'myText',
      label: 'Text',
      validation: '',
      rows: 3,
    },
    {
      $formkit: 'nuxtUIInput',
      name: 'password',
      label: 'Password',
      help: 'Enter your new password.',
      validation: 'required|length:5,16',
      inputType: 'password',
      feedback: true,
      outerClass: 'col-6',
    },
    {
      $formkit: 'nuxtUIInput',
      name: 'password_confirm',
      label: 'Confirm password',
      help: 'Enter your new password again.',
      validation: 'required|confirm',
      inputType: 'password',
      validationLabel: 'password confirmation',
      outerClass: 'col-6',
    },
    {
      $formkit: 'nuxtUICheckbox',
      name: 'eu_citizen',
      id: 'eu',
      label: 'Are you a european citizen?',
    },
    {
      $formkit: 'nuxtUISelect',
      if: '$get(eu).value', // 👀 Oooo, conditionals!
      name: 'cookie_notice',
      label: 'Cookie notice frequency',
      optionLabel: 'label',
      optionValue: 'value',
      items,
      class: 'w-48',
      help: 'How often should we display a cookie notice?',
      outerClass: 'col-6',
    },
  ],
)

const data = ref({ email: 'john.doe@example.com', eu_citizen: false })

// Format JSON with proper indentation for better readability
const schemaAsText = ref(JSON.stringify(schema.value, null, 2))

// Watch schema changes and update formatted text
watch(schema, (newSchema) => {
  const newText = JSON.stringify(newSchema, null, 2)
  if (schemaAsText.value !== newText) {
    schemaAsText.value = newText
  }
}, { deep: true })

// Handle JSON editor updates - parse if string (text mode), otherwise use as-is (tree mode)
function updateSchema(value: string) {
  try {
    const parsed = JSON.parse(value)
    schema.value = parsed
  }
  catch (e) {
    // If JSON parsing fails, keep the current value
    console.error('Failed to parse schema JSON:', e)
  }
}
</script>

<template>
  <div>
    <UContainer>
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Form Edit Section -->
        <section class="lg:w-1/3">
          <h1 class="text-2xl font-bold mb-4">
            Form Edit Example
          </h1>
          <p class="text-muted-foreground mb-6">
            Displaying various input component types with FUDataEdit
          </p>
          <FUDataEdit
            :data="data"
            :schema="schema"
            @data-saved="console.log('Data saved:', $event)"
          />
        </section>

        <div class="hidden lg:block w-px bg-gray-200 dark:bg-gray-800" />

        <!-- Output Display Section -->
        <section class="lg:w-2/3 lg:flex-1">
          <h1 class="text-2xl font-bold mb-4">
            Playground
          </h1>
          <p class="text-muted-foreground mb-6">
            Edit the JSON schema below to see real-time changes in the form
          </p>
          <JsonEditor
            v-model="schemaAsText"
            label="Form Schema (JSON)"
            @update:model-value="updateSchema"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
