<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { addElement } = useFormKitSchema()

const options = [
  { label: 'Every page load', value: 'refresh' },
  { label: 'Every hour', value: 'hourly' },
  { label: 'Every day', value: 'daily' },
]

const schema = reactive(
  [
    addElement('h2', ['Register ', '$email']),
    addElement('h3', 'Header Text H3'),
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
      rows: '3',
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
      prefix: 'Are you a european citizen?',
    },
    {
      $formkit: 'nuxtUISelect',
      if: '$get(eu).value', // 👀 Oooo, conditionals!
      name: 'cookie_notice',
      label: 'Cookie notice frequency',
      optionLabel: 'label',
      optionValue: 'value',
      options,
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
      <h1>Welcome to Your Vue.js App</h1>
      <p>This is the main page of your Vue.js application.</p>
      <FUDataEdit
        :data="data"
        :schema="schema"
        debug-data
      />
    </UContainer>
  </div>
</template>
