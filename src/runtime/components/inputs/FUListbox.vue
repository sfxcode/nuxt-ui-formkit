<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import { computed, ref, watch, type PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface ListboxItem {
  label?: string
  description?: string
  icon?: string
  avatar?: Record<string, unknown>
  chip?: string | number | Record<string, unknown>
  type?: 'label' | 'separator' | 'item'
  disabled?: boolean
  onSelect?: (event: Event) => void
  class?: unknown
  ui?: Record<string, unknown>
  [key: string]: unknown
}

export interface FormKitListboxProps {
  options?: string[] | ListboxItem[] | ListboxItem[][]
  as?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  by?: string | ((a: unknown, b: unknown) => boolean)
  displayMode?: 'single' | 'transfer'
  transferLeftHeaderText?: string
  transferRightHeaderText?: string
  transferHeaderClass?: string
  transferAll?: boolean
  orientation?: 'horizontal' | 'vertical'
  selectionBehavior?: 'toggle' | 'replace'
  disabled?: boolean
  defaultValue?: unknown
  multiple?: boolean
  valueKey?: string
  labelKey?: string
  descriptionKey?: string
  loading?: boolean
  loadingIcon?: string
  filter?: boolean | Record<string, unknown>
  filterFields?: string[]
  ignoreFilter?: boolean
  selectedIcon?: string
  virtualize?: boolean | {
    overscan?: number
    estimateSize?: number | ((index: number) => number)
  }
  highlight?: boolean
  highlightOnHover?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  searchTerm?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitListboxProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue, items, validSlotNames } = useFormKitInput(props.context)

// Transfer List
const targetItems = ref<ListboxItem[]>(modelValue.value || [])
const sourceSelection = ref<ListboxItem[]>([])
const targetSelection = ref<ListboxItem[]>([])

const transferHeaderClass = computed(() => {
  const baseClass = 'text-sm font-medium text-highlighted'
  return props.context.transferHeaderClass ? props.context.transferHeaderClass : baseClass
})

const sourceItems = computed(() => {
  const valueKey = props.context?.valueKey || 'value'
  return items.value.filter(item => !targetItems.value.some(t => t[valueKey] === item[valueKey]))
})

function transferSelected() {
  targetItems.value = [...targetItems.value, ...sourceSelection.value]
  sourceSelection.value = []
}

function transferAll() {
  targetItems.value = [...targetItems.value, ...sourceItems.value]
  sourceSelection.value = []
}

function removeSelected() {
  const valueKey = props.context?.valueKey || 'value'
  targetItems.value = targetItems.value.filter(item => !targetSelection.value.some(t => t[valueKey] === item[valueKey]))
  targetSelection.value = []
}

function removeAll() {
  targetItems.value = []
  targetSelection.value = []
}

watch(targetItems, (newVal) => {
  modelValue.value = newVal
})
</script>

<template>
  <UListbox
    v-if="!context.displayMode || context.displayMode === 'single'"
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :style="context?.attrs.style"
    :as="context.as"
    :color="color"
    :size="context.size ?? 'md'"
    :items="items"
    :by="context.by"
    :orientation="context.orientation"
    :selection-behavior="context.selectionBehavior"
    :disabled="!!context?.disabled"
    :default-value="context.defaultValue"
    :multiple="context.multiple"
    :value-key="context.valueKey"
    :label-key="context.labelKey"
    :description-key="context.descriptionKey"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :filter="context.filter"
    :filter-fields="context.filterFields"
    :ignore-filter="context.ignoreFilter"
    :selected-icon="context.selectedIcon"
    :virtualize="context.virtualize"
    :highlight="!!(isInvalid || context.highlight)"
    :highlight-on-hover="context.highlightOnHover"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
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
  </UListbox>
  <div
    v-if="context.displayMode === 'transfer'"
    class="flex items-stretch gap-4 w-full"
  >
    <div class="flex flex-col flex-1 gap-1">
      <span
        v-if="context.transferLeftHeaderText"
        :class="transferHeaderClass"
      >{{ context.transferLeftHeaderText }}</span>
      <UListbox
        :id="context.id + '-transfer-left'"
        v-model="sourceSelection"
        v-bind="{ ...context?.attrs }"
        :class="styleClass"
        :style="context?.attrs.style"
        :as="context.as"
        :size="context.size ?? 'md'"
        :items="sourceItems"
        :by="context.by"
        :orientation="context.orientation"
        :selection-behavior="context.selectionBehavior"
        :disabled="!!context?.disabled"
        :default-value="context.defaultValue"
        :multiple="true"
        :value-key="context.valueKey"
        :label-key="context.labelKey"
        :description-key="context.descriptionKey"
        :loading="context.loading"
        :loading-icon="context.loadingIcon"
        :filter="context.filter"
        :filter-fields="context.filterFields"
        :ignore-filter="context.ignoreFilter"
        :selected-icon="context.selectedIcon"
        :virtualize="context.virtualize"
        :highlight="!!(isInvalid || context.highlight)"
        :highlight-on-hover="context.highlightOnHover"
        :autofocus="context.autofocus"
        :autofocus-delay="context.autofocusDelay"
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
      </UListbox>
    </div>
    <div class="flex flex-col items-center justify-center gap-1">
      <UButton
        icon="i-lucide-chevron-right"
        color="neutral"
        variant="outline"
        :disabled="sourceSelection.length === 0"
        @click="transferSelected"
      />
      <UButton
        v-if="context.transferAll"
        icon="i-lucide-chevrons-right"
        color="neutral"
        variant="outline"
        :disabled="sourceItems.length === 0"
        @click="transferAll"
      />
      <UButton
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="outline"
        :disabled="!targetSelection.length"
        @click="removeSelected"
      />
      <UButton
        v-if="context.transferAll"
        icon="i-lucide-chevrons-left"
        color="neutral"
        variant="outline"
        :disabled="targetItems.length === 0"
        @click="removeAll"
      />
    </div>
    <div class="flex flex-col flex-1 gap-1">
      <span
        v-if="context.transferRightHeaderText"
        :class="transferHeaderClass"
      >{{ context.transferRightHeaderText }}</span>
      <UListbox
        :id="context.id + '-transfer-right'"
        v-model="targetSelection"
        v-bind="{ ...context?.attrs }"
        :class="styleClass"
        :style="context?.attrs.style"
        :as="context.as"
        :size="context.size ?? 'md'"
        :items="targetItems"
        :by="context.by"
        :orientation="context.orientation"
        :selection-behavior="context.selectionBehavior"
        :disabled="!!context?.disabled"
        :default-value="context.defaultValue"
        :multiple="true"
        :value-key="context.valueKey"
        :label-key="context.labelKey"
        :description-key="context.descriptionKey"
        :loading="context.loading"
        :loading-icon="context.loadingIcon"
        :filter="context.filter"
        :filter-fields="context.filterFields"
        :ignore-filter="context.ignoreFilter"
        :selected-icon="context.selectedIcon"
        :virtualize="context.virtualize"
        :highlight="!!(isInvalid || context.highlight)"
        :highlight-on-hover="context.highlightOnHover"
        :autofocus="context.autofocus"
        :autofocus-delay="context.autofocusDelay"
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
      </UListbox>
    </div>
  </div>
</template>
