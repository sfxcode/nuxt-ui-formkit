import { spawn } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { createServer } from 'node:net'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lockFile = resolve(root, 'playground/.nuxt/nuxt.lock')

const STARTUP_TIMEOUT_MS = 180_000

function isAlive(pid) {
  try {
    process.kill(pid, 0)
    return true
  }
  catch {
    return false
  }
}

// Nuxt writes `playground/.nuxt/nuxt.lock` ({ pid, port, url, ... }) while a dev
// server runs and removes it on a clean exit. A lock whose pid is dead is stale
// and would make the next `nuxi dev` refuse to start; a live one means someone
// else's server is running, which must not be clobbered.
function clearStaleLock() {
  if (!existsSync(lockFile))
    return
  let lock
  try {
    lock = JSON.parse(readFileSync(lockFile, 'utf-8'))
  }
  catch {
    rmSync(lockFile, { force: true })
    return
  }
  if (lock?.pid && isAlive(lock.pid)) {
    throw new Error(`A playground dev server is already running (pid ${lock.pid}, ${lock.url ?? `port ${lock.port}`}). Stop it, or run the smoke tests against it with E2E_URL=${lock.url ?? `http://localhost:${lock.port}`}.`)
  }
  rmSync(lockFile, { force: true })
}

function freePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer()
    probe.once('error', reject)
    probe.listen(0, () => {
      const { port } = probe.address()
      probe.close(() => resolvePort(port))
    })
  })
}

function portIsFree(port) {
  return new Promise((resolveFree) => {
    const probe = createServer()
    probe.once('error', () => resolveFree(false))
    probe.listen(port, () => probe.close(() => resolveFree(true)))
  })
}

/**
 * Starts `nuxi dev playground` on a free port and resolves once it prints its
 * `Local:` line (`getLog()` returns everything the server has printed since). The child leads its own process group, so `stop()` can take the
 * whole `npx -> nuxi -> vite` tree down - killing only the wrapper leaves the
 * port bound (see brain/notes/playwright-verification-gotchas).
 */
export async function startPlayground() {
  clearStaleLock()
  const port = await freePort()
  const child = spawn('npx', ['nuxi', 'dev', 'playground', '--port', String(port)], {
    cwd: root,
    detached: true,
    env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let log = ''
  child.stdout.on('data', chunk => (log += chunk))
  child.stderr.on('data', chunk => (log += chunk))
  const exited = new Promise(resolveExit => child.once('exit', (code, signal) => resolveExit({ code, signal })))

  const stop = async () => {
    if (child.exitCode === null && child.signalCode === null) {
      process.kill(-child.pid, 'SIGTERM')
      const timer = setTimeout(() => {
        try {
          process.kill(-child.pid, 'SIGKILL')
        }
        catch {
          // already gone
        }
      }, 8000)
      await exited
      clearTimeout(timer)
    }
    // Nuxt removes its lock on a clean exit; make sure a hard kill did not leave one.
    rmSync(lockFile, { force: true })
    if (!await portIsFree(port))
      throw new Error(`Port ${port} is still bound after stopping the playground dev server.`)
  }

  const deadline = Date.now() + STARTUP_TIMEOUT_MS
  while (!log.includes('Local:')) {
    const state = await Promise.race([exited, new Promise(r => setTimeout(() => r(null), 500))])
    if (state)
      throw new Error(`The playground dev server exited before it was ready (code ${state.code}).\n${log.slice(-1500)}`)
    if (Date.now() > deadline) {
      await stop().catch(() => {})
      throw new Error(`The playground dev server was not ready after ${STARTUP_TIMEOUT_MS / 1000}s.\n${log.slice(-1500)}`)
    }
  }

  // `Local:` is printed while Nuxt is still building; until then every request
  // gets a 503 loading page (that reloads itself, so a browser would "work" while
  // logging errors). Wait for the app itself to answer 200.
  const url = `http://localhost:${port}`
  while (!await answers200(url)) {
    if (child.exitCode !== null)
      throw new Error(`The playground dev server exited while building.\n${log.slice(-1500)}`)
    if (Date.now() > deadline) {
      await stop().catch(() => {})
      throw new Error(`The playground did not answer 200 within ${STARTUP_TIMEOUT_MS / 1000}s (last status was not 200).\n${log.slice(-1500)}`)
    }
    await new Promise(resolveWait => setTimeout(resolveWait, 500))
  }

  return { url, stop, getLog: () => log }
}

async function answers200(url) {
  try {
    return (await fetch(url, { redirect: 'manual' })).status === 200
  }
  catch {
    return false
  }
}
