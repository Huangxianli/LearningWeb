function test(): void {
  test1();
  test2();
  test3();
  test4();
  test5();
}

/**
 * 模板字符串类型的基础使用
 */
function test1(): void {
  console.log(
    '--- 模板字符串的基础使用 -------------------------------------------------------'
  );
  type World = 'World';
  type Greeting = `Hello ${World}`; // "Hello World" 最终的表现就是将两个字符串类型值组装在一起返回

  // 能够插入 ${} 中的只能是固定的类型
  type StringSlot = string | number | boolean | null | undefined | bigint; // 注意没有 symbol
  // 插入到 ${} 里面最后都是直接加 '': true -> 'true' null -> 'null'
  type Greet<T extends StringSlot> = `${T}`; // 要加限制条件

  type Greet1 = `Hello ${string}`; // 这个不会变成 “Hello string”，而是保持原样，所有 “Hello ”开头的字面量类型都会视为 `Hello ${string}` 的子类型

  type Version = `${number}.${number}.${number}`;
  const version1: Version = '1.1.1';
  // const version2: Version = '1.1'

  type SKU = `${'iphone' | 'huawei' | 'xiaomi'}-${'128G' | '256G'}-${
    | 'official'
    | 'second-hand'}`; // "iphone-128G-official" | "iphone-128G-second-hand" | ... 会自动的组合拼接
}

/**
 * 模板字符串类型的类型表现
 */
declare let v1: `${number}.${number}.${number}`;
declare let v2: '1.1.1';
function test2(): void {
  console.log(
    '--- 模板字符串类型的类型表现 -------------------------------------------------------'
  );
  v1 = v2;
  // v2 = v1; // v1 的范围更广，v1 不能赋值给 v2

  const greet = (to: string): `Hello ${string}` => `Hello ${to}`;
}

/**
 * 结合索引类型与映射类型
 */
function test3(): void {
  console.log(
    '--- 结合索引类型与映射类型 -------------------------------------------------------'
  );
  test3_1();
  test3_2();
}

/**
 * 结合索引类型
 * keyof 关键字
 */
function test3_1(): void {
  console.log(
    '--- 结合索引类型 -------------------------------------------------------'
  );
  interface EventListener {
    click: (e: MouseEvent) => void;
    foucs: (e: FocusEvent) => void;
    blur: (e: FocusEvent) => void;
  }

  type EventNames = `on${keyof EventListener}`;
  const eventName: EventNames = 'onclick';
}

/**
 * 结合映射类型
 *
 * [K in keyof T as `some${string & K}some`]: T[K]
 * 重映射
 * 在映射键名时基于原键名作修改
 */
function test3_2() {
  console.log(
    '--- 结合索引类型 -------------------------------------------------------'
  );

  type KeyRename<
    T extends object,
    B extends string = '',
    A extends string = ''
  > = {
    [K in keyof T as `${B extends '' ? B : `${B}_`}${string & K}${A extends ''
      ? A
      : `_${A}`}`]: T[K];
  };
  interface A {
    name: string;
    age: string;
  }
  type B = KeyRename<A, 'new', 'new'>;
}

/**
 * 专用工具类型
 * 装用于字符串字面量类型
 *
 * Uppercase Lowercase Capitalize Uncapitalize
 */
function test4(): void {
  console.log(
    '--- 专用工具类型 -------------------------------------------------------'
  );
  interface EventListeners {
    click: (e: MouseEvent) => void;
    focus: (e: FocusEvent) => void;
  }
  type EventNames = `on${Capitalize<keyof EventListeners>}`; // "onClick" | "onFocus"
}

/**
 * 模板字符串类型与模板匹配
 *
 * 非贪婪的前缀 贪婪后缀
 */
function test5() {
  console.log(
    '--- 模板字符串类型与模板匹配 -------------------------------------------------------'
  );
  type ReverseName<T extends string> = T extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${Capitalize<First>}`
    : T;
  type SiLiRevers = ReverseName<'si li'>; // "Li Si"
}
export default test;
