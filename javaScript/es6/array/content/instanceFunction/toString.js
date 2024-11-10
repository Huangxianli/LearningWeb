function test () {
  console.log('---Array.prototype.toString()-----------------------------------------------');

  test1();
  test2();
  test3();
};

/**
 * Array.prototype.toString() 一个表示数组元素的字符串
 * Array 的 toString 方法实际在内部调用了其本身（不包括原型链???）的 join()，如果 join 不是函数，则会调用 Object.prototype.toString()
 * 
 * 如果某一项的值是数组，会递归调用
 * 
 * undefined 和 null 会被转化成 ''
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const toString1_1 = arr1_1.toString();
  console.log('toString1_1: ', toString1_1); // 0,1,2,3,4,5,6,7,8,9,10,11

  Object.setPrototypeOf(arr1_1, { join () { return '123445' } });
  const toString1_3 = arr1_1.toString();
  console.log('toString1_3: ', toString1_3); // [object Array]

  arr1_1.join = function () {
    return '123';
  };
  const toString1_2 = arr1_1.join();
  console.log('toString1_2: ', toString1_2); // 123

  const arr1_2 = Array.of(0, [11, [111]], 'test');
  arr1_2[1].toString = function () { return '1' };
  arr1_2[1].join = function () { return 'join' };
  const toString1_4 = arr1_2.toString();
  console.log('toString1_4: ', toString1_4); // 0,1,test

  const arr1_3 = [undefined, null];
  const toString1_5 = arr1_3.toString();
  console.log('toString1_5: ', toString1_5); //  ,
};


/**
 * 访问稀疏数组，会访问 empty，当成 undefined 处理
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = Array.from(new Array(10), (item, index) => index);
  arr2_1.length = 20;
  const toString2_1 = arr2_1.toString();
  console.log('toString2_1', toString2_1); // toString2_1 0,1,2,3,4,5,6,7,8,9,,,,,,,,,,
};

/**
 * toString() 是通用的，期望 this 上有 length，和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    0: 0,
    2: 2,
    3: 3,
    4: undefined,
    16: 16,
    a: 'a',
  };
  const toString3_1 = Array.prototype.toString.call(notArray3_1);
  console.log('toString3_1: ', toString3_1); // [object Object] 因为 notArray3_1 上没有 join 方法，所以会调用 Object.prototype.join() 返回 [object Object]

  Object.setPrototypeOf(notArray3_1, { join () { return '123' } });
  const toString3_2 = Array.prototype.toString.call(notArray3_1);
  console.log('toString3_2: ', toString3_2); // 123 这里不太明白为什么会返回 123 数组上调用toString 只调用自己的 join，不调用原型上的 join

  notArray3_1.join = function () {
    return 'join';
  };
  const toString3_3 = Array.prototype.toString.call(notArray3_1);
  console.log('toString3_3: ', toString3_3); // join
};

export default test;