<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputBadgeProps {
  // UBadge's own internal icon (rendered inside the pill) - deliberately not named
  // `icon`, which already means "the external FUIcon shown beside the badge" across
  // every Output component (see `leadingIcon`/`trailingIcon`/`leading`/`trailing` below).
  badgeIcon?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  square?: boolean
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputBadgeProps & FormKitIconProps>,
    required: true,
  },
})

const displayValue = computed(() => {
  const value = props.context._value
  if (value === null || value === undefined)
    return undefined
  return value as string | number
})

// UBadge supports: outline, soft, subtle, solid - no ghost/none. Map ghost and none
// to soft, everything else passes through. Same mapping as FUOutputList.vue's own
// `badgeVariant` for its `listType: 'badge'` mode - duplicated locally rather than
// shared, since this is the only other call site so far.
const badgeVariant = computed(() => {
  const variant = props.context.variant
  if (variant === 'ghost' || variant === 'none')
    return 'soft'
  return variant
})

const { containerClass, iconClass, leadingIconName, trailingIconName, ui } = useFormKitOutput(props.context)
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
      :class="iconClass"
      :on-click="context?.onLeadingIconClicked"
    />

    <UBadge
      :label="displayValue"
      :color="context.color"
      :variant="badgeVariant"
      :size="context.size"
      :icon="context.badgeIcon"
      :square="context.square"
      :ui="ui?.badge"
    />

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
