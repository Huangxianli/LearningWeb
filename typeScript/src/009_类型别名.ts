/* 
  类型在多个地方重复的使用，或者是一个类型比较复杂，不利于阅读的时候，可以使用类型别名
 */

type Id = number | string; // Id 就是类型别名

type Point = {
  name: string;
  age: number;
};

const user: Point = {
  name: 'huangxianli',
  age: 12,
};

const userId: Id = 123;

function fun1(user: Point): Point {
  return user;
}

/*
  类型别名的拓展（继承，更准确的说是 交叉类型），通过 & 符号来实现
  交叉类型的目的是：将多个类型合并成一个类型，可以想象成“与”
  A & B 表明新的类型要有 A 的所有属性也要有 B 的所有属性
 */

type Aminal = {
  name: string;
};

type Bear = Aminal & {
  name: number | string; // 不一致不会报错，会取交集，如果两个冲突的话，会为 never
  age: number;
};

const bear1: Bear = {
  name: '',
  age: 12,
};
/* 
const baer2: Bear = {
  name: "hahah"
}
 */

type Persion = {
  name: string;
  sex: string;
  age: number;
};

const huang: Persion = {
  name: 'Huang Xianli',
  sex: 'men',
  age: 25,
};

type Swimming = Persion & {
  job: string;
};

type Swimming_1 = Swimming &
  Persion & {
    name: string;
  };

const swimming: Swimming = {
  name: 'Huang Xianli',
  age: 25,
  sex: 'men',
  job: 'swimer',
};

type A1 = {
  name: string;
};
type A2 = {
  name: number;
};
type A3 = A1 & A2;
/* 
  // 这里的两个赋值否会报错，不能将  类型赋值给 never
  const a1: A3 = {
    name: 1,
  };
  const a2: A3 = {
    name: '12',
  };
 */
