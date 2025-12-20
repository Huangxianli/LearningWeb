/* 
any：不希望某个特定值导致类型检查错误
any 类型的变量可以接收任何类型的变量，any 类型的变量可以赋值给除 never 之外的所有类型（never 类型的变量只能接受 never 类型的变量，不能接受其他的类型的变量）
 */

let any1: any = {
  a: 123,
};

// 虽然可以通过类型检查，但是运行时有可能会报错的，所以尽可能的少使用 any
any1.foo();
any1();
any1.a.foo();

let any2: any;
declare let never1: never;
any2 = never1;
// never1 = any2;
// 不能将 any 类型的变量赋值给 never 类型的变量，这是 never 的特性，只能接受 never 类型的变量

let number2: number;
number2 = any2;

export { any1, any2, number2 };
