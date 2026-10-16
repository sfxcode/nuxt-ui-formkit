# Server-Side Rendering

The module works on a server-rendered page: every input and output type renders on the server and hydrates without a warning. This is checked, not assumed - the playground is loaded with server rendering on, in `nuxi dev` and in a production build, with the server and the browser deliberately in time zones 26 hours apart, and it fails on any hydration warning, console error, Vue warning or error in the server log (`npm run test:e2e:ssr` in the repository).

Server rendering is off in the playground by default; set `PLAYGROUND_SSR=true` to turn it on.

## What the server renders

| | On the server | After hydration |
|---|---|---|
| Field chrome (label, help text, messages) | rendered | unchanged |
| Every input and output type | rendered | unchanged |
| `nuxtUIEditor` | label and help text only | the editor, its toolbar and its content |
| `nuxtUIMultiStep` / `nuxtUIStep` | the step panels and their fields; **not the tab strip** | the tab strip |
| `FUDataEdit` `autosave` | the form, without a draft | a stored draft is restored into the inputs |
| Date and calendar fields | the day in the **server's** time zone | the day in the **browser's** time zone |

None of these cause a hydration mismatch. The rows that differ before and after hydration are described below.

## The editor

`UEditor` is built in the browser, so the server leaves the editor's place empty and it appears after hydration. The content below an editor therefore moves down when it mounts (about 73px in the default theme). If that matters on your page, reserve the space with a minimum height on the field:

```ts
{ $formkit: 'nuxtUIEditor', name: 'body', label: 'Body', outerClass: 'min-h-[113px]' }
```

## Multi-step forms

The step panels and the fields in them are server-rendered, so the form is readable without JavaScript, but the tab strip is built in the browser. It appears right after hydration.

## Date and calendar fields

A JavaScript `Date` or an ISO string with a time zone is an instant, not a calendar day: which day it shows depends on the zone it is shown in, and the server cannot know the browser's. So the server renders the day in its own zone, the browser hydrates with the same zone, and the field switches to the browser's own zone right after mount. A visitor in another zone sees the day change once, immediately after the page loads - there is no hydration mismatch, and the form value is not changed by it.

To show the same day everywhere, give the field an explicit zone, which is never switched:

```ts
{ $formkit: 'nuxtUIInputDate', name: 'start', label: 'Start', valueType: 'date', timeZone: 'UTC' }
```

A calendar with no value is centred on today in the same zone, so it follows the same rule. A calendar or date field holding a plain day (`'2026-07-05'` or a `CalendarDate`) has no zone and is never affected.

::: warning Build dates from ISO strings or `Date.UTC`, not from local parts
In a page that is server-rendered, the page's script runs twice - on the server and in the browser. `new Date(2026, 6, 5)` is *local* midnight, so it is a different instant in each place, and the field will hydrate with a different day. Use `new Date(Date.UTC(2026, 6, 5, 12))`, an ISO string, or a `CalendarDate`.
:::

## Overlays

`useFormKitOverlay().edit()` and `.auto()` need a user to answer them, so they cannot run on the server: the promise would never settle and an `await` in an async `setup` would hang the request. They throw an error that says so. Call them from an event handler or `onMounted`; creating the composable itself is safe anywhere.

## Autosave

`autosave` needs no special handling. On the server the plugin does nothing; in the browser it restores a stored draft after hydration, so the first render matches the server's and the draft appears as an ordinary update.

## Checking your own app

Vue only compares attributes during hydration in a **development** build; a production build silently keeps whatever the server rendered. So check for hydration warnings with `nuxi dev`, where `Hydration attribute mismatch` and `Hydration text mismatch` are reported. If you add a page to the playground it is covered automatically.
