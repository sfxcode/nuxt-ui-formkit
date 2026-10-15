/**
 * Fixed-duration sleep, used to let FormKit's async validation/commit
 * pipeline run after `flushPromises()`/`nextTick()`.
 *
 * A sleep is only a lower bound: under load (full suite, CI) validation can
 * still be pending afterwards. Assertions on state that depends on it should
 * be wrapped in `vi.waitFor(...)` rather than relying on this alone.
 */
export function wait(ms: number = 30) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}
