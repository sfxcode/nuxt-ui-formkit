import { strict as assert } from 'node:assert'

/** The `<section>` whose `<h2>` contains `title` (the playground demo pages are built from these). */
export function section(page, title) {
  return page.locator('section', { has: page.locator('h2', { hasText: title }) })
}

/** The visible text of every `<label>` in `scope`, in DOM order. */
export function labelsOf(scope) {
  return scope.locator('label').evaluateAll(labels => labels.map(label => label.textContent.trim()))
}

/** The FormKit validation/message texts currently rendered inside `scope`. */
export function messagesOf(scope) {
  return scope.locator('.formkit-message, [role="alert"], [data-message-type]').allInnerTexts()
}

/**
 * Re-runs `read` until `check(value)` stops throwing, so assertions wait for
 * FormKit's asynchronous validation and commit instead of sleeping. On timeout
 * the last assertion error (with the last value) is thrown.
 */
export async function poll(read, check, { timeout = 8000, interval = 100 } = {}) {
  const deadline = Date.now() + timeout
  let lastError
  for (;;) {
    try {
      const value = await read()
      check(value)
      return value
    }
    catch (error) {
      lastError = error
    }
    if (Date.now() > deadline)
      throw lastError
    await new Promise(resolve => setTimeout(resolve, interval))
  }
}

export { assert }
