import type { FormKitNode } from '@formkit/core'
// Side-effect-only type import: augments `FormKitNode` with `next`/`previous`/
// `goTo` (see `@formkit/addons`' `declare module '@formkit/core'` block).
import type {} from '@formkit/addons'
import { ref, watchEffect } from 'vue'

interface StepStatus {
  stepName?: string
  errorCount?: number
  blockingCount?: number
  showStepErrors?: boolean
  isValid?: boolean
  hasBeenVisited?: boolean
  node?: FormKitNode
}

export function useFormKitMultiStep() {
  // `createMultiStepPlugin`'s own tab-strip schema loops `$fns.getSteps()` and
  // builds each tab's label/badge declaratively via `$step.X` expressions. We
  // hand `UTabs` a single `items` array instead, so that mapping has to happen
  // here in JS rather than in the schema - `node.props.steps` (an array of the
  // step nodes' own `FormKitFrameworkContext` objects, kept live by the addon
  // plugin's `child`/`childRemoved`/`prop:activeStep` handlers) is the source.
  function buildTabItems(node: FormKitNode): Array<Record<string, unknown>> {
    const steps = Array.isArray(node.props.steps) ? (node.props.steps as StepStatus[]) : []
    const validStepIcon = typeof node.props.validStepIcon === 'string' ? node.props.validStepIcon : 'i-lucide-check'
    // Matches `@formkit/addons`' own default (confirmed by reading
    // `createMultiStepPlugin`'s source): incomplete steps are allowed
    // through unless `allowIncomplete` is explicitly `false`.
    const allowIncomplete = node.props.allowIncomplete !== false
    const activeIndex = steps.findIndex(step => step.node?.name === node.props.activeStep)
    const activeStepInvalid = activeIndex >= 0 && steps[activeIndex]?.isValid === false

    return steps.map((step, index) => {
      const totalErrorCount = (step.errorCount ?? 0) + (step.blockingCount ?? 0)
      const item: Record<string, unknown> = {
        label: step.stepName,
        value: step.node?.name,
        // Jumping ahead to a step you haven't visited yet while the current
        // step is invalid would just be silently blocked by the addon's own
        // `isTargetStepAllowed` gating on click - disable it proactively
        // instead so it's not clickable-but-inert. Steps already visited
        // (including the active one) stay enabled, matching the addon's own
        // "moving backward is always allowed" rule.
        disabled: !allowIncomplete && !step.hasBeenVisited && index > activeIndex && activeStepInvalid,
      }

      // `UTabs`' own default badge props are `color="neutral" variant="outline"`
      // - our `color` override still leaves an outline (near-transparent
      // background) badge, so its icon/text just take on the theme's plain
      // `success`/`error` color. On the *active* tab that badge sits on top
      // of the tab's own solid primary-colored highlight, and the two colors
      // can end up close enough to blend together. `variant: 'solid'` gives
      // the badge its own solid background instead, which Nuxt UI already
      // auto-contrasts (typically to an inverted/white icon) - more robust
      // than hardcoding a text color that would look wrong on a non-active
      // tab's plain background.
      const isActive = index === activeIndex
      if (step.showStepErrors && totalErrorCount > 0)
        item.badge = { label: totalErrorCount, color: 'error', variant: isActive ? 'solid' : undefined }
      else if (step.isValid && step.hasBeenVisited)
        item.badge = { icon: validStepIcon, color: 'success', variant: isActive ? 'solid' : undefined }

      return item
    })
  }

  function addMultiStepHandler(node: FormKitNode): void {
    // `node.props` is FormKit's own Proxy, not a Vue `reactive()` object, so
    // a `watchEffect` reading `node.props.steps` directly would never notice
    // the array being reassigned on add/remove/navigate (confirmed
    // empirically - it ran once against an empty array and never again).
    // Bump this ref from FormKit's own structural events instead, and read
    // it inside the effect purely to force a rerun.
    const structuralVersion = ref(0)
    const bumpStructuralVersion = (): void => {
      structuralVersion.value++
    }

    node.on('child', bumpStructuralVersion)
    node.on('childRemoved', bumpStructuralVersion)
    node.on('prop:steps', bumpStructuralVersion)
    node.on('prop:activeStep', bumpStructuralVersion)

    node.on('created', () => {
      if (!node.context)
        return

      // Each step's own `context` object *is* genuinely Vue-reactive (that's
      // how the addon's own schema reactively shows `$isValid`/`$errorCount`
      // etc.), so once `buildTabItems` reads a step's `stepName`/
      // `errorCount`/`blockingCount`/`isValid`/`hasBeenVisited`/
      // `showStepErrors` inside this effect, changes to those - including
      // `showStepErrors`, which `isTargetStepAllowed` mutates directly on
      // `context` rather than through `node.props`, so no discrete FormKit
      // `prop:x` event exists for it - reactively rerun this on their own.
      // `structuralVersion.value` only exists to also rerun on step
      // add/remove/navigate, which `node.props.steps` reassignment can't
      // trigger by itself. Vue's scheduler batches synchronous mutations
      // within one flush, which incidentally fixes a real timing bug: the
      // addon's own `child` handler sets `node.props.steps` *before*
      // computing that child's `stepName` a few lines later in the same
      // synchronous handler, so a naive synchronous recompute could
      // snapshot a still-unnamed step.
      watchEffect(() => {
        void structuralVersion.value
        if (node.context)
          node.context.tabItems = buildTabItems(node)
      })

      // `UTabs` emits the clicked item's `value` (a step name) on
      // `update:modelValue` - bridge it into the multi-step node's own
      // `goTo()` navigation method rather than reassigning `activeStep`
      // directly, so the addon's own validation-gating logic still runs.
      node.context.handleTabChange = (value: string | number): void => {
        node.goTo(value)
      }
    })
  }

  // Proactively disables a step's own "Next" button when its parent's
  // `allowIncomplete` is falsy and this step is currently invalid, instead
  // of leaving it clickable-but-inert (clicking it would just be silently
  // blocked by the addon's own `isTargetStepAllowed` gating).
  function addStepHandler(node: FormKitNode): void {
    node.on('created', () => {
      if (!node.context)
        return

      node.context.internalStepActionsClass = node.context.stepActionsClass
        ? `formkit-step-actions ${node.context.stepActionsClass}`
        : 'formkit-step-actions flex gap-2 pt-2'

      watchEffect(() => {
        const allowIncomplete = node.parent?.props.allowIncomplete !== false
        if (node.context)
          node.context.nextDisabled = !allowIncomplete && node.context.isValid === false
      })
    })
  }

  return { addMultiStepHandler, addStepHandler }
}
