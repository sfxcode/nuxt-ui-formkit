<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputTagsSchema = [
  {
    $formkit: 'nuxtUIInputTags',
    id: 'tags-basic',
    name: 'tags1',
    placeholder: 'Add tags...',
    label: 'Basic Tags',
    help: 'Press Enter or comma to add tags',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags2',
    placeholder: 'Enter skills...',
    label: 'Skills',
    help: 'Add your skills',
    separator: [',', 'Enter'],
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags3',
    placeholder: 'Add interests...',
    label: 'Interests (max 5)',
    help: 'You can add up to 5 interests',
    max: 5,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags4',
    placeholder: 'Add categories...',
    label: 'Categories (min 2)',
    help: 'At least 2 categories required',
    min: 2,
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags5',
    placeholder: 'Add tags...',
    label: 'Allow Duplicates',
    help: 'Duplicates are allowed',
    allowDuplicates: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags6',
    placeholder: 'Search tags...',
    label: 'With Leading Icon',
    icon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags7',
    placeholder: 'Loading...',
    label: 'Loading State',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags8',
    placeholder: 'Small Size',
    label: 'Small Size',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags9',
    placeholder: 'Medium Size (Default)',
    label: 'Medium Size',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags10',
    placeholder: 'Large Size',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags11',
    placeholder: 'Extra Large Size',
    label: 'Extra Large Size',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags12',
    placeholder: 'Primary Color',
    label: 'Primary Color',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags13',
    placeholder: 'Success Color',
    label: 'Success Color',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags14',
    placeholder: 'Outline Variant',
    label: 'Outline Variant',
    variant: 'outline',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags15',
    placeholder: 'Soft Variant',
    label: 'Soft Variant',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags16',
    placeholder: 'Solid Tag Variant',
    label: 'Solid Tag Variant',
    tagVariant: 'solid',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags17',
    placeholder: 'Outline Tag Variant',
    label: 'Outline Tag Variant',
    tagVariant: 'outline',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags18',
    placeholder: 'With Padding',
    label: 'With Padding',
    padded: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags19',
    placeholder: 'Read Only',
    label: 'Read Only',
    readonly: true,
    value: ['tag1', 'tag2', 'tag3'],
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags20',
    placeholder: 'Disabled',
    label: 'Disabled',
    disabled: true,
    value: ['disabled', 'tags'],
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          InputTags Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The InputTags component integrates FormKit with Nuxt UI's UInputTags component, providing a seamless tag input experience.
        </p>
        <p class="text-muted-foreground">
          Explore various tag input configurations, validation patterns, styling options, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic tag input with validation, custom separators, and min/max limits.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(0, 5)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Loading
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading icons or show loading state.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(5, 7)"
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
            :schema="inputTagsSchema.slice(7, 11)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize tag input colors.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(11, 13)"
            debug-data
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different input and tag variants including outline, soft, solid, and subtle.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(13, 17)"
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
            :schema="inputTagsSchema.slice(17, 18)"
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
            :schema="inputTagsSchema.slice(18, 20)"
            debug-data
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
