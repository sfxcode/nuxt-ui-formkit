import type { FormKitExtendableSchemaRoot, FormKitNode } from '@formkit/core'

// Re-exported so consumers wiring up `nuxtUIStep`/`nuxtUIMultiStep` don't need
// a separate `@formkit/addons` import just for the plugin that recognizes them.
export { createMultiStepPlugin } from '@formkit/addons'

export { createAutoAnimatePlugin } from './autoAnimate'
export type { AutoAnimateTargets } from './autoAnimate'
export { createAutosavePlugin } from './autosave'
export type { AutosaveOptions } from './autosave'

export function addNuxtAsteriskPlugin(node: FormKitNode): void {
  // Keyed on `family`, not the `nuxtUI` type prefix: Output definitions share
  // that prefix (`nuxtUIOutput*`) but use the `NuxtUIOutput` family, and a
  // read-only display has no "required" state to flag.
  if (node.props.family !== 'NuxtUIInput')
    return

  node.on('created', () => {
    if (node.props.definition?.schema) {
      const schemaFn = node.props.definition?.schema as FormKitExtendableSchemaRoot
      node.props.definition!.schema = (sectionsSchema = {}) => {
        sectionsSchema.label = {
          children: ['$label', {
            $el: 'span',
            if: '$state.required',
            attrs: {
              class: 'text-error nuxt-ui-formkit--asterisk',
            },
            children: [' *'],
          }],
        }

        return schemaFn(sectionsSchema)
      }
    }
  })
}
