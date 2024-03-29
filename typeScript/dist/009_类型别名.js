"use strict";
/*
类型在多个地方重复的使用，或者是一个类型比较复杂，不利于阅读的时候
 */
const user = {
    name: "huangxianli",
    age: 12
};
const userId = 123;
function fun1(user) {
    return user;
}
;
const bear1 = {
    name: "huangxianli",
    age: 12
};
const huang = {
    name: "Huang Xianli",
    sex: "men",
    age: 25
};
const swimming = {
    name: "Huang Xianli",
    age: 25,
    sex: "men",
    job: "swimer"
};
/*
// 这里的两次付值否会报错，不能将  类型赋值给never
const a1: A3 = {
  name: 1
};
const a2: A3 = {
  name: "12"
}
 */ 
