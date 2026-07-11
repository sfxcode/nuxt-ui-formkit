import { computed, onBeforeUnmount, ref } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

export function useFormKitInput(context: FormKitFrameworkContext) {
  // `context.ui` is reserved by @formkit/vue for its own internal UI-message
  // store state, colliding with this library's `ui` prop (forwarded to Nuxt
  // UI's `:ui` theming prop) - the consumer's value lands on `node.props.ui`
  // but never reaches `context.ui`. Track it separately via the `prop:ui`
  // FormKit event instead of reading the poisoned `context.ui` field.
  const ui = ref(context?.node?.props?.ui)
  const uiReceipt = context?.node?.on?.('prop:ui', ({ payload }) => {
    ui.value = payload
  })
  onBeforeUnmount(() => {
    if (uiReceipt !== undefined)
      context?.node?.off?.(uiReceipt)
  })

  const isInvalid = computed(() => {
    return context?.state?.validationVisible && !context?.state?.valid
  })

  const styleClass = computed<string>(() => {
    return (isInvalid.value)
      ? `${context?.attrs?.class || ''} nuxt-ui-formkit--invalid`
      : String(context?.attrs?.class || '')
  })

  const color = computed<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'>(() => {
    return (isInvalid.value)
      ? 'error'
      : context?.color as 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' || 'primary'
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

  const modelValue = computed({
    get: () => context._value,
    set: (value) => {
      context.node.input(value)
    },
  })

  const items = computed(() => {
    const options = context.options ?? context.attrs.items
    if (Array.isArray(options)) {
      return options
    }
    return []
  })

  return { isInvalid, validSlotNames, styleClass, color, handleBlur, handleChange, handleInput, handleSelect, modelValue, items, ui }
}
