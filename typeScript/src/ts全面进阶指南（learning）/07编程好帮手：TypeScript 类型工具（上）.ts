function test() {
  console.log('---07编程好帮手：TypeScript 类型工具（上）---------------------------------------------');

  // 基于已有的类型创建出新的类型
  test1();
  test2();
  test3();
  test4();
};

/**
 * 类型别名
 * 工具类型是基于类型别名的，只是多了个泛型
 */
function test1() {
  console.log('---test1---------------------------------------------');

  type Code = 200 | 301 | 400 | 500;
  const statuCode: Code = 200;

  type Handler = (e: Event) => void;
  const clickHandler: Handler = (e) => { };

  type Factory<T> = string | number | T;
  const factory: Factory<boolean> = false;

  type MaybeArray<T> = T | T[];
  const ensureArray = function <T>(input: MaybeArray<T>): T[] {
    return Array.isArray(input) ? input : [input];
  }

};

/**
 * 联合类型与交叉类型
 * 交叉类型 &，两边都要同时满足，相当于取交集
 * 对于对象类型是将两边的内容进行合并
 */
function test2() {
  console.log('---test2---------------------------------------------');

  interface NameStruct {
    name: string;
  };
  interface AgeStruct {
    age: number;
  };
  type Person = AgeStruct & NameStruct; // 对于两个对象类型，将两个进行合并
  const person: Person = {
    name: '',
    age: 0
  };

  type NeverType = number & string; // 不可能满足是 number 类型的同时又是 string 类型

  // 对象的交叉类型内部的同名属性会按照交叉类型合并
  type Struct1 = {
    prop1: string;
    prop2: {
      name: string,
      age: number | string,
    };
  };
  type Struct2 = {
    prop1: number; // prop1 是基础类型，两个不是同时都满足的，会被合并成 never
    prop2: { // 对象类型中的内容会组合起来
      age: number // 会被合并成 number
    };
  };
  type Person1 = Struct1 & Struct2;

  type PersonProp1Type = Person1['prop1']; // never
  type PersonProp2Age = Person1['prop2']['age']; // number

  type NumberType = number;
  type ObjectType = Object;
  type AndType = NumberType & ObjectType;
};

/**
 * 索引类型
 */
function test3() {
  console.log('---test3---------------------------------------------');

  test3_1();
  test3_2();
  test3_3();
};

/**
 * 索引签名类型
 * 在接口或者类型中，快速声明一个 键值类型一致的类型结构
 */
function test3_1() {
  console.log('---test3_1---------------------------------------------');

  interface AllStringType {
    [key: string]: string | number;
  };
  type propType1 = AllStringType['name']; // string | number

  // 要注意 obj[prop] 的形式会将数组类型的 prop 转化成字符串的 prop 来访问，因此即使加 number 类型的属性也不会报错，symbol 类型的也一样

  const personL: AllStringType = {
    name: 12,
    12: 12,
    [Symbol(12)]: 12,
  };
};

/**
 * 索引类型查询
 * keyof 操作符就是进行索引类型查询的，注意 keyof 后面可以接类型和接口和泛型，不能直接接变量（但可以通过泛型传入）
 * 可以将对象中的所有键转化成对应的字面量类型，然后再组合成联合类型，类似于 Object.keys(Obj).join('|')
 * 查询索引的类型
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  type AllStringType = {
    [key: string]: string,
  };

  type keyType = keyof AllStringType; // string | number

  type AllKeyType = keyof any; // string | number | symbol

  const obj = { 1: 1 };
  // let b: keyof obj; // 会报错，keyof 后面不能直接接变量
};

/**
 * 索引类型访问
 * 根据索引的类型或者索引的值，查询对应的值的类型
 */
function test3_3() {
  console.log('---test3_3---------------------------------------------');

  type NumberRecord = {
    [key: number]: number;
    [key: symbol]: string;
  };

  type NumberKeyValueType = NumberRecord['12']; // number
  type SymbolKeyValueType = NumberRecord[symbol]; // string 像这种 [] 里面是直接的一个类型，就要 NumberRecord 里面是直接定义了 [key: 类型]：类型 才可以

  type AllValueType = NumberRecord[keyof NumberRecord]; // string | number
  type AllKeyType = keyof NumberRecord; // number | symbol
};

/**
 * 映射类型：类型编程的第一步
 * 索引类型的最佳拍档之一就是映射类型
 * 索引类型查询和索引类型访问通常和映射类型一起搭配使用
 * 
 * 映射类型的主要作用是：基于键名映射到键值类型
 */
function test4() {
  console.log('---test4---------------------------------------------');

  type Stringify<T> = { // 在使用的时候，会遍历传入的 T 的所有的 Key ，并且 Key 对应的类型是 string，最终生成的是与传入的 T 的 Key 完全一样，但是 Key 对应的类型是 string 的新的类型
    [key in keyof T]: string;
  };

  type Clone<T> = {
    [K in keyof T]: T[K]; // 完全拷贝传入的对象的类型
  };
};

export default test;