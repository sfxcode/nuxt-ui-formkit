<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

// Test data for checkout form
const data = ref({
  // Customer Info
  email: 'customer@example.com',
  firstName: 'Emily',
  lastName: 'Rodriguez',
  phone: '+1 (555) 234-5678',

  // Shipping Address
  shippingAddress: '123 Main Street',
  shippingApt: 'Apt 4B',
  shippingCity: 'Los Angeles',
  shippingState: 'CA',
  shippingZip: '90001',
  shippingCountry: 'US',

  // Billing
  sameAsBilling: false,
  billingAddress: '456 Oak Avenue',
  billingApt: '',
  billingCity: 'Los Angeles',
  billingState: 'CA',
  billingZip: '90002',
  billingCountry: 'US',

  // Payment
  cardName: 'Emily Rodriguez',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  saveCard: false,

  // Shipping Options
  shippingMethod: 'standard',

  // Additional
  giftMessage: '',
  isGift: false,
  marketingConsent: true,
})

const countries: SelectItem[] = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Japan', value: 'JP' },
  { label: 'Singapore', value: 'SG' },
]

const states: SelectItem[] = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Washington', value: 'WA' },
]

const shippingMethods = [
  {
    label: 'Standard Shipping (5-7 business days)',
    value: 'standard',
    price: 'Free',
  },
  {
    label: 'Express Shipping (2-3 business days)',
    value: 'express',
    price: '$12.99',
  },
  {
    label: 'Overnight Shipping (1 business day)',
    value: 'overnight',
    price: '$24.99',
  },
]

// Mock cart data
const cartSummary = {
  subtotal: 159.97,
  shipping: 0,
  tax: 14.40,
  total: 174.37,
  items: [
    { name: 'Premium Headphones', quantity: 1, price: 89.99 },
    { name: 'USB-C Cable', quantity: 2, price: 19.99 },
    { name: 'Phone Case', quantity: 1, price: 29.99 },
  ],
}

