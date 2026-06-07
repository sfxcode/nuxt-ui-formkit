# Repeater Drag & Drop Configuration

The repeater component supports drag-and-drop functionality with visual drag handles. These features are controlled through separate properties for maximum flexibility.

## Properties

### `draggable` (Boolean)
Controls whether repeater items can be dragged and dropped to reorder them.

- **Type**: `Boolean`
- **Default**: `false`
- **Usage**: Set to `true` to enable drag-and-drop reordering

```typescript
{
  $formkit: 'nuxtUIRepeater',
  draggable: true, // Enable drag-and-drop functionality
  // ... other props
}
```

### `displayDragHandle` (Boolean, Optional)
Controls whether a visual drag handle icon is displayed for each item.

- **Type**: `Boolean`
- **Default**: `false`
- **Usage**: Set to `true` to show a visual drag handle indicator

```typescript
{
  $formkit: 'nuxtUIRepeater',
  displayDragHandle: true, // Show visual drag handle
  // ... other props
}
```

### `dragHandleIconName` (String, Optional)
Customizes the icon used for the drag handle.

- **Type**: `String`
- **Default**: `'i-lucide-grip-vertical'`
- **Usage**: Provide any valid Nuxt UI icon name

```typescript
{
  $formkit: 'nuxtUIRepeater',
  displayDragHandle: true,
  dragHandleIconName: 'i-lucide-grip-horizontal', // Custom drag icon
  // ... other props
}
```

### `dragHandleClass` (String, Optional)
Adds custom CSS classes to the drag handle wrapper.

- **Type**: `String`
- **Default**: `'formkit-repeater-drag-handle'` (always applied)
- **Usage**: Provide additional CSS classes for styling

```typescript
{
  $formkit: 'nuxtUIRepeater',
  displayDragHandle: true,
  dragHandleClass: 'my-custom-handle-class',
  // ... other props
}
```

## Usage Examples

### Drag-and-Drop with Visual Handle
```typescript
{
  $formkit: 'nuxtUIRepeater',
  name: 'items',
  draggable: true,
  displayDragHandle: true,
  dragHandleIconName: 'i-lucide-grip-vertical',
  children: [
    // ... item fields
  ]
}
```

### Drag-and-Drop without Visual Handle
Items are draggable by clicking anywhere on the item.

```typescript
{
  $formkit: 'nuxtUIRepeater',
  name: 'items',
  draggable: true,
  displayDragHandle: false, // or omit this property
  children: [
    // ... item fields
  ]
}
```

### Visual Handle Only (No Drag Functionality)
Display a handle for visual indication without enabling drag functionality.

```typescript
{
  $formkit: 'nuxtUIRepeater',
  name: 'items',
  draggable: false, // or omit this property
  displayDragHandle: true,
  children: [
    // ... item fields
  ]
}
```

### No Drag Functionality (Default)
```typescript
{
  $formkit: 'nuxtUIRepeater',
  name: 'items',
  // draggable defaults to false
  // displayDragHandle defaults to false
  children: [
    // ... item fields
  ]
}
```

## Key Differences

| Property | Controls | Default |
|----------|----------|---------|
| `draggable` | Whether items can be dragged/reordered | `false` |
| `displayDragHandle` | Whether to show visual drag handle icon | `false` |

**Important**: These properties are independent:
- You can enable `draggable` without showing a handle (entire item is draggable)
- You can show a handle without enabling drag functionality (visual only)
- Both must be `true` for the typical drag-and-drop with handle experience

## Technical Notes

- The drag handle uses Nuxt UI's `UIcon` component for consistent icon rendering
- Drag functionality is implemented using native HTML5 drag-and-drop events
- The `draggable` attribute on DOM elements is controlled by the `draggable` property, not `displayDragHandle`

