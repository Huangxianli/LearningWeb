function test(): void {
  console.log(
    '---05函数与 Class 中的类型---------------------------------------------'
  );

  test1();
  test2();
}

/**
 * 函数
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
  test1_2();
  test1_3();
  test1_4();
}

/**
 * 函数的类型签名
 * 函数的类型描述的是函数的入参类型和函数返回值类型
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  const fun1 = function (a: number): void {};
  const fun2: () => number = () => {
    return 1;
  }; // 实际上这种写法，可读性不好，一般会抽出来
  const fun3 = (a: number): number => {
    return 1;
  };

  interface Fun4 {
    (a: number): void;
  }
  const fun4: Fun4 = (a) => {};

  type Fun5 = (a: number) => number;
  const fun5: Fun5 = (a) => 1;
}

/**
 * void 类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  function test1_2_1(): void {
    // 没有return
  }
  function test1_2_2(): void {
    return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好
  }
  function test1_2_3(): undefined {
    return;
  }
}

/**
 * 可选参数与 rest 参数
 */
function test1_3() {
  console.log('---test1_3---------------------------------------------');

  function test1_3_1(a: number, b?: number): void {}
  test1_3_1(1);
  test1_3_1(1, 1);

  function test1_3_2(a: number, b: number | string = 12): void {}
  test1_3_2(1);
  test1_3_2(1, 2);

  function test1_3_3(a: number, ...b: (string | number)[]) {}
  function test1_3_4(a: number, ...b: [number, string]) {}
}

/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型（将入参和返回进行关联）
 */
function test1_4(): void {
  function test1_4_1(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  }

  const a = test1_4_1(1); // a 的类型被推导成 string | number

  // 前面叫重载签名，最后一个叫实现签名，要包含重载签名的所有可能
  function test1_4_2(foo: number, bar: true): number;
  function test1_4_2(foo: number, bar?: false): string;
  function test1_4_2(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  }
  const b = test1_4_2(1); // b 的类型准确的推导成了 string
}

/**
 * Class
 */
function test2(): void {
  console.log('---test2---------------------------------------------');

  test2_1();
  test2_2();
  test2_3();
  test2_4();
  test2_5();
  test2_6();
  test2_7();
  test2_8();
  test2_9();
  test2_10();
}

/**
 * 声明
 */
function test2_1(): void {
  console.log('---test2_1---------------------------------------------');

  class A {
    name1: string = '';
    constructor(name: string) {}

    get name2(): string {
      return this.name1;
    }

    // set name2(name: string): void { // set 不允许设置返回类型即使是 void 也不行
    set name2(name: string) {
      this.name1 = name;
    }
  }
  const a1: A = new A('');
  a1.name2;

  const B = class {
    constructor() {}
  };
}

/**
 * 修饰符
 * public、private、protected
 * readonly
 */
function test2_2(): void {
  console.log('---test2_2---------------------------------------------');

  test2_2_1();
  test2_2_2();
  test2_2_3();
  test2_2_4();
}

/**
 * public 代表着在 类 类的实例（如果是静态，换成 类. ） 子类中都能访问
 */
function test2_2_1(): void {
  console.log('---test2_2——1---------------------------------------------');

  class A {
    public name1: string = '';
    constructor(name: string) {
      // 通常不会为构造方法添加修饰符，默认的是 public
      this.name1 = '';
    }
    setName1(name: string): void {
      this.name1 = name;
    }
  }
  class B extends A {
    constructor(name: string) {
      super(name);
      this.name1;
    }
  }
  let a = new A('');
  a.name1;
}

/**
 * private 表示只能在当前类的内部访问
 */
function test2_2_2(): void {
  console.log('---test2_2_2---------------------------------------------');

  class A {
    private name1: string;
    private name2: number;
    constructor() {
      this.name1 = '';
      this.name2 = 0;
    }
    getName1() {
      return this.name1;
    }
    getName2() {
      return this.name2;
    }
    setName1(name: string): void {
      this.name1 = name;
    }
  }

  class B extends A {
    constructor() {
      super();
      // this.name1; // 父的私有属性不允许在子类中访问，ts会报错
    }
  }

  const a = new A();
  // a.name1; // name1 是 A 的私有属性，不允许在实例上访问
}

/**
 * protected 只允许在类和子类中访问
 */
function test2_2_3(): void {
  console.log('---test2_2_3---------------------------------------------');

  class A {
    protected name1: string = '';
    constructor() {}
  }
  class B extends A {
    constructor() {
      super();
      this.name1;
    }
  }
  const a1 = new A();
  // a1.name1; // protected 只允许在类和子类上访问
  const b1 = new B();
  // b1.name1; // 继承了 protected
}

/**
 * 实例属性的简略写法
 */
function test2_2_4(): void {
  console.log('---test2_2_4---------------------------------------------');

  class A {
    constructor(public name1: string) {
      // 注意这里加了 修饰符之后会自动的 this.name1 = name1;
      let b = 1 + 1;
    }
  }

  const a1 = new A('a1');
  a1.name1; // a1

  enum Sex {
    Male = 0,
    Femal = 1,
  }
  class B {
    constructor(
      public name1: string,
      protected age: number,
      private sex: Sex
    ) {}

    getAge(): number {
      return this.age;
    }
    getSex(): Sex {
      return this.sex;
    }
  }
  const b_1 = new B('huang', 18, Sex.Male);
  b_1.getSex();

  class B1 extends B {
    constructor() {
      super('', 0, 0);
    }
    getAge(): number {
      return this.age;
    }
  }
  const b_1_1 = new B1();
  b_1_1.getSex();
  b_1_1.getAge();
}

