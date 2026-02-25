import { describe, expect, it } from 'vitest'
import { useFormKitSchema } from '../../src/runtime/composables/useFormKitSchema'

interface FormKitComponent {
  $cmp?: string
  props?: Record<string, unknown>
  validation?: string
  validationVisibility?: string
  validationLabel?: string
  if?: string
  [key: string]: unknown
}

interface FormKitElement {
  $el: string
  attrs?: {
    class?: string
    style?: string
    [key: string]: unknown
  }
  children?: unknown[] | string
  validation?: string
  validationVisibility?: string
  if?: string
}

interface FormKitGroup {
  $formkit: string
  name?: string
  children?: object[]
  if?: string
  for?: string[]
  key?: string
  index?: string
  [key: string]: unknown
}

interface FormKitList {
  $formkit: string
  name: string
  dynamic?: boolean
  children?: object[]
  if?: string
  [key: string]: unknown
}

it('add list group', () => {
  const { addListGroup } = useFormKitSchema()

  const listGroup = addListGroup()
  expect(listGroup?.$formkit).toBe('group')
  expect(listGroup?.if).toBe('true')
  expect(listGroup?.for).toEqual(['item', 'index', '$items'])
  expect(listGroup?.key).toBe('$item')
  expect(listGroup?.index).toBe('$index')
})

it('add element with non-boolean render value', () => {
  const { addElement } = useFormKitSchema()
  const element = addElement('div', [], {}, '$context.visible')
  expect((element as FormKitElement)?.if).toBe('$context.visible')
})

it('add component with props', () => {
  const { addComponent } = useFormKitSchema()
  const props = { label: 'Save', severity: 'primary' }
  const component = addComponent('Button', props) as FormKitComponent
  expect(component?.props).toEqual(props)
})

describe('addElementsInOuterDiv', () => {
  it('creates default structure with minimal params', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv() as FormKitElement

    expect(outerDiv?.$el).toBe('div')
    expect(outerDiv?.attrs?.class).toBe('formkit-outer ')

    const wrapperDiv = (outerDiv?.children as FormKitElement[])?.[0]
    expect(wrapperDiv?.$el).toBe('div')
    expect(wrapperDiv?.attrs?.class).toBe('formkit-wrapper')

    const labelDiv = (wrapperDiv?.children as FormKitElement[])?.[0]
    expect(labelDiv?.$el).toBe('label')
    expect(labelDiv?.children).toEqual([''])

    const innerDiv = (wrapperDiv?.children as FormKitElement[])?.[1]
    expect(innerDiv?.$el).toBe('div')
    expect(innerDiv?.attrs?.class).toBe('formkit-inner ')
  })

  it('applies custom classes', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv([], 'custom-inner', 'custom-outer') as FormKitElement

    expect(outerDiv?.attrs?.class).toBe('formkit-outer custom-outer')

    const wrapperDiv = (outerDiv?.children as FormKitElement[])?.[0]
    const innerDiv = (wrapperDiv?.children as FormKitElement[])?.[1]
    expect(innerDiv?.attrs?.class).toBe('formkit-inner custom-inner')
  })
})

it('combines formKitAttrs with element properties', () => {
  const { addElement } = useFormKitSchema()
  const formKitAttrs = { validation: 'required', validationVisibility: 'dirty' }
  const element = addElement('div', [], {}, true, formKitAttrs) as FormKitElement

  expect(element?.$el).toBe('div')
  expect(element?.validation).toBe('required')
  expect(element?.validationVisibility).toBe('dirty')
})

it('combines formKitAttrs with component properties', () => {
  const { addComponent } = useFormKitSchema()
  const formKitAttrs = { validation: 'required', validationLabel: 'Button' }
  const component = addComponent('Button', {}, true, formKitAttrs) as FormKitComponent

  expect(component?.$cmp).toBe('Button')
  expect(component?.validation).toBe('required')
  expect(component?.validationLabel).toBe('Button')
})

describe('addGroup', () => {
  it('creates a group with default values', () => {
    const { addGroup } = useFormKitSchema()
    const group = addGroup('myGroup') as FormKitGroup

    expect(group?.$formkit).toBe('group')
    expect(group?.name).toBe('myGroup')
    expect(group?.children).toEqual([])
    expect(group?.if).toBe('true')
  })

  it('creates a group with children', () => {
    const { addGroup, addElement } = useFormKitSchema()
    const child = addElement('div', ['test'])
    const group = addGroup('myGroup', [child]) as FormKitGroup

    expect(group?.$formkit).toBe('group')
    expect(group?.name).toBe('myGroup')
    expect(group?.children).toHaveLength(1)
    expect(group?.children?.[0]).toBe(child)
  })

  it('creates a group with custom render condition', () => {
    const { addGroup } = useFormKitSchema()
    const group = addGroup('myGroup', [], '$value.enabled') as FormKitGroup

    expect(group?.if).toBe('$value.enabled')
  })

  it('creates a group with formKitAttrs', () => {
    const { addGroup } = useFormKitSchema()
    const formKitAttrs = { validation: 'required', id: 'custom-id' }
    const group = addGroup('myGroup', [], true, formKitAttrs) as FormKitGroup

    expect(group?.validation).toBe('required')
    expect(group?.id).toBe('custom-id')
  })

  it('creates a group with render=false', () => {
    const { addGroup } = useFormKitSchema()
    const group = addGroup('myGroup', [], false) as FormKitGroup

    expect(group?.if).toBe('false')
  })
})

