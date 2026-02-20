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
    options: countryOptions,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu2',
    label: 'With Icons',
    options: notificationOptions,
    placeholder: 'Select a folder',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu3',
    label: 'With Avatars',
    options: userOptions,
    placeholder: 'Select a user',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu4',
    label: 'With Disabled Options',
    options: statusOptions,
    placeholder: 'Select status',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu5',
    label: 'Multiple Selection',
    options: countryOptions,
    multiple: true,
    placeholder: 'Select countries',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu6',
    label: 'With Leading Icon',
    options: countryOptions,
    leadingIcon: 'i-lucide-search',
    placeholder: 'Search...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu7',
    label: 'With Trailing Icon',
    options: countryOptions,
    trailingIcon: 'i-lucide-chevron-down',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu8',
    label: 'Loading State',
    options: [],
    loading: true,
    placeholder: 'Loading...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu9',
    label: 'Extra Small Size',
    options: countryOptions.slice(0, 3),
    size: 'xs',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu10',
    label: 'Small Size',
    options: countryOptions.slice(0, 3),
    size: 'sm',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu11',
    label: 'Medium Size (Default)',
    options: countryOptions.slice(0, 3),
    size: 'md',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu12',
    label: 'Large Size',
    options: countryOptions.slice(0, 3),
    size: 'lg',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu13',
    label: 'Extra Large Size',
    options: countryOptions.slice(0, 3),
    size: 'xl',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu14',
    label: 'Primary Color',
    options: countryOptions,
    color: 'primary',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu15',
    label: 'Success Color',
    options: countryOptions,
    color: 'success',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu16',
    label: 'Outline Variant',
    options: countryOptions,
    variant: 'outline',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu17',
    label: 'Soft Variant',
    options: countryOptions,
    variant: 'soft',
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu18',
    label: 'With Default Value',
    options: countryOptions,
    value: { label: 'Canada', icon: 'i-lucide-flag' },
    placeholder: 'Select...',
  },
  {
    $formkit: 'nuxtUIInputMenu',
    name: 'menu19',
    label: 'Disabled',
    options: countryOptions,
    disabled: true,
    value: { label: 'France', icon: 'i-lucide-flag' },
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
            Basic input menu with icons, avatars, disabled options, and multiple selection.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputMenuSchema.slice(0, 5)"
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
            :schema="inputMenuSchema.slice(5, 8)"
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
            :schema="inputMenuSchema.slice(8, 13)"
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
            :schema="inputMenuSchema.slice(13, 15)"
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
            :schema="inputMenuSchema.slice(15, 17)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including default value and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputMenuSchema.slice(17, 19)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
