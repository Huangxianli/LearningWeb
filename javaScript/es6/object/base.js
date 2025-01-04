console.log('---object---------------------------------------------------');
function test () {
  test1();
  test2();
};
test();

/**
 * 创建对象的方式
 */
function test1 () {
  console.log('---test1---------------------------------------------------');

  const obj1_1 = {};
  const obj1_2 = new Object();
  console.log('obj1_2: ', obj1_2); // {}

  const obj1_3 = { 1: 1 };
  // 如果传入的是对象，原样返回
  const obj1_4 = Object(obj1_3);
  console.log('obj1_4: ', obj1_4); // {1: 1}
  console.log(obj1_3 === obj1_4); // true

  const string1_1 = '123';
  const obj1_5 = Object(string1_1); // 显示的转化成对象类型
  console.log('obj1_5: ', obj1_5); // String {'123'}
  console.log(typeof obj1_5); // object
};

/**
 * 删除对象的属性
 * 一个对象本身没有方法可以删除自己的属性
 * 必须使用 delete 运算符
 */
function test2 () {
  console.log('---test2---------------------------------------------------');

  const obj2_1 = {
    name: '123'
  };
  delete obj2_1.name;
  console.log('obj2_1: ', obj2_1); // {}
}