"use strict";
/* {
    a: string; // 这里可以是逗号，也可以是分号
    b: number
}  */
const obj1 = {
    a: 123,
    b: ""
};
/* const obj2: {
    a: number
} = {
    a: ""
}; */
/* const obj3: {
    a: number
} = {
    a: 123,
    b: 123
}; */
function fun3(arg1) {
    console.log("My name is: ", arg1.name, ", my age is: ", arg1.age);
}
;
fun3({ name: "huanxgianli", age: 12 });
/* function objFun(a: { a: number, b: string }): string {
  return a.b;
}
const objFunArg = { a: 123, b: '' };
objFun(objFunArg); */ 
