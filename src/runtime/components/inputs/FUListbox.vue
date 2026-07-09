<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import { computed, nextTick, ref, watch, type PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

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
  transferSortIcons?: boolean
  transferItemDraggable?: boolean
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

// `UListbox` declares no `blur` emit at all - `@focusout` (which bubbles,
// unlike `blur`) plus a relatedTarget-outside-container check is what
// detects "focus left this listbox." In single mode that's bound directly
// on the one `<UListbox>`, whose `event.currentTarget` correctly scopes the
// check to itself.
//
// Transfer mode needs a different scope: confirmed empirically that binding
// this per-instance on *both* the source and target `<UListbox>`es misfires
// - moving focus from source to target (a legitimate transfer) makes the
// source's own `currentTarget`-scoped check see the target as "outside
// itself" and blur the whole shared field. Both listboxes drive the same
// `props.context`, so the real container is the *outer* transfer wrapper
// div (source + buttons + target) - `@focusout` is bound there once
// instead, so it only fires once focus leaves that whole wrapper.
const handleContainerBlur = createContainerBlurHandler(props.context)

// Transfer List
const targetItems = ref<ListboxItem[]>(modelValue.value || [])
const sourceSelection = ref<ListboxItem[]>([])
const targetSelection = ref<ListboxItem[]>([])

const transferHeaderClass = computed(() => {
  const baseClass = 'text-sm font-medium text-highlighted'
  return props.context.transferHeaderClass ? props.context.transferHeaderClass : baseClass
})

const sourceItems = computed(() => {
  // Guard against non-transfer instances: `targetItems` is only ever meant to
  // hold an array in transfer mode (it seeds from `modelValue`, which for
  // single/multiple non-transfer listboxes can be a string, object, etc.) —
  // and the new drag-and-drop watchers below evaluate this computed eagerly
  // for every FUListbox instance on the page, transfer mode or not.
  if (props.context.displayMode !== 'transfer' || !Array.isArray(targetItems.value))
    return []
  const valueKey = props.context?.valueKey || 'value'
  return items.value.filter(item => !targetItems.value.some(t => t[valueKey] === item[valueKey]))
})

// Slot forwarding for transfer-mode listboxes excludes 'item-trailing' since it's
// hardcoded below to render the drag handle and optional sort icons.
const transferSlotNames = computed(() => validSlotNames.value.filter(name => name !== 'item-trailing'))

const sourceContainerRef = ref<HTMLElement>()
const targetContainerRef = ref<HTMLElement>()
// Source has no independent ordering (it's `items` minus whatever's in
// `targetItems`), so a dragover-hovered item there only needs a simple
// "this will be removed from Selected" highlight, not an insertion line.
const sourceDragActive = ref(false)
// The index of the target item currently being dragged over, and whether the
// drop would land before or after it — drives a precise insertion-line
// indicator rather than a whole-row highlight.
const dragOverTargetIndex = ref<number | null>(null)
const dragOverPosition = ref<'before' | 'after' | null>(null)

// Renders the insertion-line indicator without mutating the underlying target
// items (which would risk leaking the indicator class back into the source
// list, since both share the same item object references).
const targetDisplayItems = computed(() => {
  if (props.context.displayMode !== 'transfer' || !Array.isArray(targetItems.value))
    return []
  return targetItems.value.map((item, index) => {
    if (index !== dragOverTargetIndex.value || !dragOverPosition.value)
      return item
    const insertionClass = dragOverPosition.value === 'before'
      ? 'border-t-2 border-primary'
      : 'border-b-2 border-primary'
    return { ...item, class: [item.class, insertionClass] }
  })
})

// Reka UI's ListboxItem doesn't expose a way to set arbitrary attributes on its
// rendered root, so `transferItemDraggable` sets the `draggable` DOM property
// directly on the already-rendered item elements instead of layering a
// separate draggable overlay on top (an overlay would sit above the item's own
// click-to-select content in paint order and swallow those clicks — the exact
// element that handles clicks must stay the one that's draggable).
function applyItemDraggable(container: HTMLElement | undefined, enabled: boolean) {
  if (!container)
    return
  container.querySelectorAll<HTMLElement>('[data-slot="item"]').forEach((el) => {
    el.draggable = enabled
  })
}

watch(
  [sourceItems, sourceContainerRef, () => props.context.transferItemDraggable],
  () => nextTick(() => applyItemDraggable(sourceContainerRef.value, !!props.context.transferItemDraggable)),
  { immediate: true },
)
watch(
  [targetDisplayItems, targetContainerRef, () => props.context.transferItemDraggable],
  () => nextTick(() => applyItemDraggable(targetContainerRef.value, !!props.context.transferItemDraggable)),
  { immediate: true },
)

function findItemIndex(container: HTMLElement | undefined, target: EventTarget | null): number {
  const itemEl = (target as HTMLElement | null)?.closest('[data-slot="item"]')
  if (!itemEl || !container)
    return -1
  return Array.from(container.querySelectorAll('[data-slot="item"]')).indexOf(itemEl)
}

// Whether the drop should land before or after the hovered item, based on
// which half of its row the cursor is currently over.
function findDropPosition(target: EventTarget | null, clientY: number): 'before' | 'after' {
  const itemEl = (target as HTMLElement | null)?.closest('[data-slot="item"]')
  if (!itemEl)
    return 'after'
  const rect = itemEl.getBoundingClientRect()
  return clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}

function moveElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array]
  const [element] = result.splice(fromIndex, 1)
  if (element !== undefined)
    result.splice(toIndex, 0, element)
  return result
}

