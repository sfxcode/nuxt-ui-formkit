<script setup lang="ts">
// SSR fixture for the date, time and calendar inputs, outside `<ClientOnly>`. Used by the SSR
// smoke test (`npm run test:e2e:ssr`, see e2e/), which runs the server and the browser in
// time zones 26 hours apart, so a value or default that depends on the zone shows up.
// 2020-12-12T23:30:00Z is Dec 13 in UTC+14 and Dec 12 in UTC-12.
const instant = new Date(Date.UTC(2020, 11, 12, 23, 30))

const schema = [
  { $formkit: 'nuxtUIInputDate', name: 'jsDate', label: 'JS Date', valueType: 'date' },
  { $formkit: 'nuxtUIInputDate', name: 'isoZoned', label: 'ISO with zone', valueType: 'iso' },
  { $formkit: 'nuxtUIInputDate', name: 'isoDay', label: 'ISO day', valueType: 'iso' },
  { $formkit: 'nuxtUIInputDate', name: 'explicit', label: 'Explicit zone', valueType: 'date', timeZone: 'UTC' },
  { $formkit: 'nuxtUIInputDate', name: 'empty', label: 'Empty date' },
  { $formkit: 'nuxtUIInputTime', name: 'time', label: 'Time' },
  { $formkit: 'nuxtUICalendar', name: 'calEmpty', label: 'Calendar (no value)' },
  { $formkit: 'nuxtUICalendar', name: 'calDate', label: 'Calendar (JS Date)', valueType: 'date' },
]

const data = ref({
  jsDate: instant,
  isoZoned: '2020-12-12T23:30:00Z',
  isoDay: '2020-12-12',
  explicit: instant,
  calDate: instant,
})
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">
      SSR: dates
    </h1>
    <FUDataEdit
      id="ssr-dates-form"
      v-model="data"
      :schema="schema"
    />
  </UContainer>
</template>
