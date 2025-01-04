function test () {
  console.log('---Array.prototype.shift()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.shift() 从数组中删除第一个元素，并返回该元素的值
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const shift1_1 = arr1_1.shift();
  console.log('shift1_1: ', shift1_1); // 0
  console.log('arr1_1: ', arr1_1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};


/**
 * 访问稀疏数组，如果弹出的项为 empty 会将其当成undefined
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const shift2_1 = arr2_1.shift();
  console.log('shift2_1: ', shift2_1); // undefined
  console.log('arr2_1: ', arr2_1); // [empty ...]
};

/**
 * shift() 是通用的，期望 this 上有 length，和非负整数项
 * 原来是什么类型，返回的就是什么类型的
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3
  };
  const shift3_1 = Array.prototype.shift.call(notArray3_1);
  console.log('notArray3_1: ', notArray3_1); // {1: 2, 2: 3, length: 11}
  console.log('shift3_1: ', shift3_1); // 0
};

export default test;