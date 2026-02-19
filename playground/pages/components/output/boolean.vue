<script setup lang="ts">
import { ref } from 'vue'

const trueValue = ref(true)
const falseValue = ref(false)
</script>

<template>
  <div class="p-8 space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">
        FUOutputBoolean Examples
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Display boolean values with custom text and icons
      </p>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Basic Boolean Output
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Active Status (True)"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Active Status (False)"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Custom True/False Values
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Subscription Active"
          true-value="Active"
          false-value="Inactive"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Subscription Status"
          true-value="Active"
          false-value="Inactive"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Email Verified"
          true-value="Verified"
          false-value="Not Verified"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Payment Status"
          true-value="Paid"
          false-value="Unpaid"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          With Boolean Icons
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Task Completed"
          true-icon="i-heroicons-check-circle"
          false-icon="i-heroicons-x-circle"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Task Status"
          true-icon="i-heroicons-check-circle"
          false-icon="i-heroicons-x-circle"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Server Online"
          true-icon="i-heroicons-signal"
          false-icon="i-heroicons-signal-slash"
          true-value="Online"
          false-value="Offline"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Connection Status"
          true-icon="i-heroicons-wifi"
          false-icon="i-heroicons-wifi-slash"
          true-value="Connected"
          false-value="Disconnected"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          With Leading/Trailing Icons
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Account Verified"
          leading-icon="i-heroicons-shield-check"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Premium Member"
          trailing-icon="i-heroicons-star"
          true-value="Premium"
          false-value="Free"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Notifications"
          leading-icon="i-heroicons-bell"
          true-value="Enabled"
          false-value="Disabled"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Sizes
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Extra Small"
          size="xs"
          true-icon="i-heroicons-check-circle"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Small"
          size="sm"
          true-icon="i-heroicons-check-circle"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Medium (default)"
          size="md"
          true-icon="i-heroicons-check-circle"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Large"
          size="lg"
          true-icon="i-heroicons-check-circle"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Extra Large"
          size="xl"
          true-icon="i-heroicons-check-circle"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Variants and Colors
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Success Status"
          variant="soft"
          color="success"
          true-icon="i-heroicons-check-circle"
          true-value="Completed"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Error Status"
          variant="soft"
          color="error"
          false-icon="i-heroicons-x-circle"
          false-value="Failed"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Info Status"
          variant="outline"
          color="info"
          true-icon="i-heroicons-information-circle"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Warning Status"
          variant="soft"
          color="warning"
          false-icon="i-heroicons-exclamation-triangle"
          false-value="Pending"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Primary Status"
          variant="subtle"
          color="primary"
          true-value="Enabled"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Real-World Examples
        </h2>
      </template>

      <div class="space-y-4">
        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="2FA Enabled"
          true-icon="i-heroicons-lock-closed"
          false-icon="i-heroicons-lock-open"
          true-value="Protected"
          false-value="Not Protected"
          variant="soft"
          color="success"
        />

        <FormKit
          type="output-boolean"
          :value="falseValue"
          label="Auto-Renewal"
          true-icon="i-heroicons-arrow-path"
          false-icon="i-heroicons-pause-circle"
          true-value="On"
          false-value="Off"
          variant="soft"
          color="info"
        />

        <FormKit
          type="output-boolean"
          :value="trueValue"
          label="Dark Mode"
          true-icon="i-heroicons-moon"
          false-icon="i-heroicons-sun"
          true-value="Dark"
          false-value="Light"
        />

        <FormKit
          type="output-boolean"
          :value="false"
          label="Maintenance Mode"
          true-icon="i-heroicons-wrench-screwdriver"
          false-icon="i-heroicons-check-badge"
          true-value="Under Maintenance"
          false-value="Operational"
          variant="soft"
          color="warning"
        />
      </div>
    </UCard>
  </div>
</template>
