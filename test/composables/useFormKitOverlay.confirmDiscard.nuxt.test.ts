import { getNode } from '@formkit/core'
import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DOMWrapper } from '@vue/test-utils'
import UApp from '@nuxt/ui/components/App.vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { useFormKitOverlay } from '../../src/runtime/composables/useFormKitOverlay'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'
import { wait } from '../support/wait'
import { settle } from '../support/settle'

// A hung `edit()` promise (dismissal that never resolves) would otherwise
// hang the whole test rather than fail a normal assertion - racing against a
// timeout turns that into a real, visible failure.
//
// The default is generous because a dismissed overlay normally resolves well
// inside it and waiting for that is the point. The explicit `150` below is the
// opposite: an absence-over-a-window check ("did NOT resolve"), which has no
// positive signal to wait on, so a short fixed window is the honest form.
function racedResult(promise: Promise<unknown>, ms: number = 2000) {
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

// The overlay's own form is the one `<form>` in the body; its element id is the
// FormKit node id, so dirtiness (which has no DOM marker) is read off the node.
const overlayForm = () => document.body.querySelector('form')
const formDirty = () => getNode(overlayForm()!.id)?.context?.state.dirty

// Waits until the overlay's form is rendered and its node has settled - the
// deterministic stand-in for sleeping after `edit()`/`auto()`.
async function overlayReady() {
  await vi.waitFor(() => expect(overlayForm()).not.toBeNull())
  await getNode(overlayForm()!.id)!.settled
  await settle()
}

async function openEdit(options: { confirmDiscard?: boolean, as?: 'modal' | 'slideover' } = {}) {
  const wrapper = await mountHost()
  activeWrapper = wrapper
  await settle()
  const resultPromise = exposedOverlay(wrapper).edit({ data: { name: 'Ada' }, schema, title: 'Edit Person', ...options })
  await overlayReady()
  // Wrapped: returning the bare promise from an async fn would make callers
  // await the overlay's own (still pending) result.
  return { resultPromise }
}

// Clicking Cancel/Escape before FormKit has registered the edit would take the
// clean path and close the overlay, so wait for the form to actually be dirty.
async function makeDirty() {
  await body().find('input').setValue('Ada Lovelace')
  await vi.waitFor(() => expect(formDirty()).toBe(true))
}

const pressEscape = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

describe('useFormKitOverlay confirmDiscard', () => {
  it('closes immediately on Cancel when the form is clean', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })

    await buttonByLabel('Cancel')!.trigger('click')

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('asks before discarding on Cancel, and Keep editing leaves the overlay open', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)

    await body().find('[data-testid="discard-keep"]').trigger('click')

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(false))
    expect(body().text()).toContain('Edit Person')
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('resolves null once Discard is confirmed', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')
    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    await body().find('[data-testid="discard-confirm"]').trigger('click')

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('asks instead of closing on Escape when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    pressEscape()

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('asks instead of closing on a backdrop click when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('[data-slot="overlay"]').trigger('pointerdown')

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('asks instead of closing on the header close button when dirty', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('[data-slot="close"]').trigger('click')

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('does not prompt when an edit is reverted to its original value', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()
    await body().find('input').setValue('Ada')
    await vi.waitFor(() => expect(formDirty()).toBe(false))

    pressEscape()

    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })

  it('still resolves the saved data on Save', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true })
    await makeDirty()

    await body().find('button[type="submit"]').trigger('click')

    expect(await racedResult(result)).toEqual({ resolved: true, value: { name: 'Ada Lovelace' } })
  })

  it('guards a slideover the same way', async () => {
    const { resultPromise: result } = await openEdit({ confirmDiscard: true, as: 'slideover' })
    await makeDirty()

    await buttonByLabel('Cancel')!.trigger('click')

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)
  })

  it('never prompts without confirmDiscard, even when dirty (default unchanged)', async () => {
    const { resultPromise: result } = await openEdit()
    await makeDirty()

    pressEscape()

    // Closed without asking: resolved first (the positive signal), then no prompt.
    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
    expect(confirmPrompt().exists()).toBe(false)
  })

  it('guards auto() overlays too (dirty-behavior is forwarded through FUAutoForm)', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()
    const result = exposedOverlay(wrapper).auto({ data: { name: 'Ada' }, title: 'Auto', confirmDiscard: true })
    await overlayReady()
    await makeDirty()

    pressEscape()

    await vi.waitFor(() => expect(confirmPrompt().exists()).toBe(true))
    expect((await racedResult(result, 150)).resolved).toBe(false)

    await body().find('[data-testid="discard-confirm"]').trigger('click')
    expect(await racedResult(result)).toEqual({ resolved: true, value: null })
  })
})
