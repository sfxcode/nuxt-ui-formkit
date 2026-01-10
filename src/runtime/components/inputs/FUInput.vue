<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../composables/useFormKitInput'

export interface FormKitInputProps {
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  placeholder?: string
  autofocus?: boolean
  padded?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  variant?: 'outline' | 'none'
  inputClass?: string
  loading?: boolean
  icon?: string
  trailingIcon?: string
  leadingIcon?: string
  trailing?: boolean
  leading?: boolean
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitInputProps>,
    required: true,
  },
})

const modelValue = computed({
  get: () => props.context._value,
  set: (value) => {
    props.context.node.input(value)
  },
})

const { handleInput, handleChange, styleClass } = useFormKitInput(props.context)
</script>

<template>
  <UInput
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :type="context?.inputType || 'text'"
    :readonly="context?.attrs.readonly ?? false"
    :style="context?.attrs.style"
    :class="styleClass"
    :placeholder="context.placeholder"
    :disabled="!!context?.disabled"
    :autofocus="context.autofocus"
    :padded="context.padded"
    :size="context.size"
    :color="context.color"
    :variant="context.variant"
    :input-class="context.inputClass"
    :loading="context.loading"
    :icon="context.icon"
    :trailing-icon="context.trailingIcon"
    :leading-icon="context.leadingIcon"
    :trailing="context.trailing"
    :leading="context.leading"
    @update:model-value="handleInput"
    @change="handleChange"
  />
</template>
