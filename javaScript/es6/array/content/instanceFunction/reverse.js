function test () {
  console.log('---Array.prototype.reverse()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.reverse() 就地反转数组中的元素，并返回同一数组的引用
 * 会修改元数组的值
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const arr1_2 = arr1_1.reverse();
  console.log('arr1_1: ', arr1_1); // [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  console.log('arr1_2: ', arr1_2); // [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
};


/**
 * 访问稀疏数组，会访问，也不会改变值，依旧为empty
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  arr2_1[0] = 0;
  arr2_1.reverse();
  console.log('arr2_1: ', arr2_1); // [empty..., 0]
};

/**
 * reverse() 是通用的，期望 this 上有 length，和非负整数项
 * 原来是什么类型，返回的就是什么类型的
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    2: 2,
    3: 3
  };
  const data = Array.prototype.reverse.call(notArray3_1, (accumulator, currret) => accumulator + currret);
  console.log('notArray3_1: ', notArray3_1); // { 8: 3, 9: 2, length: 12 }
  console.log('data: ', data); // {8: 3, 9: 2, length: 12}
};

export default test;