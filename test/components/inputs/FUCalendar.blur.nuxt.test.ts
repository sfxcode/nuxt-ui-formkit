import type { FormKitNode } from '@formkit/core'
import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { nuxtUICalendarDefinition } from '../../../src/runtime/formkit/definitions/input'

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

describe('FUCalendar blur wiring', () => {
  it('reveals the validation message only once focus leaves the whole calendar grid, not between its own day cells', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUICalendar',
        modelValue: undefined,
        validation: 'required',
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUICalendar: nuxtUICalendarDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    // The grid also renders non-focusable "padding" cells for adjacent
    // months (no `tabindex` attribute at all) alongside real day cells,
    // which get a roving `tabindex` (`"0"` for the current one, `"-1"` for
    // the rest, per Reka UI's roving-tabindex pattern) - only cells with an
    // actual `tabindex` are real, focusable days.
    const cells = wrapper.findAll('[data-slot="cellTrigger"][tabindex]')
    expect(cells.length).toBeGreaterThanOrEqual(2)

    expect(node.context?.state.blurred).toBe(false)
    expect(wrapper.text()).not.toContain('is required.')

    const first = cells[0]!.element as HTMLElement
    const second = cells[1]!.element as HTMLElement
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

  it('keeps detecting blur correctly after month navigation re-renders the cell grid', async () => {
    const wrapper = await mountSuspended(FormKit, {
      props: {
        type: 'nuxtUICalendar',
        modelValue: undefined,
        validation: 'required',
        monthControls: true,
      },
      attachTo: document.body,
      global: {
        plugins: [[plugin, defaultConfig({ inputs: { nuxtUICalendar: nuxtUICalendarDefinition } })]],
      },
    })
    activeWrapper = wrapper
    await settle()

    const node = exposedNode(wrapper)
    const nextMonthButton = wrapper.findAll('button').find(button => (button.attributes('aria-label') || '').toLowerCase().includes('next'))
    expect(nextMonthButton).toBeDefined()

    await nextMonthButton!.trigger('click')
    await settle()

    // `createContainerBlurHandler` reads `event.currentTarget` fresh on
    // every dispatch rather than a stored ref, so it shouldn't matter that
    // month navigation just replaced every cell element - confirm that
    // holds rather than assuming it from the implementation alone.
    const cells = wrapper.findAll('[data-slot="cellTrigger"][tabindex]')
    expect(cells.length).toBeGreaterThanOrEqual(2)

    const first = cells[0]!.element as HTMLElement
    const second = cells[1]!.element as HTMLElement
    first.focus()
    await settle()
    second.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(false)

    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()
    await settle()

    expect(node.context?.state.blurred).toBe(true)
    outsideButton.remove()
  })
})
