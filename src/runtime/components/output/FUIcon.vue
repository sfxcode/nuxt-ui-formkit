<script setup lang="ts">
import type { PropType } from 'vue'
import type { TooltipProps } from '#ui/components/Tooltip.vue'

export interface FormKitIconProps {
  onIconClicked?: () => void
  onLeadingIconClicked?: () => void
  onTrailingIconClicked?: () => void
}

// `class` is excluded - icon sizing/coloring is already handled via the
// `iconClass`/fallthrough-`class` mechanism below, not the tooltip wrapper.
export type FUIconTooltip = Omit<TooltipProps, 'class'>

defineOptions({ inheritAttrs: false })

defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  onClick: { type: Function as PropType<() => void>, default: undefined },
  iconClass: {
    type: String,
    default: '',
  },
  tooltip: {
    type: Object as PropType<FUIconTooltip>,
    default: undefined,
  },
})
</script>

<template>
  <UTooltip
    v-if="tooltip"
    v-bind="tooltip"
  >
    <UIcon
      :name="name"
      v-bind="$attrs"
      @click="onClick"
    />
  </UTooltip>
  <UIcon
    v-else
    :name="name"
    v-bind="$attrs"
    @click="onClick"
  />
</template>
