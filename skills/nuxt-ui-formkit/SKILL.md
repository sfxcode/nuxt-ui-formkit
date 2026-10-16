---
name: nuxt-ui-formkit
description: Build forms in a Nuxt app with @sfxcode/nuxt-ui-formkit (FormKit schemas rendered with Nuxt UI). Use when setting it up, writing or generating a form schema (nuxtUI* types, FUDataEdit, FUDataView, FUAutoForm), or fixing a form that renders wrong or silently does nothing.
---

# nuxt-ui-formkit

FormKit inputs (`nuxtUIInput`, `nuxtUISelect`, ...) that render Nuxt UI components, driven by a plain JSON schema. `FUDataEdit` renders a schema as an editable form, `FUDataView` as read-only output, `FUAutoForm` infers a form from data.

Read the docs instead of guessing: https://sfxcode.github.io/nuxt-ui-formkit/llms.txt is an index with a Markdown copy of every page. Start with Input Components, Schema-Based Forms and Known Limitations.

## Setup

- `nuxt.config.ts` needs **both** `@formkit/nuxt` and `@sfxcode/nuxt-ui-formkit` in `modules`.
- Inputs are **not** auto-registered. `formkit.config.ts` must register them:
  `createNuxtUiFormkitConfig({ multiStep: true, plugins: [...] })` from `@sfxcode/nuxt-ui-formkit/formkit`, then use its `inputs` and `plugins`.
- Pass your own plugins through the helper's `plugins` option. Setting `plugins` after spreading it drops the asterisk plugin.
- `multiStep: true` is required for `nuxtUIMultiStep` / `nuxtUIStep`.

## Schemas

A field is `{ $formkit: 'nuxtUIInput', name, label, validation, ...props }`; headings and layout are `{ $el: 'h2', attrs: { class }, children: [...] }`. Props go on the schema node; unknown props may be silently ignored, so check the docs for the type.

- **Conditional fields** use `if: "$get(plan).value === 'pro'"`. `$get()` finds a field by its **`id`**, not its `name`, so the field it reads needs an `id`. Without one the field never shows, with no error. `&&`, `||`, `===`, `!==` work; there is no unary `!`. An untouched checkbox or switch is `undefined`, not `false`: to react to "off" write `!== true`, or set `value: false`.
- **Inside a repeater row** read a sibling with `$node.value.<field>`.
- **`required` passes for `false`.** Use `accepted` on `nuxtUICheckbox` and `nuxtUISwitch`.
- **Dates:** `nuxtUIInputDate` and `nuxtUICalendar` emit `CalendarDate` objects (not JSON). Set `valueType: 'iso'` or `'date'`.
- **Options** are strings or `{ label, value }`. A `nuxtUISelectMenu` bound to a string needs `valueKey: 'value'`.
- **Validation messages** appear on blur. `nuxtUISelect` only reveals after its dropdown closes; use `'live'` or `nuxtUISelectMenu`.

## Repeaters

`nuxtUIRepeater` is bare by default: without these the insert button disappears after the first row, the row buttons stack, and delete and copy are missing.

`newItem` (every child name, empty), `alwaysDisplayInsertButton: true`, `displayDeleteButton: true`, `displayCloneButton: true`, `listItemClass: 'flex items-start gap-2'`, `buttonGroupClass: 'mt-6 flex gap-1'`, and `minItems` / `maxItems`.

For animations use `createAutoAnimatePlugin` from `@sfxcode/nuxt-ui-formkit/formkit`, not the one in `@formkit/addons` (that one stacks animations after the first insert), with `nuxtUIRepeater: ['input']` as the target.

## Styling

Nuxt UI inputs size to their content and do not fill their wrapper. Set `outerClass` (width) and `class: 'w-full'` per field, or add the global rule from the Styling page. Prefer theme tokens (`border-default`, `bg-elevated/30`) to fixed grays. Details: https://sfxcode.github.io/nuxt-ui-formkit/getting-started/styling

## Other things that fail quietly

- `node.at('items.0.field')` cannot reach into a repeater.
- `useFormKitForm(id)` is keyed on the form's `id`, and the form must be mounted.
- Server rendering works; the editor and a multi-step's tab strip only appear after hydration.
- Only `UButton`, `UIcon`, `UTabs`, `UUser` and `UTooltip` are available as `$cmp` in a schema.

## Check your work

Render the form and use it: change every field a condition depends on, add and remove repeater rows, submit it empty. `FUDataEdit` takes `debug-data` to show the live data.
