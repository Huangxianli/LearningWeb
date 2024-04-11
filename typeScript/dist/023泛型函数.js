"use strict";
/*
期望某种输入的类型可以得到某种输入的类型
 */
function firstElement1(arr) {
    return arr[0] || undefined; // 这样的话，就是期望输入的是一个数组，返回的内容的类型是数组中某一项的类型 | undefined
}
;
firstElement1([1, "2"]);
firstElement1(["1", "1"]); // 调用的时候，可以指定T代指的类型
// firstElement<string>(["1", 1]); // 会报错
// 可以定义多个泛型
function myMap(arr, fun) {
    return arr.map(fun);
}
;
myMap([1, 2, 3], (item) => String(item));
/*
类型限制
 */
function compareLength(a, b) {
    return a.length > b.length; // 这里使用了入参的length属性，前面就要限制入参要具有length属性
}
;
compareLength("12", "12");
// compareLength(23, 23); // 报错，数字没有length属性
function minLength(obj, length) {
    if (obj.length > length) {
        return obj;
    }
    else {
        const data = {
            length
        };
        // return data; // 这里会报错，虽然返回的内容含有length属性，他只是满足了最小的条件，可能还有很多其他的条件没有满足
        return obj;
    }
}
;
