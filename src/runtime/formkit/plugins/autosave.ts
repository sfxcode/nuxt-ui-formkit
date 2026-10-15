import type { FormKitNode, FormKitPlugin } from '@formkit/core'
import { createLocalStoragePlugin } from '@formkit/addons'
import { createMessage } from '@formkit/core'
import { cloneAny, eq } from '@formkit/utils'

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

const PREFIX = 'nuxt-ui-formkit'

// Whether a non-expired draft is stored under `storageKey` (the addons plugin's
// `{ maxAge, data }` entry shape).
function readDraft(storageKey: string): boolean {
  try {
    const entry = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    return !!entry && typeof entry.data === 'object' && entry.maxAge > Date.now()
  }
  catch {
    return false
  }
}

function withoutInternalKeys(value: Record<string, unknown>): Record<string, unknown> {
  const { slots: _slots, ...rest } = value
  return rest
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
 *
 * Also makes two things deterministic that the addons plugin leaves to chance:
 * `FormKitSchema` mutates the bound data object with an internal `slots` key,
 * which is stripped before saving; and a restored draft counts as *dirty*
 * (FormKit snapshots a form's initial value after it settles, which races the
 * restore, so without this the draft could be absorbed into "initial").
 */
export function createAutosavePlugin(options: AutosaveOptions): FormKitPlugin {
  return (node: FormKitNode) => {
    if (node.parent || node.type !== 'group')
      return
    node.props.useLocalStorage = true

    // A debounced save from the last edit (or an echo commit from a bound
    // `v-model`) can fire *after* the submit-time clear and write the draft that
    // was just submitted straight back. Remember what was submitted and refuse
    // to save identical content; a genuinely different edit saves as usual.
    let submitted: Record<string, unknown> | undefined
    node.hook.submit((payload, next) => {
      submitted = withoutInternalKeys(cloneAny(payload))
      return next(payload)
    })

    const storage = createLocalStoragePlugin({
      prefix: PREFIX,
      key: options.key,
      beforeSave: (payload: Record<string, unknown>) => {
        const draft = withoutInternalKeys(payload)
        if (submitted && eq(submitted, draft))
          return false
        submitted = undefined
        return draft
      },
      debounce: options.debounce,
      maxAge: options.maxAge,
      clearOnSubmit: options.clearOnSubmit,
    })

    node.on('created', async () => {
      // Same key the addons plugin computes: `${prefix}-${key}-${node.name}`.
      const hasDraft = readDraft(`${PREFIX}-${options.key}-${node.name}`)
      if (!hasDraft)
        return
      // Snapshot once children have registered their values (so it matches
      // what FormKit itself will treat as the initial value), but before the
      // addons plugin's own post-`settled` restore overwrites it.
      await node.settled
      const initial = cloneAny(node.value)
      // That restore, and FormKit's own `_init` capture, both run at about this
      // moment: wait out both before putting `_init` back to the pre-restore value.
      await new Promise(resolve => setTimeout(resolve))
      await node.settled
      if (eq(initial, node.value))
        return
      node.props._init = initial
      node.store.set(createMessage({ key: 'dirty', visible: false, value: true }))
    })

    return storage(node)
  }
}
