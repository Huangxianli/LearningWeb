function test() {
    console.log('---05函数与 Class 中的类型---------------------------------------------');
    test1();
    test2();
}
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
/**
 * 函数的类型签名
 * 函数的类型描述的是函数的入参类型和函数返回值类型
 */
function test1_1() {
    console.log('---test1_1---------------------------------------------');
    const fun1 = function (a) { };
    const fun2 = () => {
        return 1;
    }; // 实际上这种写法，可读性不好，一般会抽出来
    const fun3 = (a) => {
        return 1;
    };
    const fun4 = (a) => { };
    const fun5 = (a) => 1;
}
/**
 * void 类型
 */
function test1_2() {
    console.log('---test1_2---------------------------------------------');
    function test1_2_1() {
        // 没有return
    }
    function test1_2_2() {
        return; // 有 return 但是没有具体的值，其实这个函数的返回值用 undefined 会更好
    }
    function test1_2_3() {
        return;
    }
}
/**
 * 可选参数与 rest 参数
 */
function test1_3() {
    console.log('---test1_3---------------------------------------------');
    function test1_3_1(a, b) { }
    test1_3_1(1);
    test1_3_1(1, 1);
    function test1_3_2(a, b = 12) { }
    test1_3_2(1);
    test1_3_2(1, 2);
    function test1_3_3(a, ...b) { }
    function test1_3_4(a, ...b) { }
}
/**
 * 函数签名重载，利用函数签名重载，可以更好的推断出返回值的类型，在有多种入参方式的时候，可以匹配入参方式，获取到对应的返回值的类型（将入参和返回进行关联）
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
    const a = test1_4_1(1); // a 的类型被推导成 string | number
    function test1_4_2(foo, bar) {
        if (bar) {
            return foo;
        }
        else {
            return String(foo);
        }
    }
    const b = test1_4_2(1); // b 的类型准确的推导成了 string
}
/**
 * Class
 */
function test2() {
    console.log('---test2---------------------------------------------');
    test2_1();
    test2_2();
    test2_3();
    test2_4();
    test2_5();
    test2_6();
    test2_7();
    test2_8();
    test2_9();
    test2_10();
}
/**
 * 声明
 */
function test2_1() {
    console.log('---test2_1---------------------------------------------');
    class A {
        constructor(name) {
            this.name1 = '';
        }
        get name2() {
            return this.name1;
        }
        // set name2(name: string): void { // set 不允许设置返回类型即使是 void 也不行
        set name2(name) {
            this.name1 = name;
        }
    }
    const a1 = new A('');
    a1.name2;
    const B = class {
        constructor() { }
    };
}
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
/**
 * public 代表着在 类 类的实例（如果是静态，换成 类. ） 子类中都能访问
 */
function test2_2_1() {
    console.log('---test2_2——1---------------------------------------------');
    class A {
        constructor(name) {
            this.name1 = '';
            // 通常不会为构造方法添加修饰符，默认的是 public
            this.name1 = '';
        }
        setName1(name) {
            this.name1 = name;
        }
    }
    class B extends A {
        constructor(name) {
            super(name);
            this.name1;
        }
    }
    let a = new A('');
    a.name1;
}
/**
 * private 表示只能在当前类的内部访问
 */
function test2_2_2() {
    console.log('---test2_2_2---------------------------------------------');
    class A {
        constructor() {
            this.name1 = '';
            this.name2 = 0;
        }
        getName1() {
            return this.name1;
        }
        getName2() {
            return this.name2;
        }
        setName1(name) {
            this.name1 = name;
        }
    }
    class B extends A {
        constructor() {
            super();
            // this.name1; // 父的私有属性不允许在子类中访问，ts会报错
        }
    }
    const a = new A();
    // a.name1; // name1 是 A 的私有属性，不允许在实例上访问
}
/**
 * protected 只允许在类和子类中访问
 */
function test2_2_3() {
    console.log('---test2_2_3---------------------------------------------');
    class A {
        constructor() {
            this.name1 = '';
        }
    }
    class B extends A {
        constructor() {
            super();
            this.name1;
        }
    }
    const a1 = new A();
    // a1.name1; // protected 只允许在类和子类上访问
    const b1 = new B();
    // b1.name1; // 继承了 protected
}
/**
 * 实例属性的简略写法
 */
