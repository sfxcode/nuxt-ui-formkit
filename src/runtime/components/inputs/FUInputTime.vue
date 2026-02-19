<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../composables/useFormKitInput'

export interface FormKitInputTimeProps {
  autofocus?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  inputClass?: string
  leading?: boolean
  leadingIcon?: string
  loading?: boolean
  padded?: boolean
  placeholder?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  format?: '12' | '24'
  step?: number
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputTimeProps>,
    required: true,
  },
})

const modelValue = computed({
  get: () => props.context._value,
  set: (value) => {
    props.context.node.input(value)
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color } = useFormKitInput(props.context)
</script>

<template>
  <UInputTime
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :autofocus="context.autofocus"
    :class="styleClass"
    :color="color as any"
    :disabled="!!context?.disabled"
    :format="context.format as any"
    :highlight="!!(isInvalid || context.highlight)"
    :icon="context.icon"
    :input-class="context.inputClass"
    :leading="context.leading"
    :leading-icon="context.leadingIcon"
    :loading="context.loading"
    :padded="context.padded"
    :placeholder="context.placeholder as any"
    :readonly="context?.attrs.readonly ?? false"
    :size="context.size ?? 'md'"
    :step="context.step as any"
    :style="context?.attrs.style"
    :trailing="context.trailing"
    :trailing-icon="context.trailingIcon"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
