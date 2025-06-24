function test1() {
  class Father {
    name: string;
    constructor(name?: string) {
      this.name = name ?? '';
    }
  }
  class Child extends Father {
    action() {}
  }

  const child1: Father = new Child();
  // child1.action(); // 因为 child1 被定义为 Father 类型，即使实际存在该方法，在调用的时候也会报错

  const child2: Child = new Child();
  child2.action();
  // child2.name = 123; // 不能将 number 分配给 string
  child2.name = '123';
}
test1();

/**
 * 在ts中，成员默认是 public 的
 * 被标记为 private 的时候，只能在声明它的类内访问
 * 被标记为 protected 的时候，允许声明它的类和该类的派生类中访问
 */
function test2() {
  class Father {
    #name: string = '';
    private name1: string = '';
    // 这两种写法都是可以的，一个是es6中的写法，一个是 ts 的写法
    // private #name2: string = ''; // 这样不行
    protected name3: string = '';
  }
  class Child extends Father {
    private static name1: string = '';
    private static getName(): string {
      return this.name1;
    }
    getName1(): string {
      return this.name3;
    }
  }

  const child1: Child = new Child();
  // child1.#name; // 私有属性只能在声明的类中访问
  // child1.name1; // 私有属性只能在声明的类中访问
  // Child.getName(); // getName 是私有方法，只能在类内部访问
  // child1.name3; //  只能在声明它的类及其子类中访问
  child1.getName1();
}
test2();

/**
 * readonly 必须在定义的地方初始化或者在构造函数中初始化，而且在构造函数中无论修改多少次都可以，在其他地方修改会报错
 */
function test3() {
  class Father {
    readonly name1: string = 'Father';
    constructor(name2: string) {
      this.name1 = '1';
      this.name1 = name2; // 在构造函数中可以改变，无论多少次都可以
    }
    setName1(name: string) {
      // this.name1 = name; // 不能通过自定义的方法改变
    }
  }
  class Child extends Father {}
  const father1 = new Father('Child');
  // father1.name1 = 'data'; // 在实例中是只读的
  const child1 = new Child('Child');

  class Child1 {
    constructor(readonly name1: string) {} // 相当于声明了一个 readonly 的 name1 属性，并在 constructor 里面赋值
    getName(): string {
      return this.name1;
    }
  }
  const child2 = new Child1('Child2');
  child2.getName();
}
test3();

/**
 * 抽象类
 * 作为其他派生类的基类使用，一般不会直接实例化
 */
function test4() {
  abstract class Father {}
}
test4();

export { test1, test2, test3, test4 };
