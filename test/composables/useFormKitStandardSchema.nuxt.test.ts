import { defaultConfig, FormKit, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, onUnmounted } from 'vue'
import { z } from 'zod'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { attachStandardSchema } from '../../src/runtime/composables/useFormKitStandardSchema'

const EMAIL_ERROR = 'Invalid email address'
const USERNAME_ERROR = 'Too small: expected string to have >=3 characters'

// Same reuse-of-id concern as useFormKitForm.nuxt.test.ts - every test shares
// the `test-form` id in FormKit's global registry and the live DOM.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function mountHost(schema: z.ZodType) {
  const HostComponent = defineComponent({
    setup() {
      let detach: (() => void) | undefined
      useFormKitContextById('test-form', (context) => {
        detach = attachStandardSchema(context.node, schema)
      })
      onUnmounted(() => detach?.())

      return () => h(FormKit, { type: 'form', id: 'test-form' }, {
        default: () => [
          h(FormKit, { type: 'nuxtUIInput', name: 'email', label: 'Email', value: 'bad' }),
          h(FormKit, { type: 'nuxtUIInput', name: 'username', label: 'Username', value: 'ab' }),
        ],
      })
    },
  })

  return mountSuspended(HostComponent, {
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition },
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

describe('attachStandardSchema', () => {
  it('respects validationVisibility, and diff-clears only the resolved address', async () => {
    const schema = z.object({
      email: z.email(),
      username: z.string().min(3),
    })

    const wrapper = await mountHost(schema)
    activeWrapper = wrapper
    await settle()

    // Both fields are invalid, but neither has been blurred/dirtied yet -
    // `type: 'validation'` messages stay hidden until then, same as native
    // rule failures (default `validationVisibility` is `blur`).
    expect(wrapper.text()).not.toContain(EMAIL_ERROR)
    expect(wrapper.text()).not.toContain(USERNAME_ERROR)

    const inputs = wrapper.findAll('input')
    await inputs[0]!.trigger('blur')
    await settle()

    expect(wrapper.text()).toContain(EMAIL_ERROR)
    expect(wrapper.text()).not.toContain(USERNAME_ERROR)

    // Fix the email field; username is still invalid.
    await inputs[0]!.setValue('ada@example.com')
    await settle()

    expect(wrapper.text()).not.toContain(EMAIL_ERROR)

    // Blurring username now proves its error survived the previous run's
    // clear - the diff only cleared the resolved `email` address, not
    // every address, so username's still-failing error is still there.
    await inputs[1]!.trigger('blur')
    await settle()

    expect(wrapper.text()).toContain(USERNAME_ERROR)
    expect(wrapper.text()).not.toContain(EMAIL_ERROR)
  })
})
