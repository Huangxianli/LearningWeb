"use strict";
/*
null 表示不存在
undefined 表示已经声明但是未初始化的值

在 ts 中，null 和 undefined 表示两个具体的类型，两者是不能相互赋值的
 */
let x = undefined;
// x = null;
let y = null;
// y = undefined;
// 在变量初始化的时候，给变量赋值 undefined 或者 null 的话（strictNullCheck: false 的时候）,该变量会被推导成 any 类型，如果是 strictNullCheck: true 的话，赋值什么就会推断成什么类型呢，而不是推断成 any
let z = undefined; // z 被推断成 any 类型
z = null;
z = 123;
z = '123';
let aa = null; // aa 被推断成 any 类型
aa = undefined;
aa = 123;
aa = '123';
