import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { wait } from './wait'

/**
 * Drains pending promises and Vue's render queue. Enough when the thing under
 * test only needs reactive state/DOM to catch up.
 */
export async function settle() {
  await flushPromises()
  await nextTick()
}

/**
 * `settle()` plus a short sleep, for FormKit's async validation/commit
 * pipeline. The sleep is only a lower bound - assertions on state that depends
 * on it should still be wrapped in `vi.waitFor(...)`.
 */
export async function settleAndWait(ms?: number) {
  await settle()
  await wait(ms)
}
