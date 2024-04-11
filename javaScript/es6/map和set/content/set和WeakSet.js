function test1 () {
  console.log('test1------------------------------------------------------');
  let set1 = new Set([1, 2, 2, 2, 2]);
  console.log(set1); // 可以达到去重的效果
  set1.forEach((value, key) => { // 可以使用forEach方法，用key更加合理，而不是index
    console.log('value-index', `${value}-${key}`);
  });
};
test1();

function test2 () {
  console.log('test2------------------------------------------------------');
  let obj1 = {};
  let obj2 = {};
  obj1[obj2] = 12;
  console.log('obj1', obj1); // {[object Object]: 12} 这里会调用toString() 方法，将{}转化成 '[object Object]'

  let set1 = new Set();
  set1.add({});
  console.log('set1.keys()', set1.keys()); // [{}] 不会将 key{} 转化成 [object Object]
  console.log('set1.entries()', set1.entries()); // [{},{}]
};
test2();

function test3 () {
  console.log('test3------------------------------------------------------');
  let obj1 = {
    12: 12,
    "12": 'tres',
  };
  console.log('obj1', obj1); // ‘12’ 对应的值会覆盖掉 12 对应的值
  let set1 = new Set([12, 12, 2, 2, 2, , 22,]); // 为空的话，会默认赋值undefined
  console.log('set1', set1);
  set1.add(12);
  set1.add("12");
  console.log('set1', set1); // ‘12’ 对应的值 不会覆盖 12 对应的值，这是两个不同的值
};
test3();

/* 
返回的是iterale对象，而且访问的顺序一定是加入的顺序
 */
function test4 () {
  console.log('test4------------------------------------------------------');
  let set1 = new Set([1, 2, 32, , 3, , 3]);
  let obj1 = {
    1: 1,
    2: 2,
    32: 32,
    undefined: undefined,
    3: 3
  };
  const setKeys = set1.keys();
  const objKeys = Object.keys(obj1);
  console.log('objKeys', objKeys); //  ['1', '2', '3', '32', 'undefined'] 返回的顺序不是加入的顺序
  console.log('Array.isArray(setKeys)', Array.isArray(setKeys)); // false
  console.log('setKeys', setKeys); // [1,2,32,undefined,3] 返回的顺序是加入的顺序
  const setEntries = set1.entries();
  console.log('Array.isArray(setEntries)', Array.isArray(setEntries)); // false
};
test4();

/* 
for of
 */
function test5 () {
  console.log('test5------------------------------------------------------');
  let set1 = new Set([1, 2, 333, 3, 3,]); // 最后一项如果没有显示的赋值，会省略
  console.log('set1', set1);
  for (let i of set1) {
    console.log('set1 for of', i); // 1 2 333 3 会按照顺序
  };
  let obj1 = {
    1: 1,
    2: 2,
    333: 333,
    3: 3
  };
  for (let i of Object.keys(obj1)) {
    console.log('obj1 for of', i); // 1 2 3 333 不一定按照顺序
  };
};
test5();


/* 
for of 只遍历自己的可遍历的value值，不包括原型上的 要是iterable对象才可以遍历（一般是遍历数组和类数组）
for in 遍历自己和原型上可以遍历的元素的key（一般是遍历对象）
 */
function test6 () {
  console.log('test6------------------------------------------------------');
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