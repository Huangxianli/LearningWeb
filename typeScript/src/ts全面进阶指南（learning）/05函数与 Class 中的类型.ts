function test(): void {
  console.log('---05函数与 Class 中的类型---------------------------------------------');

  test1();
  test2();
};

/**
 * 函数
 */
function test1(): void {
  console.log('---test1---------------------------------------------');

  test1_1();
  test1_2();
  test1_3();
  test1_4();
};

/**
 * 函数的类型签名
 */
function test1_1(): void {
  console.log('---test1_1---------------------------------------------');

  const fun1 = function (a: number): void { };
  const fun2: () => number = () => { return 1 };
  const fun3 = (a: number): number => { return 1 };

  interface Fun4 {
    (a: number): void
  };
  const fun4: Fun4 = (a) => { };

  type Fun5 = (a: number) => number;
  const fun5: Fun5 = a => 1;
};

/**
 * void 类型
 */
function test1_2(): void {
  console.log('---test1_2---------------------------------------------');

  function test1_2_1(): void {
    // 没有return
  };
  function test1_2_2(): void {
    return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好 
  };
  function test1_2_3(): undefined {
    return;
  }
};

/**
 * 可选参数与 rest 参数
 */
function test1_3() {
  console.log('---test1_3---------------------------------------------');

  function test1_3_1(a: number, b?: number): void { };
  test1_3_1(1);
  test1_3_1(1, 1);

  function test1_3_2(a: number, b: number | string = 12): void { };
  test1_3_2(1);
  test1_3_2(1, 2);

  function test1_3_3(a: number, ...b: (string | number)[]) { };
  function test1_3_4(a: number, ...b: [number, string]) { };
};

/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型
 */
function test1_4(): void {

  function test1_4_1(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  };

  const a = test1_4_1(1); // a 的类型被推导成 string | number

  function test1_4_2(foo: number, bar: true): number
  function test1_4_2(foo: number, bar?: false): string
  function test1_4_2(foo: number, bar?: boolean): string | number {
    if (bar) {
      return foo;
    } else {
      return String(foo);
    }
  };
  const b = test1_4_2(1); // b 的类型准确的推导成了 string
};

/**
 * Class
 */
function test2(): void {
  console.log('---test2---------------------------------------------');

  test2_1();
  test2_2();
  test2_3();
  test2_4();
};

/**
 * 声明
 */
function test2_1(): void {
  console.log('---test2_1---------------------------------------------');

  class A {
    name1: string = '';
    constructor(name: string) {
    };

    get name2(): string {
      return this.name1;
    };

    // set name2(name: string): void { // set 不允许设置返回类型即使是 void 也不行
    set name2(name: string) {
      this.name1 = name;
    };
  };

  const B = class {
    constructor() { };
  };
};

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
};

/**
 * public 代表着在 类 类的实例 子类中都能访问
 */
function test2_2_1(): void {
  console.log('---test2_2——1---------------------------------------------');

  class A {
    public name1: string = '';
    constructor(name: string) {
      this.name1 = '';
    };
    setName1(name: string) {
      this.name1 = name;
    };
  };
  class B extends A {
    constructor(name: string) {
      super(name);
      this.name1;
    }
  };
  let a = new A('');
  a.name1;
};

/**
 * private 表示只能在当前类的内部访问
 */
function test2_2_2(): void {
  console.log('---test2_2_2---------------------------------------------');

  class A {
    private name1: string = '';
    constructor() {
      this.name1 = '';
    };

    setName1(name: string): void {
      this.name1 = name;
    }
  };

  class B extends A {
    constructor() {
      super();
      // this.name1; // 父的私有属性不允许在子类中访问
    };
  };

  const a = new A();
  // a.name1; // name1 是 A 的私有属性，不允许在实例上访问
};

/**
 * protected 只允许在类和子类中访问
 */
function test2_2_3(): void {
  console.log('---test2_2_3---------------------------------------------');

  class A {
    protected name1: string = '';
    constructor() { };
  };
  class B extends A {
    constructor() {
      super();
      this.name1;
    }
  };
  const a1 = new A();
  // a1.name1; // protected 只允许在类和子类上访问
  const b1 = new B();
  // b1.name1; // 继承了 protected

};

/**
 * 实例属性的简略写法
 */
function test2_2_4(): void {
  console.log('---test2_2_4---------------------------------------------');

  class A {
    constructor(public name1: string) { // 注意这里加了 修饰符之后会自动的 this.name1 = name1;
      let b = 1 + 1;
    };
  };

  const a1 = new A('a1');
  a1.name1; // a1
};

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
    };
  };
  A.getClassName();
};

/**
 * 抽象类 一个抽象方法描述了这一方法在实际实现中的结构
 */
function test2_4(): void {
  console.log('---test2_4---------------------------------------------');

  abstract class A {
    abstract name1: string;
    constructor() { };
    abstract getName1(): string;
  };

  class A1 implements A {
    name1 = '';
    getName1(): string {
      return this.name1;
    };
  }
};

export default test;