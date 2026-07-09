import type { FormKitMessage, FormKitNode } from '@formkit/core'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { createMessage, isNode } from '@formkit/core'
import { issuesToFormKitErrors } from '../utils/standardSchemaErrors'

const STANDARD_SCHEMA_SOURCE = 'standard-schema'

function isStandardSchemaMessage(message: FormKitMessage): boolean {
  return message.meta.source === STANDARD_SCHEMA_SOURCE
}

function clearStandardSchemaMessages(node: FormKitNode): void {
  node.store.filter(message => !isStandardSchemaMessage(message), 'validation')
}

function setStandardSchemaMessages(node: FormKitNode, values: string[]): void {
  clearStandardSchemaMessages(node)
  values.forEach((value, index) => {
    node.store.set(createMessage({
      key: `standard_schema_${index}`,
      type: 'validation',
      blocking: true,
      value,
      meta: { source: STANDARD_SCHEMA_SOURCE },
    }))
  })
}

/**
 * `node.at(address)` can't reach into a `nuxtUIRepeater` (or any other
 * compound input built the same way): its outer `input`-type node and its
 * inner `list`-type node share the same name but are registered as two
 * separate children of the *same* parent - the outer one never gets the
 * inner one as a real graph child (see
 * brain/notes/formkit-repeater-list-value-binding). So a plain per-segment
 * `children.find` at a repeater's name always lands on the childless outer
 * wrapper and every subsequent segment fails to resolve. Walk the address
 * ourselves, preferring the non-`input` sibling whenever a segment matches
 * more than one child.
 */
function resolveAddress(root: FormKitNode, address: string): FormKitNode | undefined {
  let pointer: FormKitNode | undefined = root
  for (const segment of address.split(root.config.delimiter)) {
    if (!pointer)
      return undefined
    const matches: FormKitNode[] = pointer.children.filter(isNode).filter(child => String(child.name) === segment)
    pointer = matches.find(child => child.type !== 'input') ?? matches[0]
  }
  return pointer
}

/**
 * Runs `schema` against `node`'s live value and applies the resulting issues
 * as `type: 'validation'` messages - to `node` itself for root-level issues,
 * and to the addressed descendant (`resolveAddress(node, address)`) for
 * every `childErrors` entry - so they respect each target's own
 * `validationVisibility` timing exactly like FormKit's native rule-derived
 * errors, instead of appearing instantly like `setErrors` does. See phase 1
 * of the standard-schema-validation-bridge plan for why.
 *
 * Re-validates on the node's own `commit` event, which already fires once
 * per settled change regardless of which descendant triggered it (a child's
 * `calm()` cascades synchronously up through every ancestor's own `commit`),
 * so this doesn't need a second debounce layer.
 *
 * Returns a detach function that stops re-validating and clears every
 * schema-derived message this call ever applied.
 */
export function attachStandardSchema(node: FormKitNode, schema: StandardSchemaV1): () => void {
  let previousAddresses = new Set<string>()
  let runToken = 0

  async function validate(): Promise<void> {
    const token = ++runToken
    const result = await schema['~standard'].validate(node.value)
    if (token !== runToken)
      return

    const { localErrors, childErrors } = issuesToFormKitErrors(result.issues ?? [])
    setStandardSchemaMessages(node, localErrors)

    const currentAddresses = new Set(Object.keys(childErrors))
    for (const address of previousAddresses) {
      if (currentAddresses.has(address))
        continue
      const target = resolveAddress(node, address)
      if (target)
        clearStandardSchemaMessages(target)
    }
    for (const [address, messages] of Object.entries(childErrors)) {
      const target = resolveAddress(node, address)
      if (target)
        setStandardSchemaMessages(target, messages)
    }
    previousAddresses = currentAddresses
  }

  const receipt = node.on('commit', () => void validate())
  void validate()

  return function detachStandardSchema(): void {
    node.off(receipt)
    clearStandardSchemaMessages(node)
    for (const address of previousAddresses) {
      const target = resolveAddress(node, address)
      if (target)
        clearStandardSchemaMessages(target)
    }
  }
}
