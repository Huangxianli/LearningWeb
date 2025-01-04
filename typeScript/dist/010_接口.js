"use strict";
/*
接口一般都采用大驼峰的命名方法
 */
;
function getUser(user) {
    return `my name is: ${user.name}, my age is: ${user.age}`;
}
;
const userInfo = getUser({ name: "Huang Xianli", age: 25 });
console.log(userInfo);
;
;
const bear2 = {
    name: "Huang xianlil",
    age: 1
};
;
const win1 = {
    title: "window1",
    count: 1
};
const persion = {
    name: "Huang Xianli",
    age: 25
};
const swimmer = {
    name: "Huang Xianli",
    age: 23,
    job: 'swimmer'
};
/* const swimmer_1: Swimmer{
  job:"swimmer"
} */
/*
interface A1 {
  name: string
};
interface A2 {
  name: number,
  age: number
}

interface A3 extends A1, A2 { };
// 接口“A3”不能同时扩展类型“A1”和“A2”。
// “A1”和“A2”类型的命名属性“name”不完全相同
const a1: A3 = {
  name: "", // 这里也会报错，string和number都报错
  age: 12,
}
 */ 
