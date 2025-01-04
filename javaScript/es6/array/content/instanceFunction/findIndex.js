function test () {
  console.log('---Array.prototype.findIndex()-----------------------------------------------');
  test1();
  test2();
  test3();
  test4();
};

/**
 * Array.prototype.findIndex(callbackFn, thisArg)
 * 返回数组中满足条件的 第一个 元素的 索引，没有找到就返回 -1
 */
function test1 () {
  console.log('---test1-----------------------------------------------');
  const arr1_1 = Array.from(Array.prototype.fill.call({ length: 12 }, 12));
  console.log('arr1_1: ', arr1_1);
  const findIndex1_1 = arr1_1.findIndex(el => el === 12);
  console.log('findIndex1_1: ', findIndex1_1); // 0
  const findIndex1_2 = arr1_1.findIndex(el => el > 13);
  console.log('findIndex1_2: ', findIndex1_2); // -1


};

/**
 * 访问稀疏数组
 * 不会忽略empty值的项，会取 undefined 值
 */
function test2 () {
  console.log('---test2-----------------------------------------------');
  const arr2_1 = new Array(12);
  const findIndex2_1 = arr2_1.findIndex(el => el === undefined);
  console.log('findIndex2_1: ', findIndex2_1); // 0
};

/**
 * 遍历途中修改数组项
 * 遍历途中修改数组长度，在进入遍历的时候，会记录数组的长度
 * 遍历途中修改数组指向地址吗，访问的原先的数组
 */
function test3 () {
  console.log('---test3-----------------------------------------------');
  const arr3_1 = new Array(12);
  const findIndex3_1 = arr3_1.findIndex((el, index) => {
    if (index === 0) {
      arr3_1[2] = 2;
    }
    return el === 2;
  });
  console.log('findIndex3_1: ', findIndex3_1); // 2

  const arr3_2 = new Array(12).fill(2);
  const indexArr3_1 = [];
  const elArr3_1 = [];
  arr3_2.findIndex((el, index) => {
    if (index === 1) {
      arr3_2.length = 3;
    }
    indexArr3_1.push(index);
    elArr3_1.push(el);
  });
  // 即使是在遍历途中删减了数组的长度，还是会访问原来的长度，删减的部分 访问的时候，默认值为undefined
  console.log('indexArr3_1: ', indexArr3_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('elArr3_1: ', elArr3_1); // [2, 2, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

  let arr3_3 = [1, 2, 3, 4, 5, 6];
  const elArr3_2 = [];
  const findIndex3_2 = arr3_3.findIndex((el, index) => {
    if (index === 1) {
      arr3_3 = [1, 1, 1, 1, 1];
    };
    elArr3_2.push(el);
    return el > 5;
  });
  // 修改指向的地址，访问的是原来的数组
  console.log('findIndex3_2: ', findIndex3_2); // 5
  console.log('elArr3_2: ', elArr3_2); // [1, 2, 3, 4, 5, 6]

};

/**
 * Array.prototype.findIndex方法是通用的
 * 会去获取this的length属性 和 非负整数索引
 */
function test4 () {
  console.log('---test4-----------------------------------------------');
  const findIndex4_1 = Array.prototype.findIndex.call({ length: 12, 3: 12 }, el => el > 1);
  console.log('findIndex4_1: ', findIndex4_1); // 3
};
export default test;