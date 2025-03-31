function test(): void {
  console.log(
    '--- 内置工具类型进阶：类型编程的进阶 ---------------------------------------------'
  );

  test1();
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

function test1_2(): void {
  console.log(
    '--- test1_2 基于已知属性进行部分修饰 ---------------------------------------------'
  );
}

export default test;
