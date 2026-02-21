<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'

export interface FormKitOutputDateProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  locale?: string
  relative?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  timeStyle?: 'short' | 'medium' | 'long'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputDateProps>,
    required: true,
  },
})

const dateValue = computed(() => {
  const value = props.context._value
  if (!value) return undefined

  try {
    const date = value instanceof Date ? value : new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
  }
  catch {
    return undefined
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
    <NuxtTime
      v-if="dateValue"
      :datetime="dateValue"
      :date-style="context.dateStyle ?? 'medium'"
      :time-style="context.timeStyle"
      :locale="context.locale"
      :relative="context.relative"
    />
    <span v-else>{{ context._value }}</span>
    <UIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      :class="iconClass"
    />
  </div>
</template>
