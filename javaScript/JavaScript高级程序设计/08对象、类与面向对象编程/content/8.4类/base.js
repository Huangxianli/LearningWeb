/**
 * 类是没有变量提升的，类的作用域受限于块级作用域
 * 那是否受限于函数作用域呢？ 没有变量提升，在函数中定义的类在函数外应该是不能访问的
 */
function test1 () {
  {
    // console.log(['class Test1', Test1); // ReferenceError: Cannot access 'Test1' before initialization
    // Test1是类没有变量提升
    class Test1 {
    };
    console.log('calss Test1', Test1);
  }
  // console.log('class Test1', Test1); // ReferenceError: Test1 is not defined
  // 类受限于块级作用域，在定义其所在的块级作用域外访问不到
};

test1();

function test2 () {
  function test2_1 () {
    class Test2 { };
  };
  test2_1();
  // console.log('class Test2', Test2); // ReferenceError: Test2 is not defined
  // 没有变量提升，在函数外访问不到 Test2 
};

test2();

/**
 * 类声明法 class A {};
 * 类表达式法 const B = class C {};  
 * 类表达式的写法，在类中类外都可以通过 B.name 获取到'C'，那么可以在类中类外通过C.name获取到'C'吗？？？
 *  --- 类表达式的写法，C只能在类内访问
 * 那么类声明法，在类中类外可以通过 A.name 获取到'A'吗？？？
 *  --- 类声明式写法，在类内外都可以通过A.name 访问
 */

function test3 () {
  const Test3_1 = class Test3_2 {
    constructor() {
      console.log('Test3_1.name', Test3_1.name);
      console.log('Test3_2.name', Test3_2.name);
    };
  };
  const test3_1_1 = new Test3_1();
  console.log('Test3_1.name', Test3_1.name);
  // console.log('Test3_2.name', Test3_2.name); // ReferenceError: Test3_2 is not defined
  // 使用类表达式的方法，不能访问Test3_2，所以自然也不能访问Test3_2.name

  class Test3_3 {
    constructor() {
      console.log('Test3_3.name', Test3_3.name);
    };
  };
  const test3_3_1 = new Test3_3();

  console.log('Test3_3.name', Test3_3.name); // 可以正常的访问到
};
test3();


/**
 * new 操作符做了什么？？？
 * 1、内存中创建一个空对象
 * 2、空对象的[[Prototype]]属性指向构造函数的prototype属性 (Object.setPrototypeOf({}, Fun.prototype))
 * 3、构造函数内的this指向这个新对象
 * 4、执行构造函数
 * 5、构造函数中没有return，返回刚刚创建的新对象；有return，就返回return的对象
 */
function test4 () {
  function Test4_1 () {
    this.name = 'Test4_1';
  };
  Test4_1.prototype.name = 'Test4_1.prototype';
  const test4_1_1 = new Test4_1();
  console.log('test4_1_1', test4_1_1); // test4_1_1 {name: 'huang'}
  // 这里可以证明是构造函数内的this指向了新对象
  console.log(Object.getPrototypeOf(test4_1_1)); // {name: 'Test4_1.prototype'} 
  // 这里可以证明是将新对象的[[Prototype]]指向fun的prototype属性

  function Test4_2 () {
    this.name = 'Test4_2';
    return {};
  };
  Test4_2.prototype.name = 'Test4_2.prototype';
  const test4_2_1 = new Test4_2();
  console.log('test4_2_1', test4_2_1); // {}
  console.log(Object.getPrototypeOf(test4_2_1) === Test4_2.prototype); // false
  console.log(Object.getPrototypeOf(test4_2_1) === Object.prototype); // true
  // 这里的test4_2_1的[[Prototype]]指向的是Object.prototype 而不是Test4_2.prototype
};

test4();

/**
 * instanceof 操作符的原理
 * a instanceof A a沿着[[Prototype]]一直查找，如果找到 A.prototype 就返回true
 */
