<script setup lang='ts'>
defineProps({
  data: {
    type: Object,
    default: null,
  },
  header: {
    type: String,
    default: 'Debug Data',
  },
  textClass: {
    type: String,
    default: 'text-xs',
  },
})
</script>

<template>
  <div class="formkit-debug">
    <client-only>
      <UCollapsible class="flex flex-col gap-2">
        <UButton
          :label="header"
          color="neutral"
          variant="outline"
          leading-icon="i-lucide-bug"
          trailing-icon="i-lucide-chevron-down"
          block
        />
        <template #content>
          <div>
            <slot />
          </div>
          <pre
            v-if="data"
            :class="textClass"
          >{{ data }}</pre>
          <span v-else>No Data available</span>
        </template>
      </UCollapsible>
    </client-only>
  </div>
</template>

<style scoped>

</style>
