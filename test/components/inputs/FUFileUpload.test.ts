import { describe, expect, it } from 'vitest'
import { nuxtUIFileUploadDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIInputs } from '../../../src/runtime/formkit/definitions'

describe('nuxtUIFileUploadDefinition', () => {
  it('is registered under the NuxtUIInput family', () => {
    expect(nuxtUIFileUploadDefinition.family).toBe('NuxtUIInput')
  })

  it('whitelists the expected UFileUpload props', () => {
    expect(nuxtUIFileUploadDefinition.props).toEqual([
      'multiple',
      'accept',
      'icon',
      'label',
      'description',
      'color',
      'variant',
      'size',
      'layout',
      'position',
      'dropzone',
      'interactive',
      'required',
      'reset',
      'fileIcon',
      'fileImage',
      'fileDelete',
      'fileDeleteIcon',
      'preview',
      'name',
      'ui',
    ])
  })

  it('is exposed as nuxtUIFileUpload in nuxtUIInputs', () => {
    expect(nuxtUIInputs.nuxtUIFileUpload).toBe(nuxtUIFileUploadDefinition)
  })
})
