import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import UApp from '@nuxt/ui/components/App.vue'
import { nuxtUIEditorDefinition } from '../../../src/runtime/formkit/definitions/input'

async function settle() {
  await flushPromises()
  await nextTick()
}

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

// `UEditor`'s toolbar needs a `TooltipProvider` context, only present inside
// a real `<UApp>` root - see brain/notes/nuxt-ui-editor-needs-uapp-wrapper.md.
function mountEditorInApp(props: Record<string, unknown>) {
  const Host = defineComponent({
    setup() {
      return () => h(UApp, null, {
        default: () => h(FormKit, {
          type: 'nuxtUIEditor',
          ...props,
        }),
      })
    },
  })

  return mountSuspended(Host, {
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIEditor: nuxtUIEditorDefinition } })]],
    },
  })
}

describe('FUEditor ui prop', () => {
  it('forwards a custom ui value onto the rendered root, unlike before this fix (context.ui collision)', async () => {
    const wrapper = await mountEditorInApp({ modelValue: '', ui: { root: 'my-distinctive-root-class' } })
    activeWrapper = wrapper
    await settle()

    const root = wrapper.find('[data-slot="root"]')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('my-distinctive-root-class')
  })
})
