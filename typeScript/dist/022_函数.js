"use strict";
function greeter(fun) {
    fun('hello World');
}
function print(a) {
    console.log(a);
}
greeter(print);
let function1 = function (aaa, bbb) {
    // 这里可以不写参数和返回值类型，如果写的话，必须与Function1相同，但是名称可以不同
    return '';
};
function1(1, '1');
let function2 = function () {
    return '';
};
function2(1, '');
let function3 = function (a) {
    return a;
};
function3.length = 2;
let canIndex1 = {
    0: false,
    nihao: false,
};
// interface DescripFunction {
//   description: string,
//   (arg: number): string
// }
function doSomething(fn) {
    console.log(fn.description + fn(1, 2, '2'));
}
function fn(n, m, z) {
    return String(n) + String(m) + String(z);
}
fn.description = 'hello World';
doSomething(fn);
/*
构造签名（个人理解应该是调用函数要使用 new 的时候使用的）
 */
class Ctor {
    constructor(s) {
        this.s = s;
    }
}
Ctor.data = '';
function fn1(class1) {
    return new class1('huangxianli');
}
fn1(Ctor);
function fn2(fn) {
    let d = new fn('2023-12-01');
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
firstElement(['1', '2', '3']); // 前面这两种调用方式都是可以的
// firstElement<string>([1,2,3]) // 这种调用方式会有问题
function firstElement4(arr) {
    return arr[0];
}
firstElement4([]);
function map_1(arr, fun) {
    return arr.map(fun);
}
map_1(['1', '2'], (n) => parseInt(n));
/*
限制条件
 */
function loggest(a, b) {
    if (a.length > b.length) {
        // 由于前面我们使用了泛型，只有在使用的时候，才知道传入的类型是怎样的，这里又要用到入参的 length 属性，所以在 T 上要加入限制条件一定要包含 length 属性
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
combin([1, 2, 3], ['str']); // 强制指定泛型的类型，不指定的话，这里的两个参数必须是同一个类型
/*
编写优秀的通用函数的准则：
1、可能的情况下，使用类型参数本身，而不是对其使用约束
2、总是尽可能少的使用类型参数
3、如果一个类型的参数只出现在一个地方，要考虑是否真的需要它
 */
function aaaGood(arr) {
    // 条件1，使用类型参数本身，而不是是对其使用约束
    return arr[0];
}
function aaa_1(arr) {
    // 这里约束了T必须至少为any[]
    return arr[0];
}
function bbbGood(arr, fn) {
    // 条件2，尽可能的少使用类型参数
    return arr.filter(fn);
}
function bbb(arr, fn) {
    return arr.filter(fn);
}
function cccGood(s) {
    // 条件3，如果类型参数只出现在了一个地方，考虑是需要使用它
    console.log(s);
}
function ccc(s) {
    console.log(s);
}
/*
可选参数
 */
function f(n, m) {
    if (typeof m === 'string') {
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
    // 由于第一个重载签名只有一个入参，所以这里的 d 和 y 要是可选的
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
// len(Math.random() > 0.5 ? "hello" : [4, 5]); // 这里编译会报错，现在函数的入参满足的是string | any[]，而不是满足重载签名中的一个，也就是说，推断的结果必须要 100% 的包含在同一个重载签名内
// let a = Math.random() > 0.5 ? ('hello' as string) : [4, 5];
// len(a);
function lenGood(x) {
    return x.length;
}
lenGood(Math.random() > 0.5 ? 'hello' : [4, 5]);
/*
手动的声明 this
如果限制 this，this 要限制在第一个参数，同时在调用的时候要注意 this 的指向
 */
function useThis() {
    return this.getName();
}
const useThisParam = {
    name: '1',
    getName() {
        return this.name;
    },
};
useThis.call(useThisParam);
const useThis1_1 = {
    name: '1',
    getName() {
        return this.name;
    },
};
const { getName } = useThis1_1;
getName.call(useThis1_1); // 必须要绑定指定类型的 this，不然会报错
const useThis1_2 = {
    name: '',
    getName() {
        return this.name;
    },
};
getName.call(useThis1_2); // 只要 this 的类型是限制的类型就可以
/*
形参展开
 */
function multiply(n, ...m) {
    return m.map((x) => n * x);
}
multiply(11, 12, 12, 12, 1);
/*
实参展开
 */
const arr_1 = [];
const arr_2 = [12, 2, 1];
arr_1.push(...arr_2);
const args = [8, 3];
Math.atan2(...args); // 这里 atan2 只接收两个参数，但是 args 其实在 ts 看来其中的内容是可变的，不一定是两个所以要使用 const 来给与提示
/*
参数解构
 */
function sum({ a = 1, b = 2, c = 3 } = {
    a: 1,
    b: 2,
    c: 3,
}) {
    console.log(a + b + c); // a,b,c是从对象中结构出来的
}
sum({ a: 1, b: 2, c: 3 });
sum();
const f1 = () => true;
const result1 = f1(); // 这里的 result1 会被判断成 void 类型
function f2() {
    // return true // 字面量函数的写法，返回定义了是 void 之后，在函数中就不能返回
}
