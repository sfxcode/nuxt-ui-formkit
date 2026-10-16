import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'
import { mountFormKit } from '../../support/mountFormKit'

// A repeater's list and row elements carry ids. They must be the same every time the same
// repeater is created - a server-rendered page and its hydration create it twice, and an id
// that differs (it used to contain a random uuid) is a hydration mismatch - yet two repeaters
// on one page must never share an id.
const rows = [{ title: 'First' }, { title: 'Second' }]

function mountRepeater(id: string) {
  return mountFormKit({
    type: 'nuxtUIRepeater',
    value: rows,
    inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition },
    props: { id, hideMoveButtons: true },
  })
}

const idsOf = (wrapper: Awaited<ReturnType<typeof mountRepeater>>) =>
  wrapper.findAll('[id^="formkit-item"]').map(element => element.attributes('id'))

describe('nuxtUIRepeater element ids', () => {
  it('are identical when the same repeater is created twice', async () => {
    const first = await mountRepeater('ids-test')
    const firstIds = idsOf(first)
    first.unmount()

    const second = await mountRepeater('ids-test')
    const secondIds = idsOf(second)
    second.unmount()

    expect(firstIds).toHaveLength(3) // the list and its two rows
    expect(secondIds).toEqual(firstIds)
  })

  it('differ between two repeaters on the same page', async () => {
    const Page = defineComponent({
      setup: () => () => h('div', [
        h(FormKit, { type: 'nuxtUIRepeater', id: 'repeater-a', value: rows, hideMoveButtons: true }),
        h(FormKit, { type: 'nuxtUIRepeater', id: 'repeater-b', value: rows, hideMoveButtons: true }),
      ]),
    })
    const wrapper = await mountSuspended(Page, {
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition, nuxtUIInput: nuxtUIInputDefinition } })]] },
    })

    const ids = wrapper.findAll('[id^="formkit-item"]').map(element => element.attributes('id'))
    expect(ids).toHaveLength(6)
    expect(new Set(ids).size).toBe(6)
  })

  it('keep the formkit-items-/formkit-item-<index>- prefixes the other tests and styles rely on', async () => {
    const wrapper = await mountRepeater('ids-prefix')
    const ids = idsOf(wrapper)

    expect(ids[0]).toMatch(/^formkit-items-/)
    expect(ids[1]).toMatch(/^formkit-item-0-/)
    expect(ids[2]).toMatch(/^formkit-item-1-/)
  })
})
