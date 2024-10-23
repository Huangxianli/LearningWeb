/**
 * Array.prototype.concat(value0, value1, ..., valueN)
 * 合并两个或多个数组，不会改变现有的方法，返回一个新数组
 */
function test () {
  console.log('---Array.prototype.concat()-----------------------------------------');
  test1();
  test2();
  test3();
  test4();
};

/**
 * 连接多个数组，如果是稀疏数组，会保留 empty，不会转化成 undefined
 * 由于返回的是array，因此可以链式调用
 * 参数如果是数组（准确来说是看[Symbol.isConcatSpreadable]===true），会链接两个数组；参数如果不是数组，会将参数当成一项，加入到新的数组中
 */
function test1 () {
  console.log('---test1-----------------------------------------');

  const arr1_1 = new Array(12);
  const arr1_2 = Array(21, 12, 12);
  const arr1_3 = [12, 2, 3, 4];
  const arr1_4 = arr1_1.concat(arr1_2, arr1_3,);
  console.log('arr1_4: ', arr1_4); // [empty, ... , 21, 12, 12, 12, 2, 3, 4]

  const arr1_5 = arr1_1.concat(arr1_2).concat(arr1_3);
  console.log('arr1_5: ', arr1_5); // [empty, ... , 21, 12, 12, 12, 2, 3, 4]

  const arr1_6 = arr1_2.concat(1);
  console.log('arr1_6: ', arr1_6); // (4) [21, 12, 12, 1]

  const arr1_7 = arr1_2.concat({ length: 12 });
  console.log('arr1_7: ', arr1_7); //[21, 12, 12, { length: 12 }]
};

/**
 * concat是通用的
 * this的处理方式与其他的参数相同（除了会先将其转化为对象）
 */
function test2 () {
  console.log('---test2-----------------------------------------');

  const arr1_1 = [12, 231];
  // const arr1_2 = 12.concat(arr1_1); // 会报错

  const arr1_2 = arr1_1.concat(1, [12, 2, 232, 123]);
  console.log('arr1_2: ', arr1_2);
};


/**
 * Symbol.isConcatSpreadable 将类数组视作数组对象
 */
function test3 () {
  console.log('---test3-----------------------------------------');

  const notArray1 = { 0: 123, 4: 12, length: 12 };
  const arr1_1 = [1].concat(notArray1); // 会将notArray1当成[notArray1]
  console.log('arr1_1: ', arr1_1); // [1, { 0: 123, 4: 12, length: 12 }]

  const notArray2 = { 0: 0, 12: 12, length: 13, [Symbol.isConcatSpreadable]: true };
  const arr1_2 = [1].concat(notArray2);
  console.log('arr1_2: ', arr1_2); // [1, 0, empty, ... , 14]

  const notArray3 = { 1: 1, [Symbol.isConcatSpreadable]: true };
  const arr1_3 = [].concat(notArray3);
  console.log('arr1_3: ', arr1_3); // [], notArray3 设置了Symbol.isConcatSpreadable: true，但是没有length属性，导致转化为数组的时候，转化为[]
};


/**
 * 在非数组对象上调用concat()
 * 如果this不是数组，会将this转化成对象处理，然后以concat参数相同的方式处理
 * 返回的一定是数组
 */
function test4 () {
  console.log('---test4-----------------------------------------');

  const notArray1 = {};
  const arr1_1 = Array.prototype.concat.call(notArray1, 1, 2, 3);
  console.log('arr1_1: ', arr1_1); // [{}, 1, 2, 3]

  const notArray2 = { 0: 0, 1: 1, length: 12, [Symbol.isConcatSpreadable]: true };
  const arr1_2 = Array.prototype.concat.call(notArray2, 12, 13);
  console.log('arr1_2: ', arr1_2); // [0, 1, empty, ... , 12, 13]

  const notArray3 = 12;
  const arr1_3 = Array.prototype.concat.call(notArray3, 12, 21);
  console.log('arr1_3: ', arr1_3); // [Number(12), 12, 21] 将this转化为对象
  // const arr1_4 = notArray3.concat(1, 2, 3); // 这里的调用会报错，不会将notArray3转化为对象
};

export default test;