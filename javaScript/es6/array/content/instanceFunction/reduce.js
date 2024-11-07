function test () {
  console.log('---Array.prototype.reduce()-----------------------------------------------');

  test1();
  test2();
  test3();
  test4();
};

/**
 * Array.prototype.reduce(callback, ?initValue) 对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值
 * 第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始
 * 如果数组为空，而且没有提供 initValue 会抛出 TypeError
 * 注意边界情况：如果数组只有一个元素（无论位置如何）且未提供 initialValue，或者提供了 initialValue 但数组为空，则将返回该单个值，而不调用 callbackFn。
 * 不接受指定 thisObj
 */
function test1 () {
  console.log('---test1-----------------------------------------------');

  const arr1_1 = Array.from({ length: 12 }, (el, index) => index);
  const indexArr1_1 = [];
  const reduce1_1 = arr1_1.reduce((accumulator, current, index, arr) => {
    indexArr1_1.push(index);
    return accumulator + current;
  }, 0);
  console.log('indexArr1_1: ', indexArr1_1); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('reduce1_1: ', reduce1_1); // 66

  const indexArr1_2 = [];
  const reduce1_2 = arr1_1.reduce((accumulator, current, index) => {
    indexArr1_2.push(index);
    return accumulator + current;
  });
  console.log('indexArr1_2: ', indexArr1_2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  console.log('reduce1_2: ', reduce1_2); //  66

  const arr1_2 = [1];
  const reduce1_3 = arr1_2.reduce((accumulator, current) => {
    debugger // 根本就不会进入这个回调里面
    // return accumulator + current;
  });
  console.log('reduce1_3: ', reduce1_3); // 1

  const reduce1_4 = arr1_2.reduce((accumulator, current) => {
    // debugger // 会进入这个回调
    return accumulator + current;
  }, 0);
  console.log('reduce1_4: ', reduce1_4); //  1
};


/**
 * 访问稀疏数组，会跳过 empty值的项
 */
function test2 () {
  console.log('---test2-----------------------------------------------');

  const arr2_1 = new Array(10);
  // arr2_1.reduce((accumulator, current) => accumulator + current); // reduce.js:57 Uncaught TypeError: Reduce of empty array with no initial value

  arr2_1[0] = 0;
  const indexArr2_1 = [];
  const ruduce2_1 = arr2_1.reduce((accumulator, current, index) => {
    indexArr2_1.push(index)
    return accumulator + current;
  }, 0);
  console.log('indexArr2_1: ', indexArr2_1); // [0]
  console.log('ruduce2_1: ', ruduce2_1); // 0
};

/**
 * reduce() 是通用的，期望 this 上有 length，和非负整数项
 */
function test3 () {
  console.log('---test3-----------------------------------------------');

  const notArray3_1 = {
    length: 12,
    2: 2,
    3: 3
  };
  const reduce3_1 = Array.prototype.reduce.call(notArray3_1, (accumulator, currret) => accumulator + currret);
  console.log('reduce3_1: ', reduce3_1); // 5
};

/**
 * reduce() 的简单应用
 */
function test4 () {
  console.log('---test4-----------------------------------------------');

  const doblue = x => x * 2;
  const pow = x => Math.pow(x, 2);

  const data = [doblue, pow].reduce((accumulator, current) => {
    return current(accumulator)
  }, 2);
  console.log('data: ', data); //  16

  const promise1 = new Promise(resolve => {
    resolve('promise1');
  });
  const promise2 = new Promise(resolve => {
    setTimeout(() => {
      resolve('promise2')
    }, 2000);
  });
  const promise3 = new Promise(resolve => {
    resolve('promise3');
  });

  [promise1, promise2, promise3].reduce((accumulator, current) => {
    return current.then(accumulator).then(res => {
      console.log(res);
    });
  }, Promise.resolve())
  // promise1 promise3 promise2
};

export default test;