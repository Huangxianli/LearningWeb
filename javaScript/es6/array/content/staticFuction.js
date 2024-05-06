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
 * Array.form() 不会创建稀疏数组，若arrayLike中的对象缺少一些索引，在新数组中是undefined
 */
function test1_1 () {
  console.log('---test1_1----------------------------------------');
  const arr1 = new Array(12);
  arr1[1] = 12;
  console.log('arr1: ', arr1); // [empty, 12. empty, ...];
  const arr2 = Array.from(arr1, element => element);
  console.log('arr2: ', arr2); // [undefined, 12 undefined, ...]

  const arr3 = new Array("12");
  console.log('arr3:', arr3); // ['12']
};

/**
 * 可迭代对象（set、map ...），类数组对象（带有length属性和索引元素的对象）
 */
function test1_2 () {
  console.log('---test1_2----------------------------------------');
  // 1、可迭代对象
  const map1 = new Map([[1, 1], [2, 2], [3, 3], [4, 4]]);
  const arr1 = Array.from(map1, element => ([element[0] * 2, element[1] * 3]));
  console.log('arr1', arr1); // [[2, 3], [4, 6], [6, 9], [8, 12]]
  // 类数组对象
  const arrLike1 = { length: 5, 1: 12 };
  const arr2 = Array.from(arrLike1);
  console.log('arr2', arr2); // [undefined, 12, undefined, ...]
};

/**
 * from 可以在任何构造函数上调用，只要构造函数接受一个表示新数组长度的单个参数
 * Array.form.call(thisObj(NotArray), arrayLike)
 */
function test1_3 () {
  console.log('---test1_3----------------------------------------');

  // this传入的是构造函数
  function NotArray1 () {
  };
  const arr1 = Array.from.call(NotArray1, new Array(12));
  console.log('arr1: ', arr1); // arr1: [undefined, undefined, ...]

  function NotArray2 (arg1, arg2) { // 第一个参数接收的是伪数组的length属性（明确声明了的）
    console.log('arg1: ', arg1);
    console.log('arg2: ', arg2);
  };
  const arr2 = Array.from.call(NotArray2, new Array(10));
  console.log('arr2: ', arr2); // arg1: undefined, arg2: undefined, arr2: [undefined, undefined, ...]

  const arr3 = Array.from.call(NotArray2, { length: 12 });
  console.log('arr3: ', arr3); // arg1: 12, arg2: undefined, arr3: [undefined, undefined, ...]


  // this传入的是非构造函数
  const arr4 = Array.from.call({}, new Array(12));
  console.log('arr4: ', arr4); // arr4: [undefined, undefined, ...]
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
 * 不检查原型链，也不依赖于它所附加的Array构造函数（instanceof Array）
 * 在ifram中们可以安全的使用
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
};


/**
 * Array.of()
 * 通过可变的参数创建一个新的Array实例
 */
function test4 () {
  console.log('---test4----------------------------------------');
  test4_1();
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