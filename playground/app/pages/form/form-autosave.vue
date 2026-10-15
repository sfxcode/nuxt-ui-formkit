<script setup lang='ts'>
// `FUDataEdit`'s `autosave` prop wires `createAutosavePlugin` onto the form
// (and uses the form `id` as its `name`, which the plugin keys its stored
// entry on - keep it stable). `useFormKitForm` is auto-imported.
const FORM_ID = 'autosave-demo'
const DRAFT_KEY = 'profile-draft'
// Mirrors the plugin's `${prefix}-${key}-${node.name}` storage key.
const STORAGE_KEY = `nuxt-ui-formkit-${DRAFT_KEY}-${FORM_ID}`

const form = useFormKitForm(FORM_ID)

const data = ref({
  name: '',
  email: '',
  bio: '',
})

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name', validation: 'required' },
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', validation: 'required|email' },
  { $formkit: 'nuxtUITextarea', name: 'bio', label: 'Bio' },
]

const savedDraft = ref<string | null>(null)
const lastSaved = ref<unknown>(null)

function readDraft() {
  savedDraft.value = localStorage.getItem(STORAGE_KEY)
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  readDraft()
  timer = setInterval(readDraft, 500)
})
onBeforeUnmount(() => clearInterval(timer))

function handleSaved(saved: object) {
  lastSaved.value = saved
}

function clearDraft() {
  localStorage.removeItem(STORAGE_KEY)
  readDraft()
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Autosave
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        <code>FUDataEdit</code>'s <code>autosave</code> prop saves the form to <code>localStorage</code> as you type and restores it the next time it mounts.
      </p>
      <p class="text-muted-foreground">
        Type something, then reload the page - the draft comes back into the inputs and the form is dirty again. Submitting clears the saved draft (<code>clearOnSubmit</code>). The panel on the right shows the raw stored entry, polled twice a second.
      </p>
    </div>

    <USeparator class="my-8" />

    <ClientOnly>
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <FUDataEdit
            :id="FORM_ID"
            v-model="data"
            :schema="schema"
            :autosave="{ key: DRAFT_KEY, debounce: 300 }"
            @data-saved="handleSaved"
          />
          <div class="text-sm text-muted-foreground space-x-4 mt-4">
            <span>isDirty: <strong>{{ form.isDirty.value }}</strong></span>
            <span>isSubmitted: <strong>{{ form.isSubmitted.value }}</strong></span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h2 class="font-semibold">
                Stored draft
              </h2>
              <UButton
                label="Clear draft"
                color="neutral"
                variant="outline"
                size="sm"
                :disabled="!savedDraft"
                @click="clearDraft"
              />
            </div>
            <pre class="text-xs bg-muted rounded-md p-3 overflow-auto">{{ savedDraft ? JSON.stringify(JSON.parse(savedDraft), null, 2) : 'nothing saved' }}</pre>
          </div>
          <div v-if="lastSaved">
            <h2 class="font-semibold mb-2">
              Last submitted
            </h2>
            <pre class="text-xs bg-muted rounded-md p-3 overflow-auto">{{ JSON.stringify(lastSaved, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </ClientOnly>
  </UContainer>
</template>
