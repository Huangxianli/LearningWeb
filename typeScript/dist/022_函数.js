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
}; // 函数本身就有一个 length 属性，表明的是函数预期接受参数的个数，有默认值的情况下，它以及它后面的参数都不计入 length 中， ...args 永远不会计入到其中，结构参数只会计一个
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
const fn_1 = (n, m, z) => {
    return String(n) + m + z;
};
fn_1.description = '';
/*
  构造签名（个人理解应该是调用函数要使用 new 的时候使用的）
  定义一个类的形状、或者说定义一个可以被 new 实例化的函数（被显示的断言成了构造器的函数）
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
// function Fn2(s?: string): string;
// function Fn2(this: Date, s: string): Date; // 即使加了 this 也不会认定为构造函数
// function Fn2(s?: string) {
//   if (s) {
//     return new Date(s);
//   } else {
//     return s;
//   }
// }
// const fn2_1: CallOrConstructor = Fn2; // 会报错，因为如果不使用断言函数在定义的时候的根本就无法被 ts 判定为构造函数
/*
  泛型函数
  泛型： 两个值之间存在的对应关系，会使用泛型去关联
 */
// 函数的返回值和函数的入参做关联，这里的 T 捕获入参中的 T，在调用函数的时候，可以有效的缩小函数返回值的类型
function firstElement(arr) {
    return arr[0];
}
firstElement([1, 2, 3]);
firstElement(['1', '2', '3']); // 前面这两种调用方式都是可以的
// firstElement<string>([1,2,3]) // 这种调用方式会有问题，传给泛型的内容和实际判断的内容不符
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
// combin([1, 2, 3], ["str"]); // 这里会编译报错，先看第一个参数，将 T 推断成 number，再看第二个参数的时候，如果两个推导出来的优先级是一样的，就看第一个参数的类型，如果第二个的类型的优先级更高，就看第二个的
combin([1, '1'], ['']);
combin([], []); // 注意这里的 T 会被推断成 never
combin([], ['']); // 推断成 string
combin([''], ['', 1]); // 第一个推导成 string，但是第二个推导成 string | number，优先级更高，最终被推导成 string | number
combin([1, 2, 3], ['str']); // 强制指定泛型的类型，不指定的话，这里的两个参数必须是同一个类型
/*
  编写优秀的通用函数的准则：
  1、可能的情况下，使用类型参数本身，而不是对其使用约束（能直接用泛型代表数据本身时，就不要试图去定义数据的容器形状；尽量延迟累心的收窄，让 ts 自己去顺着数据做推断）
  2、总是尽可能少的使用类型参数
  3、如果一个类型的参数只出现在一个地方，要考虑是否真的需要它
 */
function aaaGood(arr) {
    // 条件1，使用类型参数本身，而不是是对其使用约束
    return arr[0];
}
function aaa_1(arr) {
    // 这里约束了 T 必须至少为 any[]，前面一个函数的泛型更加的合理
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
  可选参数和默认值是冲入的
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
    console.log(i?.toFixed()); // 前面定义了第二个参数是可选的，所以在调用的时候要做兼容处理，不然编译会报错
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
// len(Math.random() > 0.5 ? "hello" : [4, 5]); // 这里编译会报错，现在函数的入参满足的是 string | any[]，而不是满足重载签名中的一个，也就是说，推断的结果必须要 100% 的包含在同一个重载签名内
// let a = Math.random() > 0.5 ? ('hello' as string) : [4, 5];
// len(a);
function lenGood(x) {
    return x.length;
}
lenGood(Math.random() > 0.5 ? 'hello' : [4, 5]);
/*
  手动的声明 this
  如果限制 this，this 要限制在第一个参数，同时在调用的时候要注意 this 的指向，ts 只要保证 this 的格式，而不是 this 的具体值
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
    console.log(a + b + c); // a, b, c 是从对象中解构出来的
}
sum({ a: 1, b: 2, c: 3 });
sum();
sum({});
sum({ a: 1 });
const f1 = () => true;
const result1 = f1(); // 这里的 result1 会被判断成 void 类型
function f2() {
    // return true; // 字面量函数的写法，返回定义了是 void 之后，在函数中就不能返回除了 undefined 之外的其他内容
    return undefined;
}
