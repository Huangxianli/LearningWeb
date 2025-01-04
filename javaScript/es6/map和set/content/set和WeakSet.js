/**
 * 使用Set实现数组的去重
 * Set内部的相等比较，是same-value-zero equality NaN会等于NaN +0回等于-0；和Object.is()的区别就是Object.is()中，+0不等于-0
 */
function test1 () {
  console.log('---test1------------------------------------------------------');
  let arr1 = [1, 1, 2, 3, 3, NaN, NaN,];
  let arr2 = [...new Set(arr1)];
  console.log('arr2: ', arr2); //arr1: [1, 2, 3, NaN]，注意这里只有一个NaN
}
test1();


/**
 * Set可以添加任何数据类型作为其键值
 */
function test2 () {
  console.log('---test2------------------------------------------------------');
  const set2_1 = new Set([{}]);
  const obj2_1 = {};
  obj2_1[{}] = 12; // 注意这里的{}会被转化
  console.log('set2_1: ', set2_1); // set2_1: Set({})
  console.log('obj2_1: ', obj2_1); // obj2_1: {[object Object]: 12}
};
test2();
/**
 * Set的增、删、查（注意Set没有改）
 * size属性
 */
function test3 () {
  console.log('---test3------------------------------------------------------');
  const set3_1 = new Set([1, 2, 3]);
  set3_1.add(4).add(5); // add方法返回的是set对象本身，所以可以链式调用
  console.log('set3_1: ', set3_1); // set3_1: Set{1, 2, 3, 4, 5}
  set3_1.delete(1);
  console.log('set3_1: ', set3_1); // set3_1: Set{2, 3, 4, 5}
  set3_1.clear();
  console.log('set3_1: ', set3_1); // set3_1: Set{}
  const setHas3_1 = set3_1.has(1);
  console.log('setHas3_1:', setHas3_1); // false setHas3_1: false
  const setSize3_1 = set3_1.size;
  console.log('setSize3_1: ', setSize3_1); // setSize3_1:  0
};
test3();

/**
 * Set的遍历操作
 * keys、values、entries、forEach
 * keys、values、entries返回的是一个遍历器（iterator对象），不是一个数组
 * 注意读取的顺序就是插入的顺序
 */
function test4 () {
  console.log('---test4------------------------------------------------------');
  const set4_1 = new Set([1, 3, 3, 4, 5, 6]);
  const iterator4_1 = set4_1.keys();
  const iterator4_2 = set4_1.values();
  const iterator4_3 = set4_1.entries();
  const arr4_1 = [...iterator4_1];
  console.log('arr4_1: ', arr4_1); // arr4_1: [1, 3, 4, 5, 6]
  const arr4_2 = [...set4_1.values()];
  console.log('arr4_2: ', arr4_2); //arr4_2: [1, 3, 4, 5, 6]
  const arr4_3 = [...set4_1.entries()];
  console.log('arr4_3: ', arr4_3); // [[1, 1], [3, 3], [4, 4], [5, 5], [6, 6]]

  // Set.prototypt.keys 和 Set.prototype.values 和 Set.prototype[Symbol.iterator] 指向同一个方法
  console.log(set4_1.keys === set4_1.values); // true
  console.log(set4_1.keys === set4_1[Symbol.iterator]); // true
};
test4();

/**
 * Set本本身也实现了iterable接口，所以可以用for...of来遍历
 */
function test5 () {
  console.log('---test5------------------------------------------------------');
  const set5_1 = new Set([1, 3, 4, 56]);
  const arr5_1 = [];
  for (let value of set5_1) {
    arr5_1.push(value);
  };
  console.log('arr5_1: ', arr5_1); // arr5_1: (4) [1, 3, 4, 56]
};
test5();

/* 
for of 只遍历自己的可遍历的value值，不包括原型上的（其实要看Symbol.iterator是怎么实现的） 要实现了iterable接口才能使用for...of遍历
for in 遍历自己和原型上可以遍历的元素的key（一般是遍历对象）
 */
function test6 () {
  console.log('---test6------------------------------------------------------');
  let set1 = new Set([12, 2]);
  let set1Prop = Object.getPrototypeOf(set1);
  set1Prop.name = "test";
  for (let i of set1) {
    console.log('set1 for of', i);
  };
  for (let i in set1) {
    console.log('set1 for in', i); // 只有 name 属性，很奇怪
  };
  let obj1 = { 12: 12 };
  Object.getPrototypeOf(obj1).name = "test";
  // for (let i of obj1) { // 这里会报错，obj1不是一个itrable对象
  //   console.log('obj1 for of', i);
  // }
  let arr1 = [1, 2, 3, 3, 4,];
  Object.getPrototypeOf(arr1).name = "test";
  for (let i of arr1) {

  }
};
test6();

/**
 * WeakSet和Set的第一个不同，只能使用 非null对象 or Symbol 作为其项
 * 第二个不通过是WeakSet引用对象，这一步不会记录到垃圾回收机制中
 * 其他的特性和Set类似 不会存储相同的数据
 */
function test7 () {
  console.log('---test7------------------------------------------------------');
  const weakSet7_1 = new WeakSet([Symbol(), {}]);
  console.log('weakSet7_1: ', weakSet7_1); // weakSet7_1: WeakSet {Symbol(), {}}
  // const weakSet7_2 = new WeakSet([1]); // 会报错
};
test7();

/**
 * 由于WeakSet中对于对象的引用不会记录到垃圾回收中，导致可能垃圾回收之后，WeakSet中就不存在该项了，所以对于遍历的行为就没有提供
 * 有add、delete、has方法
 */
function test8 () {
  console.log('---test8------------------------------------------------------');
  const symbol8_1 = Symbol();
  const weakSet8_1 = new WeakSet([symbol8_1]);
  console.log(weakSet8_1.has(symbol8_1)); // true
  weakSet8_1.add(symbol8_1).add(symbol8_1);
  console.log('weakSet8_1: ', weakSet8_1); // weakSet8_1:  WeakSet {Symbol()}
};
test8();