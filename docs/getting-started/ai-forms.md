# Generating Forms with AI

A form here is a plain JSON array (a [FormKit schema](/getting-started/schema-forms)), so a language model can write it from a description and `FUDataEdit` renders it as is. This page has a prompt that does that reliably, how to check the result, and the mistakes models make without the prompt's rules.

## How to use it

1. Paste the [prompt](#the-prompt) into your AI assistant and give it the framework docs it names. This site publishes them in a form an assistant can read:
   - [`llms.txt`](https://sfxcode.github.io/nuxt-ui-formkit/llms.txt): an index with a link to a plain Markdown copy of every page. Point an assistant that can browse at it, or pick the pages the prompt names (Input Components, Schema-Based Forms, Known Limitations, plus Repeater or Multi-Step).
   - [`llms-full.txt`](https://sfxcode.github.io/nuxt-ui-formkit/llms-full.txt): every page in one file, about 170 KB at the time of writing. Use it only if your assistant has a large context window.
2. Describe the form in plain words, for example *"a hotel booking form: guest details, a room type, check-in and check-out dates, an extra-guests field only for family rooms and suites, a breakfast switch and a special requests box"*.
3. Take the JSON it returns, [render it](#check-the-result) and look at it.
4. Ask for changes in words: *"put the dates side by side"*, *"add a step for payment"*, *"make the phone number optional"*.

## The prompt

```text
You generate form definitions for the `@sfxcode/nuxt-ui-formkit` framework: FormKit schemas rendered with Nuxt UI components.

## Reference

Read these framework docs first and use only what they document: Input Components (every field type and its props), Schema-Based Forms (schema basics and conditional fields), Known Limitations (silent failures to avoid), plus Repeater for lists and Multi-Step for wizards.

## Output

Return ONE valid JSON array and nothing else: no prose, no comments, no trailing commas, no functions (so no `new Date()`). It is the `schema` of `<FUDataEdit :schema="..." />`, which adds the Save button itself.

## Node kinds

- A field: `{ "$formkit": "<type>", "name": "<dataKey>", "label": "...", ...props }`
- Plain HTML, for headings and layout: `{ "$el": "h2", "attrs": { "class": "text-xl font-semibold" }, "children": ["Title"] }`
- A node is shown conditionally with `"if": "<expression>"`.

## Rules

1. Only use field types and props the docs list. Never invent a type or a prop; an unknown prop may be silently ignored.
2. Every field has a unique camelCase `name` and a human `label`. Add `help` or `placeholder` where it helps the user.
3. Validation is a pipe string of FormKit rules: `"required|email"`, `"required|length:8,64"`, `"required|confirm"`. For a checkbox or switch that must be on, use `accepted`, not `required`.
4. Conditional fields: `"if": "$get(plan).value === 'pro'"`. `$get()` finds a field by its **`id`**, not its `name`, so the field it reads needs an `id` (use the same string as its `name`). `&&`, `||`, `===` and `!==` work. There is no unary `!`: write `!== true`, not `=== false`, because an untouched checkbox or switch is `undefined`, not `false`, unless you give it `"value": false`.
5. Inside a repeater row, read a sibling field with `$node.value.<field>` instead of `$get()`.
6. Choice fields: `nuxtUIRadioGroup` for one of a few options, `nuxtUICheckboxGroup` for several of a few, `nuxtUISelect` for one of many, `nuxtUISelectMenu` with `"multiple": true` for several of many. Options are strings or `{ "label": "...", "value": "..." }`; prefer the object form with a stable camelCase `value`.
7. Dates: `nuxtUIInputDate` with `"valueType": "iso"` so the value is a plain string.
8. Sliders and rating inputs always have a value: give a sensible default with `"value"`.
9. Layout: a `$el` heading per section, and short fields side by side in a grid wrapper: `{ "$el": "div", "attrs": { "class": "grid grid-cols-1 sm:grid-cols-2 gap-4" }, "children": [ ...fields ] }`.
10. Repeaters (`nuxtUIRepeater`) are bare by default. Always set these, otherwise the insert button disappears after the first row, the row buttons stack, and only the move buttons show:
    `"newItem": { ...every child name with an empty value }`, `"alwaysDisplayInsertButton": true`, `"displayDeleteButton": true`, `"displayCloneButton": true`, `"listClass": "grid gap-3"`, `"listItemClass": "flex items-start gap-2"`, `"buttonGroupClass": "mt-6 flex gap-1"`, `"insertButtonLabel": "Add <thing>"`, plus `minItems`/`maxItems` where they fit. Size the fields in a row with `"outerClass": "w-48"` (and `"class": "w-full"` on the field itself).
11. Wizards: one `nuxtUIMultiStep` (`"allowIncomplete": false`) whose `children` are `nuxtUIStep` nodes, each with a `name`, a `label` and its fields as `children`.
12. If the request is vague, make sensible choices rather than asking: group the fields into 2 to 4 sections, mark the essential ones `required`.
```

## Check the result

Never ship generated JSON unseen. Render it:

```vue
<script setup lang="ts">
const schema = [/* paste the generated array here */]
</script>

<template>
  <FUDataEdit :data="{}" :schema="schema" debug-data @data-saved="console.log($event)" />
</template>
```

The playground's **Playground** page (`/playground`) has a JSON editor that re-renders the form as you edit it, which is the quickest way to try a generated schema and tweak it. Then run through this list:

- **Every conditional field**: change the field it depends on and check that it appears and disappears. A condition that never matches shows no error; the field is just never there.
- **Repeaters**: add, copy, remove and reorder a few rows, and check the insert button is still there afterwards.
- **Validation**: submit the empty form and read the messages.
- **The data**: open *Debug Data* and check the keys and value types (dates as strings, switches as booleans).
- **A wizard**: press Next on an empty step; it should stay put.

## Mistakes the prompt prevents

These came from rendering generated forms or from [Known Limitations](/getting-started/known-limitations), and each has a rule in the prompt.

| Without the rule | What happens |
|---|---|
| `$get(userType)` on a field that has only a `name` | The condition never matches and the field is never shown, with no error. `$get()` resolves by `id` (rule 4). |
| A repeater without the display flags | The insert button vanishes after the first row, the row buttons stack vertically, and delete and copy are missing (rule 10). |
| `if: '!$value'` | Silently ignored; the expression language has no unary `!` (rule 4). |
| `$get()` inside a repeater row | Does not find the sibling field; use `$node.value.<field>` (rule 5). |
| `required` on a checkbox or switch | Passes when it is `false`; use `accepted` (rule 3). |
| A date field without `valueType` | The value is a `CalendarDate` object, which is not JSON (rule 7). |
| A made-up prop | May be ignored without a warning (rule 1). |

## What was tested

Five forms were generated by models that were given only the prompt and the docs folder, then rendered and exercised in the playground. The first four used an early draft of the prompt; the hotel form used the final one above.

| Request | Result |
|---|---|
| Support request, with a phone field shown for urgent priority | Rendered; the conditional appeared when *Urgent* was chosen |
| Conference registration, with in-person-only fields | Rendered; the conditional fields appeared for *In person* |
| Job application with a work-history repeater | Rendered, but with the first prompt the repeater had no insert button after the first row and stacked buttons. Rule 10 fixes that. |
| Customer feedback survey (a deliberately vague request) | Rendered, with sensible sections |
| Hotel booking, with a condition using `||` (second prompt version) | Rendered; the field appeared for *Family* and *Suite* and not for the other rooms |

The wizard and the repeater with a per-row condition were written by hand from the prompt's rules and the docs rather than generated by a model, and they rendered and behaved as described: a row's *End date* hid when that row's *Currently here* switch was on, and Next did nothing on an empty step.

This tests the prompt, not any particular model: results vary, which is why the checks above matter.

## An example

For the hotel request above, the generated schema was (unedited):

```json
[
  {
    "$el": "h2",
    "attrs": {
      "class": "text-xl font-semibold"
    },
    "children": [
      "Guest Details"
    ]
  },
  {
    "$formkit": "nuxtUIInput",
    "id": "guestName",
    "name": "guestName",
    "label": "Guest name",
    "placeholder": "Full name",
    "validation": "required"
  },
  {
    "$el": "div",
    "attrs": {
      "class": "grid grid-cols-1 sm:grid-cols-2 gap-4"
    },
    "children": [
      {
        "$formkit": "nuxtUIInput",
        "id": "email",
        "name": "email",
        "label": "Email",
        "inputType": "email",
        "placeholder": "you@example.com",
        "leadingIcon": "i-lucide-mail",
        "validation": "required|email"
      },
      {
        "$formkit": "nuxtUIInput",
        "id": "phone",
        "name": "phone",
        "label": "Phone",
        "inputType": "tel",
        "placeholder": "+1 555 123 4567",
        "leadingIcon": "i-lucide-phone",
        "validation": "required"
      }
    ]
  },
  {
    "$el": "h2",
    "attrs": {
      "class": "text-xl font-semibold mt-6"
    },
    "children": [
      "Stay"
    ]
  },
  {
    "$formkit": "nuxtUIRadioGroup",
    "id": "roomType",
    "name": "roomType",
    "label": "Room type",
    "options": [
      {
        "label": "Single",
        "value": "single"
      },
      {
        "label": "Double",
        "value": "double"
      },
      {
        "label": "Family",
        "value": "family"
      },
      {
        "label": "Suite",
        "value": "suite"
      }
    ],
    "validation": "required"
  },
  {
    "$el": "div",
    "attrs": {
      "class": "grid grid-cols-1 sm:grid-cols-2 gap-4"
    },
    "children": [
      {
        "$formkit": "nuxtUIInputDate",
        "id": "checkIn",
        "name": "checkIn",
        "label": "Check-in",
        "valueType": "iso",
        "validation": "required"
      },
      {
        "$formkit": "nuxtUIInputDate",
        "id": "checkOut",
        "name": "checkOut",
        "label": "Check-out",
        "valueType": "iso",
        "validation": "required"
      }
    ]
  },
  {
    "$formkit": "nuxtUIInputNumber",
    "id": "additionalGuests",
    "name": "additionalGuests",
    "label": "Additional guests",
    "min": 0,
    "max": 6,
    "step": 1,
    "value": 0,
    "if": "$get(roomType).value === 'family' || $get(roomType).value === 'suite'"
  },
  {
    "$el": "h2",
    "attrs": {
      "class": "text-xl font-semibold mt-6"
    },
    "children": [
      "Extras"
    ]
  },
  {
    "$formkit": "nuxtUISwitch",
    "id": "breakfast",
    "name": "breakfast",
    "label": "Include breakfast",
    "help": "Served daily from 7:00 to 10:30"
  },
  {
    "$formkit": "nuxtUITextarea",
    "id": "specialRequests",
    "name": "specialRequests",
    "label": "Special requests",
    "rows": 4,
    "autoresize": true,
    "placeholder": "Anything we should know?"
  }
]
```

## A skill for your coding assistant

The prompt above is for generating one form. If an assistant is working in your project more broadly (setting the module up, writing and fixing forms), give it the skill that ships with the package. It is a short list of the rules that are easy to get wrong and fail silently: registering the inputs, `$get()` needing an `id`, the bare repeater defaults, field widths, and a pointer to [`llms.txt`](https://sfxcode.github.io/nuxt-ui-formkit/llms.txt) for everything else.

Because it is installed with the package, it always matches the version you have. For Claude Code, copy it into your project's skills folder:

```bash
mkdir -p .claude/skills
cp -r node_modules/@sfxcode/nuxt-ui-formkit/skills/nuxt-ui-formkit .claude/skills/
```

Re-run the copy after you upgrade the module. For another assistant, the skill is plain Markdown (`skills/nuxt-ui-formkit/SKILL.md`): paste it into that tool's project instructions.

## Tips

- **Name the fields you care about.** A vague request ("a feedback survey") gets sensible defaults; a precise one gets what you asked for.
- **Say which fields are conditional**, and what they depend on, in the request.
- **Keep the docs attached in follow-up messages**, or the assistant may fall back on guesses.
- **Treat the output as a draft.** The prompt makes the schema valid, not right for your product: check the labels, the validation and the data keys.

## Known gaps

- Date inputs keep their compact width inside a grid, next to full-width text fields. See [Styling](/getting-started/styling).
- Whether a field hidden by `if` keeps a value in the data is not documented; check *Debug Data* if it matters to you.
- There is no cross-field rule such as "check-out after check-in" in a JSON schema.
