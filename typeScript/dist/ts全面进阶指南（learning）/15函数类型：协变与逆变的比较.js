function test() {
    console.log('--- 函数类型：协变与逆变的比较 ---------------------------------------------');
    test1();
    test2();
}
class Animal {
    asPet() { }
}
class Dog extends Animal {
    bark() { }
}
class Corgi extends Dog {
    cute() { }
}
/**
 * 如何比较函数的签名类型
 * 比较函数前面就是比较这个函数的入参类型和返回值的类型
 *
 * 如果一个值能够被赋值给另一个类型的变量，那么该值的类型是此变量类型的子类型
 *
 * 里氏替换原则：子类可以扩展父类的功能，但是不能改变父类原有的功能，子类型必须能够替换掉他们的基类型（在程序的任何一个需要父类型的地方都必须可以安全地用子类型来替换，而不会导致程序出现错误或异常，（注意这里的父类型是在不使用断言的情况下，例如：父：number | string 子：''））
 */
function test1() {
    console.log('--- 函数类型：协变与逆变的比较 ---------------------------------------------');
    // 在调用的时候，参数只能接收参数的子类型，不能接收参数的父类型
    const makeDogBark = (dog) => {
        dog.bark();
    };
    // makeDogBark(new Animal()); // 会报错，自能接收 Dog 及其派生类的实例，不能接受其父类的实例
    makeDogBark(new Dog());
    makeDogBark(new Corgi());
    const transformDogAndBark = function (dogFactory) {
        // const dog = dogFactory(new Dog());
        // dog.bark();
    };
    // 三个的返回值都是 Animal 类型，是 Dog 的父类型，不一定有 Dog 的方法
    const factory1 = (arg) => new Animal();
    // transformDogAndBark(factory1);
    const factory2 = (arg) => new Animal();
    // transformDogAndBark(factory2);
    const factory3 = (arg) => new Animal();
    // transformDogAndBark(factory3);
    // 由于传入的函数的参数传入的是 Corgi 类型
    const factory4 = (arg) => new Dog();
    // transformDogAndBark(factory4);
    const factory5 = (arg) => new Corgi();
    // transformDogAndBark(factory5);
    // 传入的函数的参数类型是 Dog 或者是 Dog 的子类，传入的函数的返回值都是 Dog 或者 Dog 的派生类
    const factory6 = (arg) => new Dog();
    transformDogAndBark(factory6);
    const factory7 = (arg) => new Corgi();
    transformDogAndBark(factory7);
    const factory8 = (arg) => new Dog();
    transformDogAndBark(factory8);
    const factory9 = (arg) => new Corgi();
    transformDogAndBark(factory9);
    // 去除掉所有的包含 Dog 的类型， Animal -> Corgi <= Dog -> Dog（Animal -> Corgi 是 Dog -> Dog 的子类型）
    // 参数允许更宽，返回值允许更窄
}
/**
 * 协变与逆变
 * 随着摸一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变
 *
 * 函数类型的参数类型使用子类型 逆变 的方式确定是否成立，返回值类型使用子类型 协变 的方式确定
 *
 * 为什么这么设置：
 * 参数逆变。a（A） = b（B） 这样赋值之后，在 ts 类型系统中 a 依旧是 A 类型不是 B 类型，调用 a 传入参数的时候，还是遵守 A 参数类型，但是由于 b 已经赋值给了 a，那么在被赋值后 a 函数中对参数的操作，其实是有可能调用了 B 类型中的参数类型才有的一些方法，（a 被赋值 b 后，实际调用的时候参数遵守 A，但是 a 函数内部对参数的操作是遵守 B 的），无论是从 | （不指定 as） 还是 extends 方面来说参数都用该是：父 赋值给 子，不然会存在安全问题
 * 返回值协变。a（A） = b（B） 这样赋值之后，在 ts 类型系统中 a 依旧是 A 类型不是 B 类型，那么返回值类型应该就是 A 类型的返回值类型，但是由于 b 已经赋值给了 a，那么在赋值后 a 函数的返回值的类型实际上已经是 B 类型的返回值类型了，a 被 b 赋值后，在调用 a 的返回值进行一些操作的时候，如果 A 的返回值类型是 B 的返回值类型的子类的话，就有可能调用 A 的返回值类型的上才存在的一些方法，而 B 的返回值类型上是可能没有这些方法的，这样就会报错，只有 A 的返回值类型 是 B 的返回值类型的父类的时候才安全
 */
function test2() {
    console.log('--- 协变与逆变 ---------------------------------------------');
}
/**
 * strictFunctionTypes
 * 在比较两个函数类型是否兼容的时候，将对函数参数进行更加严格的检查（对函数参数启用逆变检查）
 */
function test3() {
    console.log();
    const fn = (dog) => {
        dog.bark();
    };
    // 在 strictFunctionTypes 为 false 的时候，两个都不会报错，这个时候，函数的参数检查使用的是 双变 的；在设置为 true 或者没有设置的时候，函数参数的检查使用的是 逆变
    // const func1: CorgiFunc = fn;
    // const func2: AnimalFunc = fn;
}
/**
 * typesctipt eslint method-signature-style
 * 约束在接口中声明方法时，需要使用 property 而非 methods 的形式，原因是，对于 property 方式，才能在开启严格函数类型的情况下，享受到基于逆变的参数类型；对于 methods 方式，无法享受到更严格的检查
 */
function test4() {
    const fn = (arg) => 1;
    // const fn1: T1 = fn;
    // const fn2: T2 = fn;
    const fn1 = (arg) => void 0;
    const fn2 = (arg) => void 0;
    // const fn3: (arg: string | number) => void = (arg: string) => void 0;
}
export default test;
