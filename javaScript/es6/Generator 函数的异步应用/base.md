- [Generator 函数的异步应用](#generator-函数的异步应用)
  - [传统方法](#传统方法)
  - [基本概念](#基本概念)
    - [异步](#异步)
    - [回调函数](#回调函数)
    - [Promise](#promise)
  - [Generator 函数](#generator-函数)
    - [协程的 Generator 函数实现](#协程的-generator-函数实现)
    - [Generator 函数的数据交换和错误处理](#generator-函数的数据交换和错误处理)
    - [异步任务的封装](#异步任务的封装)
  - [Thunk 函数](#thunk-函数)
    - [参数求值策略](#参数求值策略)
    - [Thunk 函数的意义](#thunk-函数的意义)
    - [JavaScript 语言中的 Thunk 函数](#javascript-语言中的-thunk-函数)
    - [Generator 函数的流程管理](#generator-函数的流程管理)
    - [Thunk 函数的自动流程管理](#thunk-函数的自动流程管理)

# Generator 函数的异步应用
## 传统方法
在 es6 之前，异步编程的方法大概有四种
+ 回调函数
+ 事件监听
+ 发布/订阅
+ Promise 对象
Generator 函数将 JS 异步编程带入了一个全新的阶段

## 基本概念
### 异步
简单的说，一个任务不是连续完成的，可以理解为任务被分成两段，一段执行完之后，先执行其他的，等做好了准备再执行第二段，这种不连续的执行就叫做异步

### 回调函数
回调函数就是将第二段任务单独的写在一个函数里面，等到重新执行这个任务的时候，直接调用这个函数

### Promise
可以解决回调地狱（多个回调函数嵌套的情况），多个回调嵌套在一起，代码太过于耦合
Promise 可以使用链式调用，可以一定程度的解决回调地狱的问题，但是代码有点冗余

## Generator 函数
Generator 函数的写法中，yield 命令式异步两个阶段的分界线

### 协程的 Generator 函数实现
Generator 函数是协程在 es6 中的实现，最大的特点是可以交出函数的执行权
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都是用 yield 语句注明

### Generator 函数的数据交换和错误处理
next()
throw()

### 异步任务的封装
```js
const fetch = require('node-fetch');

function *generator1() {
  const url = 'https://api.github.com/user/github';
  const result = yield fetch(url);
  console.log(result);
}

const iterator = generator1();
const result = iterator.next();
result.value
  .then(res => res)
  .then(res => {
    g.next(res.json); // 执行这一句才会执行 generator1 里面的 console.log(result);
  })
```

## Thunk 函数
Thunk 函数是自动执行 Generator 函数的一种方法

### 参数求值策略
函数的参数什么时候求值
```js
let x = 1;
function f(m) {
  return m * 2;
}
f(x + 5); // x + 5 这个表达式什么时候求值？ 一种是 这传入的时候（x + 5）就求值，一种是在 m * 2 的时候求值
```

### Thunk 函数的意义
编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数
```js
function f(m) {
  return m * 2;
};
f(x + 5);

// 等同于

let thunk = function () {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
};
```
这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式

### JavaScript 语言中的 Thunk 函数
JS 语言是传值调用，它的 Thunk 函数含义有所不同
在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数
```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
let Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};
let readFileThunk = Thunk(fileName);
readFileThunk(callback);
```
任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式
简单的 Thunk 函数转换器
```js
// ES5版本
const Thunk = function(fn){
  return function (){
    const args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```

### Generator 函数的流程管理
如果 Generator 函数中是几个异步的操作，在循环中，无法直接通过 done 来控制前一个异步完成了才执行下一个 next

### Thunk 函数的自动流程管理
```js
const fs = require('fs');
const thunkify = require('thunkify');
const readFileThunk = thunkify(fs.readFile);

function run(fn) {
  const gen = fn();

  function next(err, data) {
    const result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

const g = function* () {
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};
run(g);
```