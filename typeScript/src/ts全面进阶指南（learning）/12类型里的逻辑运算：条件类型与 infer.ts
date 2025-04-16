function test() {
  console.log('--- 类型里的逻辑运算：条件类型与 infer ---------------------------------------------');

  test1();
  test2();
  test3();

};
/**
 * 条件类型基础
 * 对于能够进行赋值的变量，不要求他们变量的类型是完全相等的，只需要具有兼容性
 * 
 * 记住：泛型参数的实际类型会在 实际调用 时才被填充（类型别名中显式传入，或者函数中隐式提取）
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  // 两个参数都使用了泛型参数 T，在使用的时候，T 会被填充为一个联合类型
  const fun1 = function <T extends string | number>(x: T, y: T): T {
    return x + (y as any); // 这里加 as 是因为使用连个参数定义为 T 泛型类型，在没有执行该函数的时候，其实是不能将 T 类型缩小范围的，x 和 y 的类型都是 （string | number） 的子类型，相当于 (string + number) + (string | number)，如果不加上 any 其中一个会报错
  };
  // fun1(1, '12'); // 两个参数设置的都是 T 类型，但是 1 和 '12' 两者 并不兼容，所以会报错
  // 在 x 传入 1 的时候，满足了 T extends number， 后面的参数也要满足 T extends number，传入‘12’的时候，不满足该条件，所以会报错

  fun1<number | string>(1, '12'); // 这样又不报错，这和函数的泛型推断策略有关系

  const a = fun1(1, 2); // a: 1 | 2； T 被自动的推导为 1 | 2 的联合类型
  // const c: 5 | 8 = a;

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
  type Swap2<T extends number[]> = T extends [infer A, ...infer Center, infer B] ? [...Center] : [];
  let swap2_1: Swap2<[1, 2, 3]> = [2]; // 根据传入的内容，只能是 [2]，如果不是的话，会报错
  let arr2_1: number[] = [123, 12, 2, 231];
  // let swap2_2: Swap2<arr2_1>; 注意，这种写法是错误的，不能将变量赋值给 泛型参数，只能传类型给泛型参数

  type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

  type A1 = ArrayItemType<string[]>; // A1 string
  type A2 = ArrayItemType<[string, number, undefined]>; // A2 string | number | undefined

  // infer 结构也可以是接口
  // 根据对象和传入的属性，获取该属性对应的类型
  type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;
  // type PropTypeResult1 = PropType<{ name: string; age: number }, 'a'>; // 不满足第二个泛型的约束，会报错
  type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

  // 反转键名与键值
  type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never;
  // 这里要加上 & string
};

/**
 * 分布式条件类型
 * 参数类型是联合类型，且类型参数是通过泛型的方式传入的，条件类型中的泛型 不能 被包裹，这样就产生了分布式条件类型
 * 同时要注意一下 never 作为参数传递的情况，如果没有参数没有被包裹，extends 会返回 never（这是特殊情况中的特殊情况）
 * 
 * 对于属于裸类型参数（作为泛型参数，但是在 extends 语句中没有被包裹的）的检查类型，条件类型会在实例化时期自动分发到联合类型上（以 | 为界限，拆分后一个一个去执行）
 * 
 * 如果不是作为类型参数的话，不会分发，也就是符合我们认为的常规的 联合类型的 extends 判断
 * 如果作为参数，但是包裹了，也不会分发
 */
function test3() {
  console.log('---test3---------------------------------------------');

  type Condition<T> = T extends (1 | 2 | 3) ? T : never;
  type Res1 = Condition<(1 | 2 | 3 | 4 | 5)>; // 1 | 2 | 3
  // 这里为何是 false 
  // 1. 通过泛型参数传入 2. 泛型没有被包裹

  type Res2 = (1 | 2 | 3 | 4 | 5) extends (1 | 2 | 3) ? (1 | 2 | 3 | 4 | 5) : never; // never
  // 这里是可以理解 extends 在判断这种联合类型是 范围大的 extends 范围小的为 false

  type Condition1<T> = [T] extends 1[] ? T : never;
  type Res3 = Condition1<(1 | 2 | 3 | 4 | 5)>; // never
  // 这里又符合 extends 在判断联合类型的时候 范围大的 extends 范围小的 为 false
  // 原因是  在 extends 语句中 T 被包裹住了

  type Naked<T> = T extends boolean ? "Y" : "N";
  type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";
  type Res4 = Naked<number | boolean>;  // "N" | "Y"
  type Res5 = Wrapped<number | boolean> // "N"

  type NeverExtends = never extends never ? 1 : 2; // 1
  type NeverExtends1<T> = T extends never ? 1 : 2;
  type NeverExtends2<T> = T extends 1 ? 1 : 2;
  type NeverExtends3<T> = [T] extends [never] ? 1 : 2;
  type Res6 = NeverExtends1<never>; // never 如果 never 作为参数传递的时候且该参数没有被包裹，会跳过extends判断（判断返回值为 never）
  type Res7 = NeverExtends2<never>; // never
  type Res8 = NeverExtends3<never>; // 1 如果 never 作为参数传递，但是参数被包裹了，

  type Intersection<A, B> = A extends B ? A : 5;
  type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3 | 5
};

export default test;