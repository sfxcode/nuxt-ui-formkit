<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const users = [
  { label: 'Jane Cooper', value: 'jane', description: 'Product Designer', icon: 'i-lucide-user' },
  { label: 'Wade Warren', value: 'wade', description: 'Frontend Engineer', icon: 'i-lucide-user' },
  { label: 'Cody Fisher', value: 'cody', description: 'Backend Engineer', icon: 'i-lucide-user' },
  { label: 'Esther Howard', value: 'esther', description: 'Project Manager', icon: 'i-lucide-user' },
]

const countries = [
  { label: 'United States', value: 'us', chip: { color: 'primary', variant: 'soft' } },
  { label: 'Germany', value: 'de', chip: { color: 'info', variant: 'soft' } },
  { label: 'Japan', value: 'jp', chip: { color: 'success', variant: 'soft' } },
  { label: 'United Kingdom', value: 'uk', disabled: true },
]

const groupedItems = [
  [
    { label: 'Design', type: 'label' },
    { label: 'Figma', value: 'figma', description: 'UI design tool' },
    { label: 'Framer', value: 'framer', description: 'Interactive prototyping' },
  ],
  [
    { label: 'Development', type: 'label' },
    { label: 'Nuxt', value: 'nuxt', description: 'Meta framework for Vue' },
    { label: 'Vue', value: 'vue', description: 'Progressive framework' },
    { type: 'separator' },
    { label: 'TypeScript', value: 'ts', description: 'Typed JavaScript' },
  ],
]

const manyItems = Array.from({ length: 150 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: index + 1,
  description: `Description ${index + 1}`,
}))

const listboxSchema = [
  {
    $formkit: 'nuxtUIListbox',
    id: 'listbox-basic',
    name: 'listbox1',
    label: 'Basic Listbox',
    help: 'Choose one option',
    options: users,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox2',
    label: 'Object Values',
    help: 'Use valueKey and labelKey for object options',
    options: countries,
    valueKey: 'value',
    labelKey: 'label',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox3',
    label: 'Multiple Selection',
    help: 'Select multiple users',
    options: users,
    multiple: true,
    defaultValue: ['jane', 'wade'],
    valueKey: 'value',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox4',
    label: 'With Filter',
    help: 'Use filter input to search',
    options: users,
    valueKey: 'value',
    filter: { placeholder: 'Search team members...' },
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox5',
    label: 'Grouped Items',
    help: 'Nested groups with labels and separator',
    options: groupedItems,
    valueKey: 'value',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox6',
    label: 'Small Size',
    options: users,
    size: 'sm',
    valueKey: 'value',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox7',
    label: 'Large Size',
    options: users,
    size: 'lg',
    valueKey: 'value',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox8',
    label: 'Highlight State',
    options: users,
    highlight: true,
    valueKey: 'value',
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox9',
    label: 'Loading State',
    options: [],
    loading: true,
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox10',
    label: 'Virtualized Large List',
    help: 'Virtualization keeps large list rendering fast',
    options: manyItems,
    valueKey: 'value',
    virtualize: true,
    filter: true,
  },
  {
    $formkit: 'nuxtUIListbox',
    name: 'listbox11',
    label: 'Disabled',
    options: users,
    disabled: true,
    value: 'jane',
    valueKey: 'value',
  },
]

const transferSchema = [
  {
    $formkit: 'nuxtUIListbox',
    id: 'listbox-transfer',
    name: 'listboxTrannsfer1',
    label: 'Transfer Listbox',
    class: 'h-60',
    displayMode: 'transfer',
    help: 'Select Items to transfer',
    options: users,
    filter: true,
    transferHeaderClass: 'text-sm text-gray-500 font-medium',
    transferLeftHeaderText: 'Available',
    transferRightHeaderText: 'Selected',
    transferAll: true,
    transferSortIcons: true,
    transferItemDraggable: true,
  },
]

const trasnferData = { listboxTrannsfer1: users.slice(1, 3) }
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Listbox Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Listbox component integrates FormKit with Nuxt UI's UListbox component for rich single and multiple selection.
        </p>
        <p class="text-muted-foreground">
          Explore filtering, grouped items, virtualization, and component states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple item lists with single and multiple selection.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="listboxSchema.slice(0, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Filtering & Grouping
          </h2>
          <p class="text-muted-foreground mb-6">
            Search and organize items with groups, labels, and separators.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="listboxSchema.slice(3, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Sizing & Styling
          </h2>
          <p class="text-muted-foreground mb-6">
            Adjust sizes and highlight style.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="listboxSchema.slice(5, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Performance & States
          </h2>
          <p class="text-muted-foreground mb-6">
            Loading, virtualization, and disabled state examples.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="listboxSchema.slice(8, 11)"
          />
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Transfer List
          </h2>
          <p class="text-muted-foreground mb-6">
            Drag items between the two lists in either direction to transfer them, or use the arrow buttons. Drag items within the right list to reorder them, or use the optional up/down icons (enabled via `transferSortIcons`). The whole row is draggable here (`transferItemDraggable`), not just the grip handle.
          </p>
          <FUDataEdit
            :data="trasnferData"
            :schema="transferSchema"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
