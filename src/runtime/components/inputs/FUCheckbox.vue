<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitCheckboxProps {
  label?: string
  description?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'card' | 'list'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  indicator?: 'start' | 'end' | 'hidden'
  icon?: string
  indeterminateIcon?: string
  trueValue?: unknown
  falseValue?: unknown
  autofocus?: false | true | 'true' | 'false'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxProps>,
    required: true,
  },
})

const { handleInput, handleChange, handleBlur, styleClass, modelValue, color, validSlotNames } = useFormKitInput(props.context)

// `UCheckbox` doesn't declare `blur` in its own emits - `@blur` below relies
// on its `inheritAttrs: false` + manual `$attrs` spread onto the internal
// `CheckboxRoot`, not a documented public contract. A future `@nuxt/ui`
// upgrade changing that internal detail is the expected failure mode if
// this ever silently regresses.
</script>

<template>
  <UCheckbox
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :variant="context.variant"
    :label="context.label"
    :description="context.description"
    :indicator="context.indicator"
    :icon="context.icon"
    :indeterminate-icon="context.indeterminateIcon"
    :true-value="context.trueValue"
    :false-value="context.falseValue"
    :autofocus="context.autofocus"
    :ui="context.ui"
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
  </UCheckbox>
</template>
