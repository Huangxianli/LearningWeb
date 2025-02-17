function test() {
    console.log('---类型编程基石：TypeScript 中无处不在的泛型---------------------------------------------');
    test1();
    test2();
    test3();
    test4();
    test5();
    test6();
}
;
/**
 * 类型别名如果使用了泛型坑位，那么就相当于一个接收参数的函数
 * 泛型大部分的事件用来进行工具类型的封装
 */
function test1() {
    // const a: IsEqual<false> = 1; // 会报错，不能把 1 分配给 2
    const b = 2;
}
;
/**
 * 泛型约束与默认值
 */
function test2() {
    // type Res1 = ResultStatus<'200'>; // 会报错
}
;
/**
 * 多泛型关联
 */
function test3() {
}
;
/**
 * 对象类型中的泛型
 */
function test4() {
}
;
/**
 * 函数的泛型
 */
function test5() {
    function handle(input) {
        return input;
    }
    ;
    // 箭头函数中加入泛型的表示
    const handle1 = (a) => a;
    const handle2 = (a) => a;
}
;
/**
 * Class 中的泛型
 * 函数中的泛型的消费方是 参数和返回值类型
 * Classs 中的泛型的消费方是 属性、方法、装饰器等；内部方法也可以有自己独有的泛型参数
 */
function test6() {
    class Queueo {
        constructor(list) {
            this.list = list;
        }
        ;
        add(item) {
            this.list.push(item);
        }
        ;
        add1(item) {
            this.list.push(item);
        }
        ;
    }
    ;
}
;
export default test;
