import type { FormKitSchemaDefinition } from '@formkit/core'
import { useOverlay } from '@nuxt/ui/composables'
import FUAutoFormOverlay from '../components/FUAutoFormOverlay.vue'
import FUDataEditOverlay from '../components/FUDataEditOverlay.vue'
import { clonePlain } from '../utils/clonePlain'
import type { AutoFormOverrides, ValibotLikeSchema, ZodLikeSchema } from './useFormKitAutoForm'

export interface FormKitOverlayEditOptions {
  data: unknown
  schema: FormKitSchemaDefinition
  title?: string
  as?: 'modal' | 'slideover'
  /** Ask before discarding unsaved edits on Cancel/Esc/backdrop/X. Default false. */
  confirmDiscard?: boolean
}

export interface FormKitOverlayAutoOptions {
  data?: unknown
  valibotSchema?: ValibotLikeSchema
  zodSchema?: ZodLikeSchema
  overrides?: AutoFormOverrides
  title?: string
  as?: 'modal' | 'slideover'
  /** Ask before discarding unsaved edits on Cancel/Esc/backdrop/X. Default false. */
  confirmDiscard?: boolean
}

// `useOverlay()` itself is a `createSharedComposable` - every call anywhere
// in the *same app instance* already shares the same underlying registry.
// Registering `FUDataEditOverlay`/`FUAutoFormOverlay` is memoized on top of
// that so calling `useFormKitOverlay()` from multiple components (or the
// same component calling `.edit()`/`.auto()` repeatedly) still only ever
// registers each once, per the plan's own "not on every edit() call"
// requirement - keyed by the `overlay` object itself (not a plain
// module-level variable) since `createSharedComposable` hands out a *new*
// shared instance once every subscriber's scope has been disposed (e.g.
// between separate app mounts in tests); caching past that point would keep
// calling into a dead registry that no live `OverlayProvider` is reading from.
const registeredOverlays = new WeakMap<ReturnType<typeof useOverlay>, ReturnType<ReturnType<typeof useOverlay>['create']>>()
const registeredAutoOverlays = new WeakMap<ReturnType<typeof useOverlay>, ReturnType<ReturnType<typeof useOverlay>['create']>>()
let formIdCounter = 0

export function useFormKitOverlay() {
  const overlay = useOverlay()

  let registeredOverlay = registeredOverlays.get(overlay)
  if (!registeredOverlay) {
    registeredOverlay = overlay.create(FUDataEditOverlay)
    registeredOverlays.set(overlay, registeredOverlay)
  }

  let registeredAutoOverlay = registeredAutoOverlays.get(overlay)
  if (!registeredAutoOverlay) {
    registeredAutoOverlay = overlay.create(FUAutoFormOverlay)
    registeredAutoOverlays.set(overlay, registeredAutoOverlay)
  }

  // `FormKitSchema` mutates whatever object it is given as `:data` in place (see
  // brain/notes/formkit-schema-mutates-data-prop), so `edit()` and `auto()` hand the
  // form a copy (`clonePlain(options.data)`): the caller's object is only ever
  // replaced by the resolved result, and a Cancel or a confirmed Discard leaves it
  // exactly as it was. `clonePlain`, not `cloneAny`, so a `CalendarDate` stays one.
  // An overlay needs a user to answer it. On the server nobody can, so the promise would stay
  // pending for ever and an `await` in an async `setup` would hang the whole request.
  function assertClient(method: 'edit' | 'auto'): void {
    if (import.meta.server)
      throw new Error(`[nuxt-ui-formkit] useFormKitOverlay().${method}() cannot run on the server: an overlay needs a user to answer it, so its promise would never settle and awaiting it would hang the request. Call it from an event handler or onMounted.`)
  }

  function edit(options: FormKitOverlayEditOptions): Promise<unknown> {
    assertClient('edit')

    // A fresh FormKit registry id per call - required since
    // `useFormKitForm`/`submitForm`/`reset` all key off it, and reusing one
    // across calls (or the component's own default) would collide the way
    // this project has already hit before (see
    // brain/notes/formkit-submitform-needs-real-dom.md).
    const id = `formkit-overlay-${++formIdCounter}`

    return registeredOverlay!.open({
      id,
      data: clonePlain(options.data),
      schema: options.schema,
      title: options.title,
      as: options.as ?? 'modal',
      confirmDiscard: options.confirmDiscard ?? false,
    })
  }

  function auto(options: FormKitOverlayAutoOptions): Promise<unknown> {
    assertClient('auto')

    const id = `formkit-autoform-overlay-${++formIdCounter}`

    return registeredAutoOverlay!.open({
      id,
      data: clonePlain(options.data),
      valibotSchema: options.valibotSchema,
      zodSchema: options.zodSchema,
      overrides: options.overrides,
      title: options.title,
      as: options.as ?? 'modal',
      confirmDiscard: options.confirmDiscard ?? false,
    })
  }

  return { edit, auto }
}
