<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'

export interface FormKitOutputNumberProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  formatOptions?: Intl.NumberFormatOptions
  icon?: string
  leading?: boolean
  leadingIcon?: string
  locale?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputNumberProps>,
    required: true,
  },
})

const numberValue = computed(() => {
  const value = props.context._value
  if (value === null || value === undefined || value === '')
    return null
  return Number(value)
})

const displayValue = computed(() => {
  if (numberValue.value === null || Number.isNaN(numberValue.value))
    return ''

  const locale = props.context.locale ?? 'en-US'
  const formatOptions = props.context.formatOptions ?? {}

  try {
    return new Intl.NumberFormat(locale, formatOptions).format(numberValue.value)
  }
  catch (error) {
    console.error('Error formatting number:', error)
    return String(numberValue.value)
  }
})

const { containerClass, iconClass, leadingIconName, trailingIconName } = useFormKitOutput(props.context)
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
      :class="iconClass"
    />
    <span>{{ displayValue }}</span>
    <UIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      :class="iconClass"
    />
  </div>
</template>
