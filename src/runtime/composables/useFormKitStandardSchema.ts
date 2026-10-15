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
  // Nodes that currently carry a message from this bridge (other than the
  // root). Tracked by node identity, not address: a repeater row keeps its node
  // when rows are reordered or removed, so re-resolving old addresses would
  // clear the wrong node (or none), leaving a stale message behind.
  let previousTargets = new Set<FormKitNode>()
  let runToken = 0
  let detached = false

  // FormKit's own `handleSubmit` awaits `node.ledger.settled('validating')`, and
  // its built-in rule validation signals "still running" with this exact
  // message. Setting it while the (async) schema is in flight is what makes a
  // real submit wait for the schema instead of racing it.
  function markValidating(): void {
    node.store.set(createMessage({ type: 'state', blocking: true, visible: false, value: true, key: 'validating' }))
  }

  function applyRootMessages(values: string[]): void {
    setStandardSchemaMessages(node, values)
  }

  async function validate(): Promise<void> {
    // The post-attach `node.settled` re-run below can fire after detach.
    if (detached)
      return
    const token = ++runToken
    markValidating()

    let result: StandardSchemaV1.Result<unknown>
    try {
      result = await schema['~standard'].validate(node.value)
    }
    catch (error) {
      if (token !== runToken)
        return
      // A throwing/rejecting schema must not leave the form looking valid.
      console.error('[nuxt-ui-formkit] Standard Schema validation threw:', error)
      applyRootMessages([`Validation failed: ${error instanceof Error ? error.message : String(error)}`])
      node.store.remove('validating')
      return
    }
    // A newer run (or detach) owns the `validating` message from here on.
    if (token !== runToken)
      return

    const { localErrors, childErrors } = issuesToFormKitErrors(result.issues ?? [])

    const resolved = new Map<FormKitNode, string[]>()
    const rootErrors = [...localErrors]
    for (const [address, messages] of Object.entries(childErrors)) {
      const target = resolveAddress(node, address)
      if (target)
        resolved.set(target, messages)
      // An issue that can't be pinned to a rendered node (a schema field with
      // no input, a hidden field, a row that isn't mounted, a key containing the
      // address delimiter) must still block the form - dropping it would let
      // data the schema rejects submit as valid. Surface it on the root.
      else
        rootErrors.push(...messages.map(message => `${address}: ${message}`))
    }

    applyRootMessages(rootErrors)
    for (const target of previousTargets) {
      if (!resolved.has(target))
        clearStandardSchemaMessages(target)
    }
    for (const [target, messages] of resolved)
      setStandardSchemaMessages(target, messages)
    previousTargets = new Set(resolved.keys())
    node.store.remove('validating')
  }

  const receipt = node.on('commit', () => void validate())
  void validate()
  // Children register after this runs, so the first pass can't resolve nested
  // addresses; re-run once the tree has settled.
  void node.settled.then(() => validate())

  return function detachStandardSchema(): void {
    // Invalidate any validation still in flight so it can't re-apply messages
    // to a node this bridge no longer manages.
    detached = true
    runToken++
    node.off(receipt)
    node.store.remove('validating')
    clearStandardSchemaMessages(node)
    for (const target of previousTargets)
      clearStandardSchemaMessages(target)
    previousTargets = new Set()
  }
}
