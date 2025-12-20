function test(): void {
  console.log(
    '--- 工程层面的类型能力：类型声明、类型指令与命名空间 --------------------------------------------------------------------'
  );

  test1();
  test2();
  test3();
}

/**
 * 类型指令检查
 */
function test1(): void {
  test1_1();
  test1_2();
}

/**
 * ts-ignore 和 ts-expect-error
 */
function test1_1(): void {
  console.log(
    '--- ts-ignore 和 ts-expect-error --------------------------------------------------------------------'
  );

  // ts-ignore 用来忽略下一行的检查
  // @ts-ignore
  const a1: string = 1;
  // @ts-ignore
  const a2: string = '1';

  // ts-expect-error 只有在下一行存在实际的错误时，才会忽略下一行的 ts 检查，如果下一行没有错误，这一行会抛出错误
  // @ts-expect-error // 如果下一行存在错误，会忽略下一行的 ts 检查，
  const b1: string = 1;
  // @ts-expect-error // 如果下一行没有没有存在错误，那么会报错
  const b2: string = 1;
}

/**
 * ts-check 与 ts-nocheck
 */
import { test as test1_2_1 } from './20-1';
function test1_2(): void {
  test1_2_1();
}

/**
 * 类型声明
 * 实际上就是 declare 语法
 * 该关键字告诉 TS 编译器，某个变量、函数、类或命名空间的类型信息是在其他地方定义的且已经实现的，不需要关注他的实现，只需要知道我现在给你的类型信息即可
 *
 * declare 声明存贮着特定的类型信息，但是不具有实际逻辑
 *
 * 核心作用，将类型独立于 .js 文件进行存储
 */
// declare let a1: Asdfs; // 不存在类型会报错
// declare let a3: string = '12'; // 赋值和 declare 不能出现在同一个语句中
declare const a4: string; // 告诉 TS  编译器，存在一个全局的常量 a，类型是 string，在这个文件里面遇到了 a4，不要将他当成未定义的内容
function test2(): void {
  console.log(
    '--- 类型声明 --------------------------------------------------------------------'
  );

  // declare let a2: string; // 修饰符的出现的位置不正确，不能出现在函数作用域内
  /** 
   * declare 可以出现的位置：
   * 1. 全局作用域
   * 2. class 内部
   * 3. 命名空间内部
   * 4. export declare
   */
}

/**
 * 让类型定义全面覆盖你的项目
 *
 * 通过额外的类型声明文件 .d.ts 文件，在核心代码文件以外去提供对类型的进一步补全
 * declare modele 通常为没有提供类型定义的库进行类型的补全，以及为非代码文件提供基本类型定义
 * 
 * 可以这样配置，就会自动的开启
 * tsconfig.json：
 * "compilerOptions": {
    "declaration": false,           // 关闭声明文件生成
    "declarationMap": false,        // 关闭声明源映射
  },
 * 
 */
import declareModuleTest from './20-2.declareModuleTest.js';
import { PI } from './20-2.declareModuleTest.js';
import { A } from './20-3.declareModuleTest1.js';
function test3(): void {
  console.log(
    '--- 让类型定义全面覆盖你的项目 --------------------------------------------------------------------'
  );
  declareModuleTest(); // 在global.d.ts 中声明了 declare module '*20-2.declareModuleTest.js'，定义了 default 导出是一个函数，不然 ts 根本不知道 declareModuleTest 是什么类型的，不单单是 js 文件，还可以对其他的非代码文件进行类型声明，也是使用这种方式
  const piValue: number = PI;

  test3_1();
  test3_2();
}

/**
 * DefinitleyTyped
 * 以 @types/ 开头的这一类 npm 包都属于 DefinitelyTeyped，它是由 TypeScript 维护的，专门为社区存在的无类型定义的 JS 添加类型支持 如 @types/react
 *
 * 只要安装了 @types/react，ts 就会将其自动的加在到环境中，作为 react 模块内部 API 的类型声明，这些声明不一定都是通过 declare module，命名空间 namespace 也可以实现一样的能力
 */
function test3_1(): void { }

/**
 * 扩展已有的类型定义
 */

function test3_2(): void {
  console.log(
    '--- 扩展已有的类型定义 --------------------------------------------------------------------'
  );
  window.newFunc(); // 这里可以这样调用而 ts 类型检查吧报错，是因为在 global.d.ts 中扩展了 Window
}

/**
 * 三斜线指令
 * 用来声明当前文件依赖的其他类型声明。可以是 TS 内置的类型声明、第三方库的类型声明以及自己提供的类型声明文件
 *
 * 注意要放在文件的顶部才能生效
 */
function test4(): void {
  /// <reference path="./other.d.ts" /> // 表明依赖某一个文件
  /// <reference types="xxx" /> // 表明依赖 @types/xxx
  /// <reference lib="xxx" /> // 表明依赖了 TypeScript 自带的类型声明 lib.xxx.d.ts
}

export default test;
