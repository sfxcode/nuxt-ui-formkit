<script setup lang="ts">
</script>

<template>
  <div class="vp-card-grid">
    <slot />
  </div>
</template>

<style scoped>
.vp-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

@media (max-width: 768px) {
  .vp-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
