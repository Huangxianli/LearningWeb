"use strict";
function greeter(fun) {
    fun("hello World");
}
function print(a) {
    console.log(a);
}
greeter(print);
function doSomething(fn) {
    console.log(fn.description + fn(1));
}
function fn(n) {
    return String(n);
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
