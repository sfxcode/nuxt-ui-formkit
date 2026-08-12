<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'

type SchemaNode = Record<string, unknown> & {
  $formkit?: string
  $el?: string
  name?: string
  label?: string
  legend?: string
  inputType?: string
  children?: unknown
}

interface CanvasField {
  id: string
  templateKey: string
  node: SchemaNode
}

interface FieldTemplate {
  key: string
  label: string
  icon: string
  description: string
  nameHint?: string
  build: () => SchemaNode
}

interface TemplateCategory {
  label: string
  icon: string
  items: FieldTemplate[]
}

interface FormTemplate {
  key: string
  label: string
  icon: string
  description: string
  nodes: SchemaNode[]
}

const toast = useToast()
const { addElement } = useFormKitSchema()
const { schemaToEditorData, editorDataToSchema } = useFormKitEditor()
// `false` - a canvas field's type is already fixed by whichever palette
// template created it; the structured editor here only edits its
// properties, not what kind of field it is (drag a new one in for that).
const { editorSchema } = useFormKitEditorSchema(false)
const fieldEditorSchema = editorSchema()

// ---------------------------------------------------------------------------
// Id generation
// ---------------------------------------------------------------------------
let idCounter = 0
function nextId() {
  idCounter += 1
  return `field-${idCounter}`
}

