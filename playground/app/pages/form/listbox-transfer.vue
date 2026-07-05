<script setup lang="ts">
const teamData = ref()

const employees = [
  { label: 'Ada Lovelace', value: 'ada', description: 'Backend Engineer', icon: 'i-lucide-user' },
  { label: 'Alan Turing', value: 'alan', description: 'Security Engineer', icon: 'i-lucide-user' },
  { label: 'Grace Hopper', value: 'grace', description: 'DevOps Engineer', icon: 'i-lucide-user' },
  { label: 'Katherine Johnson', value: 'katherine', description: 'Data Scientist', icon: 'i-lucide-user' },
  { label: 'Margaret Hamilton', value: 'margaret', description: 'Frontend Engineer', icon: 'i-lucide-user' },
  { label: 'Hedy Lamarr', value: 'hedy', description: 'Product Designer', icon: 'i-lucide-user' },
  { label: 'Tim Berners-Lee', value: 'tim', description: 'Solutions Architect', icon: 'i-lucide-user' },
]

onMounted(() => {
  teamData.value = {
    teamMembers: [
      { label: 'Grace Hopper', value: 'grace', description: 'DevOps Engineer', icon: 'i-lucide-user' },
      { label: 'Margaret Hamilton', value: 'margaret', description: 'Frontend Engineer', icon: 'i-lucide-user' },
    ],
  }
})

async function handleTeamSubmit() {
  console.log('Project team submitted:', teamData.value)
}

const teamSchema = [
  {
    $formkit: 'nuxtUIListbox',
    name: 'teamMembers',
    label: 'Project Team',
    help: 'Drag members between the lists, or reorder within the team to set priority.',
    class: 'h-72',
    displayMode: 'transfer',
    options: employees,
    filter: true,
    transferLeftHeaderText: 'Company Roster',
    transferRightHeaderText: 'Project Team',
    transferAll: true,
    transferSortIcons: true,
    transferItemDraggable: true,
    validation: 'required',
  },
]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Listbox Transfer Mode
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates the Listbox component's transfer mode — a two-pane UI for building a team roster from a larger pool of people.
      </p>
      <p class="text-muted-foreground">
        Drag members from the roster into the team (or back out) in either direction, use the arrow buttons instead if you prefer, and reorder the team itself by dragging rows or using the up/down icons — first in the list could represent the project lead, for example.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Project Team Builder
        </h2>
        <p class="text-muted-foreground mb-6">
          Assign employees from the company roster to a project team, with drag-and-drop transfer, drag-and-drop reordering, and optional sort icons all enabled at once.
        </p>
        <FUDataEdit
          v-if="teamData"
          :data="teamData"
          :schema="teamSchema"
          debug-data
          @data-saved="handleTeamSubmit"
        />
      </section>

      <!-- Feature Highlights -->
      <section class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
          🔀 Transfer Mode Features
        </h3>
        <ul class="space-y-2 text-blue-800 dark:text-blue-200">
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Bidirectional Drag:</strong> Drag items either way between the two lists, not just buttons</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Drag-to-Reorder:</strong> Reorder the selected list by dragging, with a precise insertion-line indicator</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Optional Sort Icons:</strong> Up/down buttons for reordering without dragging (<code>transferSortIcons</code>)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Whole-Row Dragging:</strong> Grab anywhere on a row, not just its grip handle (<code>transferItemDraggable</code>)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Filter & Bulk Actions:</strong> Search either pane, and optionally transfer or remove everything at once (<code>transferAll</code>)</span>
          </li>
        </ul>
      </section>
    </div>
  </UContainer>
</template>
