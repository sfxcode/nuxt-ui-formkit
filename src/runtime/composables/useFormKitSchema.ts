import type { FormKitSchemaAttributes, FormKitSchemaComponent, FormKitSchemaFormKit, FormKitSchemaNode } from '@formkit/core'

export function useFormKitSchema() {
  const addComponent = (component: string = 'UButton', props: Record<string, unknown> = {}, render: string | boolean = true, formKitAttrs: Record<string, unknown> = {}): FormKitSchemaComponent => {
    return {
      $cmp: component,
      if: render.toString(),
      props,
      ...formKitAttrs,
    }
  }

  const addElement = (element: string = 'div', children: FormKitSchemaNode[] | string = [], attrs: FormKitSchemaAttributes = {}, render: string | boolean = true, formKitAttrs: Record<string, unknown> = {}): FormKitSchemaNode => {
    return {
      $el: element,
      if: render.toString(),
      attrs,
      children,
      ...formKitAttrs,
    }
  }

  const addGroup = (name: string, children: FormKitSchemaNode[] = [], render: string | boolean = true, formKitAttrs: Record<string, unknown> = {}): FormKitSchemaFormKit => {
    return {
      $formkit: 'group',
      if: render.toString(),
      name,
      children,
      ...formKitAttrs,
    }
  }

  const addList = (name: string, children: FormKitSchemaNode[] = [], dynamic: boolean = true, render: string | boolean = true, formKitAttrs: Record<string, unknown> = {}): FormKitSchemaFormKit => {
    return {
      $formkit: 'list',
      if: render.toString(),
      name,
      dynamic,
      children,
      ...formKitAttrs,
    }
  }

  const addListGroup = (children: FormKitSchemaNode[] = [], render: string | boolean = true, formKitAttrs: Record<string, unknown> = {}): FormKitSchemaFormKit => {
    return {
      $formkit: 'group',
      if: render.toString(),
      for: ['item', 'index', '$items'], // 👈 $items is in the slot’s scope
      key: '$item',
      index: '$index',
      children,
      ...formKitAttrs,
    }
  }

  const addElementsInOuterDiv = (children: FormKitSchemaNode[] = [], innerClass: string = '', outerClass: string = '', label: string = '', help: string = '', render: string | boolean = true): FormKitSchemaNode => {
    const inner = addElement('div', children, { class: innerClass, style: 'position: relative;' })
    const labelDiv = addElement('label', [label], { class: 'formkit-label' })
    const wrapperDiv = addElement('div', [labelDiv, inner], { class: 'formkit-wrapper' })
    const helpDiv = addElement('div', [help], { class: 'formkit-help' })
    return addElement('div', [wrapperDiv, helpDiv], { class: outerClass, style: 'position: relative;' }, render)
  }

  return { addComponent, addElement, addGroup, addList, addListGroup, addElementsInOuterDiv }
}
