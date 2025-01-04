function test () {
  console.log('---Array.prototype.findLast()-----------------------------------------------');
  test1();
};

/**
 * Array.prototype.findLast()是从索引最大的项开始查找满足条件元素，找到了返回元素，没有找到返回undefined
 */
function test1 () {
  console.log('---test-----------------------------------------------');
  const arr1_1 = new Array(1, 3, 2, 2, 2, 3, 4, 4, 5, 6, 7, 8);
  const indexArr1_1 = [];
  const findLast1_1 = arr1_1.findLast((el, index) => {
    indexArr1_1.push(index);
    return el < 4;
  });
  console.log('indexArr1_1: ', indexArr1_1); // [11, 10, 9, 8, 7, 6, 5]
  console.log('findLast1_1: ', findLast1_1); // 3
};

// 除了从最后一项开始查找，其他的和find表现一样

export default test;