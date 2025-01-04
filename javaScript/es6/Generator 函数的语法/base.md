- [Generator 函数的语法](#generator-函数的语法)
  - [简介](#简介)
    - [yield 表达式](#yield-表达式)
      - [调用 next 方法的逻辑：](#调用-next-方法的逻辑)
    - [与 Iterator 接口的关系](#与-iterator-接口的关系)
  - [next 方法的参数](#next-方法的参数)
  - [for...of 循环](#forof-循环)
  - [Generator.prototype.throw()](#generatorprototypethrow)
  - [Generator.prototype.return()](#generatorprototypereturn)
  - [next()、throw()、return() 的共同点](#nextthrowreturn-的共同点)
  - [yield\* 表达式](#yield-表达式-1)

# Generator 函数的语法
## 简介
Generator 函数是 es 提供的一种异步编程解决方案
可以把 Generator 函数理解成是一个状态机，封装了多个内部状态
执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数

特点：
*
yield （yield 后面就是状态）

Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行，调用一次 next 方法，就会从上一次停止的地方执行到下一个 yield 或者是 return 为止，相当于 yield 是一个暂停标志，next 就是恢复执行
注意 Generator 函数调用的时候，该函数并不会执行，返回的不是函数运行结果，而是一个指向内部状态的指针，也就是遍历器对象，遍历器对象里面的 value 值就是 yield 后面的表达式的返回值
如果遇到的是 return 语句，那么这个时候，done 就是 true，如果函数中没有 return 语句，则即使遇到了最后一个 yield done 也不会转化成 true，还要在执行一次 next 才会转化成 true（可以理解为没有 return 语句 会默认在函数的最后加一个 return undefined）
```js
function* generator1() {
  yield 1;
}
let a = generator1();
a.next(); // { value: 1, done: false }
a.next(); // { value: undefined, done: true }

function *generator2() {
  return 1;
  yield 2; // 因为前面已经 return 了，所以 done 已经是 true 了，而且 value 是 undefined
}
let b = generator2();
b.next(); // { value: 1, done: true } 注意这里遇到了 return done 就会是 true
b.next(); // { value: undefined, true } 注意即使对应了 Generator 函数中还有 yield，return 之后，done 都是 true，value 都是 undefined
```

### yield 表达式
#### 调用 next 方法的逻辑：
1. 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值
2. 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式
3. 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值
4. 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined

### 与 Iterator 接口的关系
Generator 函数是遍历器生成函数，Iterator 接口又是一个生成遍历器对象的函数，同时 Iterator 接口部署在 Symbol.iterator 属性上，所以可以把 Generator 函数赋值给对象的 Symbol.iterator 属性，将 Generator 函数作为遍历器接口

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
*是不是只有 Generator 函数返回的遍历器对象才会是这种表现？？？ --- 是的*
```js
function *generator1() {
  yield 1;
}
const a1 = generator1();
a1[Symbol.iterator]() === a1; // true

const b = {};
b[Symbol.iterator] = function () {
  return {
    next() {
      return {
        value: 1, done: false
      }
    }
  }
};

const iterator1 = b[Symbol.iterator]();
iterator1[Symbol.iterator]; // undefined

const c = [];
const iterator2 = c[Symbol.iterator]();
iterator2[Symbol.iterator]() === iterator2; // true
```


## next 方法的参数
yield 表达式本身是没有返回值的，或者是返回的是 undefined
> 注意：不要把这个 yield 表达式的返回值和 遍历器调用 next 返回的对象的 value 属性搞混了，这是两个内容
next 携带的参数，会被当成**上一次** yiled 表达式的返回值，注意是上一次
```js
function *generator() {
  const a  = yield 0;
  const b = yield a;
  const c = yield b;
  yield c;
}
const a = generator();
a.next(1); // { value: 0, done: false }
a.next(2); // { value: 2, done: false } 注意这里的 value 是 2 而不是 1，对应的是代码中的 const a = 2，所以说 next 中传入的参数是 上一次 yield 表达式的返回值，而不是这一次的
a.next(3); // { value: 3, done: false }
a.next(4); // { value: 4, done: false }
a.next(5); // { value: undefined, done: true }
```

## for...of 循环
for...of 可以自动的遍历 Generator 函数运行生成的 Iterator 对象，但是不能直接遍历 Generator 函数
for...of 可以遍历部署了 Iterator 接口的数据结构，也可以遍历 遍历器对象，解构赋值、... 扩展运算符、Array.form() 等也是两者都兼容的
```js
function *generator1() {
  yield 1;
  return 2;
}
const a1 = [];
/* for (let i of generator1) { // 会报错
  a.push(i);
} */

const b = {
  [Symbol.iterator]: generator1,
};
for (let i of b) {
  a1.push(i);
}
a1; // [1]

const a2 = [];
for (let i of generator1()) {
  a2.push(i);
}
a2; // [1] 和前面遍历的结果一样

```

## Generator.prototype.throw()
Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
```js
function *generator1() {
  yield 1;
  try {
    yield 2;
  } catch {}
  yield 3;
}
const iterator1 = generator1();
iterator1.next(); // { value: 1, done: false }
iterator1.next(); // { value: 2, done: false }
iterator1.throw(); // { value: 3, done: false } 如果 Generator 内部捕获到了，会执行到从 catch 开始的第一个 yield 为止
iterator1.next(); // { value: 4, done: done }

function *generator2() {
  yield 1;
  try {
    yield 2;
  } catch {
    yield 3;
    yield 4;
  }
  yield 5;
};
const iterator2 = generator2();
iterator2.next(); // { value: 1, done: false }
iterator2.next(); // { value: 1, done: false }
iterator2.throw(); // { value: 3, done: false } 即使 catch 中有多个 yield，throw 被捕获后也只会在遇到第一个 yield 的时候就停下来
iterator2.next(); // { value: 4, done: false } 如果 catch 里面有多个 yield，throw 被捕获之后，下一个 next 调用会从 catch 中的 yield 继续
iterator2.next(); // { value: 5, done: false }

function *generator3() {
  yield 1;
  try {
    yield 2;
  } catch {
  }
  yield 3;
  yield 4;
  yield 5;
};
const iterator3 = generator3();
iterator3.next(); // { value: 1, done: false }
iterator3.next(); // { value: 2, done: false }
iterator3.next(); // { value: 3, done: false }
try {
  iterator3.throw(); // 报错 如果当前的运行的 next 的区间没有在 try 里面，那么将捕获不到错误
} catch {}
iterator3.next(); // { value: undefined, done: true } 如果 throw 的错误没有被内部捕获，generator 内部的代码将不会再执行（generator 内部报错没被捕获也是一样的结果）
```

throw() 传入的参数会被 catch 接收到
如果没有 next 过，无论 内部如何 try...catch 直接 throw() 都不会被内部捕获到

## Generator.prototype.return()
Generator 函数返回的遍历器对象，它有一个 return 方法，可以给定返回值，并且终止遍历 Generator 函数
```js
function *generator1() {
  yield 1;
  yield 2;
  yield 3;
};
const iterator1 = generator1();
iterator1.next();
iterator1.return(1); // { value: 1, done: true } 这里的 done 就已经是 true 了
iterator1.next(); // { value: undefined, done: true }
```

如果 Generator 函数内部有 try...catch，且正在执行 try 代码块，那么 return() 会导致马上进入 finally 代码块，执行完以后，整个函数才会结束
```js
function *generator1() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
  yield 7;
}
const iterator1 = generator1();
iterator1.next(); // { value: 1, done: false }
iterator1.next(); // { value: 2, done: false }
iterator1.return(8); // { value: 4，done: false }
iterator1.next(); // { value: 5, done: false }
iterator1.next(); // { value: 8, done: true }  即使 finally 后面还有 yield，但是返回的 done 是true，value 是之前 return() 传入的值
iterator1.next(); // { value: undefined, done: true }
iterator1.next(); // { value: undefined, done: true }
```

iterator 对象中有 return 方法，在 for...of 循环中，使用 return（只能在函数中使用）、break、continue、报错，或者是数组的不完全解构会进入到 return 方法中执行，那么 Generator 生成的遍历器对象，如果在 for...of 中经历了这些，刚好有在 try...finally 里面，那么会进入到 finllay 里面吗？？？
```js
function *generator1() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    debugger // 注意，虽然最终的数组里面没有 4，但是 for...of 还是执行到了这里
    yield 4;
    debugger // for...of 循环没有进入到这里
    yield 5;
  }
  yield 6;
  yield 7;
}
const iterator1 = generator1();
const arr1 = [];
for (let i of iterator1) {
  arr1.push(i);
  if (i === 2) {
    break; 
    // continue; // 如果是 continue 的话，上面的两个 debugger 都会执行到
  }
}
arr1; // [1, 2]
// iterator1.next(); // { value: 5, done: false}
```

## next()、throw()、return() 的共同点
它们都是让 Generator 函数恢复执行，并且使用不同的雨语句替换 yield 表达式
+ next() 是将 yield 表达式替换成一个值
+ throw() 是将 yield 表达式替换成一个 throw 语句
+ return() 是将yield 表达式替换成一个 return 语句

## yield* 表达式
yield* 相当于又执行了一次 for...of
