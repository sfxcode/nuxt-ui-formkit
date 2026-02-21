import type { FormKitInputs } from '@formkit/inputs'

declare module '@formkit/inputs' {
  interface FormKitInputProps<Props extends FormKitInputs<Props>> {
    // Input Components
    nuxtUICheckbox: {
      type: 'nuxtUICheckbox'
    }
    nuxtUICheckboxGroup: {
      type: 'nuxtUICheckboxGroup'
    }
    nuxtUIColorPicker: {
      type: 'nuxtUIColorPicker'
    }
    nuxtUIInput: {
      type: 'nuxtUIInput'
    }
    nuxtUIInputDate: {
      type: 'nuxtUIInputDate'
    }
    nuxtUIInputMenu: {
      type: 'nuxtUIInputMenu'
    }
    nuxtUIInputNumber: {
      type: 'nuxtUIInputNumber'
    }
    nuxtUIInputTags: {
      type: 'nuxtUIInputTags'
    }
    nuxtUIInputTime: {
      type: 'nuxtUIInputTime'
    }
    nuxtUIPinInput: {
      type: 'nuxtUIPinInput'
    }
    nuxtUIRadioGroup: {
      type: 'nuxtUIRadioGroup'
    }
    nuxtUISelect: {
      type: 'nuxtUISelect'
    }
    nuxtUISelectMenu: {
      type: 'nuxtUISelectMenu'
    }
    nuxtUISlider: {
      type: 'nuxtUISlider'
    }
    nuxtUISwitch: {
      type: 'nuxtUISwitch'
    }
    nuxtUITextarea: {
      type: 'nuxtUITextarea'
    }
    // Output Components
    nuxtUIOutputText: {
      type: 'nuxtUIOutputText'
    }
    nuxtUIOutputBoolean: {
      type: 'nuxtUIOutputBoolean'
    }
    nuxtUIOutputDate: {
      type: 'nuxtUIOutputDate'
    }
    nuxtUIOutputLink: {
      type: 'nuxtUIOutputLink'
    }
    nuxtUIOutputNumber: {
      type: 'nuxtUIOutputNumber'
    }
    nuxtUIOutputList: {
      type: 'nuxtUIOutputList'
    }
  }
}
