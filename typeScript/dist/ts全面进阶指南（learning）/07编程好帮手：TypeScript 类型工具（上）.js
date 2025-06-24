function test() {
    console.log('---07编程好帮手：TypeScript 类型工具（上）---------------------------------------------');
    // 基于已有的类型创建出新的类型
    test1();
    test2();
    test3();
    test4();
}
/**
 * 类型别名
 * 工具类型是基于类型别名的，只是多了个泛型
 */
function test1() {
    console.log('---test1---------------------------------------------');
    const statuCode = 200;
    const clickHandler = (e) => { };
    const factory = false;
    const ensureArray = function (input) {
        return Array.isArray(input) ? input : [input];
    };
}
/**
 * 联合类型与交叉类型
 * 交叉类型 &，两边都要同时满足，相当于取交集
 * 对于对象类型是将两边的内容进行合并
 */
function test2() {
    console.log('---test2---------------------------------------------');
    const person = {
        name: '',
        age: 0,
    };
}
/**
 * 索引类型
 */
function test3() {
    console.log('---test3---------------------------------------------');
    test3_1();
    test3_2();
    test3_3();
}
/**
 * 索引签名类型
 * 在接口或者类型中，快速声明一个 键值类型一致的类型结构
 */
function test3_1() {
    console.log('---test3_1---------------------------------------------');
    // 要注意 obj[prop] 的形式会将数组类型的 prop 转化成字符串的 prop 来访问，因此即使加 number 类型的属性也不会报错，symbol 类型的也一样
    const personL = {
        name: 12,
        12: 12,
        [Symbol(12)]: 12,
    };
    // const c1: C = '2'; // 会报错
    const c2 = -1;
    const c3 = 'push'; // 注意这里。 说明 C 不单单是 number 还包括 数组原型是的一些 key，还包括 Length 和一些 Symbol
}
/**
 * 索引类型查询
 * keyof T 操作符会获取类型 T 的所有可安全访问的公共属性名
 * keyof 操作符就是进行索引类型查询的，注意 keyof 后面可以接类型和接口和泛型，不能直接传入变量
 * 可以将对象中的所有键转化成对应的字面量类型，然后再组合成联合类型，类似于 Object.keys(Obj).join('|')
 * 查询索引的类型
 */
function test3_2() {
    console.log('---test3_2---------------------------------------------');
    const obj = { 1: 1 };
    const b1 = 'toString';
    let c1 = 1;
    c1 = 'toString';
}
/**
 * 索引类型访问
 * 根据索引的类型或者索引的值（本质上不是值，而是字面量类型），查询对应的值的类型
 * 不能传值，可以从不能传递 symbol 值就可以看出
 */
function test3_3() {
    console.log('---test3_3---------------------------------------------');
    const a = Symbol.for('1');
}
/**
 * 映射类型：类型编程的第一步
 * 索引类型的最佳拍档之一就是映射类型
 * 索引类型查询和索引类型访问通常和映射类型一起搭配使用
 *
 * 映射类型的主要作用是：基于键名映射到键值类型
 */
function test4() {
    console.log('---test4---------------------------------------------');
}
export default test;
