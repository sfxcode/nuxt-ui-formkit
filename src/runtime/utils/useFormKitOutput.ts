import { computed, onBeforeUnmount, ref } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

type ColorType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type VariantType = 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'

export interface FormKitOutputUi {
  /** Merged into `containerClass` - Output components have no themeable Nuxt UI root to forward to. */
  root?: string
  /** Merged into `iconClass`, applied to every `FUIcon` an Output component renders. */
  icon?: string
  /** Forwarded unmodified to `UBadge`'s own `:ui` prop (`FUOutputList`'s badge display mode only). */
  badge?: Record<string, unknown>
}

export function useFormKitOutput(context: FormKitFrameworkContext) {
  // `context.ui` is reserved by @formkit/vue for its own internal UI-message
  // store state - same collision as `useFormKitInput.ts`, see
  // brain/notes/formkit-ui-prop-context-collision.md. Track the real `ui`
  // value via the `prop:ui` FormKit event instead of reading `context.ui`.
  const ui = ref<FormKitOutputUi | undefined>(context?.node?.props?.ui)
  const uiReceipt = context?.node?.on?.('prop:ui', ({ payload }) => {
    ui.value = payload as FormKitOutputUi | undefined
  })
  onBeforeUnmount(() => {
    if (uiReceipt !== undefined)
      context?.node?.off?.(uiReceipt)
  })

  const colorClass = computed(() => {
    const color = (context.color ?? 'neutral') as ColorType
    const colorMap: Record<ColorType, string> = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      info: 'text-info',
      warning: 'text-warning',
      error: 'text-error',
      neutral: 'text-gray-900 dark:text-gray-100',
    }
    return colorMap[color] || colorMap.neutral
  })

  const sizeClass = computed(() => {
    const size = (context.size ?? 'md') as SizeType
    const sizeMap: Record<SizeType, string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }
    return sizeMap[size] || sizeMap.md
  })

  const variantClass = computed(() => {
    const variant = (context.variant ?? 'none') as VariantType
    const variantMap: Record<VariantType, string> = {
      outline: 'border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1',
      soft: 'bg-gray-100 dark:bg-gray-800 rounded-md',
      subtle: 'bg-gray-50 dark:bg-gray-900 rounded-md',
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md',
      none: '',
    }
    return variantMap[variant] || variantMap.none
  })

  const containerClass = computed(() => {
    return [
      'inline-flex items-center gap-2',
      colorClass.value,
      sizeClass.value,
      variantClass.value,
      ui.value?.root,
      context?.attrs?.class,
    ].filter(Boolean).join(' ')
  })

  const iconClass = computed(() => {
    const size = (context.size ?? 'md') as SizeType
    const iconSizeMap: Record<SizeType, string> = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7',
    }
    return [iconSizeMap[size] || iconSizeMap.md, ui.value?.icon].filter(Boolean).join(' ')
  })

  // `context`'s index signature types every custom schema prop (`leadingIcon`,
  // `leading`, `icon`, ...) as `unknown` - combining several `unknown`s through
  // `||`/`&&` makes TS infer `{} | null` rather than `string | null` for the
  // whole expression. Cast each operand to its actual intended type first.
  const leadingIconName = computed<string | null>(() => {
    const leadingIcon = context.leadingIcon as string | undefined
    const leading = context.leading as boolean | undefined
    const icon = context.icon as string | undefined
    return leadingIcon || (leading && icon) || null
  })

  const trailingIconName = computed<string | null>(() => {
    const trailingIcon = context.trailingIcon as string | undefined
    const trailing = context.trailing as boolean | undefined
    const icon = context.icon as string | undefined
    return trailingIcon || (trailing && icon) || null
  })

  return {
    colorClass,
    sizeClass,
    variantClass,
    containerClass,
    iconClass,
    leadingIconName,
    trailingIconName,
    ui,
  }
}
