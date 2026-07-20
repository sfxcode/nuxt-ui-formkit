<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const outputUserSchema = [
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user1',
    label: 'Basic Profile',
    value: {
      name: 'Jane Doe',
      description: 'Software Engineer',
      avatar: { src: 'https://i.pravatar.cc/150?u=jane' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user2',
    label: 'Text Avatar (Initials)',
    value: {
      name: 'Michael Chen',
      description: 'Product Manager',
      avatar: { text: 'MC' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user3',
    label: 'Online Status',
    chip: true,
    value: {
      name: 'Amara Okafor',
      description: 'Online now',
      avatar: { src: 'https://i.pravatar.cc/150?u=amara' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user4',
    label: 'Custom Chip Color',
    chip: { color: 'error' },
    value: {
      name: 'Liam O\'Brien',
      description: 'Away',
      avatar: { src: 'https://i.pravatar.cc/150?u=liam' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user5',
    label: 'Horizontal (Default)',
    orientation: 'horizontal',
    value: {
      name: 'Sofia Rossi',
      description: 'Designer',
      avatar: { src: 'https://i.pravatar.cc/150?u=sofia' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user6',
    label: 'Vertical',
    orientation: 'vertical',
    value: {
      name: 'David Kim',
      description: 'Marketing',
      avatar: { src: 'https://i.pravatar.cc/150?u=david' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user7',
    label: 'Extra Small',
    size: 'xs',
    value: { name: 'Extra Small', description: 'xs size', avatar: { text: 'XS' } },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user8',
    label: 'Small',
    size: 'sm',
    value: { name: 'Small', description: 'sm size', avatar: { text: 'SM' } },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user9',
    label: 'Medium (Default)',
    size: 'md',
    value: { name: 'Medium', description: 'md size', avatar: { text: 'MD' } },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user10',
    label: 'Large',
    size: 'lg',
    value: { name: 'Large', description: 'lg size', avatar: { text: 'LG' } },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'user11',
    label: 'Extra Large',
    size: 'xl',
    value: { name: 'Extra Large', description: 'xl size', avatar: { text: 'XL' } },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'articleAuthor',
    label: 'Written By',
    value: {
      name: 'Sarah Wilson',
      description: 'Published 2 days ago',
      avatar: { src: 'https://i.pravatar.cc/150?u=sarah' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'taskAssignee',
    label: 'Assigned To',
    chip: true,
    value: {
      name: 'Alex Kim',
      description: 'Backend Team',
      avatar: { text: 'AK' },
    },
  },
  {
    $formkit: 'nuxtUIOutputUser',
    name: 'featuredMember',
    label: 'Featured Member',
    leadingIcon: 'i-heroicons-star',
    color: 'warning',
    value: {
      name: 'Priya Patel',
      description: 'Top Contributor',
      avatar: { text: 'PP' },
    },
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          OutputUser Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The OutputUser component displays a name, description, and avatar together as a read-only profile entry.
        </p>
        <p class="text-muted-foreground">
          Perfect for author bylines, assignee displays, and team member cards. Unlike other Output components, its field value is an object: <code>{ name, description, avatar }</code>.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            An avatar image or initials, alongside a name and description.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputUserSchema.slice(0, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Chip (Status Indicator)
          </h2>
          <p class="text-muted-foreground mb-6">
            Overlay a status chip on the avatar with <code>chip: true</code>, or customize it with a chip props object.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputUserSchema.slice(2, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Orientation
          </h2>
          <p class="text-muted-foreground mb-6">
            Render horizontally (default) or vertically.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputUserSchema.slice(4, 6)"
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
            :schema="outputUserSchema.slice(6, 11)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Real-World Examples
          </h2>
          <p class="text-muted-foreground mb-6">
            Practical examples for author bylines, assignee displays, and team member cards.
          </p>
          <FUDataView
            :data="{}"
            :schema="outputUserSchema.slice(11, 14)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
