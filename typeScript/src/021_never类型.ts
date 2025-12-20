/* 
  never：不存在的状态
  never 类型可以分配给任何类型，但是其他的类型都不能分配给 never
 */

interface One {
  kind: 'one';
}
interface Two {
  kind: 'tow';
}
// interface Three {
//   kind: "three"
// }

type Three = never;

type Number_1 = One | Two | Three;

function switch_1(number: Number_1) {
  switch (number.kind) {
    case 'one':
      return 1;
    case 'tow':
      return 2;
    default:
      const _temp: never = number; // Number_1 中的 Three 如果使用上面的 interface 中的内容的话，编译会报错；如果使用 type 定义的 never 类型的话就不会报错，因为根据 number 的类型和条件判断，可以确定走到了这里的时候 number.kind 的类型是，如果是 never，复制给 never 不会报错，如果是 “three”，赋值给 never 类型就会报错
      return _temp;
  }
}

type Never1 = never;
export let a: string = '';
declare const b: Never1;
a = b; // never 类型的变量可以赋值给其他任何类型的变量
