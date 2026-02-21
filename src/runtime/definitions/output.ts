import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUOutputDate from '../components/output/FUOutputDate.vue'
import FUOutputBoolean from '../components/output/FUOutputBoolean.vue'
import FUOutputText from '../components/output/FUOutputText.vue'
import FUOutputLink from '../components/output/FUOutputLink.vue'
import FUOutputNumber from '../components/output/FUOutputNumber.vue'

export const nuxtUIOutputTextDefinition: FormKitTypeDefinition = createInput(FUOutputText, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputBooleanDefinition: FormKitTypeDefinition = createInput(FUOutputBoolean, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'trueValue', 'falseValue', 'trueIcon', 'falseIcon', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputDateDefinition: FormKitTypeDefinition = createInput(FUOutputDate, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'dateStyle', 'timeStyle', 'locale', 'relative'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputLinkDefinition: FormKitTypeDefinition = createInput(FUOutputLink, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'target', 'rel', 'underline'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputNumberDefinition: FormKitTypeDefinition = createInput(FUOutputNumber, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'locale', 'formatOptions'],
  family: 'NuxtUIOutput',
})
