- [函数的扩展](#函数的扩展)
  - [函数参数的默认值](#函数参数的默认值)
  - [rest 参数](#rest-参数)
  - [严格模式](#严格模式)
  - [name 属性](#name-属性)
  - [箭头函数](#箭头函数)
    - [使用注意点](#使用注意点)

# 函数的扩展
## 函数参数的默认值
es6 新增了函数指定默认值的语法
```js
// es6 之前的写法，在 undefined null '' false 等时候，都会使用 0
function add(x, y) {
  x = x || 0;
  y = y || 0;
}
// es6 的写法，只有在 undefined 的时候，才会使用默认值 0
function add(x = 0, y = 0) {
}
```

es6 的写法相当于
```js
if (typeof x === 'undefined') {
  x = 0;
}
```
> 注意：在函数里面不能再命名和参数同名的变量

参数的默认值，是惰性求值的，只有在调用的时候才会去求值，调用几次求值几次

参数默认值，一般都是放在最后的，这样如果传入的参数和默认值是一样的情况下，就可以省略传入的这个参数
而且函数的 length 属性，它的含义期望传入的参数的个数，如果在定义函数的时候使用了参数默认值，那么该参数和该参数后面的参数，都不会被计入到 length 属性中，扩展运算符 ... 也是一样的，不会被计入到 length 属性里面

如果使用了参数默认值，在函数进行初始化的时候，参数会形成一个单独的作用域，调用结束的时候，该作用域就会消失

## rest 参数
...变量名 的形式，用于获取多余的参数，这样就不再需要 arguments 对象
```js
function add(...args) {
  // 注意 arg 是一个数组
  return args.reduce((count, current) => count + current, 0);
} 
```

> 注意：rest 参数后面不能再有其他的参数，函数的 length 属性不包括 rest 参数

## 严格模式
es5 开始，函数内部可以定义使用严格模式，但是在 es6 中，如果函数的参数使用了默认值、参数结构、rest 语法，那么函数的内部就不能定义为严格模式

原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行
```js
// 报错
function doSomething(value = 070) {
  'use strict';
  return value;
  // 参数value的默认值是八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但是实际上，JavaScript 引擎会先成功执行value = 070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错
}
```

## name 属性
函数的 name 属性，返回函数的名称（如果 function 关键字后面有名称则指代的是这个名称）
```js
const a = function b () {};
a.name; // 'b'

const c = new Function();
c.name; // 'anonymous' 不能根据这个来判断是否是 new Fucntion 创建的函数，因为可以定义名称为 anonymous 的函数

const d = function e() {};
const f = d.bind({});
f.name; // 'bound e'
```

## 箭头函数
箭头函数如果只是返回一个对象，要将对象用 () 包裹起来；如果只有一个语句，且不返回任何内容，又想省略掉 {}，可以使用 void
```js
let fn1 = () => ({});
let fn2 = () => void doSomething();
```

### 使用注意点
1. 箭头函数没有自己的 this
2. 箭头函数不可以当成构造函数使用 new 操作符，因为箭头函数没有自己的 this
3. 不可以使用 agruments 对象
4. 不可以使用 yield 命令

箭头函数的 this，永远是**定义时**上层作用域的 this
