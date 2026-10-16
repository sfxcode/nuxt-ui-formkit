<script setup lang="ts">
// SSR fixture for `FUDataEdit`'s `autosave` prop: unlike `form/form-autosave` this is NOT
// wrapped in `<ClientOnly>`, so the autosave plugin runs while the page is server-rendered.
// Used by the SSR smoke test (`npm run test:e2e:ssr`, see e2e/).
const data = ref({ name: '', email: '' })

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name' },
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
]
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">
      SSR: autosave
    </h1>
    <FUDataEdit
      id="ssr-autosave-form"
      v-model="data"
      :schema="schema"
      :autosave="{ key: 'ssr-draft', debounce: 100 }"
    />
  </UContainer>
</template>
