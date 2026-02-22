<script setup lang='ts'>
const { addElement, addList, addListGroup } = useFormKitSchema()
const { addInsertButton, addGroupButtons, addListGroupFunctions } = useFormKitRepeater()

const defaultData = { name: 'Fighter', attacks: [{ name: 'Sword', damage: '2D20' }, { name: 'Dagger', damage: '2D6' }] }
function createDefaultValue(): object {
  return { name: 'Bow', damage: '1D6+4' }
}
addListGroupFunctions(defaultData, createDefaultValue())

const data = ref(defaultData)

async function submitHandler() {
  console.log('Form Submitted ...', 'Form submitted successfully')
}

const schema = [
  {
    $formkit: 'nuxtUIInput',
    label: 'Name',
    name: 'name',
    class: 'w-32',
  },

  addElement('div', [''], { class: 'mt-4' }),
  addList('attacks', [
    addElement('div', ['Attacks'], { class: 'text-xl' }),
    addInsertButton(),
    addListGroup([
      addElement('div', [
        {
          $formkit: 'nuxtUIInput',
          label: 'Name',
          name: 'name',
        },
        {
          $formkit: 'nuxtUIInput',
          label: 'Damage',
          name: 'damage',
        },
        addGroupButtons('flex gap-2', '', 'Actions'),
      ], { class: 'flex gap-2' }),
    ]),
  ], true, 'true'),
]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        FormKit Repeater
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates using FormKit's repeater functionality to manage dynamic lists of items with add, remove, copy, and reorder capabilities.
      </p>
      <p class="text-muted-foreground">
        Create dynamic form sections where users can add multiple items, copy existing ones, and reorder them using intuitive controls powered by Nuxt UI components.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Dynamic Attack List
        </h2>
        <p class="text-muted-foreground mb-6">
          Manage a character's attacks with dynamic add, remove, copy, and reorder actions. Each attack can be customized with name and damage values.
        </p>
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

<style lang='scss' scoped>

</style>
