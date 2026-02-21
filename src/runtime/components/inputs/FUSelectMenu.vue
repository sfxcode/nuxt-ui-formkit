<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface SelectMenuGroup {
  label?: string
  items: SelectMenuItem[]
}

export interface SelectMenuItem {
  label?: string
  value?: string | number | boolean
  icon?: string
  avatar?: {
    src?: string
    alt?: string
  }
  chip?: string | number
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitSelectMenuProps {
  options?: SelectMenuItem[] | SelectMenuGroup[]
  placeholder?: string
  searchInput?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: string
  selectedIcon?: string
  clear?: boolean
  arrow?: boolean
  portal?: boolean
  virtualize?: boolean
  valueKey?: string
  labelKey?: string
  descriptionKey?: string
  defaultValue?: any
  multiple?: boolean
  highlight?: boolean
  fixed?: boolean
  createItem?: boolean
  filterFields?: string[]
  ignoreFilter?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  open?: boolean
  defaultOpen?: boolean
  resetSearchTermOnBlur?: boolean
  resetSearchTermOnSelect?: boolean
  resetModelValueOnClear?: boolean
  highlightOnHover?: boolean
  searchTerm?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSelectMenuProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue, items } = useFormKitInput(props.context)
</script>

<template>
  <USelectMenu
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
    :search-input="context.searchInput"
    :clear="context.clear"
    :clear-icon="context.clearIcon"
    :arrow="context.arrow"
    :portal="context.portal"
    :virtualize="context.virtualize"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :default-value="context.defaultValue"
    :multiple="context.multiple"
    :create-item="context.createItem"
    :filter-fields="context.filterFields"
    :ignore-filter="context.ignoreFilter"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :open="context.open"
    :default-open="context.defaultOpen"
    :reset-search-term-on-blur="context.resetSearchTermOnBlur"
    :reset-search-term-on-select="context.resetSearchTermOnSelect"
    :reset-model-value-on-clear="context.resetModelValueOnClear"
    :highlight-on-hover="context.highlightOnHover"
    :search-term="context.searchTerm"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
