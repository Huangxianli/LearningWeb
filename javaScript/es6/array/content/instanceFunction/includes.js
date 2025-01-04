function test () {
  console.log('---Array.prototype.includes()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.includes(value, ?startIndex) 查找数组是否有指定值
 * 使用 零值相等 比较法， +0 === -0 NaN === NaN
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12];
  const includes1_1 = arr1_1.includes(NaN);
  console.log('includes1_1: ', includes1_1); // true

  const includes1_2 = arr1_1.includes(0);
  console.log('includes1_2: ', includes1_2); // true

  const includes1_3 = arr1_1.includes(3);
  console.log('includes1_3: ', includes1_3); // false

  const includes1_4 = arr1_1.includes(12, 3);
  console.log('includes1_4: ', includes1_4); // false
};

/**
 * 访问稀疏数组，empty项取的是undefined值
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const includes2_1 = arr2_1.includes(undefined);
  console.log('includes2_1: ', includes2_1); // true
};

/**
 * includes() 是通用的 this要有length属性和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArr3_1 = {
    length: 10,
    1: 1,
    2: 2
  };
  const includes3_1 = Array.prototype.includes.call(notArr3_1, 1);
  console.log('includes3_1: ', includes3_1); // true
};

export default test;