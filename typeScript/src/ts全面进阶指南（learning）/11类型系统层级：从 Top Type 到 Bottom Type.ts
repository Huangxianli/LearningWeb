function test() {
  console.log('---类型系统层级：从 Top Type 到 Bottom Type---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
  test5();
};

/**
 * 判断类型兼容的方式
 * 子类型应该是更加明确的类型
 */
declare let b: string | number;
function test1() {
  console.log('---test1---------------------------------------------');

  // 第一种，使用 extends 关键字 来判断前面的是不是后面的子类型，<a 类型> extends <b 类型> 说明 <a 类型> 是 <b 类型> 的子类型，如果不成立不能说明 <b 类型> 是 <a 类型> 的子类型，也就是 extends 只能正向的看，不能反向的看，而且注意，extends 没有传递性（应该说除去一些特殊的场景，应该还是有传递性的）
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
  // 注意 Object 类型是除了 null 和 undefined 之外的所有类型 object 是除了原始类型外的所有引用类型，{} 是和 Object 一样的，但是不能添加属性等

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
 * 只要满足其中一个类型，就可以认为实现了这个联合类型
 * 字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型 
 */
function test3_1() {
  console.log('---test3_1---------------------------------------------');

  // 只需要这个类型存在于联合类型里面就是联合类型的子类型
  type Result1 = 1 extends 1 | string | 3 ? 1 : 2; // Result1 1 // 左边的是子类型，由此说明，子类型是更加的精确的

  // 如果都是由同一类型组成的联合类型，那么这个联合类型是组成这个联合类型元素的基础类型的子类型
  type Result2 = 'q' | '' | '12' extends string ? 1 : 2; // Result2 1
  type Result3 = 1 | '' | '12' extends string ? 1 : 2; // Result2 2 只要联合类型中的任何一个子类型不满足条件，extends 就会走 false 逻辑

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
  type Result4 = {} extends object ? 1 : 2; // Result4 1 // 这里很奇怪，按理来说，{} 类型应该比 object 类型更加的广，为什么 {} 会是 object 的子类型。这里比较会将 {} 当成一个字面量 {}，当 {} 在 extends 后面的时候，会当成类型，而不是字面量
  type Result5 = {};
  type Result6 = Result5 extends object ? 1 : 2; // 1 

  type Result7 = object extends {} ? 1 : 2; // Result7 1

  // string -> String -> object 
  let test3_2_1: string = '';
  let test3_2_2: String;
  test3_2_2 = test3_2_1;
  let test3_2_3: object;
  test3_2_3 = test3_2_2;
  // 如果是具有传递性的话，那么 test3_2_3 = test3_2_1; 不会报错（这个示例应该被当成特殊的示例）
  // test3_2_3 = test3_2_1; // 会报错
};

/**
 * Top Type
 * any 和 unknown 无视一切的因果定律
 * Object 类型是 any 和 unknown 类型的子类型
 * Object < any / unknown
 */
function test3_3() {
  console.log('---test3_3---------------------------------------------');

  // any extends 时，表现的是，any 让条件成立一部分，让条件不成立一部分，实际表现为，直接将返回条件类型组合成联合类型
  type Result24 = any extends Object ? 1 : 2; // 1 | 2 （注意这里的逻辑和联合类型不一样，联合类型 extends 是只要联合类型中的任何一个子类型不满足就只走 false 的逻辑，any extends 是 true 和 false 的逻辑都走了 但是如果 extends 后面是 unknown 那配合 any 就有不同一点）
  // unknown 类型和 any 类型是不同的，它只能赋值给 unknown 类型和 any 类型 
  type Result25 = unknown extends Object ? 1 : 2; // 2

  // any extends unknown 和 unknown extends any 都是完全成立的，不存在一部分满足一部分不满足

};

/**
 * 向下探索，直到万物虚无
 * never null undefined void
 * 
 * never < 字面量类型
 */
function test4() {
  console.log('---test4---------------------------------------------');

  // never 类型是 虚无 的类型，他是任何类型的 子类型
  type Result1 = never extends undefined ? 1 : 2; // Result1 1

  // null undefined void
  type Result2 = null extends '' ? 1 : 2; // Result2 2
  type Result3 = undefined extends '' ? 1 : 2; // Result3 2
  type Result4 = void extends '' ? 1 : 2; // Result4 2

};

/**
 * 其他场景比较场景
 * 基类和派生类
 * 联合类型的多个成员
 * 数组和元组
 */
function test5() {
  // 基类和派生类 本身就是 extends 获得的产物
  // 联合类型的多个成员
  type Result1 = 1 | 2 extends 1 | 2 | 3 ? 1 : 2; // Result1 1
  type Result2 = 1 | 4 extends 1 | 2 | 3 ? 1 : 2; // Result2 2

};
export default test;