- [函数](#函数)
  - [箭头函数](#箭头函数)
  - [函数名](#函数名)
  - [理解参数](#理解参数)
  - [没有重载](#没有重载)
  - [默认参数值](#默认参数值)
  - [参数扩展与收集](#参数扩展与收集)
    - [扩展参数](#扩展参数)
    - [收集参数](#收集参数)
  - [函数声明与函数表达式](#函数声明与函数表达式)
  - [函数作为值](#函数作为值)
  - [函数内部](#函数内部)
    - [arguments](#arguments)
    - [this](#this)
    - [celler](#celler)
    - [new.target](#newtarget)
  - [函数属性与方法](#函数属性与方法)
  - [函数表达式](#函数表达式)
  - [递归](#递归)
  - [尾调用优化](#尾调用优化)
    - [尾调用优化的条件](#尾调用优化的条件)
    - [尾调用优化的代码](#尾调用优化的代码)
  - [闭包](#闭包)
    - [this 对象](#this-对象)
    - [内存泄露](#内存泄露)
  - [立即调用的函数表达式](#立即调用的函数表达式)
  - [私有变量](#私有变量)
    - [静态私有变量](#静态私有变量)
    - [模块模式](#模块模式)
    - [模块增强模式](#模块增强模式)

# 函数
函数 实际上是 对象
每个函数都是 Function 类型的实例
*函数名 就是指向 函数对象 的 指针，而且不一定与 函数本身 紧密绑定*
定义和函数的方式：
+ 函数声明
+ 函数表达式
+ （箭头函数）
+ （使用构造函数 Function： new Function('a', 'b', 'return a + b')）

重点：函数是对象；函数名是指针

## 箭头函数
任何可以使用 函数表达式 的地方，都可以使用 箭头函数
```js
let arrowSun = (a, b) => a + b; 
```

*箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性*

## 函数名
ECMAScript 6 的所有函数对象都会暴露一个只读的 name 属性，其中包含关于函数的信息。多数情况下，这个属性中保存的就是一个函数标识符，或者说是一个字符串化的变量名。即使函数没有名称，也会如实显示成空字符串。如果它是使用 Function 构造函数创建的，则会标识成"anonymous"
如果函数是一个获取函数、设置函数，或者使用 bind()实例化，那么标识符前面会加上一个前缀 get、set、bound

## 理解参数
ECMAScript 函数的参数在内部表现为一个数组
在使用 function 关键字定义（非箭头）函数时，可以在函数内部访问 arguments 对象，从中取得传进来的每个参数值（注意，箭头函数中如果使用 arguments 获取的是父函数（非箭头函数）的参数，而不是自己的）

arguments 对象是一个类数组对象（但不是 Array 的实例），可以通过 Array.from(arguments) 来转换成数组实例

*arguments 的值始终会与对应的命名参数同步，两者会同步的修改，但是注意，两者在内存中指向的不是同一块内存，只是同步修改。严格模式下，修改 arguments 的值不会反应到参数上，而且重写 arguments 会报错*

*如果只传了一个参数，然后把 arguments[1]设置为某个值，那么这个值并不会反映到第二个命名参数。这是因为 arguments 对象的长度是根据 传入 的参数个数，而非定义函数时给出的命名参数个数确定的。*

**ECMAScript 中的所有参数都按值传递的。不可能按引用传递参数。如果把对象作为参数传递，那么传递的值就是这个对象的引用**

## 没有重载
ECMAScript 函数不能像传统编程那样重载
如果在 ECMAScript 中定义了两个同名函数，则后定义的会覆盖先定义的

## 默认参数值
只有没有传入该参数，或这传入的值为 undefined 的时候，会使用默认值
```js
function test(a = 'default') {}
```
*在使用默认参数时，arguments 对象的值不反映参数的默认值，只反映传给函数的参数*
如果在调用的时候没有传该参数对应的值，则 arguments[ index ] 实际是没有值的（就不存在这一项），而不是默认值，length 不会加1；如果有传入值的话，就是传入的值

函数的默认参数只有在函数被调用时才会求值，不会在函数定义时求值（惰性的）

参数初始化顺序遵循“暂时性死区”规则，即前面定义的参数不能引用后面定义的

## 参数扩展与收集
### 扩展参数
```js
function test(a, b, c, d) {}
const params = [1, 2, 3];
test(...params, 4);
test(0, ...params);
```

### 收集参数
```js
function test(...params) {
  //  params 会收集传入的参数，成为一个数组
  // 箭头函数中，无法访问 arguments 可以使用这个方法来替代
}
const params = [1, 2, 3];
test();
```

## 函数声明与函数表达式
JavaScript 引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义。这个过程叫作函数声明提升（function declaration hoisting）
函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义

除了函数什么时候真正有定义这个区别之外，函数声明和函数表达式两种语法是等价的

## 函数作为值

## 函数内部
在 ECMAScript 5 中，函数内部存在两个特殊的对象：arguments 和 this
ECMAScript 6 又新增了 new.target 属性

### arguments
个类数组对象
只有在非箭头函数中才会有
arguments.callee 指向 arguments 所在的函数指针（递归的时候使用）（严格模式下，不支持callee）


### this
它在标准函数和箭头函数中有不同的行为
+ 在标准函数中
    this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值（在网页的全局上下文中调用函数时，this 指向 windows）
    到底引用哪个对象必须到函数被调用时才能确定，在调用时this的指向可能会变
+ 箭头函数中
    this引用的是定义箭头函数的上下文，箭头函数中的 this 会保留定义该函数时的上下文（注意箭头函数没有 提升，一般在执行到这一行的时候，才定义，才记住 this）
```js
function King() {
 this.royaltyName = 'Henry';
 // this 引用 King 的实例
 setTimeout(() => console.log(this.royaltyName), 1000);
}
function Queen() {
 this.royaltyName = 'Elizabeth';
 // this 引用 window 对象
 setTimeout(function() { console.log(this.royaltyName); }, 1000);
}
new King(); // Henry
new Queen(); // undefined
King(); // Henry
Queen(); // Elizabeth
```

### celler
ECMAScript 5 中添加的
这个属性引用的是*调用当前函数的函数*，或者如果是在全局作用域中调用的则为 null
如果 b 函数中调用 a，在 a 中， a.celler -> b  arguments.callee.caller -> b

### new.target
ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性

如果函数是正常调用的，则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数

## 函数属性与方法
每个函数都有两个属性：length 和 prototype（箭头函数没有 prototype 属性）
length 属性保存 函数定义 的命名参数的个数（注意是定义，不是调用），取 有默认值参数 之前的参数的个数

prototype 属性是不可枚举的，因此使用 for-in 循环不会返回这个属性


call() 和 apply() 
这两者只是传递参数的方式不同

bind()
bind() 方法不会执行前面的函数，会创建一个新的函数实例，其 this 值会被绑定到传给 bind() 的对象

## 函数表达式

## 递归
自己调用自己
在编写递归函数时，arguments.callee 是引用当前函数的首选（但是严格模式下，arguments.callee 会报错，可以使用命名函数表达式（named function expression）达到目的 let test = function test1 () { test1() }）
在写递归函数时使用 arguments.callee 可以避免在外面将函数赋值给一个变量的时候，调用变量前将函数重置为 null 的时候 null() 的报错

## 尾调用优化
外部函数的返回值是一个内部函数的返回值

### 尾调用优化的条件
+ 代码在严格模式下执行
+ 外部函数的返回值是对尾调用函数的调用
+ 尾调用函数返回后不需要执行额外的逻辑
+ 尾调用函数不是引用外部函数作用域中自由变量的闭包

### 尾调用优化的代码

## 闭包
闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的


### this 对象
### 内存泄露
## 立即调用的函数表达式
立即调用的匿名函数又被称作立即调用的函数表达式（IIFE，Immediately Invoked Function Expression）

使用 IIFE 可以模拟块级作用域，即在一个函数表达式内部声明变量，然后立即调用这个函数

在 ECMAScript 6 以后，IIFE 就没有那么必要了，因为块级作用域中的变量无须 IIFE 就可以实现同样的隔离

## 私有变量
严格来讲，JavaScript 没有私有成员的概念，所有对象属性都公有的

概念上来说，任何定义在函数或块中的变量，都可以认为是私有的，因为在这个函数或块的外部无法访问其中的变量

### 静态私有变量

### 模块模式

### 模块增强模式