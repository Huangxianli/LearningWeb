function test () {
  console.log('---Array.prototype.fill()-----------------------------------------------');
  test1();
  test2();
  test3();
  test4();
};

/**
 * 注意该方法和Array.prototype.copyWithin的区别
 */
/**
 * 用一个固定值填充一个数组从起始索引到终止索引内的全部元素，返回修改后的数组，不修改原来数组的长度，但会修改数组的内容
 * Array.prototype.fill(value, start, end); [start, end)
 */
function test1 () {
  console.log('---test1-----------------------------------------------');
  const arr1_1 = [0, 1, 2, 3, 4];
  const arr1_2 = arr1_1.fill(1, 0, 7);
  console.log('arr1_2: ', arr1_2); // [1, 1, 1, 1, 1] 
  console.log('arr1_1: ', arr1_1); // [1, 1, 1, 1, 1] 会修改原数组，但不会修改数组的长度
};

/**
 * start < 0 则 start = start + length 如果还是小于0 则start = 0 
 * end < 0 则 end = end + length 如果还是小于0 则end = 0； end > length 则 end = length
 * end <= start 不填充
 */
function test2 () {
  console.log('---test2-----------------------------------------------');
  const arr2_1 = [0, 1];
  const arr2_2 = arr2_1.concat([]).fill(2, 0, 0);
  console.log('arr2_2: ', arr2_2); // [2, 1] 

  const arr2_3 = arr2_1.concat([]).fill(2, -1);
  console.log('arr2_3: ', arr2_3); // [0, 2]

  const arr2_4 = arr2_1.concat([]).fill(2, -2, -1);
  console.log('arr2_4: ', arr2_4); // [2, 1]

  const arr2_5 = arr2_1.concat().fill(2, 2, 1);
  console.log('arr2_5: ', arr2_5); // [0, 1] 没有发生填充
};

/**
 * 稀疏数组会被填充
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const arr3_1 = new Array(5);
  const arr3_2 = arr3_1.fill(1);
  console.log('arr3_2: ', arr3_2); // [1, 1, 1, 1, 1]
};

/**
 * 该方法是通用的，只期望this有一个length属性
 * 原始是什么类型，返回的就是什么类型
 */
function test4 () {
  console.log('---test4-----------------------------------------------');

  const notArray4_1 = {
    length: 12
  };
  const arr4_1 = Array.prototype.fill.call(notArray4_1, 1, 2, 4);
  console.log('arr4_1: ', arr4_1); // { 2: 1, 2: 1, length: 12 } 返回的值不是数组
  console.log('notArray4_1: ', notArray4_1); // { 2: 1, 2: 1, length: 12 } 返回的值不是数组
};


export default test;