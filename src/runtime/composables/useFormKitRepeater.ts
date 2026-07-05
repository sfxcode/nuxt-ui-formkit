import type { FormKitNode } from '@formkit/core'

export function useFormKitRepeater() {
  function addRepeaterHandler(node: FormKitNode): void {
    const swapElements = <T>(array: T[], index1: number, index2: number): T[] => {
      const [element] = array.splice(index1, 1)
      if (element !== undefined) {
        array.splice(index2, 0, element)
      }
      return array
    }

    const uuid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)

    // The nested `list` node (see the comment in repeater.ts on the `addList(...)`
    // call) only ever receives this outer node's value one-way, via its schema
    // `value: '$value'` binding - it is NOT a real parent/child of this outer
    // node in FormKit's node graph (confirmed empirically: `provide(parentSymbol,
    // node)` only happens for non-'input'-type nodes, and this outer node's
    // type is 'input', so the schema-rendered list node never gets registered
    // as its child - `node.children` stays empty and nothing bubbles between
    // them). So there's no event to listen for; every mutation handler below
    // must explicitly propagate the new array to this outer node itself,
    // right alongside the existing `parentNode.input(...)` call on the list
    // node - otherwise this outer node's `.value` (and `v-model`) goes stale
    // after any insert/remove/clone/move/drag-reorder.
    const syncOuterValue = (value: object[]): void => {
      node.input(value, false)
    }

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
        node.context.repeaterValidation = [['length', node.context.minItems, node.context.maxItems]]

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
            syncOuterValue(newArray)
          }
        }
        node.context.removeNode = (parentNode: FormKitNode, index: number) => (): void => {
          if (parentNode && Array.isArray(parentNode._value)) {
            const newArray = parentNode._value.filter((_: object, i: number): boolean => i !== index)
            parentNode.input(newArray, false)
            syncOuterValue(newArray)
          }
        }
        node.context.addNode = (parentNode: FormKitNode, index: number) => (): void => {
          if (parentNode && Array.isArray(parentNode._value)) {
            const array: object[] = parentNode.value
            array.splice(index + 1, 0, { ...newItem })
            parentNode.input(array, false)
            syncOuterValue(array)
          }
        }
        node.context.cloneNode = (parentNode: FormKitNode, index: number) => (): void => {
          if (parentNode && Array.isArray(parentNode._value)) {
            const item: object = parentNode.value[index]
            const array: object[] = parentNode.value
            array.splice(index + 1, 0, { ...item })
            parentNode.input(array, false)
            syncOuterValue(array)
          }
        }
        node.context.moveNodeUp = (parentNode: FormKitNode, index: number) => (): void => {
          if (parentNode && Array.isArray(parentNode._value)) {
            if (index > 0) {
              const newArray = swapElements(parentNode.value as object[], index - 1, index)
              parentNode.input(newArray, false)
              syncOuterValue(newArray)
            }
          }
        }
        node.context.moveNodeDown = (parentNode: FormKitNode, index: number) => (): void => {
          if (parentNode && Array.isArray(parentNode._value)) {
            if (index < parentNode.value.length - 1) {
              const newArray = swapElements(parentNode.value as object[], index, index + 1)
              parentNode.input(newArray, false)
              syncOuterValue(newArray)
            }
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

          const newArray = swapElements(parentNode.value as object[], sourceIndex, targetIndex)
          parentNode.input(newArray, false)
          syncOuterValue(newArray)
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

  return { addRepeaterHandler }
}
