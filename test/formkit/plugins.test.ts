import type { FormKitExtendableSchemaRoot } from '@formkit/core'
import { createNode } from '@formkit/core'
import { describe, expect, it } from 'vitest'
import * as plugins from '../../src/runtime/formkit/plugins'

describe('plugins module', () => {
  // Guards against a plugin being exported but never wired into
  // createNuxtUiFormkitConfig() (the dead `addNuxtLabelPlugin` case).
  // `createAutosavePlugin` is the one deliberate exception: a per-form opt-in
  // that consumers pass to `<FormKit :plugins>`, never global config.
  it('exports only plugins that createNuxtUiFormkitConfig() can wire', () => {
    expect(Object.keys(plugins).sort()).toEqual(['addNuxtAsteriskPlugin', 'createMultiStepPlugin'])
  })
})

// Node-level rather than a mounted DOM test: a mounted FormKit inside the
// shared Nuxt test app intermittently lost its `validation` handling under a
// loaded full-suite run, which made a DOM assertion flaky for reasons
// unrelated to this plugin.
describe('addNuxtAsteriskPlugin', () => {
  function labelSectionFor(type: string, family: string) {
    let received: Record<string, unknown> | undefined
    const original: FormKitExtendableSchemaRoot = (sections = {}) => {
      received = sections
      return []
    }
    const node = createNode({
      type: 'input',
      props: { type, family, definition: { type: 'input', schema: original } },
      plugins: [plugins.addNuxtAsteriskPlugin],
    })
    ;(node.props.definition!.schema as FormKitExtendableSchemaRoot)({})
    return received?.label as { children: unknown[] } | undefined
  }

  it('wraps a nuxtUI input schema so its label shows an asterisk when required', () => {
    const label = labelSectionFor('nuxtUIInput', 'NuxtUIInput')

    expect(label).toBeDefined()
    expect(label!.children[0]).toBe('$label')
    expect(label!.children[1]).toMatchObject({
      $el: 'span',
      if: '$state.required',
      attrs: { class: 'text-error nuxt-ui-formkit--asterisk' },
    })
  })

  it('leaves nuxtUI output definitions untouched', () => {
    expect(labelSectionFor('nuxtUIOutputText', 'NuxtUIOutput')).toBeUndefined()
  })

  it('leaves non-nuxtUI inputs untouched', () => {
    expect(labelSectionFor('text', 'text')).toBeUndefined()
  })
})
