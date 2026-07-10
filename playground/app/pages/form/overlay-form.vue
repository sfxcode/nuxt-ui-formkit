<script setup lang="ts">
// `useFormKitOverlay` is auto-imported (`src/module.ts` registers
// `./runtime/composables` via `addImportsDir`) - no explicit import needed
// in a real consuming app, same as `useFormKitForm`.
const overlay = useFormKitOverlay()

const as = ref<'modal' | 'slideover'>('modal')

interface Person {
  id: number
  name: string
  email: string
  role: string
}

const rows = ref<Person[]>([
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Engineer' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Admiral' },
  { id: 3, name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Mathematician' },
])

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name', validation: 'required' },
  { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', inputType: 'email', validation: 'required|email' },
  { $formkit: 'nuxtUIInput', name: 'role', label: 'Role', validation: 'required' },
]

async function editRow(index: number) {
  const result = await overlay.edit({
    data: rows.value[index],
    schema,
    title: `Edit ${rows.value[index]?.name}`,
    as: as.value,
  })

  if (result)
    rows.value[index] = result as Person
}

// No hand-written schema at all here - `auto()` infers one from the row's
// own data value shapes, the same `FUAutoForm`-backed path `/form/auto-form`
// demonstrates directly, driven through a modal/slideover instead.
async function autoEditRow(index: number) {
  const result = await overlay.auto({
    data: rows.value[index],
    title: `Edit ${rows.value[index]?.name} (auto-inferred)`,
    as: as.value,
  })

  if (result)
    rows.value[index] = result as Person
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        useFormKitOverlay Composable
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        <code>const result = await overlay.edit({ data, schema, title })</code> opens a <code>FUDataEdit</code> form in a modal or slideover, resolving with the saved data on Save or <code>null</code> on Cancel/Esc/backdrop dismissal.
      </p>
      <p class="text-muted-foreground">
        No hand-assembled open/close state, mount timing, or FormKit submit plumbing - just click Edit, await the result, and update the row if it isn't <code>null</code>. "Auto-Edit" uses <code>overlay.auto({ data, title })</code> instead, inferring the schema from the row's own data rather than the hand-written one above.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-6">
      <USelect
        v-model="as"
        :items="['modal', 'slideover']"
        class="w-40"
      />

      <div class="space-y-2">
        <div
          v-for="(row, index) in rows"
          :key="row.id"
          class="flex items-center justify-between gap-4 rounded-lg border border-default p-4"
        >
          <div>
            <p class="font-medium">
              {{ row.name }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ row.email }} · {{ row.role }}
            </p>
          </div>
          <div class="flex gap-2">
            <UButton
              label="Edit"
              icon="i-lucide-pencil"
              variant="outline"
              @click="editRow(index)"
            />
            <UButton
              label="Auto-Edit"
              icon="i-lucide-wand-sparkles"
              variant="outline"
              color="neutral"
              @click="autoEditRow(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
