function test () {
  console.log('---Array.prototype.indexOf()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.indexOf(value, start) 返回第一次出现给定元素的下标，不存在返回 -1 
 * 采用的是严格相等 ===
 * 注意与 findIndex 的区别 
 * 注意与 includes 的区别
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const indexOf1_1 = arr1_1.indexOf(0);
  console.log('indexOf1_1: ', indexOf1_1); // 0

  const indexOf1_2 = arr1_1.indexOf(NaN);
  console.log('indexOf1_2: ', indexOf1_2); // -1

  const indexOf1_3 = arr1_1.indexOf(12, 4);
  console.log('indexOf1_3: ', indexOf1_3); // -1
};

/**
 * 访问稀疏数组，不会访问empty值的项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const indexOf2_1 = arr2_1.indexOf(undefined);
  console.log('indexOf2_1: ', indexOf2_1); // -1
};

/**
 * indexOf() 方法是通用的 length 非负整数
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 2,
    1: 1
  };
  const indexOf3_1 = Array.prototype.indexOf.call(notArray3_1, 1);
  console.log('indexOf3_1: ', indexOf3_1); // 1
};

export default test;