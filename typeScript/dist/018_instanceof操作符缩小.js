"use strict";
/* instanceof 操作符，直接判断是否是一个类型的实例 */
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toLocaleUpperCase());
    }
}
function testInstanceof(value) {
    // if (value instanceof Interface1Const) } // 会报错
}
function testInstanceof2(value) {
    if (value instanceof Interface2Const) {
        return value('');
    }
    // return value;
    return '';
}
class Class1 {
}
class Class2 {
    constructor() {
        this.name = '';
    }
    getName() {
        return this.name;
    }
}
