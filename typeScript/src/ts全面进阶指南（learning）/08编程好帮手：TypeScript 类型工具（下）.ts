function test() {
  console.log('---编程好帮手：TypeScript 类型工具（下）---------------------------------------------');

  // 类型的安全保障：类型查询操作符 类型守卫
  test1();
  test2();
  test3();
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

  const arr1 = [1, 1];
  type Arr2 = typeof arr1; // number[] 这里的每一项都是具体的类型而不是具体的值

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
 * instanceof 也可以进行类型保护
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
 * 表明如果函数执行的时候抛出错误，那么 asserts 后面的语句的返回值是 false
 */
function test2_4() {
  console.log('---test2_4---------------------------------------------');

  function assertIsString(val: unknown): asserts val is string {
    if (typeof val !== 'string') {
      throw new Error('Not a string!');
    }
  }

};

/**
 * 接口的继承
 * extends 关键字，子的类型要兼容父的类型
 * 同名的接口也是一样的，后写的要兼容先写的
 * 接口 extends 继承规则： 
 * 1. 可以完全省略父接口的属性
 * 2. 重写属性时必须类型兼容，不变或者更精确
 * 3. 对象类型属性必须包含父接口的所有必需属性
 * 4. 可以添加新的属性
 * 5. 不能将可选属性变为必需属性
 * 6. 如果是函数，会重载
 * 
 * 如果声明多个同名接口，接口进行合并
 * 和 extends 基本都是表现一致的
 * 
 * 类型别名形式的继承
 * & 关键字
 * 有冲突的属性会推断成 never
 * 同名的类型别名会报错
 * 
 * & 所有属性名称会取并集，同一属性名称的类型会取类型的交集，如果属性对应的类型又是对象类型，则会再一次按照这个规则进行递归，如果是数组，则数组项的类型取交集
 * 
 */

function test3() {
  console.log('---test3---------------------------------------------');

  interface Father {
    prop1: string;
    prop2: {
      prop21: string;
      prop22: number;
    };
    prop3: string | number;
  };
  /* interface Child extends Father {
    prop1: string | number; // 不兼容，只能用更加精确的类型
    prop2: { // 缺少属性 prop22
      prop21: string;
      prop23: string;
    };
  }; */
};

export default test;