// ---------------------------------------------------------------------------
// Field template palette (drag source)
// ---------------------------------------------------------------------------
const categories: TemplateCategory[] = [
  {
    label: 'Layout',
    icon: 'i-lucide-layout-panel-top',
    items: [
      {
        key: 'heading',
        label: 'Heading',
        icon: 'i-lucide-heading-1',
        description: 'Large section title.',
        build: () => addElement('h2', 'Section Heading', { class: 'text-2xl font-bold' }) as SchemaNode,
      },
      {
        key: 'subheading',
        label: 'Subheading',
        icon: 'i-lucide-heading-2',
        description: 'Smaller section title.',
        build: () => addElement('h3', 'Subheading', { class: 'text-lg font-semibold' }) as SchemaNode,
      },
      {
        key: 'paragraph',
        label: 'Paragraph',
        icon: 'i-lucide-text',
        description: 'Descriptive helper text between fields.',
        build: () => addElement('p', 'Add descriptive text here.', { class: 'text-muted' }) as SchemaNode,
      },
      {
        key: 'divider',
        label: 'Divider',
        icon: 'i-lucide-separator-horizontal',
        description: 'Horizontal rule to separate sections.',
        build: () => addElement('hr', [], { class: 'my-4 border-default' }) as SchemaNode,
      },
    ],
  },
  {
    label: 'Basic Fields',
    icon: 'i-lucide-file-text',
    items: [
      {
        key: 'text',
        label: 'Text Input',
        icon: 'i-lucide-type',
        nameHint: 'text',
        description: 'Single-line text field.',
        build: () => ({ $formkit: 'nuxtUIInput', label: 'Text Input', placeholder: 'Enter text', validation: '' }),
      },
      {
        key: 'email',
        label: 'Email',
        icon: 'i-lucide-mail',
        nameHint: 'email',
        description: 'Email address with built-in validation.',
        build: () => ({ $formkit: 'nuxtUIInput', label: 'Email', inputType: 'email', placeholder: 'name@example.com', validation: 'required|email' }),
      },
      {
        key: 'password',
        label: 'Password',
        icon: 'i-lucide-lock',
        nameHint: 'password',
        description: 'Masked password field.',
        build: () => ({ $formkit: 'nuxtUIInput', label: 'Password', inputType: 'password', placeholder: 'Enter password', validation: 'required|length:8' }),
      },
      {
        key: 'number',
        label: 'Number',
        icon: 'i-lucide-hash',
        nameHint: 'number',
        description: 'Numeric input with increment/decrement.',
        build: () => ({ $formkit: 'nuxtUIInputNumber', label: 'Number', placeholder: '0', min: 0 }),
      },
      {
        key: 'textarea',
        label: 'Textarea',
        icon: 'i-lucide-align-left',
        nameHint: 'message',
        description: 'Multi-line text field.',
        build: () => ({ $formkit: 'nuxtUITextarea', label: 'Message', placeholder: 'Enter your message', rows: 4 }),
      },
    ],
  },
  {
    label: 'Choice',
    icon: 'i-lucide-list-checks',
    items: [
      {
        key: 'select',
        label: 'Select',
        icon: 'i-lucide-chevron-down',
        nameHint: 'select',
        description: 'Dropdown single choice.',
        build: () => ({ $formkit: 'nuxtUISelect', label: 'Select an option', placeholder: 'Choose one', items: ['Option 1', 'Option 2', 'Option 3'] }),
      },
      {
        key: 'radioGroup',
        label: 'Radio Group',
        icon: 'i-lucide-circle-dot',
        nameHint: 'radioGroup',
        description: 'Single choice from visible options.',
        build: () => ({ $formkit: 'nuxtUIRadioGroup', legend: 'Choose one', options: ['Option 1', 'Option 2', 'Option 3'] }),
      },
      {
        key: 'checkbox',
        label: 'Checkbox',
        icon: 'i-lucide-check',
        nameHint: 'checkbox',
        description: 'Single boolean toggle.',
        build: () => ({ $formkit: 'nuxtUICheckbox', label: 'I agree to the terms' }),
      },
      {
        key: 'checkboxGroup',
        label: 'Checkbox Group',
        icon: 'i-lucide-check-square',
        nameHint: 'checkboxGroup',
        description: 'Multiple choice from visible options.',
        build: () => ({ $formkit: 'nuxtUICheckboxGroup', legend: 'Select all that apply', options: ['Option 1', 'Option 2', 'Option 3'] }),
      },
      {
        key: 'switch',
        label: 'Switch',
        icon: 'i-lucide-toggle-right',
        nameHint: 'enabled',
        description: 'On/off toggle.',
        build: () => ({ $formkit: 'nuxtUISwitch', label: 'Enable notifications' }),
      },
    ],
  },
  {
    label: 'Date & Time',
    icon: 'i-lucide-calendar',
    items: [
      {
        key: 'date',
        label: 'Date',
        icon: 'i-lucide-calendar',
        nameHint: 'date',
        description: 'Date picker input.',
        build: () => ({ $formkit: 'nuxtUIInputDate', label: 'Date' }),
      },
      {
        key: 'time',
        label: 'Time',
        icon: 'i-lucide-clock',
        nameHint: 'time',
        description: 'Time picker input.',
        build: () => ({ $formkit: 'nuxtUIInputTime', label: 'Time' }),
      },
      {
        key: 'calendar',
        label: 'Calendar',
        icon: 'i-lucide-calendar-days',
        nameHint: 'calendarDate',
        description: 'Bare date-grid picker.',
        build: () => ({ $formkit: 'nuxtUICalendar', label: 'Pick a date' }),
      },
    ],
  },
  {
    label: 'Advanced',
    icon: 'i-lucide-sparkles',
    items: [
      {
        key: 'fileUpload',
        label: 'File Upload',
        icon: 'i-lucide-upload',
        nameHint: 'file',
        description: 'Drag/drop or click-to-browse file input.',
        build: () => ({ $formkit: 'nuxtUIFileUpload', label: 'Upload a file', description: 'PDF, PNG or JPG up to 10MB' }),
      },
      {
        key: 'colorPicker',
        label: 'Color Picker',
        icon: 'i-lucide-palette',
        nameHint: 'color',
        description: 'Pick a color in multiple formats.',
        build: () => ({ $formkit: 'nuxtUIColorPicker', label: 'Pick a color' }),
      },
      {
        key: 'rating',
        label: 'Rating',
        icon: 'i-lucide-star',
        nameHint: 'rating',
        description: 'Star-based rating input.',
        build: () => ({ $formkit: 'nuxtUIInputRating', label: 'Rate your experience', length: 5 }),
      },
      {
        key: 'tags',
        label: 'Tags',
        icon: 'i-lucide-tags',
        nameHint: 'tags',
        description: 'Free-form tag entry.',
        build: () => ({ $formkit: 'nuxtUIInputTags', label: 'Tags', placeholder: 'Add a tag' }),
      },
      {
        key: 'slider',
        label: 'Slider',
        icon: 'i-lucide-sliders-horizontal',
        nameHint: 'value',
        description: 'Numeric range slider.',
        build: () => ({ $formkit: 'nuxtUISlider', label: 'Select a value', min: 0, max: 100 }),
      },
      {
        key: 'editor',
        label: 'Rich Text',
        icon: 'i-lucide-file-edit',
        nameHint: 'content',
        description: 'Tiptap-based rich text editor.',
        build: () => ({ $formkit: 'nuxtUIEditor', label: 'Content', placeholder: 'Write something…' }),
      },
    ],
  },
]

