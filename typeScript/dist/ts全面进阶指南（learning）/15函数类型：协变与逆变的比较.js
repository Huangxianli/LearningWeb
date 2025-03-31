function test() {
    console.log('--- 函数类型：协变与逆变的比较 ---------------------------------------------');
    test1();
    test2();
}
;
class Animal {
    asPet() { }
}
;
class Dog extends Animal {
    bark() { }
}
;
class Corgi extends Dog {
    cute() { }
}
;
/**
 * 如何比较函数的签名类型
 *
 * 如果一个值能够被赋值给另一个类型的变量，那么该值的类型是次变量类型的子类型
 *
 * 里氏替换原则：子类可以扩展父类的工鞥，但是不能改变父类原有的功能，子类型必须能够替换掉他们的基类型
 */
function test1() {
    console.log('--- 函数类型：协变与逆变的比较 ---------------------------------------------');
    // 在调用的时候，参数只能接收参数的子类型，不能接收参数的父类型
    const makeDogBark = (dog) => {
        dog.bark();
    };
    // makeDogBark(new Animal());
    makeDogBark(new Dog());
    makeDogBark(new Corgi());
    const transformDogAndBark = function (dogFactory) {
        const dog = dogFactory(new Dog());
        dog.bark();
    };
    // 三个的返回值都是 Animal 类型，是 Dog 的父类型，不一定有 Dog 的方法
    const factory1 = arg => new Animal();
    // transformDogAndBark(factory1);
    const factory2 = arg => new Animal();
    // transformDogAndBark(factory2);
    const factory3 = arg => new Animal();
    // transformDogAndBark(factory3);
    // 由于传入的函数的参数传入的是 Corgi 类型
    const factory4 = arg => new Dog();
    // transformDogAndBark(factory4);
    const factory5 = arg => new Corgi();
    // transformDogAndBark(factory5);
    // 传入的函数的参数类型是 Dog 或者是 Dog 的子类，传入的函数的返回值都是 Dog 或者 Dog 的派生类
    const factory6 = arg => new Dog();
    transformDogAndBark(factory6);
    const factory7 = arg => new Corgi();
    transformDogAndBark(factory7);
    const factory8 = arg => new Dog();
    transformDogAndBark(factory8);
    const factory9 = arg => new Corgi();
    transformDogAndBark(factory9);
    // 去除掉所有的包含 Dog 的类型， Animal -> Corgi <= Dog -> Dog（Animal -> Corgi 是 Dog -> Dog 的子类型）
}
;
/**
 * 协变与逆变
 * 随着摸一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变
 *
 * 函数类型的参数类型使用子类型逆变的方式确定是否成立，返回值类型使用子类型协变的方式确定
 */
function test2() {
    // Corgi <= Dog <= Aniaml
    // 将参数和返回值分开来看
    // T -> Corgi <= T -> Dog （协变）
    // Animal -> T <= Dog -> T （逆变）
}
;
/**
 * StrictFunctionTypes
 * 在比较两个函数类型是否兼容的时候，将对函数参数进行更加严格的检查（对函数参数启用逆变检查）
 */
function test3() {
    console.log();
    const fn = (dog) => {
        dog.bark();
    };
    // 在 StrictFunctionTypes 为 false 的时候，两个都不会报错，这个时候，函数的参数检查使用的是 双变 的；在设置为 true 或者没有设置的时候，函数参数的检查使用的是 逆变
    // const func1: CorgiFunc = fn;
    // const func2: AnimalFunc = fn;
}
;
/**
 * typesctipt eslint method-signature-style
 * 约束在接口中声明方法时，需要使用 property 而非 methods 的形式，原因是，对于 property 方式，子开启严格的函数价差的情况下，才能享受到基于逆变的参数类型；对于 methods 方式，无法享受到更严格的检查
 */
function test4() {
    ;
    ;
    const fn = (arg) => 1;
    // const fn1: T1 = fn;
    // const fn2: T2 = fn;
}
;
export default test;
