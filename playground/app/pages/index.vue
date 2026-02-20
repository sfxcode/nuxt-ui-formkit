<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

const items: SelectItem[] = [
  { label: 'Every page load', value: 'refresh' },
  { label: 'Every hour', value: 'hourly' },
  { label: 'Every day', value: 'daily' },
]

const schema = reactive(
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

const data = ref({ email: 'tom@sfxcode.com', eu_citizen: false })
</script>

<template>
  <div>
    <UContainer>
      <FUDataEdit
        :data="data"
        :schema="schema"
        debug-data
        @data-saved="console.log('Data saved:', $event)"
      />
    </UContainer>
  </div>
</template>
