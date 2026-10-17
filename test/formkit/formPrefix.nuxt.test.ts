import { describe, expect, it } from 'vitest'
import { createNuxtUiFormkitConfig } from '../../src/runtime/formkit/createNuxtUiFormkitConfig'
import { mountFormKit } from '../support/mountFormKit'

const inputs = createNuxtUiFormkitConfig().inputs ?? {}

// FormKit and Nuxt UI number their ids and `for`/`aria-*` links per mount, and FormKit writes the type
// name as it was given into `data-type`, so those differ between two otherwise identical mounts.
function structure(html: string): string {
  return html
    .replace(/\bdata-type="[^"]*"/g, 'data-type="TYPE"')
    .replace(/\b(id|for|aria-describedby|aria-labelledby|aria-controls)="[^"]*"/g, '$1="ID"')
    .replace(/\b(input|reka-[a-z-]+)[_-]v?-?\d+\b/g, '$1-N')
}

async function rendered(type: string, props: Record<string, unknown>, value?: unknown) {
  const wrapper = await mountFormKit({ type, value, props, inputs })
  return wrapper.html()
}

describe('form prefix names rendered through FormKit', () => {
  it('formInput renders like nuxtUIInput', async () => {
    const props = { name: 'name', label: 'Name', help: 'Your name', placeholder: 'Type here' }

    const form = await rendered('formInput', props, 'Fighter')
    const nuxt = await rendered('nuxtUIInput', props, 'Fighter')

    expect(form).toContain('Fighter')
    expect(form).toContain('data-type="formInput"')
    expect(form).toContain('data-family="NuxtUIInput"')
    expect(structure(form)).toBe(structure(nuxt))
  })

  it('formSelect renders like nuxtUISelect, with its options', async () => {
    const props = { name: 'role', label: 'Role', options: ['tank', 'healer'] }

    const form = await rendered('formSelect', props, 'tank')
    const nuxt = await rendered('nuxtUISelect', props, 'tank')

    expect(structure(form)).toBe(structure(nuxt))
  })

  it('formOutputText renders like nuxtUIOutputText', async () => {
    const props = { name: 'name', label: 'Name' }

    const form = await rendered('formOutputText', props, 'Fighter')
    const nuxt = await rendered('nuxtUIOutputText', props, 'Fighter')

    expect(form).toContain('Fighter')
    expect(form).toContain('data-family="NuxtUIOutput"')
    expect(structure(form)).toBe(structure(nuxt))
  })
})
