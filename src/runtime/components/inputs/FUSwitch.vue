<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitSwitchProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingIcon?: string
  checkedIcon?: string
  uncheckedIcon?: string
  label?: string
  description?: string
  defaultValue?: boolean
  autofocus?: false | true | 'true' | 'false'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSwitchProps>,
    required: true,
  },
})

const { handleInput, handleChange, styleClass, color, modelValue, validSlotNames } = useFormKitInput(props.context)
</script>

<template>
  <USwitch
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :color="color"
    :size="context.size ?? 'md'"
    :loading="context.loading"
    :loading-icon="context.loadingIcon"
    :checked-icon="context.checkedIcon"
    :unchecked-icon="context.uncheckedIcon"
    :label="context.label"
    :description="context.description"
    :default-value="context.defaultValue"
    :autofocus="context.autofocus"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
  >
    <template
      v-for="slotName in validSlotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <component
        :is="context?.slots[slotName]"
        v-bind="{ ...context, ...slotProps }"
      />
    </template>
  </USwitch>
</template>
