console.log('----base--------------------------------');
class A1 {
  console (data) {
    console.log(data);
  };
};

let a1_1 = new A1();
a1_1.console("执行了class A1 的 console 方法");


class A2 {
  constructor(x, y) { // 构造函数，其中的this就是当前new的实例
    this.x = x;
    this.y = y;
  };

  console () {
    console.log(`x是：${this.x}`);
    console.log(`y是：${this.y}`);
  };
};

const a2_1 = new A2(1, 2);
a2_1.console();

// 类的所有普通的方法都是绑定在类的prototype上的
class A3 {
  constructor() {
  };
  console () {
  }
};
const a3_1 = new A3();
console.log(a3_1.constructor === A3.prototype.constructor); // true
console.log(a3_1.console === A3.prototype.console); // true

// 类中的方法都是不可枚举的
class A4 {
  constructor() {
  };
  toString () {
  };
};

const A4ProtoKeys = Object.keys(A4.prototype);
console.log(A4ProtoKeys); // []

class B1 {
  constructor() {
    // constructor 默认会 return this，也就是当前的实例对象，可以手动的改变return
    return {};
  };
};
const b1_1 = new B1();
console.log(b1_1 instanceof B1); // false

/**
 * 类的constructor方式是绑定在哪里的？？？是在prototype上吗？如果是在prototype上，那么与其本身的constructor是不是有冲突呢？？？
 * 如果是直接在类上面，那么Object.getOwnPropertyNames为什么获取不到这个方法？？？
 */
function test1 () {
  console.log('----test1--------------------------------');
  class Test1_1 {
    constructor() { };
    protFun () { };
    static staticFun () { };
  };

  console.log(Object.getOwnPropertyNames(Test1_1)); // ['length', 'name', 'prototype', 'staticFun'] // 没有constructor
  console.log(Object.getOwnPropertyNames(Test1_1.prototype)); // ['constructor', 'protFun']
  console.log(Test1_1.prototype.constructor); // class Test1_1 { constructor() { }; protFun () { }; static staticFun () { }; };
  // 这里的constructor指向的是类


  let a = {};
  class Test1_2 {
    constructor() {
      return a;
    };
  };
  const test1_1_1 = new Test1_2;
  const test1_1_2 = new Test1_2.prototype.constructor;
  console.log(test1_1_1 === a); // true
  console.log(test1_1_1 === test1_1_2); // true

  const test1_1_3 = new Test1_2.constructor;
  console.log(a === test1_1_3); // false
  console.log(test1_1_3 === test1_1_1); // false 

  // 这样分析来，类中的 costructor 其实就是是定义在类的原型上的
};
test1();

/**
 * 类中的方法都是不可枚举的，包括原型方法和静态方法
 * 但是如果是在类外部手动添加的是可以枚举的
 */
function test2 () {
  console.log('----test2--------------------------------');
  class Test2_1 {
    fun () { };
    static staticFun () { };
  };
  console.log(Object.getOwnPropertyNames(Test2_1)); // ['length', 'name', 'prototype', 'staticFun']
  console.log(Object.keys(Test2_1)); // []
  console.log(Object.getOwnPropertyNames(Test2_1.prototype)); // ['constructor', 'fun']
  console.log(Object.keys(Test2_1.prototype)); // []

  Test2_1.prototype.fun1 = function () { };
  Test2_1.staticFun1 = function () { };

  console.log(Object.keys(Test2_1)); // ['staticFun1']
  console.log(Object.keys(Test2_1.prototype)); // ['fun1']
};
test2();

/**
 * es2022实例属性的新写法，是将属性直接放在实例上还是放在了类的prototype上？？？
 * --- 是直接绑定在实例上的
 */
function test3 () {
  console.log('----test3--------------------------------');
  class Test3_1 {
    property = 'test3_1';
  };
  const test3_1_1 = new Test3_1();
  console.log(Object.getOwnPropertyNames(test3_1_1)); // ['property']
  console.log(Object.getOwnPropertyNames(Test3_1.prototype)); // ['constructor']
  // 由此可以看出是绑定在实例上，不是绑定在类的prototype上
};
test3();

