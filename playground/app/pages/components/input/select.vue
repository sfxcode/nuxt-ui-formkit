<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const selectSchema = [
  {
    $formkit: 'nuxtUISelect',
    id: 'select-basic',
    name: 'select1',
    label: 'Basic Select',
    help: 'This is a required field.',
    validation: 'required',
    items: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    placeholder: 'Select an option',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select3',
    label: 'Multiple Select',
    help: 'Select multiple items',
    multiple: true,
    items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'],
    placeholder: 'Select fruits',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select4',
    label: 'Searchable Select',
    help: 'Type to search',
    searchable: true,
    items: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia'],
    placeholder: 'Search for a country',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select5',
    label: 'Clearable Select',
    help: 'Can be cleared',
    clearable: true,
    items: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'],
    placeholder: 'Select a color',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select6',
    label: 'Creatable Select',
    help: 'Create new items',
    creatable: true,
    searchable: true,
    items: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    placeholder: 'Type to create or select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select7',
    label: 'Small Size',
    size: 'sm',
    items: ['Small 1', 'Small 2', 'Small 3'],
    placeholder: 'Small select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select8',
    label: 'Medium Size (Default)',
    size: 'md',
    items: ['Medium 1', 'Medium 2', 'Medium 3'],
    placeholder: 'Medium select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select9',
    label: 'Large Size',
    size: 'lg',
    items: ['Large 1', 'Large 2', 'Large 3'],
    placeholder: 'Large select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select10',
    label: 'Extra Large Size',
    size: 'xl',
    items: ['XL 1', 'XL 2', 'XL 3'],
    placeholder: 'Extra large select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select11',
    label: 'With Leading Icon',
    icon: 'i-heroicons-tag',
    items: ['Tag 1', 'Tag 2', 'Tag 3'],
    placeholder: 'Select with icon',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select12',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-chevron-down',
    items: ['Option A', 'Option B', 'Option C'],
    placeholder: 'Select with trailing icon',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select13',
    label: 'Loading State',
    loading: true,
    items: ['Loading 1', 'Loading 2', 'Loading 3'],
    placeholder: 'Loading...',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select14',
    label: 'Primary Color',
    color: 'primary',
    size: 'lg',
    items: ['Primary 1', 'Primary 2', 'Primary 3'],
    placeholder: 'Primary color select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select15',
    label: 'Variant Soft',
    variant: 'soft',
    items: ['Soft 1', 'Soft 2', 'Soft 3'],
    placeholder: 'Soft variant',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select16',
    label: 'Variant Subtle',
    variant: 'subtle',
    items: ['Subtle 1', 'Subtle 2', 'Subtle 3'],
    placeholder: 'Subtle variant',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select17',
    label: 'Variant Ghost',
    variant: 'ghost',
    items: ['Ghost 1', 'Ghost 2', 'Ghost 3'],
    placeholder: 'Ghost variant',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select18',
    label: 'With Padding',
    padded: true,
    items: ['Padded 1', 'Padded 2', 'Padded 3'],
    placeholder: 'Padded select',
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select19',
    label: 'Read Only',
    readonly: true,
    value: 'Option 2',
    items: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    $formkit: 'nuxtUISelect',
    name: 'select20',
    label: 'Disabled',
    disabled: true,
    value: 'Disabled Option',
    items: ['Disabled Option', 'Other Option'],
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Select Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Select component integrates FormKit with Nuxt UI's USelect component, providing a powerful dropdown selection experience.
        </p>
        <p class="text-muted-foreground">
          Explore various configurations including searchable, multiple selection, creatable items, and different styling variants.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic select with simple items and object-based items.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectSchema.slice(0, 2)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Advanced Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Multiple selection, searchable, clearable, and creatable items.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectSchema.slice(2, 6)"
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
            :schema="selectSchema.slice(6, 10)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Loading
          </h2>
          <p class="text-muted-foreground mb-6">
            Add icons or show loading state for better user experience.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectSchema.slice(10, 13)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Styling items
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize colors, variants, and padding to match your design.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectSchema.slice(13, 18)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Different states including readonly and disabled.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="selectSchema.slice(18, 20)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
