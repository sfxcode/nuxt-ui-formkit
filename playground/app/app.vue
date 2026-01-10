<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Input Components',
    icon: 'i-lucide-box',
    active: true,
    children: [
      {
        label: 'Input',
        icon: 'i-lucide-file-text',
        description: 'Input component with various types and validations.',
        to: '/components/input/input',
      },
      {
        label: 'Teatarea',
        icon: 'i-lucide-file-text',
        description: 'Textarea component with various types and validations.',
        to: '/components/input/textarea',
      },
    ],
  },
  {
    label: 'Output Components',
    icon: 'i-lucide-box',
    active: false,
  },
  {
    label: 'Form Components',
    icon: 'i-lucide-box',
    active: false,
  },
  {
    label: 'Composables',
    icon: 'i-lucide-box',
    active: false,
  },
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <h1 class="text-xl">FormKit Nuxt UI</h1>
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="items"
        class="w-full justify-center"
      />

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/sfxcode/formkit-nuxt-ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage class="p-6" />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/sfxcode/formkit-nuxt-ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
