function test () {
  console.log('---Array.prototype.join()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.join(separator) 指定一个字符串来分隔数组（或类数组）的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = [-0, NaN, 12, undefined, null];
  const join1_1 = arr1_1.join(',');
  console.log('join1_1: ', join1_1); // 0,NaN,12
  // 注意 undefined 和 null 都转化成了 空''

};

/**
 * 访问稀疏数组，访问empty值的项，和访问 undefined 一样
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  const join2_1 = arr2_1.join(',');
  console.log('join2_1: ', join2_1); // ,,,,,,,,,
};

/**
 * join() 方法是通用的 length 非负整数
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 2,
    1: 1
  };
  const join3_1 = Array.prototype.join.call(notArray3_1, ',');
  console.log('join3_1: ', join3_1); // ,1
};

export default test;