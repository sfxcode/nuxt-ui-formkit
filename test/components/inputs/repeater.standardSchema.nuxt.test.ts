import type { FormKitNode } from '@formkit/core'
import { isNode } from '@formkit/core'
import { defaultConfig, FormKit, FormKitSchema, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { z } from 'zod'
import { attachStandardSchema } from '../../../src/runtime/composables/useFormKitStandardSchema'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'

// This is the highest-risk address-resolution case per the plan: a
// `nuxtUIRepeater`'s outer `input`-type node and its inner `list`-type node
// share the same name but are registered as two separate children of the
// same parent - the outer one is never a real graph parent of the inner one
// (see brain/notes/formkit-repeater-list-value-binding). A naive
// `node.at('items.0.email')` always resolves the outer, childless wrapper
// first and fails every time - see the `resolveAddress` fix in
// useFormKitStandardSchema.ts this test exercises.

// Same reuse-of-id concern as the other standard-schema tests - every test
// shares the `repeater-schema-form` id in FormKit's global registry.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

const repeaterSchema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'items',
    insertButtonLabel: 'Add Item',
    alwaysDisplayInsertButton: true,
    displayDeleteButton: true,
    hideMoveButtons: true,
    newItem: { email: '' },
    children: [
      { $formkit: 'nuxtUIInput', name: 'email', label: 'Email' },
    ],
  },
]

function mountRepeaterForm(value: object) {
  return mountSuspended(FormKit, {
    props: {
      type: 'form',
      id: 'repeater-schema-form',
      modelValue: value,
    },
    slots: {
      default: () => h(FormKitSchema, { schema: repeaterSchema }),
    },
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: {
          nuxtUIRepeater: nuxtUIRepeaterDefinition,
          nuxtUIInput: nuxtUIInputDefinition,
        },
      })]],
    },
  })
}

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

// `FU*.vue` inputs don't yet wire a real DOM `blur` event to
// `context.handlers.blur` (see brain/backlog.md) - calling it directly here
// exercises the same `validationVisible` gate a real blur would, independent
// of that separate, pre-existing gap. Walked manually (not via `node.at()`,
// which has its own self/sibling-relative semantics unrelated to this bug)
// to reach a specific row's field regardless of the addressing issue under
// test.
function blurRowEmail(formNode: FormKitNode, rowIndex: number) {
  const listNode = formNode.children.filter(isNode).find(child => child.name === 'items' && child.type === 'list')
  const row = listNode?.children.filter(isNode).find(child => String(child.name) === String(rowIndex))
  const emailNode = row?.children.filter(isNode).find(child => child.name === 'email')
  emailNode?.context?.handlers.blur()
}

describe('attachStandardSchema against a nuxtUIRepeater', () => {
  it('lands each row\'s error on that row\'s own field, not a sibling, and stays correct after an insert shifts indices', async () => {
    const schema = z.object({
      items: z.array(z.object({ email: z.email() })),
    })

    const wrapper = await mountRepeaterForm({
      items: [{ email: 'bad0' }, { email: 'ok1@example.com' }, { email: 'bad2' }],
    })
    activeWrapper = wrapper
    await settle()

    const formContext = useFormKitContextById('repeater-schema-form')
    const formNode = formContext.value!.node
    attachStandardSchema(formNode, schema)
    await settle()

    blurRowEmail(formNode, 0)
    blurRowEmail(formNode, 1)
    blurRowEmail(formNode, 2)
    await settle()

    const items = wrapper.findAll('[id^="formkit-item-"]')
    expect(items).toHaveLength(3)
    expect(items[0]!.text()).toContain('Invalid email address')
    expect(items[1]!.text()).not.toContain('Invalid email address')
    expect(items[2]!.text()).toContain('Invalid email address')

    // Insert a new row - `nuxtUIRepeater`'s own insert button prepends
    // (see `insertNode` in useFormKitRepeater.ts), shifting every existing
    // row's index up by one. This is exactly the scenario that would break
    // if address resolution used stale pre-insert row identities.
    const insertButton = wrapper.findAll('button').find(button => button.text().includes('Add Item'))
    expect(insertButton).toBeDefined()
    await insertButton!.trigger('click')
    await settle()

    blurRowEmail(formNode, 0)
    blurRowEmail(formNode, 1)
    blurRowEmail(formNode, 2)
    blurRowEmail(formNode, 3)
    await settle()

    const itemsAfterInsert = wrapper.findAll('[id^="formkit-item-"]')
    expect(itemsAfterInsert).toHaveLength(4)
    // The new blank row lands at index 0 and is itself invalid (empty email).
    expect(itemsAfterInsert[0]!.text()).toContain('Invalid email address')
    // Former row 0 ('bad0') is now at index 1.
    expect(itemsAfterInsert[1]!.text()).toContain('Invalid email address')
    // Former row 1 (valid) is now at index 2 - still no error post-shift.
    expect(itemsAfterInsert[2]!.text()).not.toContain('Invalid email address')
    // Former row 2 ('bad2') is now at index 3.
    expect(itemsAfterInsert[3]!.text()).toContain('Invalid email address')
  })
})
