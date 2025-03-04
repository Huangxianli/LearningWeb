/**
 * 工具类型的分类
 * 1. 属性修饰工具类型
 * 2. 结构工具类型
 * 3. 集合工具类型
 * 4. 模式匹配工具类型（基于 infer 的模式匹配，对一个既有的类型特定位置类型的提取）
 * 5. 模板字符串工具类型
 */
function test(): void {
  test1();
  test2();
  test3();
  test4();
};

/**
 * 属性修饰工具类型
 * 主要使用属性修饰、映射类型与索引类型相关
 */
declare const never1: never;
function test1(): void {
  type Partial<T> = { // 复制 T 并且属性都是可选的
    [P in keyof T]?: T[P];
    // 可以理解为 [P in keyof T]+?: T[P];
  };
  type Prequired<T> = { // 复制 T 并且所有属性都是必选的
    [P in keyof T]-?: T[P];
  };
  type Readonly<T> = { // 复制 T 并且所有属性都是只读的
    readonly [P in keyof T]: T[P];
  };

  interface A {
    a1: string,
    a2?: number,
    a3: undefined | string,
    a4?: undefined | string,
    a5: undefined,
  };

  type B = Partial<A>
  /*
    type B = {
      a1?: string | undefined;
      a2?: number | undefined;
      a3?: undefined | string;
      a4?: undefined | string | undefined;
      a5?: undefined;
    }
   */

  const b1: B = {
    a1: undefined, // 可以是 undefined，也可以是没有这个属性
    a2: undefined, // 可以是 undefined，也可以是没有这个属性
    a4: undefined,
  }

  interface Test1 {
    name?: number
  };
  const test1: Test1 = { name: undefined }; // ? 本身就可以是 没有这个属性或者这个属性的值为 undefined 


  type C = Required<B>; // 会将可选的变成必选的，同时将联合类型中 undefined 去除掉，如果本身就是 undefined 类型，则会转化成 never 类型
  /*
   type C = {
    a1: string;
    a2: number;
    a3: string;
    a4: string;
    a5: never;
   }
   */
  const c: C = {
    a1: '',
    a2: 1,
    a3: '',
    a4: '',
    a5: never1,
  }

  type D = Readonly<A>; // 将所有的属性转化成只读
  /*
    type D = {
      readonly a1: string;
      readonly a2?: number | undefined;
      readonly a3: undefined | string;
      readonly a4?: undefined | string | undefined;
      readonly a5: undefined;
    }
  */


  // 如何去除 readonly
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  }
  type E = Mutable<D>;
  /*
    type E = {
      a1: string;
      a2?: number | undefined;
      a3: undefined | string;
      a4?: undefined | string | undefined;
      a5: undefined;
    }
  */

};

/**
 * 结构工具类型
 * 对类型的裁剪、拼接、转换等
 * 结构声明 和 结构处理
 */
function test2(): void {
  test2_1();
  test2_2();
};

/**
 * 结构声明工具
 * 快速的声明一个结构
 */
function test2_1() {
  type Record<K extends keyof any, T> = { // 构建一个对象类型 key 是 string | number | symbol 类型，value 可以是任何类型
    [P in K]: T;
  };

  // 键名均为字符串，键值类型未知
  type Record1 = Record<string, unknown>;
  // 键名均为字符串，键值类型任意
  type Record2 = Record<string, any>;
  // 键名为字符串或 symbol，键值类型任意
  type Record3 = Record<string | symbol, any>; // 相当于 type Record3 = { [key: string | symbol]: any }
  const record3: Record3 = {}; // 即使是没有传属性也不会报错

  type Record4 = Record<'a' | 'b', any>; // 这种类型一定是要 a 和 b 属性都在，不然会报错；相当于 type Record = { a: any, b: any }
  const record4: Record4 = {
    a: 1,
    b: 2,
  };
  type Record5 = Record<string | 12, any>; // 相当于 type Record5 = { 12: any, [key: string]: any }
  const record5: Record5 = {
    12: 1,
  }


};

/**
 * 结构处理工具
 */
function test2_2() {
  type Pick<T, K extends keyof T> = { // 从对象中生成一个新的对象，新的对象是原来对象的子集
    [P in K]: T[P];
  };

  interface Foo {
    name: string;
    age: number;
    job: String;
  }

  type PickedFoo = Pick<Foo, "name" | "age">
  /*
    type PickedFoo = {
      name: string;
      age: number;
    }
  */

  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; // 根据对象和键生成一个不包含该键的新对象；在使用 Omit 的时候，传入的 key 没有要求必须在对象内 

};

/**
 * 集合工具类型
 * 主要的使用条件类型、条件类型分布式特点
 */
function test3(): void {
  type Extract<T, U> = T extends U ? T : never; // 交集

  type Extract1 = Extract<1, 1 | 2>; // 1


  type Exclude<T, U> = T extends U ? never : T; // 差集

  type Exclude1 = Exclude<1 | 2 | 3, 2>; // 1 | 3

  // 如何实现交集
  type Concurrence<A, B> = A | B;

  // 如何实现补集（补集是差集的一种特殊情况，B 要完全在 A 里面）
  type Complement<A, B extends A> = Exclude<A, B>;

  // 固定的内置 排除 null 和 undefined 的工具类型
  type NonNullable<T> = T extends null | undefined ? never : T;
};

/**
 * 模式匹配工具类型
 * 主要使用条件类型和 infer 关键字
 */
function test4() {
  type FunctionType = (...args: any) => any;

  type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never; // 获取函数的入参的类型

  type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any; // 获取函数的人会值的类型

  type FirstParameter<T extends FunctionType> = T extends (
    arg: infer P,
    ...args: any
  ) => any
    ? P
    : never; // 获取函数第一个参数的类型
};


export default test;