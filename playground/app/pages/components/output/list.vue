<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const sampleTags = ['Vue', 'Nuxt', 'FormKit', 'TypeScript']
const sampleColors = ['Red', 'Green', 'Blue']
const sampleFeatures = ['Fast', 'Flexible', 'Modern']
const sampleNames = ['Alice', 'Bob', 'Charlie', 'David']
const sampleSkills = ['JavaScript', 'Python', 'Go', 'Rust', 'Java']
const sampleCities = ['New York', 'London', 'Tokyo']
const sampleTasks = ['Design', 'Development', 'Testing', 'Deployment']
const sampleLanguages = ['English', 'Spanish', 'French', 'German', 'Japanese']

const outputListSchema = [
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list1',
    value: sampleTags,
    label: 'Basic List Output',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list2',
    value: sampleTags,
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list3',
    value: sampleFeatures,
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-arrow-right',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list4',
    value: sampleColors,
    label: 'With Both Icons',
    leadingIcon: 'i-heroicons-swatch',
    trailingIcon: 'i-heroicons-check',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list5',
    value: sampleTags,
    label: 'Comma Separated (Default)',
    listType: 'comma',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list6',
    value: sampleTags,
    label: 'Semicolon Separated',
    listType: 'semicolon',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list7',
    value: sampleTags,
    label: 'Pipe Separated',
    listType: 'pipe',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list8',
    value: sampleTags,
    label: 'Dash Separated',
    listType: 'dash',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list9',
    value: sampleTags,
    label: 'Space Separated',
    listType: 'space',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list10',
    value: sampleColors,
    label: 'Custom Separator',
    listType: 'comma',
    separator: ' • ',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list11',
    value: sampleTags,
    label: 'Span List (Inline)',
    listType: 'span',
    leadingIcon: 'i-heroicons-squares-2x2',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list12',
    value: sampleFeatures,
    label: 'Div List (Block)',
    listType: 'div',
    leadingIcon: 'i-heroicons-queue-list',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list13',
    value: sampleNames,
    label: 'Unordered List',
    listType: 'ul',
    leadingIcon: 'i-heroicons-list-bullet',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list14',
    value: sampleTasks,
    label: 'Ordered List',
    listType: 'ol',
    leadingIcon: 'i-heroicons-numbered-list',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list15',
    value: sampleTags,
    label: 'Extra Small',
    size: 'xs',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list16',
    value: sampleTags,
    label: 'Small',
    size: 'sm',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list17',
    value: sampleTags,
    label: 'Medium (Default)',
    size: 'md',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list18',
    value: sampleTags,
    label: 'Large',
    size: 'lg',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list19',
    value: sampleTags,
    label: 'Extra Large',
    size: 'xl',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list20',
    value: sampleTags,
    label: 'Primary Color',
    color: 'primary',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list21',
    value: sampleFeatures,
    label: 'Success Color',
    color: 'success',
    leadingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list22',
    value: sampleColors,
    label: 'Error Color',
    color: 'error',
    leadingIcon: 'i-heroicons-exclamation-circle',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list23',
    value: sampleNames,
    label: 'Warning Color',
    color: 'warning',
    leadingIcon: 'i-heroicons-exclamation-triangle',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list24',
    value: sampleCities,
    label: 'Info Color',
    color: 'info',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list25',
    value: sampleTags,
    label: 'Outline Variant',
    variant: 'outline',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list26',
    value: sampleTags,
    label: 'Soft Variant',
    variant: 'soft',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list27',
    value: sampleTags,
    label: 'Subtle Variant',
    variant: 'subtle',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list28',
    value: sampleTags,
    label: 'Ghost Variant',
    variant: 'ghost',
    leadingIcon: 'i-heroicons-tag',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list29',
    value: sampleSkills,
    label: 'Programming Skills',
    leadingIcon: 'i-heroicons-code-bracket',
    color: 'primary',
    variant: 'soft',
    size: 'lg',
    listType: 'ul',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list30',
    value: sampleTasks,
    label: 'Project Phases',
    leadingIcon: 'i-heroicons-numbered-list',
    trailingIcon: 'i-heroicons-arrow-right',
    color: 'info',
    variant: 'outline',
    listType: 'ol',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list31',
    value: sampleLanguages,
    label: 'Supported Languages',
    leadingIcon: 'i-heroicons-language',
    color: 'success',
    variant: 'soft',
    listType: 'pipe',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'list32',
    value: sampleFeatures,
    label: 'Key Features',
    leadingIcon: 'i-heroicons-star',
    color: 'warning',
    variant: 'subtle',
    listType: 'dash',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputList Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputList component provides a read-only list display with multiple formatting options, separators, and list types.
        </p>
        <p class="text-muted-foreground">
          Perfect for displaying arrays of data, tags, options, and other list-based content in your forms with various styling options.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Simple list output without any icons or special formatting.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading and/or trailing icons to enhance visual clarity.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(1, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Separator Types
          </h2>
          <p class="text-muted-foreground mb-6">
            Built-in separators: comma (default), semicolon, pipe, dash, and space.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(4, 9)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Custom Separator
          </h2>
          <p class="text-muted-foreground mb-6">
            Define your own custom separator using the separator property.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(9, 10)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            List Types
          </h2>
          <p class="text-muted-foreground mb-6">
            Different HTML list structures: span (inline), div (block), ul (unordered), and ol (ordered).
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(10, 14)"
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
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(14, 19)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Different colors for different contexts and semantic meanings.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(19, 24)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual styles: outline, soft, subtle, and ghost.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(24, 28)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining multiple properties for common use cases.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputListSchema.slice(28, 32)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
