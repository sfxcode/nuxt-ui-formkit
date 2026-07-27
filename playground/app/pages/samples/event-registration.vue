<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

// Test data for event registration
const data = ref({
  firstName: 'Jennifer',
  lastName: 'Martinez',
  email: 'jennifer.martinez@example.com',
  company: 'TechStartup Inc.',
  jobTitle: 'Senior Product Designer',
  ticketType: 'vip',
  attendanceType: 'in-person',
  dietaryRestrictions: ['vegetarian'],
  tshirtSize: 'M',
  needsAccommodation: true,
  accommodationType: 'wheelchair',
  sessions: ['keynote', 'workshop-1'],
  emergencyContact: 'Michael Martinez',
  emergencyPhone: '+1 (555) 123-4567',
  agreedToTerms: false,
})

const ticketTypes: SelectItem[] = [
  {
    label: 'Early Bird - $299',
    value: 'earlybird',
  },
  {
    label: 'Standard - $399',
    value: 'standard',
  },
  {
    label: 'VIP - $599',
    value: 'vip',
  },
  {
    label: 'Student - $99',
    value: 'student',
  },
]

const attendanceTypes: SelectItem[] = [
  { label: 'In-Person', value: 'in-person' },
  { label: 'Virtual', value: 'virtual' },
]

const tshirtSizes: SelectItem[] = [
  { label: 'Small (S)', value: 'S' },
  { label: 'Medium (M)', value: 'M' },
  { label: 'Large (L)', value: 'L' },
  { label: 'Extra Large (XL)', value: 'XL' },
  { label: '2XL', value: '2XL' },
]

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Nut allergy',
  'Other',
]

const accommodationTypes: SelectItem[] = [
  { label: 'Wheelchair Accessible', value: 'wheelchair' },
  { label: 'Sign Language Interpreter', value: 'interpreter' },
  { label: 'Hearing Assistance', value: 'hearing' },
  { label: 'Other', value: 'other' },
]

const sessionOptions = [
  { label: 'Opening Keynote', value: 'keynote' },
  { label: 'Workshop: Vue 3 Deep Dive', value: 'workshop-1' },
  { label: 'Workshop: TypeScript Best Practices', value: 'workshop-2' },
  { label: 'Panel: Future of Web Development', value: 'panel' },
  { label: 'Networking Session', value: 'networking' },
]

const schema = reactive([
  // Hero Section
  addElement('div',
    [
      addElement('div', [], {
        class: 'bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-xl p-8 mb-8 text-white shadow-lg',
      }, true, {
        children: [
          addElement('h1', ['Tech Summit 2026'], {
            class: 'text-4xl font-bold mb-2',
          }),
          addElement('p', ['June 15-17, 2026 • San Francisco, CA'], {
            class: 'text-xl mb-2 opacity-90',
          }),
          addElement('p', ['Join 5,000+ developers, designers, and tech leaders'], {
            class: 'opacity-80',
          }),
        ],
      }),
    ],
  ),

  // Attendee Information
  addElement('div', ['Attendee Information'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'firstName',
        label: 'First Name',
        validation: 'required|length:2,50',
        leadingIcon: 'i-heroicons-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'lastName',
        label: 'Last Name',
        validation: 'required|length:2,50',
        leadingIcon: 'i-heroicons-user',
      },
    ],
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email Address',
    validation: 'required|email',
    help: 'Your ticket and event details will be sent here',
    inputType: 'email',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-envelope',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'company',
        label: 'Company',
        validation: 'required',
        leadingIcon: 'i-heroicons-building-office',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'jobTitle',
        label: 'Job Title',
        validation: 'required',
        leadingIcon: 'i-heroicons-briefcase',
      },
    ],
  }),

  // Registration Details
  addElement('div', ['Registration Details'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUISelect',
        name: 'ticketType',
        label: 'Ticket Type',
        validation: 'required',
        items: ticketTypes,
        leadingIcon: 'i-heroicons-ticket',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'attendanceType',
        label: 'Attendance Type',
        validation: 'required',
        items: attendanceTypes,
        leadingIcon: 'i-heroicons-map-pin',
      },
    ],
  }),

  // Conditional: In-person only fields
  {
    $formkit: 'nuxtUICheckboxGroup',
    if: '$get(attendanceType).value === "in-person"',
    name: 'dietaryRestrictions',
    label: 'Dietary Restrictions',
    help: 'Select all that apply (for catering)',
    options: dietaryOptions,
    outerClass: 'mb-4',
  },

  {
    $formkit: 'nuxtUISelect',
    if: '$get(attendanceType).value === "in-person"',
    name: 'tshirtSize',
    label: 'T-Shirt Size',
    help: 'Complimentary event t-shirt',
    items: tshirtSizes,
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-shopping-bag',
  },

  // Accessibility
  addElement('div',
    [
      addElement('h3', ['Accessibility'], {
        class: 'text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1',
      }),
      addElement('p', ['We want to ensure everyone has a great experience'], {
        class: 'text-sm text-gray-600 dark:text-gray-400 mb-4',
      }),
    ],
    { class: 'mt-8' },
  ),

  {
    $formkit: 'nuxtUICheckbox',
    name: 'needsAccommodation',
    label: 'I need accessibility accommodations',
    outerClass: 'mb-4',
  },

  {
    $formkit: 'nuxtUISelect',
    if: '$get(needsAccommodation).value === true',
    name: 'accommodationType',
    label: 'Type of Accommodation',
    validation: 'required',
    items: accommodationTypes,
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-hand-raised',
  },

  {
    $formkit: 'nuxtUITextarea',
    if: '$get(needsAccommodation).value === true && $get(accommodationType).value === "other"',
    name: 'accommodationDetails',
    label: 'Please describe your needs',
    validation: 'required|length:10,500',
    rows: 3,
    outerClass: 'mb-6',
  },

  // Session Selection
  addElement('div', ['Session Selection'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'sessions',
    label: 'Which sessions would you like to attend?',
    help: 'Select all sessions you\'re interested in (subject to availability)',
    options: sessionOptions,
    outerClass: 'mb-6',
  },

  // Emergency Contact
  addElement('div', ['Emergency Contact'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'emergencyContact',
        label: 'Emergency Contact Name',
        validation: 'required',
        leadingIcon: 'i-heroicons-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'emergencyPhone',
        label: 'Emergency Contact Phone',
        validation: 'required',
        inputType: 'tel',
        leadingIcon: 'i-heroicons-phone',
      },
    ],
  }),

  // Terms
  addElement('div', [], {
    class: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'agreedToTerms',
        label: 'I agree to the event terms and conditions, code of conduct, and privacy policy',
        validation: 'accepted',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Event registration submitted:', formData)
  await new Promise(resolve => setTimeout(resolve, 1200))
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
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-heroicons-lock-closed" />
              <span>Your information is secure and encrypted</span>
            </div>
            <div class="flex gap-3">
              <UButton
                label="Save Draft"
                color="neutral"
                variant="outline"
              />
              <UButton
                type="submit"
                label="Complete Registration"
                icon="i-heroicons-check-circle"
                size="lg"
                color="primary"
              />
            </div>
          </div>
        </template>
      </FUDataEdit>
    </div>
  </UContainer>
</template>
