/* 
never：不存在的状态
never类型可以分配给任何类型，但是其他的类型都不能分配给never
 */


interface One {
  kind: "one"
}
interface Two {
  kind: "tow"
}
// interface Three {
//   kind: "three"
// }

type Three = never

type Number_1 = One | Two | Three

function switch_1(number: Number_1) {
  switch (number.kind) {
    case "one":
      return 1;
    case "tow":
      return 2;
    default:
      const _temp: never = number; // Number_1 中的Three如果使用上面的interface中的内容的话，编译会报错；如果使用type定义的never类型的话就不会报错
      return _temp
  }
}