import { createNode } from '@formkit/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAutosavePlugin } from '../../src/runtime/formkit/plugins/autosave'

// Node-level (no mounted DOM), like the asterisk plugin tests: the failure modes
// here are unhandled rejections inside `@formkit/addons`' async handlers, which
// only show up if a test listens for them explicitly.
const STORAGE_KEY = 'nuxt-ui-formkit-draft-form'

let rejections: unknown[]
const onRejection = (reason: unknown) => rejections.push(reason)

beforeEach(() => {
  rejections = []
  process.on('unhandledRejection', onRejection)
})

afterEach(() => {
  process.off('unhandledRejection', onRejection)
  vi.restoreAllMocks()
  localStorage.clear()
})

function createForm(value: Record<string, unknown> = {}) {
  return createNode({
    type: 'group',
    name: 'form',
    value,
    plugins: [createAutosavePlugin({ key: 'draft', debounce: 0 })],
  })
}

// An unhandled rejection surfaces some ticks after the async handler that
// caused it, and there is no positive signal for "nothing rejected" - so these
// tests give the handlers a short, fixed window and then assert on the absence.
const rejectionWindow = (ms = 60) => new Promise(resolve => setTimeout(resolve, ms))

describe('createAutosavePlugin failure handling', () => {
  it('drops a corrupt stored draft instead of rejecting on every mount', async () => {
    localStorage.setItem(STORAGE_KEY, '{not json')

    createForm({ email: '' })
    await rejectionWindow()

    expect(rejections).toEqual([])
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('drops a stored draft with the wrong shape', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify('just a string'))

    createForm({ email: '' })
    await rejectionWindow()

    expect(rejections).toEqual([])
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('survives a full or unavailable localStorage and keeps saving once it works again', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError')
    })
    const node = createForm({ email: '' })

    node.input({ email: 'ada@example.com' })
    await rejectionWindow()
    expect(rejections).toEqual([])

    setItem.mockRestore()
    node.input({ email: 'grace@example.com' })

    await vi.waitFor(() => expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).data).toEqual({ email: 'grace@example.com' }))
  })

  it('does not throw when the form is destroyed while a draft is being restored', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ maxAge: Date.now() + 60_000, data: { email: 'ada@example.com' } }))

    const node = createForm({ email: '' })
    node.destroy()
    await rejectionWindow()

    expect(rejections).toEqual([])
  })
})