/**
 * getter 和 setter 函数设置的属性是直接在实例上还是在类的prototype上？？？
 * --- 是绑定在类的prototype属性上的
 */
function test4 () {
  console.log('----test4--------------------------------');
  class Test4_1 {
    get testName () {
      return 'testName';
    };
    set testName (name) {
    };
  };
  const test4_1_1 = new Test4_1();
  console.log(Object.getOwnPropertyNames(test4_1_1)); // []
  console.log(Object.getOwnPropertyNames(Test4_1.prototype)); // ['constructor', 'testName']
  // 由此可以看出，getter和setter函数设置的属性是绑定在类的prototype上的

  class Test4_2 {
    constructor() {
      this.test1_ = [];
    };
    get test1 () {
      return this.test1_;
    };
    set test1 (newValue) {
      this.test1_ = newValue;
    };
  };

  const test4_2_1 = new Test4_2;
  const test4_2_2 = new Test4_2;
  console.log(test4_2_1.test1); // []
  console.log(test4_2_2.test1); // []
  test4_2_1.test1.push(1);
  console.log(test4_2_1.test1); // [1]
  console.log(test4_2_2.test1); // []

  console.log(Object.keys(test4_2_1))
  test4_2_1.test1 = 1; // 由于 test1 其实是一个访问器属性，所以不会在 test4_2_1 上新建 test 属性，而是访问 test1 本来的 set
  console.log(test4_2_1.test1); // 1
  console.log(test4_2_2.test1); // []
  console.log(Object.keys(test4_2_1)); // ['test1_'] 

  // 从这个例子来看，虽然访问器属性是存在于类的原型上的，但是不是作为数据属性存储，而是作为访问器属性存储的，同时访问器属性中的 this 又是指向实例的，所以虽然读取的是原型上的属性，但是不会同步修改，因为实际上读的还是实例属性

  let a = { name: '' };
  let b = Object.setPrototypeOf({}, a);
  console.log(Object.keys(b)); // []
  b.name = 12;
  console.log(Object.keys(b)); // ['name']

  Object.defineProperty(a, '_name', {
    configurable: false,
    enumerable: false,
    writable: true,
    value: undefined,
  })
  Object.defineProperty(a, 'name', {
    configurable: true,
    enumerable: true,
    get () {
      return a._name;
    },
    set (newValue) {
      a._name = newValue;
    }
  });
  let c = Object.setPrototypeOf({}, a);
  console.log(Object.keys(c)); // [];
  c.name;
  c.name = 12;
  console.log(Object.keys(c)); // []
  // 在这里可以看出，对象中不存在的属性 x，如果对象的原型中存在，那么：如果 x 是数据属性的时候，如果使用 对象.x = 进行赋值的时候，会将该属性在该对象创建一次然后赋值；如果 x 是访问器属性，那么在重新赋值的时候，会调调用该属性的 set 函数，也就是说，不会额外的在该对象上增加 x 属性
};

test4()

/**
 * 类中的this的指向（取决于调用函数的方式），讨论普通的调用方式
 * constructor：指向实例对象
 * 静态方法：类本身
 * 实例方法：实例对象
 * 
 */
function test5 () {
  console.log('----test5--------------------------------');
  let test5_1_1 = {};
  class Test5_1 {
    constructor() {
      test5_1_1 = this;
    };
    testThis () {
      return this;
    };
    static testThis () {
      return this;
    };
  };
  const test5_1_2 = new Test5_1();
  console.log(test5_1_1 === test5_1_2); // true
  const test5_1_3 = test5_1_2.testThis();
  const test5_1_5 = Object.getPrototypeOf(test5_1_2).testThis();
  console.log(test5_1_3 === test5_1_2); // true
  console.log(test5_1_5);
  console.log(test5_1_5 === test5_1_2); // false
  const test5_1_4 = Test5_1.testThis();
  console.log(test5_1_4 === Test5_1); // true
};
test5();

