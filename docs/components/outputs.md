---
title: Output Components
description: Display-only components for rendering read-only data with custom formatting - fully integrated with schemas.
---

## Overview

Output components render data in read-only mode with beautiful formatting. Perfect for dashboards, profile pages, and data visualization - all fully integrated with schemas.

::: info
**Schema-First:** Output components work seamlessly with `FUDataView` for creating display-only forms from schemas.
:::

## Text Outputs

### nuxtUIOutputText

Display text with style customization and icons.

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'userName',
    label: 'Username',
    leadingIcon: 'i-lucide-user',
    color: 'primary',
    size: 'lg'
  }
]
```

**Complete Example:**

```vue
<template>
  <FUDataView :data="userData" :schema="displaySchema" />
</template>

<script setup lang="ts">
const userData = ref({
  userName: 'johndoe',
  fullName: 'John Doe'
})

const displaySchema = [
  {
    $formkit: 'nuxtUIOutputText',
    name: 'userName',
    label: 'Username',
    leadingIcon: 'i-lucide-user'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'fullName',
    label: 'Full Name',
    leadingIcon: 'i-lucide-id-card',
    size: 'lg'
  }
]
</script>
```

**Key Props:**
- `leadingIcon` - Icon before text
- `trailingIcon` - Icon after text
- `color` - Text color
- `size` - Text size

### nuxtUIOutputLink

Display URLs with automatic link generation.

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'website',
    label: 'Website',
    leadingIcon: 'i-lucide-link',
    target: '_blank'
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'email',
    label: 'Email',
    leadingIcon: 'i-lucide-mail',
    target: '_blank'
  }
]
```

**Key Props:**
- `target` - Link target (_blank, _self)
- `external` - Mark as external link
- `leadingIcon` - Icon before link

## Formatted Outputs

### nuxtUIOutputNumber

Display numbers with advanced formatting (currency, percentage, decimal).

**Schema Example:**

```typescript
const schema = [
  // Currency
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'price',
    label: 'Price',
    formatOptions: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }
  },
  
  // Percentage
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'growth',
    label: 'Growth Rate',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 1
    }
  },
  
  // Decimal
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'rating',
    label: 'Rating',
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }
  }
]
```

**Complete Dashboard Example:**

```vue
<template>
  <FUDataView :data="metrics" :schema="metricsSchema" />
</template>

<script setup lang="ts">
const metrics = ref({
  revenue: 125430.50,
  profit: 42150.25,
  growth: 0.234,
  conversionRate: 0.0453,
  customers: 1250
})

const metricsSchema = [
  {
    $el: 'h3',
    children: 'Financial Metrics',
    attrs: { class: 'text-xl font-bold mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'revenue',
    label: 'Total Revenue',
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'profit',
    label: 'Net Profit',
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    }
  },
  {
    $el: 'h3',
    children: 'Performance Metrics',
    attrs: { class: 'text-xl font-bold mt-6 mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'growth',
    label: 'Growth Rate',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 1
    }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'conversionRate',
    label: 'Conversion Rate',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 2
    }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'customers',
    label: 'Total Customers',
    formatOptions: {
      useGrouping: true
    }
  }
]
</script>
```

### nuxtUIOutputDate

Display dates and times with customizable formatting.

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'createdAt',
    label: 'Created',
    format: 'PPP' // October 14, 2023
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'updatedAt',
    label: 'Last Updated',
    format: 'Pp', // Oct 14, 2023, 3:30 PM
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'lastLogin',
    label: 'Last Login',
    relative: true // "2 hours ago"
  }
]
```

**Format Options:**
- `PP` - Oct 14, 2023
- `PPP` - October 14, 2023
- `PPPP` - Saturday, October 14, 2023
- `Pp` - Oct 14, 2023, 3:30 PM
- `relative: true` - Relative time (e.g., "2 hours ago")

### nuxtUIOutputBoolean

Display boolean values with custom text and icons.

**Schema Example:**

```typescript
const schema = [
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isActive',
    label: 'Status',
    trueValue: 'Active',
    falseValue: 'Inactive',
    trueIcon: 'i-lucide-check-circle',
    falseIcon: 'i-lucide-x-circle',
    trueColor: 'green',
    falseColor: 'red'
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isPremium',
    label: 'Account Type',
    trueValue: 'Premium',
    falseValue: 'Free',
    trueIcon: 'i-lucide-star',
    falseIcon: 'i-lucide-user'
  }
]
```

## Collection Outputs

### nuxtUIOutputList

Display arrays/lists with various styles.

**Schema Example:**

```typescript
const schema = [
  // Badge style
  {
    $formkit: 'nuxtUIOutputList',
    name: 'skills',
    label: 'Skills',
    listType: 'badge',
    color: 'primary'
  },
  
  // Bullet list
  {
    $formkit: 'nuxtUIOutputList',
    name: 'features',
    label: 'Features',
    listType: 'ul'
  },
  
  // Numbered list
  {
    $formkit: 'nuxtUIOutputList',
    name: 'steps',
    label: 'Steps',
    listType: 'ol'
  },
  
  // Comma-separated
  {
    $formkit: 'nuxtUIOutputList',
    name: 'categories',
    label: 'Categories',
    listType: 'inline',
    separator: ' • '
  }
]
```

**Complete Example:**

```vue
<template>
  <FUDataView :data="projectData" :schema="projectSchema" />
