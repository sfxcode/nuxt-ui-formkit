<script setup lang="ts">
import { nuxtUIInputs, nuxtUIOutputs } from '../../../src/runtime/formkit/definitions'

// Renders every registered `nuxtUI*` input and output type, derived from the same
// registry the module exports, so a type added later is covered without touching this
// page. Used by the SSR smoke test (`npm run test:e2e:ssr`, see e2e/): `?type=X` renders
// just that type (a failing type must not hide the others behind one 500), `?skip=a,b`
// leaves types out, and `?list=1` only lists the registered type names (so the test can
// find the types without rendering any of them).
const route = useRoute()
const listOnly = route.query.list === '1'
const only = typeof route.query.type === 'string' ? route.query.type : undefined
const skip = new Set(String(route.query.skip ?? '').split(',').filter(Boolean))

const registered = [...Object.keys(nuxtUIInputs), ...Object.keys(nuxtUIOutputs)]
const types = registered.filter(type => (only ? type === only : !skip.has(type)))

const options = [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]

// Just enough props for each type to render something; everything else uses its defaults.
const extras: Record<string, Record<string, unknown>> = {
  nuxtUICheckboxGroup: { options },
  nuxtUIInputMenu: { options },
  nuxtUIListbox: { options },
  nuxtUIRadioGroup: { options },
  nuxtUISelect: { options },
  nuxtUISelectMenu: { options },
  nuxtUITree: { items: [{ label: 'Node A' }, { label: 'Node B' }] },
  nuxtUIOutputBadge: { value: 'badge' },
  nuxtUIOutputBoolean: { value: true },
  nuxtUIOutputDate: { value: '2020-01-02' },
  nuxtUIOutputLink: { value: 'https://example.com' },
  nuxtUIOutputList: { value: ['one', 'two'] },
  nuxtUIOutputNumber: { value: 3 },
  nuxtUIOutputProgress: { value: 40 },
  nuxtUIOutputRating: { value: 3 },
  nuxtUIOutputText: { value: 'text' },
  nuxtUIOutputUser: { value: { name: 'Ada Lovelace' } },
}

function schemaFor(type: string) {
  const label = `${type} label`
  const name = type.replace(/^nuxtUI/, '').toLowerCase()
  // A step only exists inside a multi-step, and a repeater needs a row template.
  if (type === 'nuxtUIMultiStep' || type === 'nuxtUIStep') {
    return [{
      $formkit: 'nuxtUIMultiStep',
      name: `wizard${name}`,
      children: [{
        $formkit: 'nuxtUIStep',
        name: `step${name}`,
        label,
        children: [{ $formkit: 'nuxtUIInput', name: `inner${name}`, label: 'Inner field' }],
      }],
    }]
  }
  if (type === 'nuxtUIRepeater') {
    return [{
      $formkit: type,
      name,
      label,
      value: [{ x: '' }],
      newItem: { x: '' },
      children: [{ $formkit: 'nuxtUIInput', name: 'x', label: 'Row field' }],
    }]
  }
  return [{ $formkit: type, name, label, ...extras[type] }]
}
</script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-4">
      SSR: every registered type
    </h1>
    <p
      v-if="listOnly"
      data-registered-types
    >
      {{ registered.join(',') }}
    </p>
    <FormKit
      v-else
      type="form"
      :actions="false"
    >
      <section
        v-for="type in types"
        :key="type"
        :data-type-under-test="type"
        class="mb-6"
      >
        <FormKitSchema :schema="schemaFor(type)" />
      </section>
    </FormKit>
  </UContainer>
</template>
