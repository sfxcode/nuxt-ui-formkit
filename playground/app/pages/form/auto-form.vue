<script setup lang='ts'>
import * as v from 'valibot'

const profile = ref({
  firstName: 'Ada',
  lastName: 'Lovelace',
  age: 36,
  newsletter: true,
  birthday: '1815-12-10',
  bio: 'Mathematician.\nWrote the first algorithm.',
  internalId: 4711,
  tags: ['math', 'pioneer'],
  address: { city: 'London', zip: 'W1' },
  contacts: [
    { email: 'ada@example.com', primary: true },
    { email: 'lovelace@example.com', primary: false },
  ],
})

const overrides = {
  'firstName': { validation: 'required' },
  'internalId': false,
  'contacts.email': { validation: 'required|email' },
  'nickname': { placeholder: 'Optional nickname' },
}

const registrationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  age: v.optional(v.pipe(v.number(), v.minValue(18), v.maxValue(120))),
  newsletter: v.boolean(),
  contacts: v.array(v.object({
    email: v.pipe(v.string(), v.email()),
    role: v.optional(v.string(), 'friend'),
  })),
})

const registration = ref({
  name: '',
  email: '',
  age: 18,
  newsletter: false,
  contacts: [{ email: '', role: 'friend' }],
})

function handleProfileSaved(data: object) {
  console.log('Profile saved', data)
}

function handleRegistrationSaved(data: object) {
  console.log('Registration saved', data)
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        FUAutoForm
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        Forms without a hand-written schema: inputs are inferred from the data's value shapes - strings, numbers, booleans, ISO dates, tag arrays, nested objects, and arrays of objects (repeater).
      </p>
      <p class="text-muted-foreground">
        An override map fine-tunes the result: add validation, swap an input type, suppress a field (internalId is hidden here), or append fields the data does not contain (nickname).
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Inferred from Data
        </h2>
        <FUAutoForm
          id="auto_form_profile"
          :data="profile"
          :overrides="overrides"
          debug-data
          @data-saved="handleProfileSaved"
        />
      </section>

      <USeparator class="my-8" />

      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Inferred from a Valibot Schema
        </h2>
        <p class="text-muted-foreground mb-4">
          Inputs, labels, and validation rules (required, email, length, min/max) derived from the schema's own metadata - try submitting empty fields.
        </p>
        <FUAutoForm
          id="auto_form_registration"
          :data="registration"
          :valibot-schema="registrationSchema"
          debug-data
          @data-saved="handleRegistrationSaved"
        />
      </section>
    </div>
  </UContainer>
</template>
