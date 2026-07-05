import { describe, expect, it } from 'vitest'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { mountFormKit } from './mountFormKit'

describe('mountFormKit harness', () => {
  it('mounts nuxtUIInput and renders a real <input> element', async () => {
    const wrapper = await mountFormKit({
      type: 'nuxtUIInput',
      value: 'hello',
      inputs: { nuxtUIInput: nuxtUIInputDefinition },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('hello')
  })
})
