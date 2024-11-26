"use strict";
function test() {
    console.log('---05函数与 Class 中的类型---------------------------------------------');
    test1();
}
;
/**
 * 函数
 */
function test1() {
    console.log('---test1---------------------------------------------');
    test1_1();
}
;
/**
 * 函数的类型签名
 */
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    const fun1 = function (a) { };
    const fun2 = () => { return 1; };
    const fun3 = (a) => { return 1; };
    ;
    const fun4 = (a) => { };
    const fun5 = a => 1;
}
;
/**
 * void 类型
 */
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    function test1_2_1() {
        // 没有return
    }
    ;
    function test1_2_2() {
        return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好 
    }
    ;
    function test1_2_3() {
        return;
    }
}
;
/**
 * 可选参数与 rest 参数
 */
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    function test1_3_1(a, b) { }
    ;
    test1_3_1(1);
    test1_3_1(1, 1);
    function test1_3_2(a, b = 12) { }
    ;
    test1_3_2(1);
    test1_3_2(1, 2);
    function test1_3_3(a, ...b) { }
    ;
    function test1_3_4(a, ...b) { }
    ;
}
;
/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型
 */
function test1_4() {
    function test1_4_1(foo, bar) {
        if (bar) {
            return foo;
        }
        else {
            return String(foo);
        }
    }
    ;
    const a = test1_4_1(1); // a 的类型被推导成 string | number
    function test1_4_2(foo, bar) {
        if (bar) {
            return foo;
        }
        else {
            return String(foo);
        }
    }
    ;
    const b = test1_4_2(1); // b 的类型准确的推导成了 string
}
;
