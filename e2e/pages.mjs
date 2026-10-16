import { assert, labelsOf, messagesOf, poll, section } from './helpers.mjs'

/**
 * The page table. Each entry is loaded in a fresh page; the run fails if the
 * page throws, logs a console error or a Vue warning, or any check throws.
 *
 *   path:   route to open
 *   ready:  selector that must exist before the checks start (default 'form')
 *   checks: async (page) => void - assert on rendered DOM / observable state
 */
export default [
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
]
