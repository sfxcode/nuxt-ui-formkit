<script setup lang="ts">
const { addElement } = useFormKitSchema()

function createDefaultRoom(): object {
  return {
    roomType: 'standard',
    guests: 2,
    extraBeds: 0,
    amenities: [],
  }
}

const data = ref()

onMounted(() => {
  data.value = {
    guestName: '',
    guestEmail: '',
    guestPhone: '',

    checkIn: '',
    checkOut: '',

    rooms: [createDefaultRoom()] as object[],

    specialRequests: '',

    paymentMethod: 'hotel',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',

    agreeCancellation: false,
  }
})

const roomTypes = [
  { label: 'Standard Room — $99/night', value: 'standard' },
  { label: 'Deluxe Room — $149/night', value: 'deluxe' },
  { label: 'Suite — $259/night', value: 'suite' },
  { label: 'Family Room — $189/night', value: 'family' },
]

const suiteAmenities = [
  { label: 'Welcome champagne', value: 'champagne' },
  { label: 'Late checkout (2pm)', value: 'late-checkout' },
  { label: 'Spa access', value: 'spa' },
  { label: 'Airport transfer', value: 'transfer' },
]

const schema = reactive([
  addElement('div', [], {
    class: 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-xl p-6 md:p-8 mb-8 text-white shadow-lg',
  }, true, {
    children: [
      addElement('h1', ['Reserve Your Stay'], { class: 'text-4xl font-bold mb-2' }),
      addElement('p', ['Book one or more rooms for your visit — each room can be configured independently.'], { class: 'opacity-90' }),
    ],
  }),

  // Guest Information
  addElement('div', ['Guest Information'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'guestName',
        label: 'Full Name',
        validation: 'required',
        leadingIcon: 'i-lucide-user',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'guestEmail',
        label: 'Email',
        validation: 'required|email',
        inputType: 'email',
        leadingIcon: 'i-lucide-mail',
      },
    ],
  }),

  {
    $formkit: 'nuxtUIInput',
    name: 'guestPhone',
    label: 'Phone Number',
    validation: 'required',
    inputType: 'tel',
    outerClass: 'mb-6',
    leadingIcon: 'i-lucide-phone',
  },

  // Stay Dates
  addElement('div', ['Stay Dates'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  addElement('div', [], {
    class: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'checkIn',
        label: 'Check-in',
        validation: 'required',
        inputType: 'date',
        leadingIcon: 'i-lucide-calendar-check',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'checkOut',
        label: 'Check-out',
        validation: 'required',
        inputType: 'date',
        leadingIcon: 'i-lucide-calendar-x',
      },
    ],
  }),

  // Rooms (repeater with per-room-type conditional fields)
  addElement('div', ['Rooms'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIRepeater',
    name: 'rooms',
    label: 'Rooms in this Booking',
    help: 'Add a room for each separate room you need — extra options appear based on the room type you pick',
    insertButtonLabel: 'Add Another Room',
    alwaysDisplayInsertButton: true,
    displayAddButton: false,
    displayDeleteButton: true,
    hideMoveButtons: true,
    minItems: 1,
    maxItems: 6,
    buttonSize: 'xs',
    listItemClass: 'relative bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 pr-14 mb-4 space-y-4',
    buttonGroupClass: 'absolute top-4 right-4 flex gap-1',
    newItem: createDefaultRoom(),
    outerClass: 'mb-6',
    children: [
      addElement('div', [], {
        class: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      }, true, {
        children: [
          {
            $formkit: 'nuxtUISelect',
            name: 'roomType',
            label: 'Room Type',
            validation: 'required',
            items: roomTypes,
          },
          {
            $formkit: 'nuxtUIInputNumber',
            name: 'guests',
            label: 'Guests',
            min: 1,
            max: 6,
          },
        ],
      }),

      // Family room extra: number of extra beds/cribs.
      // Inside a repeater row, `$node` refers to that row's own group node
      // (not the individual field), so `$node.value` is the whole room
      // object — this is what makes sibling-value conditionals work here.
      // Neither `$get('roomType')` (resolves by FormKit-assigned `id`, and
      // every row has a field named "roomType" so they can't all share one
      // id) nor `$node.parent.value` (parent is the `rooms` list, whose
      // value is the array, not this row) work for this.
      {
        $formkit: 'nuxtUIInputNumber',
        if: '$node.value.roomType === "family"',
        name: 'extraBeds',
        label: 'Extra Beds / Cribs',
        help: 'Family rooms can include up to 2 extra beds or cribs',
        min: 0,
        max: 2,
      },

      // Suite extra: amenity selection
      {
        $formkit: 'nuxtUICheckboxGroup',
        if: '$node.value.roomType === "suite"',
        name: 'amenities',
        legend: 'Suite Amenities',
        options: suiteAmenities,
      },
    ],
  },

  // Special Requests
  addElement('div', ['Special Requests'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUITextarea',
    name: 'specialRequests',
    label: 'Anything else we should know?',
    placeholder: 'Dietary needs, accessibility requirements, early arrival, etc. (optional)',
    rows: 3,
    outerClass: 'mb-6',
  },

  // Payment
  addElement('div', ['Payment'], {
    class: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-primary-500 mt-8',
  }),

  {
    $formkit: 'nuxtUIRadioGroup',
    name: 'paymentMethod',
    legend: 'When would you like to pay?',
    validation: 'required',
    options: [
      { label: 'Pay now with a card', value: 'now' },
      { label: 'Pay at the hotel on arrival', value: 'hotel' },
    ],
    outerClass: 'mb-4',
  },

  // Conditional card details
  {
    $formkit: 'nuxtUIInput',
    if: '$get(paymentMethod).value === "now"',
    name: 'cardName',
    label: 'Cardholder Name',
    validation: 'required',
    outerClass: 'mb-4',
    leadingIcon: 'i-lucide-user',
  },

  {
    $formkit: 'nuxtUIInput',
    if: '$get(paymentMethod).value === "now"',
    name: 'cardNumber',
    label: 'Card Number',
    validation: 'required|matches:/^[0-9]{16}$/',
    placeholder: '1234 5678 9012 3456',
    outerClass: 'mb-4',
    leadingIcon: 'i-lucide-credit-card',
  },

  addElement('div', [], {
    class: 'grid grid-cols-2 gap-4 mb-6',
  }, '$get(paymentMethod).value === "now"', {
    children: [
      {
        $formkit: 'nuxtUIInput',
        name: 'expiryDate',
        label: 'Expiry Date',
        validation: 'required|matches:/^(0[1-9]|1[0-2])\\/[0-9]{2}$/',
        placeholder: 'MM/YY',
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'cvv',
        label: 'CVV',
        validation: 'required|matches:/^[0-9]{3,4}$/',
        placeholder: '123',
        inputType: 'password',
      },
    ],
  }),

  // Cancellation policy
  addElement('div', [], {
    class: 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4',
  }, true, {
    children: [
      {
        $formkit: 'nuxtUICheckbox',
        name: 'agreeCancellation',
        label: 'I understand the cancellation policy: free cancellation up to 48 hours before check-in',
        validation: 'required|accepted',
      },
    ],
  }),
])

async function submitHandler(formData: Record<string, unknown>) {
  console.log('Reservation submitted:', formData)
  await new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <UContainer>
    <div class="max-w-3xl mx-auto py-8">
      <FUDataEdit
        v-if="data"
        :data="data"
        :schema="schema"
        :debug-data="false"
        @data-saved="submitHandler"
      >
        <template #submit>
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <UButton
              type="submit"
              label="Confirm Reservation"
              icon="i-lucide-bed-double"
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
