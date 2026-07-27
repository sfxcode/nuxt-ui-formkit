<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

// Test data for contact form
const data = ref({
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  subject: 'technical',
  priority: 'normal',
  message: 'I have a question about your enterprise plan features.',
  subscribe: true,
})

const subjectOptions: SelectItem[] = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Technical Support', value: 'technical' },
  { label: 'Billing Question', value: 'billing' },
  { label: 'Feature Request', value: 'feature' },
  { label: 'Partnership', value: 'partnership' },
]

const priorityOptions: SelectItem[] = [
  { label: 'Low', value: 'low' },
  { label: 'Normal', value: 'normal' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
]

const schema = reactive([
  addElement('div',
    [
      addElement('h2', ['Contact Support'], {
        class: 'text-3xl font-bold text-gray-900 dark:text-white mb-2',
      }),
      addElement('p', ['We\'re here to help! Fill out the form below and our team will get back to you within 24 hours.'], {
      }),
    ],
    { class: 'mb-8' },
  ),

  // Personal Information Section
  addElement('div', ['Personal Information'], {
    class: 'text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700',
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    help: 'How should we address you?',
    validation: 'required|length:2,50',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-user',
  },

  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email Address',
    placeholder: 'you@company.com',
    help: 'We\'ll never share your email with anyone else.',
    validation: 'required|email',
    outerClass: 'mb-6',
    leadingIcon: 'i-heroicons-envelope',
  },

  // Support Details Section
  addElement('div', ['Support Details'], {
    class: 'text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUISelect',
        name: 'subject',
        label: 'Subject',
        placeholder: 'Select a subject',
        validation: 'required',
        items: subjectOptions,
        leadingIcon: 'i-heroicons-tag',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'priority',
        label: 'Priority',
        placeholder: 'Select priority level',
        validation: 'required',
        items: priorityOptions,
        leadingIcon: 'i-heroicons-flag',
      },
    ],
  }),

  {
    $formkit: 'nuxtUITextarea',
    name: 'message',
    label: 'Message',
    placeholder: 'Please describe your inquiry in detail...',
    help: 'Provide as much detail as possible to help us assist you better.',
    validation: 'required|length:20,1000',
    rows: 6,
    outerClass: 'mb-4',
  },

  // Additional Options
  addElement('div', [], {
    class: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'subscribe',
        label: 'Subscribe to newsletter for product updates and tips',
      },
    ],
  }),

  // Conditional field based on high priority
  {
    $formkit: 'nuxtUIInput',
    if: '$get(priority).value === "urgent"',
    name: 'phone',
    label: 'Phone Number (for urgent matters)',
    placeholder: '+1 (555) 000-0000',
    help: 'We\'ll call you within 2 hours for urgent requests.',
    validation: 'required|length:10,20',
    inputType: 'tel',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-phone',
  },
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Contact form submitted:', formData)
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <UContainer>
    <div class="max-w-3xl mx-auto py-8">
      <FUDataEdit
        :data="data"
        :schema="schema"
        :debug-data="true"
        form-class="space-y-4"
        @data-saved="submitHandler"
      >
        <template #submit>
          <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <UIcon
                name="i-heroicons-information-circle"
                class="inline-block"
              />
              All fields marked with * are required
            </p>
            <UButton
              type="submit"
              label="Send Message"
              icon="i-heroicons-paper-airplane"
              size="lg"
              color="primary"
            />
          </div>
        </template>
      </FUDataEdit>
    </div>
  </UContainer>
</template>
