<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputRatingProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  emptyIcon?: string
  icon?: string
  leading?: boolean
  leadingIcon?: string
  length?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputRatingProps & FormKitIconProps>,
    required: true,
  },
})

const ratingValue = computed(() => {
  const value = props.context._value
  if (value === null || value === undefined || value === '')
    return undefined
  return Number(value)
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

    <!--
      This is a display component, not an input: `readonly` (Nuxt UI's dedicated
      non-interactive-but-normal-look prop) is hardcoded true rather than exposed as a
      schema prop - it must never be configurable off. `disabled` is deliberately left
      unset here, unlike FUInputRating.vue's unconditional `:disabled="!!context?.disabled"`
      - a display component has no disabled/enabled state of its own to reflect.
    -->
    <UInputRating
      :model-value="ratingValue"
      :readonly="true"
      :color="context.color"
      :size="context.size"
      :orientation="context.orientation"
      :icon="context.icon"
      :empty-icon="context.emptyIcon"
      :length="context.length"
      :ui="ui?.rating"
    />

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
