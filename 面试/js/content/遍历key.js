function test() {
  console.log('--- 遍历 key ----------------------------------------');
  test1();
  test2();
  test3();
}
const prototypeObj = { prototypeKey1: 1 };
const obj = Object.create(prototypeObj);
Object.defineProperties(obj, {
  key1: { value: 1, enumerable: false },
  key2: { value: 2, enumerable: true },
  [Symbol.for('key3')]: { value: 3, enumerable: true },
});

/**
 * 遍历对象 key 的方法以及他们之间的区别：
 * Object.getOwnPropertyNames() -- 自己 非 Symbol
 * Object.getOwnPropertySymbols() -- 自己 Symbol
 * Object.keys() -- 最严格 非 Symbol enumerable: true 自己本身
 * for...in -- 非 Symbol enumerable: true
 */
function test1() {
  test1_1();
  test1_2();
  test1_3();
  test1_4();
}

/**
 * Object.getOwnPropertyNames()
 * 获取自己身上的，所有非 symbol 的属性，包括 enumerable 为 false 的
 */
function test1_1() {
  const keys1 = Object.getOwnPropertyNames(obj);
  console.log(keys1); // [ 'key1', 'key2' ]
}

/**
 * Object.getOwnPropertySymbols()
 * 获取自己身上的，所有 symbol 的属性，包括 enumerable 为 false 的
 */
function test1_2() {
  const keys2 = Object.getOwnPropertySymbols(obj);
  console.log(keys2); // [ Symbol(key3) ]
}

/**
 * Obejct.keys()
 * 获取 enumerable 为 true 的自己本身的非 symbol 的属性
 */
function test1_3() {
  const keys3 = Object.keys(obj);
  console.log(keys3); // [ 'key2' ]
}

/**
 * for...in
 * 遍历对象本身和原型上 enumerable 为 true 的非 symbol 属性
 */
function test1_4() {
  const keys4 = [];
  for (let key in obj) {
    keys4.push(key);
  }
  console.log(keys4); // [ 'key2', 'prototypeKey1' ]
}

/**
 * in 操作符
 * 所有类型的 key 都可以判断到
 */
function test2() {
  console.log('--- in 操作符 ----------------------------------------');
  console.log(Symbol.for('key3') in obj); // true
  console.log('key1' in obj); // true
  console.log('key2' in obj); // true
  console.log('prototypeKey1' in obj); // true
}

/**
 * for...of
 * 可以遍历有 iterable 接口的对象，普通对象不能便利
 * 属性的类型不会影响到 for...of 对于值的遍历
 */
function test3() {
  console.log('--- for...of ----------------------------------------');

  // 这里会报错
  // for (let value of obj) {
  // }

  const arr1 = [1, 2, 3];
  const value1 = [];
  Object.defineProperty(arr1, 0, {
    enumerable: false,
  });
  for (let value of arr1) {
    value1.push(value);
  }
  console.log(value1); // [ 1, 2, 3 ]
}

test();
