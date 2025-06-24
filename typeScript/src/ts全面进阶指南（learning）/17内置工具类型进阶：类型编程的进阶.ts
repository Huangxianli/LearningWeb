function test(): void {
  console.log(
    '--- 内置工具类型进阶：类型编程的进阶 ---------------------------------------------'
  );

  test1();
  test2();
  test3();
}

/**
 * 属性修饰进阶
 *
 * 深层的属性修饰
 * 基于已知属性的部分修饰，以及基于属性类型的部分修饰
 */
function test1(): void {
  console.log(
    '--- test1 属性修饰进阶 ---------------------------------------------'
  );

  test1_1();
  test1_2();
}

/**
 * 深层次的属性修饰（满足条件时调用自己（递归））
 */
function test1_1(): void {
  console.log(
    '--- test1_1 深层次的属性修饰 ---------------------------------------------'
  );

  // 递归的工具类型
  type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T; // 原理就是在如果条件成立的时候，再次的调用该工具类型
  type PromiseValue1 = PromiseValue<Promise<Promise<never>>>;

  // 深层次的 Partial 和 Required 和 NonNullable
  type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };
  // 考虑如果是 function 的情况
  type A = () => void;
  type A1 = DeepPartial<A>; // {} 这里明显是有问题的
  /* 
    分析：
    { [K in keyof () => void]: T[K] extends object ? ... }
    { [K in never]: T[K] extends object ? ... } // 这里的 in never 不会进行任何操作，直接清空
    {}
    所以最后得到的就是一个 {}
   */
  // 考虑 set 的情况
  type A2 = Set<any>;
  type A3 = DeepPartial<A2>; // 遍历 Set 结构，然后复制一些内容，结构和 Set 一样，但是不是 Set
  // 考虑 map
  type A4 = Map<any, any>;
  type A5 = DeepPartial<A4>; // 遍历 Map 结构，然后复制一些内容，结构和 Map 一样，但是不是 Map
  // 考虑 promise
  type A6 = DeepPartial<Promise<any>>; // 遍历 Promise 结构，然后复制一些内容，结构和 Promise 一样，但是不是 Promise
  // 考虑 包装类型
  type A7 = DeepPartial<String>; // 遍历 String 结构，然后复制一些内容，结构和 String 一样，但是不是 String
  type A8 = DeepPartial<[number, string]>; // 遍历 String 结构，然后复制一些内容，结构和 String 一样，但是不是 String

  type DeepPartial1<T extends object> = T extends
    | Function
    | Map<any, any>
    | Set<any>
    | Promise<any>
    | Date
    | RegExp
    | String
    | Boolean
    | Number
    | BigInt
    ? // 还有其他很多的类型 例如 WeakMap、WeakSet、Generators...
      T
    : { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

  type DeepRequired<T extends object> = {
    [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]; // 注意，如果不加 -?，会保存原有的可选性
  };

  type B = DeepRequired<Promise<any>>;
  // type DeepRequired1<T extends object> = T extends (Function )
  type DeepNonNullable<T extends object> = {
    [K in keyof T]: T[K] extends object
      ? DeepNonNullable<T[K]>
      : T[K] extends null | undefined
      ? never
      : T[K];
  };
}

/**
 * 基于已知属性进行部分修饰
 *
 * 类型编程思路：将复杂的工具类型，拆解为由基础工具类型、类型工具的组合
 * 拆分（拆分对象结构，结构工具类型 Pick Omit）-处理（可能会用到递归）-组合（组合两个对象类型，等到一个同时符合这两个对象类型的新结构（交叉类型））
 */
function test1_2(): void {
  console.log(
    '--- test1_2 基于已知属性进行部分修饰 ---------------------------------------------'
  );

  // 抽取类型的部分字段为可选，其他字段保持原样
  type MarKPropsAsOptionan<T, K extends keyof T> = Partial<Pick<T, K>> &
    Omit<T, K>;
  type MarKPropsAsOptionan1<
    T extends object,
    K extends keyof T = keyof T
  > = Partial<Pick<T, K>> & Omit<T, K>;

  type object1 = {
    key1: string;
    key2: string;
    key3: number;
  };

  type B = ObjectType<MarKPropsAsOptionan1<object1, 'key1'>>;
  /* 
    {
      key1?: string;
      key2: string;
      key3: number;
    };
   */
}

