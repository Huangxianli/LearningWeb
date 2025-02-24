/**
 * 工具类型的分类
 * 1. 属性修饰工具类型
 * 2. 集合工具类型
 * 3. 模式匹配工具类型（基于 infer 的模式匹配，对一个既有的类型特定位置类型的提取）
 * 4. 模板字符串工具类型
 */
function test() {
    test1();
}
;
/**
 * 属性修饰工具类型
 * 主要使用属性修饰、映射类型与索引类型相关
 */
function test1() {
    ;
    const a = {
        name: undefined,
        age: undefined,
    };
    ;
    const d = {
        name: undefined,
    };
    ;
    ;
    /*
      type H = {
        name: string;
      }
     */
    const h = {
        // name: undefined,
        name: '',
    };
}
;
export default test;
