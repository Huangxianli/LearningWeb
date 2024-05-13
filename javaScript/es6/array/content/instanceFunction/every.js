function test () {
  console.log('---Array.prototype.every-------------------------------------------------');
  test1();
  test2();
  test3();
  test4();
  test5();
  test6();
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

/**
 * 对于空数组永远返回true
 */
function test4 () {
  console.log('---test4-------------------------------------------------');
  const arr4_1 = [];
  const isTrue1 = arr4_1.every(el => el > 10);
  console.log('isTrue1: ', isTrue1); // true

  const arr4_2 = new Array(12);
  const isTrue2 = arr4_2.every(el => el > 10);
  console.log('isTrue2: ', isTrue2); // true 由于every会跳过empty，所以这里和空数组的表现是一样的
};


/**
 * every不会修改调用它的数组的长度，但是指定的callback可以改变
 * 第一次调用callback的时候，数组的长度就保存了
 * 如果后续增加了数组项，不会访问超过长度的部分
 * 如果修改没有访问的数组项，会访问新的数组项的值
 */
function test5 () {
  console.log('---test5-------------------------------------------------');
  const arr5_1 = Array.from(new Array(2));
  const indexArr1 = []
  arr5_1.every((el, index) => {
    if (index == 0) {
      arr5_1.push('');
    };
    indexArr1.push(index);
    return true;
  });
  console.log('indexArr1: ', indexArr1); // [0, 1] 在callback中增加了数组的长度会不访问增加的部分

  const arr5_2 = Array.from(new Array(5), (ele, index) => index);
  const indexArr2 = [];
  const eleArr2 = [];
  arr5_2.every((ele, index) => {
    console.log(index);
    if (index === 0) {
      arr5_2.splice(2, 1);
    };
    eleArr2.push(ele);
    indexArr2.push(index);
    return true;
  });
  console.log('eleArr2: ', eleArr2); // [0, 1, 3, 4] 删除了2
  console.log('indexArr2: ', indexArr2); // [0, 1, 2, 3] every的index是实时的
};

/**
 * every方法是通用的，只期望this具有length属性和整数健属性
 */
function test6 () {
  console.log('---test6-------------------------------------------------');
  const notArray6_1 = {
    [-1]: -1,
    0: 0,
    1: 1,
    length: 5
  };
  const indexArr6_1 = [];
  const isTrue6_1 = Array.prototype.every.call(notArray6_1, (ele, index) => {
    indexArr6_1.push(index);
    return ele < 10;
  });
  console.log('indexArr6_1: ', indexArr6_1); // [0, 1]
  console.log('isTrue6_1: ', isTrue6_1); // true 
}

export default test;