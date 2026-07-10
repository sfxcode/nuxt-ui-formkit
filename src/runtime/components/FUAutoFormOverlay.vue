<script setup lang='ts'>
import type { PropType } from 'vue'
import type { AutoFormOverrides, ValibotLikeSchema, ZodLikeSchema } from '../composables/useFormKitAutoForm'
import { useOverlayCloseResolution } from '../utils/useOverlayCloseResolution'
import FUAutoForm from './FUAutoForm.vue'

// Internal - the `FUAutoForm` counterpart to `FUDataEditOverlay.vue`,
// satisfying the same `useOverlay` registration contract. Not meant to be
// imported directly by consumers - `useFormKitOverlay`'s `auto()` is the
// public entry point.
defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: null,
  },
  valibotSchema: {
    type: Object as PropType<ValibotLikeSchema>,
    default: undefined,
  },
  zodSchema: {
    type: Object as PropType<ZodLikeSchema>,
    default: undefined,
  },
  overrides: {
    type: Object as PropType<AutoFormOverrides>,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  as: {
    type: String as PropType<'modal' | 'slideover'>,
    default: 'modal',
  },
})

// `after:leave` is deliberately left undeclared here - see
// `FUDataEditOverlay.vue`'s identical comment; the same attrs-fallthrough
// reasoning applies unchanged.
const emit = defineEmits<{ close: [value: unknown] }>()
const open = defineModel<boolean>('open', { default: false })

const { resolveOnce } = useOverlayCloseResolution(open, emit)

function handleSaved(savedData: unknown) {
  resolveOnce(savedData)
}

function handleCancel() {
  resolveOnce(null)
}
</script>

<template>
  <UModal
    v-if="as === 'modal'"
    v-model:open="open"
    :title="title"
  >
    <template #body>
      <FUAutoForm
        :id="id"
        :data="data"
        :valibot-schema="valibotSchema"
        :zod-schema="zodSchema"
        :overrides="overrides"
        @data-saved="handleSaved"
      >
        <template #submit>
          <UButton
            type="submit"
            label="Save"
          />
          <UButton
            type="button"
            label="Cancel"
            color="neutral"
            variant="outline"
            @click="handleCancel"
          />
        </template>
      </FUAutoForm>
    </template>
  </UModal>
  <USlideover
    v-else
    v-model:open="open"
    :title="title"
  >
    <template #body>
      <FUAutoForm
        :id="id"
        :data="data"
        :valibot-schema="valibotSchema"
        :zod-schema="zodSchema"
        :overrides="overrides"
        @data-saved="handleSaved"
      >
        <template #submit>
          <UButton
            type="submit"
            label="Save"
          />
          <UButton
            type="button"
            label="Cancel"
            color="neutral"
            variant="outline"
            @click="handleCancel"
          />
        </template>
      </FUAutoForm>
    </template>
  </USlideover>
</template>
