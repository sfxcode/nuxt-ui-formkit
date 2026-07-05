import type { FormKitNode, FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'
import { useFormKitSchema } from '../../composables/useFormKitSchema'

const { addList, addElement, addListGroup, addComponent } = useFormKitSchema()

function addButtonGroup(buttonGroupClass: string = '', buttonGroupItemClass: string = '', buttonSize: string, render: string = 'true') {
  const addActionButtonComponent = (onClick: string = '', icon: string = '', color: string = '', render: string = 'true', disabled: string = 'false'): object => {
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
          { children: '$slots.default' },
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
    ], true, 'true', { value: '$value' }),
  ], { class: '$internalListClass', id: '$internalListId' }, true),
  {
    props: ['insertButtonLabel', 'insertButtonClass', 'insertButtonSize', 'alwaysDisplayInsertButton', 'newItem', 'listClass', 'listItemClass',
      'hideButtonGroup', 'hideMoveButtons', 'buttonGroupClass', 'buttonGroupItemClass', 'buttonSize', 'displayCloneButton', 'displayAddButton', 'displayDeleteButton',
      'minItems', 'maxItems', 'draggable', 'displayDragHandle', 'dragHandleClass', 'dragHandleIconName'],
    features: [addRepeaterHandler],
  },
)

function addRepeaterHandler(node: FormKitNode): void {
  const swapElements = <T>(array: T[], index1: number, index2: number): T[] => {
    const [element] = array.splice(index1, 1)
    if (element !== undefined) {
      array.splice(index2, 0, element)
    }
    return array
  }

  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)

  node.on('created', () => {
    if (node.context) {
      let dragStartIndex: number | null = null
      let dragOverIndex: number | null = null
      const newItem = node.context.newItem || {}

      node.context.listName = node.name
      node.context.renderButtons = !node.context.hideButtonGroup
      node.context.insertButtonSize = node.context.insertButtonSize ? node.context.insertButtonSize : 'md'
      node.context.buttonSize = node.context.buttonSize ? node.context.buttonSize : 'md'
      node.context.renderMoveButtons = !node.context.hideMoveButtons
      node.context.draggable = !!node.context.draggable
      node.context.renderDragHandle = !!node.context.displayDragHandle
      node.context.dragHandleIconName = node.context.dragHandleIconName || 'i-lucide-grip-vertical'
      node.context.internalDragHandleClass = node.context.dragHandleClass ? `formkit-repeater-drag-handle ${node.context.dragHandleClass}` : 'formkit-repeater-drag-handle'
      node.context.internalListClass = node.context.listClass ? `formkit-items ${node.context.listClass}` : 'formkit-items'
      node.context.internalListItemClass = node.context.listItemClass ? `formkit-item ${node.context.listItemClass}` : 'formkit-item'
      node.context.internalListId = `formkit-items-${uuid}`
      node.context.minItems = node.context.minItems !== undefined ? node.context.minItems : 0
      node.context.maxItems = node.context.maxItems !== undefined ? node.context.maxItems : Number.POSITIVE_INFINITY

      node.context.getListItemClass = (index: number): string => {
        if (dragOverIndex === index && dragStartIndex !== index)
          return `${node.context?.internalListItemClass} formkit-repeater-drop-target`
        return node.context?.internalListItemClass?.toString() ?? ''
      }

      node.context.getListItemId = (index: number): string => {
        return `formkit-item-${index}-${uuid}`
      }

      node.context.insertNode = (parentNode: FormKitNode) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          const newArray: object[] = [{ ...newItem }, ...parentNode.value]
          parentNode.input(newArray, false)
        }
      }
      node.context.removeNode = (parentNode: FormKitNode, index: number) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          parentNode.input(parentNode._value.filter((_: object, i: number): boolean => i !== index), false)
        }
      }
      node.context.addNode = (parentNode: FormKitNode, index: number) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          const array: object[] = parentNode.value
          array.splice(index + 1, 0, { ...newItem })
          parentNode.input(array, false)
        }
      }
      node.context.cloneNode = (parentNode: FormKitNode, index: number) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          const item: object = parentNode.value[index]
          const array: object[] = parentNode.value
          array.splice(index + 1, 0, { ...item })
          parentNode.input(array, false)
        }
      }
      node.context.moveNodeUp = (parentNode: FormKitNode, index: number) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          if (index > 0)
            parentNode.input(swapElements(parentNode.value, index - 1, index), false)
        }
      }
      node.context.moveNodeDown = (parentNode: FormKitNode, index: number) => (): void => {
        if (parentNode && Array.isArray(parentNode._value)) {
          if (index < parentNode.value.length - 1)
            parentNode.input(swapElements(parentNode.value, index, index + 1), false)
        }
      }
      node.context.dragNodeStart = (_parentNode: FormKitNode, index: number) => (event?: DragEvent): void => {
        dragStartIndex = index
        if (event?.dataTransfer) {
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData('text/plain', String(index))
        }
      }
      node.context.dragNodeOver = (targetIndex: number) => (event?: DragEvent): void => {
        event?.preventDefault()
        dragOverIndex = targetIndex
        if (event?.dataTransfer)
          event.dataTransfer.dropEffect = 'move'
      }
      node.context.dragNodeLeave = (targetIndex: number) => (): void => {
        if (dragOverIndex === targetIndex)
          dragOverIndex = null
      }
      node.context.dropNode = (parentNode: FormKitNode, targetIndex: number) => (event?: DragEvent): void => {
        event?.preventDefault()
        if (!parentNode || !Array.isArray(parentNode._value)) {
          dragOverIndex = null
          return
        }

        const sourceFromEvent = Number.parseInt(event?.dataTransfer?.getData('text/plain') || '', 10)
        const sourceIndex = Number.isInteger(sourceFromEvent) ? sourceFromEvent : dragStartIndex

        if (sourceIndex === null || sourceIndex === targetIndex) {
          dragOverIndex = null
          return
        }
        if (sourceIndex < 0 || sourceIndex >= parentNode.value.length) {
          dragOverIndex = null
          return
        }

        parentNode.input(swapElements(parentNode.value, sourceIndex, targetIndex), false)
        dragStartIndex = null
        dragOverIndex = null
      }
      node.context.dragNodeEnd = (): void => {
        dragStartIndex = null
        dragOverIndex = null
      }
    }
  })
}
