<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
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

const props = defineProps({
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
  // Accessible name for a clickable icon. Falls back to the tooltip text, then
  // to the icon's own name, so an interactive icon is never unnamed.
  ariaLabel: { type: String, default: undefined },
})

// `i-lucide-eye-off` / `lucide:eye-off` -> `eye off`
const iconNameLabel = computed(() => {
  const withoutCollection = props.name.includes(':')
    ? props.name.split(':').pop()!
    : props.name.replace(/^i-/, '').split('-').slice(1).join('-')
  return (withoutCollection || props.name).replace(/-/g, ' ')
})

const label = computed(() => props.ariaLabel || props.tooltip?.text || iconNameLabel.value)

// A clickable icon is a real button (focusable, Enter/Space, announced); the
// icon inside it is decorative. A non-clickable icon is decorative too, unless
// its tooltip carries information - then it's exposed as a labelled image.
const buttonClass = 'inline-flex items-center rounded-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// `UIcon` hides itself from assistive tech by default, so an informative one has to opt back in.
const imageAttrs = computed(() => props.tooltip?.text
  ? { 'role': 'img', 'aria-label': props.tooltip.text, 'aria-hidden': 'false' }
  : { 'aria-hidden': 'true' })
</script>

<template>
  <UTooltip
    v-if="tooltip"
    v-bind="tooltip"
  >
    <button
      v-if="onClick"
      type="button"
      :class="buttonClass"
      :aria-label="label"
      @click="onClick"
    >
      <UIcon
        :name="name"
        v-bind="$attrs"
        aria-hidden="true"
      />
    </button>
    <UIcon
      v-else
      :name="name"
      v-bind="{ ...$attrs, ...imageAttrs }"
    />
  </UTooltip>
  <button
    v-else-if="onClick"
    type="button"
    :class="buttonClass"
    :aria-label="label"
    @click="onClick"
  >
    <UIcon
      :name="name"
      v-bind="$attrs"
      aria-hidden="true"
    />
  </button>
  <UIcon
    v-else
    :name="name"
    v-bind="{ ...$attrs, ...imageAttrs }"
  />
</template>
