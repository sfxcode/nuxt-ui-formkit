import type { FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'

import FUOutputDate from '../../../runtime/components/output/FUOutputDate.vue'
import FUOutputBoolean from '../../../runtime/components/output/FUOutputBoolean.vue'
import FUOutputText from '../../../runtime/components/output/FUOutputText.vue'
import FUOutputLink from '../../../runtime/components/output/FUOutputLink.vue'
import FUOutputNumber from '../../../runtime/components/output/FUOutputNumber.vue'
import FUOutputList from '../../../runtime/components/output/FUOutputList.vue'
import FUOutputProgress from '../../../runtime/components/output/FUOutputProgress.vue'
import FUOutputRating from '../../../runtime/components/output/FUOutputRating.vue'
import FUOutputUser from '../../../runtime/components/output/FUOutputUser.vue'
import FUOutputBadge from '../../../runtime/components/output/FUOutputBadge.vue'

export const nuxtUIOutputTextDefinition: FormKitTypeDefinition = createInput(FUOutputText, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'outputType', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputBooleanDefinition: FormKitTypeDefinition = createInput(FUOutputBoolean, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'trueValue', 'falseValue', 'trueIcon', 'falseIcon', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputDateDefinition: FormKitTypeDefinition = createInput(FUOutputDate, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'dateStyle', 'timeStyle', 'locale', 'relative', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputLinkDefinition: FormKitTypeDefinition = createInput(FUOutputLink, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'target', 'rel', 'underline', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputNumberDefinition: FormKitTypeDefinition = createInput(FUOutputNumber, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'locale', 'formatOptions', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputListDefinition: FormKitTypeDefinition = createInput(FUOutputList, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'listType', 'separator', 'itemClass', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputProgressDefinition: FormKitTypeDefinition = createInput(FUOutputProgress, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'max', 'status', 'orientation', 'animation', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputRatingDefinition: FormKitTypeDefinition = createInput(FUOutputRating, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'length', 'emptyIcon', 'orientation', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputUserDefinition: FormKitTypeDefinition = createInput(FUOutputUser, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'orientation', 'chip', 'ui'],
  family: 'NuxtUIOutput',
})

export const nuxtUIOutputBadgeDefinition: FormKitTypeDefinition = createInput(FUOutputBadge, {
  props: ['size', 'color', 'variant', 'icon', 'leadingIcon', 'trailingIcon', 'leading', 'trailing', 'onIconClicked', 'onLeadingIconClicked', 'onTrailingIconClicked', 'badgeIcon', 'square', 'ui'],
  family: 'NuxtUIOutput',
})