/**
 * static
 */
function test2_3(): void {
  console.log('---test2_3---------------------------------------------');

  // static name1: string = '';
  class A {
    public static name1: string = '';
    static getClassName(): string {
      return 'A';
    }
  }
  A.getClassName();

  class B {
    // public static name: string;  // 和 constructor 的参数会有冲突，而且参数也不能使用 static 修饰符
    constructor(public name: string = '', private age: number = 0) {}
  }

  class C {
    public static a: string = '';
    protected static b: string = '';
    private static c: string = '';
    // public static getA(this: typeof C): string {
    //   return this.a;
    // }
    // protected static getB(this: typeof C): string {
    //   return this.b;
    // }
    // private static getC(this: typeof C): string {
    //   return this.c;
    // }
  }
  C.a;
  // C.b; // 只能在基类和衍生类中访问
  // C.c; // 只能在基类中访问

  class D extends C {
    public static getA(this: typeof D) {
      return this.a || super.a;
    }
    protected static getB(this: typeof D): string {
      return this.b || super.b;
    }
    private static getC(this: typeof D): string {
      // return this.c || super.c; // 这两种访问都会报错，c 只能在当前类里面访问
      return '';
    }
  }
  D.a;
  D.getA();
  // D.getB();
  // D.getC();
}

/**
 * 抽象类 一个抽象方法描述了这一方法在实际实现中的结构
 * ts 中无法声明静态的抽象成员
 */
function test2_4(): void {
  console.log('---test2_4---------------------------------------------');

  abstract class A {
    // 还可以 interface A {
    abstract name1: string;
    constructor() {}
    abstract getName1(): string;
  }

  class A1 implements A {
    name1 = '';
    getName1(): string {
      return this.name1;
    }
  }
}

/**
 * override
 * 该关键字表明是覆盖基类的方法或属性，如果基类上没有的话，会报错
 */
function test2_5() {
  console.log('---test2_5---------------------------------------------');

  class A {
    constructor(public name1: string, protected name2: string) {}
    public getName1(): string {
      return this.name1;
    }
    protected getName2(): string {
      return this.name2;
    }
  }

  class B extends A {
    // protected override name: string = ''; // 会报错，基类中没有改属性
    constructor(public override name1: string) {
      super('', '');
    }
    // override getName(): void {} // 会报错，因为基类中没有该方法
    public override getName1(): string {
      return this.name1;
    }
  }
}

/**
 * extends 用于继承
 * 覆盖属性或者方法，访问访问应该一样
 */
function test2_6(): void {
  console.log('---test2_6---------------------------------------------');

  class A {
    public name1: string = '';
    protected name2: string = '';
    private name3: string = '';
    public getName1(): string {
      return this.name1;
    }
    protected getName2(): string {
      return this.name2;
    }
    private getName3(): string {
      return this.name3;
    }
  }
  class B extends A {
    // private name1: string; // 会报错，
    // public name3: string = ''; //
    // private getName3(): string { // 私有属性和方法不可以扩展
    //   return '';
    // }
  }
}

/**
 * this 类型在方法中的标注
 * 给方法限制固定的 this，防止在解构后者其他情况下，方法内部由于 this 的指向执行的时候报错
 */
function test2_7(): void {
  console.log('---test2_7---------------------------------------------');

  class A {
    private age: number = 0;
    static age3: number = 0;
    public getAge(this: A): number {
      return this.age;
    }
    public getAge1(): number {
      return this.age;
    }
    public static getAge3(this: typeof A): number {
      // 给静态方法限制 this
      return this.age3;
    }
  }

  const a = new A();
  a.getAge();
  a.getAge1();
  // 下面这两个赋值，会将方法内部的 this 改变掉
  const getAge = a.getAge;
  const getAge1 = a.getAge1;
  // getAge(); // 由于在 getAge 内部绑定了 this，这里的 this 和绑定时不同，会报错
  getAge.call(a); // 要使用这种写法才不会报错
  getAge1();
  A.getAge3();
}

/**
 * 泛型类
 */
function test2_8(): void {
  console.log('---test2_8---------------------------------------------');

  class A<T> {
    constructor(public name: T) {}
    public getName(this: A<T>): T {
      return this.name;
    }
  }
  const a = new A('');
  a.getName();
  const a1 = new A(0);
  a1.getName();
}

/**
 *  new 的方式定义类的类型约束
 */
function test2_9(): void {
  console.log('---test2_9---------------------------------------------');

  type AConstructorFun = {
    new (name: string): A;
    age: number;
  };
  class A {
    static age: number;
    constructor(public name: string) {}
  }

  const AConstructor: AConstructorFun = A;
}

function test2_10(): void {
  console.log('---test2_10---------------------------------------------');

  interface A {
    name: string;
    getName(): string;
  }

  class A1 implements A {
    public name: string = '';
    getName(): string {
      return this.name;
    }
  }

  interface A2 {
    new (): A;
  }
}
export default test;
