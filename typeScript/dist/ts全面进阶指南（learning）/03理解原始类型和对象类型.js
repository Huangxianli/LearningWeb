function test() {
    console.log('---03理解原始类型和对象类型---------------------------------------------');
    test1();
    test2();
    test3();
    test4();
}
;
/**
 * 原始类型
 */
function test1() {
    console.log('---test1---------------------------------------------');
    test1_1();
    test1_2();
    test1_3();
}
;
/**
 * es6及以上新增的原始类型
 */
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    const bigint1 = BigInt(12);
    const symbol1 = Symbol.for('12312');
}
;
/**
 * undefined 和 null
 * 在 js 中：
 * undefined 表示 已经声明了，但是没有赋值
 * null 表示 已经声明了，而且给了一个 null 值（或者说变量应该有值但是目前还没有，且期待是一个引用类型的值）
 * 在 ts 中：
 * null 和 undefined 都有具体的意义
 * 如果 strictNullChecks 为 false，则是其他类型的子类型；如果 strictNullChecks 为 true，则不是其他类型的子类型，赋值给其他类型的时候会报错
 */
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    // const string1: string = undefined;
    // const null1: null = undefined;
    // const obj: Object = null;
}
;
/**
 * void
 * 在 js 中：执行后面的表达式，并返回 undefined
 * 在 ts 中：用于描述一个没有 没有 return 、return了但是没有显示的值 的函数的返回值
 *
 * 注意一点，即使显示 return undefined，会被推导成 undefined，但是在声明的时候，可以用 void；undefined 是可以 赋值给 void 类型的；也就表明，即使是 void 类型，其值有可能是实实在在的 undefined
 */
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    // 鼠标移到函数名称函看类型推导
    function test1_3_1() {
        // return;
        // return undefined;
    }
    ;
    function test1_3_2() {
        return undefined; // undefined 可以赋值给 void
    }
    ;
    function test1_3_3() {
        return; // 按理来说，直接 return，但是 return 后面没有内容，应该是被推导成 void 的，void 应该是不能赋值给 udefined 的 这里为什么可以？？？
    }
    let test1_3_4 = undefined;
    let test1_3_5 = test1_3_4; // undefined 可以被赋值给 void
    let test1_3_6;
    test1_3_6 = void 0; // 很奇怪，这里也没有报错
}
;
/**
 * 数组的类型标注
 */
function test2() {
    console.log('---test2---------------------------------------------');
    test2_1();
    test2_2();
}
;
/**
 * 声明方法
 */
function test2_1() {
    console.log('---test2_1---------------------------------------------');
    const arr1 = [];
    const arr3 = [];
}
;
/**
 * 元祖
 */
function test2_2() {
    console.log('---test2_2---------------------------------------------');
    const arr1 = ['1'];
    // arr1[2];
    const arr2 = ['12'];
}
;
/**
 * 对象类型标注
 */
function test3() {
    console.log('---test3---------------------------------------------');
    test3_1();
    test3_2();
    test3_3();
}
;
/**
 * interface
 */
function test3_1() {
    console.log('---test3_1---------------------------------------------');
    ;
    const obj1 = {
        name: '',
        // age: 12,
        single: true,
    };
    const a = obj1.male;
}
;
/**
 * 数组/元组上使用 readonly 只能将整个标记成 readonly
 * 失去了 push 等方法，不能修改原数组的任何一项的值
 */
function test3_2() {
    console.log('---test3_2---------------------------------------------');
    const arr1 = [1];
    const arr2 = [1];
    // arr2.push(1);
    // arr2[1] = 12;
    // arr1[0] = 12;
}
;
/**
 * interface 和 type
 * interface 描述对象和类
 * type 用来将一个函数签名、一组组合类型、一个工具类型等等抽离成一个完整的类型
 */
function test3_3() {
    console.log('---test3_3---------------------------------------------');
    let test3_3_1 = function () { };
}
;
/**
 * Object object {}
 * 区分这三者
 * Object 和 {} 都表示除 undefined、null 和 void 0 之外的任何类型，但是 {} 类型不可以进行属性操作，即使是赋值了
 * object 表示除了 undefined、undefined 和 void 0 之外的任何非原始类型
 */
function test4() {
    console.log('---test4---------------------------------------------');
    test4_1();
    test4_2();
    test4_3();
}
;
/**
 * Object
 * 在 js 中所有的类型沿着原型链最终都是指向 Object
 * ts 中的表现就为 Object 包含了所有的类型（除去 undefined、null 和 void 0）
 * undefined、 null 和 void 0 只在 strictNullcheck 为 false 的时候才可以赋值给 Object 类型的元素
 *
 * 在任何情况下，都不使用这种装箱类型 Object Number ...
 *
 */
function test4_1() {
    console.log('---test4_1---------------------------------------------');
    const object1 = 12;
    const object2 = Symbol();
    let object3 = '';
    const string1 = '123';
    object3 = string1;
    // const object4: Object = null;
    // const object5: Object = undefined;
}
;
/**
 * object
 * 确保是引用类型（object 也要排除 undefined、null、void 0）
 */
function test4_2() {
    console.log('---test4_2---------------------------------------------');
    const object1 = {};
    // const object2: object = null;
    const object3 = function () { };
    const object4 = {};
    // const object5: object = '';
}
;
/**
 * {}
 * 内部无属性的空对象
 * 除去 undefined、null、void 0 的任何类型
 * 但是无法进行属性的赋值操作，即使是已经进行了赋值
 *
 * 避免使用它
 */
function test4_3() {
    console.log('---test4_3---------------------------------------------');
    const object1 = 'li';
    const object2 = {
        12: 12
    };
    const object3 = function () { };
    // const object4: {} = undefined;
    // const object5: {} = null;
    // object1.name = 12;
    // object3();
}
;
export default test;
