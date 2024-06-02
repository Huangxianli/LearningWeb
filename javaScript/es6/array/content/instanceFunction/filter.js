function test () {
  console.log('---Array.prototype.filter()---------------------------------------------');
  test1();
  test2();
  test3();
};

/**
 * 创建给定数组满足条件的一部分的浅拷贝，返回一个数组，不会对稀疏数组项进行访问
 * Array.prototype.filter(callback, thisObj)
 */
function test1 () {
  console.log('---test1---------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (ele, index) => index);
  const arr1_2 = arr1_1.filter(ele => ele >= 6);
  console.log('arr1_2: ', arr1_2); // [6, 7, 8, 9, 10, 11]

  const arr1_3 = new Array(12);
  arr1_3.fill(1, 4, 5);
  const arr1_4 = arr1_3.filter(ele => true);
  console.log('arr1_4: ', arr1_4); // [1] 不会访问empty

};

/**
 * filter是通用的，期望this有lengthd属性和证书属性
 */
function test2 () {
  console.log('---test2---------------------------------------------');

  const notArray2_1 = {
    0: 0,
    1: 1,
    [-1]: -1,
    length: 3
  };
  const arr2_1 = Array.prototype.filter.call(notArray2_1, () => true);
  console.log('arr2_1: ', arr2_1); // [0, 1s]
};

/**
 * 在第一次执行callback的时候，访问的长度就确定了
 * 在callback中删除就像是empty
 */
function test3 () {
  console.log('---test3---------------------------------------------');

  const arr3_1 = new Array(2).fill(12);
  const arr3_2 = arr3_1.filter((ele, index) => {
    if (index === 0) {
      arr3_1.push(12);
    };
    return true;
  });
  console.log('arr3_2: ', arr3_2); // [12, 12] 第一次执行callback的时候访问的长度就确定了

  const arr3_3 = Array.from({ length: 2 }, () => 2);
  const arr3_4 = arr3_3.filter((ele, index, arr) => {
    if (index === 0) {
      delete arr[arr.length - 1];
    };
    return true;
  });
  console.log('arr3_4: ', arr3_4); // [2]

  const arr3_5 = Array.prototype.fill.call({ length: 3 }, 3);
  const arr3_6 = Array.from(arr3_5).filter((ele, index, arr) => {
    if (index === 0) {
      delete arr[arr.length - 1];
    };
    if (index === 1) {
      arr.push(4);
    }
    return true;
  });
  console.log('arr3_6: ', arr3_6); // [3, 3] 开始就限定了访问数组的长度为3，删除了一个元素值，没有改变数组长度，后又添加了一个
};

export default test;