"use strict";
/* {
    a: string; // 这里可以是逗号，也可以是分号
    b: number
}  */
const obj1 = {
    a: 123,
    b: '',
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
    console.log('My name is: ', arg1.name, ', my age is: ', arg1.age);
}
fun3({ name: 'huanxgianli', age: 12 });
let type1 = {
    prop: {
        name: 'uang',
        age: 12,
    },
};
// type1.prop = { name: "uang", age: 12 }; // 这里由于 prop 是 readonly 所以不能修改
type1.prop.name = 'huangxianli'; // 这里 name 属性没有设置 readonly，所以可以修改
let type0 = {
    prop: '',
};
let type2 = {
    prop: '',
};
type0 = type2;
type2.prop = '1'; // type0 会同步修改，所以说 readonly 不是绝对安全的
const stringArr1 = [];
// stringArr1['1'] = 1;
stringArr1['1'] = '1';
const sister = {
    // 同名的 interface 会合并，所以两个属性都要写
    name: 'hangxianli',
    age: 12,
};
let box = {
    // 对象的泛型，这里必须手动的加入类型
    content: '123',
};
let a = {};
let ab = {
    content: a,
};
