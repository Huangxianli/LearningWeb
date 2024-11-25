function test(): void {
  console.log('---03理解原始类型和对象类型---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
};

/**
 * 原始类型
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
  test1_2();
  test1_3();
};

/**
 * es6及以上新增的原始类型
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  const bigint1: BigInt = BigInt(12);
  const symbol1: symbol = Symbol.for('12312');
};

/**
 * undefined 和 null
 * 在 js 中：
 * undefined 表示 已经声明了，但是没有赋值
 * null 表示 已经声明了，而且给了一个 null 值（或者说变量应该有值但是目前还没有，且期待是一个引用类型的值）
 * 在 ts 中：
 * null 和 undefined 都有具体的意义
 * 如果 strictNullChecks 为 false，则是其他类型的子类型；如果 strictNullChecks 为 true，则不是其他类型的子类型，赋值给其他类型的时候会报错
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  // const string1: string = undefined;
  // const null1: null = undefined;
  // const obj: Object = null;
};

/**
 * void
 * 在 js 中：执行后面的表达式，并返回 undefined
 * 在 ts 中：用于描述一个没有 没有 return 、return了但是没有显示的值 的函数的返回值
 * 
 * 注意一点，即使显示 return undefined，会被推导成 undefined，但是在声明的时候，可以用 void；undefined 是可以 赋值给 void 类型的；也就表明，即使是 void 类型，其值有可能是实实在在的 undefined
 */
function test1_3(): void {
  console.log('---test1_3---------------------------------------------');

  // 鼠标移到函数名称函看类型推导
  function test1_3_1() {
    // return;
    // return undefined;
  };

  function test1_3_2(): void {
    return undefined; // undefined 可以赋值给 void
  };

  function test1_3_3(): undefined {
    return; // 按理来说，直接 return，但是 return 后面没有内容，应该是被推导成 void 的，void 应该是不能赋值给 udefined 的 这里为什么可以？？？
  }

  let test1_3_4: undefined = undefined;
  let test1_3_5: void = test1_3_4; // undefined 可以被赋值给 void
  let test1_3_6: undefined;
  test1_3_6 = void 0; // 很奇怪，这里也没有报错
};

/**
 * 数组的类型标注
 */
function test2(): void {
  console.log('---test2---------------------------------------------');

  test2_1();
  test2_2();
};

/**
 * 声明方法
 */
function test2_1(): void {
  console.log('---test2_1---------------------------------------------');

  const arr1: string[] = [];
  const arr3: Array<String> = [];
};

/**
 * 元祖
 */
function test2_2(): void {
  console.log('---test2_2---------------------------------------------');

  const arr1: [string, number?] = ['1'];
  // arr1[2];

  const arr2: [name: string, age?: number] = ['12'];
};

/**
 * 对象类型标注
 */
function test3() {
  console.log('---test3---------------------------------------------');

  test3_1();
  test3_2();
  test3_3();
};

/**
 * interface
 */
function test3_1(): void {
  console.log('---test3_1---------------------------------------------');

  interface Obj1 {
    name: string,
    male?: boolean, // 这里声明了类型，读这个属性的时候，即使已经给值了，但是会按照接口定义为准 boolean | undefined
    readonly single: boolean,
  };
  const obj1: Obj1 = {
    name: '',
    // age: 12,
    single: true,
  };
  const a = obj1.male;
};

/**
 * 数组/元组上使用 readonly 只能将整个标记成 readonly
 * 失去了 push 等方法，不能修改原数组的任何一项的值
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  const arr1: readonly [number] = [1];
  const arr2: ReadonlyArray<number> = [1];
  // arr2.push(1);
  // arr2[1] = 12;
  // arr1[0] = 12;
};

/**
 * interface 和 type
 * interface 描述对象和类
 * type 用来将一个函数签名、一组组合类型、一个工具类型等等抽离成一个完整的类型
 */
function test3_3(): void {
  console.log('---test3_3---------------------------------------------');

  type Func1 = () => void;
  let test3_3_1: Func1 = function () { };
};

/**
 * Object object {}
 */
function test4(): void {
  console.log('---test4---------------------------------------------');

  test4_1();
  test4_2();
  test4_3();
};

/**
 * Object
 * 在 js 中所有的类型沿着原型链最终都是指向 Object
 * ts 中的表现就为 Object 包含了所有的类型（除去undefined 和 null）
 * undefined、 null 和 void 0 只在 strictNullcheck 为 false 的时候才可以赋值给 Object 类型的元素
 * 
 * 在任何情况下，都不使用这种装箱类型 Object Number ...
 * 
 */
function test4_1(): void {
  console.log('---test4_1---------------------------------------------');

  const object1: Object = 12;
  const object2: Object = Symbol();

  let object3: Object = '';
  const string1: string = '123';
  object3 = string1;

  // const object4: Object = null;
  // const object5: Object = undefined;
};

/**
 * object
 * 代表所有非原始类型的类型，即数组、对象与函数类型这些
 */
function test4_2(): void {
  console.log('---test4_2---------------------------------------------');

  const object1: object = {};
  // const object2: object = null;
  const object3: object = function () { };
};

/**
 * {}
 * 内部无属性的空对象
 * 无法进行属性的赋值操作
 * 
 * 避免使用它
 */
function test4_3(): void {
  console.log('---test4_3---------------------------------------------');

  const object1: {} = 'li';
  const object2: {} = {
    12: 12
  };

  const object3: {} = function () { };
  // const object4: {} = undefined;
  // const object5: {} = null;

  // object1.name = 12;

};


export default test;