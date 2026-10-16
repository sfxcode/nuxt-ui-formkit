import { readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { assert, dragAndDrop, fieldByLabel, labelsOf, messagesOf, nodeState, poll, section } from './helpers.mjs'

// Known SSR gaps, as `[type, ..., why]`. Each is held to the rule that a gap which stops
// being one fails the run, so it is removed on purpose; later steps of plan 19 empty both lists.

// Types that hydrate with a mismatch (checked in dev, where Vue reports attribute mismatches).
const KNOWN_HYDRATION_GAPS = [
]

// Things the server HTML does not contain, as `[type, what, why]`.
const KNOWN_SSR_GAPS = [
  ['nuxtUIMultiStep', 'label', 'the tab strip is empty on the server: tab items are built in the node\'s `created` hook by a client-side watchEffect, so the step labels only appear after hydration (the step panels themselves are server-rendered)'],
  ['nuxtUIStep', 'label', 'same: a step\'s label is only shown as a tab, and the tab strip is empty on the server'],
]

/**
 * The page table. Each entry is loaded in a fresh page; the run fails if the
 * page throws, logs a console error or a Vue warning, or any check throws.
 *
 *   path:   route to open
 *   ready:  selector that must exist before the checks start (default 'form')
 *   checks: async (page) => void - assert on rendered DOM / observable state
 */
const explicitPages = [
  {
    path: '/form/auto-form',
    async checks(page) {
      const data = section(page, 'Inferred from Data')
      const valibot = section(page, 'Valibot')

      // Inferred from data: field types, the override-driven required markers, and the appended field.
      assert.deepEqual(await labelsOf(data), [
        'First Name *',
        'Last Name',
        'Age',
        'Newsletter',
        'Newsletter',
        'Birthday',
        'Bio',
        'Tags',
        'City',
        'Zip',
        'Contacts',
        'Email *',
        'Primary',
        'Primary',
        'Email *',
        'Primary',
        'Primary',
        'Nickname',
      ])
      assert.equal(await data.locator('input').first().inputValue(), 'Ada')

      // Inferred from a valibot schema: required markers come from the schema, the optional field has none.
      assert.deepEqual(await labelsOf(valibot), ['Name *', 'Email *', 'Age', 'Newsletter', 'Newsletter', 'Contacts', 'Email *', 'Role'])
      assert.equal(await valibot.locator('input').last().inputValue(), 'friend', 'the optional field keeps its schema default')

      // An empty submit surfaces every required field, once for each.
      await valibot.locator('button[type="submit"]').click()
      await poll(() => messagesOf(valibot), messages => assert.deepEqual(messages, [
        'Name is required.',
        'Email is required.',
        'Email is required.',
        'Sorry, not all fields are filled out correctly.',
      ]))

      // The valibot minValue(18)/maxValue(120) bounds are enforced on the number input.
      const age = valibot.locator('input[role="spinbutton"]')
      await age.fill('5')
      await age.blur()
      await valibot.locator('button[type="submit"]').click()
      await poll(() => messagesOf(valibot), messages => assert.ok(messages.includes('Age must be at least 18.'), `got ${JSON.stringify(messages)}`))

      await age.fill('500')
      await age.blur()
      await valibot.locator('button[type="submit"]').click()
      await poll(() => messagesOf(valibot), (messages) => {
        assert.ok(messages.includes('Age must be no more than 120.'), `got ${JSON.stringify(messages)}`)
        assert.ok(!messages.includes('Age must be at least 18.'), 'the lower-bound message must clear')
      })
    },
  },
  {
    path: '/form/form-autosave',
    async checks(page) {
      // The plugin's storage key: `${prefix}-${key}-${form id}`, as the page documents it.
      const key = 'nuxt-ui-formkit-profile-draft-autosave-demo'
      const draft = () => page.evaluate(storageKey => localStorage.getItem(storageKey), key)
      const field = label => page.getByLabel(label)
      const isDirty = () => page.getByText('isDirty:').locator('strong').textContent()

      assert.equal(await draft(), null, 'a fresh browser context starts without a draft')

      // Typing saves a draft (debounced), holding what was typed.
      await field('Name').fill('Ada Lovelace')
      await field('Email').fill('ada@example.com')
      await poll(draft, (value) => {
        assert.ok(value, 'a draft is saved after typing')
        assert.deepEqual(JSON.parse(value).data, { name: 'Ada Lovelace', email: 'ada@example.com', bio: '' })
      })

      // A reload restores the draft into the inputs, and the form counts as dirty again.
      await page.reload({ waitUntil: 'networkidle' })
      await page.waitForSelector('form')
      await poll(() => field('Name').inputValue(), value => assert.equal(value, 'Ada Lovelace'))
      assert.equal(await field('Email').inputValue(), 'ada@example.com')
      await poll(isDirty, value => assert.equal(value, 'true'))

      // Submitting inside the debounce window must not let the pending save write the
      // just-submitted draft back (the race fixed in plan 18 phase 1).
      await field('Name').fill('Ada King')
      await page.locator('button[type="submit"]').click()
      await poll(() => page.getByText('Last submitted').count(), count => assert.equal(count, 1))
      // Absence over a window: the page debounces for 300ms, so wait well past it.
      await page.waitForTimeout(900)
      assert.equal(await draft(), null, 'submitting clears the draft and nothing writes it back')
      assert.equal(await page.getByText('isSubmitted:').locator('strong').textContent(), 'true')
    },
  },
  {
    path: '/form/overlay-form',
    ssr: true, // also in SSR mode: the overlay composable must behave the same on a server-rendered page
    ready: 'button',
    async checks(page) {
      const dialog = page.locator('[role="dialog"]')
      const prompt = page.locator('[role="alertdialog"]')
      const rowNames = () => page.locator('p.font-medium').allInnerTexts()
      const edit = () => page.getByRole('button', { name: 'Edit', exact: true }).first()
      const pressEscape = () => page.keyboard.press('Escape')

      assert.deepEqual(await rowNames(), ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'])

      // Save resolves with the edited data and the row updates.
      await edit().click()
      await poll(() => dialog.textContent(), text => assert.ok(text?.includes('Edit Ada Lovelace')))
      const name = dialog.locator('input').first()
      assert.equal(await name.inputValue(), 'Ada Lovelace')
      await name.fill('Ada King')
      await dialog.locator('button[type="submit"]').click()
      await poll(() => dialog.count(), count => assert.equal(count, 0))
      assert.equal((await rowNames())[0], 'Ada King')

      // confirmDiscard: Escape on a dirty form asks first; "Keep editing" leaves it open and untouched.
      await edit().click()
      await poll(() => dialog.locator('input').first().inputValue(), value => assert.equal(value, 'Ada King'))
      await dialog.locator('input').first().fill('Zed')
      // Escape before FormKit has registered the edit takes the clean path and closes the overlay.
      await poll(() => nodeState(dialog.locator('form')), state => assert.equal(state.dirty, true))
      await pressEscape()
      await poll(() => prompt.count(), count => assert.equal(count, 1), { timeout: 8000 })
      await page.locator('[data-testid="discard-keep"]').click()
      await poll(() => prompt.count(), count => assert.equal(count, 0))
      assert.equal(await dialog.locator('input').first().inputValue(), 'Zed', 'keeping the edit leaves the typed value')

      // ...and confirming the discard closes it without changing the row.
      await pressEscape()
      await poll(() => prompt.count(), count => assert.equal(count, 1))
      await page.locator('[data-testid="discard-confirm"]').click()
      await poll(() => dialog.count(), count => assert.equal(count, 0))
      assert.equal((await rowNames())[0], 'Ada King', 'a discarded edit does not touch the row')

      // Auto-Edit infers the form from the row's own data.
      await page.getByRole('button', { name: 'Auto-Edit' }).first().click()
      await poll(() => dialog.textContent(), text => assert.ok(text?.includes('Edit Ada King (auto-inferred)')))
      await poll(() => labelsOf(dialog), labels => assert.deepEqual(labels, ['Id', 'Name', 'Email', 'Role']))
      await dialog.getByRole('button', { name: 'Cancel' }).click()
      await poll(() => dialog.count(), count => assert.equal(count, 0))
    },
  },
  {
    path: '/form/multi-step',
    async checks(page) {
      const wizard = section(page, 'Account Registration Wizard')
      const tabs = wizard.locator('[data-slot="trigger"]')
      const panels = wizard.locator('[role="tabpanel"]')
      const next = wizard.getByRole('button', { name: 'Next', exact: true })
      const visiblePanels = () => panels.evaluateAll(all => all.map(panel => panel.checkVisibility({ visibilityProperty: true }) && !panel.closest('[hidden]')))

      await poll(() => tabs.count(), count => assert.equal(count, 3))
      assert.deepEqual((await tabs.allInnerTexts()).map(text => text.trim().split('\n')[0]), ['Account', 'Profile', 'Confirm'])
      assert.deepEqual(await visiblePanels(), [true, false, false], 'the first step is shown')

      // allowIncomplete: false - Next stays disabled until the step validates.
      await poll(() => next.isDisabled(), disabled => assert.equal(disabled, true))
      await wizard.getByLabel('Email').fill('ada@example.com')
      await wizard.getByLabel('Password').fill('correct horse')
      await poll(() => next.isDisabled(), disabled => assert.equal(disabled, false))
      await next.click()
      await poll(visiblePanels, visible => assert.deepEqual(visible, [false, true, false]))

      // The last tab is not reachable until the profile step is valid either.
      const confirmTab = tabs.nth(2)
      await poll(() => confirmTab.isDisabled(), disabled => assert.equal(disabled, true))
      await wizard.getByLabel('Display Name').fill('Ada')
      await poll(() => confirmTab.isDisabled(), disabled => assert.equal(disabled, false))
      await confirmTab.click()
      await poll(visiblePanels, visible => assert.deepEqual(visible, [false, false, true]))

      // Finishing the wizard submits the whole form.
      await wizard.getByLabel('I accept the terms and conditions').click()
      const submitted = page.waitForEvent('console', { predicate: message => message.text().includes('Registration Submitted'), timeout: 8000 })
      await wizard.locator('button[type="submit"]').click()
      await submitted
    },
  },
  {
    path: '/form/repeater-drag',
    async checks(page) {
      const board = section(page, 'Task Management Board')
      const rows = board.locator('[id^="formkit-item-"]')
      const titles = () => rows.evaluateAll(all => all.map(row => row.querySelector('input').value))

      const initial = [
        'Design homepage mockup',
        'Implement user authentication',
        'Write API documentation',
        'Setup CI/CD pipeline',
        'Code review session',
      ]
      await poll(titles, value => assert.deepEqual(value, initial))
      assert.equal(await rows.first().getAttribute('draggable'), 'true', 'rows are draggable')

      // A real drag (dragstart / dragover / drop / dragend on one DataTransfer) moves the row:
      // dropping the first row on the third puts it in the third position.
      const moved = [initial[1], initial[2], initial[0], initial[3], initial[4]]
      await dragAndDrop(rows.nth(0), rows.nth(2))
      await poll(titles, value => assert.deepEqual(value, moved))

      // Dragging a row onto itself changes nothing.
      await dragAndDrop(rows.nth(1), rows.nth(1))
      await poll(titles, value => assert.deepEqual(value, moved))

      // The reordered list is what a save submits.
      const submitted = page.waitForEvent('console', { predicate: message => message.text().includes('Tasks Submitted'), timeout: 8000 })
      await board.locator('button[type="submit"]').click()
      await submitted
    },
  },
  {
    path: '/form/listbox-transfer',
    ready: '[data-slot="item"]',
    async checks(page) {
      // "Project Team" is both the field's label and the right pane's header; the pane's is the last.
      const team = page.locator('xpath=(//*[normalize-space(text())="Project Team"])[last()]/following::*[@data-slot="item"]')
      const roster = page.locator('xpath=//*[normalize-space(text())="Company Roster"]/ancestor::div[.//*[@data-slot="item"]][1]').first().locator('[data-slot="item"]')
      const names = items => items.evaluateAll(all => all.map(item => item.textContent.trim()))
      const startsWith = (list, name) => list.some(text => text.startsWith(name))
      const field = page.locator('[data-type="nuxtUIListbox"]').first()

      await poll(() => names(team), list => assert.equal(list.length, 2))
      const initialTeam = await names(team)
      assert.ok(startsWith(initialTeam, 'Grace Hopper') && startsWith(initialTeam, 'Margaret Hamilton'), `got ${JSON.stringify(initialTeam)}`)
      assert.equal((await names(roster)).length, 5)
      assert.equal(await roster.first().evaluate(item => item.draggable), true, 'transferItemDraggable makes the rows draggable')

      // Roster -> team: dragging a roster member onto the team list adds it there and removes it from the roster.
      await dragAndDrop(roster.filter({ hasText: 'Ada Lovelace' }), team.first())
      await poll(() => names(team), list => assert.ok(list.length === 3 && startsWith(list, 'Ada Lovelace'), `team: ${JSON.stringify(list)}`))
      await poll(() => names(roster), list => assert.ok(list.length === 4 && !startsWith(list, 'Ada Lovelace'), `roster: ${JSON.stringify(list)}`))

      // Team -> roster: and back out again.
      await dragAndDrop(team.filter({ hasText: 'Ada Lovelace' }), roster.first())
      await poll(() => names(team), list => assert.ok(list.length === 2 && !startsWith(list, 'Ada Lovelace'), `team: ${JSON.stringify(list)}`))
      await poll(() => names(roster), list => assert.ok(list.length === 5 && startsWith(list, 'Ada Lovelace'), `roster: ${JSON.stringify(list)}`))

      // Moving items between the two sibling lists is not the field losing focus.
      assert.equal((await nodeState(field)).blurred, false, 'a transfer between the panes must not count as a blur')
      assert.deepEqual(await messagesOf(field), [])

      // Real focus moving between the two sibling panes (dispatched drag events never move focus):
      // each Tab lands on another element of the same field, which is not a blur.
      await roster.first().click()
      for (let step = 1; step <= 3; step++) {
        await page.keyboard.press('Tab')
        assert.equal(await field.evaluate(element => element.contains(document.activeElement)), true, `Tab ${step} stays inside the field`)
        assert.equal((await nodeState(field)).blurred, false, `focus moving within the field (Tab ${step}) must not count as a blur`)
      }
    },
  },
  {
    path: '/components/input/editor',
    ready: '[contenteditable="true"]',
    async checks(page) {
      const editor = label => fieldByLabel(page, label)
      const content = label => editor(label).locator('[contenteditable="true"]')
      const blurred = async label => (await nodeState(editor(label))).blurred

      // Every floating menu (bubble toolbar, slash menu, mention menu, drag handle) renders
      // inside the editor and clicking it is not the field losing focus (plan 18 phase 7).

      // Bubble toolbar: select text, click a button in it.
      await content('Basic Editor').click()
      await page.keyboard.type('Select this text')
      await content('Basic Editor').locator('p').first().click({ clickCount: 3 })
      const bubble = editor('Basic Editor').locator('[data-slot="content"] [role="toolbar"] button').first()
      await poll(() => bubble.count(), count => assert.equal(count, 1), { timeout: 8000 })
      assert.equal(await blurred('Basic Editor'), false)
      await bubble.click()
      assert.equal(await blurred('Basic Editor'), false, 'clicking a bubble toolbar button')

      // Slash menu: type '/', click an option.
      await content('Slash Commands').click()
      await page.keyboard.type('/')
      const slashOption = editor('Slash Commands').locator('[role="listbox"] [role="option"]').first()
      await poll(() => slashOption.count(), count => assert.equal(count, 1), { timeout: 8000 })
      await slashOption.click()
      assert.equal(await blurred('Slash Commands'), false, 'clicking a slash menu option')

      // Mention menu: type '@', click a person.
      await content('Mentions').click()
      await page.keyboard.type('@')
      const mention = editor('Mentions').locator('[role="listbox"] [role="option"]', { hasText: 'Alan Turing' })
      await poll(() => mention.count(), count => assert.equal(count, 1), { timeout: 8000 })
      await mention.click()
      assert.equal(await blurred('Mentions'), false, 'clicking a mention option')

      // Drag handle: hover the left edge of a block, click the handle.
      await content('Drag Handle').click()
      const box = await content('Drag Handle').locator('p').first().boundingBox()
      await page.mouse.move(box.x + 30, box.y + 10)
      const handle = editor('Drag Handle').locator('[data-drag-handle], [data-slot="handle"], [draggable="true"]').first()
      await poll(() => handle.count(), count => assert.equal(count, 1), { timeout: 8000 })
      const handleBox = await handle.boundingBox()
      await page.mouse.click(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2)
      assert.equal(await blurred('Drag Handle'), false, 'clicking the drag handle')

      // The detector can see a real blur: clicking elsewhere on the page does flip it.
      await page.mouse.click(5, 5)
      await poll(() => blurred('Drag Handle'), value => assert.equal(value, true))
    },
  },
  {
    // Server rendering (`npm run test:e2e:ssr`): every registered type renders on the real
    // server, and the page then hydrates without a warning (the runner fails on one).
    // Types in KNOWN_HYDRATION_GAPS are left out of the loaded page and checked separately.
    path: `/ssr-all-types?skip=${KNOWN_HYDRATION_GAPS.map(([type]) => type).join(',')}`,
    ssr: 'only',
    // `body`, not `form`: a type that breaks server rendering makes the whole page a 500, and
    // the per-type checks below are what name it.
    ready: 'body',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const serverResponse = async (query) => {
        const response = await page.request.get(`${origin}/ssr-all-types${query}`)
        return { status: response.status(), html: await response.text() }
      }

      // The registered types, as listed by the page itself (`?list=1` renders none of them,
      // so the list survives a type that breaks server rendering).
      const listing = (await serverResponse('?list=1')).html.match(/data-registered-types[^>]*>([^<]+)</)
      const types = (listing?.[1] ?? '').trim().split(',').filter(Boolean)
      assert.ok(types.length >= 30, `the page lists the registered types (got ${types.length})`)

      // FormKit renders these two with a type forced by the multi-step plugin, not the registry key.
      const renderedType = { nuxtUIMultiStep: 'multi-step', nuxtUIStep: 'step' }
      const knownGap = (type, what) => KNOWN_SSR_GAPS.find(([knownType, knownWhat]) => knownType === type && knownWhat === what)

      // One request per type, so a type that breaks server rendering is named, not hidden behind one 500.
      const problems = []
      for (const type of types) {
        const { status, html } = await serverResponse(`?type=${type}`)
        if (status !== 200) {
          problems.push(`${type}: the server answered ${status}`)
          continue
        }
        const expectedType = renderedType[type] ?? type
        if (!html.includes(`data-type="${expectedType}"`))
          problems.push(`${type}: no data-type="${expectedType}" in the server HTML`)
        // Outputs show their value, not a field label; every input type is given one.
        if (!type.startsWith('nuxtUIOutput')) {
          const hasLabel = html.includes(`${type} label`)
          if (knownGap(type, 'label') && hasLabel)
            problems.push(`${type}: its label is now server-rendered - remove it from KNOWN_SSR_GAPS`)
          else if (!knownGap(type, 'label') && !hasLabel)
            problems.push(`${type}: its label is missing from the server HTML`)
        }
      }
      assert.deepEqual(problems, [], 'every registered type renders on the server')

      // A known hydration gap must still be a gap: once a type hydrates cleanly it has to leave the list.
      for (const [type] of KNOWN_HYDRATION_GAPS) {
        const probe = await page.context().browser().newPage()
        const messages = []
        probe.on('console', message => messages.push(message.text()))
        await probe.goto(`${origin}/ssr-all-types?type=${type}`, { waitUntil: 'networkidle' })
        await probe.waitForTimeout(1000)
        await probe.close()
        assert.ok(messages.some(text => /hydration/i.test(text)), `${type} now hydrates cleanly - remove it from KNOWN_HYDRATION_GAPS`)
      }
    },
  },
  {
    // `FUDataEdit`'s `autosave` prop on a server-rendered page (not inside `<ClientOnly>`, unlike
    // form/form-autosave): the plugin must not break the render, a stored draft must appear
    // after hydration without a mismatch, and the plugin must still save once hydrated.
    path: '/ssr-autosave',
    ssr: 'only',
    // `body`, not `form`: if the plugin broke server rendering the page would be a 500 with no
    // form, and the checks below are what say so.
    ready: 'body',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const storageKey = 'nuxt-ui-formkit-ssr-draft-ssr-autosave-form'
      const draft = () => page.evaluate(key => localStorage.getItem(key), storageKey)
      const name = page.getByLabel('Name')

      // The server renders the whole form (the plugin is a no-op there), with no draft in it.
      const response = await page.request.get(`${origin}/ssr-autosave`)
      const html = await response.text()
      assert.equal(response.status(), 200)
      assert.ok(/<form[\s>]/.test(html), 'the form is in the server HTML')
      assert.equal((html.match(/<input/g) ?? []).length, 2, 'both inputs are in the server HTML')
      assert.ok(!html.includes('Ada Lovelace'), 'the server knows nothing of a browser draft')

      // A draft stored in the browser is restored after hydration (and the runner fails the
      // reload on a hydration warning).
      assert.equal(await draft(), null)
      await page.evaluate(key => localStorage.setItem(key, JSON.stringify({ maxAge: Date.now() + 3_600_000, data: { name: 'Ada Lovelace', email: 'ada@example.com' } })), storageKey)
      await page.reload({ waitUntil: 'networkidle' })
      await poll(() => name.inputValue(), value => assert.equal(value, 'Ada Lovelace'))
      assert.equal(await page.getByLabel('Email').inputValue(), 'ada@example.com')

      // The plugin is live on a server-rendered page: typing writes a new draft.
      await name.fill('Grace Hopper')
      await poll(draft, value => assert.equal(JSON.parse(value).data.name, 'Grace Hopper'))
    },
  },
  // Pages with a repeater, server-rendered and hydrated. The repeater's list and row ids used to
  // contain a random uuid, so each of these logged a hydration mismatch in dev; the runner fails
  // on one, so merely loading them is the check - plus that the repeater really rendered.
  ...[
    '/form/auto-form',
    '/form/repeater-sample',
    '/form/repeater-nested',
    '/form/repeater-drag',
    '/samples/job-application',
    '/samples/user-registration',
  ].map(path => ({
    path,
    ssr: 'only',
    async checks(page) {
      const repeaterElements = page.locator('[id^="formkit-item"]')
      await poll(() => repeaterElements.count(), count => assert.ok(count > 0, 'the repeater rendered'))
    },
  })),
  {
    // The editor on a server-rendered page. `UEditor` (Tiptap) is built on mount, so the server
    // renders the field's chrome (label, help) but nothing of the editor; it appears after
    // hydration, content included, with no mismatch (the runner fails on a hydration warning).
    path: '/ssr-editor',
    ssr: 'only',
    // `body`, not `form`: if the editor broke server rendering the page would be a 500 with no
    // form, and the checks below are what say so.
    ready: 'body',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const response = await page.request.get(`${origin}/ssr-editor`)
      const html = await response.text()

      assert.equal(response.status(), 200, 'the editor does not break server rendering')
      assert.ok(html.includes('>Body<') && html.includes('>Rich<'), 'the field labels are server-rendered')
      assert.ok(html.includes('Editor help text'), 'the help text is server-rendered')
      // A documented limit: nothing of the editor itself is in the server HTML, so the field is
      // shorter there and the content below shifts down when the editor mounts (about 73px each
      // in the default theme; reserve the height with a field `outerClass` min-height). If this
      // starts failing the editor is server-rendered: update this entry and the SSR docs.
      assert.ok(!html.includes('contenteditable') && !html.includes('Hello'), 'the editor is rendered on the client only')

      // After hydration both editors exist, with their toolbars and their content.
      await poll(() => page.locator('[contenteditable="true"]').count(), count => assert.equal(count, 2), { timeout: 15_000 })
      assert.ok(await page.locator('[role="toolbar"]').count() >= 2, 'the toolbars mounted')
      assert.ok((await page.locator('body').textContent()).includes('Hello server world'), 'the content is shown after hydration')
    },
  },
  {
    // Date fields on a server-rendered page, with the server and the browser in time zones 26 hours
    // apart (see run.mjs), so the same instant is a different calendar day on each side:
    // 2020-12-12T23:30:00Z is Dec 13 at UTC+14 and Dec 12 at UTC-12. Hydration must not mismatch
    // (the runner fails on a warning); the browser then shows its own day, and a field with an
    // explicit `timeZone` never moves.
    path: '/ssr-dates',
    ssr: 'only',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const html = await (await page.request.get(`${origin}/ssr-dates`)).text()
      // The date fields' visually hidden inputs, which hold the field's date as an ISO day.
      const hiddenValues = () => page.locator('input[aria-hidden="true"]').evaluateAll(inputs => inputs.map(input => input.value))
      const serverHidden = [...html.matchAll(/<input[^>]*aria-hidden="true"[^>]*>/g)].map(match => match[0].match(/value="([^"]*)"/)?.[1]).filter(Boolean)

      // The server rendered in its own zone: the instant is Dec 13 there (the JS Date and the zoned
      // ISO fields), while a plain ISO day and a field with an explicit UTC zone are Dec 12.
      assert.ok(serverHidden.includes('2020-12-13'), `the server renders the instant in its zone (got ${JSON.stringify(serverHidden)})`)
      assert.ok(serverHidden.includes('2020-12-12'), 'a zone-free day and an explicit UTC zone are Dec 12 on the server')

      // After mount the browser's own zone applies: the same fields now show Dec 12, and nothing
      // is left at Dec 13.
      await poll(hiddenValues, (values) => {
        assert.ok(!values.includes('2020-12-13'), `a field is still on the server's day (got ${JSON.stringify(values)})`)
        assert.ok(values.filter(value => value === '2020-12-12').length >= 4, `the dates show the browser's day (got ${JSON.stringify(values)})`)
      })
    },
  },
  {
    // The composables on a server-rendered page: they construct without error, `overlay.edit()`
    // fails loudly there instead of returning a promise nothing can settle, and a request leaves
    // nothing behind for the next one (the server process outlives every request).
    path: '/ssr-composables',
    ssr: 'only',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const fetchPage = async (query = '') => {
        const response = await page.request.get(`${origin}/ssr-composables${query}`)
        return { status: response.status(), html: await response.text() }
      }
      const outcome = html => html.match(/data-overlay-outcome[^>]*>([^<]*)</)?.[1]?.trim()
      const ids = html => [...html.matchAll(/ id="([^"]+)"/g)].map(match => match[1])
      const overlayCount = html => Number(html.match(/registered overlays: (\d+)/)?.[1])

      const plain = await fetchPage()
      assert.equal(plain.status, 200, 'the composables construct on the server')
      assert.equal(outcome(plain.html), 'not called')
      assert.ok(plain.html.includes('isDirty: false'), 'useFormKitForm reports its state on the server')

      // overlay.edit() on the server throws a message that says what to do instead.
      const edit = await fetchPage('?edit=1')
      assert.equal(edit.status, 200)
      assert.match(outcome(edit.html), /^threw: .*useFormKitOverlay\(\)\.edit\(\) cannot run on the server.*onMounted/)
      assert.ok(!edit.html.includes('Server edit'), 'no overlay is rendered on the server')

      // Nothing from that request is in the next one, and two plain renders are identical.
      const again = await fetchPage()
      assert.equal(outcome(again.html), 'not called', 'the failed server call left nothing behind')
      assert.deepEqual(ids(again.html), ids(plain.html), 'two server renders of the same page produce the same ids')

      // Constructing the overlay on every request must not keep adding registrations to a store
      // that outlives the requests.
      for (let request = 0; request < 3; request++)
        assert.equal(overlayCount((await fetchPage()).html), overlayCount(plain.html), 'the number of registered overlays does not grow per request')
    },
  },
  {
    // The editor-schema form builds its field ids from a counter; it used to be a module-level one
    // that grew with every request (`_dollar_formkit_4` on the server, `_1` in the browser), a
    // hydration mismatch and server HTML that depended on how many requests came before.
    path: '/form/input-editor',
    ssr: 'only',
    async checks(page) {
      const origin = new URL(page.url()).origin
      const renders = []
      for (let request = 0; request < 3; request++)
        renders.push(await (await page.request.get(`${origin}/form/input-editor`)).text())

      for (const html of renders) {
        assert.ok(html.includes('_dollar_formkit_1'), 'the ids start from 1 in every request')
        assert.ok(!/_dollar_formkit_[2-9]/.test(html), 'a later request does not continue the count')
      }
      assert.ok((await page.locator('[id^="_dollar_formkit_1"]').count()) > 0, 'the form hydrated with the same ids')
    },
  },
]

// Every playground route, found by walking the pages directory, so a page added later is covered
// by the SSR run without anyone remembering to list it. A page with an entry above keeps its own;
// the rest are only loaded: the runner fails on a hydration warning, a console error, a Vue warning
// or an error in the server log, which is the whole check.
function routesInPagesDirectory() {
  const pagesDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../playground/app/pages')
  const routes = []
  const walk = (directory, prefix) => {
    for (const name of readdirSync(directory)) {
      const full = join(directory, name)
      if (statSync(full).isDirectory()) {
        walk(full, `${prefix}/${name}`)
      }
      else if (name.endsWith('.vue')) {
        const stem = name.replace(/\.vue$/, '')
        routes.push(stem === 'index' ? (prefix || '/') : `${prefix}/${stem}`)
      }
    }
  }
  walk(pagesDirectory, '')
  return routes.sort()
}

const covered = new Set(explicitPages.map(entry => entry.path.split('?')[0]))

export default [
  ...explicitPages,
  ...routesInPagesDirectory()
    .filter(path => !covered.has(path))
    .map(path => ({ path, ssr: 'only', ready: 'body', async checks() {} })),
]
