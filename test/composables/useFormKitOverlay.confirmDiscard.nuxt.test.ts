import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DOMWrapper } from '@vue/test-utils'
import UApp from '@nuxt/ui/components/App.vue'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { useFormKitOverlay } from '../../src/runtime/composables/useFormKitOverlay'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { wait } from '../support/wait'
import { settleAndWait } from '../support/settle'

// A hung `edit()` promise (dismissal that never resolves) would otherwise
// hang the whole test rather than fail a normal assertion - racing against a
// timeout turns that into a real, visible failure.
function racedResult(promise: Promise<unknown>, ms: number = 500) {
  return Promise.race([
    promise.then(value => ({ resolved: true as const, value })),
    wait(ms).then(() => ({ resolved: false as const, value: undefined })),
  ])
}

// `useOverlay`'s registered component only actually renders via
// `<UOverlayProvider>`, which `<UApp>` already bundles internally (confirmed
// reading its source) - same requirement discovered for `UTooltip` in the
// blur-event-wiring plan's FUEditor phase.
const Host = defineComponent({
  setup(_, { expose }) {
    const overlay = useFormKitOverlay()
    expose({ overlay })
    return () => null
  },
})

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

function mountHost() {
  const Wrapper = defineComponent({
    setup() {
      return () => h(UApp, null, { default: () => h(Host) })
    },
  })

  return mountSuspended(Wrapper, {
    attachTo: document.body,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIInput: nuxtUIInputDefinition } })]],
    },
  })
}

function exposedOverlay(wrapper: Awaited<ReturnType<typeof mountHost>>) {
  return (wrapper.findComponent(Host).vm.$.exposed as unknown as { overlay: ReturnType<typeof useFormKitOverlay> }).overlay
}

// `UModal` teleports its content to `document.body` via Reka UI's
// `DialogPortal` (confirmed empirically: it renders as a *sibling* of the
// mounted wrapper's own root, not a descendant) - `wrapper.find()`/`.text()`
// only search the wrapper's own DOM subtree and silently miss it, so every
// query against the actual modal content goes through a `DOMWrapper` over
// the whole `document.body` instead.
function body() {
  return new DOMWrapper(document.body)
}

const schema = [
  { $formkit: 'nuxtUIInput', name: 'name', label: 'Name' },
]

const buttonByLabel = (label: string) =>
  body().findAll('button').find(button => button.text() === label)

const confirmPrompt = () => body().find('[role="alertdialog"]')

async function openEdit(options: { confirmDiscard?: boolean, as?: 'modal' | 'slideover' } = {}) {
  const wrapper = await mountHost()
  activeWrapper = wrapper
  await settleAndWait()
  const resultPromise = exposedOverlay(wrapper).edit({ data: { name: 'Ada' }, schema, title: 'Edit Person', ...options })
  await settleAndWait()
  // Wrapped: returning the bare promise from an async fn would make callers
  // await the overlay's own (still pending) result.
  return { resultPromise }
}

async function makeDirty() {
  await body().find('input').setValue('Ada Lovelace')
  await settleAndWait()
}

const pressEscape = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

describe('useFormKitOverlay confirmDiscard', () => {
  it('closes immediately on Cancel when the form is clean', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })

    await buttonByLabel('Cancel')!.trigger('click')
    await settleAndWait()

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('asks before discarding on Cancel, and Keep editing leaves the overlay open', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)

    await body().find('[data-testid="discard-keep"]').trigger('click')
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(false)
    expect(body().text()).toContain('Edit Person')
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('resolves null once Discard is confirmed', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')
    await settleAndWait()
    await body().find('[data-testid="discard-confirm"]').trigger('click')
    await settleAndWait()

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('asks instead of closing on Escape when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    pressEscape()
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('asks instead of closing on a backdrop click when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('[data-slot="overlay"]').trigger('pointerdown')
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('asks instead of closing on the header close button when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('[data-slot="close"]').trigger('click')
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('does not prompt when an edit is reverted to its original value', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()
    await body().find('input').setValue('Ada')
    await settleAndWait()

    pressEscape()
    await settleAndWait()

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('still resolves the saved data on Save', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('button[type="submit"]').trigger('click')
    await settleAndWait()

    expect(await racedResult(result)).toEqual({ resolved: true, value: { name: 'Ada Lovelace' } })
  })

  it('guards a slideover the same way', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true, as: 'slideover' })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('never prompts without confirmDiscard, even when dirty (default unchanged)', async () => {
    const { resultPromise: result } = await openEdit()
    await makeDirty()

    pressEscape()
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(false)
    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('guards auto() overlays too (dirty-behavior is forwarded through FUAutoForm)', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settleAndWait()
    const result = exposedOverlay(wrapper).auto({ data: { name: 'Ada' }, title: 'Auto', confirmDiscard: true })
    await settleAndWait()
    await makeDirty()

    pressEscape()
    await settleAndWait()

    expect(confirmPrompt().exists()).toBe(true)
    expect((await racedResult(result, 150)).resolved).toBe(false)

    await body().find('[data-testid="discard-confirm"]').trigger('click')
    await settleAndWait()
    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })
})
