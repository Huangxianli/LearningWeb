/*
数组有两种表示方式 
 */

let arr1: number[] = [];
arr1 = [1, 2, 3];
// arr1 = ["1"];

const arr2: Array<number> = []; // 这种写法称之为泛型写法

interface Array1 {
  [index: number]: string | number
}
type Array2 = number[];
type Array3 = {
  [n: number]: number
}

const arrry1: Array1 = [];
const array2: Array2 = [];
const array3: Array<number> = [];
const array4: number[] = [];
const array5: Array3 = [];