function test5 () {
  function test5_1 () { };
  const test5_1_1 = {};
  Object.setPrototypeOf(test5_1_1, test5_1.prototype);
  console.log(test5_1_1 instanceof test5_1); // true

  function test5_2 () { };
  Object.setPrototypeOf(test5_1.prototype, test5_2.prototype);
  console.log(test5_1_1 instanceof test5_2); // true
  // test5_1_1[[Proptotype]] -> test5_1.proptotype    test5_1.prototype[[Prototype]] -> test5_2.prototype
};
test5();

/**
 * class 是特殊的 function
 */

function test6 () {
  class Test6_1 { };
  console.log(typeof Test6_1); // 'function'
};
test6();

/**
 * 类可以看做特殊的函数，使用new的时候，类本身就会被当成构造函数，而不是类中的constructor方法
 * 如何获取到类中constructor方法？？？
 */
function test7 () {
  class Test7_1 {
    constructor() {
      console.log('constructor');
    };
  };
  const test7_1Propertys = Object.getOwnPropertyNames(Test7_1);
  console.log(test7_1Propertys); // ['length', 'name', 'prototype']
  console.log(Test7_1.prototype.constructor); // class Test7_1 {...}
  console.log(Test7_1.constructor === Function.prototype.constructor); // true
};
test7();

/**
 * 无法直接在类里面向类的prototype增加属性（除了方法），可以通过访问器属性添加
 */
function test8 () {
  class Test8_1 {
    name; // 这种写法是定义实例属性
  }
  class Test8_2 {
    name = 'a'; // 这种写法是实例添加属性
    // name1: () => {}; // 这个是相当于给类的protorype属性增加name1方法，但是这种写法是会报错的
  };
  const test8_1_1 = new Test8_1();
  const test8_2_1 = new Test8_2();
  console.log('test8_1_1', test8_1_1); // {name: undefined}
  console.log('test8_2_1', test8_2_1);
};
test8();

/**
 * 访问器属性，可以在类的prototype上添加属性
 */
function test9 () {
  class Test9_1 {
    constructor() {
      // 不能在构造函数中使访问器属性
    };
    get name2 () { // 这里是定义在原型上的
      return this.name1;
    };
    set name2 (name) {
      this.name1 = name;
    }
  };
  const test9_1_1 = new Test9_1();
  console.log(Object.getOwnPropertyNames(test9_1_1)); // [] 没有属性 name1 和 name2
  console.log(Object.getOwnPropertyNames(Test9_1)); // ['length', 'name', 'prototype']，没有属性 name1 和 name2
  console.log(Object.getOwnPropertyNames(Test9_1.prototype)); // ['constructor', 'name2']， name2 是绑定在类的prototype上的
  console.log(Object.getOwnPropertyDescriptor(Test9_1.prototype, 'name2')); // {enumerable: false, configurable: true, get: ƒ, set: ƒ}
};
test9();

/**
 * 静态成员只能有一个？？？
 *  ---可以有多个
 * 静态成员中的方法指向的是类本身
 */
function test10 () {
  class Test10_1 {
    static testFun () { };
    static testFun () { };
    static testFun1 () {
      return this === Test10_1;
    };
  };
  console.log(Test10_1.testFun1()); // true
};
test10();

/**
 * 使用extends可以继承含有[[construct]]且有prototype的对象，不单单是类
 * 那么 函数 extends 函数 是ok的吗？？？
 *   ---不行，extends前面只能是class
 * 可以先创建子类再继承吗？？？
 *  --- 不行
 */
function test11 () {
  function test11_1 () { };
  function test11_2 () { };
  // test11_2 extends test11_1 { }; // 这里会报错

  class Test11_3 { };
  // Test11_3 extends test11_1 { }; // 这里会报错

  class Test11_4 extends test11_1 { };
  console.log(Object.getPrototypeOf(Test11_4) === test11_1); // true
  console.log(Object.getPrototypeOf(Test11_4.prototype) === test11_1.prototype); // true
  const test11_4_1 = new Test11_4();
  console.log(test11_4_1 instanceof test11_1); // true
};
test11();