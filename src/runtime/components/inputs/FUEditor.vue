<script setup lang='ts'>
import type { FormKitFrameworkContext } from '@formkit/core'
import type { AnyExtension } from '@tiptap/core'
import type { PropType } from 'vue'
import { useFormKitInput } from '../../utils/useFormKitInput'

export interface FormKitEditorHandler {
  canExecute: (editor: unknown, cmd?: unknown) => boolean
  execute: (editor: unknown, cmd?: unknown) => unknown
  isActive: (editor: unknown, cmd?: unknown) => boolean
  isDisabled?: (editor: unknown, cmd?: unknown) => boolean
}

export interface FormKitEditorItem {
  kind: string
  icon?: string
  label?: string
  tooltip?: Record<string, unknown>
  [key: string]: unknown
}

export interface FormKitEditorSuggestionItem extends FormKitEditorItem {
  label: string
}

export interface FormKitEditorMentionItem {
  label: string
  description?: string
  icon?: string
  avatar?: Record<string, unknown>
  disabled?: boolean
  [key: string]: unknown
}

export interface FormKitEditorProps {
  contentType?: 'json' | 'html' | 'markdown'
  starterKit?: Record<string, unknown>
  placeholder?: string | Record<string, unknown>
  markdown?: Record<string, unknown>
  image?: boolean | Record<string, unknown>
  mention?: boolean | Record<string, unknown>
  editorHandlers?: Record<string, FormKitEditorHandler>
  extensions?: AnyExtension[]
  autofocus?: boolean
  toolbar?: boolean
  toolbarItems?: FormKitEditorItem[] | FormKitEditorItem[][]
  bubbleToolbar?: boolean
  bubbleToolbarItems?: FormKitEditorItem[] | FormKitEditorItem[][]
  dragHandle?: boolean
  suggestionMenu?: boolean
  suggestionMenuItems?: FormKitEditorSuggestionItem[] | FormKitEditorSuggestionItem[][]
  mentionItems?: FormKitEditorMentionItem[]
  ui?: Record<string, unknown>
}

