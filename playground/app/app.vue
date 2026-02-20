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
        label: 'Checkbox',
        icon: 'i-lucide-check',
        description: 'Checkbox component for single selection.',
        to: '/components/input/checkbox',
      },
      {
        label: 'CheckboxGroup',
        icon: 'i-lucide-check-square',
        description: 'Checkbox group for multiple selection.',
        to: '/components/input/checkbox-group',
      },
      {
        label: 'ColorPicker',
        icon: 'i-lucide-palette',
        description: 'Color picker for selecting colors in multiple formats.',
        to: '/components/input/color-picker',
      },
      {
        label: 'InputDate',
        icon: 'i-lucide-calendar',
        description: 'Date and time picker component with ranges and granularity.',
        to: '/components/input/input-date',
      },
      {
        label: 'InputMenu',
        icon: 'i-lucide-menu',
        description: 'Dropdown menu input with rich content support.',
        to: '/components/input/input-menu',
      },
      {
        label: 'InputTags',
        icon: 'i-lucide-tags',
        description: 'Tag input component with validation and customization.',
        to: '/components/input/input-tags',
      },
      {
        label: 'InputTime',
        icon: 'i-lucide-clock',
        description: 'Time input with 12/24-hour format support.',
        to: '/components/input/input-time',
      },
      {
        label: 'PinInput',
        icon: 'i-lucide-lock',
        description: 'PIN/OTP input component for secure code entry.',
        to: '/components/input/pin-input',
      },
      {
        label: 'RadioGroup',
        icon: 'i-lucide-circle-dot',
        description: 'Radio button group for single selection from multiple options.',
        to: '/components/input/radio-group',
      },
      {
        label: 'Select',
        icon: 'i-lucide-chevron-down',
        description: 'Select component with searchable and creatable options.',
        to: '/components/input/select',
      },
      {
        label: 'SelectMenu',
        icon: 'i-lucide-list',
        description: 'Advanced select menu with grouping support.',
        to: '/components/input/select-menu',
      },
      {
        label: 'Slider',
        icon: 'i-lucide-sliders-horizontal',
        description: 'Range slider for numeric value selection.',
        to: '/components/input/slider',
      },
      {
        label: 'Switch',
        icon: 'i-lucide-toggle-right',
        description: 'Toggle switch for boolean on/off states.',
        to: '/components/input/switch',
      },
      {
        label: 'Textarea',
        icon: 'i-lucide-file-text',
        description: 'Textarea component with various types and validations.',
        to: '/components/input/textarea',
      },
      {
        label: 'Select',
        icon: 'i-lucide-list',
        description: 'Select component with single and multiple selection.',
        to: '/components/input/select',
      },
    ],
  },
  {
    label: 'Output Components',
    icon: 'i-lucide-box',
    active: false,
    children: [
      {
        label: 'OutputText',
        icon: 'i-lucide-file-text',
        description: 'Read-only text display with icons and styling.',
        to: '/components/output/text',
      },
      {
        label: 'OutputBoolean',
        icon: 'i-lucide-toggle-left',
        description: 'Boolean display with custom true/false values and icons.',
        to: '/components/output/boolean',
      },
      {
        label: 'OutputDate',
        icon: 'i-lucide-calendar',
        description: 'Date display with formatting and relative time support.',
        to: '/components/output/date',
      },
    ],
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
