# 获取样式

## 获取内联样式

`element.style.propertyName`
`element.style.getPropertyValue()`

## 获取计算后的样式

`window.getComputedStyle(element, pseudoElement)`
`pseudoElement`：伪元素类型 ':before'| ':after' ...

获取元素最终应用的样式（包括内联、内部和外部的 css），返回一个*只读*的 `CSSStyleDeclaration` 对象

`CSSStyleDeclaration` 对象可以直接 `.propertyName` 读取，也可以 `.getPropertyValue(property-name)` 读取

```js
const dom = document.getElememtById('id1');
const comptutedStyle = window.getComputedStyle(dom);

computedStyle.fontSize;
computedStyle.getPropertyValue('color');
```

## 设置内联样式

`element.style.cssProperty = value`
驼峰，携带单位

`element.style.setProperty(key, value, 'important')`
**设置自定义变量的时候可以用这个方法**

## 批量设置内联样式

> 注意 .style.cssText 会覆盖所有的内联样式

`element.style.cssText = element.style.cssText + 'color: red; background-color: white'`

## setAttribute

`element.setAttribute('style', 'color: red; background-color: blue')`;

## 动态切换类名

`element.className = 'a b'`

现代浏览器的支持：
`element.classList.add()`
`element.classList.remove()`
`element.classList.toggle()`
`element.classList.replace(a, b)`

## 使用 CSS 自定义属性（变量）

```js
const dom = document.getElementById('id1');

dom.style.setProperty('--light-font-color': 'red');


const computedStyle = getComputedStyle(dom);
const color = computed.getPropertyValue('--light-font-color');
```

## 设置伪类和伪类的样式

js 没有办法给 dom 添加伪类，可以通过间接的方式实现

```js
const style = document.createElement('style');
style.textContent = `
  .class1:before {
    color: red
  }
`;
document.head.appendChild(style);
```
