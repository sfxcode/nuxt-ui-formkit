import type { StandardSchemaV1 } from '@standard-schema/spec'

export interface FormKitStandardSchemaErrors {
  localErrors: string[]
  childErrors: Record<string, string[]>
}

/**
 * Normalizes a Standard Schema `Issue[]` array into FormKit's
 * `setErrors`/`clearErrors` address shape. Mirrors `@nuxt/ui`'s own
 * `validateStandardSchema()` path-flattening exactly (`item.key` for object
 * path segments, the bare value otherwise, joined with `.`) so a Zod/Valibot
 * issue at `items[2].email` resolves to the same FormKit node address
 * (`"items.2.email"`) Nuxt UI's own forms would use for the same schema.
 */
export function issuesToFormKitErrors(
  issues: readonly StandardSchemaV1.Issue[],
): FormKitStandardSchemaErrors {
  const localErrors: string[] = []
  const childErrors: Record<string, string[]> = {}

  for (const issue of issues) {
    const address = issue.path
      ?.map(item => (typeof item === 'object' ? item.key : item))
      .join('.')

    if (!address) {
      localErrors.push(issue.message)
      continue
    }

    if (!childErrors[address])
      childErrors[address] = []
    childErrors[address].push(issue.message)
  }

  return { localErrors, childErrors }
}
