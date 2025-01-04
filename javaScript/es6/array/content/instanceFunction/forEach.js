function test () {
  console.log('---Array.prototype.forEach()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.forEach() 对数组的每个元素执行一次给定的函数
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const indexArr1_1 = [];
  arr1_1.forEach((el, index) => {
    indexArr1_1.push(index);
  });
  console.log('indexArr1_1: ', indexArr1_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

/**
 * 访问稀疏数组，不会访问empty值的项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(12);
  const indexArr2_1 = [];
  arr2_1.forEach((el, index) => {
    indexArr2_1.push(index);
  });
  console.log('indexArr2_1: ', indexArr2_1); // []
};

/**
 * forEach方法是通用的，this要有length属性和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    1: 1,
    3: 3
  };
  const indexArr3_1 = [];
  Array.prototype.forEach.call(notArray3_1, (el, index) => { indexArr3_1.push(index); });
  console.log('indexArr3_1: ', indexArr3_1); // [1, 3]

};

export default test;