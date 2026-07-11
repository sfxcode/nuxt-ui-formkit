<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

export interface RadioOption {
  value: string | number | boolean
  label?: string
  description?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitRadioGroupProps {
  options?: RadioOption[]
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
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitRadioGroupProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, color, modelValue, items, validSlotNames, ui } = useFormKitInput(props.context)

// Same non-focusable-container gap as `FUCheckboxGroup.vue` - see its
// comment for why `@focusout` plus a relatedTarget-outside-container check
// is needed instead of a plain (never-firing) `@blur`.
const handleContainerBlur = createContainerBlurHandler(props.context)
</script>

<template>
  <URadioGroup
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
    :items="items"
    :legend="context.legend"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :loop="context.loop ?? false"
    :name="context.node.name"
    :ui="ui"
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
  </URadioGroup>
</template>