const schema = reactive([
  // Header with Cart Summary
  addElement('div', [], {
    class: 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-xl p-6 md:p-8 mb-8 text-white shadow-lg',
  }, true, {
    children: [
      addElement('div', [], {
        class: 'flex justify-between items-center mb-4',
      }, true, {
        children: [
          addElement('h1', ['Checkout'], {
            class: 'text-4xl font-bold',
          }),
          addElement('div', [], {
            class: 'text-right',
          }, true, {
            children: [
              addElement('div', ['Order Total'], {
                class: 'text-sm opacity-80',
              }),
              addElement('div', [' $174.37'], {
                class: 'text-3xl font-bold',
              }),
            ],
          }),
        ],
      }),
      addElement('p', ['3 items in your cart • Secure checkout'], {
        class: 'opacity-90',
      }),
    ],
  }),

  // Contact Information
  addElement('div', ['Contact Information'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500',
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email',
    help: 'Order confirmation will be sent here',
    validation: 'required|email',
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
        name: 'firstName',
        label: 'First Name',
        validation: 'required',
        leadingIcon: 'i-heroicons-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'lastName',
        label: 'Last Name',
        validation: 'required',
        leadingIcon: 'i-heroicons-user',
      },
    ],
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'phone',
    label: 'Phone Number',
    help: 'For delivery updates',
    validation: 'required',
    inputType: 'tel',
    outerClass: 'mb-6',
    leadingIcon: 'i-heroicons-phone',
  },

  // Shipping Address
  addElement('div', ['Shipping Address'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'shippingAddress',
    label: 'Street Address',
    validation: 'required',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-home',
  },

  {
    $formkit: 'nuxtUIInput',
    name: 'shippingApt',
    label: 'Apartment, suite, etc. (optional)',
    outerClass: 'mb-4',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'shippingCity',
        label: 'City',
        validation: 'required',
        leadingIcon: 'i-heroicons-building-office-2',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'shippingState',
        label: 'State',
        validation: 'required',
        items: states,
      },
    ],
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'shippingZip',
        label: 'ZIP Code',
        validation: 'required|matches:/^[0-9]{5}$/',
        placeholder: '12345',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'shippingCountry',
        label: 'Country',
        validation: 'required',
        items: countries,
        leadingIcon: 'i-heroicons-globe-alt',
      },
    ],
  }),

  // Shipping Method
  addElement('div', ['Shipping Method'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'shippingMethod',
    label: 'Select shipping method',
    validation: 'required',
    options: shippingMethods.map(method => ({
      label: `${method.label} - ${method.price}`,
      value: method.value,
    })),
    outerClass: 'mb-6',
  },

  // Billing Address
  addElement('div', ['Billing Address'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUICheckbox',
    name: 'sameAsBilling',
    label: 'Same as shipping address',
    outerClass: 'mb-4',
  },

  // Conditional billing fields
  {
    $formkit: 'nuxtUIInput',
    if: '$get(sameAsBilling).value !== true',
    name: 'billingAddress',
    label: 'Billing Street Address',
    validation: 'required',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-home',
  },

  {
    $formkit: 'nuxtUIInput',
    if: '$get(sameAsBilling).value !== true',
    name: 'billingApt',
    label: 'Apartment, suite, etc. (optional)',
    outerClass: 'mb-4',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, '$get(sameAsBilling).value !== true', {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'billingCity',
        label: 'City',
        validation: 'required',
        leadingIcon: 'i-heroicons-building-office-2',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'billingState',
        label: 'State',
        validation: 'required',
        items: states,
      },
    ],
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, '$get(sameAsBilling).value !== true', {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'billingZip',
        label: 'ZIP Code',
        validation: 'required|matches:/^[0-9]{5}$/',
        placeholder: '12345',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'billingCountry',
        label: 'Country',
        validation: 'required',
        items: countries,
        leadingIcon: 'i-heroicons-globe-alt',
      },
    ],
  }),

  // Payment Information
  addElement('div', ['Payment Information'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4 flex items-start gap-3',
  }, true, {
    children: [
      addElement('span', ['🔒'], { class: 'text-2xl' }),
      addElement('div', ['Your payment information is encrypted and secure. We use industry-standard SSL encryption.'], {
        class: 'text-sm text-yellow-800 dark:text-yellow-200',
      }),
    ],
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'cardName',
    label: 'Cardholder Name',
    help: 'Full name as displayed on card',
    validation: 'required',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-user',
  },

  {
    $formkit: 'nuxtUIInput',
    name: 'cardNumber',
    label: 'Card Number',
    validation: 'required|matches:/^[0-9]{16}$/',
    placeholder: '1234 5678 9012 3456',
    outerClass: 'mb-4',
    leadingIcon: 'i-heroicons-credit-card',
  },

  addElement('div', [], {
    class: 'grid grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'expiryDate',
        label: 'Expiry Date',
        validation: 'required|matches:/^(0[1-9]|1[0-2])\\/[0-9]{2}$/',
        placeholder: 'MM/YY',
        leadingIcon: 'i-heroicons-calendar',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'cvv',
        label: 'CVV',
        validation: 'required|matches:/^[0-9]{3,4}$/',
        placeholder: '123',
        help: '3 or 4 digits',
        inputType: 'password',
        leadingIcon: 'i-heroicons-lock-closed',
      },
    ],
  }),

  {
    $formkit: 'nuxtUICheckbox',
    name: 'saveCard',
    label: 'Save this card for future purchases',
    outerClass: 'mb-6',
  },

  // Gift Options
  addElement('div', ['Gift Options'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUICheckbox',
    name: 'isGift',
    label: 'This is a gift',
    outerClass: 'mb-4',
  },

  {
    $formkit: 'nuxtUITextarea',
    if: '$get(isGift).value === true',
    name: 'giftMessage',
    label: 'Gift Message',
    placeholder: 'Add a personal message (optional)',
    help: 'This will be included with your order',
    rows: 3,
    outerClass: 'mb-6',
  },

  // Marketing Consent
  addElement('div', [], {
    class: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'marketingConsent',
        label: 'Send me exclusive offers and promotions',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Order submitted:', formData)
  await new Promise(resolve => setTimeout(resolve, 2000))
  // Redirect to confirmation page
}
</script>

<template>
  <UContainer>
    <div class="max-w-6xl mx-auto py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <FUDataEdit
            :data="data"
            :schema="schema"
            :debug-data="false"
            @data-saved="submitHandler"
          >
            <template #submit>
              <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <UButton
                  type="submit"
                  label="Complete Order"
                  icon="i-heroicons-lock-closed"
                  size="xl"
                  color="primary"
                  block
                />
                <p class="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  By completing this purchase you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </template>
          </FUDataEdit>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sticky top-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>

            <div class="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div
                v-for="item in cartSummary.items"
                :key="item.name"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600 dark:text-gray-400">
                  {{ item.name }} × {{ item.quantity }}
                </span>
                <span class="font-medium text-gray-900 dark:text-white">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <div class="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span class="text-gray-900 dark:text-white">${{ cartSummary.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                <span class="text-gray-900 dark:text-white">
                  {{ cartSummary.shipping === 0 ? 'FREE' : `$${cartSummary.shipping.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Tax</span>
                <span class="text-gray-900 dark:text-white">${{ cartSummary.tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between text-lg font-bold">
              <span class="text-gray-900 dark:text-white">Total</span>
              <span class="text-primary-600 dark:text-primary-400">
                ${{ cartSummary.total.toFixed(2) }}
              </span>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-green-500"
                />
                <span>Free returns within 30 days</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-green-500"
                />
                <span>1-year warranty included</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-green-500"
                />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
