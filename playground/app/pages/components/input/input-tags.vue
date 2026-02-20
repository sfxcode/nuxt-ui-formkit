<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const inputTagsSchema = [
  {
    $formkit: 'nuxtUIInputTags',
    id: 'tags-basic',
    name: 'tags1',
    placeholder: 'Add tags...',
    label: 'Basic Tags',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags2',
    placeholder: 'Enter skills...',
    label: 'With Default Values',
    value: ['JavaScript', 'TypeScript', 'Vue.js'],
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags3',
    placeholder: 'Enter interests...',
    label: 'Custom Delimiters (comma, semicolon)',
    delimiters: [',', ';'],
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags4',
    placeholder: 'Add categories...',
    label: 'Max Tags (5)',
    max: 5,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags5',
    placeholder: 'Add tags...',
    label: 'Allow Duplicates',
    duplicate: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags6',
    placeholder: 'Type and press Tab...',
    label: 'Add on Tab',
    addOnTab: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags7',
    placeholder: 'Type and blur...',
    label: 'Add on Blur',
    addOnBlur: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags8',
    placeholder: 'Paste multiple items...',
    label: 'Add on Paste',
    addOnPaste: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags9',
    placeholder: 'Max 20 characters per tag...',
    label: 'Max Length per Tag',
    maxLength: 20,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags10',
    placeholder: 'Type to add...',
    label: 'Autofocus',
    autofocus: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags11',
    placeholder: 'Type to add...',
    label: 'Autofocus with Delay (1000ms)',
    autofocus: true,
    autofocusDelay: 1000,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags12',
    placeholder: 'Search tags...',
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags13',
    placeholder: 'Add tags...',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-plus',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags14',
    placeholder: 'With icon...',
    label: 'With Icon',
    icon: 'i-heroicons-hashtag',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags15',
    placeholder: 'Add tags...',
    label: 'With Avatar',
    avatar: { src: 'https://i.pravatar.cc/150?img=3', alt: 'User Avatar' },
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags16',
    placeholder: 'Loading...',
    label: 'Loading State',
    loading: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags17',
    placeholder: 'Loading...',
    label: 'Custom Loading Icon',
    loading: true,
    loadingIcon: 'i-heroicons-arrow-path',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags18',
    placeholder: 'Add tags...',
    label: 'Custom Delete Icon',
    deleteIcon: 'i-heroicons-trash',
    value: ['Tag 1', 'Tag 2'],
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags19',
    placeholder: 'Add tags...',
    label: 'Highlighted',
    highlight: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags20',
    placeholder: 'Fixed positioning...',
    label: 'Fixed',
    fixed: true,
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags21',
    placeholder: 'Extra Small Size',
    label: 'Size XS',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags22',
    placeholder: 'Small Size',
    label: 'Size SM',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags23',
    placeholder: 'Medium Size (Default)',
    label: 'Size MD',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags24',
    placeholder: 'Large Size',
    label: 'Size LG',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags25',
    placeholder: 'Extra Large Size',
    label: 'Size XL',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags26',
    placeholder: 'Primary Color',
    label: 'Primary Color',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags27',
    placeholder: 'Success Color',
    label: 'Success Color',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags28',
    placeholder: 'Error Color',
    label: 'Error Color',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags29',
    placeholder: 'Variant None',
    label: 'Variant None',
    variant: 'none',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags30',
    placeholder: 'Variant Ghost',
    label: 'Variant Ghost',
    variant: 'ghost',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags31',
    placeholder: 'Variant Outline',
    label: 'Variant Outline',
    variant: 'outline',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags32',
    placeholder: 'Variant Soft',
    label: 'Variant Soft',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIInputTags',
    name: 'tags33',
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
          Explore various tag input configurations including delimiters, behavior options, icons, avatars, validation patterns, styling options, and states.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic tag input with validation and default values.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Configuration Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure delimiters, max tags, duplicates, and max length per tag.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(2, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Behavior Options
          </h2>
          <p class="text-muted-foreground mb-6">
            Control when tags are added: on Tab, on Blur, or on Paste.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(5, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Autofocus
          </h2>
          <p class="text-muted-foreground mb-6">
            Control focus behavior with autofocus and autofocus delay options.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(9, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Icons & Slots
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading/trailing icons, avatars, custom delete icons, and loading indicators.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(11, 18)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Visual Elements
          </h2>
          <p class="text-muted-foreground mb-6">
            Highlight styling and fixed positioning options.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(18, 20)"
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
            :schema="inputTagsSchema.slice(20, 25)"
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
            :schema="inputTagsSchema.slice(25, 28)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different variants including none, ghost, outline, and soft.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(28, 32)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Disabled state.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="inputTagsSchema.slice(32, 33)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
