<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'

export interface FormKitOutputBooleanProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  falseIcon?: string
  falseValue?: string
  icon?: string
  leading?: boolean
  leadingIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  trueIcon?: string
  trueValue?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputBooleanProps>,
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

const { containerClass, iconSize, leadingIconName, trailingIconName } = useFormKitOutput(props.context)
</script>

<template>
  <div
    :id="context.id"
    :class="containerClass"
    :style="context?.attrs?.style"
  >
    <UIcon
      v-if="leadingIconName"
      :name="leadingIconName"
      :class="iconSize"
    />
    <UIcon
      v-if="booleanIcon"
      :name="booleanIcon"
      :class="iconSize"
    />
    <span>{{ displayValue }}</span>
    <UIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      :class="iconSize"
    />
  </div>
</template>
