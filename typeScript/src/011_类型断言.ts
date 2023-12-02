/*
ts 有时候无法判断出会某个表达式会返回怎样的类型 
 */

const myCanvas = document.getElementById("my_canvas") as HTMLCanvasElement;
const myCanvas1 = <HTMLCanvasElement>document.getElementById("my_canvas");

// const x = "hello" as number;
const x1 = ("hello" as any) as number; // 这样写 是 先将 x1 断言成any ，再将x1断言成 number？？？