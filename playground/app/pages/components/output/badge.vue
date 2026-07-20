<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputBadgeSchema = [
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge1',
    value: 'Active',
    label: 'Basic Badge',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge2',
    value: 42,
    label: 'Numeric Badge',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge3',
    value: 'Solid',
    label: 'Solid (Default)',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge4',
    value: 'Outline',
    label: 'Outline',
    variant: 'outline',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge5',
    value: 'Soft',
    label: 'Soft',
    variant: 'soft',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge6',
    value: 'Subtle',
    label: 'Subtle',
    variant: 'subtle',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge7',
    value: 'Ghost → Soft',
    label: 'Ghost (maps to Soft)',
    variant: 'ghost',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge8',
    value: 'None → Soft',
    label: 'None (maps to Soft)',
    variant: 'none',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge9',
    value: 'Primary',
    label: 'Primary',
    color: 'primary',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge10',
    value: 'Secondary',
    label: 'Secondary',
    color: 'secondary',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge11',
    value: 'Success',
    label: 'Success',
    color: 'success',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge12',
    value: 'Info',
    label: 'Info',
    color: 'info',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge13',
    value: 'Warning',
    label: 'Warning',
    color: 'warning',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge14',
    value: 'Error',
    label: 'Error',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge15',
    value: 'Neutral',
    label: 'Neutral',
    color: 'neutral',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge16',
    value: 'Priority',
    label: 'With Badge Icon',
    badgeIcon: 'i-heroicons-exclamation-triangle',
    color: 'error',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'badge17',
    value: 'Verified',
    label: 'Verified Badge',
    badgeIcon: 'i-heroicons-check-badge',
    color: 'success',
    variant: 'subtle',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'orderStatus',
    value: 'Shipped',
    label: 'Order Status',
    color: 'info',
    variant: 'subtle',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'subscriptionTier',
    value: 'Premium',
    label: 'Subscription Tier',
    color: 'warning',
    variant: 'soft',
    badgeIcon: 'i-heroicons-star',
  },
  {
    $formkit: 'nuxtUIOutputBadge',
    name: 'priorityLevel',
    value: 'High',
    label: 'Priority Level',
    color: 'error',
    variant: 'solid',
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputBadge Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputBadge component displays a single value as a read-only status badge.
        </p>
        <p class="text-muted-foreground">
          Perfect for order status, subscription tiers, and priority levels. Not to be confused with OutputList's badge display mode, which renders an array of multiple badges.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            A string or numeric value rendered as a badge.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBadgeSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Variants
          </h2>
          <p class="text-muted-foreground mb-6">
            Solid, outline, soft, and subtle map directly to UBadge's own variants. Ghost and none (this library's variants with no UBadge equivalent) both map to soft.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBadgeSchema.slice(2, 8)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Colors
          </h2>
          <p class="text-muted-foreground mb-6">
            All semantic colors are supported.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBadgeSchema.slice(8, 15)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Badge Icon
          </h2>
          <p class="text-muted-foreground mb-6">
            Use <code>badgeIcon</code> to render an icon inside the badge pill itself.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBadgeSchema.slice(15, 17)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples combining color, variant, and icon for common use cases.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputBadgeSchema.slice(17, 20)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
