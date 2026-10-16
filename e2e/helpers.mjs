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

/**
 * A FormKit field's node state, read through the `<FormKit>` component that owns
 * `outer` (the `[data-type]` element of the field). Needed because most state has
 * no DOM marker - FormKit does not render `data-blurred`/`data-dirty` here - and a
 * field without an explicit `id` is not in FormKit's `getNode` registry. Relies on
 * Vue exposing `__vueParentComponent` on elements, so it works against the dev
 * server only, which is what the smoke tests run.
 */
export function nodeState(outer) {
  return outer.evaluate((element) => {
    let component = element.__vueParentComponent
    while (component && !component.exposed?.node)
      component = component.parent
    const node = component?.exposed?.node
    if (!node)
      throw new Error('no FormKit node found for this element')
    return { name: node.name, blurred: node.context.state.blurred, dirty: node.context.state.dirty, valid: node.context.state.valid }
  })
}

/** The FormKit field (`[data-type]` outer element) whose label is exactly `label`. */
export function fieldByLabel(scope, label) {
  return scope.locator('[data-type]').filter({ has: scope.locator('label, legend').filter({ hasText: new RegExp(`^${label}\\s*\\*?$`) }) }).first()
}

/** Dispatches a native HTML5 drag from `source` to `target` (real `DragEvent`s sharing one `DataTransfer`). */
export async function dragAndDrop(source, target) {
  const targetHandle = await target.elementHandle()
  await source.evaluate((from, to) => {
    const dataTransfer = new DataTransfer()
    const fire = (element, type) => element.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer }))
    fire(from, 'dragstart')
    fire(to, 'dragenter')
    fire(to, 'dragover')
    fire(to, 'drop')
    fire(from, 'dragend')
  }, targetHandle)
}

export { assert }
