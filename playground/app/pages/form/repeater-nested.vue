<script setup lang="ts">
const data = ref()

onMounted(() => {
  data.value = {
    employers: [
      {
        company: 'Acme Corp',
        references: [
          { name: 'Alice Johnson', phone: '555-0101' },
          { name: 'Bob Smith', phone: '555-0102' },
        ],
      },
      {
        company: 'Globex Inc',
        references: [
          { name: 'Carol Lee', phone: '555-0201' },
        ],
      },
    ],
  }
})

async function submitHandler() {
  console.log('Work History Submitted:', data.value)
}

const schema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'employers',
    label: 'Work History',
    help: 'Add each employer, then list references for that employer',
    listClass: 'space-y-6',
    listItemClass: 'p-4 border rounded-lg',
    hideMoveButtons: true,
    displayDeleteButton: true,
    insertButtonLabel: 'Add Employer',
    alwaysDisplayInsertButton: true,
    newItem: { company: '', references: [] },
    children: [
      {
        $formkit: 'nuxtUIInput',
        label: 'Company',
        name: 'company',
        validation: 'required',
        outerClass: 'mb-4',
      },
      {
        $formkit: 'nuxtUIRepeater',
        name: 'references',
        label: 'References',
        listClass: 'space-y-2 ml-6',
        listItemClass: 'flex gap-2',
        hideMoveButtons: true,
        displayDeleteButton: true,
        insertButtonLabel: 'Add Reference',
        alwaysDisplayInsertButton: true,
        minItems: 1,
        newItem: { name: '', phone: '' },
        children: [
          {
            $formkit: 'nuxtUIInput',
            label: 'Name',
            name: 'name',
            outerClass: 'w-48',
          },
          {
            $formkit: 'nuxtUIInput',
            label: 'Phone',
            name: 'phone',
            outerClass: 'w-36',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Nested Repeater
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example nests a `nuxtUIRepeater` inside another repeater's per-item schema — each employer manages its own list of references.
      </p>
      <p class="text-muted-foreground">
        Insert/remove/clone at either nesting level only affects that level's own items; sibling employers and their reference lists are unaffected.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Work History with References
        </h2>
        <FUDataEdit
          v-if="data"
          :data="data"
          :schema="schema"
          debug-data
          @data-saved="submitHandler"
        />
      </section>
    </div>
  </UContainer>
</template>
