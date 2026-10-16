<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitColorPickerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  format?: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab'
  throttle?: number
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitColorPickerProps>,
    required: true,
  },
})

const { styleClass, modelValue, ui } = useFormKitInput(props.context)

// `UColorPicker` is pointer-only: its selector/track listen for `pointerdown`
// on their container and `pointermove`/`pointerup` on `window`, and nothing
// inside is focusable (no `tabindex`, no keyboard handling), so there is no
// native blur - or focus - to wire. It also emits nothing but
// `update:modelValue`, so `@change` below never fires. Instead, the end of a
// pointer interaction that started on the picker counts as the field being
// touched, which is what makes `validationVisibility: 'blur'` activate.
let pressedInside = false

function handlePointerDown() {
  pressedInside = true
}

function handlePointerUp(event: Event) {
  if (!pressedInside)
    return
  pressedInside = false
  props.context.handlers.blur(event as FocusEvent)
}

onMounted(() => window.addEventListener('pointerup', handlePointerUp))
onBeforeUnmount(() => window.removeEventListener('pointerup', handlePointerUp))
</script>

<template>
  <UColorPicker
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :disabled="!!context?.disabled"
    :style="context?.attrs.style"
    :size="context.size ?? 'md'"
    :format="context.format || 'hex'"
    :throttle="context.throttle"
    :ui="ui"
    @pointerdown="handlePointerDown"
  />
</template>
