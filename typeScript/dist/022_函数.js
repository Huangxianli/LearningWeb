"use strict";
function greeter(fun) {
    fun("hello World");
}
function print(a) {
    console.log(a);
}
greeter(print);
let function1 = function (aaa, bbb) {
    return "";
};
function1(1, "1");
let function2 = function () {
    return "";
};
function2(1, "");
let canIndex1 = {
    0: false,
    "nihao": false,
};
// interface DescripFunction {
//   description: string,
//   (arg: number): string
// }
function doSomething(fn) {
    console.log(fn.description + fn(1, 2, "2"));
}
function fn(n, m, z) {
    return String(n) + String(m) + String(z);
}
fn.description = "hello World";
doSomething(fn);
/*
构造签名（个人理解应该是调用函数要使用new的时候使用的）
 */
class Ctor {
    constructor(s) {
        this.s = s;
    }
}
function fn1(class1) {
    return new class1("huangxianli");
}
function fn2(fn) {
    let d = new fn("2023-12-01");
    let s = fn();
}
/*
泛型函数
泛型： 两个值之间存在的对应关系，会使用泛型去关联
 */
// 函数的返回值和函数的入参做关联，这里的T捕获入参中的T，在调用函数的时候，可以有效的缩小函数返回值的类型
function firstElement(arr) {
    return arr[0];
}
firstElement([1, 2, 3]);
firstElement(["1", "2", "3"]); // 前面这两种调用方式都是可以的
// firstElement<string>([1,2,3]) // 这种调用方式会有问题
function map_1(arr, fun) {
    return arr.map(fun);
}
map_1(['1', '2'], (n) => parseInt(n));
/*
限制条件
 */
function loggest(a, b) {
    if (a.length > b.length) { // 由于前面我们使用了泛型，只有在使用的时候，才知道传入的类型是怎样的，这里又要用到入参的length属性，所以在T上要加入限制条件一定要包含length属性
        return a;
    }
    else {
        return b;
    }
}
/*
使用受限制
 */
function minnest(obj, num) {
    if (obj.length >= num) {
        return obj;
    }
    else {
        // return { length: num }; // 这样是不行的，这里只是返回了满足最小限制条件的返回值
        return obj;
    }
}
/*
指定类型参数
 */
function combin(arr1, arr2) {
    return arr1.concat(arr2);
}
// combin([1, 2, 3], ["str"]); // 这里会编译报错
combin([1, 2, 3], ["str"]); // 强制指定泛型的类型，不指定的话，这里的两个参数必须是同一个类型
/*
编写优秀的通用函数的准则：
1、可能的情况下，使用类型参数本身，而不是对其使用约束
2、总是尽可能少的使用类型参数
3、如果一个类型的参数只出现在一个地方，要考虑是否真的需要它
 */
function aaaGood(arr) {
    return arr[0];
}
function aaa_1(arr) {
    return arr[0];
}
function bbbGood(arr, fn) {
    return arr.filter(fn);
}
function bbb(arr, fn) {
    return arr.filter(fn);
}
function cccGood(s) {
    console.log(s);
}
function ccc(s) {
    console.log(s);
}
/*
可选参数
 */
function f(n, m) {
    if (typeof m === "string") {
        return n + m;
    }
    else {
        return undefined;
    }
}
/*
回调中的可选参数
当为回调函数写一个函数类型的时候，永远不要写一个可选参数，除非打算在不传递该参数的时候调用函数
 */
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
myForEach([1, 2, 1], (arr, i) => {
    // console.log(i.toFixed()) // 这里的编译会报出问题，因为前面定义的时候，定义了该回调参数的第二个参数是可选的，不一定可以使用这个参数 
});
function makeDate(mOrTimestamp, d, y) {
    // 由于第一个重载签名只有一个入参，所以这里的d和y要是可选的
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
makeDate(1);
makeDate(12, 12, 12);
function len(x) {
    return x.length;
}
// len(Math.random() > 0.5 ? "hello" : [4, 5]); // 这里编译会报错，现在函数的入参满足的是string | any[]，而不是满足重载签名中的一个，也就是说，推断的结果必须要100%的包含在去一个重载签名内
// let a = Math.random() > 0.5 ? "hello" as string : [4, 5];
// len(a);
function lenGood(x) {
    return x.length;
}
lenGood(Math.random() > 0.5 ? "hello" : [4, 5]);
/*
手动的声明this
 */
/*
形参展开
 */
function multiply(n, ...m) {
    return m.map(x => n * x);
}
multiply(11, 12, 12, 12, 1);
/*
实参展开
 */
const arr_1 = [];
const arr_2 = [12, 2, 1];
arr_1.push(...arr_2);
const args = [8, 3];
Math.atan2(...args); // 这里atan2只接收两个参数，但是args其实在ts看来其中的内容是可变的，不一定是两个
/*
参数解构
 */
function sum({ a = 1, b = 2, c = 3 } = { a: 1, b: 2, c: 3 }) {
    console.log(a + b + c); // a,b,c是从对象中结构出来的
}
sum({ a: 1, b: 2, c: 3 });
sum();
const f1 = () => true;
const result1 = f1(); // 这里的result1会被判断成void类型
function f2() {
    // return true // 字面量函数的写法，返回定义了是void之后，在函数中就不能返回
}
