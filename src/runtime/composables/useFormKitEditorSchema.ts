import { useFormKitSchema } from './useFormKitSchema'
import { useFormKitEditor } from './useFormKitEditor.ts'

/**
 * Builds the FormKit schema for a form that edits the properties of a
 * single FormKit schema node - pick a field type, fill in its label,
 * validation, options, etc., and `useFormKitEditor().editorDataToSchema()`
 * turns the resulting form data back into a real `{ $formkit: ... }` node.
 *
 * Every field below sets `preserve: true` - the "section" switcher hides
 * whole groups of fields via `if:`, and without `preserve` a field's value
 * is dropped the moment it's hidden (e.g. switching from the Validation tab
 * back to Base would otherwise wipe out the validation rule just entered).
 */
export function useFormKitEditorSchema(isChangeTypePossible: boolean = true) {
  const { addElement } = useFormKitSchema()
  const { inputNames, outputNames, inputNamesWithOptions, inputNamesWithLegend } = useFormKitEditor()

  function ifGet(fieldName: string, value: string) {
    return `$get(${fieldName}).value === '${value}'`
  }

  function ifSection(section: string) {
    return ifGet('section', section)
  }

  function ifAnyType(names: string[]) {
    return names.map(name => ifGet('_dollar_formkit', name)).join(' || ')
  }

  // FormKit's schema expression compiler supports `&&`/`||`/comparisons and
  // parens, but has no unary `!` operator - "none of these types" has to be
  // spelled out as a chain of `!==` comparisons rather than negating
  // `ifAnyType(...)`.
  function ifNoneType(names: string[]) {
    return names.map(name => `$get(_dollar_formkit).value !== '${name}'`).join(' && ')
  }

  const optionsCapableIf = `(${ifAnyType(inputNamesWithOptions)})`
  const notOptionsCapableIf = `(${ifNoneType(inputNamesWithOptions)})`
  const legendTypeIf = `(${ifAnyType(inputNamesWithLegend)})`
  const notLegendTypeIf = `(${ifNoneType(inputNamesWithLegend)})`

  function typeOptions(names: string[], kind?: string) {
    return names.map(name => ({ label: kind ? `${name} (${kind})` : name, value: name }))
  }

  const fieldTypeOptions = [...typeOptions(inputNames), ...typeOptions(outputNames, 'output')]

  const sectionOptions = [
    { label: 'Base', value: 'base' },
    { label: 'Display', value: 'display' },
    { label: 'Style', value: 'style' },
    { label: 'Validation', value: 'validation' },
    { label: 'Options', value: 'options' },
    { label: 'Attributes', value: 'attrs' },
  ]

  const validationVisibilityOptions = [
    { label: 'Blur', value: 'blur' },
    { label: 'Live', value: 'live' },
    { label: 'Dirty', value: 'dirty' },
    { label: 'Submit', value: 'submit' },
  ]

  function editorSchema(typeOptionsOverride: { label: string, value: string }[] = fieldTypeOptions) {
    return [
      {
        $formkit: 'nuxtUISelectMenu',
        // `$get()` addresses nodes by `id`, not `name` - this has to match
        // the identifier used in `ifGet('_dollar_formkit', ...)` below.
        // Disabled rather than hidden (`if: false`) when type-switching is
        // turned off - hiding would unmount this node entirely, and every
        // other `$get('_dollar_formkit')` comparison below (legend vs label,
        // the Options tab's capability check) would then find nothing and
        // always evaluate false.
        id: '_dollar_formkit',
        name: '_dollar_formkit',
        disabled: !isChangeTypePossible,
        label: 'Field Type',
        value: 'nuxtUIInput',
        // Without `valueKey`, nuxtUISelectMenu's model value is the whole
        // `{ label, value }` option object rather than just its `value` -
        // every `$get(_dollar_formkit).value === '...'` comparison below
        // would silently compare an object to a string and always be false.
        valueKey: 'value',
        options: typeOptionsOverride,
        key: 'schema_inputSelection',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        name: 'name',
        label: 'Field Name',
        validation: 'required',
        validationVisibility: 'live',
        key: 'schema_name',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIRadioGroup',
        id: 'section',
        name: 'section',
        legend: 'Properties',
        options: sectionOptions,
        orientation: 'horizontal',
        // Nuxt UI's horizontal RadioGroup fieldset is `flex flex-row` with no
        // wrap by default - in the narrow Properties panel that overflows
        // instead of dropping "Attributes" etc. to a second line.
        ui: { fieldset: 'flex-wrap' },
        value: 'base',
        key: 'schema_section',
        preserve: true,
      },

      // --- Base -----------------------------------------------------------
      {
        $formkit: 'nuxtUIInput',
        if: `${ifSection('base')} && ${notLegendTypeIf}`,
        name: 'label',
        label: 'Field Label',
        key: 'schema_label',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: `${ifSection('base')} && ${legendTypeIf}`,
        name: 'legend',
        label: 'Field Legend',
        key: 'schema_legend',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('base'),
        name: 'help',
        label: 'Help Text',
        key: 'schema_help',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('base'),
        name: 'value',
        label: 'Default Value',
        key: 'schema_value',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('base'),
        name: 'id',
        label: 'Field ID',
        key: 'schema_id',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('base'),
        name: 'key',
        label: 'Schema Key',
        help: 'Forces FormKit to re-render this node when the key changes.',
        key: 'schema_key',
        preserve: true,
      },
      {
        $formkit: 'nuxtUICheckbox',
        if: ifSection('base'),
        name: 'preserve',
        label: 'Preserve value when hidden',
        key: 'schema_preserve',
        value: false,
        preserve: true,
      },

      // --- Display ----------------------------------------------------------
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('display'),
        name: 'class',
        label: 'CSS Class',
        key: 'schema_class',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('display'),
        name: 'if',
        label: 'Render Condition (if-expression)',
        help: 'e.g. $get(otherField).value === true',
        key: 'schema_if',
        preserve: true,
      },
      {
        $formkit: 'nuxtUICheckbox',
        if: ifSection('display'),
        name: 'disabled',
        label: 'Disabled',
        key: 'schema_disabled',
        value: false,
        preserve: true,
      },
      {
        $formkit: 'nuxtUICheckbox',
        if: ifSection('display'),
        name: 'readonly',
        label: 'Read Only',
        key: 'schema_readonly',
        value: false,
        preserve: true,
      },

      // --- Style ------------------------------------------------------------
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('style'),
        name: 'outerClass',
        label: 'Outer Class',
        key: 'schema_outerClass',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('style'),
        name: 'wrapperClass',
        label: 'Wrapper Class',
        key: 'schema_wrapperClass',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('style'),
        name: 'innerClass',
        label: 'Inner Class',
        key: 'schema_innerClass',
        preserve: true,
      },

      // --- Validation ---------------------------------------------------------
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('validation'),
        name: 'validation',
        label: 'Validation Rules',
        help: 'e.g. required|email',
        key: 'schema_validation',
        preserve: true,
      },
      {
        $formkit: 'nuxtUISelect',
        if: ifSection('validation'),
        name: 'validationVisibility',
        label: 'Validation Visibility',
        options: validationVisibilityOptions,
        key: 'schema_validationVisibility',
        preserve: true,
      },
      {
        $formkit: 'nuxtUIInput',
        if: ifSection('validation'),
        name: 'validationLabel',
        label: 'Validation Label',
        key: 'schema_validationLabel',
        preserve: true,
      },

      // --- Options (only for field types with an options/items list) --------
      // `listClass`/`listItemClass` match the flex row layout from the
      // Repeater sample (pages/form/repeater-sample.vue); `draggable` +
      // `displayDragHandle` add drag-and-drop reordering the way the
      // Drag-and-Drop Repeater sample (pages/form/repeater-drag.vue) does -
      // `hideMoveButtons` follows that same sample's convention of hiding the
      // up/down buttons once dragging covers reordering.
      addElement('p', 'The selected field type does not use an options list.', { class: 'text-muted text-sm' }, `${ifSection('options')} && ${notOptionsCapableIf}`),
      {
        $formkit: 'nuxtUIRepeater',
        if: `${ifSection('options')} && ${optionsCapableIf}`,
        name: 'options',
        label: 'Options',
        help: 'Shown to the user as label, submitted as value.',
        listClass: 'grid gap-2',
        listItemClass: 'flex items-start gap-2',
        insertButtonLabel: 'Add Option',
        alwaysDisplayInsertButton: true,
        displayDeleteButton: true,
        draggable: true,
        displayDragHandle: true,
        // Each row's children render with their own label above their input
        // (like every other field), but the drag handle and delete button
        // don't have one - `items-start` alone lines them up with the
        // *labels*, not the inputs below. `mt-6` nudges both down to roughly
        // where the inputs start instead.
        dragHandleClass: 'mt-6 cursor-grab active:cursor-grabbing text-muted',
        buttonGroupClass: 'mt-6 shrink-0',
        hideMoveButtons: true,
        newItem: { label: '', value: '' },
        key: 'schema_options',
        preserve: true,
        children: [
          {
            $formkit: 'nuxtUIInput',
            label: 'Label',
            name: 'label',
            outerClass: 'w-48',
          },
          {
            $formkit: 'nuxtUIInput',
            label: 'Value',
            name: 'value',
            outerClass: 'w-48',
          },
        ],
      },

      // --- Attributes (escape hatch for anything not covered above) ---------
      {
        $formkit: 'nuxtUIRepeater',
        if: ifSection('attrs'),
        name: 'attrs',
        label: 'Extra Properties',
        help: 'Any additional schema property this field type supports (e.g. rows, min, max, icon).',
        listClass: 'grid gap-2',
        listItemClass: 'flex items-start gap-2',
        insertButtonLabel: 'Add Property',
        alwaysDisplayInsertButton: true,
        displayDeleteButton: true,
        draggable: true,
        displayDragHandle: true,
        // Each row's children render with their own label above their input
        // (like every other field), but the drag handle and delete button
        // don't have one - `items-start` alone lines them up with the
        // *labels*, not the inputs below. `mt-6` nudges both down to roughly
        // where the inputs start instead.
        dragHandleClass: 'mt-6 cursor-grab active:cursor-grabbing text-muted',
        buttonGroupClass: 'mt-6 shrink-0',
        hideMoveButtons: true,
        newItem: { attrKey: '', attrValue: '' },
        key: 'schema_attrs',
        preserve: true,
        children: [
          {
            $formkit: 'nuxtUIInput',
            label: 'Property',
            name: 'attrKey',
            outerClass: 'w-48',
          },
          {
            $formkit: 'nuxtUIInput',
            label: 'Value',
            name: 'attrValue',
            outerClass: 'w-48',
          },
        ],
      },
    ]
  }

  return { editorSchema, fieldTypeOptions, typeOptions }
}
