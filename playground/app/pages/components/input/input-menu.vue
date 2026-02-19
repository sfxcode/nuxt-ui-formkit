<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const countryOptions = [
  { label: 'United States', icon: 'i-lucide-flag' },
  { label: 'United Kingdom', icon: 'i-lucide-flag' },
  { label: 'Canada', icon: 'i-lucide-flag' },
  { label: 'Germany', icon: 'i-lucide-flag' },
  { label: 'France', icon: 'i-lucide-flag' },
]

const userOptions = [
  { label: 'John Doe', avatar: { src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' } },
  { label: 'Jane Smith', avatar: { src: 'https://i.pravatar.cc/150?img=2', alt: 'Jane Smith' } },
  { label: 'Bob Johnson', avatar: { src: 'https://i.pravatar.cc/150?img=3', alt: 'Bob Johnson' } },
]

const notificationOptions = [
  { label: 'Inbox', icon: 'i-lucide-inbox', chip: 12 },
  { label: 'Starred', icon: 'i-lucide-star', chip: 5 },
  { label: 'Sent', icon: 'i-lucide-send', chip: 0 },
  { label: 'Drafts', icon: 'i-lucide-file-edit', chip: 3 },
]

const statusOptions = [
  { label: 'Available', icon: 'i-lucide-circle', disabled: false },
  { label: 'Busy', icon: 'i-lucide-circle', disabled: false },
  { label: 'Away', icon: 'i-lucide-circle', disabled: false },
  { label: 'Offline', icon: 'i-lucide-circle', disabled: true },
]

const inputMenuSchema = [
  {
    $formkit: 'nuxtUIInputMenu',
    id: 'menu-basic',
    name: 'menu1',
    label: 'Basic Input Menu',
    help: 'Select an option from the menu',
    options: countryOptions,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu2',
    label: 'With Icons',
    help: 'Menu items with icons',
    options: notificationOptions,
    placeholder: 'Select a folder',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu3',
    label: 'With Avatars',
    help: 'Menu items with user avatars',
    options: userOptions,
    placeholder: 'Select a user',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu4',
    label: 'With Disabled Options',
    help: 'Some options are disabled',
    options: statusOptions,
    placeholder: 'Select status',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu5',
    label: 'Multiple Selection',
    help: 'Select multiple items',
    options: countryOptions,
    multiple: true,
    placeholder: 'Select countries',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu6',
    label: 'Searchable Menu',
    help: 'Search through options',
    options: countryOptions,
    searchable: true,
    searchablePlaceholder: 'Search countries...',
    placeholder: 'Select country',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu7',
    label: 'With Leading Icon',
    options: countryOptions,
    leadingIcon: 'i-lucide-search',
    placeholder: 'Search...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu8',
    label: 'With Trailing Icon',
    options: countryOptions,
    trailingIcon: 'i-lucide-chevron-down',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu9',
    label: 'Loading State',
    options: [],
    loading: true,
    placeholder: 'Loading...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu10',
    label: 'Extra Small Size',
    options: countryOptions.slice(0, 3),
    size: 'xs',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu11',
    label: 'Small Size',
    options: countryOptions.slice(0, 3),
    size: 'sm',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu12',
    label: 'Medium Size (Default)',
    options: countryOptions.slice(0, 3),
    size: 'md',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu13',
    label: 'Large Size',
    options: countryOptions.slice(0, 3),
    size: 'lg',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu14',
    label: 'Extra Large Size',
    options: countryOptions.slice(0, 3),
    size: 'xl',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu15',
    label: 'Primary Color',
    options: countryOptions,
    color: 'primary',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu16',
    label: 'Success Color',
    options: countryOptions,
    color: 'success',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu17',
    label: 'Outline Variant',
    options: countryOptions,
    variant: 'outline',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu18',
    label: 'Soft Variant',
    options: countryOptions,
    variant: 'soft',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu19',
    label: 'With Padding',
    options: countryOptions,
    padded: true,
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu20',
    label: 'With Default Value',
    options: countryOptions,
    value: 'Canada',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu21',
    label: 'Read Only',
    options: countryOptions,
    readonly: true,
    value: 'United States',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu22',
    label: 'Disabled',
    options: countryOptions,
    disabled: true,
    value: 'France',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputMenu Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputMenu component integrates FormKit with Nuxt UI's UInputMenu component, providing a rich dropdown menu experience.
        </p>
        <p class="text-muted-foreground">
          Explore various input menu configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic input menu with icons, avatars, and disabled options.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputMenuSchema.slice(0, 4)"
            debug-data
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
            :schema="inputMenuSchema.slice(4, 6)"
            debug-data
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
            :schema="inputMenuSchema.slice(6, 9)"
            debug-data
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
            :schema="inputMenuSchema.slice(9, 14)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize input menu colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputMenuSchema.slice(14, 16)"
            debug-data
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
            :schema="inputMenuSchema.slice(16, 18)"
            debug-data
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
            :schema="inputMenuSchema.slice(18, 19)"
            debug-data
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
            :schema="inputMenuSchema.slice(19, 22)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
