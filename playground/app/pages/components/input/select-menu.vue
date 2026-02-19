<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const countries = [
  { label: 'United States', value: 'us', icon: 'i-lucide-flag' },
  { label: 'United Kingdom', value: 'uk', icon: 'i-lucide-flag' },
  { label: 'Canada', value: 'ca', icon: 'i-lucide-flag' },
  { label: 'Germany', value: 'de', icon: 'i-lucide-flag' },
  { label: 'France', value: 'fr', icon: 'i-lucide-flag' },
  { label: 'Japan', value: 'jp', icon: 'i-lucide-flag' },
  { label: 'Australia', value: 'au', icon: 'i-lucide-flag' },
  { label: 'Brazil', value: 'br', icon: 'i-lucide-flag' },
]

const users = [
  { label: 'John Doe', value: 'john', avatar: { src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' } },
  { label: 'Jane Smith', value: 'jane', avatar: { src: 'https://i.pravatar.cc/150?img=2', alt: 'Jane Smith' } },
  { label: 'Bob Johnson', value: 'bob', avatar: { src: 'https://i.pravatar.cc/150?img=3', alt: 'Bob Johnson' } },
  { label: 'Alice Williams', value: 'alice', avatar: { src: 'https://i.pravatar.cc/150?img=4', alt: 'Alice Williams' } },
  { label: 'Charlie Brown', value: 'charlie', avatar: { src: 'https://i.pravatar.cc/150?img=5', alt: 'Charlie Brown' } },
]

const groupedOptions = [
  {
    label: 'Frontend',
    items: [
      { label: 'Vue.js', value: 'vue', icon: 'i-lucide-sparkles' },
      { label: 'React', value: 'react', icon: 'i-lucide-sparkles' },
      { label: 'Angular', value: 'angular', icon: 'i-lucide-sparkles' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { label: 'Node.js', value: 'node', icon: 'i-lucide-server' },
      { label: 'Python', value: 'python', icon: 'i-lucide-server' },
      { label: 'Java', value: 'java', icon: 'i-lucide-server' },
    ],
  },
  {
    label: 'Database',
    items: [
      { label: 'PostgreSQL', value: 'postgres', icon: 'i-lucide-database' },
      { label: 'MongoDB', value: 'mongo', icon: 'i-lucide-database' },
      { label: 'Redis', value: 'redis', icon: 'i-lucide-database' },
    ],
  },
]

const statusOptions = [
  { label: 'Active', value: 'active', chip: 12, icon: 'i-lucide-circle' },
  { label: 'Pending', value: 'pending', chip: 5, icon: 'i-lucide-circle' },
  { label: 'Inactive', value: 'inactive', chip: 0, icon: 'i-lucide-circle' },
  { label: 'Archived', value: 'archived', chip: 3, disabled: true, icon: 'i-lucide-archive' },
]

const selectMenuSchema = [
  {
    $formkit: 'nuxtUISelectMenu',
    id: 'selectmenu-basic',
    name: 'selectmenu1',
    label: 'Basic SelectMenu',
    help: 'Select an option',
    options: countries,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu2',
    label: 'With Icons',
    help: 'Options with icons',
    options: countries,
    placeholder: 'Select a country',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu3',
    label: 'With Avatars',
    help: 'Options with user avatars',
    options: users,
    placeholder: 'Select a user',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu4',
    label: 'With Chips & Disabled',
    help: 'Options with chips and disabled items',
    options: statusOptions,
    placeholder: 'Select status',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu5',
    label: 'Grouped Options',
    help: 'Options organized in groups',
    options: groupedOptions,
    placeholder: 'Select technology',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu6',
    label: 'Multiple Selection',
    help: 'Select multiple items',
    options: countries,
    multiple: true,
    placeholder: 'Select countries',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu7',
    label: 'Searchable Menu',
    help: 'Search through options',
    options: countries,
    searchable: true,
    searchablePlaceholder: 'Search countries...',
    placeholder: 'Select country',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu8',
    label: 'Searchable Groups',
    help: 'Search in grouped options',
    options: groupedOptions,
    searchable: true,
    searchablePlaceholder: 'Search technologies...',
    placeholder: 'Select technology',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu9',
    label: 'With Leading Icon',
    options: countries,
    leadingIcon: 'i-lucide-globe',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu10',
    label: 'With Trailing Icon',
    options: countries,
    trailingIcon: 'i-lucide-chevron-down',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu11',
    label: 'Loading State',
    options: [],
    loading: true,
    placeholder: 'Loading...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu12',
    label: 'Extra Small Size',
    options: countries.slice(0, 3),
    size: 'xs',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu13',
    label: 'Small Size',
    options: countries.slice(0, 3),
    size: 'sm',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu14',
    label: 'Medium Size (Default)',
    options: countries.slice(0, 3),
    size: 'md',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu15',
    label: 'Large Size',
    options: countries.slice(0, 3),
    size: 'lg',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu16',
    label: 'Extra Large Size',
    options: countries.slice(0, 3),
    size: 'xl',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu17',
    label: 'Primary Color',
    options: countries,
    color: 'primary',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu18',
    label: 'Success Color',
    options: countries,
    color: 'success',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu19',
    label: 'Outline Variant',
    options: countries,
    variant: 'outline',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu20',
    label: 'Soft Variant',
    options: countries,
    variant: 'soft',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu21',
    label: 'With Padding',
    options: countries,
    padded: true,
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu22',
    label: 'With Default Value',
    options: countries,
    value: 'ca',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu23',
    label: 'Read Only',
    options: countries,
    readonly: true,
    value: 'us',
  },
  {
    $formkit: 'nuxtUISelectMenu',
    name: 'selectmenu24',
    label: 'Disabled',
    options: countries,
    disabled: true,
    value: 'uk',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          SelectMenu Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The SelectMenu component integrates FormKit with Nuxt UI's USelectMenu component, providing an advanced dropdown menu with grouping support.
        </p>
        <p class="text-muted-foreground">
          Explore various select menu configurations, grouped options, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic select menu with icons, avatars, chips, and disabled options.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(0, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Grouped Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Options organized into groups with labels.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(4, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Multiple & Searchable
          </h2>
          <p class="text-muted-foreground mb-6">
            Enable multiple selection and search functionality.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(5, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Loading
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons, and show loading state.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(8, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Sizes
          </h2>
          <p class="text-muted-foreground mb-6">
            Available sizes: xs, sm, md (default), lg, and xl.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(11, 16)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize select menu colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(16, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different variants including outline and soft.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(18, 20)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize padding to match your design.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(20, 21)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value, readonly, and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectMenuSchema.slice(21, 24)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
