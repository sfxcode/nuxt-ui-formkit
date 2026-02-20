<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitColorPickerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  inputClass?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  format?: 'hex' | 'rgb' | 'hsl'
  modes?: ('hex' | 'rgb' | 'hsl')[]
  showAlpha?: boolean
  showInput?: boolean
  swatches?: string[]
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitColorPickerProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UColorPicker
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :format="context.format"
    :highlight="!!(isInvalid || context.highlight)"
    :input-class="context.inputClass"
    :modes="context.modes"
    :show-alpha="context.showAlpha"
    :show-input="context.showInput"
    :size="context.size ?? 'md'"
    :style="context?.attrs.style"
    :swatches="context.swatches"
    :variant="context.variant ?? 'outline'"
    @change="handleChange"
    @update:model-value="handleInput"
  />
</template>
