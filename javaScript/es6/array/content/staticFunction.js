console.log('---static fucntion -----------------------------');

async function test () {
  test1();
  await test2();
  test3();
  test4();
};
test();

/* 
Array.from(arrayLike, mapFn, thisArg)
mapFn: (element, index) => {}
从 可迭代 或 类数组 对象创建一个新的浅拷贝的数组实例
 */
function test1 () {
  console.log('---test1----------------------------------------');
  test1_1();
  test1_2();
  test1_3();
};


/**
 * Array.form() 不会创建稀疏数组，若arrayLike中的对象缺少一些索引（值为empty），在新数组中是undefined
 * Array.form() 可以遍历数组的empty项
 */
function test1_1 () {
  console.log('---test1_1----------------------------------------');
  const arr1 = new Array(12); // 创建一个长度为12的稀疏数组（内容是empty）
  arr1[1] = 12;
  console.log('arr1: ', arr1); // [empty, 12. empty, ...];

  Array.from(arr1, (el, index) => { // 原始值为empty的时候，在回调函数中，读取的时候，是undefined
    console.log(`arr1[${index}]`, arr1[index]);
    return el;
  });

  const arr2 = Array.from(arr1, element => element);
  console.log('arr2: ', arr2); // [undefined, 12 undefined, ...]

  const arr3 = new Array("12");
  console.log('arr3: ', arr3); // ['12']

  const arr4 = new Array(12);
  const arr5 = Array.from(arr4);
  console.log('arr5: ', arr5); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
};

/**
 * 1、可迭代对象（set、map ...）（可迭代对象 即 实现了iterator接口的对象）
 * 2、类数组对象（带有length属性和索引元素的对象）
 */
function test1_2 () {
  console.log('---test1_2----------------------------------------');
  // 1、可迭代对象
  const map1 = new Map([[1, 1], [2, 2], [3, 3], [4, 4]]);
  console.log('map1[Symbol.iterator]', map1[Symbol.iterator]) // function ...
  const arr1 = Array.from(map1, element => ([element[0] * 2, element[1] * 3]));
  console.log('arr1', arr1); // [[2, 3], [4, 6], [6, 9], [8, 12]]

  // 2、类数组对象，没有实现iterator接口，但是也可以使用Array.form()来创建新数组
  const arrLike1 = { length: 5, 1: 12 };
  console.log('arrLike1[Symbol.iterator]', arrLike1[Symbol.iterator]); // undefined
  const arr2 = Array.from(arrLike1);
  console.log('arr2', arr2); // [undefined, 12, undefined, ...]
};

/**
 * Array.from 可以在任何构造函数上调用，只要构造函数接受一个表示新数组长度的单个参数，返回的是新构造函数的实例，而不是Array的实例
 * Array.from 如果不是在构造函数上调用，返回的就是Array的实例
 * 非函数调用from的时候，返回的是数组
 * Array.from.call(thisObj(NotArray), arrayLike)
 */
function test1_3 () {
  console.log('---test1_3----------------------------------------');

  // this传入的是构造函数
  function NotArray1 () {
  };
  const arr1 = Array.from.call(NotArray1, new Array(12));
  console.log('arr1: ', arr1); // arr1: [undefined, undefined, ...]
  console.log(arr1 instanceof NotArray1); // true
  console.log(arr1 instanceof Array); // false

  function NotArray2 (arg1, arg2) { // 第一个参数接收的是伪数组的length属性（明确声明了的）
    console.log('arg1: ', arg1);
    console.log('arg2: ', arg2);
  };
  const arr2 = Array.from.call(NotArray2, new Array(10));
  console.log('arr2: ', arr2); // arg1: undefined, arg2: undefined, arr2: [undefined, undefined, ...]

  const arr3 = Array.from.call(NotArray2, { length: 12 });
  console.log('arr3: ', arr3); // arg1: 12, arg2: undefined, arr3: [undefined, undefined, ...]


  // this传入的是非构造函数
  const obj1 = {};
  const arr4 = Array.from.call(obj1, new Array(12));
  console.log('arr4: ', arr4); // arr4: [undefined, undefined, ...]
  console.log(arr4 instanceof Array); // true
};


/**
 * Array.fromAsync(arrayLike, mapFn, thisArg) => Promise
 * 由一个 异步可迭代对象、可迭代对象、类数组对象 创建一个新的、浅拷贝的Array实例
 */
