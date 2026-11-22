<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

type ButtonColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
type ButtonVariant = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'

export interface FormKitToggleProps {
  /** Text inside the toggle button. FormKit's own `label` stays the field label above it. */
  toggleLabel?: string
  icon?: string
  leadingIcon?: string
  trailingIcon?: string
  color?: ButtonColor
  variant?: ButtonVariant
  activeColor?: ButtonColor
  activeVariant?: ButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  square?: boolean
  block?: boolean
  defaultValue?: boolean
  name?: string
  ui?: Record<string, unknown>
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitToggleProps>,
    required: true,
  },
})

const { handleBlur, isInvalid, styleClass, modelValue, validSlotNames, commonProps } = useFormKitInput(props.context)

// `commonProps.color` falls back to `primary`; the unpressed toggle keeps Nuxt UI's own
// `neutral` default instead (the pressed look comes from `activeColor`).
const color = computed(() => isInvalid.value ? 'error' : (props.context.color ?? 'neutral'))

// `UToggle` has `inheritAttrs: false` and spreads `$attrs` onto its inner
// `UButton`, so `@blur` lands on the focusable button itself.
</script>

<template>
  <UToggle
    :id="context.id"
    v-model="modelValue"
    :name="context.node.name"
    v-bind="{ ...context?.attrs, ...commonProps }"
    :class="styleClass"
    :color="color"
    :label="context.toggleLabel"
    :icon="context.icon"
    :leading-icon="context.leadingIcon"
    :trailing-icon="context.trailingIcon"
    :variant="context.variant"
    :active-color="context.activeColor"
    :active-variant="context.activeVariant"
    :square="context.square"
    :block="context.block"
    :default-value="context.defaultValue"
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
  </UToggle>
</template>
