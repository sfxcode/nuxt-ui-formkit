import { defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { DOMWrapper, flushPromises } from '@vue/test-utils'
import UApp from '@nuxt/ui/components/App.vue'
import * as v from 'valibot'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { useFormKitOverlay } from '../../src/runtime/composables/useFormKitOverlay'
import { nuxtUIInputDefinition } from '../../src/runtime/formkit/definitions/input'

function wait(ms: number = 30) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function settle() {
  await flushPromises()
  await nextTick()
  await wait()
}

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

describe('useFormKitOverlay', () => {
  it('opens with the given data/schema/title, and resolves with the saved data on Save', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person' })
    await settle()

    expect(body().text()).toContain('Edit Person')
    const input = body().find('input')
    expect((input.element as HTMLInputElement).value).toBe('Ada')

    await input.setValue('Ada Lovelace')
    await body().find('button[type="submit"]').trigger('click')
    await settle()

    await expect(resultPromise).resolves.toEqual({ name: 'Ada Lovelace' })
  })

  it('does not collide across sequential edit() calls, each getting a fresh FormKit id', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)

    const firstResult = overlay.edit({ data: { name: 'Ada' }, schema, title: 'First' })
    await settle()
    await body().find('button[type="submit"]').trigger('click')
    await settle()
    await expect(firstResult).resolves.toEqual({ name: 'Ada' })

    const secondResult = overlay.edit({ data: { name: 'Bob' }, schema, title: 'Second' })
    await settle()

    expect(body().text()).toContain('Second')
    const input = body().find('input')
    expect((input.element as HTMLInputElement).value).toBe('Bob')

    await input.setValue('Bob Smith')
    await body().find('button[type="submit"]').trigger('click')
    await settle()

    await expect(secondResult).resolves.toEqual({ name: 'Bob Smith' })
  })

  it('renders a USlideover instead of a UModal when as: "slideover" is given, with the same save/resolve behavior', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person', as: 'slideover' })
    await settle()

    // `USlideover`'s `DialogContent` sets a `data-side` attribute (default
    // `"right"`) that `UModal`'s does not - a reliable DOM-level signal that
    // the slideover branch, not the modal branch, actually rendered.
    const content = body().find('[data-slot="content"]')
    expect(content.attributes('data-side')).toBe('right')
    expect(body().text()).toContain('Edit Person')

    const input = body().find('input')
    await input.setValue('Ada Lovelace')
    await body().find('button[type="submit"]').trigger('click')
    await settle()

    await expect(resultPromise).resolves.toEqual({ name: 'Ada Lovelace' })
  })

  it('resolves to null when the explicit Cancel button is clicked', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person' })
    await settle()

    await body().find('button[type="button"]').trigger('click')
    await settle()

    expect(await racedResult(resultPromise)).toEqual({ resolved: true, value: null })
  })

  it('resolves to null when dismissed via Escape', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person' })
    await settle()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await settle()

    expect(await racedResult(resultPromise)).toEqual({ resolved: true, value: null })
  })

  it('resolves to null when dismissed via a backdrop click', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person' })
    await settle()

    await body().find('[data-slot="overlay"]').trigger('pointerdown')
    await settle()

    expect(await racedResult(resultPromise)).toEqual({ resolved: true, value: null })
  })

  it('resolves to null when the Cancel button is clicked on a slideover', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.edit({ data: { name: 'Ada' }, schema, title: 'Edit Person', as: 'slideover' })
    await settle()

    await body().find('button[type="button"]').trigger('click')
    await settle()

    expect(await racedResult(resultPromise)).toEqual({ resolved: true, value: null })
  })

  // `useOverlay.create()` registers exactly one fixed-id overlay entry per
  // component - calling `.open()` again before the first resolves reuses
  // that same entry (see `useOverlay.js`'s `open()`: it overwrites
  // `overlay.resolvePromise` on every call). The overview's own "explicitly
  // out of scope" section flags stacking/nested overlays as untested; this
  // documents, rather than assumes, what actually happens for the narrower
  // case of calling `edit()` twice without awaiting the first - a caller
  // mistake, not a supported nested-overlay UI pattern.
  it('documents what happens when a second edit() is called before the first resolves: the first promise never settles, the second takes over the single overlay instance', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)

    const firstResult = overlay.edit({ data: { name: 'Ada' }, schema, title: 'First' })
    await settle()
    const secondResult = overlay.edit({ data: { name: 'Bob' }, schema, title: 'Second' })
    await settle()

    // The single registered overlay entry now shows the second call's data -
    // the first call's own open state was overwritten, not stacked alongside it.
    expect(body().text()).toContain('Second')
    expect(body().text()).not.toContain('First')

    await body().find('button[type="submit"]').trigger('click')
    await settle()

    expect(await racedResult(secondResult)).toEqual({ resolved: true, value: { name: 'Bob' } })
    expect(await racedResult(firstResult)).toEqual({ resolved: false, value: undefined })
  })
})

describe('useFormKitOverlay - auto()', () => {
  it('infers a schema from plain data, and resolves with the saved data on Save', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.auto({ data: { name: 'Ada', role: 'Engineer' }, title: 'Edit Person' })
    await settle()

    expect(body().text()).toContain('Edit Person')
    const inputs = body().findAll('input')
    expect((inputs[0]!.element as HTMLInputElement).value).toBe('Ada')
    expect((inputs[1]!.element as HTMLInputElement).value).toBe('Engineer')

    await inputs[0]!.setValue('Ada Lovelace')
    await body().find('button[type="submit"]').trigger('click')
    await settle()

    await expect(resultPromise).resolves.toEqual({ name: 'Ada Lovelace', role: 'Engineer' })
  })

  // Mirrors FUAutoForm's own mount-test discipline (test/components/FUAutoForm.nuxt.test.ts)
  // of proving real FormKit validation actually rejects bad input for a
  // valibot-derived schema, not just that inference produces the
  // right-looking shape.
  it('infers a schema from a valibot schema, with real FormKit validation derived from it', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    overlay.auto({
      data: { email: '' },
      valibotSchema: v.object({ email: v.pipe(v.string(), v.email()) }),
      overrides: { email: { validationVisibility: 'live' } },
      title: 'Edit Email',
    })
    await settle()

    await body().find('input').setValue('not-an-email')
    await settle()

    expect(body().text()).toContain('valid email')
  })

  it('resolves to null when the explicit Cancel button is clicked', async () => {
    const wrapper = await mountHost()
    activeWrapper = wrapper
    await settle()

    const overlay = exposedOverlay(wrapper)
    const resultPromise = overlay.auto({ data: { name: 'Ada' }, title: 'Edit Person' })
    await settle()

    await body().find('button[type="button"]').trigger('click')
    await settle()

    expect(await racedResult(resultPromise)).toEqual({ resolved: true, value: null })
  })
})
