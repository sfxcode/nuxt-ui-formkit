<script setup lang='ts'>
const data = ref()

function createDefaultValue(): object {
  return { name: 'Bow', damage: '1D6+1' }
}

onMounted(() => {
  data.value = { name: 'Fighter', attacks: [{ name: 'Sword', damage: '2D6' }, { name: 'Dagger', damage: '1D6' }, { name: 'Spear', damage: '1D6+2' }] }
})

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
  {
    $formkit: 'nuxtUIRepeater',
    name: 'attacks',
    label: 'Attacks',
    help: 'Attacks List Demo - Use Buttons to clone, move and delete',
    listClass: 'grid gap-2',
    listItemClass: 'flex gap-2',
    minItems: 2,
    maxItems: 4,
    hideButtonGroup: false,
    hideMoveButtons: false,
    displayCloneButton: true,
    displayAddButton: true,
    displayDeleteButton: true,
    buttonGroupClass: 'buttonGroupClass mt-6 flex gap-1',
    buttonGroupItemClass: 'buttonGroupItemClass',
    buttonSize: 'md',
    insertButtonLabel: 'Add Attack',
    insertButtonClass: '',
    insertButtonSize: 'lg',
    alwaysDisplayInsertButton: true,
    newItem: createDefaultValue(),
    children: [
      {
        $formkit: 'nuxtUIInput',
        label: 'Name',
        name: 'name',
        outerClass: 'w-42',
        index: '$index',
      },
      {
        $formkit: 'nuxtUIInput',
        label: 'Damage',
        name: 'damage',
        outerClass: 'w-18',
        index: '$index',
      },
    ],
  },

]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        FormKit Repeater
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates using FormKit's repeater functionality to manage dynamic lists of items with add, remove, clone, and reorder capabilities.
      </p>
      <p class="text-muted-foreground">
        Create dynamic form sections where users can add multiple items, clone existing ones, and reorder them using intuitive controls powered by Nuxt UI components. This example includes min/max constraints (2-4 items) to demonstrate automatic button disabling.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Dynamic Attack List
        </h2>
        <p class="text-muted-foreground mb-6">
          Manage a fantasy character's attacks with dynamic add, remove, clone, and reorder actions. Each attack can be customized with name and damage values. The list requires a minimum of 2 attacks (delete button disabled at minimum) and allows a maximum of 4 attacks (add/clone buttons disabled at maximum).
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
