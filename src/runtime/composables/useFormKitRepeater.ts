import type { FormKitNode } from '@formkit/core'
import { useFormKitSchema } from './useFormKitSchema'

export function useFormKitRepeater() {
  const { addElement, addComponent, addElementsInOuterDiv } = useFormKitSchema()

  function addInsertButton(label: string = 'Add', innerClass: string = '', outerClass: string = '', buttonClass: string = 'p-button-sm', iconClass: string = 'pi pi-plus') {
    return addElementsInOuterDiv([
      addComponent('Button', { onClick: '$addNode($node.parent)', label, class: buttonClass, icon: iconClass }, '$node.parent.value.length == 0'),
    ], innerClass, outerClass)
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
      const newArray: unknown[] = [...(parentNode.value as unknown[]), { ...(obj as object) }]
      parentNode.input(newArray, false)
    }
  }

  function addGroupButtons(innerClass: string = '', outerClass: string = 'col-4', label: string = 'Actions', help: string = '', render: string = 'true') {
    const addButtonComponent = (onClick: string = '', label: string = '', icon: string = '', severity: string = '', render: string = 'true', styleClass: string = 'p-button-sm'): object => {
      return addComponent('Button', { onClick, label, icon, class: styleClass, severity }, render)
    }

    return addElementsInOuterDiv([
      addButtonComponent('$removeNode($node.parent, $index)', '', 'pi pi-times', 'danger'),
      addButtonComponent('$copyNode($node.parent, $index)', '', 'pi pi-plus'),
      addButtonComponent('$moveNodeUp($node.parent, $index)', '', 'pi pi-arrow-up', 'secondary', '$index != 0'),
      addElement('span', [], { class: 'p-space' }, '$index == 0'),
      addButtonComponent('$moveNodeDown($node.parent, $index)', '', 'pi pi-arrow-down', 'secondary', '$index < $node.parent.value.length -1'),
      addElement('span', [], { class: 'p-space' }, '$index == $node.parent.value.length -1'),
    ], `p-action-buttons ${innerClass}`, outerClass, label, help, render)
  }

  return { addInsertButton, addGroupButtons, addListGroupFunctions }
}
