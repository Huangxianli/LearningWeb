function test () {
  console.log('---Array.prototype.entries()-------------------------------------------');
  test1();
  test2();
  test3();
  test4();
};

/**
 * 返回一个新的数组迭代器对象，该对象包含数组的每个索引的键值对
 */
function test1 () {
  console.log('---test1-------------------------------------------');

  const arr1_1 = [1, 2, 3, 4, 5];
  const iterator1 = arr1_1.entries();
  const data1_1_1 = iterator1.next();
  console.log('data1_1_1: ', data1_1_1); // { done: false, value: [0, 1] }
  const data1_1_2 = iterator1.next();
  console.log('data1_1_2: ', data1_1_2); // { done: false, value: [1, 2] }
};

/**
 * 稀疏数组迭代empty的时候，就像undefined一样
 */
function test2 () {
  console.log('---test2-------------------------------------------');
  const arr2_1 = (new Array(12)).concat([12, 13]);
  const iterator1 = arr2_1.entries();
  const data2_1_1 = iterator1.next();
  console.log('data2_1_1: ', data2_1_1); // { done: false, value: [0: undefined]} // 把empty处理成undefined
};

/**
 * for of
 */
function test3 () {
  console.log('---test2-------------------------------------------');

  const arr3_1 = [0, 1, 2, 3, 4, 5];
  const iterator1 = arr3_1.entries();
  const indexArr = [];
  const eleArr = [];
  for (let [index, ele] of iterator1) {
    indexArr.push(index);
    eleArr.push(ele);
  };
  console.log('indexArr: ', indexArr); // [0, 1, 2, 3, 4, 5]
  console.log('eleArr: ', eleArr); // [0, 1, 2, 3, 4, 5]
};

/**
 * 在非数组上调用entries()，读取this的length属性，从0开始访问每个整数索引
 */
function test4 () {
  const notArray1 = {
    [-2]: -2,
    '-1': '-1',
    1: 1,
    length: 3
  };
  const iterator1 = Array.prototype.entries.call(notArray1);
  const indexArr = [];
  const eleArr = [];
  for (let [index, ele] of iterator1) {
    indexArr.push(index);
    eleArr.push(ele);
  };
  console.log('indexArr: ', indexArr); // [0, 1, 2]
  console.log('eleArr: ', eleArr); // [undefined, 1, undefined]
};



export default test;