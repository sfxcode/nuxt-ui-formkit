<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitInputRatingProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  icon?: string
  emptyIcon?: string
  readonly?: boolean
  clearable?: boolean
  hoverable?: boolean
  length?: number
  step?: number
  defaultValue?: number
  name?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputRatingProps>,
    required: true,
  },
})

const { handleInput, handleChange, handleBlur, styleClass, color, modelValue, validSlotNames, ui } = useFormKitInput(props.context)

// `UInputRating` doesn't declare `blur` in its own emits - `@blur` below relies
// on its `inheritAttrs: false` + manual `$attrs` spread onto the internal
// `RatingRoot`, not a documented public contract. A future `@nuxt/ui`
// upgrade changing that internal detail is the expected failure mode if
// this ever silently regresses.
</script>

<template>
  <UInputRating
    :id="context.id"
    v-model="modelValue"
    :name="context.node.name"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :orientation="context.orientation ?? 'horizontal'"
    :icon="context.icon"
    :empty-icon="context.emptyIcon"
    :readonly="context.readonly"
    :clearable="context.clearable"
    :hoverable="context.hoverable"
    :length="context.length ?? 5"
    :step="context.step"
    :default-value="context.defaultValue"
    :ui="ui"
    @change="handleChange"
    @update:model-value="handleInput"
    @blur="handleBlur"
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
  </UInputRating>
</template>