const allTemplates = categories.flatMap(category => category.items)

// ---------------------------------------------------------------------------
// Ready-made full-form templates
// ---------------------------------------------------------------------------
const formTemplates: FormTemplate[] = [
  {
    key: 'contact',
    label: 'Contact Form',
    icon: 'i-lucide-mail',
    description: 'Name, email, subject, and message.',
    nodes: [
      addElement('h2', 'Contact Us', { class: 'text-2xl font-bold' }) as SchemaNode,
      { $formkit: 'nuxtUIInput', name: 'fullName', label: 'Full Name', placeholder: 'Jane Doe', validation: 'required' },
      { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', inputType: 'email', placeholder: 'name@example.com', validation: 'required|email' },
      { $formkit: 'nuxtUISelect', name: 'subject', label: 'Subject', items: ['General Inquiry', 'Support', 'Feedback'], validation: 'required' },
      { $formkit: 'nuxtUITextarea', name: 'message', label: 'Message', rows: 5, validation: 'required' },
    ],
  },
  {
    key: 'registration',
    label: 'Event Registration',
    icon: 'i-lucide-calendar-days',
    description: 'Attendee details with dietary preferences.',
    nodes: [
      addElement('h2', 'Event Registration', { class: 'text-2xl font-bold' }) as SchemaNode,
      { $formkit: 'nuxtUIInput', name: 'attendeeName', label: 'Full Name', validation: 'required' },
      { $formkit: 'nuxtUIInput', name: 'attendeeEmail', label: 'Email', inputType: 'email', validation: 'required|email' },
      { $formkit: 'nuxtUIRadioGroup', name: 'attendanceType', legend: 'Attendance', options: ['In-person', 'Virtual'], validation: 'required' },
      { $formkit: 'nuxtUICheckboxGroup', name: 'dietary', legend: 'Dietary preferences', options: ['Vegetarian', 'Vegan', 'Gluten-free', 'None'] },
      { $formkit: 'nuxtUISwitch', name: 'newsletter', label: 'Subscribe to event updates' },
    ],
  },
  {
    key: 'login',
    label: 'Login Form',
    icon: 'i-lucide-log-in',
    description: 'Email and password with remember-me.',
    nodes: [
      addElement('h2', 'Sign In', { class: 'text-2xl font-bold' }) as SchemaNode,
      { $formkit: 'nuxtUIInput', name: 'email', label: 'Email', inputType: 'email', validation: 'required|email' },
      { $formkit: 'nuxtUIInput', name: 'password', label: 'Password', inputType: 'password', validation: 'required|length:8' },
      { $formkit: 'nuxtUICheckbox', name: 'rememberMe', label: 'Remember me' },
    ],
  },
  {
    key: 'survey',
    label: 'Feedback Survey',
    icon: 'i-lucide-message-square',
    description: 'Rating, satisfaction, and open feedback.',
    nodes: [
      addElement('h2', 'We’d love your feedback', { class: 'text-2xl font-bold' }) as SchemaNode,
      { $formkit: 'nuxtUIInputRating', name: 'rating', label: 'Overall rating', length: 5, validation: 'required' },
      { $formkit: 'nuxtUISelect', name: 'satisfaction', label: 'How satisfied are you?', items: ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'] },
      { $formkit: 'nuxtUITextarea', name: 'comments', label: 'Additional comments', rows: 4 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Canvas state
// ---------------------------------------------------------------------------
const formTitle = ref('Untitled Form')
const fields = ref<CanvasField[]>([])
const selectedId = ref<string | null>(null)

const selectedField = computed(() => fields.value.find(field => field.id === selectedId.value) ?? null)

// The structured editor (`fieldEditorSchema`) only understands `$formkit`
// nodes - a `$el` node (Heading/Paragraph/Divider from the Layout category)
// has a completely different shape (`$el`/`attrs`/`children`, no
// `name`/`validation`/etc.), so it only gets the raw JSON editor.
const isFormKitField = computed(() => Boolean(selectedField.value?.node.$formkit))

function uniqueName(hint: string) {
  const existing = new Set(fields.value.map(field => field.node.name).filter(Boolean))
  if (!existing.has(hint))
    return hint
  let i = 2
  while (existing.has(`${hint}${i}`)) i += 1
  return `${hint}${i}`
}

function guessTemplateKey(node: SchemaNode): string {
  if (node.$el)
    return 'heading'
  const found = allTemplates.find((template) => {
    const sample = template.build()
    if (!sample.$formkit || sample.$formkit !== node.$formkit)
      return false
    return (sample.inputType ?? null) === (node.inputType ?? null)
  })
  return found?.key ?? ''
}

function instantiate(template: FieldTemplate): CanvasField {
  const node = template.build()
  if (template.nameHint)
    node.name = uniqueName(template.nameHint)
  return { id: nextId(), templateKey: template.key, node }
}

function addField(template: FieldTemplate, index = fields.value.length) {
  const field = instantiate(template)
  fields.value.splice(index, 0, field)
  selectedId.value = field.id
  toast.add({ title: `Added "${template.label}"`, icon: template.icon, color: 'success' })
  return field
}

function selectField(id: string) {
  selectedId.value = id
}

function removeField(id: string) {
  const index = fields.value.findIndex(field => field.id === id)
  if (index === -1)
    return
  fields.value.splice(index, 1)
  if (selectedId.value === id)
    selectedId.value = null
}

function duplicateField(id: string) {
  const index = fields.value.findIndex(field => field.id === id)
  if (index === -1)
    return
  const original = fields.value[index]!
  const clonedNode = JSON.parse(JSON.stringify(original.node)) as SchemaNode
  if (clonedNode.name)
    clonedNode.name = uniqueName(String(clonedNode.name).replace(/\d+$/, ''))
  const clone: CanvasField = { id: nextId(), templateKey: original.templateKey, node: clonedNode }
  fields.value.splice(index + 1, 0, clone)
  selectedId.value = clone.id
}

function moveField(id: string, direction: -1 | 1) {
  const index = fields.value.findIndex(field => field.id === id)
  const target = index + direction
  if (index === -1 || target < 0 || target >= fields.value.length)
    return
  const [item] = fields.value.splice(index, 1)
  fields.value.splice(target, 0, item!)
}

function clearCanvas() {
  fields.value = []
  selectedId.value = null
}

function loadFormTemplate(template: FormTemplate) {
  fields.value = template.nodes.map((node) => {
    const cloned = JSON.parse(JSON.stringify(node)) as SchemaNode
    return { id: nextId(), templateKey: guessTemplateKey(cloned), node: cloned }
  })
  selectedId.value = null
  formTitle.value = template.label
  toast.add({ title: `Loaded "${template.label}" template`, icon: template.icon, color: 'success' })
}

function fieldMeta(field: CanvasField) {
  const template = allTemplates.find(t => t.key === field.templateKey)
  if (template) {
    const sample = template.build()
    const sameType = field.node.$formkit
      ? field.node.$formkit === sample.$formkit && (sample.inputType ?? null) === (field.node.inputType ?? null)
      : Boolean(field.node.$el) === Boolean(sample.$el)
    if (sameType)
      return { icon: template.icon, typeLabel: template.label }
  }
  if (field.node.$formkit)
    return { icon: 'i-lucide-box', typeLabel: String(field.node.$formkit) }
  if (field.node.$el)
    return { icon: 'i-lucide-layout-panel-top', typeLabel: `<${field.node.$el}>` }
  return { icon: 'i-lucide-box', typeLabel: 'Custom' }
}

function fieldDisplayLabel(field: CanvasField) {
  if (field.node.label)
    return String(field.node.label)
  if (field.node.legend)
    return String(field.node.legend)
  if (field.node.$el) {
    const children = field.node.children
    const child = Array.isArray(children) ? children.find((c: unknown) => typeof c === 'string') : children
    return typeof child === 'string' ? child : `<${field.node.$el}>`
  }
  return field.node.name ? String(field.node.name) : 'Untitled field'
}

function rowClasses(field: CanvasField) {
  return [
    selectedId.value === field.id
      ? 'border-primary ring-2 ring-primary bg-primary/5'
      : 'border-default hover:border-primary/50',
    draggingId.value === field.id ? 'opacity-40' : '',
  ]
}

// ---------------------------------------------------------------------------
// Drag and drop
//
// Follows the gotchas documented for this repo's other native-DnD features
// (see brain/notes/native-dnd-gotchas.md): `effectAllowed` is set to
// 'copyMove' on dragstart and `dropEffect` is never forced in dragover (let
// the browser derive it), `dragenter` gets its own `preventDefault`, and the
// draggable attribute lives on the real row element rather than an overlay.
// ---------------------------------------------------------------------------
const TEMPLATE_MIME = 'application/x-fk-template'
const REORDER_MIME = 'application/x-fk-reorder'

const draggingId = ref<string | null>(null)
const dragOverId = ref<string | null>(null)
const dragOverPosition = ref<'before' | 'after'>('after')
const dragOverEmpty = ref(false)

function onPaletteDragStart(event: DragEvent, template: FieldTemplate) {
  event.dataTransfer?.setData(TEMPLATE_MIME, template.key)
  if (event.dataTransfer)
    event.dataTransfer.effectAllowed = 'copyMove'
}

function onRowDragStart(event: DragEvent, field: CanvasField) {
  draggingId.value = field.id
  event.dataTransfer?.setData(REORDER_MIME, field.id)
  if (event.dataTransfer)
    event.dataTransfer.effectAllowed = 'copyMove'
}

function onDragEnd() {
  draggingId.value = null
  dragOverId.value = null
  dragOverEmpty.value = false
}

function onRowDragOver(event: DragEvent, field: CanvasField) {
  event.preventDefault()
  event.stopPropagation()
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  dragOverPosition.value = event.clientY - rect.top < rect.height / 2 ? 'before' : 'after'
  dragOverId.value = field.id
  dragOverEmpty.value = false
}

function onRowDrop(event: DragEvent, field: CanvasField) {
  event.preventDefault()
  event.stopPropagation()
  performDrop(event, field.id, dragOverPosition.value)
}

function onCanvasDragOver(event: DragEvent) {
  event.preventDefault()
  dragOverEmpty.value = true
  dragOverId.value = null
}

function onCanvasDrop(event: DragEvent) {
  event.preventDefault()
  performDrop(event, null, 'after')
}

function performDrop(event: DragEvent, targetId: string | null, position: 'before' | 'after') {
  const templateKey = event.dataTransfer?.getData(TEMPLATE_MIME)
  const reorderId = event.dataTransfer?.getData(REORDER_MIME)

  let index = targetId ? fields.value.findIndex(field => field.id === targetId) : fields.value.length
  if (targetId && position === 'after')
    index += 1

  if (templateKey) {
    const template = allTemplates.find(t => t.key === templateKey)
    if (template)
      addField(template, index)
  }
  else if (reorderId) {
    const fromIndex = fields.value.findIndex(field => field.id === reorderId)
    if (fromIndex !== -1) {
      let insertAt = index
      if (fromIndex < insertAt)
        insertAt -= 1
      const [moved] = fields.value.splice(fromIndex, 1)
      fields.value.splice(insertAt, 0, moved!)
      selectedId.value = moved!.id
    }
  }

  draggingId.value = null
  dragOverId.value = null
  dragOverEmpty.value = false
}

// ---------------------------------------------------------------------------
// Properties panel - two editors for the same selected field, kept in sync:
//   - `fieldEditorSchema` (from useFormKitEditorSchema/useFormKitEditor, the same
//     composables the Input Editor sample is built on) for a friendly,
//     structured form.
//   - the raw JsonEditor + text/parse pattern the Playground sample
//     (pages/playground.vue) uses for its schema editor, for full control.
// ---------------------------------------------------------------------------
const propertiesText = ref('')
const editorFormData = ref<Record<string, unknown>>({})

// Guards the `editorFormData` watch below from re-running `editorDataToSchema`
// (which normalizes key order) while `editorFormData` is being reset from a
// selection change or a raw-JSON edit, rather than a genuine structured-form
// edit - `nextTick` because `watch` flushes async, so a synchronous flag reset
// right after the assignment would already be back to `false` by the time
// the watch callback actually runs.
let syncingEditorForm = false
function releaseSyncGuard() {
  syncingEditorForm = false
}

// `section` (which Properties tab - Base/Display/.../Attributes - is shown)
// is UI-only state, not a real schema property, so a plain
// `schemaToEditorData(node)` drops it and the tabs reset to nothing selected
// whenever the raw JSON is edited. Carry the current tab forward instead,
// defaulting to Base whenever there isn't one to carry forward.
function toEditorFormData(node: SchemaNode): Record<string, unknown> {
  const currentSection = typeof editorFormData.value.section === 'string' ? editorFormData.value.section : 'base'
  return { section: currentSection, ...schemaToEditorData(node) }
}

watch(selectedId, () => {
  propertiesText.value = selectedField.value ? JSON.stringify(selectedField.value.node, null, 2) : ''
  syncingEditorForm = true
  // Always back to Base on a fresh selection - unlike `toEditorFormData`,
  // this doesn't carry the previous field's tab forward.
  editorFormData.value = selectedField.value ? { section: 'base', ...schemaToEditorData(selectedField.value.node) } : {}
  nextTick(releaseSyncGuard)
})

watch(editorFormData, () => {
  if (syncingEditorForm || !selectedField.value)
    return
  const index = fields.value.findIndex(field => field.id === selectedId.value)
  if (index === -1)
    return
  const newNode = editorDataToSchema(editorFormData.value) as SchemaNode
  fields.value[index] = { ...fields.value[index]!, node: newNode }
  propertiesText.value = JSON.stringify(newNode, null, 2)
}, { deep: true })

function updateFieldProperties(value: string) {
  if (!selectedField.value)
    return
  try {
    const parsed = JSON.parse(value)
    const index = fields.value.findIndex(field => field.id === selectedId.value)
    if (index !== -1)
      fields.value[index] = { ...fields.value[index]!, node: parsed }
    syncingEditorForm = true
    editorFormData.value = toEditorFormData(parsed)
    nextTick(releaseSyncGuard)
  }
  catch (error) {
    // Keep the current value while the JSON is mid-edit / invalid, same as
    // the Playground sample's `updateSchema` handler.
    console.error('Failed to parse field JSON:', error)
  }
}

// ---------------------------------------------------------------------------
// Whole-schema JSON modal - same editor, applied to the full field array.
// ---------------------------------------------------------------------------
const schemaModalOpen = ref(false)
const fullSchemaText = ref('')

watch(schemaModalOpen, (open) => {
  if (open)
    fullSchemaText.value = JSON.stringify(fields.value.map(field => field.node), null, 2)
})

function updateFullSchema(value: string) {
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      fields.value = parsed.map((node: SchemaNode) => ({ id: nextId(), templateKey: guessTemplateKey(node), node }))
      selectedId.value = null
    }
  }
  catch (error) {
    console.error('Failed to parse schema JSON:', error)
  }
}

async function copySchema() {
  try {
    await navigator.clipboard.writeText(fullSchemaText.value)
    toast.add({ title: 'Copied schema to clipboard', icon: 'i-lucide-check', color: 'success' })
  }
  catch {
    toast.add({ title: 'Copy failed - clipboard permission denied', icon: 'i-lucide-x', color: 'error' })
  }
}

// ---------------------------------------------------------------------------
// Live preview - renders the real FormKit + Nuxt UI components via
// FUDataEdit, exactly as an end user would see them.
// ---------------------------------------------------------------------------
const previewOpen = ref(false)
const previewData = ref<Record<string, unknown>>({})
const previewSchema = computed(() => fields.value.map(field => field.node) as unknown as FormKitSchemaDefinition)

watch(previewOpen, (open) => {
  if (open)
    previewData.value = {}
})

function onPreviewSaved(data: unknown) {
  toast.add({ title: 'Preview form submitted', description: 'Check the console for the captured values.', icon: 'i-lucide-check-circle', color: 'success' })
  console.log('Preview form data:', data)
}
</script>

<template>
  <UContainer>
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">
        Form Builder
      </h1>
      <p class="text-lg text-muted mb-2">
        Design a form visually: drag field templates onto the canvas, reorder fields with drag-and-drop, and
        fine-tune each field's properties with the same JSON editor used in the Playground sample.
      </p>
      <p class="text-muted">
        Start from a blank canvas or one of the ready-made form templates below, then preview the real rendered
        form at any time.
      </p>
    </div>

    <USeparator class="my-8" />

    <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
      <!-- Palette -->
      <div class="w-full shrink-0 lg:w-64">
        <UCard class="lg:sticky lg:top-6">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-shapes"
                class="text-primary"
              />
              <h3 class="font-semibold">
                Field Templates
              </h3>
            </div>
          </template>

          <p class="mb-4 text-xs text-muted">
            Drag a field onto the canvas, or click one to add it to the end.
          </p>

          <div class="space-y-5">
            <div
              v-for="category in categories"
              :key="category.label"
            >
              <div class="mb-2 flex items-center gap-2 px-0.5">
                <UIcon
                  :name="category.icon"
                  class="text-muted"
                />
                <h4 class="text-xs font-semibold uppercase tracking-wide text-muted">
                  {{ category.label }}
                </h4>
              </div>
              <div class="space-y-1">
                <UTooltip
                  v-for="template in category.items"
                  :key="template.key"
                  :text="template.description"
                >
                  <button
                    type="button"
                    draggable="true"
                    class="group flex w-full cursor-grab items-center gap-2.5 rounded-md border border-default bg-default px-2.5 py-2 text-left text-sm transition hover:border-primary hover:bg-primary/5 active:cursor-grabbing"
                    @dragstart="onPaletteDragStart($event, template)"
                    @click="addField(template)"
                  >
                    <UIcon
                      :name="template.icon"
                      class="shrink-0 text-primary"
                    />
                    <span class="min-w-0 flex-1 truncate">{{ template.label }}</span>
                    <UIcon
                      name="i-lucide-plus"
                      class="shrink-0 text-xs text-muted opacity-0 transition group-hover:opacity-100"
                    />
                  </button>
                </UTooltip>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Canvas -->
      <div class="min-w-0 flex-1">
        <div class="mb-4 flex flex-wrap items-center gap-3">
          <UInput
            v-model="formTitle"
            size="lg"
            placeholder="Untitled Form"
            class="min-w-48 flex-1"
          />
          <UButton
            icon="i-lucide-eye"
            label="Preview"
            variant="outline"
            color="neutral"
            :disabled="!fields.length"
            @click="previewOpen = true"
          />
          <UButton
            icon="i-lucide-braces"
            label="Schema JSON"
            variant="outline"
            color="neutral"
            @click="schemaModalOpen = true"
          />
          <UButton
            icon="i-lucide-trash-2"
            label="Clear"
            variant="outline"
            color="error"
            :disabled="!fields.length"
            @click="clearCanvas"
          />
        </div>

        <div class="mb-4 rounded-lg border border-dashed border-default p-3">
          <p class="mb-2 text-xs font-medium text-muted">
            Start from a template
          </p>
          <div class="flex flex-wrap gap-2">
            <UTooltip
              v-for="template in formTemplates"
              :key="template.key"
              :text="template.description"
            >
              <UButton
                :icon="template.icon"
                :label="template.label"
                size="sm"
                variant="soft"
                color="neutral"
                @click="loadFormTemplate(template)"
              />
            </UTooltip>
          </div>
        </div>

        <div
          class="min-h-[420px] space-y-2 rounded-xl border-2 border-dashed p-3 transition-colors"
          :class="dragOverEmpty ? 'border-primary bg-primary/5' : 'border-default'"
          @dragenter.prevent
          @dragover="onCanvasDragOver"
          @dragleave="dragOverEmpty = false"
          @drop="onCanvasDrop"
        >
          <div
            v-if="!fields.length"
            class="flex min-h-[380px] flex-col items-center justify-center gap-2 text-center text-muted"
          >
            <UIcon
              name="i-lucide-mouse-pointer-click"
              class="text-3xl"
            />
            <p class="font-medium">
              Drag a field here, or click one in the palette
            </p>
            <p class="text-sm">
              Or start from a template above
            </p>
          </div>

          <div
            v-for="(field, index) in fields"
            :key="field.id"
            class="group relative cursor-pointer rounded-lg border p-3 transition"
            :class="rowClasses(field)"
            draggable="true"
            @dragstart="onRowDragStart($event, field)"
            @dragend="onDragEnd"
            @dragenter.prevent
            @dragover="onRowDragOver($event, field)"
            @drop="onRowDrop($event, field)"
            @click="selectField(field.id)"
          >
            <div
              v-if="dragOverId === field.id && dragOverPosition === 'before'"
              class="absolute inset-x-3 -top-1.5 h-0.5 rounded-full bg-primary"
            />

            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-grip-vertical"
                class="shrink-0 cursor-grab text-muted"
              />
              <UIcon
                :name="fieldMeta(field).icon"
                class="shrink-0 text-lg text-primary"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate font-medium">
                  {{ fieldDisplayLabel(field) }}
                </p>
                <p class="truncate text-xs text-muted">
                  {{ fieldMeta(field).typeLabel }}<span v-if="field.node.name"> · {{ field.node.name }}</span>
                </p>
              </div>
              <div class="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <UButton
                  icon="i-lucide-chevron-up"
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  :disabled="index === 0"
                  @click.stop="moveField(field.id, -1)"
                />
                <UButton
                  icon="i-lucide-chevron-down"
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  :disabled="index === fields.length - 1"
                  @click.stop="moveField(field.id, 1)"
                />
                <UButton
                  icon="i-lucide-copy"
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  @click.stop="duplicateField(field.id)"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  size="xs"
                  variant="ghost"
                  color="error"
                  @click.stop="removeField(field.id)"
                />
              </div>
            </div>

            <div
              v-if="dragOverId === field.id && dragOverPosition === 'after'"
              class="absolute inset-x-3 -bottom-1.5 h-0.5 rounded-full bg-primary"
            />
          </div>
        </div>
      </div>

      <!-- Properties -->
      <div class="w-full shrink-0 lg:w-96">
        <UCard class="lg:sticky lg:top-6">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-settings-2"
                class="text-primary"
              />
              <h3 class="font-semibold">
                Properties
              </h3>
            </div>
          </template>

          <div v-if="selectedField">
            <div class="mb-3 flex items-center gap-2 rounded-md bg-elevated/50 p-2">
              <UIcon
                :name="fieldMeta(selectedField).icon"
                class="text-primary"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">
                  {{ fieldDisplayLabel(selectedField) }}
                </p>
                <p class="truncate text-xs text-muted">
                  {{ fieldMeta(selectedField).typeLabel }}
                </p>
              </div>
              <UButton
                icon="i-lucide-trash-2"
                size="xs"
                variant="ghost"
                color="error"
                @click="removeField(selectedField.id)"
              />
            </div>
            <template v-if="isFormKitField">
              <p class="mb-2 text-xs text-muted">
                Edit this field with the structured form below, or drop into the raw JSON - the same editor used
                in the Playground sample. Both stay in sync and apply live to the canvas and preview.
              </p>
              <FUDataEdit
                id="form-builder-field-editor"
                v-model="editorFormData"
                :schema="fieldEditorSchema"
              >
                <template #submit />
              </FUDataEdit>

              <USeparator class="my-4" />
            </template>
            <p
              v-else
              class="mb-2 text-xs text-muted"
            >
              Layout elements (<code>$el</code>) don't have structured properties - edit them directly as JSON
              below.
            </p>

            <p class="mb-2 text-xs font-medium text-muted">
              Raw JSON
            </p>
            <JsonEditor
              v-model="propertiesText"
              label="Field Properties (JSON)"
              @update:model-value="updateFieldProperties"
            />
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted"
          >
            <UIcon
              name="i-lucide-mouse-pointer-square-dashed"
              class="text-2xl"
            />
            <p class="text-sm">
              Select a field on the canvas to edit its properties
            </p>
          </div>
        </UCard>
      </div>
    </div>

    <UModal
      v-model:open="schemaModalOpen"
      title="Form Schema (JSON)"
    >
      <template #body>
        <p class="mb-3 text-sm text-muted">
          This is the exact FormKit schema array being built. Edit it directly, or copy it into your app.
        </p>
        <JsonEditor
          v-model="fullSchemaText"
          label="Schema"
          @update:model-value="updateFullSchema"
        />
      </template>
      <template #footer>
        <UButton
          icon="i-lucide-copy"
          label="Copy"
          variant="outline"
          color="neutral"
          @click="copySchema"
        />
        <UButton
          label="Close"
          color="neutral"
          variant="ghost"
          @click="schemaModalOpen = false"
        />
      </template>
    </UModal>

    <USlideover
      v-model:open="previewOpen"
      :title="`Preview — ${formTitle || 'Untitled Form'}`"
    >
      <template #body>
        <p class="mb-4 text-sm text-muted">
          This renders the real FormKit + Nuxt UI components exactly as end users will see them.
        </p>
        <FUDataEdit
          id="form-builder-preview"
          :data="previewData"
          :schema="previewSchema"
          @data-saved="onPreviewSaved"
        >
          <template #submit>
            <div class="flex gap-2 pt-2">
              <UButton
                type="submit"
                label="Submit"
                icon="i-lucide-check"
              />
              <UButton
                type="button"
                label="Close"
                color="neutral"
                variant="outline"
                @click="previewOpen = false"
              />
            </div>
          </template>
        </FUDataEdit>
      </template>
    </USlideover>
  </UContainer>
</template>
