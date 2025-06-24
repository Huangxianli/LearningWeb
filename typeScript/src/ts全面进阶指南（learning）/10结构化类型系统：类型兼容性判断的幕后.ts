function test() {
  test1();
  test2();
  test3();
}

/**
 * TS 的类型系统特性：结构化类型系统
 * TS 比较两个类型并非通过类型的名称，而是比较这两个类型实际上拥有的属性和方法（结构一致）
 * 鸭子模型：只要是包含了鸭子的所有特定，那就是鸭子
 */
function test1() {
  // 注意这里讨论的是对象类型中属性的多少，而不是属性类型
  type Cat = {
    name: string;
    age: number;
  };
  type Dog = {
    name: string;
    age: number;
    sex: boolean;
  };

  const dog1: Dog = {
    name: '',
    age: 0,
    sex: false,
  };

  function a(cat: Cat) {}
  // 作为参数的时候，可以多出属性
  a(dog1);

  let cat1: Cat = {
    name: '',
    age: 0,
    // sex: false,  定义的时候，不能多出任何的属性
  };
  cat1 = dog1; // 赋值的时候可以多出属性
  // dog1 = cat1; // 赋值的时候，不能少属性

  // 定义的是否不能多也不能少
  // 赋值的时候遵循的是鸭子类型系统，等号后面的变量的属性只能多不能少
}

function test2() {
  interface Cat {
    name: '';
    age: number;
  }
  interface Dog1 {
    name: '';
    age: number;
    eat(): void;
  }
  interface Dog2 {
    name: '';
    age: number;
    eat(): void;
  }
  let cat: Cat = {
    name: '',
    age: 1,
  };
  let dog1: Dog1 = {
    name: '',
    age: 1,
    eat() {},
  };
  cat = dog1; // 符合结构化类型（在赋值的时候，属性多的类型可以赋值给属性少的类型，只要属性多的类型包含了全部属性少的类型的属性，而且结构是一致的）

  let cat2: Cat = dog1; // 如果是将变量赋值给其，只要是结构一致，可以多出属性
  let cat3: Cat = {
    name: '',
    age: 1,
    // eat() {}, // 将一个值赋值给其，这种方式进行赋值的话，不能一个属性也不能少一个属性
  };
  let dog2: Dog2 = dog1;
}

function test3() {
  type A = string;
  type B = string;
  let a: A = '';
  let b: B = a;
}

export default test;
