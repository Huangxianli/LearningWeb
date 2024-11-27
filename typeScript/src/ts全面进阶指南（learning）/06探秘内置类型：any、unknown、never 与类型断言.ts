function test(): void {
  console.log('---06探索内置类型：any、unknown、never 与类型断言---------------------------------------------');

  test1();
  test2();
};

/**
 * 内置类型：any、unknown 与 never
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
  test1_2();
  test1_3();
};

/**
 * any：表示任意类型
 * 没有赋值的 变量、函数参数 默认为 any 类型
 * 注意 noImplicitAny 如果为 true，这两种没有手动的赋值为 any，自动推断为 any 时，会报错
 * 
 * any 类型的变量可以拥有任意类型的值
 * 标记为 具体类型 的变量也可以接受 any 类型的值
 * （兼容所有类型且被所有类型兼容，要除去 never）
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  let val1; // 会被推导为 any
  // let fun1 = function (a) { }; // a 会被推导为 any

  let val2: any;
  let val3: string = val2;
  val2 = 12;

  let val4: unknown;
  val2 = val4;
};

/**
 * unknown：在后面的某一刻可能会知道是什么类型
 * unknown 类型可以接受其他所有类型（要除去 never）
 * 只有 unknown 和 any 可以接受 unknown 类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  let val1: unknown;
  // let val2: string = val1; // 只能将 unknown 赋值给 unknown 和 any

  val1 = ''; // unknown 可以接受任何类型

  let val3: any = val1;
};

/**
 * never：never 类型严格来说不携带任何的类型信息，是整个类型系统中 最底层 的类型
 * never 类型的变量只接受 never 类型
 * 其他类型可以接受 never 类型
 * 也可以表示说 无法执行到
 */

declare let val1: never;
declare let val4: string | number;
function test1_3(): void {
  console.log('---test1_3---------------------------------------------');

  let val2: never = val1;
  let val3: string = val2;
  // val2 = val3; // never 只接受 never 类型

  if (typeof val4 === 'string') {

  } else if (typeof val4 === 'number') {

  } else {
    let val5: never = val4; // 这样如果 val5 的类型增加，如果 没有增加 else if 这里就会报错
  }
};

/**
 * 类型断言
 * as newType 、 <newType>
 * 主要是将 any unknown 类型 断言到具体的类型
 */
function test2(): void {
  console.log('---test2---------------------------------------------');

}


export default test;