import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUITreeDefinition } from '../../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function exposedNode(wrapper: Awaited<ReturnType<typeof mountSuspended>>): FormKitNode {
  return (wrapper.vm.$.exposed as unknown as { node: FormKitNode }).node
}

const treeItems = [
  {
    label: 'Fruits',
    defaultExpanded: true,
    children: [
      { label: 'Apple' },
      {
        label: 'Citrus',
        defaultExpanded: true,
        children: [
          { label: 'Orange' },
        ],
      },
    ],
  },
]

function mountTree(extraProps: Record<string, unknown> = {}) {
  return mountSuspended(FormKit, {
    props: {
      type: 'nuxtUITree',
      // `options` is FormKit's own reserved prop, always exposed on
      // `context.options` regardless of the type definition's `props`
      // whitelist - `useFormKitInput`'s shared `items` computed reads
      // `context.options` first, matching every other selection input
      // (FUCheckboxGroup/FUListbox/etc.) in this module.
      // `TreeItem`'s recursive `children` shape isn't representable by
      // `FormKit`'s own strict `FormKitOptionsList` prop type (which every
      // existing options-based test in this module sidesteps by only ever
      // passing flat string arrays) - cast is test-only.
      options: treeItems as unknown as string[],
      ...extraProps,
    },
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUITree: nuxtUITreeDefinition } })]],
    },
  })
}

describe('FUTree blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole tree, not between its own items', async () => {
    const wrapper = await mountTree({ modelValue: undefined, validation: 'required' })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const items = wrapper.findAll('button[data-slot="link"]')
    expect(items.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const first = items[0]!.element as HTMLElement
    const second = items[1]!.element as HTMLElement
    first.focus()
    await settle()
    second.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    expect(wrapper.text()).toContain('is required.')
    outsideButton.remove()
  })
})

describe('FUTree value shape', () => {
  it('sets the field value to the selected (possibly deeply nested) item', async () => {
    const wrapper = await mountTree({ modelValue: undefined })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const links = wrapper.findAll('button[data-slot="link"]')
    const orangeLink = links.find(link => link.text().includes('Orange'))
    expect(orangeLink).toBeDefined()

    // Confirmed empirically (reka-ui's TreeItem.js): a click both selects
    // *and* toggles expand in one event - clicking a leaf item like
    // `Orange` only exercises the select half, since it has no children to
    // toggle.
    await orangeLink!.trigger('click')
    await settle()

    expect(node.context?._value).toMatchObject({ label: 'Orange' })
  })

  it('does not change the field value when a parent is expanded/collapsed via keyboard, only via selection', async () => {
    const wrapper = await mountTree({ modelValue: undefined })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    let links = wrapper.findAll('button[data-slot="link"]')
    const orangeLink = links.find(link => link.text().includes('Orange'))
    expect(orangeLink).toBeDefined()
    await orangeLink!.trigger('click')
    await settle()
    expect(node.context?._value).toMatchObject({ label: 'Orange' })

    // Reka-ui's TreeItem keyboard handling toggles expand on ArrowLeft/
    // ArrowRight *without* selecting (unlike click, which does both at
    // once - see the previous test) - this is the isolated way to prove
    // expand/collapse alone never touches the field's value.
    const citrusLink = wrapper.findAll('button[data-slot="link"]').find(link => link.text().includes('Citrus'))!
    ;(citrusLink.element as HTMLElement).focus()
    await settle()

    await citrusLink.trigger('keydown', { key: 'ArrowLeft' })
    await settle()

    expect(wrapper.findAll('button[data-slot="link"]').some(link => link.text().includes('Orange'))).toBe(false)
    expect(node.context?._value).toMatchObject({ label: 'Orange' })

    await citrusLink.trigger('keydown', { key: 'ArrowRight' })
    await settle()

    links = wrapper.findAll('button[data-slot="link"]')
    expect(links.some(link => link.text().includes('Orange'))).toBe(true)
    expect(node.context?._value).toMatchObject({ label: 'Orange' })
  })
})
