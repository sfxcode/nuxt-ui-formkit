<script setup lang='ts'>
import type { FormKitSchemaDefinition } from '@formkit/core'
import type { PropType } from 'vue'
import { FormKitSchema } from '@formkit/vue'
import FuDataDebug from './FUDataDebug.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  schema: {
    type: Object as PropType<FormKitSchemaDefinition>,
    default: null,
  },
  formClass: {
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

const formSchema = ref(props.schema)

const formData = defineModel<FormKitSchemaDefinition>()

// Watch for changes to props and update internal refs
watch(() => props.schema, (newSchema: FormKitSchemaDefinition) => {
  formSchema.value = newSchema
}, { deep: true })

watch(() => props.data, (newData: object) => {
  if (newData && newData !== formData.value) {
    formData.value = newData
  }
}, { deep: true })

if (props.data) {
  formData.value = props.data
}
</script>

<template>
  <div class="formkit-data-view">
    <FormKit
      v-model="formData"
      :actions="false"
      :form-class="formClass"
      type="form"
    >
      <FormKitSchema
        v-if="schema"
        :schema="schema"
        :data="formData"
      />
    </FormKit>

    <slot />
    <FuDataDebug
      v-if="debugData"
      :data="formData"
      header="Debug Data"
    />
    <FuDataDebug
      v-if="debugSchema"
      :data="schema as object"
      header="Debug Schema"
    />
  </div>
</template>

<style scoped>

</style>
