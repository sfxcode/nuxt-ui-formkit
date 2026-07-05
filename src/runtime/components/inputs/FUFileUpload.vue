<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitFileUploadProps {
  multiple?: boolean
  accept?: string
  icon?: string | false
  label?: string
  description?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'area' | 'button'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  layout?: 'list' | 'grid'
  position?: 'inside' | 'outside'
  highlight?: boolean
  dropzone?: boolean
  interactive?: boolean
  required?: boolean
  reset?: boolean
  fileIcon?: string
  fileImage?: boolean
  fileDelete?: boolean | Record<string, unknown>
  fileDeleteIcon?: string
  preview?: boolean
  name?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitFileUploadProps>,
    required: true,
  },
})

const { handleInput, handleChange, isInvalid, styleClass, color, modelValue, validSlotNames } = useFormKitInput(props.context)
</script>

<template>
  <UFileUpload
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :highlight="isInvalid || context.highlight"
    :multiple="context.multiple"
    :accept="context.accept"
    :icon="context.icon"
    :label="context.label"
    :description="context.description"
    :color="color"
    :variant="context.variant ?? 'area'"
    :size="context.size ?? 'md'"
    :layout="context.layout ?? 'list'"
    :position="context.position ?? 'outside'"
    :dropzone="context.dropzone"
    :interactive="context.interactive"
    :required="context.required"
    :reset="context.reset"
    :file-icon="context.fileIcon"
    :file-image="context.fileImage"
    :file-delete="context.fileDelete"
    :file-delete-icon="context.fileDeleteIcon"
    :preview="context.preview"
    :name="context.name"
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
  </UFileUpload>
</template>
