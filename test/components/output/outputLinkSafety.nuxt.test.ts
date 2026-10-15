import { defaultConfig, FormKit, plugin } from '@formkit/vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { nuxtUIOutputLinkDefinition, nuxtUIOutputTextDefinition } from '../../../src/runtime/formkit/definitions/output'
import { settle } from '../../support/settle'

let activeWrapper: Awaited<ReturnType<typeof mountSuspended>> | undefined
afterEach(() => {
  activeWrapper?.unmount()
  activeWrapper = undefined
})

async function mountOutput(type: 'nuxtUIOutputLink' | 'nuxtUIOutputText', modelValue: unknown, extra: Record<string, unknown> = {}) {
  const wrapper = await mountSuspended(FormKit, {
    props: { type, id: 'output-safety-test', modelValue, ...extra } as Record<string, unknown>,
    global: {
      plugins: [[plugin, defaultConfig({ inputs: { nuxtUIOutputLink: nuxtUIOutputLinkDefinition, nuxtUIOutputText: nuxtUIOutputTextDefinition } })]],
    },
  })
  activeWrapper = wrapper
  await settle()
  return wrapper
}

// A value coming from data must never become a live `javascript:` link, and a
// non-string value must not crash the render.
describe('FUOutputLink safety', () => {
  it('renders an unsafe scheme as plain text, not a link', async () => {
    const wrapper = await mountOutput('nuxtUIOutputLink', 'javascript:alert(1)')

    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.html()).not.toMatch(/href="javascript:/i)
    expect(wrapper.text()).toContain('javascript:alert(1)')
  })

  it('still renders https as an external link with noopener', async () => {
    const wrapper = await mountOutput('nuxtUIOutputLink', 'https://example.com')

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('rel')).toContain('noopener')
  })

  it('keeps noopener noreferrer on a _blank link when a custom rel is given', async () => {
    const wrapper = await mountOutput('nuxtUIOutputLink', 'https://example.com', { rel: 'nofollow' })

    const rel = wrapper.find('a').attributes('rel') ?? ''
    expect(rel).toContain('nofollow')
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
  })

  it('does not throw on a numeric value', async () => {
    const wrapper = await mountOutput('nuxtUIOutputLink', 12345)

    expect(wrapper.text()).toContain('12345')
  })

  it('applies the container styling once, not again on the inner link', async () => {
    const wrapper = await mountOutput('nuxtUIOutputLink', 'https://example.com', { color: 'info', ui: { root: 'distinctive-root-class' } })

    expect(wrapper.findAll('.distinctive-root-class')).toHaveLength(1)
  })
})

describe('FUOutputText url/email/tel safety', () => {
  it('renders an unsafe url value as plain text', async () => {
    const wrapper = await mountOutput('nuxtUIOutputText', 'javascript:alert(1)', { outputType: 'url' })

    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.text()).toContain('javascript:alert(1)')
  })

  it('still links a safe url, email and tel', async () => {
    expect((await mountOutput('nuxtUIOutputText', 'https://example.com', { outputType: 'url' })).find('a').attributes('href')).toBe('https://example.com')
    activeWrapper?.unmount()
    expect((await mountOutput('nuxtUIOutputText', 'ada@example.com', { outputType: 'email' })).find('a').attributes('href')).toBe('mailto:ada@example.com')
    activeWrapper?.unmount()
    expect((await mountOutput('nuxtUIOutputText', '+4912345', { outputType: 'tel' })).find('a').attributes('href')).toBe('tel:+4912345')
  })

  it('does not throw on a numeric value for a link type', async () => {
    const wrapper = await mountOutput('nuxtUIOutputText', 4711, { outputType: 'tel' })

    expect(wrapper.text()).toContain('4711')
  })

  it('does not emit "color: undefined" for an unconvertible color value', async () => {
    const wrapper = await mountOutput('nuxtUIOutputText', 'not-a-color', { outputType: 'color' })

    expect(wrapper.html()).not.toContain('undefined')
  })
})
