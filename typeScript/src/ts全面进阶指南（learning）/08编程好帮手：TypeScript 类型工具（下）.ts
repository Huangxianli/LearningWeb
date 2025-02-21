function test() {
  console.log('---编程好帮手：TypeScript 类型工具（下）---------------------------------------------');

  // 类型的安全保障：类型查询操作符 类型守卫
  test1();
  test2();
};

/**
 * 熟悉又陌生的 typeof（类型查询操作符）
 * 在 js 中 typeof 返回的是 变量的数据类型，ts 中返回的是一个 TypeScript 类型
 * 
 * 在逻辑代码中访问一定是 js 的 typeof，在类型代码中一定是 ts 的 typeof
 * 
 * 要避免 let a: typeof func1() 这种写法
 * 
 */
function test1() {
  console.log('---test1---------------------------------------------');

  const str = 'link';
  type Str = typeof str; // 'link' 常量返回的是更加精确的字面量类型
  let str1 = 'link';
  type Str1 = typeof str1; // string 变量返回的是没那么精确的

  let obj1 = { 1: 2 };
  const obj2: typeof obj1 = { 1: 12 }; // const obj1: {1: number} 注意这里的 1 对应的类型是 number 而不是 2，无论 obj1 是变量还是常量

  const func = (input: string) => {
    return input.length > 10;
  }

  let func2: typeof func;  // 这样 func2 的类型是取的 func 的类型
};

/**
 * 类型守卫
 */
function test2() {

  console.log('---test2---------------------------------------------');

  test2_1();
  test2_2();
  test2_3();
  test2_4();
};

/**
 * 类型的控制流分析
 */
function test2_1() {
  console.log('---test2_1---------------------------------------------');

  function foo(input: string | number) {
    if (typeof input === 'string') { }
    else if (typeof input === 'number') { }
    else {
      const temp: never = input; // never 是只能接收 never 的赋值的，这里不报错，说明已经推导出了 input 在这个是 never 类型
    }
  }
};

function test2_2() {
  console.log('---test2_2---------------------------------------------');

  function isString(input: unknown): boolean {
    return typeof input === 'string';
  }
  function foo(input: string | number) {
    if (isString(input)) {
      // 下面会报错 类型“string | number”上不存在属性“replace”，说明提取到该函数之外，就失去了类型控制流的能力
      // (input).replace("linbudu", "linbudu599"); 
    } else {

    }
    if (isString1(input)) {
      (input).replace("linbudu", "linbudu599");
    }
  }

  // ts 提供了 is 关键字来显式的提供信息
  function isString1(input: unknown): input is string {
    return typeof input === 'string';
  }
  // 如果函数的返回值为 true，就会将 input 的类型推断为 string 类型，并且被调用它的环境记住传入的 input 是 string 类型

};

/**
 * 基于 in 的 instanceof 的类型保护
 */
function test2_3() {
  console.log('---test2_3---------------------------------------------');

  interface Foo {
    foo: string;
    fooOnly: boolean;
    shared: number;
  }

  interface Bar {
    bar: string;
    barOnly: boolean;
    shared: number;
  }

  function handle(input: Foo | Bar) {
    if ('foo' in input) {
      input.fooOnly;
    } else {
      input.barOnly;
    }
  }
};

/**
 * 类型断言守卫
 * asserts 关键字
 */
function test2_4() {
  console.log('---test2_4---------------------------------------------');

};

/**
 * 接口的继承
 * extends 关键字，子的类型要兼容父的类型
 * 同名的接口也是一样的，后写的要兼容先写的
 * 
 * 类型别名形式的继承
 * & 关键字
 * 有冲突的属性会推断成 never
 */
