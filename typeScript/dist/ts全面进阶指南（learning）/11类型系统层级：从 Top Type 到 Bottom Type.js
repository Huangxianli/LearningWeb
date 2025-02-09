function test() {
    console.log('---类型系统层级：从 Top Type 到 Bottom Type---------------------------------------------');
    test1();
    test2();
    test3();
    test4();
}
;
function test1() {
    console.log('---test1---------------------------------------------');
    let a = '';
}
;
/**
 * 从原始类型开始
 * 字面量类型 < 对应的原始类型
 */
function test2() {
    console.log('---test2---------------------------------------------');
}
;
/**
 * 向上探索
 */
function test3() {
    console.log('---test3---------------------------------------------');
    test3_1();
    test3_2();
    test3_3();
}
;
/**
 * 联合类型
 */
function test3_1() {
    console.log('---test3_1---------------------------------------------');
}
;
/**
 * 装箱类型
 * 原始类型 < 原始装箱类型 < Object 类型
 */
function test3_2() {
    console.log('---test3_2---------------------------------------------');
    const a = '1223';
}
;
/**
 * Top Type
 * any 和 unknown 无视一切的因果定律
 * Object 类型是 any 和 unknown 类型的子类型
 */
function test3_3() {
    console.log('---test3_3---------------------------------------------');
    // any extends unknown 和 unknown extends any 都是成立的
}
;
/**
 * 向下探索，直到万物虚无
 * never null undefined void
 */
function test4() {
    console.log('---test4---------------------------------------------');
}
;
export default test;
