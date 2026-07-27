<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

// Test data for user profile
const data = ref({
  firstName: 'Alex',
  lastName: 'Thompson',
  email: 'alex.thompson@techcorp.com',
  username: 'alexthompson',
  bio: 'Full-stack developer passionate about creating elegant solutions to complex problems. Coffee enthusiast and open-source contributor.',
  website: 'https://alexthompson.dev',
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',
  language: 'en',
  role: 'developer',
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  emailDigest: 'daily',
  visibility: 'public',
})

const timezones: SelectItem[] = [
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'UTC', value: 'UTC' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Paris (CET)', value: 'Europe/Paris' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
]

const languages: SelectItem[] = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Chinese', value: 'zh' },
]

const roles: SelectItem[] = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Other', value: 'other' },
]

const digestOptions: SelectItem[] = [
  { label: 'Real-time', value: 'realtime' },
  { label: 'Daily Digest', value: 'daily' },
  { label: 'Weekly Digest', value: 'weekly' },
  { label: 'Never', value: 'never' },
]

const visibilityOptions: SelectItem[] = [
  { label: 'Public', value: 'public' },
  { label: 'Friends Only', value: 'friends' },
  { label: 'Private', value: 'private' },
]

const schema = reactive([
  // Header
  addElement('div',
    [
      addElement('h1', ['Edit Profile'], {
        class: 'text-4xl font-bold text-gray-900 dark:text-white mb-2',
      }),
      addElement('p', ['Manage your account settings and preferences'], {
        class: 'text-gray-600 dark:text-gray-400 mb-8',
      }),
    ],
  ),

  // Basic Information
  addElement('div',
    [
      addElement('h2', ['Basic Information'], {
        class: 'text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1',
      }),
      addElement('p', ['Your personal details and public profile'], {
        class: 'text-sm text-gray-600 dark:text-gray-400 mb-4',
      }),
    ],
    { class: 'mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700' },
  ),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'firstName',
        label: 'First Name',
        validation: 'required|length:2,30',
        leadingIcon: 'i-heroicons-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'lastName',
        label: 'Last Name',
        validation: 'required|length:2,30',
        leadingIcon: 'i-heroicons-user',
      },
    ],
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'username',
        label: 'Username',
        validation: 'required|length:3,20|matches:/^[a-z0-9_]+$/',
        help: 'Only lowercase letters, numbers, and underscores',
        leadingIcon: 'i-heroicons-at-symbol',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'email',
        label: 'Email',
        validation: 'required|email',
        inputType: 'email',
        leadingIcon: 'i-heroicons-envelope',
      },
    ],
  }),

  {
    $formkit: 'nuxtUITextarea',
    name: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    help: 'Brief description for your profile. Maximum 200 characters.',
    validation: 'length:0,200',
    rows: 4,
    outerClass: 'mb-4',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'website',
        label: 'Website',
        placeholder: 'https://yourwebsite.com',
        validation: 'url',
        leadingIcon: 'i-heroicons-globe-alt',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'location',
        label: 'Location',
        placeholder: 'City, Country',
        leadingIcon: 'i-heroicons-map-pin',
      },
    ],
  }),

  // Preferences
  addElement('div',
    [
      addElement('h2', ['Preferences'], {
        class: 'text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1',
      }),
      addElement('p', ['Customize your experience'], {
        class: 'text-sm text-gray-600 dark:text-gray-400 mb-4',
      }),
    ],
    { class: 'mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700 mt-8' },
  ),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUISelect',
        name: 'timezone',
        label: 'Timezone',
        validation: 'required',
        items: timezones,
        leadingIcon: 'i-heroicons-clock',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'language',
        label: 'Language',
        validation: 'required',
        items: languages,
        leadingIcon: 'i-heroicons-language',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'role',
        label: 'Role',
        validation: 'required',
        items: roles,
        leadingIcon: 'i-heroicons-briefcase',
      },
    ],
  }),

  // Notifications
  addElement('div',
    [
      addElement('h2', ['Notifications'], {
        class: 'text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1',
      }),
      addElement('p', ['Manage how you receive updates'], {
        class: 'text-sm text-gray-600 dark:text-gray-400 mb-4',
      }),
    ],
    { class: 'mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700 mt-8' },
  ),

  addElement('div', [], {
    class: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-4',
  }, true, {
    children: [
      addElement('p', ['Choose how you want to receive notifications'], {
        class: 'text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium',
      }),
      {
        $formkit: 'nuxtUICheckbox',
        name: 'notifications.email',
        label: 'Email notifications',
      },
      {
        $formkit: 'nuxtUICheckbox',
        name: 'notifications.push',
        label: 'Push notifications',
      },
      {
        $formkit: 'nuxtUICheckbox',
        name: 'notifications.sms',
        label: 'SMS notifications',
      },
    ],
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUISelect',
        name: 'emailDigest',
        label: 'Email Digest Frequency',
        items: digestOptions,
        leadingIcon: 'i-heroicons-inbox',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'visibility',
        label: 'Profile Visibility',
        items: visibilityOptions,
        leadingIcon: 'i-heroicons-eye',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Profile updated:', formData)
  await new Promise(resolve => setTimeout(resolve, 800))
}
</script>

<template>
  <UContainer>
    <div class="max-w-4xl mx-auto py-8">
      <FUDataEdit
        :data="data"
        :schema="schema"
        :debug-data="true"
        @data-saved="submitHandler"
      >
        <template #submit>
          <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
            />
            <UButton
              type="submit"
              label="Save Changes"
              icon="i-heroicons-check"
              size="lg"
              color="primary"
            />
          </div>
        </template>
      </FUDataEdit>
    </div>
  </UContainer>
</template>
