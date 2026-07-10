import type { FormKitSchemaNode, FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'
import { useFormKitRepeater } from '../../composables/useFormKitRepeater'
import { useFormKitSchema } from '../../composables/useFormKitSchema'

const { addList, addElement, addListGroup, addComponent } = useFormKitSchema()
const { addRepeaterHandler } = useFormKitRepeater()

function addButtonGroup(buttonGroupClass: string = '', buttonGroupItemClass: string = '', buttonSize: string, render: string = 'true') {
  const addActionButtonComponent = (onClick: string = '', icon: string = '', color: string = '', render: string = 'true', disabled: string = 'false'): FormKitSchemaNode => {
    return addElement('div', [addComponent('UButton', { onClick, icon, color, disabled, size: buttonSize })], { class: buttonGroupItemClass }, render)
  }

  return addElement('div', [
    addActionButtonComponent('$moveNodeUp($node.parent, $index)', 'i-lucide-arrow-up', 'primary', '$renderMoveButtons', '$index === 0'),
    addActionButtonComponent('$removeNode($node.parent, $index)', 'i-lucide-trash', 'error', '$displayDeleteButton', '$node.parent.value.length === $minItems'),
    addActionButtonComponent('$cloneNode($node.parent, $index)', 'i-lucide-copy', 'secondary', '$displayCloneButton', '$node.parent.value.length > $maxItems -1'),
    addActionButtonComponent('$addNode($node.parent, $index)', 'i-lucide-plus', 'secondary', '$displayAddButton', '$node.parent.value.length > $maxItems -1'),
    addActionButtonComponent('$moveNodeDown($node.parent, $index)', 'i-lucide-arrow-down', 'primary', '$renderMoveButtons', '$index === $node.parent.value.length -1'),
  ], { class: buttonGroupClass }, render)
}

function addInsertButton(label: string = 'Add Item', icon: string = 'i-lucide-plus', styleClass: string = '', buttonSize: string, render: string = 'true') {
  return addElement('div', [
    addComponent('UButton', { onClick: '$insertNode($node)', label, icon, size: buttonSize, disabled: '$node.value.length > $maxItems -1' }),
  ], { class: styleClass }, render)
}

function addDragHandle(handleClass: string = '', iconName: string = '', render: string = 'true') {
  return addElement('span', [
    addComponent('UIcon', { name: iconName }),
  ], {
    'class': handleClass,
    'aria-label': 'Drag to reorder',
  }, render)
}

export const nuxtUIRepeaterDefinition: FormKitTypeDefinition = createInput(
  addElement('div', [
    // The nested `list` node below shares its name with this outer `input`-type
    // node but is otherwise a distinct FormKitNode. Without an explicit
    // `value: '$value'` binding it never inherits the outer node's value, so
    // its own `_value` stays non-array — which breaks not just rendering
    // pre-populated items but also every button here (insert/remove/move all
    // guard on `Array.isArray(parentNode._value)` and silently no-op
    // otherwise), making the whole repeater look inert until this is set.
    addList('$listName', [
      addInsertButton('$insertButtonLabel', 'i-lucide-plus', '$insertButtonClass', '$insertButtonSize', '$node.children.length == 0 || $alwaysDisplayInsertButton'),
      addListGroup([
        addElement('div', [
          addDragHandle('$internalDragHandleClass', '$dragHandleIconName', '$renderDragHandle'),
          // A bare `{ children }` node (no `$el`/`$cmp`/`$formkit` discriminant)
          // is not representable by `FormKitSchemaNode`'s own type, but
          // FormKit's schema compiler accepts it at runtime as a slot
          // passthrough - cast rather than widen the shared `FormKitSchemaNode` type.
          { children: '$slots.default' } as FormKitSchemaNode,
          addButtonGroup('$buttonGroupClass', '$buttonGroupItemClass', '$buttonSize', '$renderButtons'),
        ], {
          id: '$getListItemId($index)',
          class: '$getListItemClass($index)',
          draggable: '$draggable',
          onDragstart: '$dragNodeStart($node.parent, $index)',
          onDragover: '$dragNodeOver($index)',
          onDragleave: '$dragNodeLeave($index)',
          onDrop: '$dropNode($node.parent, $index)',
          onDragend: '$dragNodeEnd',
        }),
      ], true, {}),
    ], true, 'true', { value: '$value', validation: '$repeaterValidation' }),
  ], { class: '$internalListClass', id: '$internalListId' }, true),
  {
    props: ['insertButtonLabel', 'insertButtonClass', 'insertButtonSize', 'alwaysDisplayInsertButton', 'newItem', 'listClass', 'listItemClass',
      'hideButtonGroup', 'hideMoveButtons', 'buttonGroupClass', 'buttonGroupItemClass', 'buttonSize', 'displayCloneButton', 'displayAddButton', 'displayDeleteButton',
      'minItems', 'maxItems', 'draggable', 'displayDragHandle', 'dragHandleClass', 'dragHandleIconName'],
    features: [addRepeaterHandler],
  },
)
