function test() {
    console.log('---04字面量类型与枚举---------------------------------------------');
    test1();
    test2();
}
;
/**
 * 字面量类型与联合类型
 */
function test1() {
    console.log('---test1---------------------------------------------');
    test1_1();
    test1_2();
    test1_3();
}
;
/**
 * 字面量类型
 */
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    let code = 200;
    // code = 300;
}
;
/**
 * 联合类型
 */
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    let code = 200;
    code = 300;
    // code = true;
}
;
/**
 * 对象字面量类型
 */
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    ;
    let temp = {
        obj: {
            name: ''
        }
    };
    // temp = {
    //   obj: {}
    // }
}
;
/**
 * 枚举
 */
function test2() {
    console.log('---test2---------------------------------------------');
    let Items;
    (function (Items) {
        Items[Items["Foo"] = 0] = "Foo";
        Items[Items["Bar"] = 800] = "Bar";
    })(Items || (Items = {}));
    ;
    const Foo = Items.Foo;
}
;
export default test;