describe('addList', () => {
  it('creates a list with default values', () => {
    const { addList } = useFormKitSchema()
    const list = addList('myList') as FormKitList

    expect(list?.$formkit).toBe('list')
    expect(list?.name).toBe('myList')
    expect(list?.children).toEqual([])
    expect(list?.dynamic).toBe(true)
    expect(list?.if).toBe('true')
  })

  it('creates a list with children', () => {
    const { addList, addElement } = useFormKitSchema()
    const child = addElement('div', ['test'])
    const list = addList('myList', [child]) as FormKitList

    expect(list?.$formkit).toBe('list')
    expect(list?.name).toBe('myList')
    expect(list?.children).toHaveLength(1)
    expect(list?.children?.[0]).toBe(child)
  })

  it('creates a static list', () => {
    const { addList } = useFormKitSchema()
    const list = addList('myList', [], false) as FormKitList

    expect(list?.dynamic).toBe(false)
  })

  it('creates a list with custom render condition', () => {
    const { addList } = useFormKitSchema()
    const list = addList('myList', [], true, '$value.showList') as FormKitList

    expect(list?.if).toBe('$value.showList')
  })

  it('creates a list with formKitAttrs', () => {
    const { addList } = useFormKitSchema()
    const formKitAttrs = { validation: 'min:1', help: 'Add at least one item' }
    const list = addList('myList', [], true, true, formKitAttrs) as FormKitList

    expect(list?.validation).toBe('min:1')
    expect(list?.help).toBe('Add at least one item')
  })

  it('creates a list with render=false', () => {
    const { addList } = useFormKitSchema()
    const list = addList('myList', [], true, false) as FormKitList

    expect(list?.if).toBe('false')
  })
})

describe('addComponent', () => {
  it('creates a component with default values', () => {
    const { addComponent } = useFormKitSchema()
    const component = addComponent() as FormKitComponent

    expect(component?.$cmp).toBe('UButton')
    expect(component?.props).toEqual({})
    expect(component?.if).toBe('true')
  })

  it('creates a component with render=false', () => {
    const { addComponent } = useFormKitSchema()
    const component = addComponent('Button', {}, false) as FormKitComponent

    expect(component?.if).toBe('false')
  })
})

describe('addElement', () => {
  it('creates an element with default values', () => {
    const { addElement } = useFormKitSchema()
    const element = addElement() as FormKitElement

    expect(element?.$el).toBe('div')
    expect(element?.children).toEqual([])
    expect(element?.attrs).toEqual({})
    expect(element?.if).toBe('true')
  })

  it('creates an element with string children', () => {
    const { addElement } = useFormKitSchema()
    const element = addElement('span', 'Hello World') as FormKitElement

    expect(element?.$el).toBe('span')
    expect(element?.children).toBe('Hello World')
  })

  it('creates an element with render=false', () => {
    const { addElement } = useFormKitSchema()
    const element = addElement('div', [], {}, false) as FormKitElement

    expect(element?.if).toBe('false')
  })

  it('creates an element with custom attrs', () => {
    const { addElement } = useFormKitSchema()
    const attrs = { 'class': 'custom-class', 'id': 'test-id', 'data-test': 'value' }
    const element = addElement('div', [], attrs) as FormKitElement

    expect(element?.attrs).toEqual(attrs)
  })
})

describe('addElementsInOuterDiv', () => {
  it('creates structure with label and help text', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv([], '', '', 'My Label', 'Help text') as FormKitElement

    const wrapperDiv = (outerDiv?.children as FormKitElement[])?.[0]
    const labelDiv = (wrapperDiv?.children as FormKitElement[])?.[0]
    expect(labelDiv?.children).toEqual(['My Label'])

    const helpDiv = (outerDiv?.children as FormKitElement[])?.[1]
    expect(helpDiv?.attrs?.class).toBe('formkit-help')
    expect(helpDiv?.children).toEqual(['Help text'])
  })

  it('creates structure with custom render condition', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv([], '', '', '', '', '$value.visible') as FormKitElement

    expect(outerDiv?.if).toBe('$value.visible')
  })

  it('includes inner div with position relative style', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv() as FormKitElement

    const wrapperDiv = (outerDiv?.children as FormKitElement[])?.[0]
    const innerDiv = (wrapperDiv?.children as FormKitElement[])?.[1]
    expect(innerDiv?.attrs?.style).toContain('position: relative')
  })

  it('includes outer div with position relative style', () => {
    const { addElementsInOuterDiv } = useFormKitSchema()
    const outerDiv = addElementsInOuterDiv() as FormKitElement

    expect(outerDiv?.attrs?.style).toContain('position: relative')
  })
})
