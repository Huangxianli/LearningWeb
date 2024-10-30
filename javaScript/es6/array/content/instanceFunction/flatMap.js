function test () {
  console.log('---Array.prototype.flatMap()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * 相当于调用 map(),后再调用 flat()
 * 对数组的每个元素应用给定的回调，饭后将结果展开一级，返回一个新的数组
 * 注意，只能展开一级，无法指定展开的层级
 */
function test1 () {
  console.log('---test1-----------------------------------------------');
  const arr1_1 = new Array(12).fill(1);
  const arr1_2 = arr1_1.flatMap((el, index) => {
    return index % 2 === 0 ? el : [2, 2];
  });
  console.log('arr1_2: ', arr1_2); // [1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2]
};

/**
 * 访问稀疏数组，不会访问empty值项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');
  const arr2_1 = new Array(2);
  const arr2_2 = arr2_1.flatMap(el => 1);
  console.log('arr2_2: ', arr2_2); // []

  const arr2_3 = [, 1, , 3];
  const indexArr2_1 = [];
  const arr2_4 = arr2_3.flatMap((el, index) => {
    indexArr2_1.push(index);
    return el;
  });
  console.log('indexArr2_1: ', indexArr2_1); // [1, 3]
  console.log('arr2_4: ', arr2_4); // [1, 3]
};

/**
 * flatMap() 是一个通用方法，this要求有length属性和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');
  const arr3_1 = {
    length: 3,
    1: [1],
  };
  const arr3_2 = Array.prototype.flatMap.call(arr3_1, el => el);
  console.log('arr3_2: ', arr3_2); // [1]
};

export default test;