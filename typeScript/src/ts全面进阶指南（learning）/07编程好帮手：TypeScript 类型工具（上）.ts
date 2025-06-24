function test() {
  console.log(
    '---07编程好帮手：TypeScript 类型工具（上）---------------------------------------------'
  );

  // 基于已有的类型创建出新的类型
  test1();
  test2();
  test3();
  test4();
}

/**
 * 类型别名
 * 工具类型是基于类型别名的，只是多了个泛型
 */
function test1() {
  console.log('---test1---------------------------------------------');

  type Code = 200 | 301 | 400 | 500;
  const statuCode: Code = 200;

  type Handler = (e: Event) => void;
  const clickHandler: Handler = (e) => {};

  type Factory<T> = string | number | T;
  const factory: Factory<boolean> = false;

  type MaybeArray<T> = T | T[];
  const ensureArray = function <T>(input: MaybeArray<T>): T[] {
    return Array.isArray(input) ? input : [input];
  };
}

/**
 * 联合类型与交叉类型
 * 交叉类型 &，两边都要同时满足，相当于取交集
 * 对于对象类型是将两边的内容进行合并
 */
function test2() {
  console.log('---test2---------------------------------------------');

  interface NameStruct {
    name: string;
  }
  interface AgeStruct {
    age: number;
  }
  type Person = AgeStruct & NameStruct; // 对于两个对象类型，将两个进行合并
  const person: Person = {
    name: '',
    age: 0,
  };

  type NeverType = number & string; // 不可能满足是 number 类型的同时又是 string 类型

  // 对象的交叉类型内部的所有属性名称会取并集，同一属性名称的类型会取交集，如果属性对应的又是对象类型，则会再一次按照这个规则进行
  // 属性取并集，属性类型取交集
  type Struct1 = {
    prop1: string;
    prop2: {
      name: string;
      age: number | string;
    };
  };
  type Struct2 = {
    prop1: number; // prop1 是基础类型，两个不是同时都满足的，会被合并成 never
    prop2: {
      // 对象类型中的内容会组合起来
      age: number; // 会被合并成 number
    };
  };
  type Person1 = Struct1 & Struct2;

  type PersonProp1Type = Person1['prop1']; // never
  type PersonProp2Age = Person1['prop2']['age']; // number

  type NumberType = number;
  type ObjectType = Object;
  type AndType = NumberType & ObjectType;
}

/**
 * 索引类型
 */
function test3() {
  console.log('---test3---------------------------------------------');

  test3_1();
  test3_2();
  test3_3();
}

/**
 * 索引签名类型
 * 在接口或者类型中，快速声明一个 键值类型一致的类型结构
 */
function test3_1() {
  console.log('---test3_1---------------------------------------------');

  interface AllStringType {
    [key: string]: string | number;
  }
  type propType1 = AllStringType['name']; // string | number

  // 要注意 obj[prop] 的形式会将数组类型的 prop 转化成字符串的 prop 来访问，因此即使加 number 类型的属性也不会报错，symbol 类型的也一样

  const personL: AllStringType = {
    name: 12,
    12: 12,
    [Symbol(12)]: 12,
  };

  type A = keyof typeof personL; // string | number  由于 personL 被指定为 AllStringType 所以 没有 symbol

  type B = keyof AllStringType; // string | number 为什么会有 string？ 是因为数字键在 JS/TS 中的特殊行为：使用一个数字作为对象的属性键时，这个数字会转化成一个字符串

  type StringArr = string[];
  type C = keyof StringArr; // 和 AllStringType 不同，推断出来是 number | 原型上的一些方法名 | 一些 Symbol | 'length'
  // const c1: C = '2'; // 会报错
  const c2: C = -1;
  const c3: C = 'push'; // 注意这里。 说明 C 不单单是 number 还包括 数组原型是的一些 key，还包括 Length 和一些 Symbol
}

/**
 * 索引类型查询
 * keyof T 操作符会获取类型 T 的所有可安全访问的公共属性名
 * keyof 操作符就是进行索引类型查询的，注意 keyof 后面可以接类型和接口和泛型，不能直接传入变量
 * 可以将对象中的所有键转化成对应的字面量类型，然后再组合成联合类型，类似于 Object.keys(Obj).join('|')
 * 查询索引的类型
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  type AllStringType = {
    [key: string]: string;
  };

  type keyType = keyof AllStringType; // string | number

  type AllKeyType = keyof any; // string | number | symbol

  const obj = { 1: 1 };
  // let b: keyof obj; // 会报错，keyof 后面不能直接接变量

  type A = keyof object; // never keyof 获取的是其后面类型的共有的确定的 key，object 表示的只是说明后面的类型是一个对象
  type B = keyof Object; // Object 一般指向的是构造函数 Object，Object.prototype 上面有一些属性
  const b1: B = 'toString';

  type C = keyof [];
  let c1: C = 1;
  c1 = 'toString';
}

/**
 * 索引类型访问
 * 根据索引的类型或者索引的值（本质上不是值，而是字面量类型），查询对应的值的类型
 * 不能传值，可以从不能传递 symbol 值就可以看出
 */
function test3_3() {
  console.log('---test3_3---------------------------------------------');

  type NumberRecord = {
    [key: number]: number;
    [key: symbol]: string;
  };

  const a: unique symbol = Symbol.for('1');
  interface NumberRecord1 {
    12: number;
    stringKey: string;
    [a]: string;
  }

  type NumberKeyValueType = NumberRecord['12']; // number
  // type a = NumberRecord[string]; // 会报错
  type SymbolKeyValueType = NumberRecord[symbol]; // string 像这种 [] 里面是直接的一个类型，就要 NumberRecord 里面是直接定义了 [key: 类型]：类型 才可以

  type NumberKeyValueType1 = NumberRecord['12']; // number
  type StringKeyValueType1 = NumberRecord1['stringKey']; // string
  type SymbolKeyValueType1 = NumberRecord1[typeof a]; // string 注意这里不能直接使用 a，要使用 typeof a

  type AllValueType = NumberRecord[keyof NumberRecord]; // string | number
  type AllKeyType = keyof NumberRecord; // number | symbol
}

/**
 * 映射类型：类型编程的第一步
 * 索引类型的最佳拍档之一就是映射类型
 * 索引类型查询和索引类型访问通常和映射类型一起搭配使用
 *
 * 映射类型的主要作用是：基于键名映射到键值类型
 */
function test4() {
  console.log('---test4---------------------------------------------');

  type Stringify<T> = {
    // 在使用的时候，会遍历传入的 T 的所有的 Key ，并且 Key 对应的类型是 string，最终生成的是与传入的 T 的 Key 完全一样，但是 Key 对应的类型是 string 的新的类型
    [key in keyof T]: string; // keyof 返回联合类型，in 遍历联合类型中的每个子类型
  };

  type Clone<T> = {
    [K in keyof T]: T[K]; // 完全拷贝传入的类型
  };
  type CloneSome<T, E> = {
    // 拷贝 T 类型，同时排除掉 E
    [K in keyof T]: K extends E ? never : T[K];
  };
  type DeepClone<T, E> = {
    // 深度拷贝，并排除掉 E
    [K in keyof T]: K extends E
      ? never
      : T[K] extends object // 要继续考虑 null array function date regexp 会不会影响，还有循环引用的问题
      ? DeepClone<T[K], E>
      : T[K];
  };
}

export default test;
