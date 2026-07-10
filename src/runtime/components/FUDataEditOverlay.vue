<script setup lang='ts'>
import type { FormKitSchemaDefinition } from '@formkit/core'
import type { PropType } from 'vue'
import { useOverlayCloseResolution } from '../utils/useOverlayCloseResolution'
import FUDataEdit from './FUDataEdit.vue'

// Internal - satisfies `useOverlay`'s registration contract (an `open`
// v-model plus an `emit('close', value)` `OverlayProvider.vue` listens for)
// so `useFormKitOverlay` (the public entry point) can register it via
// `useOverlay().create(FUDataEditOverlay, { props })`. Not meant to be
// imported directly by consumers.
defineProps({
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
})

// `after:leave` is deliberately left undeclared here - `UModal` already
// emits it, and since it's our single root, Vue's default attrs fallthrough
// forwards a consumer's `@after:leave` listener straight onto it, exactly
// what `OverlayProvider.vue` needs. Declaring it here would turn it into a
// component-level emit subscription instead and break that.
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
      <FUDataEdit
        :id="id"
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
    </template>
  </UModal>
  <USlideover
    v-else
    v-model:open="open"
    :title="title"
  >
    <template #body>
      <FUDataEdit
        :id="id"
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
    </template>
  </USlideover>
</template>
