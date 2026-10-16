<script setup lang="ts">
// SSR fixture for the composables: they are constructed while this page is server-rendered.
// `?edit=1` also calls `overlay.edit()` on the server, which has no user to answer it; the
// outcome is carried to the browser in Nuxt state so hydration renders the same text.
// Used by the SSR smoke test (`npm run test:e2e:ssr`, see e2e/).
const overlay = useFormKitOverlay()
// How many overlays are registered with Nuxt UI's store on the server. It must not grow with each
// request. Read once there and carried in Nuxt state: the browser registers its own, so printing
// the live number on both sides would itself be a hydration mismatch.
const registeredOverlays = useState<number>('ssr-composables-registered-overlays', () => useOverlay().overlays.length)
const form = useFormKitForm('ssr-composables-form')
const { inferFormSchema } = useFormKitAutoForm()
const route = useRoute()

const inferred = inferFormSchema({ name: 'Ada', age: 36 })
const outcome = useState<string>('ssr-composables-overlay-outcome', () => 'not called')

if (import.meta.server && route.query.edit === '1') {
  try {
    void overlay.edit({ data: { name: 'Ada' }, schema: [{ $formkit: 'nuxtUIInput', name: 'name', label: 'Name' }], title: 'Server edit' })
    outcome.value = 'returned a promise'
  }
  catch (error) {
    outcome.value = `threw: ${(error as Error).message}`
  }
}
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">
      SSR: composables
    </h1>
    <p data-overlay-outcome>
      {{ outcome }}
    </p>
    <p data-overlay-count>
      registered overlays: {{ registeredOverlays }}
    </p>
    <p data-form-state>
      isDirty: {{ form.isDirty.value }}, isSubmitted: {{ form.isSubmitted.value }}
    </p>
    <FormKit
      id="ssr-composables-form"
      type="form"
      :actions="false"
    >
      <FormKitSchema :schema="inferred" />
    </FormKit>
  </UContainer>
</template>
