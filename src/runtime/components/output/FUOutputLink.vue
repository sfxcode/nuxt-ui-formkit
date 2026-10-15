<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { FormKitOutputUi } from '../../utils/useFormKitOutput'
import { toSafeHref } from '../../utils/safeUrl'
import { useFormKitOutput } from '../../utils/useFormKitOutput'
import type { FormKitIconProps, FUIconTooltip } from './FUIcon.vue'
import FUIcon from './FUIcon.vue'

export interface FormKitOutputLinkProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  iconTooltip?: FUIconTooltip
  leading?: boolean
  leadingIcon?: string
  leadingIconTooltip?: FUIconTooltip
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  trailingIconTooltip?: FUIconTooltip
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  ui?: FormKitOutputUi
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputLinkProps & FormKitIconProps>,
    required: true,
  },
})

// What gets shown, whatever the value is (a number is shown as-is, not a crash).
const displayValue = computed(() => String(props.context._value ?? ''))

// What gets linked: only a URL with a safe scheme. A data-driven
// `javascript:`/`data:` value renders as plain text instead of a live link.
const linkUrl = computed(() => toSafeHref(props.context._value) ?? '')

const isExternal = computed(() => {
  const url = linkUrl.value
  if (!url)
    return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
})

const linkTarget = computed(() => {
  return props.context.target ?? (isExternal.value ? '_blank' : undefined)
})

const linkRel = computed(() => {
  if (props.context.rel)
    return props.context.rel
  if (isExternal.value && linkTarget.value === '_blank')
    return 'noopener noreferrer'
  return undefined
})

const { containerClass, iconClass, leadingIconName, trailingIconName, leadingTooltip, trailingTooltip } = useFormKitOutput(props.context)
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
      :tooltip="leadingTooltip"
      :on-click="context?.onLeadingIconClicked"
    />
    <!-- Container classes/style are applied once, on the wrapper above. -->
    <ULink
      v-if="isExternal"
      :href="linkUrl"
      :target="linkTarget"
      :rel="linkRel"
    >
      <span>{{ displayValue }}</span>
    </ULink>
    <NuxtLink
      v-else-if="linkUrl"
      :to="linkUrl"
    >
      <span>{{ displayValue }}</span>
    </NuxtLink>
    <span v-else>{{ displayValue }}</span>

    <FUIcon
      v-if="trailingIconName"
      :name="trailingIconName as string"
      :class="iconClass"
      :tooltip="trailingTooltip"
      :on-click="context?.onTrailingIconClicked"
    />
  </div>
</template>
