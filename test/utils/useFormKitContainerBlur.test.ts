// @vitest-environment jsdom
import type { FormKitFrameworkContext } from '@formkit/core'
import { describe, expect, it, vi } from 'vitest'
import { createContainerBlurHandler } from '../../src/runtime/utils/useFormKitContainerBlur'

function makeContext() {
  return {
    handlers: {
      blur: vi.fn(),
    },
  } as unknown as FormKitFrameworkContext
}

// `currentTarget` is only ever populated by a real DOM dispatch through a
// listener attached via `addEventListener` - constructing a `FocusEvent` and
// calling the handler directly leaves it `null`, so every case here
// attaches the handler as a real listener and dispatches through it,
// mirroring how `@focusout="handler"` actually invokes it in a component.
function dispatchFocusOut(container: HTMLElement, handler: (event: FocusEvent) => void, relatedTarget: EventTarget | null) {
  container.addEventListener('focusout', handler)
  container.dispatchEvent(new FocusEvent('focusout', { relatedTarget, bubbles: true }))
}

describe('createContainerBlurHandler', () => {
  it('does not call handlers.blur when relatedTarget is inside the container', () => {
    const container = document.createElement('div')
    const childA = document.createElement('button')
    const childB = document.createElement('button')
    container.append(childA, childB)

    const context = makeContext()
    dispatchFocusOut(container, createContainerBlurHandler(context), childB)

    expect(context.handlers.blur).not.toHaveBeenCalled()
  })

  it('calls handlers.blur when relatedTarget is null (focus left the document/window)', () => {
    const container = document.createElement('div')
    const context = makeContext()
    dispatchFocusOut(container, createContainerBlurHandler(context), null)

    expect(context.handlers.blur).toHaveBeenCalledOnce()
  })

  it('calls handlers.blur when relatedTarget is outside the container', () => {
    const container = document.createElement('div')
    const outside = document.createElement('button')

    const context = makeContext()
    dispatchFocusOut(container, createContainerBlurHandler(context), outside)

    expect(context.handlers.blur).toHaveBeenCalledOnce()
  })

  it('fails open (calls handlers.blur) if currentTarget is unavailable, rather than silently never firing', () => {
    const context = makeContext()
    const handler = createContainerBlurHandler(context)

    // Calling the handler directly (not through a real dispatch) leaves
    // `event.currentTarget` `null` - the indeterminate case this helper
    // deliberately fails open on.
    handler(new FocusEvent('focusout', { relatedTarget: document.createElement('button') }))

    expect(context.handlers.blur).toHaveBeenCalledOnce()
  })
})
