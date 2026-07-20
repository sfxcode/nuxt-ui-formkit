<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputProgressProps {
  animation?: 'carousel' | 'carousel-inverse' | 'swing' | 'elastic'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  max?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: boolean
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputProgressProps & FormKitIconProps>,
    required: true,
  },
})

const progressValue = computed(() => {
  const value = props.context._value
  if (value === null || value === undefined || value === '')
    return null
  return Number(value)
})

// `containerClass` starts every Output component with `inline-flex` (shrink-to-fit),
// which gives UProgress's own internal track nothing concrete to size against: its
// theme sets `w-full` for horizontal orientation but `h-full` for vertical. Floor
// only the dimension that orientation actually needs - flooring both unconditionally
// would force a tall empty box around the (intentionally thin) horizontal bar.
const progressSizeClass = computed(() => {
  return props.context.orientation === 'vertical' ? 'min-h-32' : 'min-w-32 flex-1'
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

    <UProgress
      :class="progressSizeClass"
      :model-value="progressValue"
      :max="context.max"
      :status="context.status"
      :color="context.color"
      :size="context.size"
      :orientation="context.orientation"
      :animation="context.animation"
      :ui="ui?.progress"
    />

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
