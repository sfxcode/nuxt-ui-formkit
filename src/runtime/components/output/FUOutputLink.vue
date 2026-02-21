<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFormKitOutput } from '../../utils/useFormKitOutput'

export interface FormKitOutputLinkProps {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon?: string
  leading?: boolean
  leadingIcon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  trailing?: boolean
  trailingIcon?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitOutputLinkProps>,
    required: true,
  },
})

const linkUrl = computed(() => props.context._value ?? '')

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

const displayValue = computed(() => {
  return linkUrl
})

const { containerClass, iconClass, leadingIconName, trailingIconName } = useFormKitOutput(props.context)

const linkClass = computed(() => {
  const classes = [
    containerClass.value,
  ]
  return classes.filter(Boolean).join(' ')
})
</script>

<template>
  <div
    :id="context.id"
    :class="containerClass"
    :style="context?.attrs?.style"
  >
    <UIcon
      v-if="leadingIconName"
      :name="leadingIconName"
      :class="iconClass"
    />
    <ULink
      v-if="isExternal"
      :href="isExternal ? linkUrl : undefined"
      :target="linkTarget"
      :rel="linkRel"
      :class="linkClass"
      :style="context?.attrs?.style"
    >
      <span>{{ displayValue }}</span>
    </ULink>
    <NuxtLink
      v-else
      :to="linkUrl"
      :class="linkClass"
      :style="context?.attrs?.style"
    >
      <span>{{ displayValue }}</span>
    </NuxtLink>

    <UIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      :class="iconClass"
    />
  </div>
</template>
