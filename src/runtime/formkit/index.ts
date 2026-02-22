import type { FormKitBaseSlots, FormKitInputs } from '@formkit/inputs'
import type {
  CheckboxSlots,
  CheckboxGroupSlots,
  RadioGroupSlots,
  InputSlots,
  TextareaSlots,
  SelectSlots,
  SelectMenuSlots,
  InputDateSlots,
  InputMenuSlots,
  InputNumberSlots,
  InputTagsSlots,
  InputTimeSlots,
  SwitchSlots,
} from '@nuxt/ui'

// Re-export all definitions for external use
export * from './definitions'
export * from './plugins'

/**
 * Keeps all slots from 1st argument, add any slots from 2nd type which do not collide with the 1st's names.
 */
type MergeSlots<A, B> = A & Omit<B, keyof A>

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

  interface FormKitInputSlots<Props extends FormKitInputs<Props>> {
    nuxtUICheckbox: MergeSlots<FormKitBaseSlots<Props>, CheckboxSlots>
    nuxtUICheckboxGroup: MergeSlots<FormKitBaseSlots<Props>, CheckboxGroupSlots>
    nuxtUIInput: MergeSlots<FormKitBaseSlots<Props>, InputSlots>
    nuxtUIInputDate: MergeSlots<FormKitBaseSlots<Props>, InputDateSlots>
    nuxtUIInputMenu: MergeSlots<FormKitBaseSlots<Props>, InputMenuSlots>
    nuxtUIInputNumber: MergeSlots<FormKitBaseSlots<Props>, InputNumberSlots>
    nuxtUIInputTags: MergeSlots<FormKitBaseSlots<Props>, InputTagsSlots>
    nuxtUIInputTime: MergeSlots<FormKitBaseSlots<Props>, InputTimeSlots>
    nuxtUIRadioGroup: MergeSlots<FormKitBaseSlots<Props>, RadioGroupSlots>
    nuxtUISelect: MergeSlots<FormKitBaseSlots<Props>, SelectSlots>
    nuxtUISelectMenu: MergeSlots<FormKitBaseSlots<Props>, SelectMenuSlots>
    nuxtUISwitch: MergeSlots<FormKitBaseSlots<Props>, SwitchSlots>
    nuxtUITextarea: MergeSlots<FormKitBaseSlots<Props>, TextareaSlots>
  }
}
