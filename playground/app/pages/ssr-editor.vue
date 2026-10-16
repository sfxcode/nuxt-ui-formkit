<script setup lang="ts">
// SSR fixture for the editor with real content, a toolbar and the opt-in menus, outside any
// `<ClientOnly>`. Used by the SSR smoke test (`npm run test:e2e:ssr`, see e2e/).
const schema = [
  { $formkit: 'nuxtUIEditor', name: 'body', label: 'Body', value: '<p>Hello <strong>server</strong> world</p>', help: 'Editor help text' },
  { $formkit: 'nuxtUIEditor', name: 'rich', label: 'Rich', value: '<p>Second editor</p>', dragHandle: true, suggestionMenu: true, mentionItems: [{ label: 'Ada Lovelace', icon: 'i-lucide-user' }] },
]
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">
      SSR: editor
    </h1>
    <FUDataEdit
      id="ssr-editor-form"
      :data="{ body: '<p>Hello <strong>server</strong> world</p>', rich: '<p>Second editor</p>' }"
      :schema="schema"
    />
  </UContainer>
</template>
