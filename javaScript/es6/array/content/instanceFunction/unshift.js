function test () {
  console.log('---Array.prototype.unshift()-----------------------------------------------');

  test1();
  test2();
};

/**
 * Array.prototype.unshift(?ele1, ?ele2, ...) 方法将指定元素添加到数组的开头，并返回数组的新长度
 * 会修改原数组
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const unshift1_1 = arr1_1.unshift();
  console.log('unshift1_1: ', unshift1_1); //  12
  console.log('arr1_1: ', arr1_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const unshift1_2 = arr1_1.unshift(100, 100, 100);
  console.log('unshift1_2: ', unshift1_2); // 15
  console.log('arr1_1: ', arr1_1); // [100, 100, 100, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};


/**
 * unshift() 是通用的，期望 this 上有 length，和非负整数项
 * 只处理 本身的 length + 新增的项的个数， 超过这些部分，直接照搬，但是在原来的 length 外的项如果同时又在 length + 新增的项的个数 的下标内的话，会被覆盖掉
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const notArray2_1 = {
    length: 1,
    0: 0,
    2: 2,
    3: 3,
    4: undefined,
    16: 16,
    a: 'a',
  };
  const unshift2_1 = Array.prototype.unshift.call(notArray2_1, 100, 100, 100, 100, 100);
  console.log('notArray2_1: ', notArray2_1); // {0: 100, 1: 100, 2: 100, 3: 100, 4: 100, 5: 0, 16: 16, length: 6, a: 'a'}
  console.log('unshift2_1: ', unshift2_1); // 6


};

export default test;