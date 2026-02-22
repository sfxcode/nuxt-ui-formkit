import type { FormKitExtendableSchemaRoot, FormKitNode } from '@formkit/core'

export function addNuxtAsteriskPlugin(node: FormKitNode): void {
  if (!node.props.type.startsWith('nuxtUI') || node.props.type.startsWith('FUOutput'))
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

export function addNuxtLabelPlugin(node: FormKitNode): void {
  if (!node.props.type.startsWith('nuxtUi'))
    return

  node.on('created', () => {
    if (node.props.definition?.schema) {
      const schemaFn = node.props.definition?.schema as FormKitExtendableSchemaRoot
      node.props.definition!.schema = (sectionsSchema = {}) => {
        sectionsSchema.label = {
          children: [{
            $el: 'span',
            attrs: {
              title: '$help',
              class: 'p-formkit-label',
            },
            children: ['$label'],
          }, {
            $el: 'span',
            if: '$state.required',
            attrs: {
              class: 'p-formkit-required',
              title: '$help',
            },
            children: ['*'],
          }],
        }
        sectionsSchema.help = {
          children: [],
        }

        return schemaFn(sectionsSchema)
      }
    }
  })
}
