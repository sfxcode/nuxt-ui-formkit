import { existsSync } from 'node:fs'
import { chromium } from 'playwright-core'

// `playwright-core` ships no browser (no 170MB download); it drives the Chrome
// that is already installed. Override with E2E_CHROME=/path/to/chrome.
const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
]

export function findChrome() {
  const fromEnv = process.env.E2E_CHROME
  if (fromEnv) {
    if (!existsSync(fromEnv))
      throw new Error(`E2E_CHROME points at ${fromEnv}, which does not exist.`)
    return fromEnv
  }
  const found = CANDIDATES.find(path => existsSync(path))
  if (!found)
    throw new Error(`No installed Chrome found. Set E2E_CHROME to a Chrome/Chromium executable (looked in: ${CANDIDATES.join(', ')}).`)
  return found
}

export function launchBrowser() {
  return chromium.launch({ executablePath: findChrome(), headless: true })
}
