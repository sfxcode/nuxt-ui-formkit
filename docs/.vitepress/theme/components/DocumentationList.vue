<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  type?: 'info' | 'tip' | 'warning' | 'danger' | 'details'
}>()
</script>

<template>
  <div :class="['vp-list', type && `vp-list-${type}`]">
    <ul class="vp-list-items">
      <slot />
    </ul>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-class-pattern */
.vp-list {
  border-radius: 8px;
  padding: 16px 20px;
  margin: 16px 0;
  border-left: 4px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.vp-list-info {
  border-left-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.vp-list-tip {
  border-left-color: #42b883;
  background-color: rgba(66, 184, 131, 0.1);
}

.vp-list-warning {
  border-left-color: #e7c000;
  background-color: rgba(231, 192, 0, 0.1);
}

.vp-list-danger {
  border-left-color: #e0234e;
  background-color: rgba(224, 35, 78, 0.1);
}

.vp-list-details {
  border-left-color: #858585;
  background-color: rgba(133, 133, 133, 0.1);
}

.vp-list-items {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.vp-list-items :deep(li) {
  position: relative;
  margin: 8px 0;
  padding-left: 24px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.vp-list-items :deep(li::before) {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  font-size: 16px;
}

.vp-list-tip :deep(li::before) {
  color: #42b883;
}

.vp-list-warning :deep(li::before) {
  content: '⚠';
  color: #e7c000;
}

.vp-list-danger :deep(li::before) {
  content: '✗';
  color: #e0234e;
}

.vp-list-details :deep(li::before) {
  content: '›';
  color: #858585;
}

.vp-list-items :deep(li:first-child) {
  margin-top: 0;
}

.vp-list-items :deep(li:last-child) {
  margin-bottom: 0;
}

.dark .vp-list-info {
  background-color: rgba(0, 220, 130, 0.12);
}

.dark .vp-list-tip {
  background-color: rgba(66, 184, 131, 0.08);
}

.dark .vp-list-warning {
  background-color: rgba(231, 192, 0, 0.08);
}

.dark .vp-list-danger {
  background-color: rgba(224, 35, 78, 0.08);
}

.dark .vp-list-details {
  background-color: rgba(133, 133, 133, 0.08);
}
</style>
