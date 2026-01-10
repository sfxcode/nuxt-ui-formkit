<script setup>
const schema
  = [
    {
      $formkit: 'nuxtUITextarea',
      id: 'basic',
      name: 'name1',
      placeholder: 'Basic',
      label: 'Basic',
      help: 'Required.',
      validation: 'required',
    },
    {
      $formkit: 'nuxtUITextarea',
      name: 'name2',
      label: '5 Rows',
      rows: 5,
      autoResize: true,
    },
    {
      $formkit: 'nuxtUITextarea',
      name: 'name3',
      placeholder: 'Styled',
      style: { background: 'gray' },
      class: 'customClass',
    },
    {
      $formkit: 'nuxtUITextarea',
      name: 'name4',
      placeholder: 'Read Only',
      readonly: true,
    },

  ]

const data = { test: 'sdfsd' }
</script>

<template>
  <div>
    <UPage>
      <h1 class="text-3xl font-bold mb-4">
        Welcome to the FormKit Nuxt UI Playground!
      </h1>
      <p class="mb-2">
        This playground allows you to experiment with FormKit components integrated with Nuxt UI.
      </p>
      <p class="mb-2">
        Use the components below to build and test your forms in a Nuxt.js environment.
      </p>
      <p>
        Happy coding!
      </p>
      <div>
        <FUDataView
          :data="{}"
          :schema="schema"
          debug-data
        />
      </div>
    </UPage>
  </div>
</template>
