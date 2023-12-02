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
