function test() {
    console.log('---06探索内置类型：any、unknown、never 与类型断言---------------------------------------------');
    test1();
    test2();
    test3();
}
;
/**
 * 内置类型：any、unknown 与 never
 */
function test1() {
    console.log('---test1---------------------------------------------');
    test1_1();
    test1_2();
    test1_3();
}
;
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    let val1; // 会被推导为 any
    // let fun1 = function (a) { }; // a 会被推导为 any
    let val2;
    let val3 = val2;
    val2 = 12;
    let val4;
    val2 = val4;
    let val6;
    val6 = val5; // never 类型可以赋值给 any 类型
    // val5 = val6; // any 类型不可以赋值给 never 类型，除了这个类型 any 可以赋值给任何其他的类型
    let val7;
    val7 = 12;
    let val8 = val7; // any 类型即使是被赋值成其他的类型还是可以赋值给另一个类型的，因为看的是定义时候的类型
}
;
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    let val1;
    // let val2: string = val1; // 只能将 unknown 赋值给 unknown 和 any
    val1 = ''; // unknown 可以接受任何类型
    let val3 = val1;
    val1 = test1_2_val4;
}
;
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    let val2 = val1;
    let val3 = val2;
    // val2 = val3; // never 只接受 never 类型
    if (typeof val4 === 'string') {
    }
    else if (typeof val4 === 'number') {
    }
    else {
        let val5 = val4; // 这样如果 val5 的类型增加，如果 没有增加 else if 这里就会报错
    }
}
;
/**
 * 类型断言
 * as newType 、 <newType>
 * 主要是将 any unknown 类型 断言到具体的类型
 */
function test2() {
    console.log('---test2---------------------------------------------');
    let a;
    a = '';
    let b = a;
    let c = a; // 这两种都是类型断言
    // let d: number = c as number; // 会报错
    let d = c; // 先断言成 unknown 类型 再断言成 number 类型
    d = c;
}
/**
 * 非空断言
 * ! 表示 ! 前面一定是非 null 非 undefined
 */
function test3() {
    ;
    const obj = {
        fun() { }
    };
    // obj.fun(); // 会报错，根据定义，你一定会有 fun 属性
    obj.fun(); // 注意和 js 中的 ? 不同，虽然在编译的时候不会报错，但是可能在运行的时候报错
}
export default test;
