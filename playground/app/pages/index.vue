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
    addElement('h3', ['Register ', '$email'], { class: 'text-lg font-medium' }),
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

// Output components schema for FUDataView
const outputSchema = reactive([
  {
    $formkit: 'nuxtUIOutputText',
    name: 'username',
    label: 'Username',
    leadingIcon: 'i-heroicons-user',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'email',
    label: 'Email Address',
    outputType: 'email',
    leadingIcon: 'i-heroicons-envelope',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'website',
    label: 'Website',
    outputType: 'url',
    leadingIcon: 'i-heroicons-globe-alt',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'phone',
    label: 'Phone',
    outputType: 'tel',
    leadingIcon: 'i-heroicons-phone',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'brandColor',
    label: 'Brand Color',
    outputType: 'color',
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isActive',
    label: 'Active Status',
    trueIcon: 'i-heroicons-check-circle',
    falseIcon: 'i-heroicons-x-circle',
    trueValue: 'Active',
    falseValue: 'Inactive',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'createdAt',
    label: 'Created Date',
    dateStyle: 'medium',
    leadingIcon: 'i-heroicons-calendar',
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'lastLogin',
    label: 'Last Login',
    relative: true,
    leadingIcon: 'i-heroicons-clock',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'revenue',
    label: 'Revenue',
    formatOptions: {
      style: 'currency',
      currency: 'USD',
    },
    leadingIcon: 'i-heroicons-currency-dollar',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'completion',
    label: 'Completion',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 1,
    },
    leadingIcon: 'i-heroicons-chart-bar',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'tags',
    label: 'Tags',
    listType: 'badge',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'skills',
    label: 'Skills',
    separator: ' • ',
    leadingIcon: 'i-heroicons-sparkles',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'portfolio',
    label: 'Portfolio',
    leadingIcon: 'i-heroicons-link',
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'bio',
    label: 'Biography',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIOutputProgress',
    name: 'storageUsed',
    label: 'Storage Used',
    status: true,
    color: 'info',
    leadingIcon: 'i-heroicons-server',
  },
  {
    $formkit: 'nuxtUIOutputRating',
    name: 'rating',
    label: 'Rating',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'profile',
    label: 'Profile',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'subscriptionTier',
    label: 'Plan',
    color: 'primary',
    variant: 'subtle',
  },
])

const outputData = ref({
  username: 'John Doe',
  email: 'john.doe@example.com',
  website: 'https://johndoe.dev',
  phone: '+1 (555) 123-4567',
  brandColor: '#3b82f6',
  isActive: true,
  createdAt: '2024-01-15T10:30:00Z',
  lastLogin: '2024-02-20T14:45:00Z',
  revenue: 125750.50,
  completion: 0.875,
  tags: ['Vue.js', 'TypeScript', 'Nuxt'],
  skills: ['Frontend Development', 'UI/UX Design', 'API Integration'],
  portfolio: 'https://portfolio.johndoe.dev',
  bio: 'Passionate full-stack developer with 5+ years of experience building modern web applications.',
  storageUsed: 72,
  rating: 4,
  profile: {
    name: 'John Doe',
    description: 'Full-stack Developer',
    avatar: { text: 'JD' },
  },
  subscriptionTier: 'Premium',
})
</script>

<template>
  <div>
    <UPageHero
      title="Nuxt UI forms, driven by FormKit"
      description="Describe a form as a schema and get validated, accessible Nuxt UI inputs: a full set of input and output components, repeaters, multi-step wizards, autosave and overlay forms."
      :links="[
        { label: 'Browse live samples', to: '/samples', icon: 'i-lucide-sparkles', size: 'xl' },
        { label: 'Open the form builder', to: '/form-builder', icon: 'i-lucide-layout-template', size: 'xl', color: 'neutral', variant: 'subtle' },
        { label: 'GitHub', to: 'https://github.com/sfxcode/nuxt-ui-formkit', target: '_blank', icon: 'i-simple-icons-github', size: 'xl', color: 'neutral', variant: 'ghost' },
      ]"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    />

    <UContainer class="pb-12">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Form Edit Section -->
        <UCard class="lg:col-span-1">
          <template #header>
            <h2 class="text-lg font-semibold">
              Edit with FUDataEdit
            </h2>
            <p class="text-sm text-muted">
              Inputs rendered from a schema, with validation.
            </p>
          </template>
          <FUDataEdit
            :data="data"
            :schema="schema"
            @data-saved="console.log('Data saved:', $event)"
          />
        </UCard>

        <!-- Output Display Section -->
        <UCard class="lg:col-span-2">
          <template #header>
            <h2 class="text-lg font-semibold">
              Show with FUDataView
            </h2>
            <p class="text-sm text-muted">
              The same data as read-only output components.
            </p>
          </template>
          <FUDataView
            :data="outputData"
            :schema="outputSchema"
            form-class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
          />
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
