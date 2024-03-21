/* 
标识符：
变量、函数、属性、函数参数的名称
第一个字符必须是一个字母、下划线或者美元符
剩下的字符可以是字母、下划线、美元符、数字
一般采用小驼峰 
*/

/* 
严格模式
"use strict"
es3中一些不规范的写法在这个模式下会被处理掉
 */


/* 
数据类型
原始类型（6种）、引用类型（对象）

typeof：
"undefined" Undefined | 没有声明变量 | 声明了变量但是没有显示的赋值
"boolean" Boolean
"number" Number
"string" String
object" Object | Null
"function" Function
"symbol" Symbol

沿着作用域查找，如果没有定义，使用该操作符，返回的是 "undefined"；但是如果声明了，但是如果在当前作用域内声明了，在声明前使用该操作符，会报错（由于暂时性死区）
 */

let a1 = {};
let a2 = {};
function b () {
  console.log(typeof a1); // "object"
  // console.log(typeof a2);  // 报错ReferenceErro
  let a2 = function () { };
  return function c () {
    console.log(typeof a2); // 执行"b()()"的时候，会输出"function"  那么作用域和作用域链是在什么时候创建的
  }
}
b();
b()();