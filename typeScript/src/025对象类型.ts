/* 
 */
function greet3(persion: { name: string, age: number }) {
  return "hello";
};

interface Persion1 {
  name: string,
  age: number
};
function greet4(presion: Persion1) {
  return "hello";
};

type Persion2 = {
  name: string,
  age?: number,
};
function greet5(persion: Persion2) {
  return "hello";
};

/* 
readonly
 */
interface Temp {
  name: string;
  age: number
}
interface ReadOnlyTemp {
  readonly name: string,
  readonly age: number
}
let persion3: Temp = {
  name: "",
  age: 1,
}
let persion4: ReadOnlyTemp = persion3; // 这里赋值不会报错
persion3.name = "123"; // 这里修改不会报错
// persion4.name = ""; // 这里会报错，ReadOnlyTemp接口限制了不能修改name属性

/* 
扩展类型
extends
 */

interface BasicAddress1 {
  name: string;
  street?: string;
};
interface AddressWithUnit1 extends BasicAddress1 {
  unit: string;
  // name: number; // 和父的类型不同，会报错
};

type BasicAddress2 = {
  name: string;
}
type AddressWithUnit2 = {
  name: number,
  unit: string,
} & BasicAddress2;
type AddressWithUnit3 = { // 实现继承
  unit: string,
} & BasicAddress2;

// let address1: AddressWithUnit2 = {
//   // name: "", // 这里会报错
//   // name: 12, // 这里也会报错 不能将number 分配给 never
//   unit: ""
// };
let address2: AddressWithUnit3 = {
  name: "",
  unit: ""
};


/* 
接口和联合类型的同名的冲突处理
接口：合并，存在同名属性，但是类型不同时，报错
联合类型：报错
 */
interface Sister {
  name: string;
};
interface Sister {
  age: number;
};
interface Sister {
  // name: number; // 这里与前面的name的类型不同，会报错
};
let sister1: Sister = {
  // 两个属性都要加，不然会报错
  name: "",
  age: 1
};

type Sister1 = {
  name: string,
};
// type Sister1 = {}; // 直接就报错


/* 
泛型对象类型
 */
interface Box<T> {
  content: T;
};
let box1: Box<string> = {
  content: "",
};