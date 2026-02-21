<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { SelectMenuItem } from '#ui/components/SelectMenu.vue'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface FormKitSelectProps {
  options?: string[] | SelectMenuItem[] | SelectMenuItem[][]
  placeholder?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  selectedIcon?: string
  arrow?: boolean
  portal?: boolean
  valueKey?: string
  labelKey?: string
  descriptionKey?: string
  defaultValue?: unknown
  multiple?: boolean
  highlight?: boolean
  fixed?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  open?: boolean
  defaultOpen?: boolean
  autocomplete?: string & {} | 'on' | 'off'
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSelectProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, color, styleClass, modelValue, items } = useFormKitInput(props.context)
</script>

<template>
  <USelect
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :items="items"
    :placeholder="context.placeholder"
    :selected-icon="context.selectedIcon"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :arrow="context.arrow"
    :portal="context.portal"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :default-value="context.defaultValue"
    :multiple="context.multiple"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :open="context.open"
    :default-open="context.defaultOpen"
    :autocomplete="context.autocomplete"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
