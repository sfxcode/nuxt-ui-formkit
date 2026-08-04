<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { PropType } from 'vue'
import type { FormKitIconProps, FUIconTooltip } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputBooleanProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  falseIcon?: string
  falseIconTooltip?: FUIconTooltip
  falseValue?: string
  icon?: string
  iconTooltip?: FUIconTooltip
  leading?: boolean
  leadingIcon?: string
  leadingIconTooltip?: FUIconTooltip
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  trailingIconTooltip?: FUIconTooltip
  trueIcon?: string
  trueIconTooltip?: FUIconTooltip
  trueValue?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputBooleanProps & FormKitIconProps>,
    required: true,
  },
})

const booleanValue = computed(() => Boolean(props.context._value))

const displayValue = computed(() => {
  if (booleanValue.value) {
    return props.context.trueValue ?? 'Yes'
  }
  return props.context.falseValue ?? 'No'
})

const booleanIcon = computed(() => {
  if (booleanValue.value && props.context.trueIcon) {
    return props.context.trueIcon
  }
  if (!booleanValue.value && props.context.falseIcon) {
    return props.context.falseIcon
  }
  return undefined
})

const booleanIconTooltip = computed(() => {
  if (booleanValue.value && props.context.trueIconTooltip) {
    return props.context.trueIconTooltip
  }
  if (!booleanValue.value && props.context.falseIconTooltip) {
    return props.context.falseIconTooltip
  }
  return undefined
})

const { containerClass, iconClass, leadingIconName, trailingIconName, leadingTooltip, trailingTooltip } = useFormKitOutput(props.context)
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
      :tooltip="leadingTooltip"
      :on-click="context?.onLeadingIconClicked"
    />
    <FUIcon
      v-if="booleanIcon"
      :name="booleanIcon"
      :class="iconClass"
      :tooltip="booleanIconTooltip"
      :on-click="context?.onIconClicked"
    />
    <span>{{ displayValue }}</span>
    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :tooltip="trailingTooltip"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
