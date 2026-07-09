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
  trueValue?: unknown
  falseValue?: unknown
  autofocus?: false | true | 'true' | 'false'
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitSwitchProps>,
    required: true,
  },
})

const { handleInput, handleChange, handleBlur, styleClass, color, modelValue, validSlotNames } = useFormKitInput(props.context)

// `USwitch` doesn't declare `blur` in its own emits - `@blur` below relies
// on its `inheritAttrs: false` + manual `$attrs` spread onto the internal
// `SwitchRoot`, not a documented public contract. A future `@nuxt/ui`
// upgrade changing that internal detail is the expected failure mode if
// this ever silently regresses.
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
    :true-value="context.trueValue"
    :false-value="context.falseValue"
    :autofocus="context.autofocus"
    :ui="context.ui"
    @change="handleChange"
    @update:model-value="handleInput"
    @blur="handleBlur"
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
