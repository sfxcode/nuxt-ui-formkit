# Styling

The module renders Nuxt UI components inside FormKit's field chrome, so a field is styled in two places: the chrome around it, and the Nuxt UI component inside it. This page collects what works well, taken from the playground (`npm run dev`), which applies all of it.

## How a field is built

```
.formkit-outer            ← outerClass
  .formkit-wrapper
    label.formkit-label
    .formkit-inner        ← the Nuxt UI component sits here
    .formkit-help
    .formkit-messages
```

Two schema props decide where a class lands:

| Prop | Applies to |
|---|---|
| `outerClass` | the wrapper around the whole field (label, component, help, messages) |
| `class` | the Nuxt UI component itself |

Each `.formkit-outer` also carries `data-type` with the FormKit type name (`nuxtUIInput`, `nuxtUISlider`, ...). Use it to target one type in CSS. Two types keep the plain addons names: the wizard is `multi-step` and its panels are `step`.

## Field width

Nuxt UI inputs and selects size themselves to their content and do not stretch to their wrapper. In a wide form that leaves narrow fields, and in a grid it leaves gaps next to the column edge.

For one field, size the wrapper and make the field fill it:

```ts
{ $formkit: 'nuxtUIInput', name: 'title', label: 'Title', outerClass: 'w-64', class: 'w-full' }
```

`nuxtUISelect` and `nuxtUISelectMenu` add `w-fit min-w-48` to themselves only when you set no `class`, so setting `class: 'w-full'` also replaces that default.

### One rule for the whole app

To make every field fill its column, with a readable maximum, add this to your global CSS:

```css
@layer components {
  /* Every field fills its FormKit wrapper. */
  .formkit-inner > [data-slot='root'] {
    width: 100%;
  }

  /* Leaf fields stay readable in a wide form. Containers keep the full width. */
  :where(.formkit-outer:not(
    [data-type='nuxtUIRepeater'], [data-type='nuxtUIEditor'],
    [data-type='multi-step'], [data-type='step'], [data-type='group'], [data-type='list']
  )) {
    max-width: 32rem;
  }
}

/* Selects without their own `class` fill too (see above). */
@layer utilities {
  .formkit-inner > .w-fit.min-w-48 {
    width: 100%;
  }
}
```

Why it is written this way:

- **The `components` layer** sits below Tailwind's utilities, so a page that sets `w-48`, `w-full`, `flex-1` or `max-w-*` still wins over the default.
- **`:where()`** gives the cap zero specificity, so any `max-w-*` overrides it.
- **The container exemption** matters: without it the 32rem cap also narrows a repeater's rows or the wizard's tab strip.
- **The `utilities` rule** is the one place that has to beat a utility (`w-fit`). It only matches elements that have both `w-fit` and `min-w-48`, which is exactly the select family's own default, so a field with an explicit width is untouched.

::: tip Why this is not built in
Whether a field should fill its column or stay compact depends on your layout, so the module does not decide it for you. The same applies to the calendar, which fills its container by default - see [`nuxtUICalendar`](/components/inputs#nuxtuicalendar).
:::

## Colours: use theme tokens

Fixed palette classes such as `bg-gray-50 dark:bg-gray-800` look off against the Nuxt UI theme, especially in dark mode. Prefer the semantic tokens, which follow the theme and the colour mode:

| Instead of | Use |
|---|---|
| `border-gray-200 dark:border-gray-700` | `border-default` |
| `hover:border-gray-300` | `hover:border-accented` |
| `bg-gray-50 dark:bg-gray-800` | `bg-elevated/30` |
| `text-gray-400` | `text-muted` |

## Dark mode in scoped styles

In a Vue scoped style, `:deep(.dark .my-class)` never matches: `.dark` is on `<html>`, outside the component, so the rule needs a `.dark` ancestor that does not exist inside it. Do not write a separate `.dark` variant. Use a CSS variable that already changes with the mode:

```css
:deep(.formkit-repeater-drop-target) {
  border-color: var(--ui-primary);
  background-color: color-mix(in oklab, var(--ui-primary) 12%, transparent);
}
```

## Controls that overflow their box

Some Nuxt UI controls draw outside the box they occupy. The slider thumb is 16px tall on an 8px track, so it touches the label above and the help text below. Give the field room in CSS:

```css
.formkit-outer[data-type='nuxtUISlider'] .formkit-inner {
  padding-block: 0.5rem;
}
```

## Things beside a field

A label sits above its component, so anything placed next to a field in a row (a button, a drag handle, a remove icon) is aligned to the whole field, label included. Use `items-start` on the row and give the extra element a top margin that skips the label (`mt-6`), rather than `items-center`, which sits it too high.

## Repeaters

Item layout, button groups, nested repeaters, the drop-target highlight and animation have their own advice: see [Repeater - Styling Best Practices](/components/repeater#styling-best-practices).
