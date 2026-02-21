<script setup lang="ts">
import type { PropType } from 'vue'

export interface FormKitIconProps {
  onIconClicked?: () => void
  onLeadingIconClicked?: () => void
  onTrailingIconClicked?: () => void
}

defineProps({
  name: {
    type: String as PropType<string>,
    required: true,
  },
  onClick: { type: Function as PropType<() => void>, default: undefined },
  iconClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <UIcon
    :name="name"
    @click="onClick"
  />
</template>
