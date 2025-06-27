function test() {
    test1();
    test2();
    test3();
    test4();
    test5();
}
/**
 * 模板字符串类型的基础使用
 */
function test1() {
    console.log('--- 模板字符串的基础使用 -------------------------------------------------------');
    const version1 = '1.1.1';
}
function test2() {
    console.log('--- 模板字符串类型的类型表现 -------------------------------------------------------');
    v1 = v2;
    // v2 = v1; // v1 的范围更广，v1 不能赋值给 v2
    const greet = (to) => `Hello ${to}`;
}
/**
 * 结合索引类型与映射类型
 */
function test3() {
    console.log('--- 结合索引类型与映射类型 -------------------------------------------------------');
    test3_1();
    test3_2();
}
/**
 * 结合索引类型
 * keyof 关键字
 */
function test3_1() {
    console.log('--- 结合索引类型 -------------------------------------------------------');
    const eventName = 'onclick';
}
/**
 * 结合映射类型
 *
 * [K in keyof T as `some${string & K}some`]: T[K]
 * 重映射
 * 在映射键名时基于原键名作修改
 */
function test3_2() {
    console.log('--- 结合索引类型 -------------------------------------------------------');
}
/**
 * 专用工具类型
 * 装用于字符串字面量类型
 *
 * Uppercase Lowercase Capitalize Uncapitalize
 */
function test4() {
    console.log('--- 专用工具类型 -------------------------------------------------------');
}
/**
 * 模板字符串类型与模板匹配
 *
 * 非贪婪的前缀 贪婪后缀
 */
function test5() {
    console.log('--- 模板字符串类型与模板匹配 -------------------------------------------------------');
}
export default test;
