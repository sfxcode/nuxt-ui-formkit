import type { Ref } from 'vue'
import { ref, watch } from 'vue'

/**
 * Shared by `FUDataEditOverlay.vue`/`FUAutoFormOverlay.vue`: both need to
 * resolve their `useOverlay` `close` emit exactly once per open cycle, from
 * whichever of several sources fires first - an explicit Save/Cancel button,
 * or `UModal`/`USlideover`'s own Esc/backdrop dismissal, which only ever
 * surfaces as their `open` v-model transitioning to `false` with no
 * dedicated event of its own.
 *
 * `useOverlay` reuses the same wrapper instance across sequential `edit()`/
 * `auto()` calls (its registered `id` is fixed at `.create()` time, not
 * per-`open()` call), so "has this open cycle already resolved" has to reset
 * on every reopen, not just be set once ever - otherwise a *later* call's
 * Esc/backdrop dismissal would see the flag still `true` from a previous
 * cycle's Save/Cancel and silently no-op, leaving that later promise pending
 * forever.
 */
export function useOverlayCloseResolution(
  open: Ref<boolean>,
  emit: (event: 'close', value: unknown) => void,
  options: { shouldConfirm?: () => boolean } = {},
) {
  let hasResolved = false
  // True while the "discard unsaved changes?" prompt is showing.
  const confirming = ref(false)

  function resolveOnce(value: unknown) {
    if (hasResolved)
      return
    hasResolved = true
    emit('close', value)
  }

  watch(open, (isOpen) => {
    if (isOpen) {
      hasResolved = false
      confirming.value = false
    }
    else {
      resolveOnce(null)
    }
  })

  // Every dismissal route (Cancel button, header X, Esc, backdrop) funnels
  // through here. `UModal`/`USlideover` only report Esc/backdrop/X as their
  // `open` v-model going `false` - and the X sits inside a Reka `DialogClose`,
  // so `dismissible` can't block it - so the wrapper binds `open` one-way and
  // routes `update:open` through `onUpdateOpen` instead: if the guard says
  // there's something to lose, `open` is simply never set to `false`.
  function requestClose() {
    if (options.shouldConfirm?.()) {
      confirming.value = true
      return
    }
    resolveOnce(null)
  }

  function onUpdateOpen(value: boolean) {
    if (value)
      open.value = true
    else
      requestClose()
  }

  function discard() {
    confirming.value = false
    resolveOnce(null)
  }

  function keepEditing() {
    confirming.value = false
  }

  return { resolveOnce, confirming, requestClose, onUpdateOpen, discard, keepEditing }
}
