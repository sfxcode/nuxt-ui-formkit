<script setup lang='ts'>
import * as v from 'valibot'

const data = ref()

onMounted(() => {
  data.value = {
    name: 'A',
    email: 'not-an-email',
    address: { city: 'X', zip: '1' },
    attacks: [{ name: 'Longsword' }, { name: 'a' }],
  }
})

const standardSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  address: v.object({
    city: v.pipe(v.string(), v.minLength(2)),
    zip: v.pipe(v.string(), v.minLength(3)),
  }),
  attacks: v.array(v.object({
    name: v.pipe(v.string(), v.minLength(2)),
  })),
})

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name' },
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
  {
    $formkit: 'group',
    name: 'address',
    children: [
      { $formkit: 'nuxtUIInput', name: 'city', label: 'City' },
      { $formkit: 'nuxtUIInput', name: 'zip', label: 'ZIP' },
    ],
  },
  {
    $formkit: 'nuxtUIRepeater',
    name: 'attacks',
    label: 'Attacks',
    insertButtonLabel: 'Add Attack',
    alwaysDisplayInsertButton: true,
    displayDeleteButton: true,
    hideMoveButtons: true,
    newItem: { name: '' },
    children: [
      { $formkit: 'nuxtUIInput', name: 'name', label: 'Attack Name' },
    ],
  },
]

function handleSaved(saved: object) {
  console.log('Registration saved', saved)
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Standard Schema Validation
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        Validates this form against a <a
          href="https://standardschema.dev"
          target="_blank"
        >Standard Schema</a>-compliant Valibot schema, passed to <code>FUDataEdit</code>'s <code>standard-schema</code> prop - no hand-written FormKit <code>validation</code> strings.
      </p>
      <p class="text-muted-foreground">
        The seeded data is invalid at every level: the top-level <code>name</code>/<code>email</code> fields, the nested <code>address</code> group, and the second row of the <code>attacks</code> repeater. Errors respect each field's own visibility timing (blur by default) - blur a field, or submit the form, to reveal them. Try adding/removing repeater rows too: the row-level errors keep tracking the correct row even as indices shift.
      </p>
    </div>

    <USeparator class="my-8" />

    <FUDataEdit
      v-if="data"
      :data="data"
      :schema="schema"
      :standard-schema="standardSchema"
      debug-data
      @data-saved="handleSaved"
    />
  </UContainer>
</template>
