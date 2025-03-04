/**
 * 工具类型的分类
 * 1. 属性修饰工具类型
 * 2. 结构工具类型
 * 3. 集合工具类型
 * 4. 模式匹配工具类型（基于 infer 的模式匹配，对一个既有的类型特定位置类型的提取）
 * 5. 模板字符串工具类型
 */
function test() {
    test1();
    test2();
    test3();
    test4();
}
;
function test1() {
    ;
    /*
      type B = {
        a1?: string | undefined;
        a2?: number | undefined;
        a3?: undefined | string;
        a4?: undefined | string | undefined;
        a5?: undefined;
      }
     */
    const b1 = {
        a1: undefined, // 可以是 undefined，也可以是没有这个属性
        a2: undefined, // 可以是 undefined，也可以是没有这个属性
        a4: undefined,
    };
    ;
    const test1 = { name: undefined }; // ? 本身就可以是 没有这个属性或者这个属性的值为 undefined 
    /*
     type C = {
      a1: string;
      a2: number;
      a3: string;
      a4: string;
      a5: never;
     }
     */
    const c = {
        a1: '',
        a2: 1,
        a3: '',
        a4: '',
        a5: never1,
    };
    /*
      type E = {
        a1: string;
        a2?: number | undefined;
        a3: undefined | string;
        a4?: undefined | string | undefined;
        a5: undefined;
      }
    */
}
;
/**
 * 结构工具类型
 * 对类型的裁剪、拼接、转换等
 * 结构声明 和 结构处理
 */
function test2() {
    test2_1();
    test2_2();
}
;
/**
 * 结构声明工具
 * 快速的声明一个结构
 */
function test2_1() {
    const record3 = {}; // 即使是没有传属性也不会报错
    const record4 = {
        a: 1,
        b: 2,
    };
    const record5 = {
        12: 1,
    };
}
;
/**
 * 结构处理工具
 */
function test2_2() {
}
;
/**
 * 集合工具类型
 * 主要的使用条件类型、条件类型分布式特点
 */
function test3() {
}
;
/**
 * 模式匹配工具类型
 * 主要使用条件类型和 infer 关键字
 */
function test4() {
}
;
export default test;
