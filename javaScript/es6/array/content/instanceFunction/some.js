function test () {
  console.log('---Array.prototype.some()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.some() 测试数组中是否至少有一个元素通过了由提供的函数实现的测试，超找到一个就停止
 * 空数组永远返回 false
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const some1_1 = arr1_1.some(item => item === 2);
  console.log('some1_1: ', some1_1); //true

  const indexArr1_1 = [];
  const some1_2 = arr1_1.some((item, index) => {
    indexArr1_1.push(index);
    return item === 3;
  });
  console.log('some1_2: ', some1_2); //true
  console.log('indexArr1_1: ', indexArr1_1); // [0, 1, 2, 3]

  const arr1_3 = [];
  const some1_3 = arr1_3.some(() => true);
  console.log('some1_3: ', some1_3); // false
};


/**
 * 访问稀疏数组，不会访问值为 empty 的项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  arr2_1[2] = 2;
  const indexArr2_1 = [];
  const some3_1 = arr2_1.some((item, index) => {
    indexArr2_1.push(index);
    return item === undefined;
  });
  console.log('indexArr2_1: ', indexArr2_1); // [2]
  console.log('some3_1: ', some3_1); // false
};

/**
 * some() 是通用的，期望 this 上有 length，和非负整数项
 * 返回的一定是数组
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3
  };
  const some3_1 = Array.prototype.some.call(notArray3_1, item => item === 2);
  console.log('some3_1: ', some3_1); // true
};

export default test;