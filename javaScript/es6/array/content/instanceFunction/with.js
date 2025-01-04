function test () {
  // 2023
  console.log('---Array.prototype.with()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.with(index, value) 方法是使用方括号表示法修改指定索引值的复制方法版本。它会返回一个新数组，其指定索引处的值会被新值替换
 * 不会修改原数组
 * 如果没有传第二个参数，就不会删除任何一项
 * index 超出 length - 1 会报错
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const arr1_2 = arr1_1.with(1,);
  console.log('arr1_2: ', arr1_2); // [0, undefined, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('arr1_1: ', arr1_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const arr1_3 = arr1_1.with(1);
  console.log('arr1_3: ', arr1_3); //  [0, undefined, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  // const arr1_4 = arr1_1.with(12); // with.js:27 Uncaught RangeError: Invalid index : 12
};

/**
 * 会访问 empty 项，转化成 undefined
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(5);
  const arr2_2 = arr2_1.with(1);
  console.log('arr2_2: ', arr2_2); // [undefined, undefined, undefined, undefined, undefined]
};


/**
 * with() 是通用的，期望 this 上有 length，和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 1,
    0: 0,
    2: 2,
    3: 3,
    4: undefined,
    16: 16,
    a: 'a',
  };
  const with3_1 = Array.prototype.with.call(notArray3_1, 0, 3);
  console.log('with3_1: ', with3_1); // [3]
};

export default test;