<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'
import { createContainerBlurHandler } from '../../utils/useFormKitContainerBlur'

export interface FormKitPinInputProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  length?: string | number
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  fixed?: boolean
  defaultValue?: string[] | undefined
  mask?: boolean
  otp?: boolean
  separator?: number | number[]
  type?: 'text' | 'number'
  placeholder?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitPinInputProps>,
    required: true,
  },
})

const { handleInput, handleChange, handleBlur, isInvalid, styleClass, color, modelValue, ui } = useFormKitInput(props.context)

// `UPinInput`'s own `blur` emit only fires when `relatedTarget` is `null` or
// the code is fully entered (`completed`) - confirmed empirically: tabbing
// away from an *incomplete* PIN to any other real, focusable element never
// emits it. `@focusout` (Vue's default attrs-fallthrough onto the
// single-root `PinInputRoot`) plus a relatedTarget-outside-container check
// catches that missed case too, while still correctly ignoring focus moves
// between the PIN's own cells.
const handleContainerBlur = createContainerBlurHandler(props.context)

// `UPinInput` types its own `blur` emit as a generic `Event` (`blur: [event:
// Event]`), unlike every other component wired so far - `handleBlur` (typed
// `(event: FocusEvent) => void`) isn't assignable there. It's genuinely a
// `FocusEvent` at runtime; cast locally rather than widening the shared
// `useFormKitInput` signature every other component already binds directly.
function handlePinBlur(event: Event) {
  handleBlur(event as FocusEvent)
}
</script>

<template>
  <UPinInput
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
    :length="context.length ?? 5"
    :autofocus="context.autofocus"
    :autofocus-delay="context.autofocusDelay"
    :fixed="context.fixed"
    :mask="context.mask"
    :otp="context.otp"
    :separator="context.separator"
    :type="context.type ?? 'text'"
    :placeholder="context.placeholder"
    :ui="ui"
    @change="handleChange"
    @update:model-value="handleInput"
    @blur="handlePinBlur"
    @focusout="handleContainerBlur"
  />
</template>