// 静态属性也是绑定在类本身上的
function test6 () {
  console.log('----test6--------------------------------');
  class Test6_1 {
    static property1 = 1;
  };
  console.log(Object.getOwnPropertyNames(Test6_1)); // ['length', 'name', 'prototype', 'property1']
};
test6();

/**
 * 类的私有属性只能在类内部访问，在内的外部访问不到，遍历不到,即使是使用 Object.getOwnPropertyNames() 也获取不到
 * 如果在内部调用不存在的私有属性会报错
 * 私有属性是绑定在实例上的
 */
function test7 () {
  console.log('----test7--------------------------------');
  class Test7_1 {
    #private1 = 12;
    static #provide2 = 12;
  };
  const test7_1_1 = new Test7_1();
  console.log(Object.getOwnPropertyNames(test7_1_1)); // []
  console.log(Object.getOwnPropertyNames(Test7_1)); //  ['length', 'name', 'prototype']
  console.log(Object.getOwnPropertyNames(Test7_1.prototype)); // ['constructor']

  class Test7_2 {
    getName () {
      // return this.#name; // 会报错 //  Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class 
    };
  };
};
test7();

/**
 * （this的指向取决于调用函数的方式，讨论普通的调用方式）在constructor中，this是指向实例的；在类的prototype方法中，this指向实例；在静态方法中，this指向的类本身
 * 私有方法和属性只可以在类内部调用；注意，私有属性和私有方法都是绑定在实例本身上
 * 普通私有属性是绑定在实例本身上，静态私有属性是绑定在类本身上的，调用这些私有属性和方法要遵循这些this；
 * 注意，普通私有属性和方法，不能类.prototype调用，即使是在类的内部；在constructor函数中，可以直接this.普通私有属性和方法的调用
 */
