import { describe, expect, it } from 'vitest'
import { useFormKitEditor } from '../../src/runtime/composables/useFormKitEditor'

describe('useFormKitEditor editorDataToCode', () => {
  const { editorDataToCode } = useFormKitEditor()

  it('escapes single quotes and backslashes so the code stays compilable', () => {
    const code = editorDataToCode({ _dollar_formkit: 'nuxtUIInput', label: `Don't \\ stop` })

    expect(code).toContain(String.raw`label: 'Don\'t \\ stop'`)
    expect(() => new Function(`return ${code}`)()).not.toThrow()
  })

  it('serializes nested objects and arrays instead of [object Object]', () => {
    const code = editorDataToCode({ _dollar_formkit: 'nuxtUIInput', attrs: [{ attrKey: 'items', attrValue: '[1,2]' }, { attrKey: 'ui', attrValue: '{"root":"a"}' }] })

    expect(code).not.toContain('[object Object]')
    const value = new Function(`return ${code}`)()
    expect(value.items).toEqual([1, 2])
    expect(value.ui).toEqual({ root: 'a' })
  })

  it('still serializes options as label/value objects', () => {
    const code = editorDataToCode({ _dollar_formkit: 'nuxtUISelect', options: [{ label: 'A', value: 'a' }] })

    expect(new Function(`return ${code}`)().options).toEqual([{ label: 'A', value: 'a' }])
  })
})
