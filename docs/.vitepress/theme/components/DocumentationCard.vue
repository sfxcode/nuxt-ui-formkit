<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
  to?: string
  target?: string
}>()
</script>

<template>
  <a
    v-if="to"
    :href="to"
    :target="target"
    class="vp-card"
  >
    <div class="vp-card-content">
      <div class="vp-card-header">
        <span
          v-if="icon"
          :class="icon"
          class="vp-card-icon"
        />
        <h3 class="vp-card-title">{{ title }}</h3>
      </div>
      <p class="vp-card-description">
        <slot />
      </p>
    </div>
  </a>
  <div
    v-else
    class="vp-card vp-card-static"
  >
    <div class="vp-card-content">
      <div class="vp-card-header">
        <span
          v-if="icon"
          :class="icon"
          class="vp-card-icon"
        />
        <h3 class="vp-card-title">
          {{ title }}
        </h3>
      </div>
      <p class="vp-card-description">
        <slot />
      </p>
    </div>
  </div>
</template>

<style scoped>
.vp-card {
  display: block;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.vp-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.vp-card-static {
  cursor: default;
}

.vp-card-static:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--vp-c-divider);
}

.vp-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vp-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vp-card-icon {
  font-size: 24px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.vp-card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.vp-card-description {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.dark .vp-card {
  background-color: var(--vp-c-bg-soft);
}
</style>
