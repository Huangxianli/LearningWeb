function test () {
  console.log('---Array.prototype.copyWithin()-------------------------------------------');
  test1();
  test2();
  test3();
};

/**
 * arr.copyWithin(target, start, end)
 * 浅复制数组的一部分（从[start, end)）到同一数组的另一个位置(target)
 * 会修改原数组
 * 不会修改原数组的长度
 * 为负数的时候，data + arr.length，如果还是 小于0 的话，就当成 0
 */
function test1 () {
  console.log('---test1-------------------------------------------');

  const arr1_1 = [0, 1, 2, 3, 4];
  const arr1_2 = Array.from(arr1_1).copyWithin(0, 1, 12);
  console.log('arr1_2: ', arr1_2); // [1, 2, 3, 4, 4] 取数组的[1, 4]的元素，从target开始一个一个填充

  const arr1_3 = Array.from(arr1_1).copyWithin(4, 1, 5);
  console.log('arr1_3: ', arr1_3); // [0, 1, 2, 3, 1] 虽然取的是[1, 5)的元素填充由index为4开始的元素，但是原数组index为4后没有元素了，所以只替换了一个元素，不会修改数组的长度

  const arr1_4 = Array.from(arr1_1).copyWithin(1, -1, -3);
  console.log('arr1_4: ', arr1_4); // [0, 1, 2, 3, 4] start < end 的时候，不会覆盖
};

/**
 * 来源是empty也会被填充，不会转化成undefined
 */
function test2 () {
  console.log('---test2-------------------------------------------');

  const arr2_1 = new Array(12);
  arr2_1[1] = 1;
  const arr2_2 = arr2_1.copyWithin(1, 10);
  console.log('arr2_2: ', arr2_2); // [empty, ...]
};


/**
 * 非数组对象上调用copyWithin()
 * 会读取this上的length
 * 字符串不可以调用该方法，因为该方法会修改自己的值，但是字符串是不可变的
 * 注意返回的不是Array类型的数据（copyWithin()会修改原来的对象，原来是什么类型，调用该方法之后还是什么类型）
 */
function test3 () {
  console.log('---test3-------------------------------------------');

  const notArray1 = { 0: 12, length: 2 };
  const arr3_1 = Array.prototype.copyWithin.call(notArray1, 0, 1, 2);
  console.log('arr3_1: ', arr3_1); // { length: 2 } 其他属性为empty

  const notArray2 = { 3: 3, 4: 4, 5: 5, length: 6 };
  const arr3_2 = Array.prototype.copyWithin.call(notArray2, 0, 3);
  console.log('arr3_2: ', arr3_2); // {0: 3, 1: 4, 2: 5, 3: 3, 4: 4, 5: 5, length: 6}

  const notArray3 = { 3: 3, 4: 4, 5: 5, length: 5 };
  const arr3_3 = Array.prototype.copyWithin.call(notArray3, 0, 3);
  console.log('arr3_3: ', arr3_3); // {0: 3, 1: 4, 3: 3, 4: 4, 5: 5, length: 5} 非数组是以this的length为主的，并且只会修改需要覆盖的部分

  const notArray4 = '123456';
  // const arr3_4 = Array.prototype.copyWithin.call(notArray4, 0, 3); // 会报错，不兼容string，因为copyWithin方法会修改原来的对象，但是String类型是不可以修改的，例如 notArray4[0]='0'，这样修改后，notArray4还是“123456”，没有修改成“023456”
};


export default test;
