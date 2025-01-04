/** 
 * Array.prototype.at()
 * 返回数组中索引对应位置的数组，负数从数组中的最后一个元素开始倒数
 */
function test () {
  console.log('---Array.prototype.at()-----------------------------------------');
  test1();
  test2();
};

/**
 * at和下标访问类似
 * 下标访问会调用toString()，转化成字符；at会转化成数字
 * 下标访问负数不是从后面开始查找，也是转化成字符串，查找属性；at传入负数，会从最后开始查找
 * at 正负超过部分都会返回 undefined
 */
function test1 () {
  console.log('---test1-----------------------------------------');

  const arr1 = Array.from({ length: 12 }, (e, index) => index);
  const data1_1 = arr1.at(1);
  console.log('data1_1: ', data1_1); // 1

  const data1_2 = arr1.at(-1); // 相当于arr1[arr1.length - 1]
  console.log('data1_2: ', data1_2); // 11 最后一位

  const data1_3 = arr1.at(12);
  console.log('data1_3: ', data1_3); // undefined

  const arr2 = new Array(1);
  console.log('arr2: ', arr2); // [empty]
  const data1_4 = arr2.at(0);
  console.log('arr2[0]: ', arr2[0]); // undefined 注意获取到的数据是empty的时候，会转化成undefined
  console.log('date1_4: ', data1_4); // undefined 注意获取到的数据是empty的时候，会转化成undefined

  const data1_5 = arr2.at(12);
  console.log('data1_5: ', data1_5); // 超过数组长度也是返回undefined

  const data1_6 = arr1.at(false);
  console.log('data1_6: ', data1_6); // 0
  console.log(arr1[false]); // undefined

  const data1_7 = arr1.at(-15);
  console.log('data1_7: ', data1_7); // undefined
};

/**
 * 在非数组对象上调用at
 * at方法读取this的length属性，并计算需要访问的索引值
 * 超出 length 部分会返回 undefined ，即使是存在该属性
 */
function test2 () {
  console.log('---test2-----------------------------------------');

  const string1 = 'testwa';
  const data1 = Array.prototype.at.call(string1, 2);
  console.log('data1: ', data1); // 's'

  const unArray1 = {
    length: 12,
    0: 12,
    11: 12,
    13: 2
  };
  const data2 = Array.prototype.at.call(unArray1, 2);
  console.log('data2: ', data2); // undefined

  const data3 = Array.prototype.at.call(unArray1, 13);
  const data4 = unArray1[13];
  console.log('data3: ', data3); // undefined
  console.log('data4: ', data4); // 2
};

export default test;