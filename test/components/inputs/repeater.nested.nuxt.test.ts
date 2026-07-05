import { FormKit, FormKitSchema, defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'

// Nesting a nuxtUIRepeater inside another repeater's per-item schema had never
// been exercised (see plan 03 phase 4). This mirrors FUDataEdit's own
// <FormKit type="form"><FormKitSchema :schema /></FormKit> mounting pattern,
// since a nested repeater's inner schema is authored as raw `children` schema
// nodes (as playground examples do), not a component default slot.
const nestedSchema = [
  {
    $formkit: 'nuxtUIRepeater',
    name: 'employers',
    insertButtonLabel: 'Add Employer',
    alwaysDisplayInsertButton: true,
    displayDeleteButton: true,
    hideMoveButtons: true,
    newItem: { company: '', references: [] },
    children: [
      { $formkit: 'nuxtUIInput', name: 'company', label: 'Company' },
      {
        $formkit: 'nuxtUIRepeater',
        name: 'references',
        insertButtonLabel: 'Add Reference',
        alwaysDisplayInsertButton: true,
        displayDeleteButton: true,
        hideMoveButtons: true,
        newItem: { name: '' },
        children: [
          { $formkit: 'nuxtUIInput', name: 'name', label: 'Reference Name' },
        ],
      },
    ],
  },
]

function mountNestedRepeater(value: object) {
  return mountSuspended(FormKit, {
    props: {
      type: 'form',
      modelValue: value,
    },
    slots: {
      default: () => h(FormKitSchema, { schema: nestedSchema }),
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

function textInputs(wrapper: Awaited<ReturnType<typeof mountNestedRepeater>>) {
  return wrapper.findAll('input').map(input => (input.element as HTMLInputElement).value)
}

function findEmployerItem(wrapper: Awaited<ReturnType<typeof mountNestedRepeater>>, company: string) {
  const companyInput = wrapper.findAll('input').find(input => (input.element as HTMLInputElement).value === company)
  if (!companyInput)
    throw new Error(`expected an input with value "${company}"`)
  const item = wrapper.findAll('[id^="formkit-item-"]').find(candidate => candidate.element.contains(companyInput.element))
  if (!item)
    throw new Error(`expected to find an outer repeater item containing "${company}"`)
  return item
}

describe('nuxtUIRepeater nesting: a repeater inside another repeater\'s item schema', () => {
  it('renders both outer and inner repeater items on initial mount', async () => {
    const wrapper = await mountNestedRepeater({
      employers: [
        { company: 'Acme', references: [{ name: 'Alice' }, { name: 'Bob' }] },
        { company: 'Globex', references: [{ name: 'Carol' }] },
      ],
    })
    await flushPromises()
    await nextTick()

    const values = textInputs(wrapper)
    expect(values).toEqual(expect.arrayContaining(['Acme', 'Globex', 'Alice', 'Bob', 'Carol']))

    const acmeItem = findEmployerItem(wrapper, 'Acme')
    expect(acmeItem.findAll('[id^="formkit-item-"]')).toHaveLength(2)

    const globexItem = findEmployerItem(wrapper, 'Globex')
    expect(globexItem.findAll('[id^="formkit-item-"]')).toHaveLength(1)
  })

  it('inserting into an inner repeater does not affect sibling outer items', async () => {
    const wrapper = await mountNestedRepeater({
      employers: [
        { company: 'Acme', references: [{ name: 'Alice' }, { name: 'Bob' }] },
        { company: 'Globex', references: [{ name: 'Carol' }] },
      ],
    })
    await flushPromises()
    await nextTick()

    const acmeItem = findEmployerItem(wrapper, 'Acme')
    const addReferenceButton = acmeItem.findAll('button').find(button => button.text().includes('Add Reference'))
    expect(addReferenceButton).toBeDefined()

    await addReferenceButton!.trigger('click')
    await flushPromises()
    await nextTick()

    expect(findEmployerItem(wrapper, 'Acme').findAll('[id^="formkit-item-"]')).toHaveLength(3)
    expect(findEmployerItem(wrapper, 'Globex').findAll('[id^="formkit-item-"]')).toHaveLength(1)
    expect(wrapper.findAll('input').filter(input => ['Acme', 'Globex'].includes((input.element as HTMLInputElement).value))).toHaveLength(2)
  })

  it('inserting a new outer item does not affect existing inner (nested) items', async () => {
    const wrapper = await mountNestedRepeater({
      employers: [
        { company: 'Acme', references: [{ name: 'Alice' }, { name: 'Bob' }] },
        { company: 'Globex', references: [{ name: 'Carol' }] },
      ],
    })
    await flushPromises()
    await nextTick()

    const addEmployerButton = wrapper.findAll('button').find(button => button.text().includes('Add Employer'))
    expect(addEmployerButton).toBeDefined()

    await addEmployerButton!.trigger('click')
    await flushPromises()
    await nextTick()

    expect(findEmployerItem(wrapper, 'Acme').findAll('[id^="formkit-item-"]')).toHaveLength(2)
    expect(findEmployerItem(wrapper, 'Globex').findAll('[id^="formkit-item-"]')).toHaveLength(1)
  })

  it('removing an inner item does not affect sibling outer items', async () => {
    const wrapper = await mountNestedRepeater({
      employers: [
        { company: 'Acme', references: [{ name: 'Alice' }, { name: 'Bob' }] },
        { company: 'Globex', references: [{ name: 'Carol' }] },
      ],
    })
    await flushPromises()
    await nextTick()

    const acmeItem = findEmployerItem(wrapper, 'Acme')
    const firstReference = acmeItem.findAll('[id^="formkit-item-"]')[0]!
    const removeButton = firstReference.find('button')
    expect(removeButton.exists()).toBe(true)

    await removeButton.trigger('click')
    await flushPromises()
    await nextTick()

    expect(findEmployerItem(wrapper, 'Acme').findAll('[id^="formkit-item-"]')).toHaveLength(1)
    expect(findEmployerItem(wrapper, 'Globex').findAll('[id^="formkit-item-"]')).toHaveLength(1)
  })
})
