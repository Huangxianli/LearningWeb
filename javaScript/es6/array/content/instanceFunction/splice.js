function test () {
  console.log('---Array.prototype.splice()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.splice(start, ?deleteCount, ?item1, ?item2, ..., ?itemN) 就地移除或者替换已存在的元素和 / 或添加新的元素
 * 会修改原数组
 * 注意返回的值不是修改后的数组，而是被删除的元素组成的数组
 *
 * 没有传入 deleteCount 的时候，删除 start 及其之后的元素
 * 
 * 如果 deleteCount 为 0，又插入了新的元素，则会将start 位置的元素向后移动
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const arr1_2 = arr1_1.splice(0, 0, 100, 100, 100);
  console.log('arr1_2: ', arr1_2); // []
  console.log('arr1_1: ', arr1_1); // [100, 100, 100, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const arr1_3 = [0, 1, 2, 3, 4];
  arr1_3.splice(2);
  console.log('arr1_3: ', arr1_3); // [0, 1]

  const arr1_4 = [0, 1, 2, 3, 4];
  arr1_4.splice(2, Number.NEGATIVE_INFINITY, 10, 11);
  console.log('arr1_4: ', arr1_4); // [0, 1, 10, 11]

  const arr1_5 = Array.from(new Array(10), (el, index) => index);
  arr1_5.splice(1, 0, 100);
  console.log('arr1_5: ', arr1_5); // [0, 100, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const arr1_6 = Array.of(0, 1, 2, 3, 4, 5, 6);
  const arr1_7 = arr1_6.splice(0, 3);
  console.log('arr1_7: ', arr1_7); // [0, 1, 2]
  console.log('arr1_6: ', arr1_6); // [3, 4, 5, 6]
};


/**
 * 访问稀疏数组，会访问 empty，不会当成 undefined 来处理，如果删除的是 empty 项，返回的数组中对应的内容也是 empty，不会转化成 undefined
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = Array.from(new Array(10), (item, index) => index);
  arr2_1.length = 20;
  const arr2_2 = arr2_1.splice(0, 12);
  console.log('arr2_1: ', arr2_1); // [empty × 8]
  console.log('arr2_2: ', arr2_2); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, empty， empty]
};

/**
 * splice() 是通用的，期望 this 上有 length，和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3,
    4: undefined,
    16: 16,
    a: 'a',
  };
  const splice3_1 = Array.prototype.splice.call(notArray3_1, 1);
  console.log('splice3_1: ', splice3_1); // [empty, 2, 3, undefined, empty × 7]
  console.log('notArray3_1: ', notArray3_1); // {0: 0, 16: 16, length: 1, a: 'a'}
};

export default test;