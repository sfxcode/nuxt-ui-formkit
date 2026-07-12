<script setup lang='ts'>
import type { FormKitSchemaNode } from '@formkit/core'
import type { PropType } from 'vue'
import type { AutoFormOverrides, ValibotLikeSchema, ZodLikeSchema } from '../composables/useFormKitAutoForm'
import { ref, watch } from 'vue'
import { inferFormSchema, inferFormSchemaFromSamples, inferFormSchemaFromValibot, inferFormSchemaFromZod } from '../composables/useFormKitAutoForm'
import FUDataEdit from './FUDataEdit.vue'

// All FUDataEdit props/listeners pass through via $attrs instead of being
// redeclared here.
defineOptions({ inheritAttrs: false })

const props = defineProps({
  data: {
    type: [Object, Array] as PropType<Record<string, unknown> | Record<string, unknown>[]>,
    default: null,
  },
  overrides: {
    type: Object as PropType<AutoFormOverrides>,
    default: undefined,
  },
  valibotSchema: {
    type: Object as PropType<ValibotLikeSchema>,
    default: undefined,
  },
  zodSchema: {
    type: Object as PropType<ZodLikeSchema>,
    default: undefined,
  },
})

const formData = defineModel<Record<string, unknown>>()

// An array of samples is schema-inference input, not the live form value.
if (!formData.value && props.data && !Array.isArray(props.data)) {
  formData.value = props.data
}

function buildSchema(data: object | null): FormKitSchemaNode[] {
  if (props.valibotSchema) {
    return inferFormSchemaFromValibot(props.valibotSchema, props.overrides)
  }
  if (props.zodSchema) {
    return inferFormSchemaFromZod(props.zodSchema, props.overrides)
  }
  if (Array.isArray(data)) {
    return inferFormSchemaFromSamples(data as Record<string, unknown>[], props.overrides)
  }
  return inferFormSchema((data ?? formData.value ?? {}) as Record<string, unknown>, props.overrides)
}

// Shallow watch by design: the schema is re-inferred when the
// data/overrides/valibotSchema/zodSchema references change, never on
// keystroke mutations - a rebuilt schema array would re-render
// FormKitSchema and drop input focus.
const formSchema = ref<FormKitSchemaNode[]>(buildSchema(props.data))

watch([() => props.data, () => props.overrides, () => props.valibotSchema, () => props.zodSchema], ([data]) => {
  formSchema.value = buildSchema(data)
})
</script>

<template>
  <FUDataEdit
    v-bind="$attrs"
    v-model="formData"
    :schema="formSchema"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps ?? {}"
      />
    </template>
  </FUDataEdit>
</template>

<style scoped>

</style>
