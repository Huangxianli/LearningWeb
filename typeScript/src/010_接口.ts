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
接口向已有的接口中添加新的属性，两个同名的会合并
type 就没有这种方法，不会合并，而且会报错
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

/* interface Interface_persion {
  sex: string
}

const persion_extend: Interface_persion = {
  name: "Huang Xiannli",
  age: 12,
  sex: "men"
} */


/*
interface 的继承  
 */

interface Persion_extend {
  name: string,
}
interface Persion_extend_1 {
  age: number,
}


interface Swimmer extends Persion_extend, Persion_extend_1 {
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