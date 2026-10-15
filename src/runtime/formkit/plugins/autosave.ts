import type { FormKitNode, FormKitPlugin } from '@formkit/core'
import { createLocalStoragePlugin } from '@formkit/addons'

export interface AutosaveOptions {
  /** Distinguishes this draft in localStorage. Required: a form's own auto-generated name is not stable across mounts. */
  key: string
  /** Delay before a change is written, in ms. Default 200. */
  debounce?: number
  /** How long a draft stays restorable, in ms. Default 1 hour. */
  maxAge?: number
  /** Drop the saved draft when the form is submitted. Default true. */
  clearOnSubmit?: boolean
}

/**
 * Persists a form's value to localStorage and restores it on the next mount.
 * Pass it via a `<FormKit type="form" name="..." :plugins="[...]">`'s `plugins`
 * (or use `FUDataEdit`/`FUAutoForm`'s `autosave` prop, which does this for you).
 *
 * Wraps `@formkit/addons`' `createLocalStoragePlugin`, which keys the stored
 * entry on the form's `name` (so give the form a stable one) and only saves
 * when the node's `useLocalStorage` prop is truthy - an unset prop silently
 * saves nothing - so this enables it on the form root. Attaches to the root
 * form only; nested groups/repeater rows would otherwise each save a
 * separate partial draft under their own names.
 */
export function createAutosavePlugin(options: AutosaveOptions): FormKitPlugin {
  const storage = createLocalStoragePlugin({
    prefix: 'nuxt-ui-formkit',
    key: options.key,
    debounce: options.debounce,
    maxAge: options.maxAge,
    clearOnSubmit: options.clearOnSubmit,
  })

  return (node: FormKitNode) => {
    if (node.parent || node.type !== 'group')
      return
    node.props.useLocalStorage = true
    return storage(node)
  }
}
