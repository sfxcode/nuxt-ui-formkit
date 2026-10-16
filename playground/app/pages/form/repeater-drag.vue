<script setup lang="ts">
const taskData = ref()
const priorityData = ref()

onMounted(() => {
  taskData.value = {
    tasks: [
      { title: 'Design homepage mockup', priority: 'high', status: 'in-progress', assignee: 'Alice' },
      { title: 'Implement user authentication', priority: 'high', status: 'todo', assignee: 'Bob' },
      { title: 'Write API documentation', priority: 'medium', status: 'todo', assignee: 'Charlie' },
      { title: 'Setup CI/CD pipeline', priority: 'medium', status: 'done', assignee: 'Alice' },
      { title: 'Code review session', priority: 'low', status: 'todo', assignee: 'Bob' },
    ],
  }

  priorityData.value = {
    priorities: [
      { label: 'Critical Bug Fix', order: 1, color: '#ef4444' },
      { label: 'High Priority Feature', order: 2, color: '#f97316' },
      { label: 'Medium Priority Task', order: 3, color: '#eab308' },
      { label: 'Low Priority Enhancement', order: 4, color: '#22c55e' },
    ],
  }
})

async function handleTaskSubmit() {
  console.log('Tasks Submitted:', taskData.value)
}

async function handlePrioritySubmit() {
  console.log('Priorities Submitted:', priorityData.value)
}

const taskSchema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'tasks',
    label: 'Project Tasks',
    help: 'Drag tasks to reorder priorities',
    listClass: 'grid gap-3',
    listItemClass: 'flex items-start gap-3 p-4 rounded-lg border border-default bg-elevated/30 hover:border-accented transition-colors',
    draggable: true,
    displayDragHandle: true,
    dragHandleClass: 'mt-8 cursor-grab active:cursor-grabbing text-muted hover:text-default',
    hideMoveButtons: true,
    displayCloneButton: false,
    displayAddButton: true,
    displayDeleteButton: true,
    buttonGroupClass: 'flex gap-1 mt-6 ml-auto',
    buttonSize: 'md',
    insertButtonLabel: 'Add Task',
    insertButtonSize: 'md',
    alwaysDisplayInsertButton: true,
    newItem: { title: '', priority: 'medium', status: 'todo', assignee: '' },
    children: [
      {
        $formkit: 'nuxtUIInput',
        label: 'Task',
        name: 'title',
        placeholder: 'Enter task description',
        validation: 'required',
        outerClass: 'flex-1 min-w-0',
        class: 'w-full',
      },
      {
        $formkit: 'nuxtUISelect',
        label: 'Priority',
        name: 'priority',
        items: ['low', 'medium', 'high'],
        outerClass: 'w-36',
        class: 'w-full',
      },
      {
        $formkit: 'nuxtUISelect',
        label: 'Status',
        name: 'status',
        items: ['todo', 'in-progress', 'done'],
        outerClass: 'w-40',
        class: 'w-full',
      },
      {
        $formkit: 'nuxtUIInput',
        label: 'Assignee',
        name: 'assignee',
        placeholder: 'Name',
        outerClass: 'w-36',
        class: 'w-full',
      },
    ],
  },
]

const prioritySchema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'priorities',
    label: 'Priority Levels',
    help: 'Drag to reorder priority levels',
    listClass: 'grid gap-2',
    listItemClass: 'flex items-start gap-4 p-3 rounded-lg border border-default bg-elevated/30 hover:border-accented transition-colors cursor-grab active:cursor-grabbing',
    draggable: true,
    hideMoveButtons: true,
    hideButtonGroup: false,
    displayCloneButton: true,
    displayAddButton: false,
    displayDeleteButton: true,
    buttonGroupClass: 'flex gap-1 mt-6 ml-auto',
    buttonSize: 'md',
    insertButtonLabel: 'Add Priority Level',
    insertButtonSize: 'sm',
    minItems: 2,
    maxItems: 8,
    newItem: { label: '', order: 5, color: '#6366f1' },
    children: [
      {
        $formkit: 'nuxtUIInputNumber',
        label: 'Order',
        name: 'order',
        min: 1,
        outerClass: 'w-28',
        class: 'w-full',
      },
      {
        $formkit: 'nuxtUIInput',
        label: 'Priority Label',
        name: 'label',
        placeholder: 'Enter label',
        validation: 'required',
        outerClass: 'flex-1 min-w-0',
        class: 'w-full',
      },
    ],
  },
]
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Drag-and-Drop Repeater
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates FormKit's repeater with drag-and-drop functionality for intuitive reordering of list items.
      </p>
      <p class="text-muted-foreground">
        Simply grab the drag handle (⋮⋮) and drag items to reorder them. The drag-and-drop provides a modern, touch-friendly alternative to traditional up/down buttons.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <!-- Task Management Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Task Management Board
        </h2>
        <p class="text-muted-foreground mb-6">
          Drag tasks to prioritize them. The order reflects execution priority. This example hides the move buttons and relies entirely on drag-and-drop for a cleaner interface.
        </p>
        <FUDataEdit
          v-if="taskData"
          :data="taskData"
          :schema="taskSchema"
          debug-data
          @data-saved="handleTaskSubmit"
        />
      </section>

      <USeparator class="my-8" />

      <!-- Priority Level Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Priority Level Configuration
        </h2>
        <p class="text-muted-foreground mb-6">
          Customize and reorder priority levels for your project. This example combines drag-and-drop with min/max constraints (2-8 items) and includes clone functionality. Traditional move buttons are hidden for a streamlined experience.
        </p>
        <FUDataEdit
          v-if="priorityData"
          :data="priorityData"
          :schema="prioritySchema"
          debug-data
          class="w-1/2"
          @data-saved="handlePrioritySubmit"
        />
      </section>

      <!-- Feature Highlights -->
      <section class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
          🎯 Drag-and-Drop Features
        </h3>
        <ul class="space-y-2 text-blue-800 dark:text-blue-200">
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Visual Feedback:</strong> Items highlight when dragged over a drop target</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Customizable Handle:</strong> Change the drag handle icon and styling</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Touch-Friendly:</strong> Works on mobile and tablet devices</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Optional Buttons:</strong> Combine with or replace traditional move buttons</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="i-lucide-check text-green-600 dark:text-green-400 mt-1" />
            <span><strong>Smooth Animations:</strong> Powered by FormKit's auto-animate plugin</span>
          </li>
        </ul>
      </section>
    </div>
  </UContainer>
</template>

<style scoped>
/* Drag target visual feedback. Theme variables, so it also works in dark mode. */
:deep(.formkit-repeater-drop-target) {
  border-color: var(--ui-primary);
  background-color: color-mix(in oklab, var(--ui-primary) 12%, transparent);
  transform: scale(1.02);
  transition: all 0.2s ease;
}

/* Drag handle hover effect */
:deep(.formkit-repeater-drag-handle:hover) {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
