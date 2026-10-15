<script setup lang='ts'>
// Internal - the inline "discard unsaved changes?" prompt shown by
// `FUDataEditOverlay`/`FUAutoFormOverlay` when `confirmDiscard` is on. Inline
// rather than a second overlay since `useOverlay` serves one open() per
// registration at a time (see brain/notes/useoverlay-single-instance-per-registration.md).
defineEmits<{ discard: [], keep: [] }>()
</script>

<template>
  <div
    role="alertdialog"
    aria-label="Discard unsaved changes"
    class="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-warning p-3"
  >
    <span class="text-sm">Discard unsaved changes?</span>
    <div class="flex gap-2">
      <UButton
        type="button"
        label="Keep editing"
        color="neutral"
        variant="outline"
        data-testid="discard-keep"
        @click="$emit('keep')"
      />
      <UButton
        type="button"
        label="Discard"
        color="error"
        data-testid="discard-confirm"
        @click="$emit('discard')"
      />
    </div>
  </div>
</template>