function test2_2_4() {
    console.log('---test2_2_4---------------------------------------------');
    class A {
        constructor(name1) {
            this.name1 = name1;
            // 注意这里加了 修饰符之后会自动的 this.name1 = name1;
            let b = 1 + 1;
        }
    }
    const a1 = new A('a1');
    a1.name1; // a1
    let Sex;
    (function (Sex) {
        Sex[Sex["Male"] = 0] = "Male";
        Sex[Sex["Femal"] = 1] = "Femal";
    })(Sex || (Sex = {}));
    class B {
        constructor(name1, age, sex) {
            this.name1 = name1;
            this.age = age;
            this.sex = sex;
        }
        getAge() {
            return this.age;
        }
        getSex() {
            return this.sex;
        }
    }
    const b_1 = new B('huang', 18, Sex.Male);
    b_1.getSex();
    class B1 extends B {
        constructor() {
            super('', 0, 0);
        }
        getAge() {
            return this.age;
        }
    }
    const b_1_1 = new B1();
    b_1_1.getSex();
    b_1_1.getAge();
}
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
    }
    A.name1 = '';
    A.getClassName();
    class B {
        // public static name: string;  // 和 constructor 的参数会有冲突，而且参数也不能使用 static 修饰符
        constructor(name = '', age = 0) {
            this.name = name;
            this.age = age;
        }
    }
    class C {
    }
    C.a = '';
    C.b = '';
    C.c = '';
    C.a;
    // C.b; // 只能在基类和衍生类中访问
    // C.c; // 只能在基类中访问
    class D extends C {
        static getA() {
            return this.a || super.a;
        }
        static getB() {
            return this.b || super.b;
        }
        static getC() {
            // return this.c || super.c; // 这两种访问都会报错，c 只能在当前类里面访问
            return '';
        }
    }
    D.a;
    D.getA();
    // D.getB();
    // D.getC();
}
/**
 * 抽象类 一个抽象方法描述了这一方法在实际实现中的结构
 * ts 中无法声明静态的抽象成员
 */
function test2_4() {
    console.log('---test2_4---------------------------------------------');
    class A {
        constructor() { }
    }
    class A1 {
        constructor() {
            this.name1 = '';
        }
        getName1() {
            return this.name1;
        }
    }
}
/**
 * override
 * 该关键字表明是覆盖基类的方法或属性，如果基类上没有的话，会报错
 */
function test2_5() {
    console.log('---test2_5---------------------------------------------');
    class A {
        constructor(name1, name2) {
            this.name1 = name1;
            this.name2 = name2;
        }
        getName1() {
            return this.name1;
        }
        getName2() {
            return this.name2;
        }
    }
    class B extends A {
        // protected override name: string = ''; // 会报错，基类中没有改属性
        constructor(name1) {
            super('', '');
            this.name1 = name1;
        }
        // override getName(): void {} // 会报错，因为基类中没有该方法
        getName1() {
            return this.name1;
        }
    }
}
/**
 * extends 用于继承
 * 覆盖属性或者方法，访问访问应该一样
 */
function test2_6() {
    console.log('---test2_6---------------------------------------------');
    class A {
        constructor() {
            this.name1 = '';
            this.name2 = '';
            this.name3 = '';
        }
        getName1() {
            return this.name1;
        }
        getName2() {
            return this.name2;
        }
        getName3() {
            return this.name3;
        }
    }
    class B extends A {
    }
}
/**
 * this 类型在方法中的标注
 * 给方法限制固定的 this，防止在解构后者其他情况下，方法内部由于 this 的指向执行的时候报错
 */
function test2_7() {
    console.log('---test2_7---------------------------------------------');
    class A {
        constructor() {
            this.age = 0;
        }
        getAge() {
            return this.age;
        }
        getAge1() {
            return this.age;
        }
        static getAge3() {
            // 给静态方法限制 this
            return this.age3;
        }
    }
    A.age3 = 0;
    const a = new A();
    a.getAge();
    a.getAge1();
    // 下面这两个赋值，会将方法内部的 this 改变掉
    const getAge = a.getAge;
    const getAge1 = a.getAge1;
    // getAge(); // 由于在 getAge 内部绑定了 this，这里的 this 和绑定时不同，会报错
    getAge.call(a); // 要使用这种写法才不会报错
    getAge1();
    A.getAge3();
}
/**
 * 泛型类
 */
function test2_8() {
    console.log('---test2_8---------------------------------------------');
    class A {
        constructor(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
    }
    const a = new A('');
    a.getName();
    const a1 = new A(0);
    a1.getName();
}
/**
 *  new 的方式定义类的类型约束
 */
function test2_9() {
    console.log('---test2_9---------------------------------------------');
    class A {
        constructor(name) {
            this.name = name;
        }
    }
    const AConstructor = A;
}
function test2_10() {
    console.log('---test2_10---------------------------------------------');
    class A1 {
        constructor() {
            this.name = '';
        }
        getName() {
            return this.name;
        }
    }
}
export default test;
