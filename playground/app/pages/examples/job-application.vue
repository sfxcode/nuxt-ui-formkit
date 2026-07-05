<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

// Test data for job application
const data = ref({
  firstName: 'Marcus',
  lastName: 'Chen',
  email: 'marcus.chen@email.com',
  phone: '+1 (555) 987-6543',
  position: 'senior-frontend',
  location: 'San Francisco, CA',
  willingToRelocate: false,
  startDate: '2026-07-01',
  expectedSalary: '145000',
  currentEmployer: 'WebTech Solutions',
  linkedIn: 'https://linkedin.com/in/marcuschen',
  portfolio: 'https://marcuschen.dev',
  github: 'https://github.com/marcuschen',
  workExperience: [
    {
      title: 'Senior Frontend Developer',
      company: 'WebTech Solutions',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Lead frontend development for enterprise SaaS platform',
    },
    {
      title: 'Frontend Developer',
      company: 'StartupCo',
      startDate: '2020-06',
      endDate: '2023-01',
      current: false,
      description: 'Built responsive web applications using Vue.js and TypeScript',
    },
  ],
  education: 'bachelors',
  university: 'UC Berkeley',
  graduationYear: '2020',
  skills: ['Vue.js', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
  coverLetter: 'I am excited to apply for the Senior Frontend Developer position at your company. With over 5 years of experience...',
  hearAboutUs: 'linkedin',
  consent: false,
})

const positions: SelectItem[] = [
  { label: 'Senior Frontend Developer', value: 'senior-frontend' },
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Full-Stack Developer', value: 'fullstack' },
  { label: 'Senior Backend Developer', value: 'senior-backend' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'UI/UX Designer', value: 'designer' },
]

const educationLevels: SelectItem[] = [
  { label: 'High School', value: 'highschool' },
  { label: 'Associate Degree', value: 'associate' },
  { label: 'Bachelor\'s Degree', value: 'bachelors' },
  { label: 'Master\'s Degree', value: 'masters' },
  { label: 'PhD', value: 'phd' },
]

const referralSources: SelectItem[] = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Indeed', value: 'indeed' },
  { label: 'Company Website', value: 'website' },
  { label: 'Referral', value: 'referral' },
  { label: 'Other', value: 'other' },
]

const skillsList = [
  'Vue.js',
  'React',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Python',
  'Go',
  'Docker',
  'AWS',
  'Tailwind CSS',
]

function createDefaultWorkExperience(): object {
  return {
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  }
}

