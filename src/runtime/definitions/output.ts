import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUOutputDate from '../components/output/FUOutputDate.vue'
import FUOutputBoolean from '../components/output/FUOutputBoolean.vue'
import FUOutputText from '../components/output/FUOutputText.vue'
import FUOutputLink from '../components/output/FUOutputLink.vue'
import FUOutputNumber from '../components/output/FUOutputNumber.vue'
import FUOutputList from '../components/output/FUOutputList.vue'

export const nuxtUIOutputTextDefinition: FormKitTypeDefinition = createInput(FUOutputText, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'outputType'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputBooleanDefinition: FormKitTypeDefinition = createInput(FUOutputBoolean, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'trueValue', 'falseValue', 'trueIcon', 'falseIcon', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputDateDefinition: FormKitTypeDefinition = createInput(FUOutputDate, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'dateStyle', 'timeStyle', 'locale', 'relative', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputLinkDefinition: FormKitTypeDefinition = createInput(FUOutputLink, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'target', 'rel', 'underline', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputNumberDefinition: FormKitTypeDefinition = createInput(FUOutputNumber, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'locale', 'formatOptions', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputListDefinition: FormKitTypeDefinition = createInput(FUOutputList, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'listType', 'separator', 'itemClass', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked'],
  family: 'NuxtUIOutput',
})
