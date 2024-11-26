"use strict";
function test() {
    console.log('---05函数与 Class 中的类型---------------------------------------------');
    test1();
    test2();
}
;
/**
 * 函数
 */
function test1() {
    console.log('---test1---------------------------------------------');
    test1_1();
    test1_2();
    test1_3();
    test1_4();
}
;
/**
 * 函数的类型签名
 */
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    const fun1 = function (a) { };
    const fun2 = () => { return 1; };
    const fun3 = (a) => { return 1; };
    ;
    const fun4 = (a) => { };
    const fun5 = a => 1;
}
;
/**
 * void 类型
 */
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    function test1_2_1() {
        // 没有return
    }
    ;
    function test1_2_2() {
        return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好 
    }
    ;
    function test1_2_3() {
        return;
    }
}
;
/**
 * 可选参数与 rest 参数
 */
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    function test1_3_1(a, b) { }
    ;
    test1_3_1(1);
    test1_3_1(1, 1);
    function test1_3_2(a, b = 12) { }
    ;
    test1_3_2(1);
    test1_3_2(1, 2);
    function test1_3_3(a, ...b) { }
    ;
    function test1_3_4(a, ...b) { }
    ;
}
;
/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型
 */
function test1_4() {
    function test1_4_1(foo, bar) {
        if (bar) {
            return foo;
        }
        else {
            return String(foo);
        }
    }
    ;
    const a = test1_4_1(1); // a 的类型被推导成 string | number
    function test1_4_2(foo, bar) {
        if (bar) {
            return foo;
        }
        else {
            return String(foo);
        }
    }
    ;
    const b = test1_4_2(1); // b 的类型准确的推导成了 string
}
;
/**
 * Class
 */
function test2() {
    console.log('---test2---------------------------------------------');
    test2_1();
    test2_2();
    test2_3();
    test2_4();
}
;
/**
 * 声明
 */
function test2_1() {
    console.log('---test2_1---------------------------------------------');
    class A {
        constructor(name) {
            this.name1 = '';
        }
        ;
        get name2() {
            return this.name1;
        }
        ;
        // set name2(name: string): void { // set 不允许设置返回类型即使是 void 也不行
        set name2(name) {
            this.name1 = name;
        }
        ;
    }
    ;
    const B = class {
        constructor() { }
        ;
    };
}
;
/**
 * 修饰符
 * public、private、protected
 * readonly
 */
function test2_2() {
    console.log('---test2_2---------------------------------------------');
    test2_2_1();
    test2_2_2();
    test2_2_3();
    test2_2_4();
}
;
/**
 * public 代表着在 类 类的实例 子类中都能访问
 */
function test2_2_1() {
    console.log('---test2_2——1---------------------------------------------');
    class A {
        constructor(name) {
            this.name1 = '';
            this.name1 = '';
        }
        ;
        setName1(name) {
            this.name1 = name;
        }
        ;
    }
    ;
    class B extends A {
        constructor(name) {
            super(name);
            this.name1;
        }
    }
    ;
    let a = new A('');
    a.name1;
}
;
/**
 * private 表示只能在当前类的内部访问
 */
function test2_2_2() {
    console.log('---test2_2_2---------------------------------------------');
    class A {
        constructor() {
            this.name1 = '';
            this.name1 = '';
        }
        ;
        setName1(name) {
            this.name1 = name;
        }
    }
    ;
    class B extends A {
        constructor() {
            super();
            // this.name1; // 父的私有属性不允许在子类中访问
        }
        ;
    }
    ;
    const a = new A();
    // a.name1; // name1 是 A 的私有属性，不允许在实例上访问
}
;
/**
 * protected 只允许在类和子类中访问
 */
function test2_2_3() {
    console.log('---test2_2_3---------------------------------------------');
    class A {
        constructor() {
            this.name1 = '';
        }
        ;
    }
    ;
    class B extends A {
        constructor() {
            super();
            this.name1;
        }
    }
    ;
    const a1 = new A();
    // a1.name1; // protected 只允许在类和子类上访问
    const b1 = new B();
    // b1.name1; // 继承了 protected
}
;
/**
 * 实例属性的简略写法
 */
function test2_2_4() {
    console.log('---test2_2_4---------------------------------------------');
    class A {
        constructor(name1) {
            this.name1 = name1;
            let b = 1 + 1;
        }
        ;
    }
    ;
    const a1 = new A('a1');
    a1.name1; // a1
}
;
/**
 * static
 */
function test2_3() {
    console.log('---test2_3---------------------------------------------');
    // static name1: string = ''; 
    class A {
        static getClassName() {
            return 'A';
        }
        ;
    }
    A.name1 = '';
    ;
    A.getClassName();
}
;
/**
 * 抽象类 一个抽象方法描述了这一方法在实际实现中的结构
 */
function test2_4() {
    console.log('---test2_4---------------------------------------------');
    class A {
        constructor() { }
        ;
    }
    ;
    class A1 {
        constructor() {
            this.name1 = '';
        }
        getName1() {
            return this.name1;
        }
        ;
    }
}
;
