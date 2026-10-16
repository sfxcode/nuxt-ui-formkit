
# Known Limitations

Most of these fail **silently** - no error, no warning, just a missing label or a validation message that never appears - so they're worth reading once.

## Setup

- **Inputs are not auto-registered.** The module only adds a plugin, the composables, and `FUDataView`/`FUDataEdit`/`FUDataDebug`/`FUAutoForm`. The `nuxtUI*` input and output types exist only once your `formkit.config.ts` registers them via [`createNuxtUiFormkitConfig()`](/getting-started/installation#formkit-configuration), and that file is only picked up if `@formkit/nuxt` is in your `modules`.
- **Multi-step needs its plugin.** `nuxtUIMultiStep`/`nuxtUIStep` do nothing unless you call `createNuxtUiFormkitConfig({ multiStep: true })` (or register `createMultiStepPlugin()` yourself). In development a `nuxtUIMultiStep` without the plugin logs a console warning saying so. See [Multi-Step](/components/multi-step).
- **Don't override `plugins` after spreading the helper.** `defaultConfig({ ...createNuxtUiFormkitConfig(), plugins: [x] })` replaces the whole array and silently drops the asterisk plugin (required fields lose their `*`). Pass yours as `createNuxtUiFormkitConfig({ plugins: [x] })`, which appends them.
- **Schemas can only use globally registered Nuxt UI components.** The module registers `UButton`, `UIcon`, `UTabs`, `UUser` and `UTooltip`. Any other `$cmp: 'UXxx'` in a schema renders as an unstyled custom element.
- **Server rendering has a few things that only appear after hydration.** The editor is built in the browser (the content below it moves down by about 73px when it mounts), a multi-step's tab strip appears after hydration, and a date field without an explicit `timeZone` shows the server's day until the page mounts. None of this is a hydration mismatch. See [Server-Side Rendering](/getting-started/ssr).

## Validation timing

FormKit reveals validation messages on `blur` by default, and Nuxt UI components don't all emit one.

- **`nuxtUIColorPicker` is pointer-only.** Nothing inside `UColorPicker` is focusable, so "blur" means releasing the pointer after picking a color; keyboard users can't operate it at all.
- **`nuxtUISelect` reveals on dropdown close only.** Tabbing through without opening it shows nothing. Use `'live'`, or `nuxtUISelectMenu`, which has no such gap. See [Selection Components](/components/inputs#nuxtuiselect).
- **`required` passes for a boolean `false`.** On `nuxtUICheckbox`/`nuxtUISwitch`, use the `accepted` rule instead.

## Forms and composables

- **`useFormKitForm(id)` is keyed on the form's `id`, not its `name`**, and the form must be mounted in the DOM. `submit()` can't report when FormKit's own submission finishes; `isLoading` only wraps the `handler` you pass.
- **`hasErrors` is not `!isValid`.** `hasErrors` counts only error *messages* (e.g. from `setErrors`); a form with failed validation rules reports `hasErrors: false`. Use `isValid` for rule failures.
- **`isDirty` is sticky by default** - it stays `true` after a field is edited back to its original value. Set `dirty-behavior="compare"` (`FUDataEdit` has a `dirtyBehavior` prop) to track the live difference.
- **Overlays aren't concurrent.** `useFormKitOverlay().edit()`/`auto()` share one overlay instance; a second call before the first resolves takes it over. See [One Overlay Instance at a Time](/components/overlay).
- **Autosave attaches at form creation only.** It needs a stable form `name`, covers the root form (not nested groups), and can't be added later from `useFormKitForm`. See [`createAutosavePlugin`](/api/utilities#createautosaveplugin).

## Repeaters and schemas

- **`node.at('items.0.email')` can't reach into `nuxtUIRepeater`.** The repeater's outer and inner nodes share a name, so FormKit's address lookup fails silently. The Standard Schema bridge works around this; your own code addressing repeater rows has to as well.
- **Inside repeater rows, read sibling values with `$node.value.<field>`.** `$get(name)` resolves by `id`, not by `name`.
- **The schema expression language has no unary `!`.** `if: '!$value'` is silently ignored; compare explicitly instead.

## Inputs

- **Date inputs emit `@internationalized/date` objects by default** (`CalendarDate` etc.), which aren't JSON-serializable. Set `valueType: 'date'` or `'iso'` for plain values - see [`nuxtUIInputDate`](/components/inputs#nuxtuiinputdate).
- **`color` is overridden while a field is invalid** - the wrapped component is switched to its `error` color.
- **FormKit's own label/help/messages chrome always surrounds the Nuxt UI component**, so you won't get Nuxt UI's `UFormField` layout.
- **`@formkit/addons` plugins that assume native FormKit types silently no-op.** `createMaxLengthCountdownPlugin` and `createFloatingLabelsPlugin` don't work with `nuxtUI*` types.

## FUAutoForm

- **Fields it can't map are dropped, not errored.** `null`, `undefined`, functions and other non-plain values never become inputs; with Zod, only string, number, boolean, date, array and object schemas map - enums, unions and literals are skipped.
- **Schema introspection is by duck-typing**, tested against Valibot 1.x and Zod 4. Zod 3 isn't supported, and other Standard Schema libraries (e.g. ArkType) get no inference - they work for [validation](/components/standard-schema), not for building the form.

## Localization

Built-in labels are English-only unless noted: "Save"/"Cancel"/"Reset" on `FUDataEdit` and the overlays, "Keep editing"/"Discard" in the `confirmDiscard` prompt, "Yes"/"No" on `FUOutputBoolean`, and "Add Item" on the repeater. Multi-step's Previous/Next resolve through FormKit's `$ui.prev`/`$ui.next` i18n keys. Most of these can be overridden through props.

## Not implemented

`UStepper` as a multi-step display mode (tabs only), `FUOutputAvatar`, and `FUOutputProgressGroup`.
