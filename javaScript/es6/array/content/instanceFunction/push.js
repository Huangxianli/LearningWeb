function test () {
  console.log('---Array.prototype.push()-----------------------------------------------');

  test1();
  test2();
};

/**
 * Array.prototype.push(ele1, ?ele2, ...) 将指定的元素添加到数组的末尾，并返回新的数组长度
 * 会修改原数组
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const push1_1 = arr1_1.push();
  console.log('push1_1: ', push1_1); // 3
  console.log('arr1_1: ', arr1_1); // [-0, NaN, 12]

  const push1_2 = arr1_1.push(1, undefined);
  console.log('push1_2: ', push1_2); // 5
  console.log('arr1_1: ', arr1_1); // [-0, NaN, 12, 1, undefined]
};


/**
 * push() 方法是通用的 length 非负整数
 * 修改 length ，增加对应的 1 项，如果对应的下标的项已经存在，则是修改 那 一项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const notArray2_1 = {
    length: 2,
    1: 1
  };
  const push2_1 = Array.prototype.push.call(notArray2_1, 12);
  console.log('push2_1: ', push2_1); // 3
  console.log('notArray2_1: ', notArray2_1); // {1: 1, 2: 12, length: 3}

  const notArray2_2 = {
    length: 1,
    1: 1,
    2: 2
  };
  const push2_2 = Array.prototype.push.call(notArray2_2, 12);
  console.log('push2_2: ', push2_2); // 2
  console.log('notArray2_2: ', notArray2_2); // {1: 12, 2: 2, length: 2}
};

export default test;