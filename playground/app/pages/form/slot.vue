<script setup lang='ts'>
import { FormKit } from '@formkit/vue'
import type { ChipProps, SelectItem } from '@nuxt/ui'

const data = ref({ })

async function submitHandler() {
  console.log('Form Submitted ...', 'Form submitted successfully')
}

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'error',
    },
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success',
    },
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'info',
    },
  },
] satisfies SelectItem[])

function getChip(value: string) {
  return items.value.find(item => item.value === value)?.chip
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        FormKit Slots Usage
      </h1>
      <p class="text-lg text-muted-foreground mb-2">
        This example demonstrates how to use slots with FormKit and Nuxt UI components to customize the rendering and add additional elements.
      </p>
      <p class="text-muted-foreground mb-4">
        Slots provide a powerful way to inject custom content into FormKit components. All Nuxt UI component slots are available and merged with FormKit's base slots.
      </p>
      <div class="bg-muted p-4 rounded-lg border">
        <h3 class="font-semibold mb-2">
          About Slots
        </h3>
        <ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Use the <code class="px-1 py-0.5 bg-background rounded">#leading</code> slot to add content before the input (like icons or chips)</li>
          <li>Use the <code class="px-1 py-0.5 bg-background rounded">#trailing</code> slot to add content after the input</li>
          <li>Access <code class="px-1 py-0.5 bg-background rounded">modelValue</code>, <code class="px-1 py-0.5 bg-background rounded">ui</code>, and other props through slot scope</li>
          <li>All Nuxt UI component-specific slots (like USelect, UInput, etc.) are preserved and available</li>
          <li>FormKit base slots (label, help, messages, etc.) are also available and merged with component slots</li>
        </ul>
      </div>
    </div>

    <USeparator class="my-8" />

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">
          Leading Slot Example
        </h2>
        <p class="text-muted-foreground mb-6">
          This example shows how to use the <code class="px-1 py-0.5 bg-muted rounded">#leading</code> slot to display a colored chip based on the selected value.
          The slot receives <code class="px-1 py-0.5 bg-muted rounded">modelValue</code> and <code class="px-1 py-0.5 bg-muted rounded">ui</code> props,
          allowing you to render dynamic content that responds to the current selection.
        </p>
        <FUDataEdit
          v-if="data"
          :data="data"
          :debug-data="true"
          @data-saved="submitHandler"
        >
          <FormKit
            type="nuxtUISelect"
            name="option"
            label="Option"
            :options="items"
            class="w-46"
            placeholder="Select an option"
            validation="required"
          >
            <template #leading="{ modelValue, ui }">
              <UChip
                v-if="modelValue"
                v-bind="getChip(modelValue)"
                inset
                standalone
                :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                :class="ui.itemLeadingChip()"
              />
            </template>
          </FormKit>
        </FUDataEdit>
      </section>
    </div>
  </UContainer>
</template>

<style lang='scss' scoped>

</style>
