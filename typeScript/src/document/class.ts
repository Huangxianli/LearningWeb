import test from '../ts全面进阶指南（learning）/20工程层面的类型能力：类型声明、类型指令与命名空间';
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

  const child1: Father = new Child(); // 子类型可以赋值给父类型
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
    // 这两种写法都是可以的，一个是 es6 中的写法，一个是 ts 的写法
    // private #name2: string = ''; // 这样不行
    protected name3: string = '';
  }
  class Child extends Father {
    private static name1: string = '';
    private static getName(): string {
      return this.name1; // static 方法的 this 指向的是类本身，所以可以访问到 name1 属性
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
 * readonly
 * 必须在定义的地方初始化或者在构造函数中初始化，而且在构造函数中无论修改多少次都可以，在其他地方修改会报错
 */
function test3() {
  class Father {
    readonly name1: string = 'Father';
    constructor(name2: string) {
      this.name1 = '1';
      this.name1 = name2; // 在构造函数中可以改变，无论多少次都可以
    }
    setName1(name: string) {
      // this.name1 = name; // 不能通过自定义的方法改变，只能在构造函数中改变，因为 name1 添加了 readonly 修饰符
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
 * 抽象类不能被实例化，一般作为其他派生类的基类使用
 * 通常包含一些没有具体实现的抽象方法，要求子类必须去实现
 */
function test4() {
  abstract class Father {}
  // new Father(); // 不能被实例化

  abstract class Father1 {
    abstract name: string;
    abstract getName(): string;
  }
  class Child extends Father1 {
    constructor(public name: string) {
      super();
    }
    getName(): string {
      return this.name;
    }
  }
}
test4();

/**
 * 抽象成员和修饰符 private protected public 结合使用
 * 抽象成员的目的是为了让子类去实现
 * 所以 private 理所当然得不能和 abstract 一起使用（但是抽象类中，是可以使用 private 的，只是不能和抽象成员放在一起），protected 和 public（默认的） 是可以的
 * 子类在实现抽象类中定义的抽象成员的时候，修饰符可以不同，但是只能是更开放的修改
 *
 * 结合 readonly
 * 抽象类中如果是 readonly，那么子类中可以不是 readonly
 */
function test5() {
  abstract class Father {
    protected abstract name: string;
    // private abstract name1: string; // 报错，private 和 abstract 不能放在一起
    private name2: string = '12';
    abstract name3: string;
    abstract readonly name4: string;
  }
  class Child extends Father {
    name4: string = '12';
    constructor(public name: string, public name3: string) {
      super();
    }
  }
  const child = new Child('1', '2');
  child.name;
  child.name4 = '';
}
test5();

/**
 * implement
 * 实现接口定义的结构，但不继承任何逻辑
 */
function test6() {
  class Father {
    static name1: string;
    constructor(public name: string, name1: string) {
      Father.name1 = this.name;
    }
    getName(): string {
      return this.name;
    }
    static getName1(): string {
      return this.name1;
    }
  }
  class Child implements Father {
    // Child 如果不实现 Father 中定义的方法或者属性，会报错，和 extends 关键字不同
    constructor(public name: string) {}
    getName(): string {
      return this.name;
    }
  }
}

export { test1, test2, test3, test4, test5, test6 };
