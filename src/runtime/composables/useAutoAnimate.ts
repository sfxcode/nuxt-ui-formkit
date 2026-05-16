import autoAnimate, { type AutoAnimateOptions, type AutoAnimationPlugin } from '@formkit/auto-animate'
import type { Ref } from 'vue'

/**
 * Composable to apply autoAnimate to an element
 * @param options - AutoAnimate options
 * @returns A function that can be used as a template ref
 */
export function useAutoAnimate<T extends HTMLElement>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin,
): [(el: T | null) => void, (enabled: boolean) => void] {
  let autoAnimateController: ReturnType<typeof autoAnimate> | undefined

  const setEnabled = (enabled: boolean) => {
    if (autoAnimateController) {
      autoAnimateController.isEnabled = enabled
    }
  }

  const ref = (el: T | null) => {
    if (el) {
      autoAnimateController = autoAnimate(el, options || {})
    }
  }

  return [ref, setEnabled]
}

/**
 * Apply autoAnimate directly to a ref element
 * @param target - The ref to apply autoAnimate to
 * @param options - AutoAnimate options
 */
export function applyAutoAnimate<T extends HTMLElement>(
  target: Ref<T | null | undefined>,
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin,
): void {
  watch(
    target,
    (el) => {
      if (el) {
        autoAnimate(el, options || {})
      }
    },
    { immediate: true },
  )
}

