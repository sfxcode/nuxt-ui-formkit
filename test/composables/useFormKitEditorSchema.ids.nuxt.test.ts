import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { useFormKitEditorSchema } from '../../src/runtime/composables/useFormKitEditorSchema'

// The schema's field ids carry a counter. It must restart for every app: a server renders each
// request in a fresh app, and a counter that lived in the module kept growing across requests,
// so a page's ids (and its HTML) depended on how many requests came before it and never matched
// the browser's, which counts from 1 (a hydration mismatch). Within one app the ids must stay
// unique - that is what the counter is for.
function collectIds(node: unknown, found: string[] = []): string[] {
  if (Array.isArray(node)) {
    node.forEach(item => collectIds(item, found))
  }
  else if (node && typeof node === 'object') {
    const { id } = node as { id?: unknown }
    if (typeof id === 'string' && /^(?:_dollar_formkit|section)_\d+$/.test(id))
      found.push(id)
    Object.values(node).forEach(value => collectIds(value, found))
  }
  return found
}

function mountProbe(calls = 1) {
  const captured: string[][] = []
  const Probe = defineComponent({
    setup() {
      for (let index = 0; index < calls; index++)
        captured.push(collectIds(useFormKitEditorSchema().editorSchema()))
      return () => h('i')
    },
  })
  return mountSuspended(Probe).then(wrapper => ({ wrapper, captured }))
}

describe('useFormKitEditorSchema ids', () => {
  it('restart from 1 in every app', async () => {
    const first = await mountProbe()
    first.wrapper.unmount()
    const second = await mountProbe()
    second.wrapper.unmount()
    const third = await mountProbe()
    third.wrapper.unmount()

    expect(first.captured[0]).toEqual(['_dollar_formkit_1', 'section_1'])
    expect(second.captured[0]).toEqual(first.captured[0])
    expect(third.captured[0]).toEqual(first.captured[0])
  })

  it('stay unique between calls in the same app', async () => {
    const { wrapper, captured } = await mountProbe(3)
    wrapper.unmount()

    expect(captured.map(ids => ids[0])).toEqual(['_dollar_formkit_1', '_dollar_formkit_2', '_dollar_formkit_3'])
    expect(new Set(captured.flat()).size).toBe(6)
  })
})
