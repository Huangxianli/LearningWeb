- [关于 this](#关于-this)
  - [为什么要用 this](#为什么要用-this)
  - [误解](#误解)
    - [指向自身](#指向自身)
    - [它的作用域](#它的作用域)
  - [this 到底是什么](#this-到底是什么)

# 关于 this
## 为什么要用 this
使得函数可以自动引用合适的 上下文对象

## 误解
### 指向自身
第一种误解是人们很容易把 this 理解成指向函数自身
```js
function foo(num) {
  console.log( "foo: " + num );
  // 记录 foo 被调用的次数
  this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
  if (i > 5) {
    foo( i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次？
console.log( foo.count ); // 0
```
在这个里面 函数 内部的 this 并不是指向 函数的，两个 count 就不是同一个 count

如果要从函数对象内部引用它自身，那只使用 this 是不够的。一般来说你需要通过一个指向 函数对象 的词法标识符（变量）来引用它

```js
function foo(num) {
  console.log( "foo: " + num );
  // 记录 foo 被调用的次数
  // 注意，在当前的调用方式下（参见下方代码），this 确实指向 foo
  this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
  if (i > 5) {
  // 使用 call(..) 可以确保 this 指向函数对象 foo 本身
    foo.call( foo, i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次？
console.log( foo.count ); // 4
```
通过 foo.call( foo, i ) 来强制指定 foo 中的 this 指向的上下文对象

### 它的作用域
第二种常见的误解是 this 指向函数的作用域域。这个问题有点复杂，因为在某种情况下它是正确的，但是在其他情况下它却是错误的

*需要明确的是，this 在任何情况下都不指向函数的词法作用域*

```js
// 注意应该是在一个大的函数中执行，或者是在module中
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log( this.a );
}
foo();
```

试图使用 this 联通 foo() 和 bar() 的词法作用域，从而让 bar() 可以访问 foo() 作用域里的变量 a。这是不可能实现的
*不能使用 this 来引用一个词法作用域内部的东西*

## this 到底是什么
this 是在运行时进行绑定的
this 的绑定和函数声明的位置没有任何关系，只取决于 函数的调用方式

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）
这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息
this 就是被记录的其中一个属性，会在函数执行的过程中用到

