const routerMap = new Map(
  [
    ['elRadio', {
      name: 'radio',
      compName: 'elRadio',
      componentName: 'RadioTest'
    }],
    ['elCheckbox', {
      name: 'checkbox',
      compName: 'elCheckbox',
      componentName: 'CheckboxTest'
    }],
    ['elInput', {
      name: 'input',
      compName: 'elInput',
      componentName: 'InputTest'
    }],
    ['elFrom', {
      name: 'from',
      compName: 'elFrom', // 和map的key相同
      componentName: 'FormTest' // 组件文件名称
    }],
    ['elLayout', {
      name: 'layout',
      compName: 'elLayout',
      componentName: 'LayoutTest'
    }],
    ['myFormItem', {
      name: 'myFormItem',
      compName: 'myFormItem',
      componentName: 'MyFormItemTest'

    }],
  ]
);
export default routerMap;