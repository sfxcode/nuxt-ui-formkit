import { CalendarDate } from '@internationalized/date'
import { describe, expect, it, vi } from 'vitest'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'
import { mountFormKit } from '../../support/mountFormKit'

// A new or cloned row is a copy of `newItem` / of the source row. The copy must keep
// non-plain values such as a `CalendarDate` intact: rebuilt as a plain object it
// loses its methods and the date inputs silently show nothing.
type Row = { label: string, when: CalendarDate }

function mountRepeater({ value = [], ...props }: Record<string, unknown> = {}) {
  return mountFormKit({
    type: 'nuxtUIRepeater',
    value,
    inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition },
    props: { insertButtonLabel: 'Add Item', alwaysDisplayInsertButton: true, displayCloneButton: true, hideMoveButtons: true, ...props },
  })
}

const lastValue = (wrapper: Awaited<ReturnType<typeof mountRepeater>>) =>
  (wrapper.emitted('update:modelValue')!.at(-1)![0]) as Row[]

describe('nuxtUIRepeater copies rows without flattening class instances', () => {
  it('a row inserted from newItem holds a real CalendarDate', async () => {
    const when = new CalendarDate(2021, 1, 2)
    const wrapper = await mountRepeater({ newItem: { label: 'fresh', when } })

    await wrapper.findAll('button').find(button => button.text().includes('Add Item'))!.trigger('click')

    await vi.waitFor(() => expect(lastValue(wrapper)).toHaveLength(1))
    const [inserted] = lastValue(wrapper)
    expect(inserted!.label).toBe('fresh')
    expect(inserted!.when).toBeInstanceOf(CalendarDate)
    expect(inserted!.when.toString()).toBe('2021-01-02')
  })

  // Starts from a row inserted after mount: FormKit's own handling of a repeater's
  // *initial* value already turns a CalendarDate in it into a plain object (the very
  // first emitted value shows it), which is outside the copy under test here.
  it('a cloned row holds a real CalendarDate, and is a separate object from its source', async () => {
    const wrapper = await mountRepeater({ value: [], newItem: { label: 'fresh', when: new CalendarDate(2021, 1, 2) } })
    const rowButtons = () => wrapper.findAll('button')

    await rowButtons().find(button => button.text().includes('Add Item'))!.trigger('click')
    await vi.waitFor(() => expect(lastValue(wrapper)).toHaveLength(1))

    const cloneButton = rowButtons().find(button => button.find('.iconify.i-lucide\\:copy').exists())
    expect(cloneButton).toBeDefined()
    await cloneButton!.trigger('click')

    await vi.waitFor(() => expect(lastValue(wrapper)).toHaveLength(2))
    const [source, clone] = lastValue(wrapper)
    expect(source!.when).toBeInstanceOf(CalendarDate)
    expect(clone).not.toBe(source)
    expect(clone!.label).toBe('fresh')
    expect(clone!.when).toBeInstanceOf(CalendarDate)
    expect(clone!.when.toString()).toBe('2021-01-02')
  })
})
