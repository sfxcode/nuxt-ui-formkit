import type { FormKitFrameworkContext } from '@formkit/core'

/**
 * For an input whose real focusable sub-elements live inside one container
 * - a Reka UI `DateField`'s day/month/year segments, a checkbox/radio
 * group's individual items, a listbox's options - `context.handlers.blur`
 * must only fire once focus has genuinely left the whole container, not
 * just moved between its own children. Native `blur` doesn't bubble, so a
 * plain `@blur` on the container never sees a child's blur at all; this
 * binds to `focusout` (which does bubble) instead, and uses
 * `relatedTarget` to tell "moved to a sibling inside" apart from "left
 * entirely."
 *
 * Discovered while wiring `FUInputDate`/`FUInputTime`: Nuxt UI's own
 * `InputDate.vue`/`InputTime.vue` bind `@blur` on their internal
 * `DateField.Root`, assuming Reka UI aggregates blur across segments the
 * same way - it doesn't (`DateField.Root` doesn't declare `blur` as its own
 * emit, so that binding is a native fallthrough on a never-focused
 * container div, and silently never fires). This helper is what actually
 * fixes it, bound to `@focusout` on the outer `<UInputDate>`/`<UInputTime>`
 * component instead.
 *
 * Uses `event.currentTarget` (the element the listener is actually attached
 * to) as the container, rather than a template ref to the component's own
 * `$el` - `UInputDate`/`UInputTime` render a multi-root template (a
 * `createReusableTemplate`-style definition block plus the real
 * `DateField.Root`), so `$el` resolves to that definition block's own
 * placeholder node, not the visible container (confirmed empirically).
 * `currentTarget` has no such ambiguity: it's always the exact node the
 * `focusout` listener is bound to.
 *
 * Returns a plain `(event: Event) => void`, not `(event: FocusEvent) =>
 * void` - some Nuxt UI components (e.g. `UPinInput`) type their own `blur`
 * emit as generic `Event`, and a stricter parameter type isn't assignable
 * to a listener bound there. It's genuinely a `FocusEvent` at runtime
 * (`focusout` always is), so it's cast internally.
 */
export function createContainerBlurHandler(context: FormKitFrameworkContext): (event: Event) => void {
  // Accepts the broad `Event` type, not `FocusEvent` - some Nuxt UI
  // components' generated prop types only accept `(event: Event) => any`
  // for an unrecognized native listener like `@focusout`, and a stricter
  // parameter type isn't assignable there. It's genuinely a `FocusEvent` at
  // runtime (`focusout` always is), so it's cast internally.
  return (event: Event) => {
    const focusEvent = event as FocusEvent
    const container = focusEvent.currentTarget as HTMLElement | null
    const related = focusEvent.relatedTarget as Node | null
    // Fails open when the container isn't available - silently never
    // firing blur would reproduce the exact bug this helper exists to fix,
    // so an indeterminate case still counts as "left."
    if (!container || !related || !container.contains(related))
      context.handlers.blur(focusEvent)
  }
}
