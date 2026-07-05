<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const fileUploadSchema = [
  {
    $formkit: 'nuxtUIFileUpload',
    id: 'file-upload-basic',
    name: 'file1',
    label: 'Basic File Upload',
    help: 'Drag and drop a file or click to browse',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file2',
    label: 'Multiple Files',
    help: 'Select multiple files at once',
    multiple: true,
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file3',
    label: 'Grid Layout',
    help: 'Files displayed in a grid instead of a list',
    multiple: true,
    layout: 'grid',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file4',
    label: 'List Layout (Default)',
    help: 'Files displayed in a list',
    multiple: true,
    layout: 'list',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file5',
    label: 'Area Variant (Default)',
    variant: 'area',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file6',
    label: 'Button Variant',
    help: 'Compact button trigger instead of a dropzone',
    variant: 'button',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file7',
    label: 'Images Only',
    help: 'Restricts selection to image files',
    accept: 'image/*',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file8',
    label: 'PDF Only',
    help: 'Restricts selection to PDF files',
    accept: 'application/pdf',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file9',
    label: 'Primary Color',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file10',
    label: 'Success Color',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file11',
    label: 'Extra Small Size',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file12',
    label: 'Large Size',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIFileUpload',
    name: 'file13',
    label: 'Disabled',
    disabled: true,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          FileUpload Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The FileUpload component integrates FormKit with Nuxt UI's UFileUpload component, providing drag/drop and click-to-browse file input.
        </p>
        <p class="text-muted-foreground">
          Explore basic usage, multiple files, layouts, variants, accept filters, colors, sizes, and states below.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic single-file upload with validation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Multiple Files
          </h2>
          <p class="text-muted-foreground mb-6">
            Allow selecting more than one file at a time.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(1, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Layouts
          </h2>
          <p class="text-muted-foreground mb-6">
            Display selected files as a grid or a list (only applies to the `area` variant).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Use a dropzone area (default) or a compact button trigger (only available when `multiple` is `false`).
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(4, 6)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Accept Filters
          </h2>
          <p class="text-muted-foreground mb-6">
            Restrict the accepted file types via the `accept` prop.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(6, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize the dropzone's highlight color.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="fileUploadSchema.slice(8, 10)"
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
            :schema="fileUploadSchema.slice(10, 12)"
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
            :schema="fileUploadSchema.slice(12, 13)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
