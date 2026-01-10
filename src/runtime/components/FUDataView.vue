<script setup lang='ts'>
import type { FormKitSchemaDefinition } from '@formkit/core'
import type { PropType } from 'vue'
import { FormKit, FormKitSchema } from '@formkit/vue'
import FuDataDebug from './FUDataDebug.vue'

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

const formData = defineModel<any>()

if (props.data) {
  formData.value = props.data
}
</script>

<template>
  <div class="p-formkit-data-view">
    <FormKit
      v-model="formData"
      type="form"
      :form-class="formClass"
      :actions="false"
    >
      <FormKitSchema
        v-if="schema"
        :schema="schema"
        :data="formData"
      />
      <slot />
    </FormKit>
    <FuDataDebug
      v-if="debugData"
      :data="formData"
      header="Data"
    />
    <FuDataDebug
      v-if="debugSchema"
      :data="schema as object"
      header="Schema"
    />
  </div>
</template>

<style scoped>

</style>
