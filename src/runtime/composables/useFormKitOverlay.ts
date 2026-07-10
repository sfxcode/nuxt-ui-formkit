import type { FormKitSchemaDefinition } from '@formkit/core'
import { useOverlay } from '@nuxt/ui/composables'
import FUAutoFormOverlay from '../components/FUAutoFormOverlay.vue'
import FUDataEditOverlay from '../components/FUDataEditOverlay.vue'
import type { AutoFormOverrides, ValibotLikeSchema, ZodLikeSchema } from './useFormKitAutoForm'

export interface FormKitOverlayEditOptions {
  data: unknown
  schema: FormKitSchemaDefinition
  title?: string
  as?: 'modal' | 'slideover'
}

export interface FormKitOverlayAutoOptions {
  data?: unknown
  valibotSchema?: ValibotLikeSchema
  zodSchema?: ZodLikeSchema
  overrides?: AutoFormOverrides
  title?: string
  as?: 'modal' | 'slideover'
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

  function edit(options: FormKitOverlayEditOptions): Promise<unknown> {
    // A fresh FormKit registry id per call - required since
    // `useFormKitForm`/`submitForm`/`reset` all key off it, and reusing one
    // across calls (or the component's own default) would collide the way
    // this project has already hit before (see
    // brain/notes/formkit-submitform-needs-real-dom.md).
    const id = `formkit-overlay-${++formIdCounter}`

    return registeredOverlay!.open({
      id,
      data: options.data,
      schema: options.schema,
      title: options.title,
      as: options.as ?? 'modal',
    })
  }

  function auto(options: FormKitOverlayAutoOptions): Promise<unknown> {
    const id = `formkit-autoform-overlay-${++formIdCounter}`

    return registeredAutoOverlay!.open({
      id,
      data: options.data,
      valibotSchema: options.valibotSchema,
      zodSchema: options.zodSchema,
      overrides: options.overrides,
      title: options.title,
      as: options.as ?? 'modal',
    })
  }

  return { edit, auto }
}
