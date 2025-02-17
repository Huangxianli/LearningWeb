function test() {
  console.log('---类型编程基石：TypeScript 中无处不在的泛型---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
  test5();
  test6();
};
/**
 * 类型别名如果使用了泛型坑位，那么就相当于一个接收参数的函数
 * 泛型大部分的事件用来进行工具类型的封装
 */
function test1() {
  type MyType<T> = T | null | undefined | false | 0;
  // 如果是转化成函数就相当于
  /* function MyType(T) {
    return [T, null, undefined, false, 0];
  } */

  // 条件类型
  type IsEqual<T> = T extends true ? 1 : 2;
  // const a: IsEqual<false> = 1; // 会报错，不能把 1 分配给 2
  const b: IsEqual<false> = 2;
};

/**
 * 泛型约束与默认值
 */
function test2() {
  type MyType<T = string> = T | number | string; // 给 T 设置默认值

  // 泛型约束，要求传入的工具类型的泛型必须符合某些条件，使用 extends 关键子来约束传入的泛型参数
  type ResultStatus<T extends number> = T extends 200 ? 'success' : 'fail'; // 要求传入的 T 必须是 number 类型

  // type Res1 = ResultStatus<'200'>; // 会报错

};

/**
 * 多泛型关联
 */
function test3() {
  type MyType<T, S extends T> = number;
};

/**
 * 对象类型中的泛型
 */
function test4() {
  interface IRes<T = unknown> {
    code: number,
    error?: string,
    data: T
  }
};

/**
 * 函数的泛型
 */
function test5() {

  function handle<T>(input: T): T { // 在调用函数传入参数的时候，T 会自动被填充为这个参数的类型，类型的信息会尽可能的推导的更精细，可以推导到字面量的时候会尽量的推导到字面量类型，而非基础类型
    return input;
  };

  // 箭头函数中加入泛型的表示
  const handle1 = <T>(a: T): T => a;
  const handle2: <T>(a: T) => T = (a) => a;
};

/**
 * Class 中的泛型
 * 函数中的泛型的消费方是 参数和返回值类型
 * Classs 中的泛型的消费方是 属性、方法、装饰器等；内部方法也可以有自己独有的泛型参数
 */
function test6() {
  class Queueo<T> {
    list: T[];
    constructor(list: T[]) {
      this.list = list;
    };

    add(item: T) {
      this.list.push(item);
    };
    add1<T1 extends T>(item: T1) {
      this.list.push(item);
    };

  };
};


export default test;