function test() {
  console.log('---类型里的逻辑运算：条件类型与 infer ---------------------------------------------');

  test1();
  test2();
  test3();

};
/**
 * 条件类型基础
 * 对于能够进行赋值的变量，不要求他们变量的类型是完全相等的，只需要具有兼容性
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  // 两个参数都使用了泛型参数 T，在使用的时候，T 会被填充为一个联合类型
  const fun1 = function <T extends string | number>(x: T, y: T): T {
    return x + (y as any);
  };
  // fun1(1, '12'); // 两个参数设置的都是 T 类型，但是 1 和 '12' 两者 并不兼容，所以会报错
  // 在 x 传入 1 的时候，满足了 T extends number， 后面的参数也要满足 T extends number，传入‘12’的时候，不满足该条件，所以会报错

  const a = fun1(1, 2); // a: 1 | 2； T 被自动的推导为 1 | 2 的联合类型

  // 由于 T 会被推导为一个联合类型，返回的值如果直接使用 T ，推导出来的也是一个联合类型的值，和实际中函数返回的内容是不同的

  type Result1<T> = T extends number ? number : T extends string ? string : never;
  const fun2 = function <T extends number | string>(x: T, y: T): Result1<T> {
    return x + (y as any);
  };

  const b = fun2(1, 2); // b number
};

/**
 * infer 关键字在条件类型中提取类型的一部分信息
 * infer 只能在条件类型中使用
 */
function test2() {
  console.log('---test2---------------------------------------------');

  type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T; // 交换元组中数据的位置
  type Swap1<T extends any[]> = T extends [infer A, ...infer Left, infer B] ? [B, A] : T; // 获取到第一个和最后一个，组成一个新的元组，并且调换数据
  // infer 可以和 reset 操作符一样同时提取一组不定长的类型

  type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

  type A1 = ArrayItemType<string[]>; // A1 string
  type A2 = ArrayItemType<[string, number, undefined]>; // A2 string | number | undefined

  // infer 结构也可以是接口
  // 根据对象和传入的属性，获取该属性对应的类型
  type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;
  // type PropTypeResult1 = PropType<{ name: string; age: number }, 'a'>; // 不满足第二个泛型的约束，会报错
  type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number
};

/**
 * 分布式条件类型
 * 参数类型是联合类型，且类型参数是通过泛型的方式传入的，条件类型中的泛型不能被包裹，这样就产生了分布式条件类型
 */
function test3() {
  console.log('---test3---------------------------------------------');

};

export default test;