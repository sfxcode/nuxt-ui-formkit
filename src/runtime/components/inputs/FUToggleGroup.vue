<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
type ButtonVariant = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'

export interface ToggleGroupOption {
  value?: string | number | boolean
  label?: string
  icon?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitToggleGroupProps {
  options?: Array<string | number | boolean | ToggleGroupOption>
  /** Allow several pressed items; the value is then an array. Maps to Nuxt UI's `type="multiple"`. */
  multiple?: boolean
  valueKey?: string
  labelKey?: string
  orientation?: 'horizontal' | 'vertical'
  attached?: boolean
  loop?: boolean
  rovingFocus?: boolean
  color?: ButtonColor
  variant?: ButtonVariant
  activeColor?: ButtonColor
  activeVariant?: ButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  name?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitToggleGroupProps>,
    required: true,
  },
})

const { isInvalid, styleClass, modelValue, items, validSlotNames, commonProps } = useFormKitInput(props.context)

// `UToggleGroup` only takes object items - turn FormKit-style primitive
// options (`['left', 'right']`) into `{ label, value }` so both shapes work.
const toggleItems = computed(() => items.value.map(option =>
  option !== null && typeof option === 'object'
    ? option as ToggleGroupOption
    : { label: String(option), value: option as string | number | boolean },
))

// Not a Vue Boolean prop here (it becomes `type`), so cast like one: a bare
// `<FormKit multiple>` arrives as `''`, a schema string as `'true'`.
const multiple = computed(() => {
  const value = props.context.multiple as unknown
  return value === true || value === '' || value === 'true'
})

// Reka's multiple toggle group expects an array - give it one for an unset value.
const groupValue = computed({
  get: () => multiple.value ? (modelValue.value ?? []) : modelValue.value,
  set: (value) => {
    modelValue.value = value
  },
})

// Same as `commonProps.color` but keeps Nuxt UI's own unpressed default.
const color = computed(() => isInvalid.value ? 'error' : (props.context.color ?? 'neutral'))

// The root is a non-focusable container around one button per item, like
// `FURadioGroup` - detect focus leaving the whole group via `@focusout`.
const handleContainerBlur = createContainerBlurHandler(props.context)
</script>

<template>
  <UToggleGroup
    :id="context.id"
    v-model="groupValue"
    v-bind="{ ...context?.attrs, ...commonProps }"
    :class="styleClass"
    :color="color"
    :type="multiple ? 'multiple' : 'single'"
    :items="toggleItems"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :orientation="context.orientation"
    :attached="context.attached"
    :loop="context.loop"
    :roving-focus="context.rovingFocus"
    :variant="context.variant"
    :active-color="context.activeColor"
    :active-variant="context.activeVariant"
    :name="context.node.name"
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
  </UToggleGroup>
</template>
