/*
接口一般都采用大驼峰的命名方法 
 */

interface Point1 {
  name: string;
  age: number
};

function getUser(user: Point1): string {
  return `my name is: ${user.name}, my age is: ${user.age}`;
};
const userInfo = getUser({ name: "Huang Xianli", age: 25 });
console.log(userInfo);

/*
接口的扩展（继承），通过 extends 关键字实现
 */

interface Aminal1 {
  name: string;
};
interface Bear1 extends Aminal1 {
  age: number;
};
const bear2: Bear1 = {
  name: "Huang xianlil",
  age: 1
}


/* 
允许定义同名的接口，同名的会合并，如果相同的属性冲突了，后面定义的那个会报错
type 不允许定义同名的类型别名，而且会报错
*/

interface MyWindow1 {
  title: string;
};

interface MyWindow1 {
  count: number;
}

const win1: MyWindow1 = {
  title: "window1",
  count: 1
};


interface Interface_persion {
  name: string,
  age: number
}
const persion: Interface_persion = {
  name: "Huang Xianli",
  age: 25
}
/* 
interface Interface_persion { // 两个同名的接口，会合并，同属性冲突，后面定义的会报错
  sex: string,
  name: age
}

const persion_extend: Interface_persion = {
  name: "Huang Xiannli",
  age: 12,
  sex: "men"
}
 */

/*
interface 的继承  
 */

interface Persion_extend {
  name: string,
}
interface Persion_extend_1 {
  age: number,
}


interface Swimmer extends Persion_extend, Persion_extend_1 { // 这种写法好奇怪
  job: string
}

const swimmer: Swimmer = {
  name: "Huang Xianli",
  age: 23,
  job: 'swimmer'
}

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