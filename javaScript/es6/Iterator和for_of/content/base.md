- [Iterator 和 for...of 循环](#iterator-和-forof-循环)
  - [Iterator （遍历器）](#iterator-遍历器)
    - [Iterator 的作用](#iterator-的作用)
    - [Iterator 的遍历过程](#iterator-的遍历过程)
    - [typeScript 表达](#typescript-表达)
  - [默认 Iterator 接口](#默认-iterator-接口)
    - [原生具备 Iterator 接口的数据结构](#原生具备-iterator-接口的数据结构)
  - [调用 Iterator 接口的场合](#调用-iterator-接口的场合)
  - [字符串的 Iterator 接口](#字符串的-iterator-接口)
  - [Iterator 接口与 Generator 函数](#iterator-接口与-generator-函数)
  - [遍历器对象的 return()，throw()](#遍历器对象的-returnthrow)
  - [for...of 循环](#forof-循环)

# Iterator 和 for...of 循环
## Iterator （遍历器）
为数据结构提供了一个接口，一个统一的访问机制，使得在访问该数据结构的时候，无需关注他的结构是怎样的，可以通过一种统一的方法进行访问

### Iterator 的作用
1. 为各种数据结构提供统一的访问接口（遍历的时候，无需关注数据结构，都使用统一的方法遍历）
2. 为成员排序
3. 被 for...of 消费

### Iterator 的遍历过程
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置
Iterator 对象只要不调用 next 方法就不会进行遍历，调用 next 方法 返回的是一个对象 { value: ..., done: true/false }

### typeScript 表达
```ts
type Iterable {
  [Symbol.iterator](): Iterator
};
type Iterator {
  next(value: any): IterationReasult
}
type IterationReasult {
  // 按理来说，这里的 value 和 done 应该是：只要 value 存在的时候 done 可以不存在；done 存在的时候，value 可以不存在，或者说 done 为true 的时候，value 可以不存在，如何实现这种工具类
  value: any,
  done: boolean,
}
```

## 默认 Iterator 接口
es6 中规定了，默认的 Iterator 接口是部署在 Symbol.iterator 属性上的，是一个函数，返回一个 Iterator 对象。
只要是一个数据结构部署了 Iterator 接口，就说明该数据结构是可遍历的

### 原生具备 Iterator 接口的数据结构
+ Array
+ Map
+ Set
+ String
+ TypedArray
+ arguments
+ NodeList
> 对象默认是没有部署 Iterator 接口的
> 如果 Iterator 接口返回的不是一个对象，会报错

## 调用 Iterator 接口的场合
1. 结构赋值
对 Array 和 Set 结构进行结构赋值的时候，会默认调用 Symbol.iterator 方法
2. 扩展运算符
当认为是在 Array 环境下的时候（在对象的场景下不会调用 ...），使用 ... 扩展运算符会调用 Iterator 接口
也就是说，只要部署了 Iterator 接口，就可以使用 ... 扩展运算符
3. yield*
4. 其他的场合
   for...of
   Array.form()
   Map() Set() WeakMap() WeakSet() 
   Promise.all()
   Promise.race()

## 字符串的 Iterator 接口
字符串也内置了原生的 Iterator 接口

## Iterator 接口与 Generator 函数
Symbol.iterator() 方法的最简单实现就是 Generator 函数

## 遍历器对象的 return()，throw()
遍历器对象除了有 next() 方法外，还可以具有 return() 方法和 throw() 方法
next() 方法是必须的，return() 和 throw() 方法不是必须的

进入 遍历器对象 return() 方法的情况
1. for...of 循环提前退出
  break 语句
  continue 语句
  return 语句
  抛出错误
2. 解构赋值未消费所有值时（数组解构的时候，会调用 Iterator 接口，注意对象的不完全解构不会进入 return() 方法里面）

throw 方法一般配合 Generator 函数使用，一般的遍历器对象用不到这个方法

## for...of 循环
一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 遍历它的成员
*for...of 可以直接遍历 遍历器对象；同时也可以遍历实现了 Iterable 接口的数据结构*
