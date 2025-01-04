/**
 * Map构造函数，接受的是实现了iterable接口，每一项是一个数组，数组含有俩项数据，前为key后为value
 * 任何一项不是数组会报错，任何一项都必须至少有两项，没有的话，会取undefined作为默认值
 * 重复的key会被后面加入的覆盖掉，key可以是任何类型，不会被转化成字符串
 */
function test1 () {
  console.log('---test1------------------------------------------------');
  const map1_1 = new Map([[], [, 1]]);
  console.log('map1_1: ', map1_1); // map1_1: Map(1) {undefined => 1}
  const map1_2 = new Map([[], [, 0, 1], [, 0], [, 1], [,]]);
  console.log('map1_2: ', map1_2); // map1_2: Map(1) {undefined => undefined}
  const map1_3 = new Map([[]]);
  console.log('map1_3: ', map1_3); // map1_3:  Map(1) {undefined => undefined}
};
test1();

/**
 * Map的增、删、改、查
 * size属性
 * set（增、改）（返回的是map本身，可以实现链式调用）
 * get（查）（使用get前最好用has判断一下，因为map中一项的value可以是undefined，get一个不存在的key对应的value也是返回undefined）
 * has（查）
 * delete（删）（删除成功会返回true，如果是删除一个不存在的值，会返回false）
 * clear（删）
 */
function test2 () {
  console.log('---test2------------------------------------------------');
  const map2_1 = new Map();
  map2_1.set(1, 1).set(2, 2);
  console.log('map2_1: ', map2_1); // map2_1: Map(2) {1 => 1, 2 => 2}
  map2_1.delete(1);
  console.log('map2_1: ', map2_1); // map2_1:  Map(1) {2 => 2}
  console.log(map2_1.delete(1)); // false 如果要删除一个不存在的key对应的项，会返回false
  console.log(map2_1.get(1)); // undefined
};
test2();

/**
 * Map的遍历方法
 * keys（返回遍历器对象）
 * values（返回遍历器对象）
 * entries（返回遍历器对象）（该方法是Map的iterable接口的实现）
 * forEach
 */
function test3 () {
  console.log('---test3------------------------------------------------');
  const map3_1 = new Map([[1, 11], [2, 22], [3, 33]]);
  const arr3_1 = []
  const iterator3_1 = map3_1.keys();
  for (let key of iterator3_1) {
    arr3_1.push(key);
  };
  console.log('arr3_1: ', arr3_1); // arr3_1:  (3) [1, 2, 3]
  const iterator3_2 = map3_1.values();
  const arr3_2 = [];
  for (let value of iterator3_2) {
    arr3_2.push(value);
  };
  console.log('arr3_2: ', arr3_2); // arr3_2: (3) [11, 22, 33]
  const iterator3_3 = map3_1.entries();
  const arr3_3 = [];
  for (let data of iterator3_3) {
    arr3_3.push(data);
  };
  console.log('arr3_3: ', arr3_3); // arr3_3:  (3) [[1, 11], [2, 22], [3, 33]]
  console.log(map3_1.entries === map3_1[Symbol.iterator]); // true
  const arr3_4 = [];
  map3_1.forEach((value, key) => { // 注意这里已经将key和value分开了
    arr3_4.push(value);
  });
  console.log('arr3_4: ', arr3_4); // arr3_4:  (3) [11, 22, 33]
};
test3();

/**
 * WeakMap和dMap的第一个区别：WeakMap的key只能是对象（非null）和Symbol
 * 第二个WeakMap中key引用对象，这里不会被记录到垃圾回收机制中；由于这个原因，WeakMap关于遍历的方法和属性都没有
 * 只有 set get has delete 
 */
function test4 () {
  console.log('---test4------------------------------------------------');
  const weakMap4_1 = new WeakMap();
  const symbol4_1 = Symbol();
  weakMap4_1.set(symbol4_1, 1);
  console.log('weakMap4_1: ', weakMap4_1); // weakMap4_1: WeakMap {Symbol() => 1}
  // weakMap4_1.set(1, 1); // 会报错

  // 这里的代码无法证明被回收了
  // let key4_1 = {};
  // const key4_2 = key4_1;
  // const weakMap4_2 = new WeakMap([[key4_1, 1]]);
  // console.log(weakMap4_2.has(key4_2)); // true
  // key4_1 = null;
  // setTimeout(() => {
  //   console.log(weakMap4_2.has(key4_2)); // 
  // }, 10000);
};
test4();