function test () {
  console.log('---Array.prototype.flat()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.flat()方法创建一个新的数组，并根据指定的 深度 递归的将所有子数组展开拼接到新的数组中
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.of([12, 23, [1, 2, [11]]], 12, [21]);
  const arr1_2 = arr1_1.flat();
  console.log('arr1_2: ', arr1_2); // [12, 23, [1, 2, [11]], 12, 21] 什么都不传的时候，会展开内部元素的第一层数组，相当于传的是 1

  const arr1_3 = arr1_1.flat(2);
  console.log('arr1_3: ', arr1_3); // [12, 23, 1, 2,  [11], 12, 21]
};

/**
 * 遇到稀疏数组，会忽略展开的那一层的 稀疏值，不会转化成undefined，也不会占据数组的一项
 * 注意可以利用这个特性，去除掉第一层的 empty
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(12);
  const arr2_2 = arr2_1.flat();
  console.log('arr2_2: ', arr2_2); // []

  const arr2_3 = new Array(12);
  arr2_3[2] = new Array(2);
  const arr2_4 = arr2_3.flat(0);
  console.log('arr2_4: ', arr2_4); // [[empty, empty]] 注意可以利用这个特性，去除掉第一层的 empty
  const arr2_5 = arr2_3.flat(1);
  console.log('arr2_5: ', arr2_5); // []
};

/**
 * flat() 是通用的，要求有 length 和非负整数属性
 * 如果要展开里面的项，则里面的项 必须是数组
 * 返回的一定是数组
 */
function test3 () {
  console.log('---test4-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    1: 1
  };
  const arr3_1 = Array.prototype.flat.call(notArray3_1, 1);
  console.log('arr3_1: ', arr3_1); // [1]

  const notArray3_2 = {
    length: 10,
    0: {
      length: 12,
      0: 1
    },
  }
  const arr3_2 = Array.prototype.flat.call(notArray3_2, 2);
  console.log('arr3_2: ', arr3_2); // [{length: 12, 0: 1}] 因为里面的项不是数组，所以不能展开
};


export default test;
