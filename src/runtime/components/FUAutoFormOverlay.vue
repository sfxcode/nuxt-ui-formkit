<script setup lang='ts'>
import type { PropType } from 'vue'
import type { AutoFormOverrides, ValibotLikeSchema, ZodLikeSchema } from '../composables/useFormKitAutoForm'
import { getNode } from '@formkit/core'
import { useOverlayCloseResolution } from '../utils/useOverlayCloseResolution'
import FUAutoForm from './FUAutoForm.vue'
import OverlayDiscardConfirm from './OverlayDiscardConfirm.vue'

// Internal - the `FUAutoForm` counterpart to `FUDataEditOverlay.vue`,
// satisfying the same `useOverlay` registration contract. Not meant to be
// imported directly by consumers - `useFormKitOverlay`'s `auto()` is the
// public entry point.
const props = defineProps({
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
  confirmDiscard: {
    type: Boolean,
    default: false,
  },
})

// `after:leave` is deliberately left undeclared here - see
// `FUDataEditOverlay.vue`'s identical comment; the same attrs-fallthrough
// reasoning applies unchanged.
const emit = defineEmits<{ close: [value: unknown] }>()
const open = defineModel<boolean>('open', { default: false })

// Read at the moment of dismissal (not as a reactive subscription): this one
// wrapper instance is reused across `edit()`/`auto()` calls, each with its own
// fresh form `id`, so the node to check is whichever `props.id` is current.
const { resolveOnce, confirming, requestClose, onUpdateOpen, discard, keepEditing } = useOverlayCloseResolution(open, emit, {
  shouldConfirm: () => props.confirmDiscard && !!getNode(props.id)?.context?.state.dirty,
})

function handleSaved(savedData: unknown) {
  resolveOnce(savedData)
}

function handleCancel() {
  requestClose()
}
</script>

<template>
  <UModal
    v-if="as === 'modal'"
    :open="open"
    :title="title"
    @update:open="onUpdateOpen"
  >
    <template #body>
      <FUAutoForm
        :id="id"
        :dirty-behavior="confirmDiscard ? 'compare' : undefined"
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
      <OverlayDiscardConfirm
        v-if="confirming"
        @discard="discard"
        @keep="keepEditing"
      />
    </template>
  </UModal>
  <USlideover
    v-else
    :open="open"
    :title="title"
    @update:open="onUpdateOpen"
  >
    <template #body>
      <FUAutoForm
        :id="id"
        :dirty-behavior="confirmDiscard ? 'compare' : undefined"
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
      <OverlayDiscardConfirm
        v-if="confirming"
        @discard="discard"
        @keep="keepEditing"
      />
    </template>
  </USlideover>
</template>