/**
 * 结构工具类型进阶
 *
 * 基于键值类型的 Pick 与 Omit
 *  也适用于 拆分-处理-组装
 * 子结构的互斥处理
 */
function test2(): void {
  console.log(
    '--- test2 结构工具类型进阶 ---------------------------------------------'
  );

  test2_1();
  test2_2();
}

/**
 * 基于键值类型的 Pick 与 Omit
 * 拆分-处理-组合
 * 拆分：基于期望的类型拿到所有此类型的属性
 */
function test2_1(): void {
  console.log(
    '--- test2_1 基于键值类型的 Pick 与 Omit ---------------------------------------------'
  );

  type FuncStruct = (...arg: any[]) => any;
  type FunctionKeys<T extends object> = {
    [K in keyof T]: T[K] extends FuncStruct ? K : never;
  }[keyof T];
  // 重点是 里面返回的是 K 而非 T[K]，以及 [keyof T]
  // 当索引类型查询中使用了一个联合类型时，会使用分布式条件类型的方式，将这个联合类型的成员依次进行访问，然后组合起来，这里的 [keyof T] 会获得一个 T 的 key 联合起来的联合类型

  // 为什么不采用这种方法呢？ keyof { a: never } 得到的是 'a' 所以还是要 使用前面的方式
  type FunctionKeys1<T extends object> = keyof {
    [K in keyof T]: T[K] extends FuncStruct ? K : never;
  };
  type A = FunctionKeys1<{ a: ''; b: () => void }>; // 'a' | 'b'

  // 可以将 FuncStruct 也作为参数传入
  type ExpectedPropKeys<T extends object, ValueType> = {
    [K in keyof T]-?: T[K] extends ValueType ? K : never;
    // 去除掉 ?，是为了防止 本身有 ?，那么 T[K] 会自动的拼接上 | undefined，extends ValueType 就会失真
  }[keyof T];

  // 在类型中取出符合特定的 值的类型 的项，组成新的类型
  type PickByValueType<T extends object, ValueType> = Pick<
    // Pick 的第二个参数如果是联合类型，会将其分布式的展开
    T,
    ExpectedPropKeys<T, ValueType>
  >;
  // 排除掉一个对象类型中特定值类型 ，组成新的类型
  type OmitByValueType<T extends object, ValueType> = Omit<
    T,
    ExpectedPropKeys<T, ValueType>
  >;
}

/**
 * 基于结构的互斥工具类型
 * 将应该排斥的属性变成 never
 */
declare const A: never;
function test2_2(): void {
  // 拥有一个字段的时候，不能拥有另一个字段，用 | 是不可行的
  interface VIP {
    vipExpires: number;
  }
  interface CommonUser {
    promotionUsed: boolean;
    name: string;
    [key: string]: string | boolean;
  }
  type User = VIP | CommonUser;
  const vip1: VIP = {
    vipExpires: 1,
    // promotionUsed: false, // 这里会报错
  };
  const user1: User = {
    // 这样不会报错，不能限制 VIP 和 CommonUser 只能是两者之一
    vipExpires: 1,
    promotionUsed: false,
    age: '',
  };

  type Without<T, U> = {
    // Exclude<T, U> 排除掉 T 中的 U 后剩下的类型
    [P in Exclude<keyof T, keyof U>]?: never;
    // 注意如果 T 或者 U 中有 [key:typeof any]:any 这种属性，则要具体再分析
  };
  type B = Without<VIP, CommonUser>; // {}
  type C = Without<CommonUser, VIP>;
  /* 
    {
      [x: string]: undefined;
      [x: number]: undefined;
    } 
  */
  type VORC =
    | (Without<VIP, CommonUser> & CommonUser)
    | (Without<CommonUser, VIP> & VIP);
  const vOrC1: VORC = {
    // vipExpires: 1,
    promotionUsed: false,
    name: '',
  };
  const vOrC2: VORC = A;

  type TOrU<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
}

function test3() {
  console.log(
    '--- test3 模式匹配工具类型进阶 ---------------------------------------------'
  );

  type FunctionLastParameter<T extends (...ary: any[]) => any> = T extends (
    arg: infer P
  ) => any
    ? P
    : T extends (...arg: infer Q) => any
    ? Q extends [...any, infer R]
      ? R
      : never
    : never;
}

export default test;