async function test2 () {
  console.log('---test2----------------------------------------');
  await test2_1();
};

/**
 * Array.fromAsync() 的返回值是一个Promise，.then里面的结果是新生成的数组
 */
async function test2_1 () {
  console.log('---test2_1----------------------------------------');
  const arr1 = Array.fromAsync([1, 2], e => e);
  console.log('arr1: ', arr1); // Promise{<pending>}
  await arr1.then(res => {
    console.log('arr1.then: ', res); // [1, 2]
  });
};


/**
 * Array.isArray()
 * 确定传递的值是不是一个数组
 */
function test3 () {
  console.log('---test3----------------------------------------');
  test3_1();
};

/** 
 * 不检查原型链，也不依赖于它所附加的Array构造函数（instanceof Array），即使手动修改其原型为或者不为Array.property，都不会该变 Array.isArray() 的结果
 * 在ifram中们可以安全的使用
 * 如果实际上不是数组，但是原型上有Array.prototype也会返回false
 * */
function test3_1 () {
  console.log('---test3_1----------------------------------------');
  const data1 = { length: 12 };
  Object.setPrototypeOf(data1, Array.prototype);
  const isArray1 = Array.isArray(data1);
  console.log('isArray1: ', isArray1); // false
  console.log('instanceof Array: ', data1 instanceof Array); // true

  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  const xArray = window.frames[window.frames.length - 1].Array;
  const arr2 = new xArray(1, 2, 3);
  const isArray2 = Array.isArray(arr2);
  console.log('isArray2: ', isArray2); // true
  const instanceofArray2 = arr2 instanceof Array;
  console.log('instanceofArray2: ', instanceofArray2); // false

  const arr3 = Array.from.call(function () { }, [123]);
  console.log('arr3', arr3); //  {0: 123, length: 1}
  console.log('Object.getPrototypeOf(arr3)', Object.getPrototypeOf(arr3)); // {}
  console.log('arr3 instanceof Array', arr3 instanceof Array); // false
  console.log('Array.isArray(arr3)', Array.isArray(arr3)); // false
  Object.setPrototypeOf(arr3, Array.prototype);
  console.log('Array.isArray(arr3)', Array.isArray(arr3)); // false
  console.log('arr3 instanceof Array', arr3 instanceof Array); // true

  const arr4 = [1, 2, 3];
  console.log('Array.isArray(arr4)', Array.isArray(arr4)); // true
  Object.setPrototypeOf(arr4, {});
  console.log('arr4 instanceof Array', arr4 instanceof Array); // false
  console.log('Array.isArray(arr4)', Array.isArray(arr4)); // true
  // 这里就要注意，即使是Array.isArray()为true，也不能保证可以使用Array原型上的方法
};


/**
 * Array.of()
 * 通过可变的参数创建一个新的Array实例
 */
function test4 () {
  console.log('---test4----------------------------------------');
  test4_1();
  test4_2();
};

/**
 * 无论参数的个数都是返回一个数组
 */
function test4_1 () {
  console.log('---test4_1----------------------------------------');
  const arr1 = Array.of();
  console.log('arr1: ', arr1); // []

  const arr2 = Array.of(12, 23, 34, {});
  console.log('arr2: ', arr2); // [12, 23, 34, {}]
};

/**
 * 非数组构造函数调用of()，返回的是新构造函数的实例，而不Array实例
 * 不是构造函数调用of()的时候，返回的是数组实例
 */
function test4_2 () {
  console.log('---test4_2----------------------------------------');

  function NotArray1 (arg1, arg2) {
    console.log('arg1: ', arg1);
    console.log('arg2: ', arg2);
  };
  const arr1 = Array.of.call(NotArray1, 1, 23, 233);
  console.log('arr1: ', arr1);
  const isArray1 = Array.isArray(arr1);
  console.log('isArray1: ', isArray1); // false

  const arr2 = Array.of.call(Object, 1, 23, 3);
  console.log('arr2: ', arr2); // Number {0: 1, 1: 23, 2: 3, length: 3}

  const arr3 = Array.of.call({}, 1, 2, 3);
  console.log('arr3: ', arr3); // [1, 2, 3]
  const isArray3 = Array.isArray(arr3);
  console.log('isArray3: ', isArray3); // true
};