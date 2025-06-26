export default {};

type _MyIncludes<T extends readonly any[], U> = U extends T[number]
  ? true
  : false;

type A1 = _MyIncludes<[1, (a: string) => {}], (a: string | number) => {}>;

type __MyIncludes<T extends readonly any[], U> = {
  [K in T[number]]: K;
}[U] extends U
  ? true
  : false;
// 这种写法也会有问题，对象不能做 key，遍历的时候会是 never

type B1 = __MyIncludes<[1], 1>;
type B2 = __MyIncludes<[1, never], never>;
type B3 = __MyIncludes<[1, never], 2>;
type B4 = __MyIncludes<[1, never, (s: string) => {}], 2>;
type B5 = __MyIncludes<[1, never, (s: string) => {}], (s: string) => {}>; // false 这里有问题

type ___MyIncludes<T extends readonly any[], U> = T extends readonly [
  ...infer _B,
  U,
  ...infer _A
]
  ? readonly [..._B, U, ..._A] extends T
    ? // 问题出在这一部分，即使前面推断出 _B 是 [1] _A 是[1]，但是由于是 两者是分布在 U 的一前一后（只有这种情况），会导致  [..._B, U, ..._A] 是一个数组，T 被推导成一个元组 就是 false
      true
    : false
  : false;

type C1 = ___MyIncludes<[1, 2, 1], 2>; // false

type _IsEqual<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false; // 存在 any extends or extends any 都为 ture 那就引入临时中间 T
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;
type MyIncludes<T extends readonly any[], U> = T extends readonly [
  infer F,
  ...infer _A
]
  ? IsEqual<F, U> extends true
    ? true
    : MyIncludes<_A, U>
  : false;

type D1 = MyIncludes<[1, 2, 1], 3>;
type D2 = MyIncludes<[(a: string) => {}, 1], (a: string) => {}>;
type D3 = MyIncludes<[(a: string | number) => {}, 1], (a: string) => {}>;