function onSourceDragStart(event: DragEvent) {
  const index = findItemIndex(sourceContainerRef.value, event.target)
  if (index === -1)
    return
  event.dataTransfer?.setData('text/plain', JSON.stringify({ origin: 'source', index }))
  // 'copyMove' (not 'copy') so it stays a spec-compatible pairing with whatever
  // dropEffect the browser derives on dragover, regardless of drag origin.
  if (event.dataTransfer)
    event.dataTransfer.effectAllowed = 'copyMove'
}

function onSourceDragEnter(event: DragEvent) {
  event.preventDefault()
}

function onSourceDragOver(event: DragEvent) {
  event.preventDefault()
  // The filter <input> natively accepts text drops unless explicitly
  // suppressed — show "not allowed" there rather than letting it look like a
  // valid place to drop an item.
  if ((event.target as HTMLElement | null)?.tagName === 'INPUT') {
    if (event.dataTransfer)
      event.dataTransfer.dropEffect = 'none'
    sourceDragActive.value = false
    return
  }
  sourceDragActive.value = true
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = 'move'
}

function onSourceDrop(event: DragEvent) {
  event.preventDefault()
  sourceDragActive.value = false
  if ((event.target as HTMLElement | null)?.tagName === 'INPUT')
    return

  let payload: { origin: 'source' | 'target', index: number } | undefined
  try {
    payload = JSON.parse(event.dataTransfer?.getData('text/plain') || '')
  }
  catch {
    return
  }
  // Only items dragged out of the target list can be dropped back into
  // source — dragging a source item onto source itself is a no-op.
  if (!payload || payload.origin !== 'target' || typeof payload.index !== 'number')
    return

  const draggedItem = targetItems.value[payload.index]
  if (!draggedItem)
    return
  const valueKey = props.context?.valueKey || 'value'
  targetItems.value = targetItems.value.filter(item => item[valueKey] !== draggedItem[valueKey])
}

function onTargetDragStart(event: DragEvent) {
  const index = findItemIndex(targetContainerRef.value, event.target)
  if (index === -1)
    return
  event.dataTransfer?.setData('text/plain', JSON.stringify({ origin: 'target', index }))
  if (event.dataTransfer)
    event.dataTransfer.effectAllowed = 'copyMove'
}

function onTargetDragEnter(event: DragEvent) {
  // Some browsers only treat a drop target as valid if dragenter's default is
  // also prevented, not just dragover's.
  event.preventDefault()
}

function onTargetDragOver(event: DragEvent) {
  event.preventDefault()
  const index = findItemIndex(targetContainerRef.value, event.target)
  if (index === -1) {
    dragOverTargetIndex.value = null
    dragOverPosition.value = null
  }
  else {
    dragOverTargetIndex.value = index
    dragOverPosition.value = findDropPosition(event.target, event.clientY)
  }
  // Leave dropEffect at the browser's default (derived from effectAllowed) rather
  // than hardcoding one value — we can't read dataTransfer's payload to know the
  // drag's origin until drop, and a mismatched dropEffect/effectAllowed pairing
  // can cause some browsers to reject the drop.
}

