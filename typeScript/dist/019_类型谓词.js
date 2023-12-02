"use strict";
/*
类型谓词使用在函数上，如果一个函数返回的是真，就把参数的类型改为更有用的的东西
 */
function isString(s) {
    return typeof s === "string";
}
function toUpperCase(x) {
    if (isString(x)) {
        // x.toUpperCase() // 这里编译会有问题的，因为在这里，x在这个函数中，还是只能知道是unknown类型，不能确定是string类型
    }
}
function isString_1(s) {
    return typeof s === "string";
}
function toUpperCase_1(x) {
    if (isString_1(x)) {
        x.toUpperCase(); // 这里编译不会有问题，通过前面isString_1的类型谓词，已经能够判断出x的类型是string了
    }
}
