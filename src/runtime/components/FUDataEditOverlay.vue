<script setup lang='ts'>
import type { FormKitSchemaDefinition } from '@formkit/core'
import type { PropType } from 'vue'
import { getNode } from '@formkit/core'
import { useOverlayCloseResolution } from '../utils/useOverlayCloseResolution'
import FUDataEdit from './FUDataEdit.vue'
import OverlayDiscardConfirm from './OverlayDiscardConfirm.vue'

// Internal - satisfies `useOverlay`'s registration contract (an `open`
// v-model plus an `emit('close', value)` `OverlayProvider.vue` listens for)
// so `useFormKitOverlay` (the public entry point) can register it via
// `useOverlay().create(FUDataEditOverlay, { props })`. Not meant to be
// imported directly by consumers.
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: null,
  },
  schema: {
    type: Object as PropType<FormKitSchemaDefinition>,
    default: null,
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

// `after:leave` is deliberately left undeclared here - `UModal` already
// emits it, and since it's our single root, Vue's default attrs fallthrough
// forwards a consumer's `@after:leave` listener straight onto it, exactly
// what `OverlayProvider.vue` needs. Declaring it here would turn it into a
// component-level emit subscription instead and break that.
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
      <FUDataEdit
        :id="id"
        :dirty-behavior="confirmDiscard ? 'compare' : undefined"
        :data="data"
        :schema="schema"
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
      </FUDataEdit>
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
      <FUDataEdit
        :id="id"
        :dirty-behavior="confirmDiscard ? 'compare' : undefined"
        :data="data"
        :schema="schema"
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
      </FUDataEdit>
      <OverlayDiscardConfirm
        v-if="confirming"
        @discard="discard"
        @keep="keepEditing"
      />
    </template>
  </USlideover>
</template>
