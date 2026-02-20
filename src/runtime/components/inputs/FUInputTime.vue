<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import type { Time } from '@internationalized/date'
import type { AvatarProps } from '#ui/components/Avatar.vue'

export interface FormKitInputTimeProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  highlight?: boolean
  fixed?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  defaultValue: Time
  placeholder?: Time
  defaultPlaceholder?: Time
  hourCycle?: 12 | 24
  step?: any
  stepSnapping?: boolean
  granularity?: 'hour' | 'minute' | 'second'
  hideTimeZone?: boolean
  maxValue?: Time
  minValue?: Time
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
  loadingIcon?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputTimeProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UInputTime
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :default-value="context.defaultValue"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :color="color"
    :highlight="isInvalid || context.highlight"
    :size="context.size ?? 'md'"
    :variant="context.variant ?? 'outline'"
    :placeholder="context.placeholder"
    :default-placeholder="context.defaultPlaceholder"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :fixed="context.fixed"
    :icon="context.icon"
    :avatar="context.avatar"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :hour-cycle="context.hourCycle"
    :step="context.step"
    :step-snapping="context.stepSnapping"
    :granularity="context.granularity"
    :hide-time-zone="context.hideTimeZone"
    :max-value="context.maxValue"
    :min-value="context.minValue"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
