<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitCheckboxProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  description?: string
  help?: string
  inputClass?: string
  label?: string
  required?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitCheckboxProps>,
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
  <UCheckbox
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="context.color ?? 'primary'"
    :description="context.description"
    :disabled="!!context?.disabled"
    :help="context.help"
    :input-class="context.inputClass"
    :label="context.label"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
