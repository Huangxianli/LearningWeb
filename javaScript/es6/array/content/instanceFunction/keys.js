function test () {
  console.log('---Array.prototype.keys()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.keys() 方法返回一个新的数组 迭代器 对象，其中包含数组中每个索引的键
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12, undefined, null];
  const keys1_1 = arr1_1.keys(',');
  console.log('keys1_1: ', keys1_1); // Array Iterator {}

  const indexArr1_1 = []
  for (let keys of keys1_1) {
    indexArr1_1.push(keys);
  };
  console.log('indexArr1_1: ', indexArr1_1); // [0, 1, 2, 3, 4]
};

/**
 * 访问稀疏数组，会访问 empty值 的项 表现和 undefined值的项 一样
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const keys2_1 = arr2_1.keys(',');
  const indexArr2_1 = [];
  for (let key of keys2_1) {
    indexArr2_1.push(key);
  }
  console.log('indexArr2_1: ', indexArr2_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

/**
 * keys() 方法是通用的 length 非负整数
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 2,
    1: 1
  };
  const keys3_1 = Array.prototype.keys.call(notArray3_1);
  const indexArr3_1 = [];
  for (let key of keys3_1) {
    indexArr3_1.push(key);
  }
  console.log('indexArr3_1: ', indexArr3_1); // [0, 1]
};

export default test;