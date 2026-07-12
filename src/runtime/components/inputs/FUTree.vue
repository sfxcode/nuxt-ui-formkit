<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

export interface FormKitTreeProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  multiple?: boolean
  nested?: boolean
  virtualize?: boolean | { overscan?: number, estimateSize?: number | ((index: number) => number) }
  labelKey?: string
  trailingIcon?: string
  expandedIcon?: string
  collapsedIcon?: string
  expanded?: string[]
  defaultExpanded?: string[]
  selectionBehavior?: 'toggle' | 'replace'
  propagateSelect?: boolean
  bubbleSelect?: boolean
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitTreeProps>,
    required: true,
  },
})

const { handleInput, styleClass, color, modelValue, items, validSlotNames, ui } = useFormKitInput(props.context)

// `UTree` declares no `blur` emit - its root renders one real native
// `<button>` per visible item but wires no blur aggregation across them,
// structurally identical to `FUCheckboxGroup`/`FUListbox` (single mode).
// `@focusout` (which bubbles, unlike `blur`) plus a relatedTarget-outside-
// container check is what actually detects "focus left the whole tree."
const handleContainerBlur = createContainerBlurHandler(props.context)
</script>

<template>
  <UTree
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :items="items"
    :disabled="!!context?.disabled"
    :multiple="context.multiple"
    :nested="context.nested ?? true"
    :virtualize="context.virtualize"
    :label-key="context.labelKey"
    :trailing-icon="context.trailingIcon"
    :expanded-icon="context.expandedIcon"
    :collapsed-icon="context.collapsedIcon"
    :expanded="context.expanded"
    :default-expanded="context.defaultExpanded"
    :selection-behavior="context.selectionBehavior"
    :propagate-select="context.propagateSelect"
    :bubble-select="context.bubbleSelect"
    :ui="ui"
    @update:model-value="handleInput"
    @focusout="handleContainerBlur"
  >
    <template
      v-for="slotName in validSlotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <component
        :is="context?.slots[slotName]"
        v-bind="{ ...context, ...slotProps }"
      />
    </template>
  </UTree>
</template>
