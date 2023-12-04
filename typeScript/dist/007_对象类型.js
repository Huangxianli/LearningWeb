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
let type1 = {
    prop: {
        name: "uang",
        age: 12
    }
};
// type1.prop = { name: "uang", age: 12 }; // 这里由于prop是readonly所以不能修改
type1.prop.name = "huangxianli"; // 这里name属性没有设置readonly，所以可以修改
const sister = {
    name: "hangxianli",
    age: 12
};
let box = {
    content: "123",
};
let a = {};
let ab = {
    content: a
};