function test8 () {
  console.log('----test8--------------------------------');
  class Test8_1 {
    #private1 = 'private1';
    #private2 () { };
    constructor() {
      console.log('constructor：', this.#private1);
    };
    prototypeFun1 () {
      console.log('prototypeFun1：', this.#private1);
    };
    prototypeFun2 (obj) {
      obj.#private2;
    };
    static staticFun () {
      console.log('StaticFun：', Test8_1.prototype.#private1);
      // console.log('StaticFun：', this.#private1); // 在静态方法中直接调用非静态私有属性会报错
    }
    static staticFun1 (obj) {
      console.log('staticFun1', obj.#private1);
      // console.log(Object.getPrototypeOf(obj).#private1); // 这种方法也不能访问，会报错
    }
  };
  const test8_1_1 = new Test8_1(); // constructor： private1
  test8_1_1.prototypeFun1(); // prototypeFun1： private1
  // Test8_1.staticFun(); // TypeError: Cannot read private member #private1 from an object whose class did not declare it 说明 私有属性不是绑定在类的 Prototype 上的
  Test8_1.staticFun1(test8_1_1); // staticFun1 private1 // 结合上一个输出报错可以看出，私有属性是绑定在 实例本身 上的
  // test8_1_1.prototypeFun2(Test8_1); // 报错 
  // test8_1_1.prototypeFun2(Test8_1.prototype); // 报错 
  test8_1_1.prototypeFun2(test8_1_1); // 结合前面两个的报错，可以看出，静态方法是也是绑定在实例上的，不是绑定在原型上

  class Test8_2 {
    static #staticProvide1 = 'staticProvide1';
    constructor(className) {
      // console.log('constructor：', this.#staticProvide1); // 这种写法会报错
      console.log('constructor：', Test8_2.#staticProvide1);
      console.log('constructor：', className.#staticProvide1);
    };
    fun1 () {
      console.log('fun1：', Test8_2.#staticProvide1);
    };
    static staticFun1 () {
      console.log('staticFun1：', this.#staticProvide1);
    };
  };
  const test8_2_1 = new Test8_2(Test8_2); // constructor： staticProvide1
  // constructor： staticProvide1
  test8_2_1.fun1(); // fun1： staticProvide1
  Test8_2.staticFun1(); // staticFun1： staticProvide1
};
test8();

/**
 * 改变this的指向
 */
function test9 () {
  console.log('----test9--------------------------------');
  class Test9_1 {
    a = this; // 类的顶层的this是否就是指向实例的？？？
    fun = () => { // 这里的fun被当成一个实例的属性，绑定在实例上
      return this;
    };
    constructor() {
      this.b = function fun1 () {
        return this;
      };
    };
  };
  const test9_1_1 = new Test9_1();
  console.log(Object.keys(test9_1_1)); // ['a', 'fun', 'b']
  console.log(test9_1_1.a); // Test9_1 {a: Test9_1, fun: ƒ, b: ƒ}
  console.log(test9_1_1.fun()); // Test9_1 {a: Test9_1, fun: ƒ, b: ƒ}
  console.log(test9_1_1.fun() === test9_1_1); // true 
  const { fun } = test9_1_1;
  console.log(fun()); // Test9_1 {a: Test9_1, fun: ƒ, b: ƒ} 这里应该可以确定，类的顶层的this绑定的应该是实例对象

  class Test9_2 {
    constructor() {
    };
    fun1 () {
      console.log(this);
    };
  };
  const test9_2_1 = new Test9_2();
  console.log(Object.getOwnPropertyNames(test9_2_1)); // []
  const { fun1 } = test9_2_1;
  fun1(); // undefined

  // 普通方法
  class Test9_3 {
    constructor() {
      this.fun1 = this.fun1; // 这里是将Test9_3上的fun1赋值给实例上的fun1
      this.fun2 = this.fun1.bind(this);
    };
    fun1 () {
      console.log(this);
    };
  };
  const test9_3_1 = new Test9_3();
  console.log(Object.getOwnPropertyNames(test9_3_1)); // ['fun1', 'fun2']
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(test9_3_1))); // ['constructor', 'fun1']

  const { fun2: fun9_3_2 } = test9_3_1;
  fun9_3_2(); // Test9_3 {fun1: ƒ, fun2: ƒ} 这里的this返回的是当前的实例，在内部就绑定了this，如果内部没有bind绑定this的话，返回的应该是undefined
  const { fun1: fun9_3_3 } = Object.getPrototypeOf(test9_3_1);
  fun9_3_3(); // undefined

  class Test9_4 {
    static staticFun1 = () => {
      console.log(this);
    }
  };
  const { staticFun1 } = Test9_4;
  staticFun1(); // class Test9_4 { } 这里可以看出使用箭头函数，this是已经绑定在类本身上的，不是undefined
};
test9();

/**
 * new.target 可以判定是不是new操作符调用的，如果是new操作的，则返回当前的函数或类
 * 创建只能被继承的类，不能创建实例的类
 * 创建不能被继承的类
 */
function test10 () {
  console.log('----test10--------------------------------');

  function test10_1 () {
    if (new.target !== test10_1) {
      console.log('not new operate');
      return;
    }
    console.log('new operate');
  };
  test10_1(); // not new operate
  new test10_1(); // new operate

  // 不能被继承的类
  class Test10_1 {
    constructor() {
      if (new.target !== Test10_1) {
        throw new Error('当前类不能被继承');
      };
      console.log('实例化类成功');
    };
  };
  class Test10_2 extends Test10_1 { };
  new Test10_1(); // 实例化类成功
  // new Test10_2(); // Error: 当前类不能被继承

  class Test10_3 {
    constructor() {
      if (new.target === Test10_3) {
        throw new Error('当前类不能实例化');
      };
      console.log('当前类继承成功');
    }
  };
  class Test10_4 extends Test10_3 { };
  new Test10_4(); // 当前类继承成功
  // new Test10_3(); // Error: 当前类不能实例化
};
test10();