- [变量的解构赋值](#变量的解构赋值)
  - [数组的解构赋值](#数组的解构赋值)
  - [对象的解构赋值](#对象的解构赋值)
  - [字符串的解构赋值](#字符串的解构赋值)
  - [数值和布尔值的解构赋值](#数值和布尔值的解构赋值)
  - [函数参数的解构赋值](#函数参数的解构赋值)
  - [圆括号的问题](#圆括号的问题)
  - [用途](#用途)
  
# 变量的解构赋值
es6 允许按照一定的模式，从 数组 和 对象 中提取值，对变量进行赋值，称之为解构赋值

## 数组的解构赋值
```js
let [a, b, c] = [1, 2, 3];
```

本质上，这种写法是“模式匹配”，只要等号左右两边的模式相同，左边的变量就会被赋予相对应的值

如果解构不成功就会返回 undefined

如果等号右边不是数组（严格的说是不可遍历的结构），就会报错

Set 结构也是可以使用数组的结构赋值的
```js
let [a, b, c] = new Set([1, 2, 3]);
```

只要实现了 Iterator 接口就可以使用数组形式的结构赋值

解构可以指定默认值，当匹配到严格等于 undefined 的时候，就会采用默认值
```js
let [a = 'a', b = 'b', c] = [1, , null];
// 这里只有 b 匹配到的是 undefined，所以会采用默认值‘b’
```

注意，默认值是惰性求值，只有在匹配到值是 undefined 的时候，才会对默认值进行求值操作


## 对象的解构赋值
数组的解构赋值是按照次序排列的，变量的取值由它的位置决定
对象的熟悉感是没有次序的，对象的解构必须要变量和属性同名

和数组一样，如果解构失败，变量得到的值是 undefined
```js
let { foo } = { bar: 'baz' };
// 这里 foo 解构失败，赋值为 undefined
```

对象的解构赋值是匹配相同属性名，在将值赋值给属性名后的变量
```js
let { foo: baz } = { foo: 123 };
// 这里的变量是 baz，先匹配到 foo，然后将 123 赋值给 baz
```

嵌套解构赋值也要按照结构一层一层的匹配

*解构赋值是会取原型链的值*

和数组的解构一样，对象的解构也可以指定默认值
```js
let {c: c = 'c' } = { x: 12, y: 23};
```

注意如果变量已经存在了，在结构赋值的时候，要将赋值语句包裹在()里面
```js
let a;
({ a } = { a: 12 })
```

数组的本质也是一个对象，可以对数组进行对象属性的解构
```js
let {0: first, length} = [1, 2];
```

## 字符串的解构赋值
字符串会被转化成一个类数组对象
```js
let [a, b, c, d] = 'hello';

let {0: a, 1: b, 2: c, 3: d, length } = 'hello';
```

## 数值和布尔值的解构赋值
如果右边是数值或者是布尔值，则会先转化成对象，注意解构可以获取到原型上的内容

```js
let { toString: s } = 12;
s === Number.prototype.toString; // true

let { toString: d } = true;
d === Boolean.prototype.toString; // true
```

## 函数参数的解构赋值
```js
// 这样能保证 无论何种传值 x 和 y 都不会是 undefined
function move({ x = 0, y = 1 } = { x: 0, y: 1 }) {
  return [x, y];
};
```

## 圆括号的问题
只能赋值语句的非模式部分使用圆括号

## 用途
```js
// 变量的交换
let a = 1;
let b = 2;
([b, a] = [a, b]);

// 结构函数返回的对象
let { a, b } = (function () { return { a: 1, b: 2 } })();

// 函数参数的定义
function c({ x, y, z }) {};

// 参数的默认值
function d({ x = 1, y = 2 } = {}) {}

// 遍历 Map 结构（任何部署了 Iterator 接口的对象都可以结构赋值）
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

let [e, f] = map;
// e ['first', 'hello']
// f ['second', 'world']

for(let [key, value] in map) {}

// 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");

```