// Only uses extensions registered by UEditor by default (StarterKit) - no separate
// extension package required. `taskList` is excluded since UEditor does not register
// @tiptap/extension-task-list out of the box.
const DEFAULT_EDITOR_TOOLBAR_ITEMS: FormKitEditorItem[][] = [
  [
    { kind: 'undo', icon: 'i-lucide-undo', tooltip: { text: 'Undo' } },
    { kind: 'redo', icon: 'i-lucide-redo', tooltip: { text: 'Redo' } },
  ],
  [
    { kind: 'heading', level: 1, icon: 'i-lucide-heading-1', tooltip: { text: 'Heading 1' } },
    { kind: 'heading', level: 2, icon: 'i-lucide-heading-2', tooltip: { text: 'Heading 2' } },
    { kind: 'heading', level: 3, icon: 'i-lucide-heading-3', tooltip: { text: 'Heading 3' } },
  ],
  [
    { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold', tooltip: { text: 'Bold' } },
    { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic', tooltip: { text: 'Italic' } },
    { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline', tooltip: { text: 'Underline' } },
    { kind: 'mark', mark: 'strike', icon: 'i-lucide-strikethrough', tooltip: { text: 'Strikethrough' } },
    { kind: 'mark', mark: 'code', icon: 'i-lucide-code', tooltip: { text: 'Code' } },
  ],
  [
    { kind: 'bulletList', icon: 'i-lucide-list', tooltip: { text: 'Bullet List' } },
    { kind: 'orderedList', icon: 'i-lucide-list-ordered', tooltip: { text: 'Ordered List' } },
    { kind: 'blockquote', icon: 'i-lucide-quote', tooltip: { text: 'Blockquote' } },
    { kind: 'codeBlock', icon: 'i-lucide-square-code', tooltip: { text: 'Code Block' } },
    { kind: 'horizontalRule', icon: 'i-lucide-minus', tooltip: { text: 'Horizontal Rule' } },
    { kind: 'link', icon: 'i-lucide-link', tooltip: { text: 'Link' } },
  ],
]

// Shown as a floating toolbar when text is selected - marks + link only, since
// block-level formatting doesn't apply to a text selection.
const DEFAULT_BUBBLE_TOOLBAR_ITEMS: FormKitEditorItem[][] = [
  [
    { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold', tooltip: { text: 'Bold' } },
    { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic', tooltip: { text: 'Italic' } },
    { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline', tooltip: { text: 'Underline' } },
    { kind: 'mark', mark: 'strike', icon: 'i-lucide-strikethrough', tooltip: { text: 'Strikethrough' } },
    { kind: 'mark', mark: 'code', icon: 'i-lucide-code', tooltip: { text: 'Code' } },
  ],
  [
    { kind: 'link', icon: 'i-lucide-link', tooltip: { text: 'Link' } },
  ],
]

// Shown when typing '/' - inserts a block type. Mirrors the fixed toolbar's block
// kinds since they rely on the same StarterKit extensions with no extra setup.
const DEFAULT_SUGGESTION_MENU_ITEMS: FormKitEditorSuggestionItem[][] = [
  [
    { kind: 'paragraph', label: 'Paragraph', icon: 'i-lucide-type' },
    { kind: 'heading', level: 1, label: 'Heading 1', icon: 'i-lucide-heading-1' },
    { kind: 'heading', level: 2, label: 'Heading 2', icon: 'i-lucide-heading-2' },
    { kind: 'heading', level: 3, label: 'Heading 3', icon: 'i-lucide-heading-3' },
    { kind: 'bulletList', label: 'Bullet List', icon: 'i-lucide-list' },
    { kind: 'orderedList', label: 'Numbered List', icon: 'i-lucide-list-ordered' },
    { kind: 'blockquote', label: 'Blockquote', icon: 'i-lucide-text-quote' },
    { kind: 'codeBlock', label: 'Code Block', icon: 'i-lucide-square-code' },
    { kind: 'horizontalRule', label: 'Horizontal Rule', icon: 'i-lucide-separator-horizontal' },
  ],
]

function bubbleToolbarShouldShow({ view, state }: { view: { hasFocus: () => boolean }, state: { selection: { empty: boolean } } }) {
  return view.hasFocus() && !state.selection.empty
}

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext & FormKitEditorProps>,
    required: true,
  },
})

const { handleInput, styleClass, modelValue } = useFormKitInput(props.context)
</script>

<template>
  <UEditor
    :id="context.id"
    v-model="modelValue"
    v-bind="{ ...context?.attrs }"
    :class="styleClass"
    :editable="!context?.disabled"
    :style="context?.attrs.style"
    :content-type="context.contentType"
    :starter-kit="context.starterKit"
    :placeholder="context.placeholder"
    :markdown="context.markdown"
    :image="context.image"
    :mention="context.mention"
    :handlers="context.editorHandlers"
    :extensions="context.extensions"
    :autofocus="context.autofocus"
    :ui="context.ui"
    @update:model-value="handleInput"
  >
    <template #default="{ editor, handlers }">
      <UEditorToolbar
        v-if="context.toolbar !== false"
        :editor="editor"
        :items="context.toolbarItems ?? DEFAULT_EDITOR_TOOLBAR_ITEMS"
        class="border-b border-default px-2 py-1 mb-2 flex-wrap"
      />
      <UEditorToolbar
        v-if="context.bubbleToolbar !== false"
        :editor="editor"
        :items="context.bubbleToolbarItems ?? DEFAULT_BUBBLE_TOOLBAR_ITEMS"
        layout="bubble"
        :should-show="bubbleToolbarShouldShow"
      />
      <UEditorDragHandle
        v-if="context.dragHandle"
        :editor="editor"
      />
      <UEditorSuggestionMenu
        v-if="context.suggestionMenu"
        :editor="editor"
        :items="context.suggestionMenuItems ?? DEFAULT_SUGGESTION_MENU_ITEMS"
      />
      <UEditorMentionMenu
        v-if="context.mentionItems?.length"
        :editor="editor"
        :items="context.mentionItems"
      />
      <component
        :is="context.slots.default"
        v-if="context?.slots?.default"
        v-bind="{ ...context, editor, handlers }"
      />
    </template>
  </UEditor>
</template>
