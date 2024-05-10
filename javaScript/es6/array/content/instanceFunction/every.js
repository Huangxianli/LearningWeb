function test () {
  console.log('---Array.prototype.every-------------------------------------------------');
  test1();
  test2();
  test3();
};

/**
 * Array.prototype.every(callback, thisObj)
 * 测试一个数组内的所有元素是否都能通过指定的函数测试
 */
function test1 () {
  console.log('---test1-------------------------------------------------');

  const arr1_1 = [0, 1, 2, 3, 4];
  const isHigh = arr1_1.every(ele => ele > 12);
  console.log('isHigh: ', isHigh); // false
};

/**
 * 稀疏数组中empty项callback不会调用
 */
function test2 () {
  console.log('---test2-------------------------------------------------');

  const arr2_1 = new Array(12);
  const arr2_1Length = arr2_1.length;
  for (let i = 0; i <= arr2_1Length; i++) {
    if (i % 2 === 0) {
      arr2_1[i] = i;
    };
  };
  const indexArr = [];
  arr2_1.every((ele, index) => {
    indexArr.push(index);
    return true
  });
  console.log('indexArr: ', indexArr); // [0, 2, 4, 6, 8, 10, 12] 
};

/**
 * 一旦为false，立即退出
 */
function test3 () {
  console.log('---test3-------------------------------------------------');

  const arr3_1 = new Array(10);
  const arr3_1Length = arr3_1.length;
  for (let i = 0; i < arr3_1Length; i++) {
    if (i % 2 === 0) {
      arr3_1[i] = i;
    };
  };
  const indexArr = [];
  arr3_1.every((ele, index) => {
    indexArr.push(index);
    return ele < 8;
  });
  console.log('indexArr: ', indexArr); // [0, 2, 4, 6, 8] 不会访问empty元素，而且一旦不满足return的条件，立即停止继续访问
};

function test4 () {
  console.log('---test3-------------------------------------------------');

};

export default test;