function test () {
  console.log('---Array.prototype.filter()---------------------------------------------');
  test1();
  test2();
  test3();
};

/**
 * 创建给定数组满足条件的一部分的浅拷贝，返回一个数组，不会对稀疏数组项进行访问
 * Array.prototype.filter(callback, thisObj)
 */
function test1 () {
  console.log('---test1---------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (ele, index) => index);
  const arr1_2 = arr1_1.filter(ele => ele >= 6);
  console.log('arr1_2: ', arr1_2); // [6, 7, 8, 9, 10, 11]

  const arr1_3 = new Array(12);
  arr1_3.fill(1, 4, 5);
  const arr1_4 = arr1_3.filter(ele => true);
  console.log('arr1_4: ', arr1_4); // [1] 不会访问empty

};

/**
 * filter是通用的，期望this有lengthd属性和证书属性
 */
function test2 () {
  console.log('---test2---------------------------------------------');

  const notArray2_1 = {
    0: 0,
    1: 1,
    [-1]: -1,
    length: 3
  };
  const arr2_1 = Array.prototype.filter.call(notArray2_1, () => true);
  console.log('arr2_1: ', arr2_1); // [0, 1s]
};

/**
 * 
 */
function test3 () {
  console.log('---test2---------------------------------------------');

};

export default test;