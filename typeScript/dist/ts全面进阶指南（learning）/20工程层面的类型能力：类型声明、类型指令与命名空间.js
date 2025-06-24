function test() {
    console.log('--- 工程层面的类型能力：类型声明、类型指令与命名空间 --------------------------------------------------------------------');
    test1();
    test2();
    test3();
}
/**
 * 类型指令检查
 */
function test1() {
    test1_1();
    test1_2();
}
/**
 * ts-ignore 和 ts-expect-error
 */
function test1_1() {
    console.log('--- ts-ignore 和 ts-expect-error --------------------------------------------------------------------');
    // ts-ignore 用来忽略下一行的检查
    // @ts-ignore
    const a1 = 1;
    // @ts-ignore
    const a2 = '1';
    // ts-expect-error 只有在下一行存在实际的错误时，才会忽略下一行的 ts 检查，如果下一行没有错误，这一行会抛出错误
    // @ts-expect-error // 如果下一行存在错误，会忽略下一行的 ts 检查，
    const b1 = 1;
    // @ts-expect-error // 如果下一行没有没有存在错误，那么会报错
    const b2 = 1;
}
/**
 * ts-check 与 ts-nocheck
 */
import { test as test1_2_1 } from './20-1';
function test1_2() {
    test1_2_1();
}
function test2() {
    console.log('--- 类型声明 --------------------------------------------------------------------');
    // declare let a2: string; // 修饰符的出现的位置不正确
}
/**
 * 让类型定义全面覆盖你的项目
 *
 * 通过额外的类型声明文件，在核心代码文件以外去提供对类型的进一步补全
 * declare modele 通常为没有提供类型定义的库进行类型的补全，以及为非代码文件提供基本类型定义
 */
import declareModuleTest from './20-2.declareModuleTest.js';
import { PI } from './20-2.declareModuleTest.js';
function test3() {
    console.log('--- 让类型定义全面覆盖你的项目 --------------------------------------------------------------------');
    declareModuleTest(); // 在global.d.ts 中声明了 declare module '*declareModuleTest'，定义了 default 导出是一个函数，不然 ts 根本不知道 declareModuleTest 是什么类型的
    const piValue = PI;
    test3_1();
    test3_2();
}
/**
 * DefinitleyTyped
 * 以 @types/ 开头的这一类 npm 包都属于 DefinitelyTeyped，它是由 TypeScript 维护的，专门为社区存在的无类型定义的 JS 添加类型支持 如 @types/react
 *
 * 只要安转了 @types/react，ts 就会将其自动的加在到环境中，作为 react 模块内部 API 的类型声明，这些声明不一定都是通过 declare module，命名空间 namespace 也可以实现一样的能力
 */
function test3_1() { }
/**
 * 扩展已有的类型定义
 */
function test3_2() {
    console.log('--- 扩展已有的类型定义 --------------------------------------------------------------------');
    window.newFunc(); // 这里可以这样调用而 ts 类型检查吧报错，是因为在 global.d.ts 中扩展了 Window
}
/**
 * 三斜线指令
 * 用来声明当前文件依赖的其他类型声明。可以是 TS 内置的类型声明、第三方库的类型声明以及自己提供的类型声明文件
 *
 * 注意要放在文件的顶部才能生效
 */
function test4() {
    /// <reference path="./other.d.ts" /> //
}
export default test;
