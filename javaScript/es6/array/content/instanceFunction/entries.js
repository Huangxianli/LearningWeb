function test () {
  console.log('---Array.prototype.entries()-------------------------------------------');
  test1();
  test2();
  test3();
  test4();
};

/**
 * 返回一个新的数组迭代器对象，该对象包含数组的每个索引的键值对
 */
function test1 () {
  console.log('---test1-------------------------------------------');

  const arr1_1 = [1, 2, 3, 4, 5];
  const iterator1 = arr1_1.entries();
  console.log('iterator1: ', iterator1); // Array Iterator {}
  const data1_1_1 = iterator1.next();
  console.log('data1_1_1: ', data1_1_1); // { done: false, value: [0, 1] }
  const data1_1_2 = iterator1.next();
  console.log('data1_1_2: ', data1_1_2); // { done: false, value: [1, 2] }

  console.log('arr1_1[Symbol.iterator]: ', arr1_1[Symbol.iterator]); // ƒ values() { [native code] }
  arr1_1[Symbol.iterator] = function () { };
  console.log('arr1_1[Symbol.iterator]', arr1_1[Symbol.iterator]); // ƒ () { }
  const iterator2 = arr1_1.entries();
  console.log('iterator2: ', iterator2); // Array Iterator {} 可以看出：Array.prototype.entries()取的不是当前对象的[Symbol.iterator]接口返回的遍历器对象
  const data1_1_3 = iterator2.next();
  console.log('data1_1_3: ', data1_1_3); // {value: Array(2), done: false}

  const data1_1_4 = [3, 2, 3];
  Array.prototype[Symbol.iterator] = function () {
    return {
      next () {
        return {
          value: '',
          done: true
        }
      }
    }
  };
  const iterator3 = data1_1_4.entries();
  console.log('iterator3: ', iterator3); // Array Iterator {}
  const data1_1_5 = iterator3.next();
  console.log('data1_1_5: ', data1_1_5); // {value: [0, 3], done: false} 由此可见，entries取的也不是Array.prototype[Symbol.iterator]() 返回的遍历器对象

  let data1_1_6 = [];
  for (let i of data1_1_4) {
    data1_1_6.push(i);
  };
  console.log('data1_1_6: ', data1_1_6); // []
};

/**
 * 稀疏数组迭代empty的时候，就像undefined一样
 */
function test2 () {
  console.log('---test2-------------------------------------------');
  const arr2_1 = (new Array(12)).concat([12, 13]);
  const iterator1 = arr2_1.entries();
  const data2_1_1 = iterator1.next();
  console.log('data2_1_1: ', data2_1_1); // { done: false, value: [0: undefined]} // 把empty处理成undefined
};

/**
 * for of
 */
function test3 () {
  console.log('---test2-------------------------------------------');

  const arr3_1 = [0, 1, 2, 3, 4, 5];
  const iterator1 = arr3_1.entries();
  const indexArr = [];
  const eleArr = [];
  for (let [index, ele] of iterator1) {
    indexArr.push(index);
    eleArr.push(ele);
  };
  console.log('indexArr: ', indexArr); // [0, 1, 2, 3, 4, 5]
  console.log('eleArr: ', eleArr); // [0, 1, 2, 3, 4, 5]
};

/**
 * 在非数组上调用entries()，读取this的length属性，从0开始访问每个整数索引
 */
function test4 () {
  const notArray1 = {
    [-2]: -2,
    '-1': '-1',
    1: 1,
    length: 3
  };
  const iterator1 = Array.prototype.entries.call(notArray1);
  const indexArr = [];
  const eleArr = [];
  for (let [index, ele] of iterator1) {
    indexArr.push(index);
    eleArr.push(ele);
  };
  console.log('indexArr: ', indexArr); // [0, 1, 2]
  console.log('eleArr: ', eleArr); // [undefined, 1, undefined]
};



export default test;