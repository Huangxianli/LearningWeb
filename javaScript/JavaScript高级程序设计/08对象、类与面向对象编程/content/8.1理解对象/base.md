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

Object.defineProperties(obj, {
 property1: {
  configurable: true,
  enumerable: false,
  writable: false,
  value: 12,
 },
 property2: {
  configurable: true,
  enumerable: true,
  set(value) {
    this.property2_ = value;
  },
  get(){
    return this.property2_;
  }
 }
});

const description = Object.getOwnPropertyDescriptor(obj, 'propertyName');
const descriptions = Object.getOwnPropertyDescriptors(obj);
```

## 定义多个属性
```js
Object.defineProperties()
```

## 读取属性的特性
```js
Object.getOwnPropertyDescriptor(obj, 'propertyName');

Object.getOwnPropertyDescriptors(obj);
```

## 合并对象
Object.assgin() 将源对象中 自身（Object.hasOwnProperty(obj,'propertyName')为true）可枚举（Object.propertyIsEnumerable(Obj,'propertyName')为true）的 字符串 和 Symbol 属性复制到目标对象上
如果属性是访问器属性：读的是源对象的属性的 [[ Get ]]  特性，调用目标对象同名属性的 [[ Set ]] 特性
没有回滚操作，如果合并的中间出了错误，那么前面已经合并了属性不会回滚
```js
Object.assgin(a, b);
```

## 对象标识及相等判定
有些特殊情况使用 === 会表现得不符合预期
+0 === -0
NaN !== NaN

增加 Object.is() 来判断
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true

## 增强的对象语法
```js
const a = 12;
const b = {
  a,
};

const c = {
  [a]: a
};

const d = {
  [a]() {};
};
```

## 对象解构
```js
const a = {
  name: 'name', 
  age: 'age'
};

// 定义变量， personName 和 personAge 并取 a.name 和 a.age 给其赋值
const {name: personName, age: personAge} = a;

let personName1;
let personAge1;
// 如果是已经定义好了的变量，要使用括号包裹才不会报错
({name: personName1, age: personAge1} = a); 

// 嵌套解构，是按照格式一层一层的结构的
const person = {
  name: 'name',
  age: 'age',
  family: {
    parent: {
      father: 'father',
      mother: 'mother'
    },
  },
};

// 这里解构出了 name family father
const {name, family, family: { parent: { father }}} = person;

```
