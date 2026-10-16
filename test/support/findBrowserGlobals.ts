import ts from 'typescript'
import { parse } from 'vue/compiler-sfc'

// Browser-only globals: referencing one while a page is server-rendered throws (or reads
// nothing). `HTMLElement` is here for `instanceof HTMLElement`-style value uses; as a type
// annotation it is erased and is not looked at.
const BROWSER_GLOBALS = new Set([
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'navigator',
  'matchMedia',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'getComputedStyle',
  'IntersectionObserver',
  'ResizeObserver',
  'MutationObserver',
  'HTMLElement',
])

// Callbacks that only ever run in the browser: Vue does not call these on the server.
const CLIENT_ONLY_HOOKS = new Set(['onMounted', 'onBeforeMount', 'onUpdated', 'onBeforeUpdate', 'onBeforeUnmount', 'onUnmounted', 'onActivated', 'onDeactivated'])

export interface BrowserGlobalUse {
  name: string
  line: number
}

function scriptOf(source: string, fileName: string): string {
  if (!fileName.endsWith('.vue'))
    return source
  const { descriptor } = parse(source, { filename: fileName })
  return [descriptor.script?.content, descriptor.scriptSetup?.content].filter(Boolean).join('\n')
}

function isValueReference(node: ts.Identifier): boolean {
  const parent = node.parent
  // `foo.window`, a declaration's own name, a property/parameter name, an import/export name.
  if (ts.isPropertyAccessExpression(parent) && parent.name === node)
    return false
  if ((ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent) || ts.isParameter(parent) || ts.isVariableDeclaration(parent) || ts.isBindingElement(parent) || ts.isFunctionDeclaration(parent)) && parent.name === node)
    return false
  // `{ document: doc } = options`: `document` there names a property, it is not a reference.
  if (ts.isBindingElement(parent) && parent.propertyName === node)
    return false
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent))
    return false
  // A type position (`as HTMLElement`, `ref<HTMLElement>()`, `: HTMLElement`) is erased at build time.
  for (let current: ts.Node | undefined = node; current; current = current.parent) {
    if (ts.isTypeNode(current))
      return false
  }
  return true
}

function isGuarded(node: ts.Node): boolean {
  for (let current: ts.Node = node; current.parent; current = current.parent) {
    const parent = current.parent
    // `typeof window === 'undefined'` is how a global is checked for, not used.
    if (ts.isTypeOfExpression(parent))
      return true
    // Inside the callback given to a client-only lifecycle hook.
    if (ts.isCallExpression(parent) && parent.arguments.includes(current as ts.Expression) && ts.isIdentifier(parent.expression) && CLIENT_ONLY_HOOKS.has(parent.expression.text))
      return true
    // `if (import.meta.client) { ... }` (then-branch), `import.meta.client ? ... : ...`, `import.meta.client && ...`.
    if (ts.isIfStatement(parent) && parent.thenStatement === current && parent.expression.getText().includes('import.meta.client'))
      return true
    if (ts.isConditionalExpression(parent) && parent.whenTrue === current && parent.condition.getText().includes('import.meta.client'))
      return true
    if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken && parent.right === current && parent.left.getText().includes('import.meta.client'))
      return true
  }
  return false
}

/**
 * Every use of a browser-only global that is not inside a client-only lifecycle hook, an
 * `import.meta.client` branch or a `typeof` check - i.e. anything that can run while a page is
 * server-rendered. Types are ignored; templates are not looked at.
 */
export function findUnguardedBrowserGlobals(source: string, fileName: string): BrowserGlobalUse[] {
  const code = scriptOf(source, fileName)
  const file = ts.createSourceFile(fileName.replace(/\.vue$/, '.ts'), code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: BrowserGlobalUse[] = []
  const visit = (node: ts.Node) => {
    if (ts.isIdentifier(node) && BROWSER_GLOBALS.has(node.text) && isValueReference(node) && !isGuarded(node))
      found.push({ name: node.text, line: file.getLineAndCharacterOfPosition(node.getStart()).line + 1 })
    ts.forEachChild(node, visit)
  }
  visit(file)
  return found
}
