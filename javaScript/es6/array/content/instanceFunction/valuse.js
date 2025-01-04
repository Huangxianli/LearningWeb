function test () {
  console.log('---Array.prototype.values()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.values() 返回一个新的数组迭代器对象，该对象迭代数组中每个元素的值
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const valuse1_1 = arr1_1.values();
  console.log('valuse1_1: ', valuse1_1); // Array Iterator {}

  console.log(valuse1_1[Symbol.iterator] === Array.prototype.values); // false
};

/**
 * 会访问 empty 项，当成 undefined
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(5);
  const values2_1 = arr2_1.values();
  const valueArr = [];
  for (let value of values2_1) {
    valueArr.push(value);
  }
  console.log('valueArr: ', valueArr); // [undefined, undefined, undefined, undefined, undefined]
};


/**
 * values() 是通用的，期望 this 上有 length，和非负整数项
 * 只处理 length 范围内的
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
  const valuse3_1 = Array.prototype.values.call(notArray3_1);
  const valueArr = [];
  for (let value of valuse3_1) {
    valueArr.push(value);
  }
  console.log('valueArr: ', valueArr); // [0]
};

export default test;