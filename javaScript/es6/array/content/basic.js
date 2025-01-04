// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E4%B8%8B%E6%A0%87

/**
 * 对象的属性实际上是以字符串的形式存储的，symbol 除外（Symbol 类型的表现好像被排除在属性行列）
 * 
 * [] 这种访问方法会将里面的内容转化字符串
 * 表现的和 String() 是一样的
 * 非原始类型，调用 valueOf() 如果还是非原始类型，再调用 toString()
 * undefined 和 null 转化成 'undefined' 和 'null'
 * true 和 false 转化成 'true' 和 'false'
 * 除去 symbol 类型其他的调用 toString() ???
 */
function test1 () {
  console.log('---test1-------------------------------------------');

  const arr = [1, 2, 23, 23];
  let a = arr["1"];
  console.log(a);
  let b = arr[1]; // js引擎通过隐式的toString将 1 转化为 "1"
  console.log(b); // 2
  let c = arr["01"];
  console.log(c); // undefined
  arr['01'] = 'test';
  console.log(arr['01']); // 'test'
};

test1();

function test2 () {
  console.log('---test2-------------------------------------------');
  // 稀疏数组有些方法跳过空槽，有些方法会将他们视为undefined

  // 不处理为undefined
  // concat()
  // copyWithin()
  // every()
  // filter()
  // flat()
  // flatMap()
  // forEach()
  // indexOf()
  // lastIndexOf()
  // map()
  // reduce()
  // reduceRight()
  // reverse()
  // slice()
  // some()
  // sort()
  // splice()

  // 处理为undefined
  // entries()
  // fill()
  // find()
  // findIndex()
  // findLast()
  // findLastIndex()
  // includes()
  // join()
  // keys()
  // toLocaleString()
  // values()
};

// 构造函数
function test3 () {
  console.log('---test3-------------------------------------------');
  const arr1 = new Array(1, 2, 3, 4);
  const arr2 = Array(1, 2, 3, 4); // 使用不适用 new 操作符都可以创建
  console.log('arr1', arr1);
  console.log('arr2', arr2);

  const arr3 = new Array(1); // 创建一个长度为 1 的稀疏数组，插槽内容不是undefined而是empty
  console.log('arr3', arr3); // [empty]

  const arr4 = Array(3); // 效果和使用new是一样的
  console.log('arr4', arr4);

  const arr5 = new Array('1'); // 只有传入的参数为1个，且为数字的时候，才会将入参当为长度而不是数组项的值
  console.log('arr5', arr5);
};

test3();