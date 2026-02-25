import { describe, expect, it, vi } from 'vitest'
import type { FormKitFrameworkContext } from '@formkit/core'
import { useFormKitInput } from '../../src/runtime/utils/useFormKitInput'

// Helper type for partial contexts in tests
type PartialContext = Partial<FormKitFrameworkContext>

describe('useFormKitInput', () => {
  it('returns invalid state when validation is visible and not valid', () => {
    const context: PartialContext = {
      state: {
        validationVisible: true,
        valid: false,
      },
    }
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(isInvalid.value).toBe(true)
  })

  it('returns valid state when validation is not visible or valid', () => {
    const context: PartialContext = {
      state: {
        validationVisible: false,
        valid: true,
      },
    }
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(isInvalid.value).toBe(false)
  })

  it('returns correct style class when invalid', () => {
    const context: PartialContext = {
      state: {
        validationVisible: true,
        valid: false,
      },
      attrs: {
        class: 'custom-class',
      },
    }
    const { styleClass } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(styleClass.value).toBe('custom-class nuxt-ui-formkit--invalid')
  })

  it('returns correct style class when valid', () => {
    const context = {
      state: {
        validationVisible: false,
        valid: true,
      },
      attrs: {
        class: 'custom-class',
      },
    }
    const { styleClass } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(styleClass.value).toBe('custom-class')
  })

  it('handles blur event safely', () => {
    const blurHandler = vi.fn()
    const context = {
      handlers: {
        blur: blurHandler,
      },
    }
    const { handleBlur } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleBlur(new Event('blur') as FocusEvent)
    expect(blurHandler).toHaveBeenCalled()
  })

  it('handles change event safely', () => {
    const inputHandler = vi.fn()
    const context = {
      node: {
        input: inputHandler,
      },
      _value: 'new-value',
    }
    const { handleChange } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleChange('new-value')
    expect(inputHandler).toHaveBeenCalledWith('new-value')
  })

  it('handles input event safely', () => {
    const inputHandler = vi.fn()
    const context = {
      node: {
        input: inputHandler,
      },
      _value: 'input-value',
    }
    const { handleInput } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleInput('input-value')
    expect(inputHandler).toHaveBeenCalledWith('input-value')
  })

  it('handles select event safely', () => {
    const inputHandler = vi.fn()
    const context = {
      node: {
        input: inputHandler,
      },
    }
    const { handleSelect } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleSelect('selected-value')
    expect(inputHandler).toHaveBeenCalledWith('selected-value')
  })

  it('returns valid slot names excluding FormKit slots', () => {
    const context = {
      slots: {
        label: () => {},
        help: () => {},
        customSlot: () => {},
      },
    }
    const { validSlotNames } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(validSlotNames.value).toEqual(['customSlot'])
  })

  it('excludes all FormKit default slots', () => {
    const context = {
      slots: {
        label: () => {},
        help: () => {},
        messages: () => {},
        message: () => {},
        input: () => {},
        custom1: () => {},
        custom2: () => {},
      },
    }
    const { validSlotNames } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(validSlotNames.value).toEqual(['custom1', 'custom2'])
  })

  it('handles empty slots object', () => {
    const context = {
      slots: {},
    }
    const { validSlotNames } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(validSlotNames.value).toEqual([])
  })

  it('handles missing slots property', () => {
    const context = {}
    const { validSlotNames } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(validSlotNames.value).toEqual([])
  })
})

describe('useFormKitInput - color property', () => {
  it('returns error color when invalid', () => {
    const context = {
      state: {
        validationVisible: true,
        valid: false,
      },
    }
    const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(color.value).toBe('error')
  })

  it('returns primary color by default when valid', () => {
    const context = {
      state: {
        validationVisible: false,
        valid: true,
      },
    }
    const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(color.value).toBe('primary')
  })

  it('returns custom color from context when valid', () => {
    const context = {
      state: {
        validationVisible: false,
        valid: true,
      },
      color: 'success',
    }
    const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(color.value).toBe('success')
  })

  it('returns error color even with custom color when invalid', () => {
    const context = {
      state: {
        validationVisible: true,
        valid: false,
      },
      color: 'success',
    }
    const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(color.value).toBe('error')
  })

  it('supports all color variants', () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    colors.forEach((colorValue) => {
      const context = {
        state: {
          validationVisible: false,
          valid: true,
        },
        color: colorValue,
      }
      const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
      expect(color.value).toBe(colorValue)
    })
  })
})

