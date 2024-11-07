function test () {
  console.log('---Array.prototype.slice()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.slice() 方法返回一个新的数组对象，取 [start, end) 下标的内容，不会修改原数组
 * 返回的一定是数组
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const arr1_2 = arr1_1.slice(1, 3);
  console.log('arr1_1: ', arr1_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('arr1_2: ', arr1_2); // [1, 2]
};


/**
 * 访问稀疏数组，会访问，将其当成empty处理
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const arr2_2 = arr2_1.slice(2);
  console.log('arr2_2: ', arr2_2); // [empty × 8]
};

/**
 * slice() 是通用的，期望 this 上有 length，和非负整数项
 * 返回的一定是数组
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3
  };
  const arr3_1 = Array.prototype.slice.call(notArray3_1, 2, 5);
  console.log('arr3_1: ', arr3_1); // [2, 3, empty]
};

export default test;