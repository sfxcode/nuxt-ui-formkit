import { defaultConfig, FormKit, plugin, useFormKitContextById } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, onUnmounted } from 'vue'
import { createNode, getNode } from '@formkit/core'
import { createValidationPlugin } from '@formkit/validation'
import { z } from 'zod'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { attachStandardSchema } from '../../src/runtime/composables/useFormKitStandardSchema'
import { settleAndWait } from '../support/settle'

const EMAIL_ERROR = 'Invalid email address'
const USERNAME_ERROR = 'Too small: expected string to have >=3 characters'

// Same reuse-of-id concern as useFormKitForm.nuxt.test.ts - every test shares
// the `test-form` id in FormKit's global registry and the live DOM.
let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined

afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function mountHost(schema: StandardSchemaV1, onSubmit?: () => void) {
  const HostComponent = defineComponent({
    setup() {
      let detach: (() => void) | undefined
      useFormKitContextById('test-form', (context) => {
        detach = attachStandardSchema(context.node, schema)
      })
      onUnmounted(() => detach?.())

      return () => h(FormKit, { type: 'form', id: 'test-form', onSubmit }, {
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

describe('attachStandardSchema', () => {
  it('respects validationVisibility, and diff-clears only the resolved address', async () => {
    const schema = z.object({
      email: z.email(),
      username: z.string().min(3),
    })

    const wrapper = await mountHost(schema)
    activeWrapper = wrapper
    await settleAndWait()

    // Both fields are invalid, but neither has been blurred/dirtied yet -
    // `type: 'validation'` messages stay hidden until then, same as native
    // rule failures (default `validationVisibility` is `blur`).
    expect(wrapper.text()).not.toContain(EMAIL_ERROR)
    expect(wrapper.text()).not.toContain(USERNAME_ERROR)

    const inputs = wrapper.findAll('input')
    await inputs[0]!.trigger('blur')
    await settleAndWait()

    expect(wrapper.text()).toContain(EMAIL_ERROR)
    expect(wrapper.text()).not.toContain(USERNAME_ERROR)

    // Fix the email field; username is still invalid.
    await inputs[0]!.setValue('ada@example.com')
    await settleAndWait()

    expect(wrapper.text()).not.toContain(EMAIL_ERROR)

    // Blurring username now proves its error survived the previous run's
    // clear - the diff only cleared the resolved `email` address, not
    // every address, so username's still-failing error is still there.
    await inputs[1]!.trigger('blur')
    await settleAndWait()

    expect(wrapper.text()).toContain(USERNAME_ERROR)
    expect(wrapper.text()).not.toContain(EMAIL_ERROR)
  })

  // A hand-rolled Standard Schema lets a test control issue paths and timing.
  function customSchema(validate: (value: unknown) => StandardSchemaV1.Result<unknown> | Promise<StandardSchemaV1.Result<unknown>>): StandardSchemaV1 {
    return { '~standard': { version: 1, vendor: 'test', validate } }
  }

  it('does not let an issue at an unresolvable address slip through: it blocks the form via a root message', async () => {
    // `ghost` is not a rendered field, so its address can never resolve to a node.
    const schema = customSchema(() => ({ issues: [{ message: 'Ghost is required', path: ['ghost'] }] }))
    const wrapper = await mountHost(schema)
    activeWrapper = wrapper
    await settleAndWait()

    const form = getNode('test-form')!
    expect(form.context?.state.valid).toBe(false)
    const messages = Object.values(form.store).filter(message => message.type === 'validation').map(message => String(message.value))
    expect(messages.join(' ')).toContain('Ghost is required')
  })

  it('makes a real submit wait for an async schema instead of racing it', async () => {
    const onSubmit = vi.fn()
    const schema = customSchema(async () => {
      await new Promise(resolve => setTimeout(resolve, 150))
      return { issues: [{ message: 'Rejected by async check', path: ['email'] }] }
    })
    const wrapper = await mountHost(schema, onSubmit)
    activeWrapper = wrapper
    await settleAndWait()

    // Submit while the (slow) first validation may still be settling, and again
    // right after a change that kicks off a fresh run.
    await wrapper.findAll('input')[0]!.setValue('ada@example.com')
    await wrapper.find('form').trigger('submit')
    await new Promise(resolve => setTimeout(resolve, 400))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not re-apply messages from a validation that was still in flight when the schema was detached', async () => {
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const schema = customSchema(async () => {
      await gate
      return { issues: [{ message: 'Late issue', path: [] }] }
    })

    // The host mounts with a benign schema; the gated one is attached and
    // detached by hand so only that attachment is under test.
    const wrapper = await mountHost(customSchema(() => ({ issues: [] })))
    activeWrapper = wrapper
    await settleAndWait()

    const form = getNode('test-form')!
    const detach = attachStandardSchema(form, schema)
    detach()
    release()
    await settleAndWait()

    const lateMessages = Object.values(form.store).filter(message => String(message.value).includes('Late issue'))
    expect(lateMessages).toEqual([])
    expect(form.store.validating).toBeUndefined()
  })

  it('surfaces a throwing schema as a blocking root message instead of an unhandled rejection', async () => {
    const unhandled = vi.fn()
    process.on('unhandledRejection', unhandled)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const schema = customSchema(() => {
      throw new Error('schema blew up')
    })

    const wrapper = await mountHost(schema)
    activeWrapper = wrapper
    await settleAndWait()

    const form = getNode('test-form')!
    expect(form.context?.state.valid).toBe(false)
    expect(Object.values(form.store).map(message => String(message.value)).join(' ')).toContain('schema blew up')
    expect(unhandled).not.toHaveBeenCalled()
    process.off('unhandledRejection', unhandled)
    consoleError.mockRestore()
  })
})

// FormKit's own rule validation and this bridge both signal "still running" with
// the one `validating` message on the node (submit waits on a ledger counter
// keyed to it), so a root node that has its own async rule shares the slot. Each
// side finishing must not hide the other still running.
describe('attachStandardSchema alongside the node\'s own async validation rule', () => {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  function rootWithRule(ruleMs: number) {
    return createNode({
      type: 'group',
      name: 'form',
      // A non-empty value: FormKit skips a rule for an empty one, so it would finish instantly.
      value: { filled: true },
      props: { validation: 'slow' },
      plugins: [createValidationPlugin({ slow: async () => {
        await wait(ruleMs)
        return true
      } })],
    })
  }

  function schemaTakingMs(ms: number): StandardSchemaV1 {
    return { '~standard': { version: 1, vendor: 'test', validate: async () => {
      await wait(ms)
      return { value: {} }
    } } }
  }

  it('keeps the form validating while the schema is still running after the rule finishes', async () => {
    const node = rootWithRule(20)
    const detach = attachStandardSchema(node, schemaTakingMs(250))

    await wait(120)
    expect(node.store.validating).toBeDefined()

    await wait(300)
    expect(node.store.validating).toBeUndefined()
    detach()
  })

  it('keeps the form validating while the rule is still running after the schema finishes', async () => {
    const node = rootWithRule(250)
    const detach = attachStandardSchema(node, schemaTakingMs(20))

    await wait(120)
    expect(node.store.validating).toBeDefined()

    await wait(300)
    expect(node.store.validating).toBeUndefined()
    detach()
  })
})
