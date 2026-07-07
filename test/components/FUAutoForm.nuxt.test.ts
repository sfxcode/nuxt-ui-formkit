import * as v from 'valibot'
import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import FUAutoForm from '../../src/runtime/components/FUAutoForm.vue'
import {
  nuxtUIInputDefinition,
  nuxtUIInputNumberDefinition,
  nuxtUIInputTagsDefinition,
  nuxtUISwitchDefinition,
  nuxtUITextareaDefinition,
} from '../../src/runtime/formkit/definitions/input'
import { nuxtUIRepeaterDefinition } from '../../src/runtime/formkit/definitions/repeater'

const inputs = {
  nuxtUIInput: nuxtUIInputDefinition,
  nuxtUIInputNumber: nuxtUIInputNumberDefinition,
  nuxtUIInputTags: nuxtUIInputTagsDefinition,
  nuxtUISwitch: nuxtUISwitchDefinition,
  nuxtUITextarea: nuxtUITextareaDefinition,
  nuxtUIRepeater: nuxtUIRepeaterDefinition,
}

function mountAutoForm(props: Record<string, unknown>) {
  return mountSuspended(FUAutoForm, {
    props,
    global: {
      plugins: [[plugin, defaultConfig({ inputs })]],
    },
  })
}

// FormKit debounces input commits (default delay 20ms) before the form's
// v-model emits - flushPromises alone is not enough after typing.
async function settle() {
  await new Promise(resolve => setTimeout(resolve, 50))
  await flushPromises()
}

describe('fUAutoForm', () => {
  it('renders inferred inputs for mixed data shapes', async () => {
    const wrapper = await mountAutoForm({
      data: {
        name: 'Tom',
        age: 42,
        active: true,
        tags: ['vue', 'nuxt'],
        address: { city: 'Berlin' },
        contacts: [{ email: 'tom@example.com' }],
      },
    })

    const text = wrapper.text()
    for (const label of ['Name', 'Age', 'Active', 'Tags', 'City', 'Email']) {
      expect(text).toContain(label)
    }
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
    expect(wrapper.findAll('input').length).toBeGreaterThanOrEqual(5)
    expect(wrapper.find('input').element.value).toBe('Tom')
    wrapper.unmount()
  })

  it('renders one repeater row per array element', async () => {
    const wrapper = await mountAutoForm({
      data: { contacts: [{ email: 'a@example.com' }, { email: 'b@example.com' }] },
    })

    const values = wrapper.findAll('input').map(input => input.element.value)
    expect(values).toContain('a@example.com')
    expect(values).toContain('b@example.com')
    wrapper.unmount()
  })

  it('applies overrides: type swap and field suppression', async () => {
    const wrapper = await mountAutoForm({
      data: { name: 'Tom', bio: 'short', internalId: 7 },
      overrides: {
        bio: { $formkit: 'nuxtUITextarea' },
        internalId: false,
      },
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Internal Id')
    wrapper.unmount()
  })

  it('derives live FormKit validation from a valibot schema', async () => {
    const wrapper = await mountAutoForm({
      valibotSchema: v.object({ email: v.pipe(v.string(), v.email()) }),
      overrides: { email: { validationVisibility: 'live' } },
    })
    await settle()

    await wrapper.find('input').setValue('not-an-email')
    await settle()

    expect(wrapper.text()).toContain('valid email')
    wrapper.unmount()
  })

  it('derives live FormKit validation from a zod schema', async () => {
    const wrapper = await mountAutoForm({
      zodSchema: z.object({ email: z.string().email() }),
      overrides: { email: { validationVisibility: 'live' } },
    })
    await settle()

    await wrapper.find('input').setValue('not-an-email')
    await settle()

    expect(wrapper.text()).toContain('valid email')
    wrapper.unmount()
  })

  it('updates the bound model when typing into an inferred input', async () => {
    let model: Record<string, unknown> = { name: 'Tom' }
    const wrapper = await mountAutoForm({
      'modelValue': model,
      'onUpdate:modelValue': (value: Record<string, unknown>) => {
        model = value
      },
    })
    await settle()

    await wrapper.find('input').setValue('Anna')
    await settle()

    expect(model.name).toBe('Anna')
    wrapper.unmount()
  })
})
