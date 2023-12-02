"use strict";
/*
在很多的情况下，我们的一个变量可能会定义成非单一的数据类型，我们在使用的时候，要判断这种使用方式限制在正确的类型下面
*/
function printAll(str) {
    if (typeof str === "string") { // 这里就是一次类型缩小
        console.log(str);
    }
    else if (typeof str === 'object' && str !== null) {
        for (const s of str) {
            console.log(s);
        }
    }
    else {
        // 
    }
}
