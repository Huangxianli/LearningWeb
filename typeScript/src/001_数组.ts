/*
数组有两种表示方式 
 */

let arr1: number[] = [];
arr1 = [1, 2, 3];
// arr1 = ["1"];

const arr2: Array<number> = []; // 这种写法称之为泛型写法

interface Array1 {
  [index: number]: string | number; // 需要注意，这个表明的其实不是数组，表示的是任何可以使用数字作为索引来访问其内容的对象，这个类型对应的变量不一定有数组的方法（pop、push 等），它包含了 1、真正的数组 2、所有 key 都能隐式被转化成数组类型的普通对象 3、类数组对象
}
type Array2 = number[];
type Array3 = {
  [n: number]: number;
};
type Array4 = {
  [n: number]: number | string;
};

const arrry1: Array1 = [];
const array2: Array2 = [];
const array3: Array<number> = [];
const array4: number[] = [];
let array5: Array3 = [];

const array6: Array4 = [];
// array5 = array6; // 类型更广的不能分配给类型更收紧的
// const array7: Array3 = array6;

type Array5<T> = {
  [n: number]: T;
};

const array8: Array5<number | string | Record<keyof any, string>> = [];
// array8.push({}); // 不存在 push 属性，说明这种声明方式其实并不是真正的声明数组

type Array6<T> = {
  [n: number]: T;
} & Array<T>;
// 其实这种写法就是完全的等同于 type Array6<T> = Array<T>，前面的写法就是冗余的，

// const array9: Array6<any> = [];
const array9: Array<any> = []; // 两者是完全等同的
array9.push({}); // 这种写法 Array6 会有数组的所有属性和方法
