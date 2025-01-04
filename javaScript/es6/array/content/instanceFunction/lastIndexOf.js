function test () {
  console.log('---Array.prototype.indexOf()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.laseIndexOf(value, start) 返回最后一次出现给定元素的下标，不存在返回 -1 ，从后往前找
 * 采用的是严格相等 ===
 * 注意与 findIndex 的区别 
 * 注意与 includes 的区别
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const lastIndexOf1_1 = arr1_1.lastIndexOf(0);
  console.log('lastIndexOf1_1: ', lastIndexOf1_1); // 0

  const lastIndexOf1_2 = arr1_1.lastIndexOf(NaN);
  console.log('lastIndexOf1_2: ', lastIndexOf1_2); // -1

  const lastIndexOf1_3 = arr1_1.lastIndexOf(12, 4);
  console.log('lastIndexOf1_3: ', lastIndexOf1_3); // 2
};

/**
 * 访问稀疏数组，不会访问empty值的项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const lastIndexOf2_1 = arr2_1.lastIndexOf(undefined);
  console.log('lastIndexOf2_1: ', lastIndexOf2_1); // -1
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
  const lastIndexOf3_1 = Array.prototype.lastIndexOf.call(notArray3_1, 1);
  console.log('lastIndexOf3_1: ', lastIndexOf3_1); // 1
};

export default test;