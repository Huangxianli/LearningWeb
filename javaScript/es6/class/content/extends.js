console.log('----extends--------------------------------');

/**
 * class继承是通过原型链继承的
 * 子.[[Prototype]] === 父 （继承静态）
 * 子.prototype.[[Prototype]] === 父.prototype （继承原型方法）
 * 
 */
function test1 () {
  console.log('----test1--------------------------------');
  class Test1_1 { };
  class Test1_2 extends Test1_1 { };
  console.log(Object.getPrototypeOf(Test1_2) === Test1_1); // true
  console.log(Object.getPrototypeOf(Test1_2.prototype) === Test1_1.prototype); // true
};
test1();

/**
 * 子类自己的this，必须先通过父的构造函数塑造，得到父类同样的实例属性和方法，然后再对其加工，添加自己的实例属性和方法
 * 现将父类的属性和方法放在一个空对象上，再将该对象作为子的实例
 * 构造函数内，调用super()之前，不能使用this
 */
function test2 () {
  console.log('----test2--------------------------------');
  class Test2_1 {
    constructor() { };
  };
  class Test2_2 extends Test2_1 {
    constructor() {
      this.name = '';
      super(); // Array.prototype.constructor.call(this);
    };
  };
  // const test2_2_1 = new Test2_2(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
};
test2();

/**
 * 私有属性和方法不会被继承（私有属性只能在定义它的class中使用）
 */
function test3 () {
  console.log('----test3--------------------------------');
  class Test3_1 {
    #property1 = 12;
    #fun1 () { };
  };
  class Test3_2 extends Test3_1 {
    constructor() {
      super();
      // this.property1 = this.#property1; // SyntaxError: Private field '#property1' must be declared in an enclosing class
      // this.#fun1; // SyntaxError: Private field '#fun1' must be declared in an enclosing class
    };
  };
};
test3();

/**
 * 静态方法和属性（静态属性现在是不是还处于提案阶段？？？）是可以继承的，静态方法和属性直接绑定在类上面
 * 子[[Prototype]] === 父
 */
function test4 () {
  console.log('----test4--------------------------------');
  class Test4_1 {
    static staticProperty1 = 1;
    static staticFun1 () { };
  };
  class Test4_2 extends Test4_1 { };
  console.log(Object.getOwnPropertyNames(Test4_2)); // ['length', 'name', 'prototype']
  console.log(Object.getOwnPropertyNames(Test4_1)); // ['length', 'name', 'prototype', 'staticProperty1']
  // 从这里可以看出，静态属性和方法的继承，如果是在子上只读没有设置值的话，其实是沿着原型链去查找的
  Test4_2.staticProperty1 = 2;
  console.log(Test4_1.staticProperty1); // 1
  console.log(Test4_2.staticProperty1); // 2
  console.log(Object.keys(Test4_1)); // ['staticProperty1'] // 属性可枚举，方法不可枚举
  console.log(Object.keys(Test4_2)); // ['staticProperty1']
  // 从这里可以看出读值是原型链找，但是设置值的话，就是给点前面的对象添加属性
};
test4();

/**
 * super的指向以及super.方法，方法中的this的指向
 * 作为对象是用的时候：
 * constructor方法和其他普通方法中，super指向的是父的protorype；super.方法，方法中的this指向的是子的实例
 * 在静态方法中super指向的是父类；super.方法，方法中的this指向的是子类
 * 作为方法使用的时候：
 * 相当于调用super.constructor()，父的实例属性会绑定在子的实例上，如果父的constructor方法中调用this的话，this指向的是父而不是子（因为这个时候，子还没有生成this） 
 */
function test5 () {
  console.log('----test5--------------------------------');

  class Test5_1 {
    property1;
    static property2 = 'Test5_1';

    constructor() {
      this.fun1();
      this.property1 = 'Test5_1';
    };
    fun1 () {
      console.log('test5_1_fun1');
    };
    fun2 () {
      console.log('test5_1_fun2：', this.property1);
    };
    static fun3 () {
      console.log('test5_1_fun3：', this.property2);
    };
    static fun4 () {
      this.fun3();
    };
  };

  class Test5_2 extends Test5_1 {
    property1;
    static property2 = 'Test5_1';
    constructor() {
      super();
      this.property1 = 'Test5_2';
      super.fun2();
      console.log(super.property1);
    };
    fun1 () {
      console.log('test5_2_fun1');
    };
    fun2 () {
      console.log('test5_2_fun2：', this.property1);
    };
    static fun3 () {
      console.log('test5_2_fun3：', this.property2);
    };
    static fun4 () {
      // super(); // SyntaxError: 'super' keyword unexpected here super作为方法的时候，只能在constructor中使用
      super.fun3();
    };
  };
  const test5_2_1 = new Test5_2(); // test5_1_fun1 在constructor中，super()调用的时候，由于还没生成子的this，所以调用的调用父的constructor方法的时候，如果其中有调用this（而非赋值），那么this是指向父的实例
  // test5_1_fun2： Test5_2 当做属性调用的时候，在已经生成了this的情况下，super.方法，调用的是父的方法，方法中的this，指向的是子的实例
  // undefined 由于在constructor中super指向的父的prototype，父中的property1是绑定在实例上的，所以访问不到
  Test5_2.fun4(); // test5_1_fun3： Test5_1 super当成属性的时候，在静态方法中，指向的是父类，super.方法，方法中的this指向的子类
};
test5();

/**
 * new
 * 1、生成一个空对象
 * 2、对象的[[Prototype]]指向构造函数.prototype
 * 3、构造函数的this指向新创建的函数
 * 4、执行
 * 5、return 显示return的对象|| 新创建对象
 */
function test6 () {
  console.log('----test5--------------------------------');

};
test6();