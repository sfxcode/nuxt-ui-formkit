import { createMultiStepPlugin } from '@formkit/addons'
import { de } from '@formkit/i18n'
import { FormKit, FormKitSchema, defaultConfig, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import { nuxtUIInputDefinition } from '../../../src/runtime/formkit/definitions/input'
import { nuxtUIMultiStepDefinition, nuxtUIStepDefinition } from '../../../src/runtime/formkit/definitions/multiStep'

// Mirrors multiStep.nuxt.test.ts's own mounting pattern.
const wizardSchema = [
  {
    $formkit: 'nuxtUIMultiStep',
    name: 'wizard',
    id: 'wizard-node',
    children: [
      {
        $formkit: 'nuxtUIStep',
        name: 'stepOne',
        label: 'Step One',
        children: [
          { $formkit: 'nuxtUIInput', name: 'firstName', label: 'First Name' },
        ],
      },
      {
        $formkit: 'nuxtUIStep',
        name: 'stepTwo',
        label: 'Step Two',
        children: [
          { $formkit: 'nuxtUIInput', name: 'lastName', label: 'Last Name' },
        ],
      },
    ],
  },
]

function mountWizardWithLocale(locale: string) {
  return mountSuspended(FormKit, {
    props: { type: 'form' },
    slots: {
      default: () => h(FormKitSchema, { schema: wizardSchema }),
    },
    global: {
      plugins: [[plugin, defaultConfig({
        locales: { de },
        locale,
        inputs: {
          nuxtUIMultiStep: nuxtUIMultiStepDefinition,
          nuxtUIStep: nuxtUIStepDefinition,
          nuxtUIInput: nuxtUIInputDefinition,
        },
        plugins: [createMultiStepPlugin()],
      })]],
    },
  })
}

describe('nuxtUIMultiStep Previous/Next i18n', () => {
  it('resolves the Next button label through FormKit i18n when a non-English locale is active, not the English default', async () => {
    const wrapper = await mountWizardWithLocale('de')
    await flushPromises()
    await nextTick()

    const buttons = wrapper.findAll('button').map(button => button.text())
    expect(buttons).toContain('Weiter')
    expect(buttons).not.toContain('Next')
  })

  it('still shows the English default when the active locale is en', async () => {
    const wrapper = await mountWizardWithLocale('en')
    await flushPromises()
    await nextTick()

    const buttons = wrapper.findAll('button').map(button => button.text())
    expect(buttons).toContain('Next')
  })
})
