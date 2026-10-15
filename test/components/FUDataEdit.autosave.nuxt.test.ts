import { getNode } from '@formkit/core'
import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FUDataEdit from '../../src/runtime/components/FUDataEdit.vue'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'

const storageKey = (key: string) => `nuxt-ui-formkit-${key}-test-autosave`

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

// FormKit's registry and localStorage both outlive a test's wrapper, so a
// leftover draft or node from one test would leak into the next.
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
  localStorage.clear()
})

async function mountDataEdit(props: Record<string, unknown> = {}) {
  const wrapper = await mountSuspended(FUDataEdit, {
    attachTo: document.body,
    props: {
      id: 'test-autosave',
      schema: [{ $formkit: 'nuxtUIInput', name: 'email', label: 'Email' }],
      data: { email: '' },
      ...props,
    },
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInput: nuxtUIInputDefinition } })]],
    },
  })
  activeWrapper = wrapper
  await flushPromises()
  return wrapper
}

const inputValue = (wrapper: Awaited<ReturnType<typeof mountDataEdit>>) =>
  (wrapper.find('input').element as HTMLInputElement).value

describe('FUDataEdit autosave prop', () => {
  it('saves edits and restores them into the rendered input on the next mount', async () => {
    let wrapper = await mountDataEdit({ autosave: 'draft' })
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toContain('ada@example.com'))

    wrapper.unmount()
    wrapper = await mountDataEdit({ autosave: 'draft' })

    await vi.waitFor(() => expect(inputValue(wrapper)).toBe('ada@example.com'))
  })

  it('does not store FormKitSchema\'s internal slots key', async () => {
    const wrapper = await mountDataEdit({ autosave: 'draft' })
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toBeTruthy())

    expect(JSON.parse(localStorage.getItem(storageKey('draft'))!).data).toEqual({ email: 'ada@example.com' })
  })

  it('reports a restored draft as dirty', async () => {
    let wrapper = await mountDataEdit({ autosave: 'draft' })
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toBeTruthy())
    wrapper.unmount()

    wrapper = await mountDataEdit({ autosave: 'draft' })
    await vi.waitFor(() => expect(inputValue(wrapper)).toBe('ada@example.com'))

    await vi.waitFor(() => expect(getNode('test-autosave')!.context!.state.dirty).toBe(true))
  })

  it('leaves a form with nothing to restore clean', async () => {
    await mountDataEdit({ autosave: 'draft' })
    await new Promise(resolve => setTimeout(resolve, 150))

    expect(getNode('test-autosave')!.context!.state.dirty).toBeFalsy()
  })

  it('clears the saved draft when the form is submitted', async () => {
    const wrapper = await mountDataEdit({ autosave: 'draft' })
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toBeTruthy())

    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toBeNull())
  })

  it('does not write the submitted draft back when a pending debounced save fires after submit', async () => {
    const wrapper = await mountDataEdit({ autosave: { key: 'draft', debounce: 150 } })
    await wrapper.find('input').setValue('ada@example.com')
    // Submit inside the debounce window, so the save for this edit is still pending.
    await wrapper.find('form').trigger('submit')
    await new Promise(resolve => setTimeout(resolve, 400))

    expect(localStorage.getItem(storageKey('draft'))).toBeNull()
  })

  it('keeps drafts with different keys separate', async () => {
    let wrapper = await mountDataEdit({ autosave: 'one' })
    await wrapper.find('input').setValue('one@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('one'))).toBeTruthy())
    wrapper.unmount()

    wrapper = await mountDataEdit({ autosave: 'two' })
    await flushPromises()

    expect(inputValue(wrapper)).toBe('')
  })

  it('ignores a draft older than maxAge', async () => {
    localStorage.setItem(
      storageKey('draft'),
      JSON.stringify({ maxAge: Date.now() - 1000, data: { email: 'stale@example.com' } }),
    )

    const wrapper = await mountDataEdit({ autosave: 'draft' })
    await flushPromises()

    expect(inputValue(wrapper)).toBe('')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toBeNull())
  })

  it('saves nothing without the autosave prop', async () => {
    const wrapper = await mountDataEdit()
    await wrapper.find('input').setValue('ada@example.com')
    await new Promise(resolve => setTimeout(resolve, 400))

    expect(Object.keys(localStorage).filter(k => k.startsWith('nuxt-ui-formkit'))).toEqual([])
  })

  it('accepts an options object', async () => {
    const wrapper = await mountDataEdit({ autosave: { key: 'draft', debounce: 0 } })
    await wrapper.find('input').setValue('ada@example.com')

    await vi.waitFor(() => expect(localStorage.getItem(storageKey('draft'))).toContain('ada@example.com'))
  })
})
