<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'

const { schemaToEditorData, editorDataToSchema, editorDataToJson, editorDataToCode } = useFormKitEditor()
const { editorSchema } = useFormKitEditorSchema()

const toast = useToast()

const initialField = {
  $formkit: 'nuxtUIInput',
  name: 'field',
  label: 'Example Field',
  placeholder: 'Type something…',
  validation: 'required',
}

const propertySchema = editorSchema()

const formKey = ref(0)
function createFormData() {
  return schemaToEditorData(initialField)
}
const formData = ref(createFormData())

function resetField() {
  formData.value = createFormData()
  formKey.value += 1
}

const generatedField = computed(() => editorDataToSchema(formData.value))
const generatedSchema = computed(() => [generatedField.value] as unknown as FormKitSchemaDefinition)

async function copyJson() {
  await navigator.clipboard.writeText(editorDataToJson(formData.value))
  toast.add({ title: 'Copied schema JSON to clipboard', icon: 'i-lucide-check', color: 'success' })
}

async function copyCode() {
  await navigator.clipboard.writeText(editorDataToCode(formData.value))
  toast.add({ title: 'Copied schema object to clipboard', icon: 'i-lucide-check', color: 'success' })
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Input Editor
      </h1>
      <p class="text-lg text-muted mb-2">
        A FormKit form that edits the properties of another FormKit field - pick a type, fill in its label,
        validation, and options, and watch the generated schema and live preview update as you type.
      </p>
      <p class="text-muted">
        <code>useFormKitEditor</code> converts between the edited form data and a real FormKit schema node;
        <code>useFormKitEditorSchema</code> builds the property-editor form itself.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
      <section class="min-w-0 flex-1">
        <h2 class="text-2xl font-semibold mb-4">
          Field Properties
        </h2>
        <div :key="formKey">
          <FUDataEdit
            id="input-editor-properties"
            v-model="formData"
            :schema="propertySchema"
          >
            <template #submit>
              <UButton
                label="Reset"
                icon="i-lucide-rotate-ccw"
                color="neutral"
                variant="outline"
                type="button"
                @click="resetField"
              />
            </template>
          </FUDataEdit>
        </div>
      </section>

      <div class="hidden w-px bg-default lg:block" />

      <section class="min-w-0 flex-1">
        <h2 class="text-2xl font-semibold mb-4">
          Live Preview
        </h2>
        <UCard class="mb-6">
          <div :key="formData._dollar_formkit">
            <FUDataEdit
              id="input-editor-preview"
              :schema="generatedSchema"
            >
              <template #submit>
                <UButton
                  label="Submit"
                  icon="i-lucide-check"
                  type="submit"
                />
              </template>
            </FUDataEdit>
          </div>
        </UCard>

        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-lg font-semibold">
            Generated Schema
          </h3>
          <div class="flex gap-2">
            <UButton
              label="Copy JSON"
              icon="i-lucide-braces"
              size="sm"
              variant="outline"
              color="neutral"
              @click="copyJson"
            />
            <UButton
              label="Copy Object"
              icon="i-lucide-code"
              size="sm"
              variant="outline"
              color="neutral"
              @click="copyCode"
            />
          </div>
        </div>
        <FUDataDebug
          :data="generatedField"
          header="Field Schema"
        />
      </section>
    </div>
  </UContainer>
</template>
