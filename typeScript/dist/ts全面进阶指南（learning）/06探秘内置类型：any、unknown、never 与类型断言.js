function test() {
    console.log('---06探索内置类型：any、unknown、never 与类型断言---------------------------------------------');
    test1();
    test2();
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
    val6 = val5;
    // val5 = val6;
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
}
export default test;
