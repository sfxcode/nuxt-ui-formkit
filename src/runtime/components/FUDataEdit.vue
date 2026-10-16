<script setup lang='ts'>
import type { FormKitSchemaDefinition } from '@formkit/core'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { PropType } from 'vue'
import type { AutosaveOptions } from '../formkit/plugins/autosave'
import { reset } from '@formkit/core'
import { FormKit, FormKitMessages, FormKitSchema, useFormKitContextById } from '@formkit/vue'
import { computed, onScopeDispose, ref, watch } from 'vue'

import { createAutosavePlugin } from '../formkit/plugins/autosave'
import { attachStandardSchema } from '../composables/useFormKitStandardSchema'
import { withNodeKeys } from '../utils/withNodeKeys'
import FUDataDebug from './FUDataDebug.vue'

const props = defineProps({
  id: {
    type: String,
    default: 'formkit_form',
  },
  data: {
    type: Object as PropType<Record<string, unknown>>,
    default: null,
  },
  schema: {
    type: Object as PropType<FormKitSchemaDefinition>,
    default: null,
  },
  standardSchema: {
    type: Object as PropType<StandardSchemaV1>,
    default: null,
  },
  // A string is the draft's localStorage key; an object also sets
  // debounce/maxAge/clearOnSubmit (see `createAutosavePlugin`).
  autosave: {
    type: [String, Object] as PropType<string | AutosaveOptions>,
    default: null,
  },
  // FormKit's own default is 'touched' (dirty stays true once edited);
  // 'compare' makes `state.dirty` track the live difference from the initial value.
  dirtyBehavior: {
    type: String as PropType<'touched' | 'compare'>,
    default: 'touched',
  },
  formClass: {
    type: String,
    default: '',
  },
  actionsClass: {
    type: String,
    default: '',
  },
  submitSeverity: {
    type: String,
    default: '',
  },
  submitClass: {
    type: String,
    default: '',
  },
  submitLabel: {
    type: String,
    default: 'Save',
  },
  submitIcon: {
    type: String,
    default: '',
  },
  showReset: {
    type: Boolean,
    default: false,
  },
  resetSeverity: {
    type: String,
    default: 'danger',
  },
  resetLabel: {
    type: String,
    default: 'Reset',
  },
  resetClass: {
    type: String,
    default: '',
  },
  resetIcon: {
    type: String,
    default: '',
  },
  debugData: {
    type: Boolean,
    default: false,
  },
  debugSchema: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['dataSaved', 'onReset'])

let detachStandardSchema: (() => void) | undefined
useFormKitContextById(props.id, (context) => {
  if (props.standardSchema)
    detachStandardSchema = attachStandardSchema(context.node, props.standardSchema)
})
onScopeDispose(() => detachStandardSchema?.())

// Built once per mount: the plugin loads the saved draft in the form node's
// `created` hook, so it must be on the node from the start.
const autosavePlugins = props.autosave
  ? [createAutosavePlugin(typeof props.autosave === 'string' ? { key: props.autosave } : props.autosave)]
  : []

const formSchema = ref(props.schema)
// Keyed per field, so a field whose type changes is rendered afresh (see `withNodeKeys`).
const keyedSchema = computed(() => withNodeKeys(formSchema.value))

const formData = defineModel<Record<string, unknown>>()

// Watch for changes to props and update internal refs
watch(() => props.schema, (newSchema: FormKitSchemaDefinition) => {
  formSchema.value = newSchema
}, { deep: true })

watch(() => props.data, (newData: Record<string, unknown>) => {
  if (newData && newData !== formData.value) {
    formData.value = newData
  }
}, { deep: true })

if (props.data) {
  formData.value = props.data
}

function handleSave() {
  // `FormKitSchema` mutates whatever object it's given as `:data` in place,
  // adding its own internal `slots` key (see `node_modules/@formkit/vue`'s
  // `FormKitSchema` setup) - since that's the same `formData` object bound
  // via `v-model` above, strip it back out before handing the value to
  // consumers via `dataSaved`.
  const { slots: _slots, ...data } = (formData.value ?? {}) as Record<string, unknown>
  emit('dataSaved', data)
}

function handleReset() {
  reset(props.id)
  emit('onReset')
}
</script>

<template>
  <div class="formkit-data-edit">
    <FormKit
      :id="id"
      v-model="formData"
      :dirty-behavior="dirtyBehavior"
      :name="autosave ? id : undefined"
      :plugins="autosavePlugins"
      :form-class="formClass"
      :actions-class="actionsClass"
      type="form"
      @submit="handleSave"
    >
      <template #default>
        <FormKitSchema
          v-if="formSchema"
          :schema="keyedSchema"
          :data="formData"
        />
        <slot />
      </template>
      <template #messages>
        <slot name="messages">
          <FormKitMessages class="p-formkit-data-edit-messages" />
        </slot>
      </template>
      <template #submit>
        <slot name="submit">
          <UButton
            :icon="submitIcon"
            type="submit"
            :label="submitLabel"
            :class="submitClass"
            :severity="submitSeverity"
            @submit="handleSave"
          />
          <UButton
            v-if="showReset"
            type="reset"
            :icon="resetIcon"
            :label="resetLabel"
            :class="resetClass"
            :severity="resetSeverity"
            @click="handleReset"
          />
        </slot>
      </template>
    </FormKit>
    <FUDataDebug
      v-if="debugData"
      :data="formData"
      header="Debug Data"
    />
    <FUDataDebug
      v-if="debugSchema"
      :data="formSchema as object"
      header="Debug Schema"
    />
  </div>
</template>

<style scoped>

</style>
