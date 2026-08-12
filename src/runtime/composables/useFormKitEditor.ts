type EditorData = Record<string, unknown> & {
  _dollar_formkit?: string
  $formkit?: string
  attrs?: { attrKey?: string, attrValue?: unknown }[]
  options?: unknown[]
  label?: unknown
  legend?: unknown
  outerClass?: unknown
  wrapperClass?: unknown
  innerClass?: unknown
  readonly?: unknown
  disabled?: unknown
  preserve?: unknown
}

/**
 * Converts between a single FormKit schema node (`{ $formkit: 'nuxtUIInput', ... }`)
 * and the "editor data" shape used by the property-editor form built in
 * `useFormKitEditorSchema`. The editor form is itself a FormKit form, so its
 * field names can't collide with FormKit's own `$`-prefixed schema syntax -
 * `_dollar_formkit` stands in for `$formkit` while editing and gets mapped
 * back on the way out.
 */
export function useFormKitEditor() {
  // Types whose Nuxt UI component accepts an `options`/`items` list of
  // `{ label, value }` entries - these get the editor's "Options" section.
  const inputNamesWithOptions = ['nuxtUICheckboxGroup', 'nuxtUIInputMenu', 'nuxtUIListbox', 'nuxtUIRadioGroup', 'nuxtUISelect', 'nuxtUISelectMenu', 'nuxtUITree']

  // Types whose Nuxt UI component takes `legend` instead of FormKit's usual
  // `label` (a fieldset heading rather than a single control's label).
  const inputNamesWithLegend = ['nuxtUICheckboxGroup', 'nuxtUIRadioGroup']

  const inputNames = ['nuxtUICalendar', 'nuxtUICheckbox', 'nuxtUICheckboxGroup', 'nuxtUIColorPicker', 'nuxtUIEditor', 'nuxtUIFileUpload', 'nuxtUIInput', 'nuxtUIInputDate', 'nuxtUIInputMenu', 'nuxtUIInputNumber', 'nuxtUIInputRating', 'nuxtUIInputTags', 'nuxtUIInputTime', 'nuxtUIListbox', 'nuxtUIPinInput', 'nuxtUIRadioGroup', 'nuxtUISelect', 'nuxtUISelectMenu', 'nuxtUISlider', 'nuxtUISwitch', 'nuxtUITextarea', 'nuxtUITree'].sort()

  const outputNames = ['nuxtUIOutputBadge', 'nuxtUIOutputBoolean', 'nuxtUIOutputDate', 'nuxtUIOutputLink', 'nuxtUIOutputList', 'nuxtUIOutputNumber', 'nuxtUIOutputProgress', 'nuxtUIOutputRating', 'nuxtUIOutputText', 'nuxtUIOutputUser'].sort()

  // Best-effort typed value for a freeform "Extra Properties" entry - lets
  // `min: 5` or `multiple: true` reach the component as a number/boolean
  // instead of the literal string entered in the text field.
  function parseAttrValue(value: unknown): unknown {
    if (typeof value !== 'string')
      return value
    const trimmed = value.trim()
    if (trimmed.length === 0)
      return value
    try {
      return JSON.parse(trimmed)
    }
    catch {
      return value
    }
  }

  function sanitizeOptions(options: unknown): Record<string, unknown>[] | undefined {
    if (!Array.isArray(options))
      return undefined
    return options
      .filter((option): option is Record<string, unknown> => Boolean(option) && typeof option === 'object')
      .filter(option => option.label !== '' || option.value !== '')
      .map(option => ({ ...option }))
  }

  function editorDataToSchema(data: EditorData): Record<string, unknown> {
    if (!data)
      return {}

    const formkitInput = data._dollar_formkit
    let extraAttrs: Record<string, unknown> = {}

    if (data.attrs && Array.isArray(data.attrs) && data.attrs.length > 0) {
      const mapped = data.attrs
        .filter(entry => entry && typeof entry === 'object' && entry.attrKey)
        .map(entry => [entry.attrKey as string, parseAttrValue(entry.attrValue)] as [string, unknown])

      extraAttrs = Object.fromEntries(mapped)
    }

    const defaultObject = {
      readonly: data.readonly === true ? true : undefined,
      disabled: data.disabled === true ? true : undefined,
      preserve: data.preserve === true ? true : undefined,
    }

    const outerClass = data.outerClass ? String(data.outerClass).trim() : undefined
    const wrapperClass = data.wrapperClass ? String(data.wrapperClass).trim() : undefined
    const innerClass = data.innerClass ? String(data.innerClass).trim() : undefined

    const undefinedObject = {
      attrs: undefined,
      schemaResultFormKey: undefined,
      _dollar_formkit: undefined,
      section: undefined,
      slots: undefined,
    }

    const useOptions = formkitInput ? inputNamesWithOptions.includes(formkitInput) : false
    const useLegend = formkitInput ? inputNamesWithLegend.includes(formkitInput) : false

    const result: Record<string, unknown> = {
      ...data,
      $formkit: formkitInput,
      ...extraAttrs,
      ...undefinedObject,
      ...defaultObject,
      outerClass,
      wrapperClass,
      innerClass,
      // Cloned (not the same array/objects as `data.options`) so nothing
      // downstream - the live preview's own rendered Select, `JSON.stringify`
      // for the debug/copy views - can ever mutate the editor form's own
      // repeater value by touching a shared reference. Also drops rows the
      // user hasn't finished filling in yet, which Nuxt UI's Select/SelectMenu
      // otherwise reject for having an empty `value`.
      options: useOptions ? sanitizeOptions(data.options) : undefined,
      label: useLegend ? undefined : data.label,
      legend: useLegend ? data.legend : undefined,
    }

    // cleanup empty values so the generated schema stays tidy
    for (const key in result) {
      const value = result[key]
      if (typeof value === 'string' && value.trim().length === 0)
        result[key] = undefined
    }

    return result
  }

  function editorDataToJson(data: EditorData): string {
    if (!data)
      return '{}'
    return JSON.stringify(editorDataToSchema(data))
  }

  function objectToString(data: Record<string, unknown>): string {
    if (!data)
      return '{}'

    return `{ ${Object.entries(data).filter(([, value]) => value !== undefined).map(([key, value]) => {
      if (key === 'options' && Array.isArray(value) && value.length > 0) {
        const options = value.map(option => option && typeof option === 'object' ? objectToString(option) : JSON.stringify(option))
        return `${key}: [${options.join(', ')}]`
      }
      if (typeof value === 'number' || typeof value === 'boolean') {
        return `${key}: ${value}`
      }
      return `${key}: '${value}'`
    }).join(', ')} }`
  }

  function editorDataToCode(data: EditorData): string {
    if (!data)
      return '{}'

    try {
      const jsonData = editorDataToJson(data)
      return objectToString(JSON.parse(jsonData))
    }
    catch (error) {
      console.error('Error in editorDataToCode:', error)
      return '{}'
    }
  }

  function schemaToEditorData(schema: Record<string, unknown>): EditorData {
    if (!schema)
      return {}

    return { ...schema, _dollar_formkit: schema.$formkit as string | undefined }
  }

  return {
    inputNames,
    outputNames,
    inputNamesWithOptions,
    inputNamesWithLegend,
    editorDataToSchema,
    editorDataToJson,
    editorDataToCode,
    schemaToEditorData,
  }
}
