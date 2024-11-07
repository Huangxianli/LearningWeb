function test () {
  console.log('---Array.prototype.pop()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.pop() 从数组中删除最后一个元素，并返回该元素的值，当数组为空的时候，返回 undefined
 * 会修改原数组
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const pop1_1 = arr1_1.pop();
  console.log('pop1_1: ', pop1_1); // 12
  console.log('arr1_1: ', arr1_1); //[-0, NaN]
};

/**
 * 访问稀疏数组，弹出 empty值的项，会是 undefined
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  arr2_1[0] = 0;
  const pop2_1 = arr2_1.pop();
  console.log('pop2_1: ', pop2_1); // undefined
  console.log('arr2_1: ', arr2_1); // [0, empty...]
};

/**
 * pop() 方法是通用的 length 非负整数
 * 修改 length ，删除对应的 1 项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 2,
    1: 1
  };
  const pop3_1 = Array.prototype.pop.call(notArray3_1);
  console.log('pop3_1: ', pop3_1); // 1
  console.log('notArray3_1: ', notArray3_1); // {length: 1}

  const notArray3_2 = {
    length: 1,
    1: 1
  };
  const pop3_2 = Array.prototype.pop.call(notArray3_2);
  console.log('pop3_2: ', pop3_2); // undefined
  console.log('notArray3_2: ', notArray3_2); // {1: 1, length: 0}
};

export default test;