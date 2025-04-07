function test(): void {
  console.log(
    '--- 内置工具类型进阶：类型编程的进阶 ---------------------------------------------'
  );

  test1();
  test2();
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

  // 深层次的 Partial 和 Required 和 NonNullable
  type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };
  type DeepRequired<T extends object> = {
    [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]; // 注意，如果不加 -?，会保存原有的可选性
  };
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
 * 拆分-处理-组合
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
}

/**
 * 结构工具类型进阶
 *
 * 基于键值类型的 Pick 与 Omit
 * 子结构的互斥处理
 */
function test2(): void {
  console.log(
    '--- test2 结构工具类型进阶 ---------------------------------------------'
  );

  test2_1();
}

/**
 * 基于键值类型的 Pick 与 Omit
 * 拆分-处理-组合
 * 拆分：基于期望的类型拿到所有次类型的属性
 */
function test2_1(): void {
  console.log(
    '--- test2_1 基于键值类型的 Pick 与 Omit ---------------------------------------------'
  );

  type FuncStruct = (...arg: any[]) => any;
  type FunctionKeys<T extends object> = {
    [K in keyof T]: T extends FuncStruct ? K : never;
  }[keyof T];
  // 重点是 里面返回的是 K 而非 T[K]，以及 [keyof T]
  // 当索引类型查询中使用了一个联合类型时，会使用分布式条件类型的方式，将这个联合类型的成员依次进行访问，然后组合起来

  // 可以将 FuncStruct 也作为参数传入
  type ExpectedPropKeys<T extends object, ValueType> = {
    [K in keyof T]-?: T[K] extends ValueType ? K : never;
  }[keyof T];

  // 在类型中取出符合特定的 值的类型 的项，组成新的类型
  type PickByValueType<T extends object, ValueType> = Pick<
    // Pick 的第二个参数如果是联合类型，会将其分布式的展开
    T,
    ExpectedPropKeys<T, ValueType>
  >;

  type OmitByValueType<T extends object, ValueType> = Omit<T, ExpectedPropKeys<T, ValueType>>;
}

/**
 * 基于结构的互斥工具类型
 */
function test2_2(): void {
  // 拥有一个字段的时候，不能拥有另一个字段，用 | 是不可行的
  interface VIP {
    vipExpires: number;
  }
  interface CommonUser {
    promotionUsed: boolean;
  }
  type User = VIP | CommonUser; // 这样不会报错，不能限制 VIP 和 CommonUser 只能是两者之一

  type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
  };
}

export default test;
