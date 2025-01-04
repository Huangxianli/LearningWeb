- [this 全面解析](#this-全面解析)
  - [调用位置](#调用位置)
  - [调用规则](#调用规则)
    - [默认绑定](#默认绑定)
    - [隐式绑定](#隐式绑定)
    - [显示绑定](#显示绑定)
    - [new 绑定](#new-绑定)
  - [优先级](#优先级)
  - [绑定例外](#绑定例外)
    - [被忽略的 this](#被忽略的-this)
    - [间接引用](#间接引用)
    - [软绑定](#软绑定)
  - [this 词法](#this-词法)

# this 全面解析
## 调用位置
调用位置 就是函数在代码中被调用的位置（而不是声明的位置）
最重要的是要分析 调用栈 （就是为了到达当前执行位置所调用的所有函数）
```js 
function baz() { 
  // 当前调用栈是：baz 
  // 因此，当前调用位置是全局作用域 
  console.log( "baz" ); 
  bar(); // <-- bar 的调用位置 
}
function bar() { 
  // 当前调用栈是baz -> bar 
  // 因此，当前调用位置在baz中 
  console.log( "bar" ); 
  foo(); // <-- foo 的调用位置 
}
function foo() { 
  // 当前调用栈是baz -> bar -> foo 
  // 因此，当前调用位置在bar中 
  console.log( "foo" ); 
}
baz(); // <-- baz 的调用位置
```

## 调用规则
在函数的执行过程中，调用位置如何决定 this 的绑定对象
先找到调用位置，然后判断应用四条规则中的哪一个

### 默认绑定
最常用的函数调用类型：独立函数调用
可以把这条规则看作是无法应用其他规则时的 默认规则
如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定

```js
function foo() {  
  console.log( this.a ); 
} 
var a = 2; 
foo(); // 2
```
函数调用时应用了 this 的默认绑定，因此this指向全局对象
分析调用位置来看看foo()是如何调用的：foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则

### 隐式绑定
调用位置是否有 上下文对象，或者说是否被某个对象拥有或者包含
```js
function foo() {  
  console.log( this.a ); 
} 
var obj = {  
  a: 2, 
  foo: foo  
}; 
obj.foo(); // 2
```
当 obj.foo() 被调用时，它的落脚点指向 obj 对象。
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象

对象属性引用链中只有 最顶层 或者说 最后一层 会影响调用位置
```js
unction foo() {  
  console.log( this.a ); 
} 
var obj2 = {  
  a: 42, 
  foo: foo  
}; 
var obj1 = {  
  a: 2, 
  obj2: obj2  
}; 
obj1.obj2.foo(); // 42
```

隐式丢失
一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式
```js
function foo() {  
  console.log( this.a ); 
} 
var obj = {  
  a: 2, 
  foo: foo  
}; 
var bar = obj.foo; // 函数别名！ 
var a = "oops, global"; // a是全局对象的属性 
bar(); // "oops, global"
```
*永远注意，this 是在运行时才绑定的*
关注的是调用的那一刻是否有 执行上下文

### 显示绑定
+ call(thisObj, ...arg)
  如果传入的是 原始值，会调用它们对应的构造函数转化成他们的对象形式
+ apply(thisObj, argArray)
+ bind(thisObj, ...arg)
  会生成一个硬编码的新函数，this 的上下文被设置成了传入的thisObj
  （新函数的 this 上下文已经被绑定了，是不是不符合是在执行的时候，才确定 this 的上下文），同时传入的参数会被固定
+ API 调用的上下文
  Array.forEach(callback, thisObj) 显示的绑定了 callback 中的 this 的上下文为 thisObj

### new 绑定
1. 创建（或者说构造）一个全新的对象
2. 这个新对象会被执行 __proto__ 连接
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象


## 优先级
找到函数的调用位置并判断应当应用哪条规则
但是，如果某个调用位置可以应用多条规则该怎么办
（注意 new 无法和 call apply 一起使用）
1. new（new fun()）
2. 硬绑定（fun.call(thisObj, ...arg) fun.apllay(thisObj, argArray) fun.bind(thisObj, ...arg)）
3. 隐式绑定（obj.fun()）
4. 默认绑定（fun()）

## 绑定例外
在某些场景下this的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用的可能是 默认绑定规则

### 被忽略的 this
如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则

### 间接引用
```js
function foo() {  
  console.log( this.a ); 
} 
var a = 2;  
var o = { a: 3, foo: foo };  
var p = { a: 4 }; 
o.foo(); // 3 
(p.foo = o.foo)(); // 2
```

### 软绑定

## this 词法
四条规则已经可以包含所有正常的函数
但是 ES6 中介绍了一种无法使用这些规则的特殊函数类型：箭头函数
箭头函数不使用 this 的四种标准规则，而是根据*外层（函数或者全局）作用域*来决定 this
箭头函数的绑定无法被修改（new也不行！）
```js
function foo() { 
  // 返回一个箭头函数  
  return (a) => { 
    //this继承自foo() 
    console.log( this.a );  
  }; 
} 
var obj1 = {  
  a:2 
}; 
var obj2 = {  
  a:3 
}; 
var bar = foo.call( obj1 ); 
bar.call( obj2 ); // 2, 不是3！
```