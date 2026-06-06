<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from '@codemirror/state'

const props = defineProps<{
  modelValue: string
  label?: string
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorContainer = ref<HTMLElement>()
const colorMode = useColorMode()

let editorView: EditorView | null = null

// Create editor when component mounts
onMounted(() => {
  if (!editorContainer.value) return

  const startState = EditorState.create({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      json(),
      EditorView.theme({
        '&': {
          fontSize: '13px',
          border: '1px solid var(--ui-border-color, rgb(229 231 235))',
          borderRadius: '0.375rem',
          overflow: 'hidden',
        },
        '.cm-content': {
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, monospace',
          padding: '0.75rem',
        },
        '.cm-scroller': {
          overflow: 'auto',
          maxHeight: '500px',
        },
        '.cm-gutters': {
          backgroundColor: 'var(--ui-bg-muted, rgb(249 250 251))',
          borderRight: '1px solid var(--ui-border-color, rgb(229 231 235))',
        },
      }),
      colorMode.value === 'dark' ? oneDark : [],
      EditorView.updateListener.of((update) => {
        if (update.docChanged && !props.readonly) {
          emit('update:modelValue', update.state.doc.toString())
        }
      }),
      EditorView.editable.of(!props.readonly),
    ],
  })

  editorView = new EditorView({
    state: startState,
    parent: editorContainer.value,
  })
})

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  if (editorView && editorView.state.doc.toString() !== newValue) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newValue,
      },
    })
  }
})

// Watch for color mode changes
watch(() => colorMode.value, () => {
  if (editorView) {
    editorView.destroy()
    // Recreate editor with new theme
    const startState = EditorState.create({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        json(),
        EditorView.theme({
          '&': {
            fontSize: '13px',
            border: '1px solid var(--ui-border-color, rgb(229 231 235))',
            borderRadius: '0.375rem',
            overflow: 'hidden',
          },
          '.cm-content': {
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, monospace',
            padding: '0.75rem',
          },
          '.cm-scroller': {
            overflow: 'auto',
            maxHeight: '500px',
          },
          '.cm-gutters': {
            backgroundColor: 'var(--ui-bg-muted, rgb(249 250 251))',
            borderRight: '1px solid var(--ui-border-color, rgb(229 231 235))',
          },
        }),
        colorMode.value === 'dark' ? oneDark : [],
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !props.readonly) {
            emit('update:modelValue', update.state.doc.toString())
          }
        }),
        EditorView.editable.of(!props.readonly),
      ],
    })
    editorView = new EditorView({
      state: startState,
      parent: editorContainer.value!,
    })
  }
})

// Cleanup on unmount
onBeforeUnmount(() => {
  editorView?.destroy()
})
</script>

<template>
  <div class="json-editor-wrapper">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
    </label>
    <div
      ref="editorContainer"
      class="json-editor"
    />
  </div>
</template>

<style scoped>
.json-editor-wrapper {
  width: 100%;
}

.json-editor {
  width: 100%;
}
</style>
