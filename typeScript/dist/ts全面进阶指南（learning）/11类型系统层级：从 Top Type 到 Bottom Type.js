function test() {
    console.log('---类型系统层级：从 Top Type 到 Bottom Type---------------------------------------------');
    test1();
    test2();
    test3();
    test4();
    test5();
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
 * 只要满足其中一个类型，就可以认为实现了这个联合类型
 * 字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型
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
 * Object < any / unknown
 */
function test3_3() {
    console.log('---test3_3---------------------------------------------');
    // any extends unknown 和 unknown extends any 都是完全成立的，不存在一部分满足一部分不满足
}
;
/**
 * 向下探索，直到万物虚无
 * never null undefined void
 *
 * never < 字面量类型
 */
function test4() {
    console.log('---test4---------------------------------------------');
}
;
/**
 * 其他场景比较场景
 * 基类和派生类
 * 联合类型的多个成员
 * 数组和元组
 */
function test5() {
}
;
export default test;
