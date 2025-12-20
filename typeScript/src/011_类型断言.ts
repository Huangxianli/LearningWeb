/* ts 有时候无法判断出会某个表达式会返回怎样的类型，可以使用类型断言来帮助 ts 来辅助 */

const myCanvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const myCanvas1 = <HTMLCanvasElement>document.getElementById('my_canvas');

// const x = "hello" as number; // 这样写会被当成错误，string 类型断言成 number 类型
const x1 = 'hello' as any as number; // 这样写 是 先将 x1 断言成any ，再将 x1 断言成 number
const x2 = 'hello' as unknown as number; // 这样的写法更加合理，但是其实是不推荐这样写的，类型断言应该只用来辅助推荐
