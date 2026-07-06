<script setup lang="ts">
const data = ref()

onMounted(() => {
  data.value = {
    wizard: {},
  }
})

async function submitHandler() {
  console.log('Registration Submitted:', data.value)
}

const schema = [
  {
    $formkit: 'nuxtUIMultiStep',
    name: 'wizard',
    allowIncomplete: false,
    children: [
      {
        $formkit: 'nuxtUIStep',
        name: 'account',
        label: 'Account',
        children: [
          {
            $formkit: 'nuxtUIInput',
            name: 'email',
            label: 'Email',
            inputType: 'email',
            validation: 'required|email',
            outerClass: 'mb-4',
          },
          {
            $formkit: 'nuxtUIInput',
            name: 'password',
            label: 'Password',
            inputType: 'password',
            validation: 'required|length:8',
            outerClass: 'mb-4',
          },
        ],
      },
      {
        $formkit: 'nuxtUIStep',
        name: 'profile',
        label: 'Profile',
        children: [
          {
            $formkit: 'nuxtUIInput',
            name: 'displayName',
            label: 'Display Name',
            validation: 'required',
            outerClass: 'mb-4',
          },
        ],
      },
      {
        $formkit: 'nuxtUIStep',
        name: 'confirm',
        label: 'Confirm',
        children: [
          {
            $formkit: 'nuxtUICheckbox',
            name: 'acceptedTerms',
            label: 'I accept the terms and conditions',
            validation: 'required|accepted',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Multi-Step Form
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        `nuxtUIMultiStep`/`nuxtUIStep` wrap `@formkit/addons`' `createMultiStepPlugin` with a Nuxt UI `UTabs` tab strip.
      </p>
      <p class="text-muted-foreground">
        <code>allowIncomplete: false</code> blocks advancing to the next step until the current step's fields validate.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Account Registration Wizard
        </h2>
        <FUDataEdit
          v-if="data"
          :data="data"
          :schema="schema"
          debug-data
          @data-saved="submitHandler"
        />
      </section>
    </div>
  </UContainer>
</template>
