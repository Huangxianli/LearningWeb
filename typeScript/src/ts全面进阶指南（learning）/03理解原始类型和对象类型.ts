function test(): void {
  console.log('---03理解原始类型和对象类型---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
  test5();
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
 * 原始类型 String Number Boolean Null Undefined BigInt Symbol
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  const bigint1: BigInt = BigInt(12);
  const symbol1: symbol = Symbol.for('12312');
};

/**
 * undefined 和 null
 * 在 js 中：
 * undefined 表示 已经声明了，但是没有赋值；对象中不存在的属性；函数未返回值
 * null 表示 已经声明了，而且给了一个 null 值（或者说变量应该有值但是目前还没有，且期待是一个引用类型的值）
 * 在 ts 中：
 * null 和 undefined 都有具体的意义
 * 如果 strictNullChecks 为 false，则是其他类型的子类型；如果 strictNullChecks 为 true，则不是其他类型的子类型，赋值给其他类型的时候会报错
 * 在实际的开发过程中，最好是将 strictNullChecks 设置为 true，不让 null 和 undefined 作为其他类型的子类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  // const string1: string = undefined;
  // const null1: null = undefined;
  // const obj: Object = null;
};

/**
 * void
 * 在 js 中：执行后面的表达式，并总是返回 undefined
 * 在 ts 中：用于描述一个没有 return 、return 了但是没有显式的值 的函数的返回值
 * 
 * 注意一点，即使显式的 return undefined，会被推导成 undefined，但是在声明的时候可以用 void；说明 undefined 是可以赋值给 void 类型的；也就表明，即使标注的是 void 类型，其值有可能是实实在在的 undefined
 * 
 * 注意：只有显示的 return undefined 的时候，才会被推导成 undefined 类型
 * 
 * 其实在实际上 void 表示的类型范围是要比 undefined 类型要大的，undefined 类型可以赋值给 void 类型
 */
function test1_3(): void {
  console.log('---test1_3---------------------------------------------');

  // 鼠标移到函数名称函看类型推导
  function test1_3_1() { // 表明没有显式的 return 具体的内容的时候，会被推导成 void 类型，只有 return 了一个显示的内容，才会推导成返回值对应的类型
    // return; // 会推导成 void
    // return undefined; // 会推导成 undefined
  };

  function test1_3_2(): void {
    return undefined; // undefined 可以赋值给 void
  };
  // let test1_3_2_1: undefined = test1_3_2(); // 会报错，void 类型，不能赋值给 undefined 类型

  function test1_3_3(): undefined {
    return; // 按理来说，直接 return，但是 return 后面没有内容，应该是被推导成 void 的，void 应该是不能赋值给 udefined 的 这里为什么可以？？？
    // 这里是一个边界情况，在 ts 中 return 后面没有接内容的话，应该是会推导成 void 类型的，但是在 js 中，return 后面没有接内容默认的是 return undefined 的，作为一种边界情况，实际上不推荐这么写，没有就 return undefined 定义为 undefined 类型，要不就 return 定义为 void 类型。
  }

  let test1_3_4: undefined = undefined;
  let test1_3_5: void = test1_3_4; // undefined 可以被赋值给 void
  let test1_3_6: undefined;
  test1_3_6 = void 0; // 很奇怪，这里也没有报错 // 这里识别的是 js 中的 void，执行后面的语句，并返回 undefined 类型
  let test1_3_7: void;
  // test1_3_6 = test1_3_7; // 这里会报错，通常情况下 void 类型是不能赋值给 undefined 类型的
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
  const arr3: Array<string> = [];
};

/**
 * 元祖
 * 元组限制了数组的类型和长度范围
 * 还可以使用具名元组来给元组中的每一项做定义
 */
function test2_2(): void {
  console.log('---test2_2---------------------------------------------');

  const arr1: [string, number?] = ['1'];
  // arr1[2];

  // 具名元组
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
    readonly single: boolean, // 只读属性要在变量定义的时候就赋值，并且之后就不能赋值了
  };
  const obj1: Obj1 = {
    name: '',
    // age: 12, // age 不在接口 Obj1 里面，不能添加在这个对象里面
    single: true,
  };
  // obj1.single = true; // 因为定义类型的时候，添加了修饰符 readonly，即使是赋原值，一样会报错
  const a = obj1.male;  // 由于定义的时候 male 定义为 boolean 而且该属性不一定存在，所以会 a 的类型是 boolean | undefined
};

/**
 * 数组/元组上使用 readonly 只能将整个标记成 readonly，在定义时候的赋值之后，里面的每一项都不能在改变，而且也无法再改变长度，无法重新赋值新的引用地址
 * 失去了 push 等方法，不能修改原数组的任何一项的值
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  const arr1: readonly [number] = [1]; // 元组
  const arr2: ReadonlyArray<number> = [1]; // 数组
  // arr2.push(1);
  // arr2.pop();
  // arr2[1] = 12;
  // arr2 = [];

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
 * 区分这三者
 * Object 和 {} 都表示除 undefined、null 和 void 0 之外的任何类型，但是 {} 类型不可以进行属性操作，即使是赋值了
 * object 表示除了 undefined、undefined 和 void 0 之外的任何非原始类型
 * 
 * Object 在 js 里面是一切
 * 
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
 * ts 中的表现就为 Object 包含了所有的类型（除去 undefined、null 和 void 0）
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

  let object6: Object = '' as String; // 装箱类型也是 Object 的子类型
};

/**
 * object
 * 确保是引用类型（object 类型也要排除 undefined、null、void 0）
 */
function test4_2(): void {
  console.log('---test4_2---------------------------------------------');

  const object1: object = {};
  // const object2: object = null;
  const object3: object = function () { };
  const object4: object = {};
  // const object5: object = '';
};

/**
 * {}
 * 内部无属性的空对象
 * 除去 undefined、null、void 0 的任何类型
 * 无法访问属性（除了 Object 原型上的属性）
 * 无法调用方法
 * 不能进行属性赋值
 * 
 * 避免使用它
 */
function test4_3(): void {
  console.log('---test4_3---------------------------------------------');

  const object1: {} = 'li';
  const object2: {} = {
    12: 12
  };
  object2.toString(); // 访问 Object 原型上的属性是允许的
  // object2[12]; // 这种访问也报错

  const object3: {} = function () { };
  // const object4: {} = undefined;
  // const object5: {} = null;

  // object1.name = 12;
  // object3(); // 这种操作也不允许

};


/**
 * unique symbol
 * 是 symbol 的子类型，没有个 unique symbol 类型都是独一无二的类型
 */
function test5(): void {
  // let uniqueSymbol1: unique symbol = Symbol('test1'); // unique symbol 类型只能是 const 声明，不能用 let 声明
  const uniqueSymbol2: unique symbol = Symbol('test2');

  // const uniqueSymbol3: unique symbol = uniqueSymbol2; // 因为每一个 unique symbol 类型都是独一无二的类型，所以不能相互赋值

  const uniqueSymbol4: typeof uniqueSymbol2 = uniqueSymbol2; // 可以通过这种方式来进行赋值
};


export default test;