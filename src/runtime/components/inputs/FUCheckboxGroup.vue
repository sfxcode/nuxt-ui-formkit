<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

export interface CheckboxOption {
  value: string | number | boolean
  label?: string
  description?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitCheckboxGroupProps {
  options?: string[] | CheckboxOption[]
  legend?: string
  valueKey?: string
  labelKey?: string
  descriptionKey?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'table' | 'list' | 'card'
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
  name?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  indicator?: 'start' | 'end' | 'hidden'
  icon?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxGroupProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, color, modelValue, items, validSlotNames } = useFormKitInput(props.context)

// `UCheckboxGroup`'s root is a non-focusable `<fieldset>` wrapping several
// genuinely focusable checkbox items - native `blur` doesn't bubble, so
// `@focusout` (which does) plus a relatedTarget-outside-container check is
// what actually detects "focus left the whole group," not just moved
// between its own items.
const handleContainerBlur = createContainerBlurHandler(props.context)
</script>

<template>
  <UCheckboxGroup
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'list'"
    :orientation="context.orientation ?? 'vertical'"
    :indicator="context.indicator ?? 'start'"
    :items="items"
    :legend="context.legend"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :loop="context.loop ?? false"
    :name="context.name"
    @change="handleChange"
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
  </UCheckboxGroup>
</template>
