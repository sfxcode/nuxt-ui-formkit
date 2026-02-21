<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputTextProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputTextProps & FormKitIconProps>,
    required: true,
  },
})

const displayValue = computed(() => props.context._value ?? '')

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
    <span>{{ displayValue }}</span>
    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :icon-class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
