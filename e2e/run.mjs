import { launchBrowser } from './browser.mjs'
import pages from './pages.mjs'
import { startPlayground } from './server.mjs'

// Opt-in browser smoke tests for the playground (`npm run test:e2e`), not part of
// `npm test`. Starts `nuxi dev playground` on a free port (or reuses E2E_URL),
// opens every page in `pages.mjs` in the installed Chrome, and fails on a page
// error, a console error or Vue warning, or a failed check.
//
//   E2E_URL=http://localhost:3000   run against an already-running server
//   E2E_PAGE=auto-form              only pages whose path contains this
//   E2E_CHROME=/path/to/chrome      browser executable
//   E2E_SSR=true                    start the playground with server rendering on
//                                   (`npm run test:e2e:ssr`) and run the pages marked `ssr`
//
// A page entry's `ssr` field: `'only'` runs in SSR mode only; `true` runs in both modes;
// unset runs in the normal (client-only) mode only.

// Dev-server noise that is not the playground's: Nuxt DevTools' own RPC handshake
// never completes in a headless browser.
const IGNORED = [/\[devframe\] Timeout waiting for rpc to be trusted/]

const isProblem = ({ kind, text }) =>
  !IGNORED.some(pattern => pattern.test(text)) && (kind === 'error' || kind === 'pageerror' || text.startsWith('[Vue warn]'))

async function runPage(browser, baseUrl, entry) {
  const page = await browser.newPage({ viewport: { width: 1100, height: 1600 } })
  const problems = []
  page.on('pageerror', error => problems.push({ kind: 'pageerror', text: error.message }))
  page.on('console', (message) => {
    const kind = message.type() === 'warning' ? 'warn' : message.type()
    problems.push({ kind, text: message.text() })
  })
  // The browser's own "Failed to load resource: ... 503" console line does not
  // say which resource, so record the URL of every failed response too.
  page.on('response', (response) => {
    if (response.status() >= 400)
      problems.push({ kind: 'error', text: `HTTP ${response.status()} ${response.url()}` })
  })
  try {
    await page.goto(`${baseUrl}${entry.path}`, { waitUntil: 'networkidle' })
    await page.waitForSelector(entry.ready ?? 'form', { timeout: 30_000 })
    await entry.checks(page)
    const bad = problems.filter(isProblem)
    if (bad.length)
      throw new Error(`${bad.length} console problem(s):\n  ${bad.map(p => `${p.kind}: ${p.text.slice(0, 200)}`).join('\n  ')}`)
  }
  finally {
    await page.close()
  }
}

async function main() {
  const only = process.env.E2E_PAGE
  const ssrMode = process.env.E2E_SSR === 'true'
  if (ssrMode)
    process.env.PLAYGROUND_SSR = 'true'
  const inMode = entry => (ssrMode ? Boolean(entry.ssr) : entry.ssr !== 'only')
  const selected = pages.filter(entry => inMode(entry) && (!only || entry.path.includes(only)))
  if (!selected.length)
    throw new Error(`No page in e2e/pages.mjs matches${only ? ` E2E_PAGE=${only}` : ''} in ${ssrMode ? 'SSR' : 'client-only'} mode.`)

  const server = process.env.E2E_URL ? { url: process.env.E2E_URL, stop: async () => {} } : await startPlayground()
  const stopOnSignal = () => server.stop().finally(() => process.exit(130))
  process.once('SIGINT', stopOnSignal)
  process.once('SIGTERM', stopOnSignal)

  let browser
  const results = []
  try {
    browser = await launchBrowser()
    for (const entry of selected) {
      const started = Date.now()
      try {
        await runPage(browser, server.url, entry)
        results.push({ path: entry.path, ok: true, ms: Date.now() - started })
        console.log(`  PASS ${entry.path} (${Date.now() - started}ms)`)
      }
      catch (error) {
        results.push({ path: entry.path, ok: false, ms: Date.now() - started, error })
        console.log(`  FAIL ${entry.path}\n${String(error.message ?? error).split('\n').map(line => `       ${line}`).join('\n')}`)
      }
    }
  }
  finally {
    await browser?.close()
    await server.stop()
  }

  const failed = results.filter(result => !result.ok)
  console.log(`\n${results.length - failed.length}/${results.length} smoke pages passed`)
  if (failed.length)
    process.exitCode = 1
}

main().catch((error) => {
  console.error(error.message ?? error)
  process.exitCode = 1
})
