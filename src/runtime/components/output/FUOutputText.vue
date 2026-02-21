<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import { convertColorToHex } from '../../utils/colorConverter'
import { formattedDuration } from '../../utils/durationConverter'
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
  outputType?: 'text' | 'email' | 'url' | 'tel' | 'color' | 'duration'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputTextProps & FormKitIconProps>,
    required: true,
  },
})

const outputType = computed(() => props.context.outputType ?? 'text')
const displayValue = computed(() => {
  let result = props.context._value ?? ''
  if (outputType.value === 'duration') {
    result = formattedDuration(result)
  }
  return result
})

const isLink = computed(() => ['email', 'url', 'tel'].includes(outputType.value))

const linkHref = computed(() => {
  const value = displayValue.value
  if (!value)
    return ''

  switch (outputType.value) {
    case 'email':
      return value.startsWith('mailto:') ? value : `mailto:${value}`
    case 'tel':
      return value.startsWith('tel:') ? value : `tel:${value}`
    case 'url':
      return value
    default:
      return ''
  }
})

const colorValue = computed(() => {
  if (outputType.value === 'color') {
    return convertColorToHex(displayValue.value)
  }
  return undefined
})

const colorStyle = computed(() => {
  if (outputType.value === 'color') {
    return `color: ${colorValue.value} `
  }
  return ' '
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
      :class="iconClass"
      :style="colorStyle"
      :on-click="context?.onLeadingIconClicked"
    />

    <!-- Link output types (email, url, tel) -->
    <ULink
      v-if="isLink && displayValue"
      :href="linkHref"
      :target="outputType === 'url' ? '_blank' : undefined"
      :rel="outputType === 'url' ? 'noopener noreferrer' : undefined"
    >
      {{ displayValue }}
    </ULink>

    <!-- Default text output -->
    <span
      v-else
      :style="colorStyle"
    >{{ displayValue }}</span>

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :style="colorStyle"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
