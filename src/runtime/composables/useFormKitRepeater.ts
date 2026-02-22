import type { FormKitNode } from '@formkit/core'
import { useFormKitSchema } from './useFormKitSchema'

export function useFormKitRepeater() {
  const { addComponent, addElement, addElementsInOuterDiv } = useFormKitSchema()

  function addInsertButton(label: string = 'Add Item', icon: string = 'i-lucide-plus', styleClass: string = '', render: string = '$node.children.length == 0') {
    return addElement('div', [
      addComponent('UButton', { onClick: '$addNode($node)', label, icon }),
    ], { class: styleClass }, render)
  }

  function addListGroupFunctions(data: Record<string, unknown>, addNodeDefaultObject: object = {}) {
    // Swap elements immutably
    const swapElements = <T>(array: T[], index1: number, index2: number): T[] => {
      const newArray = [...array]
      const temp = newArray[index1]!
      newArray[index1] = newArray[index2]!
      newArray[index2] = temp
      return newArray
    }

    data.addNode = (parentNode: FormKitNode) => (): void => {
      const newArray: unknown[] = [...(parentNode.value as unknown[]), addNodeDefaultObject]
      parentNode.input(newArray, false)
    }
    data.removeNode = (parentNode: FormKitNode, index: number) => (): void => {
      parentNode.input((parentNode._value as unknown[]).filter((_: unknown, i: number): boolean => i !== index), false)
    }
    data.moveNodeUp = (parentNode: FormKitNode, index: number) => (): void => {
      const array: unknown[] = [...(parentNode.value as unknown[])]
      if (index > 0)
        parentNode.input(swapElements(array, index - 1, index), false)
    }
    data.moveNodeDown = (parentNode: FormKitNode, index: number) => (): void => {
      const array: unknown[] = [...(parentNode.value as unknown[])]
      if (index < array.length - 1)
        parentNode.input(swapElements(array, index, index + 1), false)
    }
    data.copyNode = (parentNode: FormKitNode, index: number) => (): void => {
      const obj: unknown = (parentNode.value as unknown[])[index]
      const array: unknown[] = [...(parentNode.value as unknown[])]
      array.splice(index + 1, 0, { ...(obj as object) })
      parentNode.input(array, false)
    }
  }

  function addGroupButtons(innerClass: string = '', outerClass: string = '', label: string = '', help: string = '', render: string = 'true') {
    const addButtonComponent = (onClick: string = '', icon: string = '', color: string = '', render: string = 'true'): object => {
      return addComponent('UButton', { onClick, icon, color }, render)
    }

    return addElementsInOuterDiv([
      addButtonComponent('$removeNode($node.parent, $index)', 'i-lucide-x', 'error'),
      addButtonComponent('$copyNode($node.parent, $index)', 'i-lucide-copy', 'secondary'),
      addButtonComponent('$moveNodeUp($node.parent, $index)', 'i-lucide-arrow-up', 'primary', '$index != 0'),
      addButtonComponent('$moveNodeDown($node.parent, $index)', 'i-lucide-arrow-down', 'primary', '$index < $node.parent.value.length -1'),
    ], innerClass, outerClass, label, help, render)
  }

  return { addInsertButton, addGroupButtons, addListGroupFunctions }
}
