import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const currentDir = dirname(fileURLToPath(import.meta.url))
const definitionsDir = resolve(currentDir, '../src/runtime/formkit/definitions')

// Positional index of the `formKitAttrs` argument in useFormKitSchema's
// addList(name, children, dynamic, render, formKitAttrs) and
// addGroup(name, children, render, formKitAttrs).
const FORM_KIT_ATTRS_ARG_INDEX = {
  addList: 4,
  addGroup: 3,
} as const

type NestedNodeCallName = keyof typeof FORM_KIT_ATTRS_ARG_INDEX

interface NestedNodeCallViolation {
  file: string
  call: NestedNodeCallName
  nameArgument: string
}

function extractCallArguments(source: string, openParenIndex: number): string {
  let depth = 0
  let quote: string | null = null

  for (let i = openParenIndex; i < source.length; i++) {
    const char = source[i]
    const prevChar = source[i - 1]

    if (quote) {
      if (char === quote && prevChar !== '\\')
        quote = null
      continue
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      continue
    }
    if (char === '(')
      depth++
    if (char === ')') {
      depth--
      if (depth === 0)
        return source.slice(openParenIndex + 1, i)
    }
  }

  throw new Error(`Unbalanced parentheses scanning call starting at index ${openParenIndex}`)
}

function splitTopLevelArgs(argsSource: string): string[] {
  const args: string[] = []
  let depth = 0
  let quote: string | null = null
  let current = ''

  for (let i = 0; i < argsSource.length; i++) {
    const char = argsSource[i]
    const prevChar = argsSource[i - 1]

    if (quote) {
      current += char
      if (char === quote && prevChar !== '\\')
        quote = null
      continue
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      current += char
      continue
    }
    if (char !== undefined && '([{'.includes(char))
      depth++
    if (char !== undefined && ')]}'.includes(char))
      depth--
    if (char === ',' && depth === 0) {
      args.push(current)
      current = ''
      continue
    }
    current += char
  }
  if (current.trim().length > 0)
    args.push(current)

  return args.map(arg => arg.trim())
}

/**
 * Finds every `addList`/`addGroup` call in `source` whose `formKitAttrs`
 * argument is missing or doesn't bind a `value` key. Without that binding, a
 * nested list/group node never inherits its outer node's array value - see
 * notes/formkit-repeater-list-value-binding for the bug this guards against.
 */
function findNestedNodeCallsMissingValueBinding(file: string, source: string): NestedNodeCallViolation[] {
  const violations: NestedNodeCallViolation[] = []
  const callPattern = /\b(addList|addGroup)\(/g
  let match = callPattern.exec(source)

  while (match !== null) {
    const callName = match[1] as NestedNodeCallName
    const openParenIndex = match.index + match[0].length - 1
    const args = splitTopLevelArgs(extractCallArguments(source, openParenIndex))
    const formKitAttrsArg = args[FORM_KIT_ATTRS_ARG_INDEX[callName]]
    const hasValueBinding = !!formKitAttrsArg && /\bvalue\s*:/.test(formKitAttrsArg)

    if (!hasValueBinding) {
      violations.push({ file, call: callName, nameArgument: args[0] ?? '' })
    }

    match = callPattern.exec(source)
  }

  return violations
}

describe('formkit nested list/group nodes bind their value', () => {
  // As of this test's addition, the only addList/addGroup call site in
  // definitions/ is repeater.ts's addList('$listName', ...), which already
  // carries `{ value: '$value' }`. A failure here means a *new* violation
  // was introduced, not a pre-existing known gap.
  const definitionFiles = readdirSync(definitionsDir).filter(fileName => fileName.endsWith('.ts'))

  it('finds definitions/*.ts files to scan (sanity check)', () => {
    expect(definitionFiles.length).toBeGreaterThan(0)
  })

  it('binds a value on every nested addList/addGroup node', () => {
    const violations = definitionFiles.flatMap((fileName) => {
      const source = readFileSync(resolve(definitionsDir, fileName), 'utf-8')
      return findNestedNodeCallsMissingValueBinding(fileName, source)
    })

    expect(violations, JSON.stringify(violations, null, 2)).toEqual([])
  })
})