</template>

<script setup lang="ts">
const projectData = ref({
  technologies: ['Vue', 'Nuxt', 'TypeScript', 'FormKit', 'TailwindCSS'],
  features: ['Authentication', 'Real-time updates', 'Dark mode', 'Mobile responsive'],
  milestones: ['Design phase', 'Development', 'Testing', 'Deployment'],
  tags: ['Open Source', 'SaaS', 'Enterprise']
})

const projectSchema = [
  {
    $formkit: 'nuxtUIOutputList',
    name: 'technologies',
    label: 'Technologies',
    listType: 'badge',
    color: 'blue'
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'features',
    label: 'Key Features',
    listType: 'ul'
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'milestones',
    label: 'Project Milestones',
    listType: 'ol'
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'tags',
    label: 'Tags',
    listType: 'inline',
    separator: ' • '
  }
]
</script>
```

## Complete User Profile Example

Here's a comprehensive example combining all output types:

```vue
<template>
  <UContainer>
    <div class="max-w-4xl mx-auto my-8">
      <h1 class="text-3xl font-bold mb-8">User Profile</h1>
      
      <FUDataView
        :data="userProfile"
        :schema="profileSchema"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const userProfile = ref({
  // Personal Info
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  website: 'https://johndoe.com',
  
  // Metrics
  salary: 125000,
  performance: 0.95,
  tasksCompleted: 342,
  
  // Dates
  joinDate: new Date('2023-01-15'),
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  
  // Status
  isActive: true,
  isPremium: true,
  
  // Collections
  skills: ['Vue', 'Nuxt', 'TypeScript', 'Node.js', 'PostgreSQL'],
  languages: ['English', 'Spanish', 'French'],
  achievements: ['Employee of the Month', 'Innovation Award', 'Team Lead']
})

const profileSchema = [
  // Personal Information
  {
    $el: 'h2',
    children: 'Personal Information',
    attrs: { class: 'text-2xl font-semibold mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'fullName',
    label: 'Full Name',
    leadingIcon: 'i-lucide-user',
    size: 'lg'
  },
  {
    $formkit: 'nuxtUIOutputText',
    name: 'username',
    label: 'Username',
    leadingIcon: 'i-lucide-at-sign'
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'email',
    label: 'Email',
    leadingIcon: 'i-lucide-mail',
    target: '_blank'
  },
  {
    $formkit: 'nuxtUIOutputLink',
    name: 'website',
    label: 'Website',
    leadingIcon: 'i-lucide-globe',
    target: '_blank'
  },
  
  // Performance Metrics
  {
    $el: 'h2',
    children: 'Performance Metrics',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'salary',
    label: 'Annual Salary',
    formatOptions: {
      style: 'currency',
      currency: 'USD'
    }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'performance',
    label: 'Performance Rating',
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 0
    }
  },
  {
    $formkit: 'nuxtUIOutputNumber',
    name: 'tasksCompleted',
    label: 'Tasks Completed',
    formatOptions: {
      useGrouping: true
    }
  },
  
  // Timeline
  {
    $el: 'h2',
    children: 'Timeline',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'joinDate',
    label: 'Join Date',
    format: 'PPP'
  },
  {
    $formkit: 'nuxtUIOutputDate',
    name: 'lastLogin',
    label: 'Last Login',
    relative: true
  },
  
  // Status
  {
    $el: 'h2',
    children: 'Status',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isActive',
    label: 'Account Status',
    trueValue: 'Active',
    falseValue: 'Inactive',
    trueIcon: 'i-lucide-check-circle',
    falseIcon: 'i-lucide-x-circle',
    trueColor: 'green',
    falseColor: 'red'
  },
  {
    $formkit: 'nuxtUIOutputBoolean',
    name: 'isPremium',
    label: 'Membership',
    trueValue: 'Premium',
    falseValue: 'Standard',
    trueIcon: 'i-lucide-star',
    falseIcon: 'i-lucide-user'
  },
  
  // Skills & Achievements
  {
    $el: 'h2',
    children: 'Skills & Achievements',
    attrs: { class: 'text-2xl font-semibold mt-8 mb-4' }
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'skills',
    label: 'Technical Skills',
    listType: 'badge',
    color: 'primary'
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'languages',
    label: 'Languages',
    listType: 'inline',
    separator: ' • '
  },
  {
    $formkit: 'nuxtUIOutputList',
    name: 'achievements',
    label: 'Achievements',
    listType: 'ul'
  }
]
</script>
```

## Common Props

All output components support:

- `name` (required) - Field name in data object
- `label` - Display label
- `help` - Help text below value
- `color` - Component color
- `size` - Component size

## Use Cases

- ✅
- **User Profiles** - Display user information cleanly
- **Dashboards** - Show metrics with proper formatting
- **Detail Views** - Present record details in read-only mode
- **Reports** - Format and display report data
- **Admin Panels** - View data before editing
:::

## Next Steps

<CardGrid>
  <Card title="Input Components" icon="i-lucide-folder-input" to="/components/inputs">
    Editable form components with schemas
  </Card>

  <Card title="Examples" icon="i-lucide-code" to="/examples">
    Real-world schema-based examples
  </Card>

  <Card title="API Reference" icon="i-lucide-book" to="/api/utilities">
    Composables and utilities
  </Card>
</CardGrid>

