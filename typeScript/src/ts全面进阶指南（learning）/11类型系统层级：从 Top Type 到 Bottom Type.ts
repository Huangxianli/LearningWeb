function test() {
  console.log('---类型系统层级：从 Top Type 到 Bottom Type---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
};

/**
 * 判断类型兼容的方式
 * 子类型应该是更加明确的类型
 */
declare let b: string | number;
function test1() {
  console.log('---test1---------------------------------------------');

  // 第一种，使用 extends 关键字 来判断前面的是不是后面的子类型，<a 类型> extends <b 类型> 说明 <a 类型> 是 <b 类型> 的子类型
  type Result = 'huang' extends string ? 1 : 2; // Result 1
  type Result1 = 'huang' extends String ? 1 : 2; // Result1 1

  // 第二种，通过赋值操作，如果能将 b 赋值给 a，说明 b 的类型是 a 的类型的子类型
  type Type1 = string;
  let a: Type1 = '';
  // a = b; // 这里会报错，说明，<b 的类型> 不是 <a 的类型> 的子类型
  type Type2 = (string | number) extends Type1 ? 1 : 2;  // Type2 2 

};

/**
 * 从原始类型开始
 * 字面量类型 < 对应的原始类型
 */
function test2() {
  console.log('---test2---------------------------------------------');

  type Result1 = 'huang' extends string ? 1 : 2; // Result1 1
  type Result2 = 'huang' extends String ? 1 : 2; // Result2 1
  // 注意 Object 类型是除了 null 和 undefined 之外的所有类型 object 是除了原始类型外的所有引用类型，{} 是和 Object 一样的，但是不能添加类型等

  type Result3 = never extends Object ? 1 : 2; // Result3 1
  type Result4 = string extends String ? 1 : 2; // Result4 1
  type Result5 = String extends object ? 1 : 2; // Result5 1
  type Result6 = string extends object ? 1 : 2; // Result6 2 // 通过 4 5 6 可以看出，extends 并没有传递效果

};

/**
 * 向上探索
 */
function test3() {
  console.log('---test3---------------------------------------------');

  test3_1();
  test3_2();
  test3_3();
};

/**
 * 联合类型
 */
function test3_1() {
  console.log('---test3_1---------------------------------------------');

  // 只需要这个类型存在于联合类型里面就是联合类型的子类型
  type Result1 = 1 extends 1 | string | 3 ? 1 : 2; // Result1 1 // 左边的是子类型，由此说明，子类型是更加的确切的

  // 如果都是有一个类型组成的联合类型，那么这个联合类型是组成这个联合类型元素的基础类型的子类型
  type Result2 = 'q' | '' | '12' extends string ? 1 : 2; // Result2 1

};

/**
 * 装箱类型
 * 原始类型 < 原始装箱类型 < Object 类型
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  type Result1 = string extends String ? 1 : 2; // Result1 1
  type Result2 = String extends object ? 1 : 2; // Result2 1 
  // 从这里可以看出，extends 本身是没有传递性的
  type Result3 = string extends object ? 1 : 2; // Result3 2

  const a: {} = '1223';
  // let b: object = '123'; // 会报错
  type Result4 = {} extends object ? 1 : 2; // Result4 1 // 这里很奇怪，按理来说，{} 类型应该比 object 类型更加的广，为什么 {} 会是 object 的子类型
  type Result5 = {};
  type Result6 = Result5 extends object ? 1 : 2; // 1 

  type Result7 = object extends {} ? 1 : 2; // Result7 1
};

/**
 * Top Type
 * any 和 unknown 无视一切的因果定律
 * Object 类型是 any 和 unknown 类型的子类型
 */
function test3_3() {
  console.log('---test3_3---------------------------------------------');

  // any extends 时，表现的是，any 让一部分的条件满足，让一部分的条件不满足，实际表现为，直接将返回条件类型组合成联合类型
  type Result24 = any extends Object ? 1 : 2; // 1 | 2
  // unknown类型和any类型是不同的，它只能赋值给 unknown 类型和 any 类型 
  type Result25 = unknown extends Object ? 1 : 2; // 2

  // any extends unknown 和 unknown extends any 都是成立的

};

/**
 * 向下探索，直到万物虚无
 * never null undefined void
 */
function test4() {
  console.log('---test4---------------------------------------------');

  // never 类型是 虚无 的类型，他是任何类型的 子类型
  type Result1 = never extends undefined ? 1 : 2; // Result1 1


};
export default test;