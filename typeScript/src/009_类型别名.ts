/* 
类型在多个地方重复的使用，或者是一个类型比较复，不利于阅读的时候
 */

type Id = number | string;

type Point = {
  name: string;
  age: number
};

const user: Point = {
  name: "huangxianli",
  age: 12
};

const userId: Id = 123;

function fun1(user: Point): Point {
  return user;
};


/*
类型别名的拓展（继承），通过 & 符号来实现
 */

type Aminal = {
  name: string;
};

type Bear = Aminal & {
  age: number;
};

const bear1: Bear = {
  name: "huangxianli",
  age: 12
}


type Persion = {
  name: string,
  sex: string,
  age: number
};

const huang: Persion = {
  name: "Huang Xianli",
  sex: "men",
  age: 25
}

type Swimming = Persion & {
  job: string
}

type Swimming_1 = Swimming & Persion & {
  name: string
}

const swimming: Swimming = {
  name: "Huang Xianli",
  age: 25,
  sex: "men",
  job: "swimer"
}