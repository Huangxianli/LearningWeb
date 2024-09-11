/**
 * Symbol是原始类型，不是复杂类型
 * Symbol最大的特性是它的每一个实例都是唯一的
 * Symbol()不能和new操作符一起使用
 */
function test1 () {
  console.log('---test1----------------------------------------');
  // Symbol是原始类型
  const symbol1_1 = Symbol();
  console.log('typeof symbol1_1: ', typeof symbol1_1); // typeof symbol1_1: symbol
  console.log('symbol1_1 insatanceof Object: ', symbol1_1 instanceof Object); // symbol1_1 insatanceof Object: false
  // Symbol的每一个实例都是唯一的
  const symbol1_2 = Symbol();
  const symbol1_3 = Symbol();
  const isSameValue1_1 = symbol1_2 === symbol1_3;
  console.log('isSameValue1_1: ', isSameValue1_1); // isSameValue1_1: false
  // Symbol()不能和new操作符一起使用
  // new Symbol(); // 会报错 TypeError: Symbol is not a constructor
};
test1();

/**
 * Symbol类型的值，不能参与到计算中，但是可以显示的转化成Boolean和String类型
 */
function test2 () {
  console.log('---test1----------------------------------------');
  const symbol2_1 = Symbol();
  const symbol2_2 = Symbol();
  // symbol2_1 + symbol2_2; // 报错 TypeError: Cannot convert a Symbol value to a number
  // symbol2_2 * symbol2_1; // 报错 TypeError: Cannot convert a Symbol value to a number
  const string2_1 = symbol2_1.toString(); // 转化成字符串
  console.log('string2_1: ', string2_1); // string2_1: Symbol() 

  const boolean2_1 = Boolean(symbol2_1); // 转化成Boolean类型
  console.log('boolean2_1: ', boolean2_1); // boolean2_1: true

  // Number(symbol2_1); //报错 TypeError: Cannot convert a Symbol value to a number
};
test2();

/**
 * 普通的方法遍历不到对象中以Symbol类型作为键值的属性，可以通过Object.getOwnPropertyNames()来获取
 * 给对象添加的属性，属性名为Symbol类型的时候，默认是enumberable是为true的，即使这样还是不能被Object.getOwnPropertyNames()获取
 * 特别注意JSON.stringify()将对象转化为JSON字符串的时候，会丢失属性名为Symbol类型的属性
 */
function test3 () {
  console.log('---test3----------------------------------------');
  const symbol3_1 = Symbol()
  const obj3_1 = {
    property1: 1,
    [symbol3_1]: 2
  };
  const propertys3_1 = Object.getOwnPropertyNames(obj3_1);
  const propertys3_2 = Object.getOwnPropertySymbols(obj3_1);
  console.log('propertys3_1: ', propertys3_1); // propertys3_1:  ['property1']
  console.log('propertys3_2: ', propertys3_2); // propertys3_2:  [Symbol()]
  const propertyDescriptor3_1 = Object.getOwnPropertyDescriptor(obj3_1, symbol3_1); // 注意这里的symbol不要加[]
  console.log('propertyDescriptor3_1: ', propertyDescriptor3_1); // propertyDescriptor3_1:  {value: 2, writable: true, enumerable: true, configurable: true}
  // 从这几个打印可以看出，即使enumberable为true，当属性名是一个Symbol类型的时候，是不能使用Object.getOwnPropertyNames()方法获取到的

  const json3_1 = JSON.stringify(obj3_1);
  console.log('json3_1: ', json3_1); // json3_1:  {"property1":1} 注意，Symbol属性会丢失
};
test3();

/**
 * Symbol()和Symbol.for()
 * .description和Symbol.keyFor()
 */
function test4 () {
  console.log('---test4----------------------------------------');
  // Symbol()每调用一次就生成一个新的实例，Symbol.for()则是，会根据传入的description去全局注册表中查找，没有找到相同的符号描述对应的实例才会创建新的实例
  const symbol4_1 = Symbol('1');
  const symbol4_2 = Symbol('1');
  const symbol4_3 = Symbol.for('2');
  const symbol4_4 = Symbol.for('2');
  console.log('symbol4_1 === symbol4_2: ', symbol4_1 === symbol4_2); // symbol4_1 === symbol4_2:  false
  console.log('symbol4_3 === symbol4_4: ', symbol4_3 === symbol4_4); // symbol4_3 === symbol4_4:  true

  // Symbol(description)和Symbol.for(description)中的description都会转化成字符串
  // Symbol()如果没有传参数的话，就相当于没有传参（注意这个时候.description返回的就是undefined，而不是空字符串或者“undefined”）；Symbol.for()没有传参数的话，会将description转化成字符串的“undefined”；
  const symbol4_5 = Symbol({});
  const symbol4_6 = Symbol.for({});
  const description4_1 = symbol4_5.description;
  const description4_2 = symbol4_6.description;
  console.log('description4_1: ', description4_1); // description4_1: [object Object]
  console.log('description4_2: ', description4_2); // description4_2: [object Object]

  const symbol4_7 = Symbol();
  const symbol4_8 = Symbol.for();
  const description4_3 = symbol4_7.description;
  const description4_4 = symbol4_8.description;
  const type4_1 = typeof description4_3;
  console.log('description4_3: ', description4_3); // description4_3:  undefined (注意这里的undefined不是字符串)
  console.log('description4_4: ', description4_4); // description4_4:  undefined（注意这里的undefined是字符串）
  console.log('type4_1: ', type4_1); // type4_1:  undefined

  // Symbol.for()会将symbol注册到全局注册表中，但是不是变量提升
  let fun1 = () => {
    const symbol4_9 = Symbol('3');
    const symbol4_10 = Symbol.for('4');
  };
  // console.log('symbol4_10: ', symbol4_10); // 报错 ReferenceError: symbol4_10 is not defined
  fun1();
  // console.log('symbol4_9: ', symbol4_9); // 报错 ReferenceError: symbol4_9 is not defined
  // console.log('symbol4_10: ', symbol4_10); // 报错  ReferenceError: symbol4_10 is not defined

  // Symbol.keyFor(symbol1)是去全局注册表中查找和symbol1，而不是查找有相同的description的实例，.description则是直接查找前面实例的符号描述
  const symbol4_11 = Symbol('5');
  const symbol4_12 = Symbol.for('5')
  const description4_5 = symbol4_11.description;
  const description4_6 = symbol4_12.description;
  const keyFor4_1 = Symbol.keyFor(symbol4_11);
  const keyFor4_2 = Symbol.keyFor(symbol4_12);
  console.log('description4_5: ', description4_5); // description4_5:  5
  console.log('description4_6: ', description4_6); // description4_6:  5
  console.log('keyFor4_1: ', keyFor4_1); // keyFor4_1:  undefined 这里表明是去全局注册表中查找当前的实例，而不是在全局注册表中根据当前实例的description来查找
  console.log('keyFor4_2: ', keyFor4_2); // keyFor4_2:  5
};
test4();

/**
 * 内置的Symbol属性
 */
function test5 () {
  console.log('---test5----------------------------------------');
};
test5();
// 提供了一些内置的Symbol属性，原始类型如何获取到其原型对象呢？？？