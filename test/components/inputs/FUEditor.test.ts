import { describe, expect, it } from 'vitest'
import { nuxtUIEditorDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIInputs } from '../../../src/runtime/formkit/definitions'

describe('nuxtUIEditorDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUIEditorDefinition.family).toBe('NuxtUIInput')
  })

  it('whitelists the expected UEditor props', () => {
    expect(nuxtUIEditorDefinition.props).toEqual([
      'contentType',
      'starterKit',
      'placeholder',
      'markdown',
      'image',
      'mention',
      'editorHandlers',
      'extensions',
      'autofocus',
      'toolbar',
      'toolbarItems',
      'bubbleToolbar',
      'bubbleToolbarItems',
      'dragHandle',
      'suggestionMenu',
      'suggestionMenuItems',
      'mentionItems',
      'ui',
    ])
  })

  it('is exposed as nuxtUIEditor in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUIEditor).toBe(nuxtUIEditorDefinition)
  })
})
