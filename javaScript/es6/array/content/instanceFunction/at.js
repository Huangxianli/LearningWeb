/** 
 * Array.prototype.at()
 * 返回数组中索引对应位置的数组，负数从数组中的最后一个元素开始倒数
 */
function test () {
  console.log('---Array.prototype.at()-----------------------------------------');
  test1();
  test2();
};

function test1 () {
  console.log('---test1-----------------------------------------');

  const arr1 = Array.from({ length: 12 }, (e, index) => index);
  const data1_1 = arr1.at(1);
  console.log('data1_1: ', data1_1); // 1

  const data1_2 = arr1.at(-1); // 相当于arr1[arr1.length - 1]
  console.log('data1_2: ', data1_2); // 11 最后一位

  const data1_3 = arr1.at(12);
  console.log('data1_3: ', data1_3); // undefined
};

/**
 * 在非数组对象上调用at
 * at方法读取this的length属性，并计算需要访问的索引值
 */
function test2 () {
  console.log('---test2-----------------------------------------');

  const string1 = 'testwa';
  const data1 = Array.prototype.at.call(string1, 2);
  console.log('data1: ', data1); // 's'

  const unArray1 = {
    length: 12,
    0: 12,
    11: 12
  };
  const data2 = Array.prototype.at.call(unArray1, 2);
  console.log('data2: ', data2); // undefined
};

export default test;