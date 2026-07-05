<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const editorSchema = [
  {
    $formkit: 'nuxtUIEditor',
    id: 'editor-basic',
    name: 'body1',
    label: 'Basic Editor',
    help: 'Rich text editing with HTML output',
    value: '<p>Start typing <strong>here</strong>...</p>',
    validation: 'required',
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body2',
    label: 'Markdown Mode',
    help: 'Content is serialized as markdown instead of HTML',
    contentType: 'markdown',
    value: 'Start typing **here**...',
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body3',
    label: 'Custom Placeholder',
    help: 'Placeholder shown only on the first line',
    placeholder: {
      mode: 'firstLine',
    },
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body4',
    label: 'Autofocus',
    help: 'Automatically focused when the page loads',
    autofocus: true,
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body5',
    label: 'Disabled',
    help: 'FormKit disabled state maps to a read-only editor',
    value: '<p>This content cannot be edited.</p>',
    disabled: true,
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body6',
    label: 'No Toolbar',
    help: 'The built-in toolbar can be hidden entirely',
    value: '<p>No toolbar above this editor.</p>',
    toolbar: false,
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body7',
    label: 'Minimal Custom Toolbar',
    help: 'Override the default toolbar with a smaller, custom item set',
    value: '<p>Only undo/redo and bold/italic are available above.</p>',
    toolbarItems: [
      [
        { kind: 'undo', icon: 'i-lucide-undo', tooltip: { text: 'Undo' } },
        { kind: 'redo', icon: 'i-lucide-redo', tooltip: { text: 'Redo' } },
      ],
      [
        { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold', tooltip: { text: 'Bold' } },
        { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic', tooltip: { text: 'Italic' } },
      ],
    ],
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body8',
    label: 'Drag Handle',
    help: 'Hover the left edge of a block to see a drag handle for reordering',
    value: '<p>Hover to the left of this paragraph.</p><p>...and this one.</p>',
    dragHandle: true,
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body9',
    label: 'Slash Commands',
    help: 'Type \'/\' on an empty line to insert a block type',
    suggestionMenu: true,
  },
  {
    $formkit: 'nuxtUIEditor',
    name: 'body10',
    label: 'Mentions',
    help: 'Type \'@\' to mention someone from the list',
    mentionItems: [
      { label: 'Ada Lovelace', icon: 'i-lucide-user' },
      { label: 'Alan Turing', icon: 'i-lucide-user' },
      { label: 'Grace Hopper', icon: 'i-lucide-user' },
    ],
  },
]
</script>

<template>
  <div>
    <UContainer>
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Editor Component
        </h1>
        <p class="text-lg text-muted-foreground mb-2">
          The Editor component integrates FormKit with Nuxt UI's UEditor component, a Tiptap-based rich text editor.
        </p>
        <p class="text-muted-foreground">
          Every editor below ships with a built-in fixed toolbar and a floating bubble toolbar (select text to see it) by default. Explore basic usage, markdown mode, placeholders, autofocus, the disabled state, toolbar customization, drag handles, slash commands, and mentions below. Unlike other inputs, this component has no color, variant, or size props.
        </p>
      </div>

      <USeparator class="my-8" />

      <div class="space-y-12">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Basic Usage
          </h2>
          <p class="text-muted-foreground mb-6">
            Basic rich text editing with HTML content and validation.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(0, 1)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Markdown Mode
          </h2>
          <p class="text-muted-foreground mb-6">
            Set `contentType` to `markdown` to store the value as a markdown string instead of HTML.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(1, 2)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Placeholder
          </h2>
          <p class="text-muted-foreground mb-6">
            Configure placeholder behavior with a mode of `firstLine` or `everyLine`.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(2, 3)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Autofocus
          </h2>
          <p class="text-muted-foreground mb-6">
            Automatically focus the editor on mount.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(3, 4)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            States
          </h2>
          <p class="text-muted-foreground mb-6">
            Disabled state — FormKit's disabled state maps to Tiptap's `editable` option.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(4, 5)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Toolbar Customization
          </h2>
          <p class="text-muted-foreground mb-6">
            Hide the toolbar entirely with `toolbar: false`, or override its item groups with `toolbarItems`.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(5, 7)"
          />
        </section>

        <USeparator />

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Advanced Features
          </h2>
          <p class="text-muted-foreground mb-6">
            Opt-in block-level drag handles, a `/` slash-command menu for inserting blocks, and `@` mentions with a custom item list.
          </p>
          <FUDataEdit
            :data="{}"
            :schema="editorSchema.slice(7, 10)"
          />
        </section>
      </div>
    </UContainer>
  </div>
</template>
