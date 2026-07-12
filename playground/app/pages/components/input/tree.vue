<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const categoryItems = [
  {
    label: 'Electronics',
    icon: 'i-lucide-cpu',
    defaultExpanded: true,
    children: [
      { label: 'Laptops' },
      { label: 'Phones' },
      { label: 'Accessories' },
    ],
  },
  {
    label: 'Clothing',
    icon: 'i-lucide-shirt',
    children: [
      { label: 'Men' },
      { label: 'Women' },
      { label: 'Kids' },
    ],
  },
  {
    label: 'Books',
    icon: 'i-lucide-book',
    children: [
      { label: 'Fiction' },
      { label: 'Non-Fiction' },
    ],
  },
]

const orgChartItems = [
  {
    label: 'Engineering',
    defaultExpanded: true,
    children: [
      {
        label: 'Frontend',
        defaultExpanded: true,
        children: [
          { label: 'Jane Cooper' },
          { label: 'Wade Warren' },
        ],
      },
      {
        label: 'Backend',
        children: [
          { label: 'Cody Fisher' },
          { label: 'Esther Howard' },
        ],
      },
    ],
  },
  {
    label: 'Design',
    children: [
      { label: 'Devon Lane' },
    ],
  },
]

const permissionItems = [
  {
    label: 'Documents',
    icon: 'i-lucide-folder',
    defaultExpanded: true,
    children: [
      { label: 'Reports' },
      { label: 'Invoices', disabled: true },
      { label: 'Contracts' },
    ],
  },
  {
    label: 'Media',
    icon: 'i-lucide-folder',
    children: [
      { label: 'Photos' },
      { label: 'Videos' },
    ],
  },
]

const treeSchema = [
  {
    $formkit: 'nuxtUITree',
    name: 'category',
    label: 'Basic Tree',
    help: 'Select a single category',
    options: categoryItems,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUITree',
    name: 'assignees',
    label: 'Multiple Selection',
    help: 'Select one or more people across the org chart',
    options: orgChartItems,
    multiple: true,
  },
  {
    $formkit: 'nuxtUITree',
    name: 'folder',
    label: 'With Disabled Item',
    help: '"Invoices" is disabled and cannot be selected',
    options: permissionItems,
  },
  {
    $formkit: 'nuxtUITree',
    name: 'flattened',
    label: 'Flattened (nested: false)',
    help: 'Renders every item at the same indentation level instead of nesting children under their parent',
    options: categoryItems,
    nested: false,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Tree Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Tree component integrates FormKit with Nuxt UI's UTree component for hierarchical selection.
        </p>
        <p class="text-muted-foreground">
          The field's value is always just the selected item - expanding/collapsing nodes is separate, uncontrolled UI state that never becomes part of the value.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            A simple nested tree with a single required selection.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="treeSchema.slice(0, 1)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Multiple Selection
          </h2>
          <p class="text-muted-foreground mb-6">
            Select several deeply-nested items at once.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="treeSchema.slice(1, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Disabled Item
          </h2>
          <p class="text-muted-foreground mb-6">
            An individual item can be disabled without disabling the whole tree.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="treeSchema.slice(2, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Flattened Layout
          </h2>
          <p class="text-muted-foreground mb-6">
            Same data as the basic example, rendered as a single-level list instead of nested groups.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="treeSchema.slice(3, 4)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
