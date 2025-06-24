function test() {
    console.log('--- 内置工具类型进阶：类型编程的进阶 ---------------------------------------------');
    test1();
    test2();
    test3();
}
/**
 * 属性修饰进阶
 *
 * 深层的属性修饰
 * 基于已知属性的部分修饰，以及基于属性类型的部分修饰
 */
function test1() {
    console.log('--- test1 属性修饰进阶 ---------------------------------------------');
    test1_1();
    test1_2();
}
/**
 * 深层次的属性修饰（满足条件时调用自己（递归））
 */
function test1_1() {
    console.log('--- test1_1 深层次的属性修饰 ---------------------------------------------');
}
/**
 * 基于已知属性进行部分修饰
 *
 * 类型编程思路：将复杂的工具类型，拆解为由基础工具类型、类型工具的组合
 * 拆分（拆分对象结构，结构工具类型 Pick Omit）-处理（可能会用到递归）-组合（组合两个对象类型，等到一个同时符合这两个对象类型的新结构（交叉类型））
 */
function test1_2() {
    console.log('--- test1_2 基于已知属性进行部分修饰 ---------------------------------------------');
    /*
      {
        key1?: string;
        key2: string;
        key3: number;
      };
     */
}
/**
 * 结构工具类型进阶
 *
 * 基于键值类型的 Pick 与 Omit
 *  也适用于 拆分-处理-组装
 * 子结构的互斥处理
 */
function test2() {
    console.log('--- test2 结构工具类型进阶 ---------------------------------------------');
    test2_1();
    test2_2();
}
/**
 * 基于键值类型的 Pick 与 Omit
 * 拆分-处理-组合
 * 拆分：基于期望的类型拿到所有此类型的属性
 */
function test2_1() {
    console.log('--- test2_1 基于键值类型的 Pick 与 Omit ---------------------------------------------');
}
function test2_2() {
    const vip1 = {
        vipExpires: 1,
        // promotionUsed: false, // 这里会报错
    };
    const user1 = {
        // 这样不会报错，不能限制 VIP 和 CommonUser 只能是两者之一
        vipExpires: 1,
        promotionUsed: false,
        age: '',
    };
    const vOrC1 = {
        // vipExpires: 1,
        promotionUsed: false,
        name: '',
    };
    const vOrC2 = A;
}
function test3() {
    console.log('--- test3 模式匹配工具类型进阶 ---------------------------------------------');
}
export default test;
