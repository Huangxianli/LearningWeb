"use strict";
/*
any：不希望某个特定值导致类型检查错误
可以接收任何类型，可以赋值给除 never 之外的所有类型
 */
let any1 = {
    a: 123,
};
// 虽然可以类型检查通过，但是运行是有可能会报错的，所以尽可能的少使用 any
any1.foo();
any1();
any1.a.foo();
let any2;
any2 = never1;
// never1 = any2; // 不能将 never 赋值给 any
let number2;
number1 = any2;
