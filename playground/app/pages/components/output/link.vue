<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputLinkSchema = [
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link1',
    value: '/about',
    label: 'Internal Link',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link2',
    value: 'https://nuxt.com',
    label: 'External Link',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link3',
    value: '/docs',
    label: 'With Leading Icon',
    leadingIcon: 'i-heroicons-document-text',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link4',
    value: 'https://github.com',
    label: 'With Trailing Icon',
    trailingIcon: 'i-heroicons-arrow-top-right-on-square',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link5',
    value: '/contact',
    label: 'With Both Icons',
    leadingIcon: 'i-heroicons-envelope',
    trailingIcon: 'i-heroicons-arrow-right',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link6',
    value: '/home',
    label: 'Size XS',
    size: 'xs',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link7',
    value: '/home',
    label: 'Size SM',
    size: 'sm',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link8',
    value: '/home',
    label: 'Size MD (Default)',
    size: 'md',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link9',
    value: '/home',
    label: 'Size LG',
    size: 'lg',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link10',
    value: '/home',
    label: 'Size XL',
    size: 'xl',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link11',
    value: '/primary',
    label: 'Primary Color',
    color: 'primary',
    leadingIcon: 'i-heroicons-link',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link12',
    value: '/success',
    label: 'Success Color',
    color: 'success',
    leadingIcon: 'i-heroicons-check-circle',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link13',
    value: '/error',
    label: 'Error Color',
    color: 'error',
    leadingIcon: 'i-heroicons-exclamation-circle',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link14',
    value: '/warning',
    label: 'Warning Color',
    color: 'warning',
    leadingIcon: 'i-heroicons-exclamation-triangle',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link15',
    value: '/info',
    label: 'Info Color',
    color: 'info',
    leadingIcon: 'i-heroicons-information-circle',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link16',
    value: '/outline',
    label: 'Outline Variant',
    variant: 'outline',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link17',
    value: '/soft',
    label: 'Soft Variant',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link18',
    value: '/subtle',
    label: 'Subtle Variant',
    variant: 'subtle',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link19',
    value: '/ghost',
    label: 'Ghost Variant',
    variant: 'ghost',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link20',
    value: 'https://example.com',
    label: 'External with _self Target',
    target: '_self',
    trailingIcon: 'i-heroicons-arrow-top-right-on-square',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link21',
    value: 'https://example.com',
    label: 'External with _blank Target (Default)',
    target: '_blank',
    trailingIcon: 'i-heroicons-arrow-top-right-on-square',
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'link22',
    value: '/no-underline',
    label: 'No Underline',
    underline: false,
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputLink Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputLink component displays links using NuxtLink for internal navigation and anchor tags for external URLs.
        </p>
        <p class="text-muted-foreground">
          Explore various link output configurations including internal/external links, icons, sizes, colors, and variants.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Internal links use NuxtLink, external links use anchor tags with proper rel attributes.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputLinkSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            With Icons
          </h2>
          <p class="text-muted-foreground mb-6">
            Add leading or trailing icons to enhance visual context.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputLinkSchema.slice(2, 5)"
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
            :schema="outputLinkSchema.slice(5, 10)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            Customize link colors to match your design system.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputLinkSchema.slice(10, 15)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Different visual variants including outline, soft, subtle, and ghost.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputLinkSchema.slice(15, 19)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Link Behavior
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure target and underline behavior.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputLinkSchema.slice(19, 22)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
