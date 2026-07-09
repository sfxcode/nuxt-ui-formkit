import type { FormKitNode } from '@formkit/core'
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

// `FU*.vue` input components don't currently wire a real DOM `blur` event to
// FormKit's `context.handlers.blur` (a separate, pre-existing gap across the
// whole input library - see backlog), so a `wrapper.trigger('blur')` never
// reaches FormKit at all yet. Call `handlers.blur()` directly instead - it's
// the actual public mechanism `@formkit/vue`'s bindings expose for this
// (confirmed by reading its `bindings.ts`), so this still exercises the real
// `validationVisible` gate our bridge must respect, independent of that gap.
function mountHost(schema: z.ZodType) {
  const HostComponent = defineComponent({
    setup(_, { expose }) {
      let detach: (() => void) | undefined
      let formNode: FormKitNode | undefined
      useFormKitContextById('test-form', (context) => {
        formNode = context.node
        detach = attachStandardSchema(context.node, schema)
      })
      onUnmounted(() => detach?.())

      function blur(name: string) {
        formNode?.at(name)?.context?.handlers.blur()
      }

      expose({ blur })

      return () => h(FormKit, { type: 'form', id: 'test-form' }, {
        default: () => [
          h(FormKit, { type: 'nuxtUIInput', name: 'email', label: 'Email', value: 'bad' }),
          h(FormKit, { type: 'nuxtUIInput', name: 'username', label: 'Username', value: 'ab' }),
        ],
      })
    },
  })

  return mountSuspended(HostComponent, {
    global: {
      plugins: [[plugin, defaultConfig({
        inputs: { nuxtUIInput: nuxtUIInputDefinition },
      })]],
    },
  })
}

function blurField(wrapper: Awaited<ReturnType<typeof mountHost>>, name: string) {
  (wrapper.vm.$.exposed as unknown as { blur: (name: string) => void }).blur(name)
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

    blurField(wrapper, 'email')
    await settle()

    expect(wrapper.text()).toContain(EMAIL_ERROR)
    expect(wrapper.text()).not.toContain(USERNAME_ERROR)

    // Fix the email field; username is still invalid.
    await wrapper.find('input').setValue('ada@example.com')
    await settle()

    expect(wrapper.text()).not.toContain(EMAIL_ERROR)

    // Blurring username now proves its error survived the previous run's
    // clear - the diff only cleared the resolved `email` address, not
    // every address, so username's still-failing error is still there.
    blurField(wrapper, 'username')
    await settle()

    expect(wrapper.text()).toContain(USERNAME_ERROR)
    expect(wrapper.text()).not.toContain(EMAIL_ERROR)
  })
})
