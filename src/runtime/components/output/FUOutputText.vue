<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../composables/useFormKitOutput'

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
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputTextProps>,
    required: true,
  },
})

const displayValue = computed(() => props.context._value ?? '')

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
    <span>{{ displayValue }}</span>
    <UIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      :class="iconSize"
    />
  </div>
</template>
