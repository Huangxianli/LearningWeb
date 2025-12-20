"use strict";
/*
数组有两种表示方式
 */
let arr1 = [];
arr1 = [1, 2, 3];
// arr1 = ["1"];
const arr2 = []; // 这种写法称之为泛型写法
const arrry1 = [];
const array2 = [];
const array3 = [];
const array4 = [];
let array5 = [];
const array6 = [];
const array8 = [];
// 其实这种写法就是完全的等同于 type Array6<T> = Array<T>，前面的写法就是冗余的，
// const array9: Array6<any> = [];
const array9 = []; // 两者是完全等同的
array9.push({}); // 这种写法 Array6 会有数组的所有属性和方法
