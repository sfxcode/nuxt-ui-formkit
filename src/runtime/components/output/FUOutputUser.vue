<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

// Mirrors UUser's own `avatar` prop shape (a subset - UUser itself allows any
// extra Avatar prop via an index signature, but these are the ones a schema
// author is expected to set).
export interface FormKitOutputUserAvatar {
  src?: string
  alt?: string
  icon?: string
  text?: string
}

export interface FormKitOutputUserValue {
  name?: string
  description?: string
  avatar?: FormKitOutputUserAvatar
}

export interface FormKitOutputUserProps {
  chip?: boolean | Record<string, unknown>
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputUserProps & FormKitIconProps>,
    required: true,
  },
})

// Unlike every other Output component, this field's value is an object shaped
// like UUser's own props, not a scalar - confirmed FormKit delivers it through
// to `context._value` unmodified (see phase 8's mount check).
const userValue = computed(() => props.context._value as FormKitOutputUserValue | undefined)

const { containerClass, iconClass, leadingIconName, trailingIconName, ui } = useFormKitOutput(props.context)
</script>

<template>
  <div
    :id="context.id"
    :class="containerClass"
    :style="context?.attrs?.style"
  >
    <FUIcon
      v-if="leadingIconName"
      :name="leadingIconName as string"
      :class="iconClass"
      :on-click="context?.onLeadingIconClicked"
    />

    <UUser
      :name="userValue?.name"
      :description="userValue?.description"
      :avatar="userValue?.avatar"
      :chip="context.chip"
      :size="context.size"
      :orientation="context.orientation"
      :ui="ui?.user"
    />

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
