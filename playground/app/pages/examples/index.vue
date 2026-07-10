<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const examples = [
  {
    title: 'Contact Form',
    description: 'A comprehensive support contact form with conditional fields based on priority level. Features subject categorization, priority selection, and automatic phone field for urgent requests.',
    icon: 'i-heroicons-envelope',
    route: '/examples/contact-form',
    features: [
      'Subject categorization',
      'Priority-based fields',
      'Newsletter subscription',
      'Form validation',
    ],
  },
  {
    title: 'User Profile',
    description: 'Complete user profile management form with personal information, preferences, and notification settings. Includes timezone, language, and privacy controls.',
    icon: 'i-heroicons-user-circle',
    route: '/examples/user-profile',
    features: [
      'Personal details',
      'Preferences & settings',
      'Notification management',
      'Profile visibility',
    ],
  },
  {
    title: 'Event Registration',
    description: 'Conference registration form with conditional logic for in-person vs virtual attendance. Includes accessibility accommodations, session selection, and dietary preferences.',
    icon: 'i-heroicons-calendar-days',
    route: '/examples/event-registration',
    features: [
      'Conditional attendance fields',
      'Accessibility options',
      'Session selection',
      'Emergency contacts',
    ],
  },
  {
    title: 'Job Application',
    description: 'Comprehensive job application with dynamic work experience repeater, education history, skills selection, and cover letter. Perfect for recruitment workflows.',
    icon: 'i-heroicons-briefcase',
    route: '/examples/job-application',
    features: [
      'Repeater for work history',
      'Skills multi-select',
      'Social profiles',
      'Cover letter',
    ],
  },
  {
    title: 'E-commerce Checkout',
    description: 'Full-featured checkout form with shipping/billing addresses, payment information, and order summary. Includes gift options and same-as-billing toggle.',
    icon: 'i-heroicons-shopping-cart',
    route: '/examples/checkout-form',
    features: [
      'Shipping & billing',
      'Payment processing',
      'Gift options',
      'Order summary sidebar',
    ],
  },
]
</script>

<template>
  <UContainer>
    <div class="py-12">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Real-World Form Examples
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
          Explore production-ready form implementations using FormKit schemas with Nuxt UI components.
          Each example includes test data, validation, conditional logic, and Tailwind CSS styling.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-green-500"
            />
            <span>Full validation</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-green-500"
            />
            <span>Conditional fields</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-green-500"
            />
            <span>Test data included</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="text-green-500"
            />
            <span>Tailwind styled</span>
          </div>
        </div>
      </div>

      <!-- Examples Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <UCard
          v-for="example in examples"
          :key="example.route"
          class="hover:shadow-xl transition-all duration-300 cursor-pointer group"
          @click="navigateTo(example.route)"
        >
          <template #header>
            <div class="flex items-start gap-4">
              <div class="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                <UIcon
                  :name="example.icon"
                  class="w-8 h-8"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ example.title }}
                </h2>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ example.description }}
            </p>

            <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Key Features:
              </p>
              <ul class="space-y-1">
                <li
                  v-for="feature in example.features"
                  :key="feature"
                  class="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2"
                >
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="w-3 h-3 text-gray-400"
                  />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-end">
              <UButton
                color="primary"
                variant="soft"
                trailing-icon="i-heroicons-arrow-right"
                label="View Example"
                @click.stop="() => { navigateTo(example.route) }"
              />
            </div>
          </template>
        </UCard>
      </div>

      <!-- Features Section -->
      <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          What's Included in Each Example
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-4">
              <UIcon
                name="i-heroicons-code-bracket"
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              FormKit Schema
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Complete schema definitions using FormKit's declarative approach with Nuxt UI integration
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 bg-success-100 dark:bg-success-900/50 rounded-lg flex items-center justify-center mb-4">
              <UIcon
                name="i-heroicons-check-badge"
                class="w-6 h-6 text-success-600 dark:text-success-400"
              />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              Real Test Data
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Pre-filled with realistic sample data so you can see how forms behave with actual content
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 bg-warning-100 dark:bg-warning-900/50 rounded-lg flex items-center justify-center mb-4">
              <UIcon
                name="i-heroicons-paint-brush"
                class="w-6 h-6 text-warning-600 dark:text-warning-400"
              />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              Tailwind Styling
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Beautiful, responsive designs using Tailwind utility classes and Nuxt UI components
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 bg-info-100 dark:bg-info-900/50 rounded-lg flex items-center justify-center mb-4">
              <UIcon
                name="i-heroicons-sparkles"
                class="w-6 h-6 text-info-600 dark:text-info-400"
              />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              Advanced Features
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Conditional logic, repeaters, validation rules, and dynamic field rendering
            </p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            All examples are production-ready and can be customized to fit your needs
          </p>
          <div class="flex items-center justify-center gap-4">
            <UButton
              label="Back to Main Demo"
              icon="i-heroicons-arrow-left"
              variant="outline"
              @click="() => { navigateTo('/') }"
            />
            <UButton
              label="View Documentation"
              icon="i-heroicons-book-open"
              trailing-icon="i-heroicons-arrow-top-right-on-square"
              @click="() => { navigateTo('/form/without-schema') }"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
