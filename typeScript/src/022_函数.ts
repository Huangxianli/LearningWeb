type GreetFunction = (a: string) => void

function greeter(fun: GreetFunction) {
  fun("hello World")
}

function print(a: string) {
  console.log(a);
}

greeter(print);

/*
调用签名 
 */

type DescripFunction = {
  description: string,
  (arg: number): string
}

function doSomething(fn: DescripFunction) {
  console.log(fn.description + fn(1))
}
function fn(n: number) {
  return String(n)
}
fn.description = "hello World";

doSomething(fn);

/* 
构造签名（个人理解应该是调用函数要使用new的时候使用的）
 */

class Ctor {
  s: string
  constructor(s: string) {
    this.s = s;
  }
}

type SomeConstructor = {
  new(s: string): Ctor;
}

function fn1(class1: SomeConstructor) {
  return new class1("huangxianli")
}


/* 
调用签名和构造签名都可以使用的时候
 */
interface CallOrConstructor {
  new(s: string): Date,
  (n?: string): string
}

function fn2(fn: CallOrConstructor) {
  let d = new fn("2023-12-01");
  let s = fn();
}


/*
泛型函数
泛型： 两个值之间存在的对应关系，会使用泛型去关联
 */

// 函数的返回值和函数的入参做关联，这里的T捕获入参中的T，在调用函数的时候，可以有效的缩小函数返回值的类型
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

firstElement([1, 2, 3]);
firstElement<string>(["1", "2", "3"]); // 前面这两种调用方式都是可以的
// firstElement<string>([1,2,3]) // 这种调用方式会有问题

function map_1<Input, Output>(arr: Input[], fun: (a: Input) => Output): Output[] {
  return arr.map(fun);
}
map_1(['1', '2'], (n) => parseInt(n));

/*
限制条件 
 */
function loggest<T extends { length: number }>(a: T, b: T): T {
  if (a.length > b.length) { // 由于前面我们使用了泛型，只有在使用的时候，才知道传入的类型是怎样的，这里又要用到入参的length属性，所以在T上要加入限制条件一定要包含length属性
    return a;
  } else {
    return b;
  }
}

/* 
使用受限制
 */
function minnest<T extends { length: number }>(obj: T, num: number): T {
  if (obj.length >= num) {
    return obj;
  } else {
    // return { length: num }; // 这样是不行的，这里只是返回了满足最小限制条件的返回值
    return obj;
  }
}

/* 
指定类型参数
 */
function combin<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2)
}
// combin([1, 2, 3], ["str"]); // 这里会编译报错
combin<number | string>([1, 2, 3], ["str"]); // 强制指定泛型的类型，不指定的话，这里的两个参数必须是同一个类型


/* 
编写优秀的通用函数的准则：
1、可能的情况下，使用类型参数本身，而不是对其使用约束
2、总是尽可能少的使用类型参数
3、如果一个类型的参数只出现在一个地方，要考虑是否真的需要它
 */

function aaaGood<T>(arr: T[]): T { // 条件1，使用类型参数本身，而不是是对其使用约束
  return arr[0]
}
function aaa_1<T extends any[]>(arr: T) { // 这里约束了T必须至少为any[]
  return arr[0]
}

function bbbGood<T>(arr: T[], fn: (n: T) => boolean): T[] { // 条件2，尽可能的少使用类型参数
  return arr.filter(fn)
}
function bbb<T, F extends (n: T) => boolean>(arr: T[], fn: F): T[] {
  return arr.filter(fn)
}

function cccGood(s: string) { // 条件3，如果类型参数只出现在了一个地方，考虑是需要使用它
  console.log(s)
}
function ccc<T extends string>(s: T) {
  console.log(s);
}

/* 
可选参数
 */

function f(n: number, m?: number): number | undefined {
  if (typeof m === "string") {
    return n + m;
  } else {
    return undefined;
  }
}

/* 
回调中的可选参数
当为回调函数写一个函数类型的时候，永远不要写一个可选参数，除非打算在不传递该参数的时候调用函数
 */

function myForEach(arr: any[], callback: (arr1: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
myForEach([1, 2, 1], (arr, i) => {
  // console.log(i.toFixed()) // 这里的编译会报出问题，因为前面定义的时候，定义了该回调参数的第二个参数是可选的，不一定可以使用这个参数 
})


/*
函数重载 
函数可以在不同的参数类型和数量中被调用，在ts中可以编写重载签名，指定一个可以以不同方式调用的函数，要写一定数量的函数签名，然后是函数的主体


注意： 在调用函数的时候，参数和返回值的匹配，其实匹配的是重载签名中的
 */

/* 
function makeDate(timestamp: number): Date; // 重载签名
function makeDate(m: number, d: number, y: number): Date; // 重载签名
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date; // 实现签名 
*/

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp)
  }
}


makeDate(1);
makeDate(12, 12, 12);
// makeDate(12, 12); // 这里在编译的时候就会报错，前面的两个重载签名和实现签名是绑定在一起的，调用实现签名的时候，入参就已经限制成了重载签名函数中的


/*
编写好的重载函数
1、在可能的情况下，总是倾向于使用联合类型的参数，而不是重载参数
 */

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length
}

// len(Math.random() > 0.5 ? "hello" : [4, 5]); // 这里编译会报错，现在函数的入参满足的是string | any[]，而不是满足重载签名中的一个
// let a = Math.random() > 0.5 ? "hello" as string : [4, 5];
// len(a);

function lenGood(x: string | any[]): number {
  return x.length
}

lenGood(Math.random() > 0.5 ? "hello" : [4, 5]);

/*
函数内的this声明 
 */