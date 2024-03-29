"use strict";
/*
联合类型：由两个或者多个其他类型组成类型
 */
/* let id: number | string = "";
id = 2;
id = "";
id.toLocaleLowerCase(); // 赋值之后，会根据最后一次赋值来推断类型，判断对应的方法有没有
 */
/* let id1: number | string;
id1.toLocaleString(); // 没有赋值的时候，或者是不能准确的推断出类型的时候，调用其中一种类型的方法，会给出提示
 */
function fun4(id) {
    return id;
}
;
fun4("1");
fun4(1);
function circleArea(circle) {
    // return circle.r * Math.PI; // 由于Shape中的r是不一定存在的，所以编译的时候会报错
}
function squareArea(square) {
    if (square.kind === "square") {
        return square.l ^ 2;
    }
}
function getArea(shape) {
    switch (shape.kind) {
        case 'circle':
            return shape.r ^ 2 * Math.PI;
        case 'square':
            return shape.l ^ 2;
    }
}
