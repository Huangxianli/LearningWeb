"use strict";
/*
never：不存在的状态
never 类型可以分配给任何类型，但是其他的类型都不能分配给 never
 */
function switch_1(number) {
    switch (number.kind) {
        case 'one':
            return 1;
        case 'tow':
            return 2;
        default:
            const _temp = number; // Number_1 中的 Three 如果使用上面的 interface 中的内容的话，编译会报错；如果使用 type 定义的 never类型的话就不会报错
            return _temp;
    }
}
