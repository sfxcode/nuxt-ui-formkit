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

export const nuxtUIRepeaterDefinition: FormKitTypeDefinition = createInput(
  addElement('ul', [
    addList('$listName', [
      addInsertButton('$insertButtonLabel', 'i-lucide-plus', '$insertButtonClass', '$insertButtonSize', '$node.children.length == 0 || $alwaysDisplayInsertButton'),
      addListGroup([
        addElement('li', [{ children: '$slots.default' }, addButtonGroup('$buttonGroupClass', '$buttonGroupItemClass', '$buttonSize', '$renderButtons')],
          { class: '$internalListItemClass' })], true, {}),
    ], true, 'true'),
  ], { class: '$internalListClass' }, true),
  {
    props: ['insertButtonLabel', 'insertButtonClass', 'insertButtonSize', 'alwaysDisplayInsertButton', 'newItem', 'listClass', 'listItemClass',
      'hideButtonGroup', 'hideMoveButtons', 'buttonGroupClass', 'buttonGroupItemClass', 'buttonSize', 'displayCloneButton', 'displayAddButton', 'displayDeleteButton',
      'minItems', 'maxItems'],
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

  node.on('created', () => {
    node.context.listName = node.name
    node.context.renderButtons = !node.context.hideButtonGroup
    node.context.insertButtonSize = node.context.insertButtonSize ? node.context.insertButtonSize : 'md'
    node.context.buttonSize = node.context.buttonSize ? node.context.buttonSize : 'md'
    node.context.renderMoveButtons = !node.context.hideMoveButtons
    node.context.internalListClass = node.context.listClass ? `formkit-items ${node.context.listClass}` : 'formkit-items'
    node.context.internalListItemClass = node.context.listItemClass ? `formkit-item ${node.context.listItemClass}` : 'formkit-item'
    node.context.minItems = node.context.minItems !== undefined ? node.context.minItems : 0
    node.context.maxItems = node.context.maxItems !== undefined ? node.context.maxItems : Number.POSITIVE_INFINITY

    node.context.insertNode = (parentNode: FormKitNode) => (): void => {
      if (parentNode && Array.isArray(parentNode._value)) {
        const item: object = node.context.newItem ? { ...node.context.newItem } : {}
        const array: object[] = parentNode.value
        array.push(item)
        parentNode.input(array, false)
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
        const item: object = node.context.newItem ? { ...node.context.newItem } : {}
        array.splice(index + 1, 0, item)
        parentNode.input(array, false)
      }
    }
    node.context.cloneNode = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && Array.isArray(parentNode._value)) {
        const item: object = parentNode.value[index]
        const array: object[] = parentNode.value
        array.splice(index + 1, 0, item)
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
  })
}
