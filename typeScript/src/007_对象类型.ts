
/* {
    a: string; // 这里可以是逗号，也可以是分号
    b: number
}  */


const obj1: {
  a: number;
  b: string
} = {
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


function fun3(arg1: { name: string; age: number }): void {
  console.log("My name is: ", arg1.name, ", my age is: ", arg1.age);
};

fun3({ name: "huanxgianli", age: 12 });


/* function objFun(a: { a: number, b: string }): string {
  return a.b;
}
const objFunArg = { a: 123, b: '' };
objFun(objFunArg); */

/*
属性修改器
 */

// 可选属性
interface PaintOptions {
  shape: string;
  x?: number; // 可选的，使用该接口的时候，对象可以有这个属性，也可以没有这个属性
  y?: number;
}

// 只读属性
// 注意：如果两个类型的属性是相同的，但是一个是只读的，一个是非只读的，对应的使用这两个接口的对象，将非只读的对象直接赋值给只读的那个对象，是可以赋值成功的，需改非只读的对象的属性的时候，只读的那个也会同步的修改，所以readonly也不是绝对安全的 
interface SomeType {
  readonly prop: string;
}

interface SomeType_1 {
  readonly prop: {
    name: string;
    age: number
  }
}

let type1: SomeType_1 = {
  prop: {
    name: "uang",
    age: 12
  }
}

// type1.prop = { name: "uang", age: 12 }; // 这里由于prop是readonly所以不能修改
type1.prop.name = "huangxianli"; // 这里name属性没有设置readonly，所以可以修改


// 索引签名
interface StringArray {
  [index: number]: string | object; // 这里的index只写number 或 string
}
const stringArr1: StringArray = [];
// stringArr1['1'] = 1;
stringArr1['1'] = '1';


/* 
扩展类型
 */

interface BasicAddress {
  name?: string;
  street: string;
}
interface aaa {
  ddd: string
}

interface AddressWithUnit extends BasicAddress, aaa {
  unit: string;
  // name: number; 和BasicAddress中的name的类型不同就会报错
}

/* 
接口与交叉类型
 */

interface Sister {
  name: string;
}
interface Sister { // 可以定义相同名称的接口interface
  age: number;
}

const sister: Sister = { // 同名的interface会合并
  name: "hangxianli",
  age: 12
}

type Sister_1 = {
  name: string;
}
/* type Sister_1 = { // 不能定义重复名称的类型别名
  age: number
} */


/* 
泛型对象类型 
 */
interface Box<T> {
  content: T;
}
let box: Box<string> = { // 对象的泛型，这里必须手动的加入类型
  content: "123",
}

interface Apple {

}

type AppleBox = Box<Apple>;
let a: Apple = {};
let ab: Apple = {
  content: a
}

type Box_1<T> = { // 类型别名也可以使用泛型
  content: T;
}
type OrNill<T> = T | null;