function onTargetDrop(event: DragEvent) {
  event.preventDefault()
  const hoveredIndex = dragOverTargetIndex.value
  const position = dragOverPosition.value
  dragOverTargetIndex.value = null
  dragOverPosition.value = null

  let payload: { origin: 'source' | 'target', index: number } | undefined
  try {
    payload = JSON.parse(event.dataTransfer?.getData('text/plain') || '')
  }
  catch {
    return
  }
  if (!payload || typeof payload.index !== 'number')
    return

  const dropIndex = hoveredIndex === null
    ? targetItems.value.length
    : (position === 'after' ? hoveredIndex + 1 : hoveredIndex)

  if (payload.origin === 'source') {
    const draggedItem = sourceItems.value[payload.index]
    if (!draggedItem)
      return
    const newItems = [...targetItems.value]
    newItems.splice(dropIndex, 0, draggedItem)
    targetItems.value = newItems
  }
  else {
    if (payload.index === dropIndex)
      return
    const adjustedIndex = dropIndex > payload.index ? dropIndex - 1 : dropIndex
    targetItems.value = moveElement(targetItems.value, payload.index, adjustedIndex)
  }
}

function onDragEnd() {
  dragOverTargetIndex.value = null
  dragOverPosition.value = null
  sourceDragActive.value = false
}

function moveTargetItemUp(index: number) {
  if (index <= 0)
    return
  targetItems.value = moveElement(targetItems.value, index, index - 1)
}

function moveTargetItemDown(index: number) {
  if (index >= targetItems.value.length - 1)
    return
  targetItems.value = moveElement(targetItems.value, index, index + 1)
}

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
  </UListbox>
  <div
    v-if="context.displayMode === 'transfer'"
    class="flex items-stretch gap-4 w-full"
    @focusout="handleContainerBlur"
  >
    <div
      ref="sourceContainerRef"
      class="flex flex-col flex-1 gap-1 rounded-lg transition-colors"
      :class="{ 'ring-2 ring-inset ring-primary': sourceDragActive }"
      @dragstart="onSourceDragStart"
      @dragenter.capture="onSourceDragEnter"
      @dragover.capture="onSourceDragOver"
      @drop.capture="onSourceDrop"
      @dragend="onDragEnd"
    >
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
          v-for="slotName in transferSlotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <component
            :is="context?.slots[slotName]"
            v-bind="{ ...context, ...slotProps }"
          />
        </template>
        <template
          v-if="!context.disabled"
          #item-trailing
        >
          <UIcon
            name="i-lucide-grip-vertical"
            draggable="true"
            class="cursor-grab text-muted"
            @click.stop
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
    <div
      ref="targetContainerRef"
      class="flex flex-col flex-1 gap-1"
      @dragstart="onTargetDragStart"
      @dragenter.capture.prevent="onTargetDragEnter"
      @dragover.capture.prevent="onTargetDragOver"
      @drop.capture="onTargetDrop"
      @dragend="onDragEnd"
    >
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
        :items="targetDisplayItems"
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
          v-for="slotName in transferSlotNames"
          :key="slotName"
          #[slotName]="slotProps"
        >
          <component
            :is="context?.slots[slotName]"
            v-bind="{ ...context, ...slotProps }"
          />
        </template>
        <template
          v-if="!context.disabled"
          #item-trailing="{ index }"
        >
          <UButton
            v-if="context.transferSortIcons"
            icon="i-lucide-chevron-up"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === 0"
            @click.stop="moveTargetItemUp(index)"
          />
          <UButton
            v-if="context.transferSortIcons"
            icon="i-lucide-chevron-down"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="index === targetItems.length - 1"
            @click.stop="moveTargetItemDown(index)"
          />
          <UIcon
            name="i-lucide-grip-vertical"
            draggable="true"
            class="cursor-grab text-muted"
            @click.stop
          />
        </template>
      </UListbox>
    </div>
  </div>
</template>
