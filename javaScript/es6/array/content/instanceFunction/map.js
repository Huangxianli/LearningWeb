function test () {
  console.log('---Array.prototype.indexOf()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.map(callback, thisObj) 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const arr1_2 = arr1_1.map(el => {
    return el + 1;
  });
  console.log('arr1_2: ', arr1_2); // [1, NaN, 13]
};

/**
 * 访问稀疏数组，不会访问empty值的项
 * 注意，返回的数组的长度是和原数组的长度是一样的，emtpy值项，虽然没有访问到，但是在返回的数组中，会用 empty 值填充该项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  arr2_1[0] = 0;
  const indexArr1_1 = [];
  const arr2_2 = arr2_1.map((el, index) => {
    indexArr1_1.push(index);
    return el + 1
  });
  console.log('indexArr1_1: ', indexArr1_1); // [0]
  console.log('arr2_2: ', arr2_2); // [0, empty, ...]
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
  const arr3_1 = Array.prototype.map.call(notArray3_1, el => el);
  console.log('arr3_1: ', arr3_1); // [empty, 1]
};

export default test;