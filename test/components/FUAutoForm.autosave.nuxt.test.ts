import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FUAutoForm from '../../src/runtime/components/FUAutoForm.vue'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'

// `createAutosavePlugin`'s docs say `FUAutoForm` takes the same `autosave` prop
// as `FUDataEdit`. It declares no such prop itself - it forwards `$attrs` - so
// this pins that the forwarding actually reaches the plugin.
const storageKey = 'nuxt-ui-formkit-draft-test-autoform-autosave'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
  localStorage.clear()
})

async function mountAutoForm() {
  const wrapper = await mountSuspended(FUAutoForm, {
    attachTo: document.body,
    props: { id: 'test-autoform-autosave', data: { email: '' }, autosave: 'draft' },
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInput: nuxtUIInputDefinition } })]],
    },
  })
  activeWrapper = wrapper
  await flushPromises()
  return wrapper
}

describe('FUAutoForm autosave prop', () => {
  it('saves edits and restores them on the next mount, through FUDataEdit', async () => {
    let wrapper = await mountAutoForm()
    await wrapper.find('input').setValue('ada@example.com')
    await vi.waitFor(() => expect(localStorage.getItem(storageKey)).toContain('ada@example.com'))

    wrapper.unmount()
    wrapper = await mountAutoForm()

    await vi.waitFor(() => expect((wrapper.find('input').element as HTMLInputElement).value).toBe('ada@example.com'))
  })
})