const schema = reactive([
  // Header
  addElement('div', [], {
    class: 'bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-2xl p-8 md:p-12 mb-8 text-white shadow-xl',
  }, true, {
    children: [
      addElement('h1', ['Join Our Team'], {
        class: 'text-5xl font-extrabold mb-3',
      }),
      addElement('p', ['We\'re looking for talented individuals to help us build the future'], {
        class: 'text-xl opacity-90 mb-4',
      }),
      addElement('div', [], {
        class: 'flex flex-wrap gap-6 text-sm opacity-80',
      }, true, {
        children: [
          addElement('div', ['📍 Multiple Locations'], { class: 'flex items-center gap-2' }),
          addElement('div', ['💼 Full-time & Remote Options'], { class: 'flex items-center gap-2' }),
          addElement('div', ['🚀 Competitive Benefits'], { class: 'flex items-center gap-2' }),
        ],
      }),
    ],
  }),

  // Personal Information
  addElement('div', ['Personal Information'], {
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

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'email',
        label: 'Email Address',
        validation: 'required|email',
        inputType: 'email',
        leadingIcon: 'i-heroicons-envelope',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'phone',
        label: 'Phone Number',
        validation: 'required',
        inputType: 'tel',
        leadingIcon: 'i-heroicons-phone',
      },
    ],
  }),

  // Position Details
  addElement('div', ['Position Details'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUISelect',
    name: 'position',
    label: 'Which position are you applying for?',
    validation: 'required',
    items: positions,
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-briefcase',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'location',
        label: 'Current Location',
        validation: 'required',
        leadingIcon: 'i-heroicons-map-pin',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'startDate',
        label: 'Available Start Date',
        validation: 'required',
        inputType: 'date',
        leadingIcon: 'i-heroicons-calendar',
      },
    ],
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'willingToRelocate',
        label: 'Willing to relocate',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'expectedSalary',
        label: 'Expected Salary (USD)',
        validation: 'required|number',
        help: 'Annual salary expectation',
        leadingIcon: 'i-heroicons-currency-dollar',
      },
    ],
  }),

  // Work Experience
  addElement('div', ['Work Experience'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIRepeater',
    name: 'workExperience',
    label: 'Employment History',
    help: 'Add your work experience (most recent first)',
    insertButtonLabel: 'Add Another Position',
    insertButtonClass: 'mb-4',
    alwaysDisplayInsertButton: false,
    displayAddButton: true,
    displayDeleteButton: true,
    buttonSize: 'xl',
    listItemClass: 'flex gap-6 justify-between bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-4 space-y-4',
    buttonGroupClass: 'buttonGroupClass flex flex-col justify-center gap-2',
    newItem: createDefaultWorkExperience(),
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'title',
        label: 'Job Title',
        validation: 'required',
        leadingIcon: 'i-heroicons-briefcase',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'company',
        label: 'Company',
        validation: 'required',
        leadingIcon: 'i-heroicons-building-office',
      },
      addElement('div', [], {
        class: 'grid grid-cols-1 md:grid-cols-3 gap-4',
      }, true, {
        children: [
          {
            $formkit: 'nuxtUIInput',
            name: 'startDate',
            label: 'Start Date',
            validation: 'required',
            inputType: 'month',
            placeholder: '2020-01',
          },
          {
            $formkit: 'nuxtUIInput',
            name: 'endDate',
            label: 'End Date',
            if: '$node.value.current !== true',
            inputType: 'month',
            placeholder: '2023-12',
          },
          {
            $formkit: 'nuxtUICheckbox',
            name: 'current',
            label: 'Currently working here',
            outerClass: 'pt-6',
          },
        ],
      }),
      {
        $formkit: 'nuxtUITextarea',
        name: 'description',
        label: 'Description',
        help: 'Brief description of your responsibilities and achievements',
        rows: 3,
      },
    ],
  },

  // Education
  addElement('div', ['Education'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUISelect',
        name: 'education',
        label: 'Highest Education Level',
        validation: 'required',
        items: educationLevels,
        leadingIcon: 'i-heroicons-academic-cap',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'university',
        label: 'School/University',
        validation: 'required',
        leadingIcon: 'i-heroicons-building-library',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'graduationYear',
        label: 'Graduation Year',
        validation: 'required|number|min:1950|max:2030',
        placeholder: '2020',
        leadingIcon: 'i-heroicons-calendar',
      },
    ],
  }),

  // Skills
  addElement('div', ['Skills & Expertise'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUICheckboxGroup',
    name: 'skills',
    label: 'Technical Skills',
    help: 'Select all skills you are proficient in',
    options: skillsList,
    validation: 'required|min:3',
    outerClass: 'mb-6',
    orientation: 'horizontal',
  },

  // Links
  addElement('div', ['Online Presence'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'linkedIn',
        label: 'LinkedIn Profile',
        validation: 'url',
        placeholder: 'https://linkedin.com/in/yourprofile',
        leadingIcon: 'i-heroicons-link',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'portfolio',
        label: 'Portfolio Website',
        validation: 'url',
        placeholder: 'https://yourportfolio.com',
        leadingIcon: 'i-heroicons-globe-alt',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'github',
        label: 'GitHub Profile',
        validation: 'url',
        placeholder: 'https://github.com/yourusername',
        leadingIcon: 'i-heroicons-code-bracket',
      },
    ],
  }),

  // Cover Letter
  addElement('div', ['Cover Letter'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUITextarea',
    name: 'coverLetter',
    label: 'Why do you want to work with us?',
    help: 'Tell us about your interest in this position and why you\'d be a great fit',
    validation: 'required|length:100,2000',
    rows: 8,
    outerClass: 'mb-6',
  },

  // Additional
  {
    $formkit: 'nuxtUISelect',
    name: 'hearAboutUs',
    label: 'How did you hear about this position?',
    validation: 'required',
    items: referralSources,
    outerClass: 'mb-6',
    leadingIcon: 'i-heroicons-megaphone',
  },

  // Consent
  addElement('div', [], {
    class: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-5 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'consent',
        label: 'I consent to the processing of my personal data for recruitment purposes',
        validation: 'accepted',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Job application submitted:', formData)
  await new Promise(resolve => setTimeout(resolve, 1500))
}
</script>

<template>
  <UContainer>
    <div class="max-w-5xl mx-auto py-8">
      <FUDataEdit
        :data="data"
        :schema="schema"
        :debug-data="true"
        @data-saved="submitHandler"
      >
        <template #submit>
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t-2 border-gray-200 dark:border-gray-700">
            <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p class="flex items-center gap-2">
                <UIcon name="i-heroicons-shield-check" />
                <span>Your application is confidential</span>
              </p>
              <p class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" />
                <span>We typically respond within 5 business days</span>
              </p>
            </div>
            <div class="flex gap-3">
              <UButton
                label="Save Progress"
                color="neutral"
                variant="outline"
                icon="i-heroicons-bookmark"
              />
              <UButton
                type="submit"
                label="Submit Application"
                icon="i-heroicons-paper-airplane"
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
