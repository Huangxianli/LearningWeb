- [理解对象](#理解对象)
  - [属性的类型](#属性的类型)
  - [定义多个属性](#定义多个属性)
  - [读取属性的特性](#读取属性的特性)
  - [合并对象](#合并对象)
  - [对象标识及相等判定](#对象标识及相等判定)
  - [增强的对象语法](#增强的对象语法)
  - [对象解构](#对象解构)

# 理解对象
对象是一组属性的*无序*集合，由于它内部的属性是无序的，所以在遍历的时候，存在有些方法无法保证遍历的顺序

## 属性的类型
1. 数据属性
   特性包含：
   + [[ Configurable ]]：是否可以用 delete 删除该属性；是否可以修改属性的类型（这里是修改成访问器属性）；是否可以修改其他的特性
   + [[ Enumerable ]]：是否可以被 for...in 循环返回
   + [[ Writable ]]：是否可以修改
   + [[ Value ]]：默认值是 undefined
2. 访问器属性
   特性包含：
   + [[ Configurable ]]：是否可以用 delete 删除该属性；是否可以修改属性的类型（这里是修改成数据属性）；是否可以修改其他的特性
   + [[ Enumerable ]]：是否可以被 for...in 循环返回
   + [[ Set ]]：设置值的函数
   + [[ Get ]]：读取值的函数

```js
const obj = {};
Object.defineProperty(obj, 'propertyName', {
  configurable: true,
  enumerable: false,
  writable: false,
  value: 1
});

const descriptions = Object.getOwnPropertyDescriptors(obj);
const description = Object.getOwnPropertyDescriptor(obj, 'propertyName');
```

## 定义多个属性
## 读取属性的特性
## 合并对象
## 对象标识及相等判定
## 增强的对象语法
## 对象解构