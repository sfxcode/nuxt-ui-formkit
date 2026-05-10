import type { FormKitNode, FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'
import { useFormKitSchema } from '../../composables/useFormKitSchema'

const { addList, addElement, addListGroup, addComponent } = useFormKitSchema()

function addButtonGroup(buttonGroupClass: string = '', buttonGroupItemClass: string = '', buttonSize: string, render: string = 'true') {
  const addActionButtonComponent = (onClick: string = '', icon: string = '', color: string = '', render: string = 'true', disabled: 'false'): object => {
    return addElement('div', [addComponent('UButton', { onClick, icon, color, disabled, size: buttonSize })], { class: buttonGroupItemClass }, render)
  }

  return addElement('div', [
    addActionButtonComponent('$moveNodeUp($node.parent, $index)', 'i-lucide-arrow-up', 'primary', '$renderMoveButtons', '$index === 0'),
    addActionButtonComponent('$removeNode($node.parent, $index)', 'i-lucide-trash', 'error', '$displayDeleteButton'),
    addActionButtonComponent('$cloneNode($node.parent, $index)', 'i-lucide-copy', 'secondary', '$displayCloneButton'),
    addActionButtonComponent('$addNode($node.parent, $index)', 'i-lucide-plus', 'secondary', '$displayAddButton'),
    addActionButtonComponent('$moveNodeDown($node.parent, $index)', 'i-lucide-arrow-down', 'primary', '$renderMoveButtons', '$index === $node.parent.value.length -1'),
  ], { class: buttonGroupClass }, render)
}

function addInsertButton(label: string = 'Add Item', icon: string = 'i-lucide-plus', styleClass: string = '', buttonSize: string, render: string = 'true') {
  return addElement('div', [
    addComponent('UButton', { onClick: '$insertNode($node)', label, icon, size: buttonSize }),
  ], { class: styleClass }, render)
}

export const nuxtUIRepeaterDefinition: FormKitTypeDefinition = createInput(
  [
    addElement('div', [
      addList('$listName', [
        addInsertButton('$insertButtonLabel', 'i-lucide-plus', '$insertButtonClass', '$insertButtonSize', '$node.children.length == 0 || $alwaysDisplayInsertButton'),
        addListGroup([
          addElement('div', [
            addElement('div', [{ children: '$slots.default' }], { class: '$groupClass' }),
            addButtonGroup('$buttonGroupClass', '$buttonGroupItemClass', '$buttonSize', '$renderButtons'),
          ], { class: '$listItemClass' }),
        ],
        ),
      ], true, 'true'),
    ], { class: '$listClass' }),

  ],
  {
    props: ['insertButtonLabel', 'insertButtonClass', 'insertButtonSize', 'alwaysDisplayInsertButton', 'newItem', 'listClass', 'listItemClass', 'groupClass',
      'hideButtonGroup', 'hideMoveButtons', 'buttonGroupClass', 'buttonGroupItemClass', 'buttonSize', 'displayCloneButton', 'displayAddButton', 'displayDeleteButton'],
    features: [addRepeaterHandler],
  },
)

function addRepeaterHandler(node: FormKitNode): void {
  const swapElements = (array: unknown[], index1: number, index2: number) => {
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp
    return newArray
  }
  node.on('created', () => {
    node.context.listName = node.name
    node.context.renderButtons = !node.context.hideButtonGroup
    node.context.insertButtonSize = node.context.insertButtonSize ? node.context.insertButtonSize : 'md'
    node.context.buttonSize = node.context.buttonSize ? node.context.buttonSize : 'md'
    node.context.renderMoveButtons = !node.context.hideMoveButtons

    node.context.insertNode = (parentNode: FormKitNode) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const item: unknown = node.context.newItem ? { ...node.context.newItem } : {}
        const newArray: unknown[] = [item, ...parentNode.value]
        parentNode.input(newArray, false)
      }
    }
    node.context.removeNode = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        parentNode.input(parentNode._value.filter((_: unknown, i: number): boolean => i !== index), false)
      }
    }
    node.context.addNode = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const item: unknown = node.context.newItem ? { ...node.context.newItem } : {}
        const newArray: unknown[] = [...parentNode.value.slice(0, index + 1), { ...item }, ...parentNode.value.slice(index + 1)]
        parentNode.input([...newArray], false)
      }
    }
    node.context.cloneNode = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const item: unknown = parentNode.value[index]
        const newArray: unknown[] = [...parentNode.value.slice(0, index + 1), { ...item }, ...parentNode.value.slice(index + 1)]
        parentNode.input([...newArray], false)
      }
    }
    node.context.moveNodeUp = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const array: unknown[] = [...parentNode.value]
        if (index > 0)
          parentNode.input(swapElements(array, index - 1, index), false)
      }
    }
    node.context.moveNodeDown = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const array: unknown[] = [...parentNode.value]
        if (index < array.length - 1)
          parentNode.input(swapElements(array, index, index + 1), false)
      }
    }
  })
}
