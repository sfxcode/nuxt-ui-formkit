import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { nuxtUIRepeaterDefinition } from '../../../src/runtime/formkit/definitions/repeater'
import { settle } from '../../support/settle'

const repeaterProps = { insertButtonLabel: 'Add Item', alwaysDisplayInsertButton: true, hideMoveButtons: true }

const insert = async (wrapper: VueWrapper) => {
  await wrapper.findAll('button').find(button => button.text().includes('Add Item'))!.trigger('click')
  await settle()
}

// `newItem` is read from `node.context` when a row is inserted, so a change after
// mount must reach new rows. This goes through a real parent's reactivity: the
// `mountSuspended` harness's `setProps` does not update ANY prop on a mounted
// `<FormKit>` (an unrelated one, `insertButtonLabel`, stays stale too), which
// is why this was once mistaken for a repeater bug - see
// brain/notes/vitest-nuxt-test-environment-gotchas.
describe('nuxtUIRepeater newItem is read when a row is inserted', () => {
  it('uses the parent\'s current newItem after it changed post-mount', async () => {
    const newItem = ref<Record<string, unknown>>({ title: 'first' })
    const value = ref<object[]>([{ title: 'existing' }])
    const Parent = defineComponent({
      setup: () => () => h(FormKit as never, {
        'type': 'nuxtUIRepeater',
        'modelValue': value.value,
        'onUpdate:modelValue': (next: object[]) => { value.value = next },
        'newItem': newItem.value,
        ...repeaterProps,
      } as Record<string, unknown>),
    })
    const wrapper = await mountSuspended(Parent, {
      global: { plugins: [[plugin, defaultConfig({ inputs: { nuxtUIRepeater: nuxtUIRepeaterDefinition } })]] },
    })

    newItem.value = { title: 'second' }
    await nextTick()
    await settle()
    await insert(wrapper)

    expect(value.value[0]).toEqual({ title: 'second' })
  })
})
