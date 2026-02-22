<script setup lang='ts'>
defineProps({
  data: {
    type: Object,
    default: null,
  },
  header: {
    type: String,
    default: 'Debug',
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
      <h3 class="text-lg font-semibold mb-2">
        {{ header }}
      </h3>
      <slot />
      <pre
        v-if="data"
        :class="textClass"
      >{{ data }}</pre>
      <span v-else>No Data available</span>
    </client-only>
  </div>
</template>

<style scoped>

</style>
