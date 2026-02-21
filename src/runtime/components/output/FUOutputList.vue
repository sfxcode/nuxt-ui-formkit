<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputListProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  itemClass?: string
  leading?: boolean
  leadingIcon?: string
  listType?: 'span' | 'div' | 'ul' | 'ol' | 'comma' | 'semicolon' | 'pipe' | 'dash' | 'space'
  separator?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputListProps & FormKitIconProps>,
    required: true,
  },
})

const listValue = computed<string[]>(() => {
  const value = props.context._value
  if (!value) return []
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string') return value.split(',').map(s => s.trim())
  return [String(value)]
})

const listType = computed(() => props.context.listType ?? 'span')

const separator = computed(() => {
  if (props.context.separator) return props.context.separator

  const separatorMap: Record<string, string> = {
    comma: ', ',
    semicolon: '; ',
    pipe: ' | ',
    dash: ' - ',
    space: ' ',
  }

  return separatorMap[listType.value] || ', '
})

const isInlineList = computed(() => {
  return ['span', 'comma', 'semicolon', 'pipe', 'dash', 'space'].includes(listType.value)
})

const displayValue = computed(() => {
  if (isInlineList.value && listType.value !== 'span') {
    return listValue.value.join(separator.value)
  }
  return null
})

const itemClass = computed(() => {
  return props.context.itemClass ?? ''
})

const { containerClass, iconClass, leadingIconName, trailingIconName } = useFormKitOutput(props.context)
</script>

<template>
  <div
    :id="context.id"
    :class="containerClass"
    :style="context?.attrs?.style"
  >
    <FUIcon
      v-if="leadingIconName"
      :name="leadingIconName as string"
      :icon-class="iconClass"
      :on-click="context?.onLeadingIconClicked"
    />

    <!-- Inline list with separators (comma, semicolon, pipe, dash) -->
    <span v-if="displayValue">{{ displayValue }}</span>

    <!-- Span list (inline items without separator) -->
    <template v-else-if="listType === 'span'">
      <span
        v-for="(item, index) in listValue"
        :key="index"
        :class="itemClass"
      >
        {{ item }}
      </span>
    </template>

    <!-- Div list (block items) -->
    <div
      v-else-if="listType === 'div'"
      class="flex flex-col gap-1"
    >
      <div
        v-for="(item, index) in listValue"
        :key="index"
        :class="itemClass"
      >
        {{ item }}
      </div>
    </div>

    <!-- Unordered list -->
    <ul
      v-else-if="listType === 'ul'"
      class="list-disc list-inside"
    >
      <li
        v-for="(item, index) in listValue"
        :key="index"
        :class="itemClass"
      >
        {{ item }}
      </li>
    </ul>

    <!-- Ordered list -->
    <ol
      v-else-if="listType === 'ol'"
      class="list-decimal list-inside"
    >
      <li
        v-for="(item, index) in listValue"
        :key="index"
        :class="itemClass"
      >
        {{ item }}
      </li>
    </ol>

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :icon-class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
