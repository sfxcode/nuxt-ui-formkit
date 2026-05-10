import type { FormKitNode, FormKitTypeDefinition } from '@formkit/core'
import { createInput } from '@formkit/vue'
import { useFormKitSchema } from '../../composables/useFormKitSchema'

const { addList, addElement, addListGroup, addComponent, addElementsInOuterDiv } = useFormKitSchema()

function addActionButtons(innerClass: string = '', outerClass: string = '', label: string, help: string = '', render: string = 'true') {
  const addButtonComponent = (onClick: string = '', icon: string = '', color: string = '', render: string = 'true', disabled: 'false'): object => {
    return addComponent('UButton', { onClick, icon, color, disabled }, render)
  }

  return addElementsInOuterDiv([
    addButtonComponent('$removeNode($node.parent, $index)', 'i-lucide-x', 'error'),
    addButtonComponent('$cloneNode($node.parent, $index)', 'i-lucide-copy', 'secondary', '$displayCloneButton'),
    addButtonComponent('$moveNodeDown($node.parent, $index)', 'i-lucide-arrow-down', 'primary', 'true', '$index === $node.parent.value.length -1'),
    addButtonComponent('$moveNodeUp($node.parent, $index)', 'i-lucide-arrow-up', 'primary', 'true', '$index === 0'),
  ], innerClass, outerClass, label, help, render)
}

function addInsertButton(label: string = 'Add Item', icon: string = 'i-lucide-plus', styleClass: string = '', render: string = 'true') {
  return addElement('div', [
    addComponent('UButton', { onClick: '$addNode($node)', label, icon }),
  ], { class: styleClass }, render)
}

export const nuxtUIRepeaterDefinition: FormKitTypeDefinition = createInput(
  [
    addElement('div', [
      addList('$listName', [
        addInsertButton('$addButtonLabel', 'i-lucide-plus', '$addButtonClass', '$node.children.length == 0 || $alwaysDisplayAddButton'),
        addListGroup([
          addElement('div', [
            {
              children: '$slots.default',
            },
            addActionButtons('$buttonsInnerClass', '$buttonsOuterClass', '$buttonsLabel'),
          ], { class: '$itemClass' }),

        ]),
      ], true, 'true'),
    ], { class: '$listClass' }),

  ],
  {
    props: ['buttonsOuterClass', 'buttonsInnerClass', 'buttonsLabel', 'addButtonLabel', 'addButtonClass', 'newItem', 'itemClass', 'listClass', 'displayCloneButton', 'alwaysDisplayAddButton'],
    features: [addRepeaterHandler],
  },
)

function addRepeaterHandler(node: FormKitNode): void {
  const swapElements = (array: any[], index1: number, index2: number) => {
    const newArray = [...array]
    const temp = newArray[index1]
    newArray[index1] = newArray[index2]
    newArray[index2] = temp
    return newArray
  }
  node.on('created', () => {
    node.context.listName = node.name

    node.context.removeNode = (parentNode: FormKitNode, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        parentNode.input(parentNode._value.filter((_: any, i: number): boolean => i !== index), false)
      }
    }
    node.context.addNode = (parentNode: any) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const newArray: any[] = [...parentNode.value, node.context.newItem || {}]
        parentNode.input(newArray, false)
      }
    }
    node.context.cloneNode = (parentNode: any, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const item: any = parentNode.value[index]
        const newArray: any[] = [...parentNode.value.slice(0, index), { ...item }, ...parentNode.value.slice(index)]
        parentNode.input([...newArray], false)
      }
    }
    node.context.moveNodeUp = (parentNode: any, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const array: any[] = [...parentNode.value]
        if (index > 0)
          parentNode.input(swapElements(array, index - 1, index), false)
      }
    }
    node.context.moveNodeDown = (parentNode: any, index: number) => (): void => {
      if (parentNode && parentNode._value instanceof Array) {
        const array: any[] = [...parentNode.value]
        if (index < array.length - 1)
          parentNode.input(swapElements(array, index, index + 1), false)
      }
    }
  })
}
