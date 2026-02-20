<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitSwitchProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  inputClass?: string
  label?: string
  description?: string
  icon?: string
  onIcon?: string
  offIcon?: string
  loading?: boolean
  loadingIcon?: string
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSwitchProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <USwitch
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :color="color as any"
    :description="context.description"
    :disabled="!!context?.disabled"
    :highlight="!!(isInvalid || context.highlight)"
    :icon="context.icon"
    :input-class="context.inputClass"
    :label="context.label"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :off-icon="context.offIcon"
    :on-icon="context.onIcon"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
