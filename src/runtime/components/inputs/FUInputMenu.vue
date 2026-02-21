<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface InputMenuItem {
  label?: string
  icon?: string
  avatar?: {
    src?: string
    alt?: string
  }
  chip?: string | number
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitInputMenuProps {
  options?: string[] | InputMenuItem[]
  inputType?: 'number' | 'search' | 'image' | 'text' | 'button' | 'time' | 'color' | 'checkbox' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'month' | 'password' | 'radio' | 'range' | 'reset' | 'submit' | 'tel' | 'url' | 'week' | string & {}
  placeholder?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  autofocus?: boolean
  autofocusDelay?: number
  trailingIcon?: string
  selectedIcon?: string
  deleteIcon?: string
  clear?: boolean
  clearIcon?: string
  arrow?: boolean
  portal?: boolean
  virtualize?: boolean
  valueKey?: string
  labelKey?: string
  descriptionKey?: string
  multiple?: boolean
  highlight?: boolean
  fixed?: boolean
  createItem?: boolean | 'always' | { position?: 'top' | 'bottom', when?: 'always' | 'empty' | undefined } | undefined
  filterFields?: string[]
  ignoreFilter?: false
  defaultOpen?: false
  resetSearchTermOnBlur?: boolean
  resetSearchTermOnSelect?: boolean
  resetModelValueOnClear?: boolean
  highlightOnHover?: boolean
  openOnClick?: boolean
  openOnFocus?: boolean
  icon?: string
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  loading?: boolean
  loadingIcon?: string
  list?: string
  autocomplete?: string & {} | 'on' | 'off'
  searchTerm?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputMenuProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue, items, validSlotNames } = useFormKitInput(props.context)
</script>

<template>
  <UInputMenu
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="!!(isInvalid || context.highlight)"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :type="context?.inputType || 'text'"
    :items="items"
    :placeholder="context.placeholder"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :trailing-icon="context.trailingIcon"
    :selected-icon="context.selectedIcon"
    :delete-icon="context.deleteIcon"
    :clear="context.clear"
    :clear-icon="context.clearIcon"
    :arrow="context.arrow"
    :portal="context.portal"
    :virtualize="context.virtualize"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :multiple="context.multiple"
    :fixed="context.fixed"
    :create-item="context.createItem || false"
    :filter-fields="context.filterFields"
    :ignore-filter="context.ignoreFilter"
    :default-open="context.defaultOpen"
    :reset-search-term-on-blur="context.resetSearchTermOnBlur"
    :reset-search-term-on-select="context.resetSearchTermOnSelect"
    :reset-model-value-on-clear="context.resetModelValueOnClear"
    :highlight-on-hover="context.highlightOnHover"
    :open-on-click="context.openOnClick"
    :open-on-focus="context.openOnFocus"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :list="context.list"
    :autocomplete="context.autocomplete"
    :search-term="context.searchTerm"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
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
  </UInputMenu>
</template>