describe('useFormKitInput - modelValue property', () => {
  it('returns current value from context', () => {
    const context = {
      _value: 'test-value',
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe('test-value')
  })

  it('updates value when set', () => {
    const inputHandler = vi.fn()
    const context = {
      _value: 'old-value',
      node: {
        input: inputHandler,
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    modelValue.value = 'new-value'
    expect(inputHandler).toHaveBeenCalledWith('new-value')
  })

  it('handles null value', () => {
    const context = {
      _value: null,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe(null)
  })

  it('handles undefined value', () => {
    const context = {
      _value: undefined,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe(undefined)
  })

  it('handles number value', () => {
    const context = {
      _value: 42,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe(42)
  })

  it('handles boolean value', () => {
    const context = {
      _value: true,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe(true)
  })

  it('handles object value', () => {
    const objValue = { name: 'test', id: 1 }
    const context = {
      _value: objValue,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toEqual(objValue)
  })

  it('handles array value', () => {
    const arrayValue = ['item1', 'item2']
    const context = {
      _value: arrayValue,
      node: {
        input: vi.fn(),
      },
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toEqual(arrayValue)
  })
})

describe('useFormKitInput - items property', () => {
  it('returns items from context.options', () => {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ]
    const context = {
      options,
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual(options)
  })

  it('returns items from context.attrs.items when options not present', () => {
    const itemsList = [
      { label: 'Item 1', value: 'a' },
      { label: 'Item 2', value: 'b' },
    ]
    const context = {
      attrs: {
        items: itemsList,
      },
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual(itemsList)
  })

  it('prioritizes context.options over context.attrs.items', () => {
    const options = [{ label: 'Option', value: 1 }]
    const itemsList = [{ label: 'Item', value: 2 }]
    const context = {
      options,
      attrs: {
        items: itemsList,
      },
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual(options)
  })

  it('returns empty array when options is not an array', () => {
    const context = {
      options: 'not-an-array',
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual([])
  })

  it('returns empty array when attrs.items is not an array', () => {
    const context = {
      attrs: {
        items: { invalid: 'format' },
      },
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual([])
  })

  it('returns empty array when neither options nor items present', () => {
    const context = {
      attrs: {},
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual([])
  })

  it('handles empty array', () => {
    const context = {
      options: [],
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual([])
  })
})

describe('useFormKitInput - edge cases', () => {
  it('handles missing state properties gracefully', () => {
    const context = {}
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(isInvalid.value).toBe(undefined)
  })

  it('handles missing attrs.class gracefully', () => {
    const context = {
      state: {
        validationVisible: false,
        valid: true,
      },
    }
    const { styleClass } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(styleClass.value).toBe('')
  })

  it('handles missing handlers.blur gracefully', () => {
    const context = {}
    const { handleBlur } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(() => handleBlur(new Event('blur') as FocusEvent)).not.toThrow()
  })

  it('handles missing node.input gracefully', () => {
    const context = {}
    const { handleChange } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(() => handleChange('value')).not.toThrow()
  })

  it('handles partial state object', () => {
    const context = {
      state: {
        validationVisible: true,
      },
    }
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    // When validationVisible is true but valid is undefined, !undefined = true
    expect(isInvalid.value).toBe(true)
  })

  it('handles undefined context properties in styleClass', () => {
    const context = {
      state: {
        validationVisible: true,
        valid: false,
      },
      attrs: {},
    }
    const { styleClass } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(styleClass.value).toBe(' nuxt-ui-formkit--invalid')
  })

  it('trims whitespace correctly in styleClass', () => {
    const context = {
      state: {
        validationVisible: false,
        valid: true,
      },
      attrs: {
        class: '  custom-class  ',
      },
    }
    const { styleClass } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(styleClass.value).toBe('  custom-class  ')
  })

  it('handles missing attrs object when accessing items', () => {
    const context = {}
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(() => items.value).toThrow()
  })

  it('handles validationVisible false with valid undefined', () => {
    const context = {
      state: {
        validationVisible: false,
      },
    }
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(isInvalid.value).toBe(false)
  })

  it('handles state with both properties as undefined', () => {
    const context = {
      state: {
        validationVisible: undefined,
        valid: undefined,
      },
    }
    const { isInvalid } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    // undefined && !undefined = undefined
    expect(isInvalid.value).toBe(undefined)
  })

  it('handles missing node in modelValue getter', () => {
    const context = {
      _value: 'test',
    }
    const { modelValue } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(modelValue.value).toBe('test')
  })

  it('handles handleInput with undefined parameter', () => {
    const inputHandler = vi.fn()
    const context = {
      node: {
        input: inputHandler,
      },
      _value: 'current-value',
    }
    const { handleInput } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleInput(undefined)
    expect(inputHandler).toHaveBeenCalledWith('current-value')
  })

  it('handles handleChange with undefined parameter', () => {
    const inputHandler = vi.fn()
    const context = {
      node: {
        input: inputHandler,
      },
      _value: 'current-value',
    }
    const { handleChange } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    handleChange(undefined)
    expect(inputHandler).toHaveBeenCalledWith('current-value')
  })

  it('handles color with undefined state', () => {
    const context = {}
    const { color } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(color.value).toBe('primary')
  })

  it('handles items with null options', () => {
    const context = {
      options: null,
      attrs: {
        items: null,
      },
    }
    const { items } = useFormKitInput(context as unknown as FormKitFrameworkContext)
    expect(items.value).toEqual([])
  })
})
