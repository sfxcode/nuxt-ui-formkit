<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { addElement } = useFormKitSchema()

const data = ref({
  accountType: 'individual',

  firstName: '',
  lastName: '',
  email: '',
  phone: '',

  password: '',
  password_confirm: '',

  companyName: '',
  taxId: '',
  companySize: 'small',

  shippingAddress: '',
  shippingCity: '',
  shippingZip: '',
  shippingCountry: 'US',

  additionalAddresses: [] as object[],

  newsletter: true,
  terms: false,
})

const countries: SelectItem[] = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Japan', value: 'JP' },
]

const companySizes: SelectItem[] = [
  { label: '1-9 employees', value: 'small' },
  { label: '10-49 employees', value: 'medium' },
  { label: '50-249 employees', value: 'large' },
  { label: '250+ employees', value: 'enterprise' },
]

function createDefaultAddress(): object {
  return { label: 'Home', street: '', city: '', zip: '' }
}

const schema = reactive([
  addElement('div', [], {
    class: 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-xl p-6 md:p-8 mb-8 text-white shadow-lg',
  }, true, {
    children: [
      addElement('h1', ['Create Your Account'], { class: 'text-4xl font-bold mb-2' }),
      addElement('p', ['Join the store to track orders, save addresses, and check out faster.'], { class: 'opacity-90' }),
    ],
  }),

  // Account Type
  addElement('div', ['Account Type'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500',
  }),

  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'accountType',
    legend: 'This account is for',
    validation: 'required',
    options: [
      { label: 'Myself (individual)', value: 'individual' },
      { label: 'A business', value: 'business' },
    ],
    outerClass: 'mb-6',
  },

  // Business Details (conditional)
  addElement('div', [], {
    class: 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6',
  }, '$get(accountType).value === "business"', {
    children: [
      addElement('div', ['Business Details'], { class: 'text-lg font-semibold mb-4' }),
      addElement('div', [], {
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
      }, true, {
        children: [
          {
            $formkit: 'nuxtUIInput',
            if: '$get(accountType).value === "business"',
            name: 'companyName',
            label: 'Company Name',
            validation: 'required',
            leadingIcon: 'i-lucide-building-2',
          },
          {
            $formkit: 'nuxtUIInput',
            if: '$get(accountType).value === "business"',
            name: 'taxId',
            label: 'Tax / VAT ID',
            validation: 'required',
            leadingIcon: 'i-lucide-hash',
          },
        ],
      }),
      {
        $formkit: 'nuxtUISelect',
        if: '$get(accountType).value === "business"',
        name: 'companySize',
        label: 'Company Size',
        items: companySizes,
      },
    ],
  }),

  // Personal Information
  addElement('div', ['Personal Information'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'firstName',
        label: 'First Name',
        validation: 'required',
        leadingIcon: 'i-lucide-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'lastName',
        label: 'Last Name',
        validation: 'required',
        leadingIcon: 'i-lucide-user',
      },
    ],
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'email',
    label: 'Email',
    help: 'Order confirmations and account updates will be sent here',
    validation: 'required|email',
    inputType: 'email',
    outerClass: 'mb-4',
    leadingIcon: 'i-lucide-mail',
  },

  {
    $formkit: 'nuxtUIInput',
    name: 'phone',
    label: 'Phone Number',
    validation: 'required',
    inputType: 'tel',
    outerClass: 'mb-6',
    leadingIcon: 'i-lucide-phone',
  },

  // Password
  addElement('div', ['Password'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'password',
        label: 'Password',
        inputType: 'password',
        validation: 'required|length:8',
        help: 'At least 8 characters',
        leadingIcon: 'i-lucide-lock',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'password_confirm',
        label: 'Confirm Password',
        inputType: 'password',
        validation: 'required|confirm',
        leadingIcon: 'i-lucide-lock',
      },
    ],
  }),

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
    leadingIcon: 'i-lucide-home',
  },

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'shippingCity',
        label: 'City',
        validation: 'required',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'shippingZip',
        label: 'ZIP / Postal Code',
        validation: 'required',
      },
      {
        $formkit: 'nuxtUISelect',
        name: 'shippingCountry',
        label: 'Country',
        validation: 'required',
        items: countries,
      },
    ],
  }),

  // Additional Addresses (optional repeater)
  addElement('div', ['Additional Addresses'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIRepeater',
    name: 'additionalAddresses',
    label: 'Other Shipping Addresses',
    help: 'Optional — save extra addresses to choose from at checkout later',
    insertButtonLabel: 'Add Address',
    alwaysDisplayInsertButton: true,
    displayAddButton: false,
    displayDeleteButton: true,
    hideMoveButtons: true,
    buttonSize: 'xs',
    listItemClass: 'flex gap-4 items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-3',
    buttonGroupClass: 'flex items-center gap-1 shrink-0',
    newItem: createDefaultAddress(),
    outerClass: 'mb-6',
    children: [
      addElement('div', [], {
        class: 'grid grid-cols-1 md:grid-cols-4 gap-4 flex-1',
      }, true, {
        children: [
          {
            $formkit: 'nuxtUISelect',
            name: 'label',
            label: 'Label',
            items: ['Home', 'Work', 'Other'],
          },
          {
            $formkit: 'nuxtUIInput',
            name: 'street',
            label: 'Street',
            validation: 'required',
            outerClass: 'md:col-span-2',
          },
          {
            $formkit: 'nuxtUIInput',
            name: 'city',
            label: 'City',
            validation: 'required',
          },
        ],
      }),
    ],
  },

  // Preferences
  addElement('div', ['Preferences'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'newsletter',
        label: 'Send me exclusive offers and new product announcements',
      },
      {
        $formkit: 'nuxtUICheckbox',
        name: 'terms',
        label: 'I agree to the Terms of Service and Privacy Policy',
        validation: 'required|accepted',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Registration submitted:', formData)
  await new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <UContainer>
    <div class="max-w-3xl mx-auto py-8">
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
              label="Create Account"
              icon="i-lucide-user-plus"
              size="xl"
              color="primary"
              block
            />
          </div>
        </template>
      </FUDataEdit>
    </div>
  </UContainer>
</template>
