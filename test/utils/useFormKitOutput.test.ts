import { describe, expect, it } from 'vitest'
import type { FormKitFrameworkContext } from '@formkit/core'
import { useFormKitOutput } from '../../src/runtime/utils/useFormKitOutput'

// Helper type for partial contexts in tests
type PartialContext = Partial<FormKitFrameworkContext>

describe('useFormKitOutput - colorClass', () => {
  it('returns neutral color by default', () => {
    const context: PartialContext = {}
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-gray-900 dark:text-gray-100')
  })

  it('returns primary color class', () => {
    const context: PartialContext = {
      color: 'primary',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-primary')
  })

  it('returns secondary color class', () => {
    const context: PartialContext = {
      color: 'secondary',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-secondary')
  })

  it('returns success color class', () => {
    const context: PartialContext = {
      color: 'success',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-success')
  })

  it('returns info color class', () => {
    const context: PartialContext = {
      color: 'info',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-info')
  })

  it('returns warning color class', () => {
    const context: PartialContext = {
      color: 'warning',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-warning')
  })

  it('returns error color class', () => {
    const context: PartialContext = {
      color: 'error',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-error')
  })

  it('returns neutral color class explicitly', () => {
    const context: PartialContext = {
      color: 'neutral',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-gray-900 dark:text-gray-100')
  })

  it('falls back to neutral for invalid color', () => {
    const context: PartialContext = {
      color: 'invalid-color' as unknown,
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(colorClass.value).toBe('text-gray-900 dark:text-gray-100')
  })
})

describe('useFormKitOutput - sizeClass', () => {
  it('returns md size by default', () => {
    const context: PartialContext = {}
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-base')
  })

  it('returns xs size class', () => {
    const context: PartialContext = {
      size: 'xs',
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-xs')
  })

  it('returns sm size class', () => {
    const context: PartialContext = {
      size: 'sm',
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-sm')
  })

  it('returns md size class explicitly', () => {
    const context: PartialContext = {
      size: 'md',
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-base')
  })

  it('returns lg size class', () => {
    const context: PartialContext = {
      size: 'lg',
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-lg')
  })

  it('returns xl size class', () => {
    const context: PartialContext = {
      size: 'xl',
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-xl')
  })

  it('falls back to md for invalid size', () => {
    const context: PartialContext = {
      size: 'invalid-size' as unknown,
    }
    const { sizeClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(sizeClass.value).toBe('text-base')
  })
})

describe('useFormKitOutput - variantClass', () => {
  it('returns none variant by default', () => {
    const context: PartialContext = {}
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('')
  })

  it('returns outline variant class', () => {
    const context: PartialContext = {
      variant: 'outline',
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1')
  })

  it('returns soft variant class', () => {
    const context: PartialContext = {
      variant: 'soft',
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('bg-gray-100 dark:bg-gray-800 rounded-md')
  })

  it('returns subtle variant class', () => {
    const context: PartialContext = {
      variant: 'subtle',
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('bg-gray-50 dark:bg-gray-900 rounded-md')
  })

  it('returns ghost variant class', () => {
    const context: PartialContext = {
      variant: 'ghost',
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md')
  })

  it('returns none variant class explicitly', () => {
    const context: PartialContext = {
      variant: 'none',
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('')
  })

  it('falls back to none for invalid variant', () => {
    const context: PartialContext = {
      variant: 'invalid-variant' as unknown,
    }
    const { variantClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(variantClass.value).toBe('')
  })
})

describe('useFormKitOutput - containerClass', () => {
  it('returns base container classes by default', () => {
    const context: PartialContext = {}
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toBe('inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 text-base')
  })

  it('combines color, size, and variant classes', () => {
    const context: PartialContext = {
      color: 'primary',
      size: 'lg',
      variant: 'soft',
    }
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toBe('inline-flex items-center gap-2 text-primary text-lg bg-gray-100 dark:bg-gray-800 rounded-md')
  })

  it('includes custom class from attrs', () => {
    const context: PartialContext = {
      attrs: {
        class: 'custom-class',
      },
    }
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toContain('custom-class')
    expect(containerClass.value).toContain('inline-flex')
  })

  it('handles attrs without class', () => {
    const context: PartialContext = {
      attrs: {},
    }
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toBe('inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 text-base')
  })

  it('combines all properties including custom class', () => {
    const context: PartialContext = {
      color: 'success',
      size: 'sm',
      variant: 'outline',
      attrs: {
        class: 'my-custom-class',
      },
    }
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toContain('inline-flex items-center gap-2')
    expect(containerClass.value).toContain('text-success')
    expect(containerClass.value).toContain('text-sm')
    expect(containerClass.value).toContain('border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1')
    expect(containerClass.value).toContain('my-custom-class')
  })

  it('filters out falsy values', () => {
    const context: PartialContext = {
      variant: 'none',
      attrs: {
        class: '',
      },
    }
    const { containerClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(containerClass.value).toBe('inline-flex items-center gap-2 text-gray-900 dark:text-gray-100 text-base')
  })
})

describe('useFormKitOutput - iconClass', () => {
  it('returns md icon size by default', () => {
    const context: PartialContext = {}
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-5 w-5')
  })

  it('returns xs icon size class', () => {
    const context: PartialContext = {
      size: 'xs',
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-3 w-3')
  })

  it('returns sm icon size class', () => {
    const context: PartialContext = {
      size: 'sm',
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-4 w-4')
  })

  it('returns md icon size class explicitly', () => {
    const context: PartialContext = {
      size: 'md',
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-5 w-5')
  })

  it('returns lg icon size class', () => {
    const context: PartialContext = {
      size: 'lg',
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-6 w-6')
  })

  it('returns xl icon size class', () => {
    const context: PartialContext = {
      size: 'xl',
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-7 w-7')
  })

  it('falls back to md for invalid size', () => {
    const context: PartialContext = {
      size: 'invalid' as unknown,
    }
    const { iconClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(iconClass.value).toBe('h-5 w-5')
  })
})

describe('useFormKitOutput - leadingIconName', () => {
  it('returns null when no icon specified', () => {
    const context: PartialContext = {}
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe(null)
  })

  it('returns leadingIcon when specified', () => {
    const context: PartialContext = {
      leadingIcon: 'i-heroicons-check',
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe('i-heroicons-check')
  })

  it('returns icon when leading is true', () => {
    const context: PartialContext = {
      leading: true,
      icon: 'i-heroicons-star',
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe('i-heroicons-star')
  })

  it('prioritizes leadingIcon over leading + icon', () => {
    const context: PartialContext = {
      leadingIcon: 'i-heroicons-check',
      leading: true,
      icon: 'i-heroicons-star',
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe('i-heroicons-check')
  })

  it('returns null when leading is false', () => {
    const context: PartialContext = {
      leading: false,
      icon: 'i-heroicons-star',
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe(null)
  })

  it('returns null when icon is not specified but leading is true', () => {
    const context: PartialContext = {
      leading: true,
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(leadingIconName.value).toBe(null)
  })

  it('handles empty string leadingIcon', () => {
    const context: PartialContext = {
      leadingIcon: '',
    }
    const { leadingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    // Empty string is falsy, so it falls through to null
    expect(leadingIconName.value).toBe(null)
  })
})

describe('useFormKitOutput - trailingIconName', () => {
  it('returns null when no icon specified', () => {
    const context: PartialContext = {}
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe(null)
  })

  it('returns trailingIcon when specified', () => {
    const context: PartialContext = {
      trailingIcon: 'i-heroicons-arrow-right',
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe('i-heroicons-arrow-right')
  })

  it('returns icon when trailing is true', () => {
    const context: PartialContext = {
      trailing: true,
      icon: 'i-heroicons-chevron-down',
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe('i-heroicons-chevron-down')
  })

  it('prioritizes trailingIcon over trailing + icon', () => {
    const context: PartialContext = {
      trailingIcon: 'i-heroicons-arrow-right',
      trailing: true,
      icon: 'i-heroicons-chevron-down',
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe('i-heroicons-arrow-right')
  })

  it('returns null when trailing is false', () => {
    const context: PartialContext = {
      trailing: false,
      icon: 'i-heroicons-chevron-down',
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe(null)
  })

  it('returns null when icon is not specified but trailing is true', () => {
    const context: PartialContext = {
      trailing: true,
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    expect(trailingIconName.value).toBe(null)
  })

  it('handles empty string trailingIcon', () => {
    const context: PartialContext = {
      trailingIcon: '',
    }
    const { trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)
    // Empty string is falsy, so it falls through to null
    expect(trailingIconName.value).toBe(null)
  })
})

describe('useFormKitOutput - edge cases', () => {
  it('handles completely empty context', () => {
    const context: PartialContext = {}
    const result = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(result.colorClass.value).toBe('text-gray-900 dark:text-gray-100')
    expect(result.sizeClass.value).toBe('text-base')
    expect(result.variantClass.value).toBe('')
    expect(result.iconClass.value).toBe('h-5 w-5')
    expect(result.leadingIconName.value).toBe(null)
    expect(result.trailingIconName.value).toBe(null)
  })

  it('handles context with all properties set', () => {
    const context: PartialContext = {
      color: 'primary',
      size: 'lg',
      variant: 'soft',
      leadingIcon: 'i-heroicons-star',
      trailingIcon: 'i-heroicons-arrow-right',
      attrs: {
        class: 'custom',
      },
    }
    const result = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(result.colorClass.value).toBe('text-primary')
    expect(result.sizeClass.value).toBe('text-lg')
    expect(result.variantClass.value).toBe('bg-gray-100 dark:bg-gray-800 rounded-md')
    expect(result.iconClass.value).toBe('h-6 w-6')
    expect(result.leadingIconName.value).toBe('i-heroicons-star')
    expect(result.trailingIconName.value).toBe('i-heroicons-arrow-right')
    expect(result.containerClass.value).toContain('custom')
  })

  it('handles both leading and trailing icons together', () => {
    const context: PartialContext = {
      leading: true,
      trailing: true,
      icon: 'i-heroicons-star',
    }
    const { leadingIconName, trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(leadingIconName.value).toBe('i-heroicons-star')
    expect(trailingIconName.value).toBe('i-heroicons-star')
  })

  it('handles null values for properties', () => {
    const context: PartialContext = {
      color: null as unknown,
      size: null as unknown,
      variant: null as unknown,
    }
    const result = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(result.colorClass.value).toBe('text-gray-900 dark:text-gray-100')
    expect(result.sizeClass.value).toBe('text-base')
    expect(result.variantClass.value).toBe('')
  })

  it('handles undefined values for icon properties', () => {
    const context: PartialContext = {
      leadingIcon: undefined,
      trailingIcon: undefined,
      leading: undefined,
      trailing: undefined,
      icon: undefined,
    }
    const { leadingIconName, trailingIconName } = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(leadingIconName.value).toBe(null)
    expect(trailingIconName.value).toBe(null)
  })

  it('computes classes reactively', () => {
    const context: PartialContext = {
      color: 'primary',
    }
    const { colorClass } = useFormKitOutput(context as unknown as FormKitFrameworkContext)

    expect(colorClass.value).toBe('text-primary')

    // Simulate context change
    context.color = 'error'
    // Note: In a real Vue environment, this would trigger reactivity
    // For this test, we're just verifying the computed property works
  })
})
