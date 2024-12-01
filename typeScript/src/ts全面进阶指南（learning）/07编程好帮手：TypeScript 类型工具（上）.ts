function test() {
  console.log('---07编程好帮手：TypeScript 类型工具（上）---------------------------------------------');

  test1();
  test2();
  test3();
  test4();
};

/**
 * 类型别名
 */
function test1() {
  console.log('---test1---------------------------------------------');

  type Code = 200 | 301 | 400 | 500;
  const statuCode: Code = 200;

  type Handler = (e: Event) => void;
  const clickHandler: Handler = (e) => { };

  type Factory<T> = string | number | T;
  const factory: Factory<boolean> = false;

};

/**
 * 联合类型与交叉类型
 * 交叉类型 &，两边都要同时满足
 */
function test2() {
  console.log('---test2---------------------------------------------');

  interface NameStruct {
    name: string;
  };
  interface AgeStruct {
    age: number;
  };
  type Person = AgeStruct & NameStruct;
  const person: Person = {
    name: '',
    age: 0
  };

  type NeverType = number & string; // 不可能满足是 number 类型的同时又是 string 类型

  // 对象的交叉类型内部的同名属性会按照交叉类型合并
  type Struct1 = {
    prop1: string;
    prop2: {
      name: string
    };
  };
  type Struct2 = {
    prop1: number;
    prop2: {
      age: number
    };
  };
  type Person1 = Struct1 & Struct2;

  type PersonProp1Type = Person1['prop1']; // never
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
 * keyof 操作符就是进行索引类型查询的
 * 查询索引的类型
 */
function test3_2() {
  console.log('---test3_2---------------------------------------------');

  type AllStringType = {
    [key: string]: string,
  };

  type keyType = keyof AllStringType; // string | number

  type AllKeyType = keyof any; // string | number | symbol
};

/**
 * 索引类型访问
 * 根据索引的类型或者缩影的值，查询对应的值的类型
 */
function test3_3() {
  console.log('---test3_3---------------------------------------------');

  type NumberRecord = {
    [key: number]: number;
    [key: symbol]: string;
  };

  type NumberKeyValueType = NumberRecord['12']; // number
  type SymbolKeyValueType = NumberRecord[symbol]; // string
};

/**
 * 映射类型：类型编程的第一步
 * 索引类型的最佳拍档之一就是映射类型
 * 索引类型查询和索引类型访问通常和映射类型一起搭配使用
 * 
 * 映射类型的主要作用是：基于健明映射到键值类型
 */
function test4() {
  console.log('---test4---------------------------------------------');

  type Stringify<T> = {
    [key in keyof T]: string;
  };

  type Clone<T> = {
    [K in keyof T]: T[K];
  };
};

export default test;