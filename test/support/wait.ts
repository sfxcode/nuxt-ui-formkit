/**
 * Fixed-duration sleep, used to let FormKit's async validation/commit
 * pipeline run after `flushPromises()`/`nextTick()`.
 *
 * A sleep is only a lower bound: under load (full suite, CI) validation can
 * still be pending afterwards. Assertions on state that depends on it should
 * be wrapped in `vi.waitFor(...)` rather than relying on this alone.
 *
 * Prefer `vi.waitFor(() => expect(<the outcome>))` for new tests; after a mount
 * use `await getNode(id).settled`. Keep a sleep only to assert that something
 * did NOT happen (absence over a window, which has no positive signal) or where
 * the timing itself is the behaviour under test - and say so in a comment.
 */
export function wait(ms: number = 30) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}
