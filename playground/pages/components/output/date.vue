<script setup lang="ts">
const dateValue = ref(new Date())
const pastDate = ref(new Date('2024-01-15'))
const futureDate = ref(new Date('2027-12-25'))
const yesterday = ref(new Date(Date.now() - 86400000))
const lastWeek = ref(new Date(Date.now() - 7 * 86400000))
const lastMonth = ref(new Date(Date.now() - 30 * 86400000))
const oneHourAgo = ref(new Date(Date.now() - 3600000))
const fiveMinutesAgo = ref(new Date(Date.now() - 300000))
</script>

<template>
  <div class="p-8 space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">
        FUOutputDate Examples
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Using NuxtTime for date formatting
      </p>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Date Styles
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="Short Date"
          date-style="short"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Medium Date (default)"
          date-style="medium"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Long Date"
          date-style="long"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Full Date"
          date-style="full"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Date with Time
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="Short Time"
          date-style="medium"
          time-style="short"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Medium Time"
          date-style="medium"
          time-style="medium"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Long Time"
          date-style="long"
          time-style="long"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          With Icons
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="With Leading Icon"
          leading-icon="i-heroicons-calendar"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="With Trailing Icon"
          trailing-icon="i-heroicons-clock"
        />

        <FormKit
          type="output-date"
          :value="pastDate"
          label="Past Date"
          leading-icon="i-heroicons-arrow-left"
          variant="soft"
          color="info"
        />

        <FormKit
          type="output-date"
          :value="futureDate"
          label="Future Date"
          trailing-icon="i-heroicons-arrow-right"
          variant="soft"
          color="success"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Sizes and Variants
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="Extra Small"
          size="xs"
          leading-icon="i-heroicons-calendar"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Small"
          size="sm"
          leading-icon="i-heroicons-calendar"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Medium (default)"
          size="md"
          leading-icon="i-heroicons-calendar"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Large"
          size="lg"
          leading-icon="i-heroicons-calendar"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Extra Large"
          size="xl"
          leading-icon="i-heroicons-calendar"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Variants
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="Outline"
          variant="outline"
          color="primary"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Soft"
          variant="soft"
          color="primary"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Subtle"
          variant="subtle"
          color="primary"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Ghost"
          variant="ghost"
          color="primary"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Relative Time
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="fiveMinutesAgo"
          label="Recent Activity"
          relative
          leading-icon="i-heroicons-clock"
        />

        <FormKit
          type="output-date"
          :value="oneHourAgo"
          label="One Hour Ago"
          relative
          leading-icon="i-heroicons-clock"
        />

        <FormKit
          type="output-date"
          :value="yesterday"
          label="Yesterday"
          relative
          leading-icon="i-heroicons-calendar"
          variant="soft"
          color="info"
        />

        <FormKit
          type="output-date"
          :value="lastWeek"
          label="Last Week"
          relative
          leading-icon="i-heroicons-calendar"
          variant="soft"
          color="warning"
        />

        <FormKit
          type="output-date"
          :value="lastMonth"
          label="Last Month"
          relative
          leading-icon="i-heroicons-calendar-days"
          variant="soft"
          color="error"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Different Locales
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-date"
          :value="dateValue"
          label="English (US)"
          locale="en-US"
          date-style="full"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="German"
          locale="de-DE"
          date-style="full"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="French"
          locale="fr-FR"
          date-style="full"
        />

        <FormKit
          type="output-date"
          :value="dateValue"
          label="Japanese"
          locale="ja-JP"
          date-style="full"
        />
      </div>
    </UCard>
  </div>
</template>
