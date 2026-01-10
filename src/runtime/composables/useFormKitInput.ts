import { computed } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

export function useFormKitInput(context: FormKitFrameworkContext) {
  const isInvalid = computed(() => {
    return context?.state?.validationVisible && !context?.state?.valid
  })

  const styleClass = computed(() => {
    return (isInvalid.value)
      ? `${context?.attrs?.class || ''} nuxt-ui-formkit--invalid`
      : context?.attrs?.class || ''
  })

  const color = computed(() => {
    return (isInvalid.value)
      ? 'error'
      : context?.color || 'primary'
  })

  const formKitCreateInputSlots = new Set(['label', 'help', 'messages', 'message', 'input'])

  // FormKit slots added by createInput() and should be passed to FormKit not to the wrapped component.
  const validSlotNames = computed(() =>
    Object.keys(context?.slots || {}).filter(slotName => !formKitCreateInputSlots.has(slotName)),
  )

  function handleBlur(event: FocusEvent) {
    context?.handlers?.blur?.(event)
  }

  function handleChange(_: unknown) {
    context?.node?.input?.(context?._value)
  }

  function handleInput(_: unknown) {
    context?.node?.input?.(context?._value)
  }

  function handleSelect(e: unknown) {
    context?.node?.input?.(e)
  }

  return { isInvalid, validSlotNames, styleClass, color, handleBlur, handleChange, handleInput, handleSelect }
}
